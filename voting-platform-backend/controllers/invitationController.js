const {
    getInvitationById,
    createInvitation,
    getUserInvitations,
    updateInvitationStatus,
    isUserInTeam,
    hasActiveInvitation
} = require('../models/invitationModel');
const { addMemberToTeam } = require('../models/groupModel');

const sendInvitation = async (req, res) => {
    const { userId, groupId } = req.body;

    if (!userId || !groupId) {
        return res.status(400).json({ message: 'userId и groupId обязательны' });
    }

    try {
        const alreadyInTeam = await isUserInTeam(userId, groupId);
        if (alreadyInTeam) {
            return res.status(409).json({ message: 'Пользователь уже является участником группы' });
        }

        const alreadyInvited = await hasActiveInvitation(userId, groupId);
        if (alreadyInvited) {
            return res.status(409).json({ message: 'Приглашение уже отправлено' });
        }

        const invitationId = await createInvitation(userId, groupId);
        res.status(201).json({ message: 'Приглашение отправлено', invitationId });

    } catch (error) {
        console.error('Ошибка при отправке приглашения:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const getInvitationsForUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const invitations = await getUserInvitations(userId);
        res.status(200).json(invitations);
    } catch (error) {
        console.error('Ошибка при получении приглашений:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

const respondToInvitation = async (req, res) => {
    const { invitationId, status } = req.body;

    if (!['A', 'R', 'C'].includes(status)) {
        return res.status(400).json({ message: 'Недопустимый статус' });
    }

    try {
        const invitation = await getInvitationById(invitationId);
        if (!invitation) {
            return res.status(404).json({ message: 'Приглашение не найдено' });
        }

        const result = await updateInvitationStatus(invitationId, status);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Приглашение не найдено' });
        }

        if (status === 'C') {
            await addMemberToTeam(invitation.user_id, invitation.team_id);
        }

        res.status(200).json({ message: 'Статус приглашения обновлён' });
    } catch (error) {
        console.error('Ошибка при обновлении статуса приглашения:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

module.exports = {
    sendInvitation,
    getInvitationsForUser,
    respondToInvitation
};
