import React, { useState, useEffect } from "react";
import Header from "../components/Header.js";
import GroupMembersModal from "../components/tables/GroupMembersModal";
import CreateGroup from "../components/tables/CreateGroup";
import Notifications from "../components/Notifications.js";
import { useTranslation } from "react-i18next";

import "../styles/App.css";
import "../styles/Profile.css";
import "../styles/Notifications.css";

function Profile() {
    const user = JSON.parse(sessionStorage.getItem('user')) || {};

    const { t, i18n } = useTranslation();

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
        i18n.changeLanguage(language);
    }, [userData, isProfilePrivate, language, theme]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const handleProfilePrivacyChange = () => {
        setIsProfilePrivate(!isProfilePrivate);
    };

    const handleLanguageChange = (event) => {
        const selectedLang = event.target.value;
        setLanguage(selectedLang);
        i18n.changeLanguage(selectedLang); 
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

    const handleGroupSelect = (event) => {
        const groupId = event.target.value;
        const group = userData.groups.find(g => g.id === parseInt(groupId));
        setSelectedGroup(group);
    };

    return (
        <div className={`main ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
            <Header />
            <div className="main-content">
                <div className="block-title">{t("personal_data")}</div>
                <div className="profile-info">
                    <div className="profile-field">
                        <div className="profile-field-name1">{userData.firstname}</div>
                        <div className="profile-field-name2">{userData.lastname}</div>
                    </div>
                    <div className="profile-field">
                        <div className="profile-field-mail">{userData.email}</div>
                    </div>
                    <div className="profile-field">
                        <div className="profile-field-label">{t("last_login")}:</div>
                        <div className="profile-field-info">
                            {new Date(Date.parse(userData.last_online)).toLocaleString()}
                        </div>
                    </div>
                    <div className="profile-field" id="address">
                        <div className="profile-field-label">{t("address")}:</div>
                        <input
                            className="profile-input"
                            type="text"
                            value={userData.address}
                            onChange={(e) => handleInputChange(e, 'address')}
                        />
                        <button className="form-button-save" onClick={() => handleSave('address')}>{t("save")}</button>
                    </div>
                    <div className="profile-field" id="phone-number">
                        <div className="profile-field-label">{t("phone")}:</div>
                        <input
                            className="profile-input"
                            type="text"
                            value={userData.phone_number}
                            onChange={(e) => handleInputChange(e, 'phone_number')}
                        />
                        <button className="form-button-save" onClick={() => handleSave('phone_number')}>{t("save")}</button>
                    </div>
                    <div className="profile-field">
                        <div className="profile-field-label">{t("groups")}:</div>
                        <div className="select-wrapper">
                            <select className="group-selection" onChange={handleGroupSelect}>
                                <option value="">{t("select_group")}</option>
                                {userData.groups.map(group => (
                                    <option key={group.id} value={group.id}>{group.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="block-title">{t("settings")}</div>
                <div className="settings-section">
                    <div className="settings-option">
                        <div className="settings-option-label">{t("profile_privacy")}:</div>
                        <input
                            className="settings-checkbox"
                            type="checkbox"
                            checked={isProfilePrivate}
                            onChange={handleProfilePrivacyChange}
                        />

                    </div>

                    <div className="settings-option" id="s-language">
                        <div className="settings-option-label">{t("language")}:</div>
                        <div className="select-wrapper2">
                            <select className="language-selection" value={language} onChange={handleLanguageChange}>
                                <option value="ru">Русский</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                    </div>

                    <div className="settings-option" id="s-theme">
                        <div className="settings-option-label">{t("theme")}:</div>
                        <div className="select-wrapper2">
                            <select className="theme-selection" value={theme} onChange={handleThemeChange}>
                                <option value="light">{t("light")}</option>
                                <option value="dark">{t("dark")}</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-button-create-container">
                        <button className="form-button-create" onClick={handleSaveSettings}>{t("save")}</button>
                        <button className="form-button-create" onClick={() => setIsModalOpen(true)}>{t("create_group")}</button>
                    </div>
                </div>
                <div className="block-title">{t("notifications")}</div>
                <Notifications userId={user.id} />
            </div>

            {selectedGroup && (
                <GroupMembersModal
                    group={selectedGroup}
                    onClose={() => setSelectedGroup(null)}
                />
            )}

            {isModalOpen && (
                <CreateGroup
                    userId={user.id}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

export default Profile;
