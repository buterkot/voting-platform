import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Reviews from "../components/Reviews";

function Home() {
    useEffect(() => {
        document.title = "Главная";
    }, []);

    return (
        <div className="main">
            <div className="home-frame">
                <div className="home-frame-up">
                    <div className="form-title">
                        Добро пожаловать!
                    </div>
                    Для доступа к системе онлайн-голосований требуется войти в аккаунт или создать его.
                </div>
                <div className="home-frame-bottom">
                    <div className="home-button">
                        <Link to="/login" className="home-link">Войти в аккаунт</Link>
                    </div>
                    <div className="home-button">
                        <Link to="/signup" className="home-link">Создать аккаунт</Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home