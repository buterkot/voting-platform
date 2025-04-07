import React, { useEffect, useState } from "react";

const InviteToGroupModal = ({ userId, creatorId, onClose }) => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");

    useEffect(() => {
        fetch(`http://localhost:3000/groups/creator/${creatorId}`)
            .then(response => response.json())
            .then(data => setGroups(data))
            .catch(error => console.error("Ошибка загрузки групп:", error));
    }, [creatorId]);

    const handleInvite = async () => {
        if (!selectedGroup) {
            alert("Выберите группу");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/invitations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, groupId: selectedGroup }),
            });

            if (response.ok) {
                alert("Приглашение отправлено");
                onClose();
            } else {
                const result = await response.json();
                if (result.message === "Пользователь уже является участником группы") {
                    alert("Пользователь уже в группе");
                } else if (result.message === "Приглашение уже отправлено") {
                    alert("Приглашение уже отправлялось");
                } else {
                    alert("Ошибка при отправке приглашения");
                }
            }
        } catch (error) {
            console.error("Ошибка при отправке приглашения:", error);
            alert("Ошибка при отправке приглашения");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Пригласить в группу</h2>
                <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
                    <option value="">Выберите группу</option>
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
                <button onClick={handleInvite}>Пригласить</button>
                <button onClick={onClose} className="close-button">×</button>
            </div>
        </div>
    );
};

export default InviteToGroupModal;
