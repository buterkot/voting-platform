import React, { useEffect, useState } from "react";

const GroupMembersModal = ({ group, onClose }) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        if (group) {
            fetch(`http://localhost:3000/groups/${group.id}/members`)
                .then(response => response.json())
                .then(data => setMembers(data))
                .catch(error => console.error("Ошибка загрузки участников:", error));
        }
    }, [group]);

    if (!group) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Участники группы: {group.name}</h2>
                <ul>
                    {members.map(member => (
                        <li key={member.id}>{member.firstname} {member.lastname}</li>
                    ))}
                </ul>
                <button className="close-button" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default GroupMembersModal;
