import React, { useState } from "react";

const CreateGroup = ({ userId, onClose }) => {
    const [groupName, setGroupName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    const handleCreateGroup = async () => {
        try {
            const response = await fetch("http://localhost:3000/groups", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: groupName,
                    creatorId: userId,
                    isPrivate: isPrivate ? 1 : 0
                }),
            });

            if (response.ok) {
                alert("Группа успешно создана");
                onClose();
            } else {
                alert("Ошибка при создании группы");
            }
        } catch (error) {
            console.error("Ошибка при создании группы:", error);
            alert("Ошибка при создании группы");
        }
    };

    return (
        <div className="modal">
            <div className="modal-content" id="create-group-content">
                <div className="modal-header">
                    <div className="modal-title">Создать группу</div>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="group-create-content">
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Название группы"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                    <div className="private-group">
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={() => setIsPrivate(!isPrivate)}
                        />
                        <div className="private-group-label">Приватная</div>
                    </div>
                    <button className="form-button" onClick={handleCreateGroup}>Создать</button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup;