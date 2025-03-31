import React, { useState, useEffect } from "react";
import Header from "../components/Header.js";
import "../styles/App.css";

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
        const newUserData = { ...userData, [field]: event.target.value };
        setUserData(newUserData);
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
                    </div>
                    <div className="profile-field">
                        <strong>Телефон:</strong>
                        <input
                            type="text"
                            value={userData.phone_number}
                            onChange={(e) => handleInputChange(e, 'phone_number')}
                        />
                    </div>
                    <div className="profile-field">
                        <strong>Группы:</strong>
                        <select disabled>
                            {userData.groups.map((group, index) => (
                                <option key={index} value={group}>{group}</option>
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
                </div>
                <div className="block-title">Уведомления</div>
            </div>
        </div>
    );
}

export default Profile;
