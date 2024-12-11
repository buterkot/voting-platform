import React, { useState, useEffect } from "react";
import axios from "axios";

const VoteForm = () => {
    const [votes, setVotes] = useState([]);
    const [filteredVotes, setFilteredVotes] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/votes")
            .then((response) => {
                setVotes(response.data);
                setFilteredVotes(response.data);
            })
            .catch((error) => {
                setError("Ошибка загрузки голосований.");
                console.error(error);
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

    const handleOptionChange = (voteId, optionId) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [voteId]: optionId
        }));
    };

    const handleVoteSubmit = async (voteId) => {
        if (!selectedOptions[voteId]) {
            setError("Пожалуйста, выберите вариант.");
            return;
        }

        try {
            const user = JSON.parse(sessionStorage.getItem("user"));
            if (!user || !user.id) {
                setError("Не удалось определить пользователя. Авторизуйтесь заново.");
                return;
            }

            const voteData = {
                optionId: selectedOptions[voteId],
                userId: user.id
            };

            await axios.post("http://localhost:3000/votes/vote", voteData);
            setError("");
            alert("Ваш голос учтен!");
        } catch (error) {
            setError("Ошибка при отправке голоса.");
            console.error(error);
        }
    };

    const calculateTotalVotes = (options) => {
        return options.reduce((total, option) => total + option.vote_count, 0);
    };

    return (
        <div className="votes-frame">
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
            <div className="votes-list">
                {filteredVotes.length === 0 ? (
                    <div>Нет доступных голосований</div>
                ) : (
                    filteredVotes.map((vote) => {
                        const totalVotes = calculateTotalVotes(vote.options);
                        return (
                            <div key={vote.id} className="form-frame">
                                <div className="form-title">
                                    {vote.title}
                                </div>
                                <div className="vote-author">
                                    <div className="form-subtitle">Автор: {vote.anonymous ? "Аноним" : vote.user_name}</div>
                                </div>
                                <div className="vote-options">
                                    {vote.options.map((option) => {
                                        const votePercentage = totalVotes
                                            ? (option.vote_count / totalVotes) * 100
                                            : 0;
                                        return (
                                            <div key={option.id} className="vote-option">
                                                <div className="vote-option-up">
                                                    <input
                                                        type="radio"
                                                        id={`option-${option.id}`}
                                                        name={`vote-${vote.id}`}
                                                        value={option.id}
                                                        checked={selectedOptions[vote.id] === option.id}
                                                        onChange={() => handleOptionChange(vote.id, option.id)}
                                                    />
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
                                    })}
                                </div>
                                {error && <div className="error-message">{error}</div>}
                                <button
                                    className="form-button"
                                    onClick={() => handleVoteSubmit(vote.id)}
                                >
                                    Проголосовать
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
