const db = require('../config/db'); 

const fetchAllUsers = () => {
    const query = `
        SELECT id, email, firstname, lastname, role, ban
        FROM users
        WHERE role != 'A'
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

const updateUserBan = (id, ban) => {
    const query = `
        UPDATE users
        SET ban = ?
        WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [ban, id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = {
    fetchAllUsers,
    updateUserBan
};
