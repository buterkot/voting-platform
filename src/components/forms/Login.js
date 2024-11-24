import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="form-frame">
            <div className="form-up">
                <div className="form-title">
                    Авторизация
                </div>
                <form className="form">
                    <input className="login-input" type="email" placeholder="Введите почту"></input>
                    <input className="login-input" type="password" placeholder="Введите пароль"></input>
                    <button className="login-button">
                        <span className="login-button-text">Войти</span>
                    </button>
                </form>
            </div>
            <div className="form-bottom">
                <div className="">Нет аккаунта?</div>
                <Link to="/signup" className="">Зарегистрируйтесь!</Link>
            </div>
        </div>
    )
}

export default Login