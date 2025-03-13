import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSortAmountDownAlt, FaSortAmountUpAlt } from "react-icons/fa";
import "../styles/Comments.css";

const Comments = ({ voteId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [menuOpen, setMenuOpen] = useState(null);
    const [sortOrder, setSortOrder] = useState("desc");
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
            alert("Вы удалили свой комментарий.");
        } catch (error) {
            alert("Ошибка при удалении комментария.");
            console.error(error);
        }
    };

    const handleReportComment = async (commentId) => {
        if (!user || !user.id) {
            alert("Ошибка: не удалось определить пользователя. Авторизуйтесь заново.");
            return;
        }
    
        try {
            await axios.post("http://localhost:3000/complaints/comments", {
                user_id: user.id,
                comment_id: commentId
            });
    
            alert("Жалоба отправлена.");
        } catch (error) {
            console.error("Ошибка при отправке жалобы:", error);
            alert("Ошибка при отправке жалобы.");
        }
    };
    

    const handleSortToggle = () => {
        setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    };

    const sortedComments = [...comments].sort((a, b) =>
        sortOrder === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );

    return (
        <div className="comments-section">
            <div className="block-title">Комментарии ({comments.length})
                <button className="sort-button" onClick={handleSortToggle} title="Изменить порядок сортировки">
                    {sortOrder === "desc" ? <FaSortAmountDownAlt /> : <FaSortAmountUpAlt />}
                </button>
            </div>

            <div className="comment-add">
                <textarea
                    className="comment-area"
                    placeholder="Напишите комментарий..."
                    value={newComment}
                    maxLength={256}
                    rows={3}
                    cols={70}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="form-button" onClick={handleCommentSubmit}>Добавить</button>
            </div>
            <div className="comments-list">
                {sortedComments.length > 0 ? (
                    sortedComments.map(comment => (
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
            </div>
        </div>
    );
};

export default Comments;
