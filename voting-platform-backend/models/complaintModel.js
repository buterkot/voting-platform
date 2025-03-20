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

const createVoteComplaint = (userId, voteId) => {
    const query = `
        INSERT INTO complaints_votes (user_id, vote_id, status, created_at)
        VALUES (?, ?, 'active', NOW())
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [userId, voteId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const getAllComplaints = () => {
    const query = `
        SELECT 'comment' AS type, cc.id, cc.user_id AS complainant_id, 
               complainer.firstname AS complainant_firstname, complainer.lastname AS complainant_lastname,
               cc.comment_id AS target_id, c.text AS target_text, 
               c.user_id AS target_author_id, 
               author.firstname AS target_author_firstname, author.lastname AS target_author_lastname,
               cc.status, cc.created_at
        FROM complaints_comments cc
        JOIN comments c ON cc.comment_id = c.id
        JOIN users author ON c.user_id = author.id
        JOIN users complainer ON cc.user_id = complainer.id
        WHERE cc.status = 'active'
        
        UNION ALL
        
        SELECT 'vote' AS type, cv.id, cv.user_id AS complainant_id, 
               complainer.firstname AS complainant_firstname, complainer.lastname AS complainant_lastname,
               cv.vote_id AS target_id, v.title AS target_text, 
               v.user_id AS target_author_id, 
               author.firstname AS target_author_firstname, author.lastname AS target_author_lastname,
               cv.status, cv.created_at
        FROM complaints_votes cv
        JOIN votes v ON cv.vote_id = v.id
        JOIN users author ON v.user_id = author.id
        JOIN users complainer ON cv.user_id = complainer.id
        WHERE cv.status = 'active'
        
        ORDER BY created_at DESC
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

const updateComplaintStatus = (complaintId, status, type) => {
    const table = type === 'comment' ? 'complaints_comments' : 'complaints_votes';
    const query = `UPDATE ${table} SET status = ? WHERE id = ?`;

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
    createVoteComplaint,
    getAllComplaints,
    updateComplaintStatus
};
