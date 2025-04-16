import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Modal.css";

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
                <div className="modal-header">
                    <div className="modal-title">Участники группы: {group.name}</div>
                    <button onClick={onClose} className="close-button">×</button>
                </div>

                <div className="member-list">
                    {members.map(member => (
                        <div key={member.id} className="member-item">
                            👤
                            <Link to={`/user/${member.id}`} className="user-link">
                                {member.firstname} {member.lastname}
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default GroupMembersModal;
