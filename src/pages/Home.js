import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home(){
    return(
        <div className="home-frame">
            Добро пожаловать!<br/>
            Для доступа к платформе требуется войти в аккаунт или создать его.<br/>
            <Link to="/login" className="">Войти в аккаунт!</Link>
            <Link to="/signup" className="">Создать аккаунт!</Link>
        </div>
    )
}

export default Home