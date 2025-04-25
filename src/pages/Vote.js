import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles/App.css";
import "../styles/Comments.css";
import VotesTable from '../components/tables/VotesModal';
import Comments from "../components/Comments";
import ReportModal from "../components/tables/VoteReportModal";

const Vote = () => {
    const { voteId } = useParams();
    const [vote, setVote] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showMoreActions, setShowMoreActions] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);

    const user = JSON.parse(sessionStorage.getItem("user"));
    const isVotingTimeOver = vote?.end_date ? new Date(vote.end_date) < new Date() : false;
    const isVoteActive = vote?.status === "A" && !isVotingTimeOver;

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
        if (vote.multiple) {
            if (selectedOptions.length === 0) {
                alert("Выберите хотя бы один вариант");
                return;
            }

            try {
                await axios.post("http://localhost:3000/votes/vote-multiple", {
                    optionIds: selectedOptions,
                    userId: user.id
                });

                alert("Ваши голоса учтены!");
                window.location.reload();
            } catch (error) {
                alert("Ошибка при голосовании.");
                console.error(error);
            }

        } else {
            if (!selectedOption) {
                alert("Выберите вариант перед голосованием");
                return;
            }

            try {
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

    const handleOpenReport = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/votes/participants/${voteId}`);
            setSelectedParticipants(response.data);
            setIsReportOpen(true);
        } catch (error) {
            alert("Ошибка при получении отчёта.");
            console.error(error);
        }
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
                                        <div className="tooltip-wrapper">
                                            {vote.multiple ? (
                                                <input
                                                    type="checkbox"
                                                    disabled={!isVoteActive}
                                                    checked={selectedOptions.includes(option.id)}
                                                    onChange={() => {
                                                        if (!isVoteActive) return;
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
                                                    disabled={!isVoteActive}
                                                    onChange={() => isVoteActive && setSelectedOption(option.id)}
                                                />
                                            )}
                                            {!isVoteActive && (
                                                <div className="tooltip-text">Голосование завершено</div>
                                            )}
                                        </div>

                                        <label>{option.option_text} ({option.vote_count} голосов)</label>
                                    </div>

                                    <div className="vote-option-bar">
                                        <div className="vote-bar" style={{ width: `${votePercentage}%` }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="tooltip-wrapper">
                        <button
                            className="form-button"
                            id="form-button-vote"
                            onClick={handleVoteSubmit}
                            disabled={!isVoteActive}
                        >
                            Проголосовать
                        </button>
                        {!isVoteActive && (
                            <div className="tooltip-text">Голосование завершено</div>
                        )}
                    </div>

                    {isOwner && (
                        <button
                            className="toggle-actions"
                            onClick={() => setShowMoreActions(prev => !prev)}
                        >
                            {showMoreActions ? "Скрыть действия ▲" : "Дополнительно ▼"}
                        </button>
                    )}

                    {!vote.anonymous && !isOwner && (
                        <button
                            className="form-button"
                            id="form-button-show-votes"
                            onClick={handleViewParticipants}>
                            Посмотреть голоса
                        </button>
                    )}

                    {isOwner && showMoreActions && (
                        <div className="more-actions">
                            {!vote.anonymous && (
                                <button
                                    className="form-button"
                                    id="one-action"
                                    onClick={handleViewParticipants}
                                >
                                    Посмотреть голоса
                                </button>
                            )}

                            {isVoteActive && (
                                <button
                                    className="form-button"
                                    id="one-action"
                                    onClick={handleStopVote}
                                >
                                    Завершить голосование
                                </button>
                            )}

                            <button
                                className="form-button"
                                id="one-action"
                                onClick={handleOpenReport}
                            >
                                Получить отчёт
                            </button>
                        </div>
                    )}
                </div>

                <Comments voteId={voteId} />
            </div>

            {isModalOpen && <VotesTable participants={selectedParticipants} onClose={closeModal} />}
            {isReportOpen && (
                <ReportModal vote={vote} participants={selectedParticipants} onClose={() => setIsReportOpen(false)} />
            )}

        </div>
    );
};

export default Vote;
