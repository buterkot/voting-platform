import React, { useState, useEffect } from "react";
import Header from "../components/Header.js";
import GroupMembersModal from "../components/tables/GroupMembersModal";
import Notifications from "../components/Notifications.js";
import "../styles/App.css";
import "../styles/Profile.css";
import "../styles/Notifications.css";

function Profile() {
    const user = JSON.parse(sessionStorage.getItem('user')) || {};

    const [isProfilePrivate, setIsProfilePrivate] = useState(user.profilePrivate || false);
    const [language, setLanguage] = useState(user.language || 'ru');
    const [theme, setTheme] = useState(user.theme || 'light');
    const [userData, setUserData] = useState({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        address: user.address || '',
        phone_number: user.phone_number || '',
        last_online: user.last_online || '',
        groups: user.groups || [],
    });

    useEffect(() => {
        document.title = "Профиль";
        sessionStorage.setItem('user', JSON.stringify({
            ...user,
            profilePrivate: isProfilePrivate,
            language,
            theme,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            address: userData.address,
            phone_number: userData.phone_number,
            last_online: user.last_online,
            groups: user.groups
        }));
    }, [userData, isProfilePrivate, language, theme]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleProfilePrivacyChange = () => {
        setIsProfilePrivate(!isProfilePrivate);
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
    };

    const handleInputChange = (event, field) => {
        setUserData({ ...userData, [field]: event.target.value });
    };

    const handleSave = async (field) => {
        try {
            const response = await fetch("http://localhost:3000/users/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    [field]: userData[field],
                }),
            });

            if (response.ok) {
                alert("Данные успешно обновлены");
            } else {
                alert("Ошибка при обновлении данных");
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
            alert("Ошибка при обновлении данных");
        }
    };

    const handleCreateGroup = async () => {
        try {
            const response = await fetch("http://localhost:3000/groups", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: groupName,
                    creatorId: user.id,
                    isPrivate: isPrivate ? 1 : 0
                }),
            });

            if (response.ok) {
                alert("Группа успешно создана");
                setIsModalOpen(false);
                setGroupName("");
                setIsPrivate(false);
            } else {
                alert("Ошибка при создании группы");
            }
        } catch (error) {
            console.error("Ошибка при создании группы:", error);
            alert("Ошибка при создании группы");
        }
    };

    const handleGroupSelect = (event) => {
        const groupId = event.target.value;
        const group = userData.groups.find(g => g.id === parseInt(groupId));
        setSelectedGroup(group);
    };

    return (
        <div className={`main ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
            <Header />
            <div className="main-content">
                <div className="block-title">Личные данные</div>
                <div className="profile-info">
                    <div className="profile-field">
                        <strong>Имя:</strong> {userData.firstname}
                    </div>
                    <div className="profile-field">
                        <strong>Фамилия:</strong> {userData.lastname}
                    </div>
                    <div className="profile-field">
                        <strong>Почта:</strong> {userData.email}
                    </div>
                    <div className="profile-field">
                        <strong>Последний вход:</strong> {new Date(Date.parse(userData.last_online)).toLocaleString()}
                    </div>
                    <div className="profile-field">
                        <strong>Адрес:</strong>
                        <input
                            type="text"
                            value={userData.address}
                            onChange={(e) => handleInputChange(e, 'address')}
                        />
                        <button onClick={() => handleSave('address')}>Сохранить</button>
                    </div>
                    <div className="profile-field">
                        <strong>Телефон:</strong>
                        <input
                            type="text"
                            value={userData.phone_number}
                            onChange={(e) => handleInputChange(e, 'phone_number')}
                        />
                        <button onClick={() => handleSave('phone_number')}>Сохранить</button>
                    </div>
                    <div className="profile-field">
                        <strong>Группы:</strong>
                        <select onChange={handleGroupSelect}>
                            <option value="">Выберите группу</option>
                            {userData.groups.map(group => (
                                <option key={group.id} value={group.id}>{group.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="block-title">Настройки</div>
                <div className="settings-section">
                    <div className="settings-option">
                        <label>
                            <input
                                type="checkbox"
                                checked={isProfilePrivate}
                                onChange={handleProfilePrivacyChange}
                            />
                            Приватность
                        </label>
                    </div>

                    <div className="settings-option">
                        <label>Язык:</label>
                        <select value={language} onChange={handleLanguageChange}>
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    <div className="settings-option">
                        <label>Тема:</label>
                        <select value={theme} onChange={handleThemeChange}>
                            <option value="light">Светлая</option>
                            <option value="dark">Тёмная</option>
                        </select>
                    </div>
                    <button onClick={() => setIsModalOpen(true)}>Создать группу</button>
                </div>
                <div className="block-title">Уведомления</div>
                <Notifications userId={user.id} />
            </div>

            {selectedGroup && (
                <GroupMembersModal
                    group={selectedGroup}
                    onClose={() => setSelectedGroup(null)}
                />
            )}

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Создать группу</h2>
                        <input
                            type="text"
                            placeholder="Название группы"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={isPrivate}
                                onChange={() => setIsPrivate(!isPrivate)}
                            />
                            Приватная
                        </label>
                        <button onClick={handleCreateGroup}>Создать</button>
                        <button className="close-button" onClick={() => setIsModalOpen(false)}>×</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
