const Comment = require("../models/commentModel");

const addComment = async (req, res) => {
    try {
        const { text, date, user_id, vote_id } = req.body;

        if (!text || !user_id || !vote_id) {
            return res.status(400).json({ error: "Все поля (text, user_id, vote_id) обязательны." });
        }

        const result = await Comment.addComment({ text, date, user_id, vote_id });
        res.status(201).json({ id: result.id });
    } catch (error) {
        console.error("Ошибка при добавлении комментария:", error);
        res.status(500).json({ error: "Ошибка сервера при добавлении комментария." });
    }
};

const getCommentsByVoteId = async (req, res) => {
    try {
        const { voteId } = req.params;
        const comments = await Comment.getCommentsByVoteId(voteId);
        res.status(200).json(comments);
    } catch (error) {
        console.error("Ошибка при получении комментариев:", error);
        res.status(500).json({ error: "Ошибка сервера при получении комментариев." });
    }
};

module.exports = {
    addComment,
    getCommentsByVoteId
};
