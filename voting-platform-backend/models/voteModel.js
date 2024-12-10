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
                    const voteQuery = `INSERT INTO votes (title, start_date, end_date, user_id) VALUES (?, NOW(), NULL, ?)`;
                    const [voteResult] = await connection.promise().query(voteQuery, [voteData.title, voteData.userId]);

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

module.exports = {
    createVote,
};
