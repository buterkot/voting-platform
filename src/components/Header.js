import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

function Header() {
    return (
        <header>
            <div>
                <div>
                    Logo
                </div>
                PlatformName
            </div>
            <div>
                <div>
                    Name
                    Surname
                </div>

                <Link to="/home" className="">Выйти</Link>
            </div>


        </header>
    )
}

export default Header