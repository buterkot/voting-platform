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

    const handleSaveSettings = async () => {
        try {
            const response = await fetch("http://localhost:3000/users/update-settings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user.id,
                    profilePrivate: isProfilePrivate,
                    language,
                    theme
                }),
            });
    
            if (response.ok) {
                alert("Настройки успешно сохранены");
            } else {
                alert("Ошибка при сохранении настроек");
            }
        } catch (error) {
            console.error("Ошибка при отправке запроса:", error);
            alert("Ошибка при сохранении настроек");
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
                        <div className="profile-field-name1">{userData.firstname}</div>
                        <div className="profile-field-name2">{userData.lastname}</div>
                    </div>
                    <div className="profile-field">
                        <div className="profile-field-mail">{userData.email}</div>
                    </div>
                    <div className="profile-field">
                        <div className="profile-field-label">Последний вход:</div>
                        <div className="profile-field-info">
                            {new Date(Date.parse(userData.last_online)).toLocaleString()}
                        </div>
                    </div>
                    <div className="profile-field" id="address">
                        <div className="profile-field-label">Адрес:</div>
                        <input
                            className="profile-input"
                            type="text"
                            value={userData.address}
                            onChange={(e) => handleInputChange(e, 'address')}
                        />
                        <button className="form-button-save" onClick={() => handleSave('address')}>Сохранить</button>
                    </div>
                    <div className="profile-field" id="phone-number">
                        <div className="profile-field-label">Телефон:</div>
                        <input
                            className="profile-input"
                            type="text"
                            value={userData.phone_number}
                            onChange={(e) => handleInputChange(e, 'phone_number')}
                        />
                        <button className="form-button-save" onClick={() => handleSave('phone_number')}>Сохранить</button>
                    </div>
                    <div className="profile-field">
                        <div className="profile-field-label">Группы:</div>
                        <div className="select-wrapper">
                            <select className="group-selection" onChange={handleGroupSelect}>
                                <option value="">Выберите группу</option>
                                {userData.groups.map(group => (
                                    <option key={group.id} value={group.id}>{group.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="block-title">Настройки</div>
                <div className="settings-section">
                    <div className="settings-option">
                        <div className="settings-option-label">Приватность профиля:</div>
                        <input
                            className="settings-checkbox"
                            type="checkbox"
                            checked={isProfilePrivate}
                            onChange={handleProfilePrivacyChange}
                        />

                    </div>

                    <div className="settings-option" id="s-language">
                        <div className="settings-option-label">Язык:</div>
                        <div className="select-wrapper2">
                            <select className="language-selection" value={language} onChange={handleLanguageChange}>
                                <option value="ru">Русский</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                    </div>

                    <div className="settings-option" id="s-theme">
                        <div className="settings-option-label">Тема:</div>
                        <div className="select-wrapper2">
                            <select className="theme-selection" value={theme} onChange={handleThemeChange}>
                                <option value="light">Светлая</option>
                                <option value="dark">Тёмная</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-button-create-container">
                        <button className="form-button-create" onClick={handleSaveSettings}>Сохранить</button>
                        <button className="form-button-create" onClick={() => setIsModalOpen(true)}>Создать группу</button>
                    </div>
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
                        <div>Создать группу</div>
                        <input
                            type="text"
                            placeholder="Название группы"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                        <div>
                            <input
                                type="checkbox"
                                checked={isPrivate}
                                onChange={() => setIsPrivate(!isPrivate)}
                            />
                            Приватная
                        </div>
                        <button onClick={handleCreateGroup}>Создать</button>
                        <button className="close-button" onClick={() => setIsModalOpen(false)}>×</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
