import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";
import logo from '../styles/logo512.png';


function Header() {
    return (
        <div className="header">
            <div className="header-left">
                <img src={logo} alt="Logo" className="logo" />
                Voting Platform
            </div>
            <div className="header-right">
                <div className="user-name">
                    Name Surname
                </div>
                <Link to="/home" className="text-link">Выйти</Link>
            </div>
        </div>
    )
}

export default Header