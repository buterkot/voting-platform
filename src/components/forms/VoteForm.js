import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VoteForm = () => {
    const [votes, setVotes] = useState([]);
    const [filteredVotes, setFilteredVotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3000/votes")
            .then((response) => {
                setVotes(response.data);
                setFilteredVotes(response.data);
            })
            .catch((error) => {
                console.error("Ошибка загрузки голосований:", error);
            });
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = votes.filter((vote) =>
            vote.title.toLowerCase().includes(query)
        );
        setFilteredVotes(filtered);
    };

    const calculateTotalVotes = (options) => {
        return options.reduce((total, option) => total + option.vote_count, 0);
    };

    return (
        <div className="votes-frame">
            <div className='search-block'>
                <div className='search'>Поиск по названию:</div>
                <div className="search-bar">
                    <input
                        className="search-input"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Искать..."
                    />
                </div>
            </div>
            <div className="votes-list">
                {filteredVotes.length === 0 ? (
                    <div>Нет доступных голосований</div>
                ) : (
                    filteredVotes.map((vote) => {
                        const totalVotes = calculateTotalVotes(vote.options);
                        return (
                            <div key={vote.id} className="form-frame">
                                <div className="form-title">{vote.title}</div>
                                <div className="vote-author">
                                    <div className="author">
                                        Автор: {vote.anonymous ? "Аноним" : vote.user_name}
                                    </div>
                                </div>
                                <div className="vote-options">
                                    {vote.options.map((option) => {
                                        const votePercentage = totalVotes
                                            ? (option.vote_count / totalVotes) * 100
                                            : 0;
                                        return (
                                            <div key={option.id} className="vote-option">
                                                <div className="vote-option-text">
                                                    {option.option_text} - {option.vote_count} голосов
                                                </div>
                                                <div className="vote-option-bar">
                                                    <div
                                                        className="vote-bar"
                                                        style={{ width: `${votePercentage}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    className="form-button"
                                    onClick={() => navigate(`/vote/${vote.id}`)}
                                >
                                    Подробнее
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
