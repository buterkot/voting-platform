import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyVote = () => {
    const [myVotes, setMyVotes] = useState([]);
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
            } catch (error) {
                setError("Ошибка при загрузке голосований.");
                console.error(error);
            }
        };

        fetchVotes();
    }, []);

    const handleStopVote = async (voteId) => {
        try {
            await axios.post(`http://localhost:3000/votes/stop`, { voteId });
            setMyVotes((prevVotes) =>
                prevVotes.map((vote) =>
                    vote.id === voteId ? { ...vote, status: "N" } : vote
                )
            );
        } catch (error) {
            setError("Ошибка при остановке голосования.");
            console.error(error);
        }
    };

    return (
        <div className="my-votes-list">
            {myVotes.length === 0 ? (
                <p>Нет созданных вами голосований.</p>
            ) : (
                myVotes.map((vote) => (
                    <div key={vote.id} className="my-vote-item">
                        <div className="my-vote-title">
                            <strong>{vote.title}</strong>
                        </div>
                        <div className="my-vote-status">
                            Статус: {vote.status === "A" ? "Активно" : "Остановлено"}
                        </div>
                        <div className="my-vote-options">
                            <strong>Варианты:</strong>
                            <ul>
                                {/* Добавлена проверка на наличие options */}
                                {Array.isArray(vote.options) && vote.options.length > 0 ? (
                                    vote.options.map((option) => (
                                        <li key={option.id}>
                                            {option.option_text} - {option.vote_count} голосов
                                        </li>
                                    ))
                                ) : (
                                    <li>Нет доступных вариантов.</li>
                                )}
                            </ul>
                        </div>
                        {vote.status === "A" && (
                            <button
                                className="stop-vote-button"
                                onClick={() => handleStopVote(vote.id)}
                            >
                                Остановить
                            </button>
                        )}
                        {error && <div className="error-message">{error}</div>}
                    </div>
                ))
            )}
        </div>
    );
};

export default MyVote;
