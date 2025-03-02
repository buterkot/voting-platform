import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles/App.css";
import "../styles/Comments.css";

const Vote = () => {
    const { voteId } = useParams();
    const navigate = useNavigate();
    const [vote, setVote] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [error, setError] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/votes/${voteId}`)
            .then(response => {
                setVote(response.data);
            })
            .catch(error => {
                setError("Ошибка загрузки голосования");
                console.error(error);
            });

        axios.get(`http://localhost:3000/comments/${voteId}`)
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error("Ошибка загрузки комментариев", error);
            });
    }, [voteId]);

    const handleVoteSubmit = async () => {
        if (!selectedOption) {
            setError("Выберите вариант перед голосованием");
            return;
        }

        try {
            const user = JSON.parse(sessionStorage.getItem("user"));
            if (!user || !user.id) {
                setError("Не удалось определить пользователя. Авторизуйтесь заново.");
                return;
            }

            await axios.post("http://localhost:3000/votes/vote", {
                optionId: selectedOption,
                userId: user.id
            });
            alert("Ваш голос учтен!");
            navigate("/profile");
        } catch (error) {
            setError("Ошибка при голосовании.");
            console.error(error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const user = JSON.parse(sessionStorage.getItem("user"));
            if (!user || !user.id) {
                setError("Не удалось определить пользователя. Авторизуйтесь заново.");
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
            console.error("Ошибка при добавлении комментария:", error);
        }
    };

    if (!vote) return <div>Проблема...</div>;

    return (
        <div className="main">
            <Header />
            <div className="main-content">

                <div className="block-title">{vote.title}</div>
                <div className="form-frame">
                    <div className="vote-author">
                        <div className="form-subtitle">Автор: {vote.anonymous ? "Аноним" : vote.user_name}</div>
                    </div>
                    <div className="vote-options">
                        {vote.options.map(option => (
                            <div key={option.id}>
                                <input
                                    type="radio"
                                    id={`option-${option.id}`}
                                    name="vote"
                                    value={option.id}
                                    onChange={() => setSelectedOption(option.id)}
                                />
                                <label htmlFor={`option-${option.id}`}>{option.option_text} ({option.vote_count} голосов)</label>
                            </div>
                        ))}
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button
                        className="form-button"
                        onClick={handleVoteSubmit}>Проголосовать
                    </button>
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
                            <button
                                className="form-button"
                                onClick={handleCommentSubmit}>Добавить</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Vote;
