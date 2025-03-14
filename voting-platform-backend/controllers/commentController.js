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

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;

        if (!commentId) {
            return res.status(400).json({ error: "ID комментария обязателен." });
        }

        await Comment.deleteComment(commentId);
        res.status(200).json({ message: "Комментарий успешно удален." });
    } catch (error) {
        console.error("Ошибка при удалении комментария:", error);
        res.status(500).json({ error: "Ошибка сервера при удалении комментария." });
    }
};

const removeComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const result = await Comment.markCommentAsRemoved(commentId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Комментарий не найден." });
        }
        res.status(200).json({ message: "Комментарий помечен как удалённый." });
    } catch (error) {
        console.error("Ошибка при удалении комментария:", error);
        res.status(500).json({ message: "Ошибка сервера." });
    }
};

module.exports = {
    addComment,
    deleteComment,
    getCommentsByVoteId,
    removeComment
};
