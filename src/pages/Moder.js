import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header.js";
import "../styles/App.css";
import "../styles/Complaints.css";
import { useTranslation } from "react-i18next";

function Moder() {
    const [commentComplaints, setCommentComplaints] = useState([]);
    const [voteComplaints, setVoteComplaints] = useState([]);
    const [error, setError] = useState("");

    const { t, i18n } = useTranslation();

    useEffect(() => {
        fetchComplaints();
        document.title = t("moder"); 
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
            alert(t("err_proc_com_com"));
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
            alert(t("err_proc_com_vot"));
            console.error(error);
        }
    };

    return (
        <div className="main">
            <Header />
            <div className="main-content">
                {error && <div className="error-message">{error}</div>}

                <div className="block-title">{t("com_com")}</div>
                {commentComplaints.length > 0 ? (
                    <div className="complaints-container">
                        {commentComplaints.map(complaint => (
                            <div key={complaint.id} className="complaint-card">
                                <div className="complaint-info">
                                    <div><strong>{t("com_author")}:</strong> {complaint.target_author_firstname + " " + complaint.target_author_lastname}</div>
                                    <div><strong>{t("comment")}:</strong> {complaint.target_text}</div>
                                    <div><strong>{t("comp_author")}:</strong> {complaint.complainant_firstname + " " + complaint.complainant_lastname}</div>
                                    <div><strong>{t("comp_date")}:</strong> {new Date(complaint.created_at).toLocaleString()}</div>
                                </div>
                                <div className="complaint-actions">
                                    <button className="accept-btn" onClick={() => handleCommentComplaintAction(complaint.id, complaint.target_id, "accepted", "comment")}>
                                        {t("accept")}
                                    </button>
                                    <button className="decline-btn" onClick={() => handleCommentComplaintAction(complaint.id, complaint.target_id, "declined", "comment")}>
                                        {t("reject")}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>{t("no_com_com")}</p>
                )}

                <div className="block-title">{t("com_vot")}</div>
                {voteComplaints.length > 0 ? (
                    <div className="complaints-container">
                        {voteComplaints.map(complaint => (
                            <div key={complaint.id} className="complaint-card">
                                <div className="complaint-info">
                                    <div><strong>{t("vote_author")}:</strong> {complaint.target_author_firstname + " " + complaint.target_author_lastname}</div>
                                    <div><strong>{t("vote_title")}:</strong> {complaint.target_text}</div>
                                    <div><strong>{t("comp_author")}:</strong> {complaint.complainant_firstname + " " + complaint.complainant_lastname}</div>
                                    <div><strong>{t("comp_date")}:</strong> {new Date(complaint.created_at).toLocaleString()}</div>
                                </div>
                                <div className="complaint-actions">
                                    <button className="accept-btn" onClick={() => handleVoteComplaintAction(complaint.id, complaint.target_id, "accepted", "vote")}>
                                        {t("accept")}
                                    </button>
                                    <button className="decline-btn" onClick={() => handleVoteComplaintAction(complaint.id, complaint.target_id, "declined", "vote")}>
                                        {t("reject")}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>{t("no_com_vot")}</p>
                )}
            </div>
        </div>
    );
}

export default Moder;
