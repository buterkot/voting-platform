import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Notifications = ({ userId }) => {
    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);

    const { t, i18n } = useTranslation();

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

    if (loading) return <div>{t("upload_notif")}...</div>;

    return (
        <div className="notif-content">
            {invitations.length === 0 ? (
                <div>{t("no_notif")}.</div>
            ) : (
                <div className="notifications-list">
                    {invitations.map(invite => (
                        <div key={invite.id} className="invitation-card">
                            <div className="inv-text">{t("you_invited")}
                                <div className="group-name">
                                    «{invite.team_name}»
                                </div>
                            </div>
                            <div className="inv-date">
                                {t("date")}: {new Date(invite.invitation_date).toLocaleString()}
                            </div>
                            {invite.status === 'A' ? (
                                <div className="inv-buttons">
                                    <button className="form-button"
                                        id="inv-accept"
                                        onClick={() => respondToInvitation(invite.id, 'C')}>
                                        {t("accept")}
                                    </button>
                                    <button className="form-button"
                                        id="inv-reject"
                                        onClick={() => respondToInvitation(invite.id, 'R')}>
                                        {t("reject")}
                                    </button>
                                </div>
                            ) : (
                                <div className="invitation-status">
                                    {invite.status === 'C' && <div>{t("accepted")}</div>}
                                    {invite.status === 'R' && <div>{t("rejected")}</div>}
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
