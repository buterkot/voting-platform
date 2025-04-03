import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InviteToGroupModal from "../components/tables/InviteToGroupModal";
import Header from "../components/Header";
import "../styles/Profile.css";

const UserProfile = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showInviteModal, setShowInviteModal] = useState(false);

    const currentUser = JSON.parse(sessionStorage.getItem("user")) || {}; 

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                setIsLoading(false);
            })
            .catch((error) => console.error("Ошибка загрузки данных:", error));
    }, [id]);

    if (isLoading) return <p>Загрузка...</p>;
    if (!user) return <p>Пользователь не найден</p>;

    return (
        <div className="main">
            <Header />
            <div className="main-content">
                <h2>{user.firstname} {user.lastname}</h2>

                {user.profilePrivate ? (
                    <p>Этот профиль приватный</p>
                ) : (
                    <div className="profile-info">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Адрес:</strong> {user.address}</p>
                        <p><strong>Телефон:</strong> {user.phone_number}</p>
                        <p><strong>Последний вход:</strong> {new Date(Date.parse(user.last_online)).toLocaleString()}</p>
                    </div>
                )}

                {currentUser.id !== user.id && (
                    <button onClick={() => setShowInviteModal(true)}>Пригласить в группу</button>
                )}
            </div>

            {showInviteModal && (
                <InviteToGroupModal
                    userId={user.id}
                    creatorId={currentUser.id}
                    onClose={() => setShowInviteModal(false)}
                />
            )}
        </div>
    );
};

export default UserProfile;
