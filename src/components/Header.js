import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";
import logo from '../styles/logo512.png';

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
                    <>
                        <div className="user-name">
                            {user.firstname} {user.lastname}
                        </div>
                        <button className="header-button" onClick={handleLogout}>Выйти</button>
                    </>
                ) : (
                    <Link to="/login" className="text-link">Войти</Link>
                )}
            </div>
        </div>
    );
}

export default Header;
