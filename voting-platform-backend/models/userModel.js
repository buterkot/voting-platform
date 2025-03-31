const db = require('../config/db'); 

const fetchAllUsers = () => {
    const query = `
        SELECT id, email, firstname, lastname, role, ban, address, phone_number, last_online
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

const updateUserRole = (id, role) => {
    const query = `
        UPDATE users
        SET role = ?
        WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [role, id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

const updateLastOnline = (id) => {
    const query = `
        UPDATE users
        SET last_online = NOW()
        WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = {
    fetchAllUsers,
    updateUserBan,
    updateUserRole,
    updateLastOnline
};
