const db = require('../config/db');

const isUserInTeam = (userId, teamId) => {
    const query = `
        SELECT * FROM membership
        WHERE user_id = ? AND team_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [userId, teamId], (error, results) => {
            if (error) return reject(error);
            resolve(results.length > 0); 
        });
    });
};

const hasActiveInvitation = (userId, teamId) => {
    const query = `
        SELECT * FROM invitations
        WHERE user_id = ? AND team_id = ? AND status = 'A'
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [userId, teamId], (error, results) => {
            if (error) return reject(error);
            resolve(results.length > 0); 
        });
    });
};

const createInvitation = (userId, teamId) => {
    const query = `
        INSERT INTO invitations (invitation_date, team_id, user_id, status)
        VALUES (NOW(), ?, ?, 'A')
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [teamId, userId], (error, results) => {
            if (error) return reject(error);
            resolve(results.insertId);
        });
    });
};

const getUserInvitations = (userId) => {
    const query = `
        SELECT invitations.*, teams.name AS team_name
        FROM invitations
        JOIN teams ON invitations.team_id = teams.id
        WHERE invitations.user_id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [userId], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const updateInvitationStatus = (invitationId, status) => {
    const query = `
        UPDATE invitations
        SET status = ?
        WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(query, [status, invitationId], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = {
    createInvitation,
    getUserInvitations,
    updateInvitationStatus,
    isUserInTeam,
    hasActiveInvitation
};
