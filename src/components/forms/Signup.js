import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
    return (
        <div className="form-frame">
            <div className="form-up">
                <div className="form-title">
                    Регистрация
                </div>
                <form className="form">
                    <input className="login-input" type="text" placeholder="Имя"></input>
                    <input className="login-input" type="text" placeholder="Фамилия"></input>
                    <input className="login-input" type="email" placeholder="Почта"></input>
                    <input className="login-input" type="password" placeholder="Пароль"></input>
                    <input className="login-input" type="password" placeholder="Повтор пароля"></input>
                    <button className="login-button">
                        <span className="login-button-text">Зарегестрироваться</span>
                    </button>
                </form>
            </div>
            <div className="form-bottom">
                <div className="">Есть аккаунт?</div>
                <Link to="/registration" className="">Войдите!</Link>
            </div>
        </div>
    )
}

export default Signup