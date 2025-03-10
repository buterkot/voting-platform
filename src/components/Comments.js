import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Comments.css";

const Comments = ({ voteId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [menuOpen, setMenuOpen] = useState(null);
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        axios.get(`http://localhost:3000/comments/${voteId}`)
            .then(response => setComments(response.data))
            .catch(error => console.error("Ошибка загрузки комментариев", error));
    }, [voteId]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
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

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:3000/comments/delete/${commentId}`);
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (error) {
            alert("Ошибка при удалении комментария.");
            console.error(error);
        }
    };

    const handleReportComment = (commentId) => {
        alert(`Вы отправили жалобу на комментарий #${commentId}`);
    };

    return (
        <div className="comments-section">
            <div className="block-title">Комментарии</div>
            <div className="comments-list">
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className="comment">
                            <div className="comment-content">
                                <div>
                                    <div className="comment-user-name">{comment.user_name || "Аноним"}:</div>
                                    <div className="comment-text">{comment.text}</div>
                                    <div className="comment-date">{new Date(comment.date).toLocaleString()}</div>
                                </div>
                                <div className="comment-options">
                                    <button className="options-button" onClick={() => setMenuOpen(menuOpen === comment.id ? null : comment.id)}>
                                        ⋮
                                    </button>
                                    {menuOpen === comment.id && (
                                        <div className="options-menu">
                                            {user?.id === comment.user_id ? (
                                                <button onClick={() => handleDeleteComment(comment.id)}>Удалить</button>
                                            ) : (
                                                <button onClick={() => handleReportComment(comment.id)}>Пожаловаться</button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
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
    );
};

export default Comments;
