const {
    createTeam,
    getTeamById,
    addMemberToTeam,
    getTeamMembers,
    getUserTeams
} = require('../models/groupModel');

const createGroup = async (req, res) => {
    const { name, creatorId, isPrivate } = req.body;
    if (!name || !creatorId) {
        return res.status(400).json({ message: 'Название и ID создателя обязательны' });
    }
    try {
        const teamId = await createTeam(name, creatorId, isPrivate);
        await addMemberToTeam(creatorId, teamId);
        res.status(201).json({ message: 'Группа создана', teamId });
    } catch (error) {
        console.error('Ошибка при создании группы:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const getGroupById = async (req, res) => {
    const { id } = req.params;
    try {
        const team = await getTeamById(id);
        if (!team) {
            return res.status(404).json({ message: 'Группа не найдена' });
        }
        res.status(200).json(team);
    } catch (error) {
        console.error('Ошибка при получении группы:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const getGroupMembers = async (req, res) => {
    const { id } = req.params;
    try {
        const members = await getTeamMembers(id);
        res.status(200).json(members);
    } catch (error) {
        console.error('Ошибка при получении участников группы:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const getUserGroups = async (req, res) => {
    const { userId } = req.params;
    try {
        const teams = await getUserTeams(userId);
        res.status(200).json(teams);
    } catch (error) {
        console.error('Ошибка при получении групп пользователя:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

module.exports = {
    createGroup,
    getGroupById,
    getGroupMembers,
    getUserGroups
};
