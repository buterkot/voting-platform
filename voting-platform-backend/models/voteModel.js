const db = require('../config/db');

const createVote = async (voteData, options) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) return reject(err);

            connection.beginTransaction(async (err) => {
                if (err) {
                    connection.release();
                    return reject(err);
                }

                try {
                    const voteQuery = `INSERT INTO votes (title, start_date, end_date, user_id, anonymous, status) VALUES (?, NOW(), NULL, ?, ?, 'A')`;
                    const [voteResult] = await connection.promise().query(voteQuery, [voteData.title, voteData.userId, voteData.anonymous]);

                    const voteId = voteResult.insertId;

                    const optionsQuery = `INSERT INTO vote_options (vote_id, option_text) VALUES ?`;
                    const optionsValues = options.map(option => [voteId, option]);
                    await connection.promise().query(optionsQuery, [optionsValues]);

                    connection.commit(err => {
                        if (err) {
                            connection.rollback();
                            connection.release();
                            return reject(err);
                        }
                        connection.release();
                        resolve(voteId);
                    });
                } catch (err) {
                    connection.rollback();
                    connection.release();
                    reject(err);
                }
            });
        });
    });
};

const getAvailableVotes = () => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) return reject(err);

            const query = `
                SELECT v.id, v.title, v.user_id, v.anonymous, u.firstname, u.lastname, 
                       o.id AS option_id, o.option_text, COUNT(votes.option_id) AS vote_count
                FROM votes v
                LEFT JOIN vote_options o ON v.id = o.vote_id
                LEFT JOIN votes_cast votes ON o.id = votes.option_id
                LEFT JOIN users u ON v.user_id = u.id
                WHERE v.status = 'A'
                GROUP BY v.id, o.id
            `;

            connection.query(query, (err, results) => {
                if (err) {
                    connection.release();
                    return reject(err);
                }

                const formattedResults = results.reduce((acc, row) => {
                    const vote = acc.find(vote => vote.id === row.id);
                    if (!vote) {
                        acc.push({
                            id: row.id,
                            title: row.title,
                            user_id: row.user_id,
                            user_name: `${row.firstname} ${row.lastname}`,
                            anonymous: row.anonymous,
                            options: [
                                {
                                    id: row.option_id,
                                    option_text: row.option_text,
                                    vote_count: row.vote_count || 0
                                }
                            ]
                        });
                    } else {
                        vote.options.push({
                            id: row.option_id,
                            option_text: row.option_text,
                            vote_count: row.vote_count || 0
                        });
                    }
                    return acc;
                }, []);

                connection.release();
                resolve(formattedResults);
            });
        });
    });
};

const castVote = (userId, optionId) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) return reject(err);

            connection.beginTransaction(async (err) => {
                if (err) {
                    connection.release();
                    return reject(err);
                }

                try {
                    const voteCheckQuery = `
                        SELECT 1
                        FROM votes_cast vc
                        JOIN vote_options vo ON vc.option_id = vo.id
                        WHERE vc.user_id = ? AND vo.vote_id = (
                            SELECT vote_id FROM vote_options WHERE id = ?
                        )
                    `;

                    const [checkResult] = await connection.promise().query(voteCheckQuery, [userId, optionId]);

                    if (checkResult.length > 0) {
                        connection.rollback();
                        connection.release();
                        return reject(new Error('Пользователь уже голосовал в этом опросе.'));
                    }

                    const insertVoteQuery = `INSERT INTO votes_cast (user_id, option_id, voted_date) VALUES (?, ?, NOW())`;
                    await connection.promise().query(insertVoteQuery, [userId, optionId]);

                    connection.commit(err => {
                        if (err) {
                            connection.rollback();
                            connection.release();
                            return reject(err);
                        }
                        connection.release();
                        resolve();
                    });
                } catch (err) {
                    connection.rollback();
                    connection.release();
                    reject(err);
                }
            });
        });
    });
};

const stopVote = (voteId) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) return reject(err);

            const query = `
                UPDATE votes
                SET status = 'N', end_date = NOW()
                WHERE id = ? AND status = 'A'
            `;

            connection.query(query, [voteId], (err, results) => {
                connection.release();

                if (err) return reject(err);

                if (results.affectedRows === 0) {
                    return reject(new Error('Голосование уже остановлено или не найдено.'));
                }

                resolve();
            });
        });
    });
};

const getVoteById = (voteId) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) return reject(err);

            const query = `
                SELECT v.id, v.title, v.user_id, v.anonymous, v.status, v.start_date, v.end_date,
                       u.firstname, u.lastname, 
                       o.id AS option_id, o.option_text, COUNT(vc.option_id) AS vote_count
                FROM votes v
                LEFT JOIN users u ON v.user_id = u.id
                LEFT JOIN vote_options o ON v.id = o.vote_id
                LEFT JOIN votes_cast vc ON o.id = vc.option_id
                WHERE v.id = ?
                GROUP BY v.id, o.id
            `;

            connection.query(query, [voteId], (err, results) => {
                if (err) {
                    connection.release();
                    return reject(err);
                }

                if (results.length === 0) {
                    connection.release();
                    return reject(new Error('Голосование не найдено.'));
                }

                const vote = {
                    id: results[0].id,
                    title: results[0].title,
                    user_id: results[0].user_id,
                    user_name: `${results[0].firstname} ${results[0].lastname}`,
                    anonymous: results[0].anonymous,
                    status: results[0].status,
                    start_date: results[0].start_date,
                    end_date: results[0].end_date,
                    options: results.map(row => ({
                        id: row.option_id,
                        option_text: row.option_text,
                        vote_count: row.vote_count || 0
                    }))
                };

                connection.release();
                resolve(vote);
            });
        });
    });
};

const getUserVotes = (userId) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) return reject(err);

            const query = `
                SELECT v.id, v.title, v.status, v.start_date, v.end_date, 
                       u.firstname, u.lastname, 
                       o.id AS option_id, o.option_text, 
                       COUNT(vc.option_id) AS vote_count
                FROM votes v
                JOIN users u ON v.user_id = u.id
                LEFT JOIN vote_options o ON v.id = o.vote_id
                LEFT JOIN votes_cast vc ON o.id = vc.option_id
                WHERE v.user_id = ?
                GROUP BY v.id, o.id
            `;

            connection.query(query, [userId], (err, results) => {
                if (err) {
                    connection.release();
                    return reject(err);
                }

                const formattedResults = results.reduce((acc, row) => {
                    const vote = acc.find(vote => vote.id === row.id);
                    if (!vote) {
                        acc.push({
                            id: row.id,
                            title: row.title,
                            status: row.status,
                            start_date: row.start_date,
                            end_date: row.end_date,
                            user_name: `${row.firstname} ${row.lastname}`,
                            options: row.option_id ? [{
                                id: row.option_id,
                                option_text: row.option_text,
                                vote_count: row.vote_count || 0
                            }] : []
                        });
                    } else {
                        if (row.option_id) {
                            vote.options.push({
                                id: row.option_id,
                                option_text: row.option_text,
                                vote_count: row.vote_count || 0
                            });
                        }
                    }
                    return acc;
                }, []);

                connection.release();
                resolve(formattedResults);
            });
        });
    });
};

const getVoteParticipants = (voteId) => {
    return new Promise((resolve, reject) => {
        db.getConnection((err, connection) => {
            if (err) return reject(err);

            const query = `
                SELECT u.firstname, u.lastname, u.email, vo.option_text
                FROM votes_cast vc
                JOIN users u ON vc.user_id = u.id
                JOIN vote_options vo ON vc.option_id = vo.id
                WHERE vo.vote_id = ?
            `;

            connection.query(query, [voteId], (err, results) => {
                connection.release();

                if (err) return reject(err);

                resolve(results);
            });
        });
    });
};

module.exports = {
    createVote,
    getAvailableVotes,
    getVoteById,
    castVote,
    stopVote,
    getUserVotes,
    getVoteParticipants
};
