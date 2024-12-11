import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyVote = () => {
    const [myVotes, setMyVotes] = useState([]);
    const [filteredVotes, setFilteredVotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const user = JSON.parse(sessionStorage.getItem("user"));
                if (!user || !user.id) {
                    setError("Не удалось определить пользователя. Авторизуйтесь заново.");
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

    const handleStopVote = async (voteId) => {
        try {
            await axios.post(`http://localhost:3000/votes/stop`, { voteId });
            setMyVotes((prevVotes) =>
                prevVotes.map((vote) =>
                    vote.id === voteId ? { ...vote, status: "N" } : vote
                )
            );
            setFilteredVotes((prevFilteredVotes) =>
                prevFilteredVotes.map((vote) =>
                    vote.id === voteId ? { ...vote, status: "N" } : vote
                )
            );
        } catch (error) {
            setError("Ошибка при остановке голосования.");
            console.error(error);
        }
    };

    const calculateTotalVotes = (options) => {
        return options.reduce((total, option) => total + option.vote_count, 0);
    };

    return (
        <div className='my-votes-frame'>
            <div className='search-block'>
                <div className='form-subtitle'>Поиск по названию:</div>
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
            <div className="my-votes-list">

                {filteredVotes.length === 0 ? (
                    <div>Нет созданных вами голосований.</div>
                ) : (
                    filteredVotes.map((vote) => {
                        const totalVotes = calculateTotalVotes(vote.options);
                        return (
                            <div key={vote.id} className="form-frame">
                                <div className="form-title">
                                    <strong>{vote.title}</strong>
                                </div>
                                <div className="my-vote-status">
                                    Статус: {vote.status === "A" ? "Активно" : "Остановлено"}
                                </div>
                                <div className="my-vote-options">
                                    {Array.isArray(vote.options) && vote.options.length > 0 ? (
                                        vote.options.map((option) => {
                                            const votePercentage = totalVotes
                                                ? (option.vote_count / totalVotes) * 100
                                                : 0;
                                            return (
                                                <div key={option.id} className="vote-option">
                                                    <div className="vote-option-up">
                                                        <div className="vote-option-text">
                                                            {option.option_text} - {option.vote_count} голосов
                                                        </div>
                                                    </div>

                                                    <div className="vote-option-bar">
                                                        <div
                                                            className="vote-bar"
                                                            style={{ width: `${votePercentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div>Нет доступных вариантов.</div>
                                    )}
                                </div>
                                {vote.status === "A" && (
                                    <button
                                        className="form-button"
                                        onClick={() => handleStopVote(vote.id)}
                                    >
                                        Завершить
                                    </button>
                                )}
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
