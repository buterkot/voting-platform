import React, { useState, useEffect } from "react";
import axios from "axios";

const VoteForm = () => {
    const [votes, setVotes] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3000/votes')
            .then((response) => {
                setVotes(response.data);
            })
            .catch((error) => {
                setError("Ошибка загрузки голосований.");
                console.error(error);
            });
    }, []);

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

            await axios.post('http://localhost:3000/votes/vote', voteData);
            setError("");
            alert("Ваш голос учтен!");
        } catch (error) {
            setError("Ошибка при отправке голоса.");
            console.error(error);
        }
    };

    return (
        <div className="vote-forms">
            {votes.length === 0 ? (
                <p>Нет доступных голосований</p>
            ) : (
                votes.map((vote) => (
                    <div key={vote.id} className="vote-item">
                        <div className="vote-title">
                            <strong>{vote.title}</strong>
                        </div>
                        <div className="vote-author">
                            <span>Автор: {vote.anonymous ? "Анонимно" : vote.user_name}</span>
                        </div>
                        <div className="vote-options">
                            {vote.options.map((option) => (
                                <div key={option.id} className="vote-option">
                                    <input
                                        type="radio"
                                        id={`option-${option.id}`}
                                        name={`vote-${vote.id}`}
                                        value={option.id}
                                        checked={selectedOptions[vote.id] === option.id}
                                        onChange={() => handleOptionChange(vote.id, option.id)}
                                    />
                                    <label htmlFor={`option-${option.id}`}>
                                        {option.option_text} - {option.vote_count} голосов
                                    </label>
                                </div>
                            ))}
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <button
                            className="submit-vote-button"
                            onClick={() => handleVoteSubmit(vote.id)}
                        >
                            Отправить голос
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default VoteForm;
