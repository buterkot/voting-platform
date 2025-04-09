const {
    createVote,
    getAvailableVotes,
    getVoteById,
    getVoteIdByOptionId,
    castVote,
    stopVote,
    getUserVotes,
    getVoteParticipants,
    removeVote
} = require('../models/voteModel');

const createVoteController = async (req, res) => {
    const { title, userId, options, anonymous, multiple, groupId, endDate } = req.body;

    if (!title || !userId || !options || options.length < 2) {
        return res.status(400).send('Все поля обязательны, минимум 2 варианта.');
    }

    const isAnonymous = anonymous ? 1 : 0;
    const isMultiple = multiple ? 1 : 0;

    try {
        const voteId = await createVote({
            title,
            userId,
            anonymous: isAnonymous,
            multiple: isMultiple,
            groupId: groupId || null,
            endDate: endDate || null
        }, options);

        res.status(201).send({ message: 'Голосование успешно создано', voteId });
    } catch (error) {
        console.error('Ошибка при создании голосования:', error.message);
        res.status(500).send('Ошибка сервера');
    }
};

const getVotesController = async (req, res) => {
    try {
        const votes = await getAvailableVotes();
        res.status(200).json(votes);
    } catch (error) {
        console.error('Ошибка при получении голосований:', error.message);
        res.status(500).send('Ошибка сервера');
    }
};

const getVoteByIdController = async (req, res) => {
    const { voteId } = req.params;

    try {
        const vote = await getVoteById(voteId);
        res.status(200).json(vote);
    } catch (error) {
        console.error('Ошибка при получении голосования:', error.message);
        res.status(404).send(error.message);
    }
};

const castVoteController = async (req, res) => {
    const { userId, optionIds } = req.body;

    if (!userId || !optionIds || !Array.isArray(optionIds) || optionIds.length === 0) {
        return res.status(400).send('Все поля обязательны. Должен быть выбран хотя бы один вариант.');
    }

    try {
        const voteId = await getVoteIdByOptionId(optionIds[0]);
        const hasVoted = await checkIfUserVoted(userId, voteId);

        if (hasVoted) {
            return res.status(400).send('Пользователь уже голосовал в этом опросе.');
        }

        for (const optionId of optionIds) {
            await castVote(userId, optionId);
        }

        res.status(200).send({ message: 'Ваши голоса успешно учтены.' });
    } catch (error) {
        console.error('Ошибка при голосовании:', error.message);
        res.status(500).send('Ошибка сервера');
    }
};


const stopVoteController = async (req, res) => {
    const { voteId } = req.body;

    if (!voteId) {
        return res.status(400).send('ID голосования обязателен.');
    }

    try {
        await stopVote(voteId);
        res.status(200).send({ message: 'Голосование успешно остановлено.' });
    } catch (error) {
        if (error.message === 'Голосование уже остановлено или не найдено.') {
            return res.status(400).send(error.message);
        }
        console.error('Ошибка при остановке голосования:', error.message);
        res.status(500).send('Ошибка сервера');
    }
};

const getUserVotesController = async (req, res) => {
    const { userId } = req.params;

    try {
        const userVotes = await getUserVotes(userId);
        res.status(200).json(userVotes);
    } catch (error) {
        console.error('Ошибка при получении голосований пользователя:', error.message);
        res.status(500).send('Ошибка сервера');
    }
};

const getVoteParticipantsController = async (req, res) => {
    const { voteId } = req.params;

    if (!voteId) {
        return res.status(400).send('ID голосования обязателен.');
    }

    try {
        const participants = await getVoteParticipants(voteId);
        res.status(200).json(participants);
    } catch (error) {
        console.error('Ошибка при получении участников голосования:', error.message);
        res.status(500).send('Ошибка сервера');
    }
};

const removeVoteController = async (req, res) => {
    const { voteId } = req.params;

    if (!voteId) {
        return res.status(400).send('ID голосования обязателен.');
    }

    try {
        await removeVote(voteId);
        res.status(200).send({ message: 'Голосование успешно удалено.' });
    } catch (error) {
        console.error('Ошибка при удалении голосования:', error.message);
        res.status(500).send('Ошибка сервера');
    }
};

module.exports = {
    createVoteController,
    getVotesController,
    getVoteByIdController,
    castVoteController,
    stopVoteController,
    getUserVotesController,
    getVoteParticipantsController,
    removeVoteController
};
