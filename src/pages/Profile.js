import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js";
import "../styles/App.css";

function Catalog() {
    const navigate = useNavigate();;

    return (
        <div className="main">
            <Header />
            <div className="main-content">
                <div className="block-title">Профиль</div>
            </div>
        </div>
    );
}

export default Catalog;
