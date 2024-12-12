import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios'; 

function Signup() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(''); 
    const navigate = useNavigate();

    const namePattern = /^[A-Za-zА-Яа-яЁё]{1,20}$/; 
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const passwordPattern = /^[A-Za-z0-9._-]{1,20}$/; 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Пароли не совпадают!');
            return;
        }

        setError('');

        if (!namePattern.test(firstname)) {
            setError('Имя должно содержать от 1 до 20 букв.');
            return;
        }
        if (!namePattern.test(lastname)) {
            setError('Фамилия должна содержать от 1 до 20 букв.');
            return;
        }

        if (!emailPattern.test(email)) {
            setError('Почта должна быть в правильном формате.');
            return;
        }

        if (!passwordPattern.test(password)) {
            setError('Пароль должен содержать только буквы, цифры, разрешённые спец-символы (_, -, .) и иметь длину от 1 до 20 символов.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                firstname,
                lastname,
                email,
                password,
            });

            navigate('/login');
        } catch (err) {
            if (err.response) {
                setError(err.response.data || 'Ошибка регистрации');
            } else {
                setError('Ошибка сети или сервера');
            }
        }
    };

    return (
        <div className="form-frame">
            <div className="form-up">
                <div className="form-title">
                    Регистрация
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <input 
                        className="login-input" 
                        type="text" 
                        placeholder="Имя" 
                        value={firstname} 
                        onChange={(e) => setFirstname(e.target.value)} 
                        required
                    />
                    <input 
                        className="login-input" 
                        type="text" 
                        placeholder="Фамилия" 
                        value={lastname} 
                        onChange={(e) => setLastname(e.target.value)} 
                        required
                    />
                    <input 
                        className="login-input" 
                        type="email" 
                        placeholder="Почта" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <input 
                        className="login-input" 
                        type="password" 
                        placeholder="Пароль" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                    <input 
                        className="login-input" 
                        type="password" 
                        placeholder="Повтор пароля" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required
                    />
                    {error && <div className="error-message">{error}</div>} {}
                    <button className="form-button" type="submit">
                        <span className="login-button-text">Зарегистрироваться</span>
                    </button>
                </form>
            </div>
            <div className="form-bottom">
                <div className="form-bottom-text">Есть аккаунт?</div>
                <Link to="/login" className="text-link">Войдите!</Link>
            </div>
        </div>
    )
}

export default Signup;
