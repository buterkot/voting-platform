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
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        document.title = "Голосование"; 
        axios.get(`http://localhost:3000/votes/${voteId}`)
            .then(response => setVote(response.data))
            .catch(error => {
                alert("Ошибка загрузки голосования");
                console.error(error);
            });
    }, [voteId]);

    const handleVoteSubmit = async () => {
        if (vote.multiple) {
            if (selectedOptions.length === 0) {
                alert("Выберите хотя бы один вариант перед голосованием");
                return;
            }
        } else {
            if (!selectedOption) {
                alert("Выберите вариант перед голосованием");
                return;
            }
        }

        try {
            if (!user || !user.id) {
                alert("Не удалось определить пользователя. Авторизуйтесь заново.");
                return;
            }

            const voteData = vote.multiple
                ? selectedOptions.map(optionId => ({
                    optionId,
                    userId: user.id
                }))
                : [{ optionId: selectedOption, userId: user.id }];

            await axios.post("http://localhost:3000/votes/vote", voteData);

            alert("Ваш голос учтен!");
            window.location.reload();
        } catch (error) {
            alert("Ошибка при голосовании.");
            console.error(error);
        }
    };

    const handleCheckboxChange = (optionId) => {
        setSelectedOptions(prevSelected =>
            prevSelected.includes(optionId)
                ? prevSelected.filter(id => id !== optionId)
                : [...prevSelected, optionId]
        );
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
            await axios.post("http://localhost:3000/complaints", {
                user_id: user.id,
                target_id: voteId,
                type: "vote"
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
                <div className="block-title">{vote.title}</div>

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
                                        {vote.multiple ? (
                                            <input
                                                type="checkbox"
                                                id={`option-${option.id}`}
                                                checked={selectedOptions.includes(option.id)}
                                                onChange={() => handleCheckboxChange(option.id)}
                                            />
                                        ) : (
                                            <input
                                                type="radio"
                                                id={`option-${option.id}`}
                                                name="vote"
                                                value={option.id}
                                                onChange={() => setSelectedOption(option.id)}
                                            />
                                        )}
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
