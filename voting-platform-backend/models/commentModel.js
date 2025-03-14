const db = require('../config/db');

const addComment = async (commentData) => {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO comments (text, date, user_id, vote_id) VALUES (?, ?, ?, ?)`;

        db.query(query, [commentData.text, commentData.date, commentData.user_id, commentData.vote_id], (err, result) => {
            if (err) return reject(err);
            resolve({ id: result.insertId });
        });
    });
};

const getCommentsByVoteId = async (voteId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT c.id, c.text, c.date, c.user_id, c.vote_id, c.removed, u.firstname, u.lastname
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.vote_id = ?
            ORDER BY c.date DESC
        `;

        db.query(query, [voteId], (err, results) => {
            if (err) return reject(err);

            const formattedResults = results.map(comment => ({
                id: comment.id,
                text: comment.text,
                date: comment.date,
                user_id: comment.user_id,
                vote_id: comment.vote_id,
                removed: comment.removed,
                user_name: `${comment.firstname} ${comment.lastname}`
            }));

            resolve(formattedResults);
        });
    });
};

const deleteComment = async (commentId) => {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM comments WHERE id = ?`;

        db.query(query, [commentId], (err, result) => {
            if (err) return reject(err);

            if (result.affectedRows === 0) {
                return reject(new Error("Комментарий не найден."));
            }

            resolve({ message: "Комментарий удален" });
        });
    });
};

const markCommentAsRemoved = (commentId) => {
    const query = `UPDATE comments SET removed = 1 WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [commentId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = {
    addComment,
    getCommentsByVoteId,
    deleteComment,
    markCommentAsRemoved,
};
