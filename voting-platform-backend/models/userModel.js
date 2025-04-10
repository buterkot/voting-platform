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

const fetchUserById = (id) => {
    const query = `
        SELECT id, email, firstname, lastname, role, ban, address, phone_number, last_online, profile_private
        FROM users
        WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
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

const updateUserData = (id, data) => {
    const fields = [];
    const values = [];

    if (data.address !== undefined) {
        fields.push('address = ?');
        values.push(data.address);
    }

    if (data.phone_number !== undefined) {
        fields.push('phone_number = ?');
        values.push(data.phone_number);
    }

    if (fields.length === 0) {
        return Promise.resolve({ affectedRows: 0 }); 
    }

    const query = `
        UPDATE users
        SET ${fields.join(', ')}
        WHERE id = ?
    `;

    values.push(id); 

    return new Promise((resolve, reject) => {
        db.query(query, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};


module.exports = {
    fetchAllUsers,
    fetchUserById,
    updateUserBan,
    updateUserRole,
    updateLastOnline,
    updateUserData
};
