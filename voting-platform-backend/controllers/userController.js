const { fetchAllUsers, updateUserBan } = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await fetchAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error.message);
        res.status(500).send('Ошибка сервера при загрузке пользователей.');
    }
};

const updateUserBanStatus = async (req, res) => {
    const { id } = req.params;
    const { ban } = req.body;

    if (typeof ban !== 'number' || ![0, 1].includes(ban)) {
        return res.status(400).send('Неверное значение для поля "ban".');
    }

    try {
        const result = await updateUserBan(id, ban);
        if (result.affectedRows === 0) {
            return res.status(404).send('Пользователь не найден.');
        }
        res.status(200).send({ message: 'Статус пользователя успешно обновлен.' });
    } catch (error) {
        console.error('Ошибка при обновлении статуса пользователя:', error.message);
        res.status(500).send('Ошибка сервера при обновлении пользователя.');
    }
};

module.exports = {
    getUsers,
    updateUserBanStatus
};