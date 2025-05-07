import React, { useEffect, useState } from "react";

const Notifications = ({ userId }) => {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInvitations = async () => {
        try {
            const response = await fetch(`http://localhost:3000/invitations/${userId}`);
            const data = await response.json();
            const sorted = data.sort((a, b) => new Date(b.invitation_date) - new Date(a.invitation_date));
            setInvitations(sorted);
        } catch (error) {
            console.error("Ошибка при загрузке приглашений:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvitations();
    }, [userId]);

    const respondToInvitation = async (invitationId, status) => {
        try {
            const response = await fetch("http://localhost:3000/invitations/respond", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ invitationId, status }),
            });

            if (response.ok) {
                fetchInvitations();
            } else {
                alert("Не удалось обработать приглашение");
            }
        } catch (error) {
            console.error("Ошибка при ответе на приглашение:", error);
        }
    };

    if (loading) return <div>Загрузка уведомлений...</div>;

    return (
        <div className="notif-content">
            {invitations.length === 0 ? (
                <div>Нет уведомлений.</div>
            ) : (
                <div className="notifications-list">
                    {invitations.map(invite => (
                        <div key={invite.id} className="invitation-card">
                            <div className="inv-text">Вас пригласили в группу
                                <div className="group-name">
                                    «{invite.team_name}»
                                </div>
                            </div>
                            <div className="inv-date">
                                Дата: {new Date(invite.invitation_date).toLocaleString()}
                            </div>
                            {invite.status === 'A' ? (
                                <div className="inv-buttons">
                                    <button className="form-button"
                                        id="inv-accept"
                                        onClick={() => respondToInvitation(invite.id, 'C')}>
                                        Принять
                                    </button>
                                    <button className="form-button"
                                        id="inv-reject"
                                        onClick={() => respondToInvitation(invite.id, 'R')}>
                                        Отклонить
                                    </button>
                                </div>
                            ) : (
                                <div className="invitation-status">
                                    {invite.status === 'C' && <div>Принято</div>}
                                    {invite.status === 'R' && <div>Отклонено</div>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
