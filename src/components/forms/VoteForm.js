import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const VoteForm = () => {
    const [votes, setVotes] = useState([]);
    const [filteredVotes, setFilteredVotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [myGroupsOnly, setMyGroupsOnly] = useState(false);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const { t, i18n } = useTranslation();

    useEffect(() => {
        axios.get("http://localhost:3000/votes")
            .then((response) => {
                const activeVotes = response.data.filter(vote => !vote.removed);
                setVotes(activeVotes);
                setFilteredVotes(filterVotes(activeVotes, searchQuery, myGroupsOnly));
            })
            .catch((error) => {
                console.error("Ошибка загрузки голосований:", error);
            });
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredVotes(filterVotes(votes, query, myGroupsOnly));
    };

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setMyGroupsOnly(checked);
        setFilteredVotes(filterVotes(votes, searchQuery, checked));
    };

    const filterVotes = (allVotes, query, filterMyGroups) => {
        return allVotes.filter((vote) => {
            const matchesQuery = vote.title.toLowerCase().includes(query);
            const inMyGroups = !filterMyGroups || (
                vote.team_id ||
                user?.groups?.some(group => group.id === vote.team_id)
            );
            return matchesQuery && inMyGroups;
        });
    };

    const calculateTotalVotes = (options) => {
        return options.reduce((total, option) => total + option.vote_count, 0);
    };

    return (
        <div className="votes-frame">
            <div className="filters">
                <div className="search-block">
                    <div className="search">{t("search_by")}:</div>
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

                <div className="checkbox-block">
                    <div className="search">
                        {t("from_my")}:
                    </div>
                    <input
                        className="my-check"
                        type="checkbox"
                        checked={myGroupsOnly}
                        onChange={handleCheckboxChange}
                    />
                </div>
            </div>

            <div className="votes-list">
                {filteredVotes.length === 0 ? (
                    <div>{t("no_available_v")}</div>
                ) : (
                    filteredVotes.map((vote) => {
                        const totalVotes = calculateTotalVotes(vote.options);
                        return (
                            <div key={vote.id} className="form-frame simple">
                                <div className="form-title">{vote.title}</div>
                                {vote.round > 1 && <div className="second-round-alert">{vote.round}{t("second")}</div>}
                                <div className="form-info">
                                    <div>
                                        {t("start_date")}: {new Date(vote.start_date).toLocaleString("ru-RU", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit"
                                        })}
                                    </div>
                                    <div>{t("total_votes")}: {totalVotes}</div>
                                </div>
                                <button
                                    className="form-button"
                                    onClick={() => navigate(`/vote/${vote.id}`)}
                                >
                                    {t("more")}
                                </button>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default VoteForm;
