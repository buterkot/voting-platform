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
                const activeVotes = response.data.filter(vote => !vote.removed);
                setVotes(activeVotes);
                setFilteredVotes(activeVotes);
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
                        const formattedDate = new Date(Date.parse(vote.start_date)).toLocaleDateString();
                        return (
                            <div key={vote.id} className="form-frame simple">
                                <div className="form-title">{vote.title}</div>
                                <div className="form-info">
                                    <div>Дата: {formattedDate}</div>
                                    <div>Голосов: {totalVotes}</div>
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
