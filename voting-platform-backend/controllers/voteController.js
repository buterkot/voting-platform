const { createVote } = require('../models/voteModel');

const createVoteController = async (req, res) => {
    const { title, userId, options } = req.body;

    if (!title || !userId || !options || options.length < 2) {
        return res.status(400).send('Все поля обязательны, минимум 2 варианта.');
    }

    try {
        const voteId = await createVote({ title, userId }, options);
        res.status(201).send({ message: 'Голосование успешно создано', voteId });
    } catch (error) {
        console.error('Ошибка при создании голосования:', error.message);
        res.status(500).send('Ошибка сервера');
    }
};

module.exports = {
    createVoteController,
};
