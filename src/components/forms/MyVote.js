import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyVote = () => {
    const [myVotes, setMyVotes] = useState([]);
    const [filteredVotes, setFilteredVotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

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

    const calculateTotalVotes = (options) => {
        return options?.reduce((total, option) => total + option.vote_count, 0) || 0;
    };

    return (
        <div className='my-votes-frame'>
            <div className='filters'>
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
            </div>

            <div className="my-votes-list">
                {filteredVotes.length === 0 ? (
                    <div>Нет созданных вами голосований.</div>
                ) : (
                    filteredVotes.map((vote) => {
                        const totalVotes = calculateTotalVotes(vote.options);
                        return (
                            <div key={vote.id} className="form-frame simple">
                                <div className="form-title">{vote.title}</div>
                                <div className="form-info">
                                    <div>Дата начала: {new Date(vote.start_date).toLocaleString("ru-RU", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}</div>
                                    <div>Количество голосов: {totalVotes}</div>
                                    <div>Статус: {vote.status === "A" ? "Активно" : "Завершено"}</div>
                                </div>
                                <button
                                    className="form-button"
                                    onClick={() => navigate(`/vote/${vote.id}`)}
                                >
                                    Подробнее
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
