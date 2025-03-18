import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles/App.css";
import "../styles/Comments.css";
import VotesTable from '../components/tables/VotesModal';
import Comments from "../components/Comments";

const Vote = () => {
    const { voteId } = useParams();
    const [vote, setVote] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        axios.get(`http://localhost:3000/votes/${voteId}`)
            .then(response => setVote(response.data))
            .catch(error => {
                alert("Ошибка загрузки голосования");
                console.error(error);
            });
    }, [voteId]);

    const handleVoteSubmit = async () => {
        if (!selectedOption) {
            alert("Выберите вариант перед голосованием");
            return;
        }

        try {
            if (!user || !user.id) {
                alert("Не удалось определить пользователя. Авторизуйтесь заново.");
                return;
            }

            await axios.post("http://localhost:3000/votes/vote", {
                optionId: selectedOption,
                userId: user.id
            });

            alert("Ваш голос учтен!");
            window.location.reload();
        } catch (error) {
            alert("Ошибка при голосовании.");
            console.error(error);
        }
    };

    const handleViewParticipants = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/votes/participants/${voteId}`);
            setSelectedParticipants(response.data);
            setIsModalOpen(true);
        } catch (error) {
            alert("Ошибка при загрузке участников голосования.");
            console.error(error);
        }
    };

    const handleReportVote = async () => {
        if (!user || !user.id) {
            alert("Ошибка: не удалось определить пользователя. Авторизуйтесь заново.");
            return;
        }

        try {
            await axios.post("http://localhost:3000/complaints/votes", {
                user_id: user.id,
                vote_id: voteId
            });

            alert("Жалоба на голосование отправлена.");
        } catch (error) {
            console.error("Ошибка при отправке жалобы:", error);
            alert("Ошибка при отправке жалобы.");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedParticipants([]);
    };

    const calculateTotalVotes = () => {
        return vote.options.reduce((total, option) => total + option.vote_count, 0);
    };

    if (!vote) return <div>Проблема...</div>;

    return (
        <div className="main">
            <Header />
            <div className="main-content">
                <div className="block-title">
                    {vote.title}
                </div>

                <div className="form-frame">
                    <div className="vote-author">
                        <div className="author">Автор: {vote.anonymous ? "Аноним" : vote.user_name}</div>
                        <div className="vote-options-button">
                            <button className="options-button" onClick={() => setMenuOpen(!menuOpen)}>
                                ⋮
                            </button>
                            {menuOpen && (
                                <div className="options-menu">
                                    <button onClick={handleReportVote}>Пожаловаться</button>
                                    {!vote.anonymous && <button onClick={handleViewParticipants}>Посмотреть голоса</button>}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="vote-options">
                        {vote.options.map(option => {
                            const totalVotes = calculateTotalVotes();
                            const votePercentage = totalVotes ? (option.vote_count / totalVotes) * 100 : 0;

                            return (
                                <div key={option.id} className="vote-option">
                                    <div className="vote-option-up">
                                        <input
                                            className="vote-option-radio"
                                            type="radio"
                                            id={`option-${option.id}`}
                                            name="vote"
                                            value={option.id}
                                            onChange={() => setSelectedOption(option.id)}
                                        />
                                        <label htmlFor={`option-${option.id}`}>
                                            {option.option_text} ({option.vote_count} голосов)
                                        </label>
                                    </div>
                                    <div className="vote-option-bar">
                                        <div className="vote-bar" style={{ width: `${votePercentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <button className="form-button" onClick={handleVoteSubmit}>Проголосовать</button>
                </div>

                <Comments voteId={voteId} />
            </div>

            {isModalOpen && <VotesTable participants={selectedParticipants} onClose={closeModal} />}
        </div>
    );
};

export default Vote;
