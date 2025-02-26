import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "../styles/App.css";

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

            const response = await axios.post("http://localhost:3000/comments/add", {
                text: newComment,
                userId: user.id,
                voteId
            });

            setComments([...comments, response.data]);
            setNewComment("");
        } catch (error) {
            console.error("Ошибка при добавлении комментария:", error);
        }
    };

    if (!vote) return <div>Загрузка...</div>;

    return (
        <div className="main">
            <Header />
            <div className="main-content">
                <h2>{vote.title}</h2>
                <p>Автор: {vote.anonymous ? "Аноним" : vote.user_name}</p>
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
                <button onClick={handleVoteSubmit}>Проголосовать</button>

                {/* Блок комментариев */}
                <div className="comments-section">
                    <h3>Комментарии</h3>
                    <div className="comments-list">
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <div key={comment.id} className="comment">
                                    <p><strong>{comment.user_name}</strong>: {comment.text}</p>
                                    <small>{new Date(comment.date).toLocaleString()}</small>
                                </div>
                            ))
                        ) : (
                            <p>Пока нет комментариев.</p>
                        )}
                    </div>
                    <textarea
                        placeholder="Оставьте комментарий..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button onClick={handleCommentSubmit}>Добавить</button>
                </div>
            </div>
        </div>
    );
};

export default Vote;
