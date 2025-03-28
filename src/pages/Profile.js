import React from "react";
import Header from "../components/Header.js";
import "../styles/App.css";

function Catalog() {
    return (
        <div className="main">
            <Header />
            <div className="main-content">
                <div className="block-title">Личные данные</div>
                <div className="block-title">Уведомления</div>
            </div>
        </div>
    );
}

export default Catalog;
