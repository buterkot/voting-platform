const { fetchAllUsers,
    fetchUserById,
    updateUserBan,
    updateUserRole,
    updateUserData,
    updateUserSettings,
    addSearchQuery,
    getSearchHistory,
    getVotedPollIds
} = require('../models/userModel');

const getUsers = async (req, res) => {
    try {
        const users = await fetchAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Ошибка при получении пользователей:', error.message);
        res.status(500).send('Ошибка сервера при загрузке пользователей.');
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await fetchUserById(id);
        if (!user) {
            return res.status(404).send('Пользователь не найден.');
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Ошибка при получении пользователя:', error.message);
        res.status(500).send('Ошибка сервера при загрузке данных пользователя.');
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

const updateUserRoleStatus = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!['U', 'M'].includes(role)) {
        return res.status(400).send('Неверное значение для поля "role".');
    }

    try {
        const result = await updateUserRole(id, role);
        if (result.affectedRows === 0) {
            return res.status(404).send('Пользователь не найден.');
        }
        res.status(200).send({ message: 'Роль пользователя успешно обновлена.' });
    } catch (error) {
        console.error('Ошибка при обновлении роли пользователя:', error.message);
        res.status(500).send('Ошибка сервера при обновлении роли пользователя.');
    }
};

const updateUserInfo = async (req, res) => {
    const { userId, address, phone_number } = req.body;

    if (!userId || (!address && !phone_number)) {
        return res.status(400).send('Необходимо передать userId и хотя бы одно из полей: address или phone_number.');
    }

    try {
        const updateData = {};
        if (address) updateData.address = address;
        if (phone_number) updateData.phone_number = phone_number;

        const result = await updateUserData(userId, updateData);
        if (result.affectedRows === 0) {
            return res.status(404).send('Пользователь не найден.');
        }
        res.status(200).send({ message: 'Данные пользователя успешно обновлены.' });
    } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error.message);
        res.status(500).send('Ошибка сервера при обновлении данных пользователя.');
    }
};

const updateSettings = async (req, res) => {
    const { userId, profilePrivate, language, theme } = req.body;

    if (!userId) {
        return res.status(400).send('userId обязателен.');
    }

    try {
        const settings = {};
        if (profilePrivate !== undefined) settings.profilePrivate = profilePrivate;
        if (language) settings.language = language;
        if (theme) settings.theme = theme;

        const result = await updateUserSettings(userId, settings);
        if (result.affectedRows === 0) {
            return res.status(404).send('Пользователь не найден.');
        }

        res.status(200).send({ message: 'Настройки успешно обновлены.' });
    } catch (error) {
        console.error('Ошибка при обновлении настроек:', error.message);
        res.status(500).send('Ошибка сервера при обновлении настроек.');
    }
};

const saveSearchQuery = async (req, res) => {
    const { userId, query } = req.body;

    if (!userId || !query || query.trim() === "") {
        return res.status(400).send("Необходимы userId и непустой query.");
    }

    try {
        await addSearchQuery(userId, query);
        res.status(200).send({ message: "Поисковый запрос сохранён." });
    } catch (error) {
        console.error("Ошибка при сохранении поискового запроса:", error.message);
        res.status(500).send("Ошибка сервера при сохранении запроса.");
    }
};

const getUserSearchHistory = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send("Не указан userId.");
    }

    try {
        const history = await getSearchHistory(id);
        res.status(200).json(history);
    } catch (error) {
        console.error("Ошибка при получении истории поиска:", error.message);
        res.status(500).send("Ошибка сервера при получении истории.");
    }
};

const getUserVotedPolls = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send("userId обязателен.");
    }

    try {
        const voteIds = await getVotedPollIds(id);
        res.status(200).json(voteIds);
    } catch (error) {
        console.error("Ошибка при получении списка проголосованных опросов:", error.message);
        res.status(500).send("Ошибка сервера.");
    }
};

module.exports = {
    getUsers,
    getUserById,
    updateUserBanStatus,
    updateUserRoleStatus,
    updateUserInfo,
    updateSettings,
    saveSearchQuery,
    getUserSearchHistory,
    getUserVotedPolls
};
