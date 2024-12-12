import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js";
import CreateVote from "../components/forms/CreateVote.js";
import VoteForm from "../components/forms/VoteForm.js";
import MyVote from "../components/forms/MyVote.js";
import "../styles/App.css";

function Profile() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Профиль";

        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!user || !user.id || user.ban === 1) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="main">
            <Header />
            <div className="main-content">
                <div className="create-vote">
                    <div className="block-title">
                        Создать голосование
                    </div>
                    <CreateVote />
                </div>
                <div className="my-votes">
                    <div className="block-title">
                        Мои голосования
                    </div>
                    <div className="my-votes-content">
                        <MyVote />
                    </div>
                </div>
                <div className="other-votes">
                    <div className="block-title">
                        Доступные голосования
                    </div>
                    <div className="other-votes-content">
                        <VoteForm /> 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
