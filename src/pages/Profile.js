import React, { useState, useEffect } from "react";
import Header from "../components/Header.js";
import CreateVote from "../components/forms/CreateVote.js";
import "../styles/App.css";

function Profile() {
    useEffect(() => {
        document.title = "Профиль";
    }, []);

    return (
        <div className="main">
            <Header />
            <CreateVote />
        </div>

    )
}

export default Profile