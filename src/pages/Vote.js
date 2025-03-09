import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles/App.css";
import "../styles/Comments.css";
import VotesTable from '../components/tables/VotesModal';

const Vote = () => {
    const { voteId } = useParams();
    const navigate = useNavigate();
    const [vote, setVote] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3000/votes/${voteId}`)
            .then(response => setVote(response.data))
            .catch(error => {
                alert("Ошибка загрузки голосования");
                console.error(error);
            });

        axios.get(`http://localhost:3000/comments/${voteId}`)
            .then(response => setComments(response.data))
            .catch(error => {
                console.error("Ошибка загрузки комментариев", error);
            });
    }, [voteId]);

    const handleVoteSubmit = async () => {
        if (!selectedOption) {
            alert("Выберите вариант перед голосованием");
            return;
        }

        try {
            const user = JSON.parse(sessionStorage.getItem("user"));
            if (!user || !user.id) {
                alert("Не удалось определить пользователя. Авторизуйтесь заново.");
                return;
            }

            await axios.post("http://localhost:3000/votes/vote", {
                optionId: selectedOption,
                userId: user.id
            });

            alert("Ваш голос учтен!");
            navigate("/profile");
        } catch (error) {
            alert("Ошибка при голосовании.");
            console.error(error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const user = JSON.parse(sessionStorage.getItem("user"));
            if (!user || !user.id) {
                alert("Не удалось определить пользователя. Авторизуйтесь заново.");
                return;
            }

            const commentData = {
                text: newComment,
                date: new Date().toISOString().slice(0, 19).replace("T", " "),
                user_id: user.id,
                vote_id: voteId
            };

            const response = await axios.post("http://localhost:3000/comments/add", commentData);

            setComments([{ ...commentData, id: response.data.id, user_name: user.firstname + ' ' + user.lastname }, ...comments]);
            setNewComment("");
        } catch (error) {
            alert("Ошибка при добавлении комментария.");
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
                    </div>
                    <div className="vote-options">
                        {vote.options.map(option => {
                            const totalVotes = calculateTotalVotes();
                            const votePercentage = totalVotes ? (option.vote_count / totalVotes) * 100 : 0;

                            return (
                                <div key={option.id} className="vote-option">
                                    <div className="vote-option-up">
                                        <input
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
                    {!vote.anonymous && (
                        <button className="form-button" onClick={handleViewParticipants}>Посмотреть голоса</button>
                    )}
                </div>

                {/* Блок комментариев */}
                <div className="comments-section">
                    <div className="block-title">Комментарии</div>
                    <div className="comments-list">
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <div key={comment.id} className="comment">
                                    <div className="comment-user-name">{comment.user_name || "Аноним"}:</div>
                                    <div className="comment-text">{comment.text}</div>
                                    <div className="comment-date">{new Date(comment.date).toLocaleString()}</div>
                                </div>
                            ))
                        ) : (
                            <div>Пока нет комментариев.</div>
                        )}
                        <div className="comment-add">
                            <textarea
                                className="comment-area"
                                placeholder="Оставьте комментарий..."
                                value={newComment}
                                maxLength={256}
                                rows={3}
                                cols={70}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button className="form-button" onClick={handleCommentSubmit}>Добавить</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Модальное окно с участниками голосования */}
            {isModalOpen && <VotesTable participants={selectedParticipants} onClose={closeModal} />}
        </div>
    );
};

export default Vote;
