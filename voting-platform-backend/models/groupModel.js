const db = require('../config/db');

const createTeam = (name, creatorId, isPrivate) => {
    const query = `INSERT INTO teams (name, creation_date, creator_id, private) VALUES (?, NOW(), ?, ?)`;
    return new Promise((resolve, reject) => {
        db.query(query, [name, creatorId, isPrivate], (error, results) => {
            if (error) return reject(error);
            resolve(results.insertId);
        });
    });
};

const getTeamById = (teamId) => {
    const query = `SELECT id, name, creation_date, creator_id, private FROM teams WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [teamId], (error, results) => {
            if (error) return reject(error);
            resolve(results[0] || null);
        });
    });
};

const addMemberToTeam = (userId, teamId) => {
    const query = `INSERT INTO membership (user_id, team_id) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
        db.query(query, [userId, teamId], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const getTeamMembers = (teamId) => {
    const query = `SELECT users.id, users.firstname, users.lastname, users.email FROM users
                   JOIN membership ON users.id = membership.user_id
                   WHERE membership.team_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [teamId], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

const getUserTeams = (userId) => {
    const query = `SELECT teams.id, teams.name, teams.creation_date, teams.creator_id, teams.private FROM teams
                   JOIN membership ON teams.id = membership.team_id
                   WHERE membership.user_id = ?`;
    return new Promise((resolve, reject) => {
        db.query(query, [userId], (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = {
    createTeam,
    getTeamById,
    addMemberToTeam,
    getTeamMembers,
    getUserTeams
};