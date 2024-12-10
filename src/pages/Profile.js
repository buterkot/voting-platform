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

                    </div>

                </div>
                <div className="other-votes">
                    <div className="block-title">
                        Доступные голосования
                    </div>
                    <div className="other-votes-content">

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile