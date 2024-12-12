import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email,
                password
            });

            if (response.status === 200) {
                const { user } = response.data;

                if (user.ban === 1) {
                    setError("Ваш аккаунт заблокирован. Обратитесь к администратору.");
                    return;
                }

                sessionStorage.setItem('user', JSON.stringify(user));

                setError('');
                
                if (user.role === 'A') {
                    navigate('/admin'); 
                } else {
                    navigate('/profile'); 
                }
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Неверный логин или пароль');
        }
    };

    return (
        <div className="form-frame">
            <div className="form-up">
                <div className="form-title">
                    Авторизация
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        className="login-input"
                        type="email"
                        placeholder="Введите почту"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div className="error-message">{error}</div>}
                    <button className="form-button">
                        <span className="login-button-text">Войти</span>
                    </button>
                </form>
            </div>
            <div className="form-bottom">
                <div className="form-bottom-text">Нет аккаунта?</div>
                <Link to="/signup" className="text-link">Зарегистрируйтесь!</Link>
            </div>
        </div>
    );
}

export default Login;
