const db = require('../config/db');

const createCommentComplaint = (userId, commentId) => {
    const query = `
        INSERT INTO complaints_comments (user_id, comment_id, status, created_at)
        VALUES (?, ?, 'active', NOW())
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [userId, commentId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const getAllComplaints = () => {
    const query = `
        SELECT cc.id, cc.user_id AS complainant_id, 
               complainer.firstname AS complainant_firstname, complainer.lastname AS complainant_lastname,
               cc.comment_id, c.text AS comment_text, 
               c.user_id AS comment_author_id, 
               author.firstname AS comment_author_firstname, author.lastname AS comment_author_lastname,
               cc.status, cc.created_at
        FROM complaints_comments cc
        JOIN comments c ON cc.comment_id = c.id
        JOIN users author ON c.user_id = author.id
        JOIN users complainer ON cc.user_id = complainer.id
        WHERE cc.status = 'active'
        ORDER BY cc.created_at DESC
    `;
    return new Promise((resolve, reject) => {
        db.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};


const updateComplaintStatus = (complaintId, status) => {
    const query = `
        UPDATE complaints_comments
        SET status = ?
        WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [status, complaintId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = {
    createCommentComplaint,
    getAllComplaints,
    updateComplaintStatus
};
