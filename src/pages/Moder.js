import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header.js";
import "../styles/App.css";
import "../styles/Complaints.css";

function Moder() {
    const [commentComplaints, setCommentComplaints] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCommentComplaints();
    }, []);

    const fetchCommentComplaints = async () => {
        try {
            const response = await axios.get("http://localhost:3000/complaints/comments");
            const activeComplaints = response.data.filter(complaint => complaint.status === "active");
            setCommentComplaints(activeComplaints);
        } catch (error) {
            setError("Ошибка загрузки жалоб на комментарии.");
            console.error(error);
        }
    };

    const handleComplaintAction = async (complaintId, commentId, status) => {
        try {
            if (status === "accepted") {
                await axios.patch(`http://localhost:3000/comments/remove/${commentId}`);
            }

            await axios.patch(`http://localhost:3000/complaints/comments/${complaintId}`, { status });

            setCommentComplaints(prevComplaints => prevComplaints.filter(complaint => complaint.id !== complaintId));
        } catch (error) {
            setError("Ошибка при обработке жалобы.");
            console.error(error);
        }
    };


    return (
        <div className="main">
            <Header />
            <div className="main-content">
                <div className="block-title">Жалобы на комментарии</div>
                {error && <div className="error-message">{error}</div>}

                {commentComplaints.length > 0 ? (
                    <div className="complaints-container">
                        {commentComplaints.map(complaint => (
                            <div key={complaint.id} className="complaint-card">
                                <div className="complaint-info">
                                    <div><strong>Автор комментария:</strong> {complaint.comment_author_firstname + " " + complaint.comment_author_lastname}</div>
                                    <div><strong>Комментарий:</strong> {complaint.comment_text}</div>
                                    <div><strong>Пожаловался:</strong> {complaint.complainant_firstname + " " + complaint.complainant_lastname}</div>
                                    <div><strong>Дата жалобы:</strong> {new Date(complaint.created_at).toLocaleString()}</div>
                                </div>
                                <div className="complaint-actions">
                                    <button className="accept-btn" onClick={() => handleComplaintAction(complaint.id, complaint.comment_id, "accepted")}>
                                        Принять
                                    </button>

                                    <button className="decline-btn" onClick={() => handleComplaintAction(complaint.id, "declined")}>
                                        Отклонить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Нет активных жалоб на комментарии.</p>
                )}

                <div className="block-title">Жалобы на голосования</div>
                <p>Функционал в разработке...</p>
            </div>
        </div>
    );
}

export default Moder;
