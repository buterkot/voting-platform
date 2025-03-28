import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header.js";
import "../styles/App.css";
import "../styles/Complaints.css";

function Moder() {
    const [commentComplaints, setCommentComplaints] = useState([]);
    const [voteComplaints, setVoteComplaints] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await axios.get("http://localhost:3000/complaints");
            const activeComplaints = response.data.filter(complaint => complaint.status === "active");

            setCommentComplaints(activeComplaints.filter(c => c.type === "comment"));
            setVoteComplaints(activeComplaints.filter(c => c.type === "vote"));
        } catch (error) {
            setError("Ошибка загрузки жалоб.");
            console.error(error);
        }
    };

    const handleCommentComplaintAction = async (complaintId, commentId, status, type) => {
        try {
            if (status === "accepted") {
                await axios.patch(`http://localhost:3000/comments/remove/${commentId}`);
            }

            await axios.patch(`http://localhost:3000/complaints/${complaintId}`, { status, type });

            setCommentComplaints(prev => prev.filter(complaint => complaint.id !== complaintId));
        } catch (error) {
            alert("Ошибка при обработке жалобы на комментарий.");
            console.error(error);
        }
    };

    const handleVoteComplaintAction = async (complaintId, voteId, status, type) => {
        try {
            if (status === "accepted") {
                await axios.patch(`http://localhost:3000/votes/remove/${voteId}`);
            }

            await axios.patch(`http://localhost:3000/complaints/${complaintId}`, { status, type });

            setVoteComplaints(prev => prev.filter(complaint => complaint.id !== complaintId));
        } catch (error) {
            alert("Ошибка при обработке жалобы на голосование.");
            console.error(error);
        }
    };

    return (
        <div className="main">
            <Header />
            <div className="main-content">
                {error && <div className="error-message">{error}</div>}

                {/* Жалобы на комментарии */}
                <div className="block-title">Жалобы на комментарии</div>
                {commentComplaints.length > 0 ? (
                    <div className="complaints-container">
                        {commentComplaints.map(complaint => (
                            <div key={complaint.id} className="complaint-card">
                                <div className="complaint-info">
                                    <div><strong>Автор комментария:</strong> {complaint.target_author_firstname + " " + complaint.target_author_lastname}</div>
                                    <div><strong>Комментарий:</strong> {complaint.target_text}</div>
                                    <div><strong>Пожаловался:</strong> {complaint.complainant_firstname + " " + complaint.complainant_lastname}</div>
                                    <div><strong>Дата жалобы:</strong> {new Date(complaint.created_at).toLocaleString()}</div>
                                </div>
                                <div className="complaint-actions">
                                    <button className="accept-btn" onClick={() => handleCommentComplaintAction(complaint.id, complaint.target_id, "accepted", "comment")}>
                                        Принять
                                    </button>
                                    <button className="decline-btn" onClick={() => handleCommentComplaintAction(complaint.id, complaint.target_id, "declined", "comment")}>
                                        Отклонить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Нет активных жалоб на комментарии.</p>
                )}

                {/* Жалобы на голосования */}
                <div className="block-title">Жалобы на голосования</div>
                {voteComplaints.length > 0 ? (
                    <div className="complaints-container">
                        {voteComplaints.map(complaint => (
                            <div key={complaint.id} className="complaint-card">
                                <div className="complaint-info">
                                    <div><strong>Автор голосования:</strong> {complaint.target_author_firstname + " " + complaint.target_author_lastname}</div>
                                    <div><strong>Название голосования:</strong> {complaint.target_text}</div>
                                    <div><strong>Пожаловался:</strong> {complaint.complainant_firstname + " " + complaint.complainant_lastname}</div>
                                    <div><strong>Дата жалобы:</strong> {new Date(complaint.created_at).toLocaleString()}</div>
                                </div>
                                <div className="complaint-actions">
                                    <button className="accept-btn" onClick={() => handleVoteComplaintAction(complaint.id, complaint.target_id, "accepted", "vote")}>
                                        Принять
                                    </button>
                                    <button className="decline-btn" onClick={() => handleVoteComplaintAction(complaint.id, complaint.target_id, "declined", "vote")}>
                                        Отклонить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Нет активных жалоб на голосования.</p>
                )}
            </div>
        </div>
    );
}

export default Moder;
