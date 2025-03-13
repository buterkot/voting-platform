const { createCommentComplaint, getAllComplaints, updateComplaintStatus } = require('../models/complaintModel');

const fileComplaint = async (req, res) => {
    const { user_id, comment_id } = req.body;

    if (!user_id || !comment_id) {
        return res.status(400).json({ error: "Отсутствует user_id или comment_id" });
    }

    try {
        await createCommentComplaint(user_id, comment_id);
        res.status(201).json({ message: "Жалоба успешно отправлена" });
    } catch (error) {
        console.error("Ошибка при подаче жалобы:", error.message);
        res.status(500).json({ error: "Ошибка сервера при отправке жалобы" });
    }
};

const getComplaints = async (req, res) => {
    try {
        const complaints = await getAllComplaints();
        res.status(200).json(complaints);
    } catch (error) {
        console.error("Ошибка при получении жалоб:", error.message);
        res.status(500).json({ error: "Ошибка сервера при загрузке жалоб" });
    }
};

const changeComplaintStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["active", "accepted", "declined"].includes(status)) {
        return res.status(400).json({ error: "Некорректный статус" });
    }

    try {
        const result = await updateComplaintStatus(id, status);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Жалоба не найдена" });
        }
        res.status(200).json({ message: "Статус жалобы обновлен" });
    } catch (error) {
        console.error("Ошибка при обновлении статуса жалобы:", error.message);
        res.status(500).json({ error: "Ошибка сервера при обновлении статуса жалобы" });
    }
};

module.exports = {
    fileComplaint,
    getComplaints,
    changeComplaintStatus
};
