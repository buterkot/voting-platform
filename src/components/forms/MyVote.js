import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from "react-i18next";

const MyVote = () => {
    const [myVotes, setMyVotes] = useState([]);
    const [filteredVotes, setFilteredVotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem("user"));
                if (!user || !user.id) {
                    setError(t("fail_user"));
                    return;
                }

                const response = await axios.get(`http://localhost:3000/votes/user/${user.id}`);
                setMyVotes(response.data);
                setFilteredVotes(response.data);
            } catch (error) {
                setError("Ошибка при загрузке голосований.");
                console.error(error);
            }
        };

        fetchVotes();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = myVotes.filter((vote) =>
            vote.title.toLowerCase().includes(query)
        );
        setFilteredVotes(filtered);
    };

    const calculateTotalVotes = (options) => {
        return options?.reduce((total, option) => total + option.vote_count, 0) || 0;
    };

    return (
        <div className='my-votes-frame'>
            <div className='filters'>
                <div className='search-block'>
                    <div className='search'>{t("search_by")}:</div>
                    <div className="search-bar">
                        <input
                            className="search-input"
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder={t("search")}
                        />
                    </div>
                </div>
            </div>

            <div className="my-votes-list">
                {filteredVotes.length === 0 ? (
                    <div>{t("no_votes")}</div>
                ) : (
                    filteredVotes.map((vote) => {
                        const totalVotes = calculateTotalVotes(vote.options);
                        return (
                            <div key={vote.id} className="form-frame simple">
                                <div className="form-title">{vote.title}</div>
                                {vote.round > 1 && <div className="second-round-alert">{vote.round}{t("second")}</div>}
                                <div className="form-info">
                                    <div>{t("start_date")}: {new Date(vote.start_date).toLocaleString("ru-RU", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</div>
                                    <div>{t("total_votes")}: {totalVotes}</div>
                                    <div>{t("status")}: {vote.status === "A" ? t("active") : t("completed")}</div>
                                </div>
                                <button
                                    className="form-button"
                                    onClick={() => navigate(`/vote/${vote.id}`)}
                                >
                                    {t("more")}
                                </button>
                                {error && <div className="error-message">{error}</div>}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MyVote;
