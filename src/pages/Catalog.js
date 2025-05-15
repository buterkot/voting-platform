import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.js";
import CreateVote from "../components/forms/CreateVote.js";
import VoteForm from "../components/forms/VoteForm.js";
import MyVote from "../components/forms/MyVote.js";
import Recom from "../components/forms/Recommendations.js";
import { useTranslation } from "react-i18next";
import "../styles/App.css";

function Catalog() {
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();

    useEffect(() => {
        document.title = t("catalog");

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
                        {t("create_vote")}
                    </div>
                    <CreateVote />
                </div>
                <div className="my-votes">
                    <div className="block-title">
                        {t("my_votes")}
                    </div>
                    <div className="my-votes-content">
                        <MyVote />
                    </div>
                </div>
                <div className="recom-votes">
                    <div className="block-title">
                        {t("recom")}
                    </div>
                    Тут будут рекомендованные голосования
                    <Recom />
                </div>
                <div className="other-votes">
                    <div className="block-title">
                        {t("available_v")}
                    </div>
                    <div className="other-votes-content">
                        <VoteForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Catalog;
