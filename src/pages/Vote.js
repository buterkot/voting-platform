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

    const isOwner = vote && user && vote.user_id === user.id;

    const handleVoteSubmit = async () => {
        if (vote.multiple && selectedOptions.length === 0) {
            alert("Выберите хотя бы один вариант");
            return;
        }
        if (!vote.multiple && !selectedOption) {
            alert("Выберите вариант");
            return;
        }

        try {
            if (!user?.id) return alert("Пожалуйста, войдите в систему");

            const voteData = vote.multiple
                ? selectedOptions.map(optionId => ({ optionId, userId: user.id }))
                : [{ optionId: selectedOption, userId: user.id }];

            await axios.post("http://localhost:3000/votes/vote", voteData);
            alert("Ваш голос учтен!");
            window.location.reload();
        } catch (error) {
            alert("Ошибка при голосовании.");
            console.error(error);
        }
    };

    const handleStopVote = async () => {
        try {
            await axios.post("http://localhost:3000/votes/stop", { voteId });
            alert("Голосование завершено.");
            window.location.reload();
        } catch (error) {
            alert("Не удалось завершить голосование.");
            console.error(error);
        }
    };

    const handleViewParticipants = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/votes/participants/${voteId}`);
            setSelectedParticipants(response.data);
            setIsModalOpen(true);
        } catch (error) {
            alert("Ошибка при загрузке участников.");
            console.error(error);
        }
    };

    const handleReportVote = async () => {
        if (!user?.id) return alert("Авторизуйтесь заново.");
        try {
            await axios.post("http://localhost:3000/complaints", {
                user_id: user.id,
                target_id: voteId,
                type: "vote"
            });
            alert("Жалоба отправлена.");
        } catch (error) {
            alert("Ошибка при отправке жалобы.");
            console.error(error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedParticipants([]);
    };

    const calculateTotalVotes = () => {
        return vote.options.reduce((total, option) => total + option.vote_count, 0);
    };

    if (!vote) return <div>Загрузка...</div>;

    return (
        <div className="main">
            <Header />
            <div className="main-content">
                <div className="block-title">{vote.title}</div>

                <div className="form-frame">
                    <div className="vote-author">
                        <div><strong>Автор:</strong> {vote.anonymous ? "Аноним" : vote.user_name}</div>
                        <div className="vote-options-button">
                            <button className="options-button" onClick={() => setMenuOpen(!menuOpen)}>
                                ⋮
                            </button>
                            {menuOpen && (
                                <div className="options-menu">
                                    <button onClick={handleReportVote}>Пожаловаться</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="vote-info">
                        <div className="vote-info-field"><strong>Статус:</strong> {vote.status === "A" ? "Активно" : "Завершено"}</div>
                        <div className="vote-info-field"><strong>Дата начала:</strong> {new Date(vote.start_date).toLocaleString()}</div>
                        {vote.end_date && (
                            <div className="vote-info-field"><strong>Дата окончания:</strong> {new Date(vote.end_date).toLocaleString()}</div>
                        )}
                        <div className="vote-info-field"><strong>Всего голосов:</strong> {calculateTotalVotes()}</div>
                        {vote.group_name && (
                            <div className="vote-info-field"><strong>Группа:</strong> {vote.group_name}</div>
                        )}
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
                                                checked={selectedOptions.includes(option.id)}
                                                onChange={() => {
                                                    setSelectedOptions(prev =>
                                                        prev.includes(option.id)
                                                            ? prev.filter(id => id !== option.id)
                                                            : [...prev, option.id]
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <input
                                                type="radio"
                                                name="vote"
                                                value={option.id}
                                                onChange={() => setSelectedOption(option.id)}
                                            />
                                        )}
                                        <label>{option.option_text} ({option.vote_count} голосов)</label>
                                    </div>
                                    <div className="vote-option-bar">
                                        <div className="vote-bar" style={{ width: `${votePercentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button className="form-button" onClick={handleVoteSubmit}>
                        Проголосовать
                    </button>

                    {isOwner && (
                        <>
                            {vote.status === "A" && (
                                <button className="form-button" onClick={handleStopVote}>
                                    Завершить голосование
                                </button>
                            )}
                            {!vote.anonymous && (
                                <button className="form-button" onClick={handleViewParticipants}>
                                    Посмотреть голоса
                                </button>
                            )}
                        </>
                    )}
                </div>

                <Comments voteId={voteId} />
            </div>

            {isModalOpen && <VotesTable participants={selectedParticipants} onClose={closeModal} />}
        </div>
    );
};

export default Vote;
