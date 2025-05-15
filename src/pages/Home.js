import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {

    const { t, i18n } = useTranslation();

    useEffect(() => {
        document.title = "Главная";
    }, []);

    return (
        <div className="main">
            <div className="home-frame">
                <div className="home-frame-up">
                    <div className="form-title">
                        {t("welcome")}!
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