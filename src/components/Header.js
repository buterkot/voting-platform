import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/App.css";
import logo from '../styles/logo512.png';
import { FiMenu } from "react-icons/fi"; 
import { useTranslation } from "react-i18next";

function Header() {
    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error('Ошибка при парсинге данных пользователя:', error);
            }
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('user');  
        navigate('/login'); 
    };

    return (
        <div className="header">
            <div className="header-left">
                <img src={logo} alt="Logo" className="logo" />
                Voting Platform
            </div>
            <div className="header-right">
                {user ? (
                    <div className="user-menu">
                        <div className="user-info">
                            {user.firstname} {user.lastname}
                            <FiMenu className="menu-icon" onClick={() => setMenuOpen(!menuOpen)} />
                        </div>
                        {menuOpen && (
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-item">{t("profile")}</Link>
                                <Link to="/catalog" className="dropdown-item">{t("catalog")}</Link>
                                {user.role === "A" && <Link to="/admin" className="dropdown-item">{t("admin")}</Link>}
                                {user.role === "M" && <Link to="/moder" className="dropdown-item">{t("moder")}</Link>}
                                <button className="dropdown-item logout" onClick={handleLogout}>{t("logout")}</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="text-link1">{t("login")}</Link>
                )}
            </div>
        </div>
    );
}

export default Header;
