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
        document.title = "Пользователь";
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
                <div className="block-title">Профиль пользователя</div>
                {user.profilePrivate ? (
                    <div>Этот профиль приватный</div>
                ) : (
                    <div className="profile-info">
                        <div className="profile-field">
                            <div className="profile-field-name1">{user.firstname}</div>
                            <div className="profile-field-name2">{user.lastname}</div>
                        </div>
                        <div className="profile-field">
                            <div className="profile-field-mail">{user.email}</div>
                        </div>
                        <div className="profile-field">
                            <div className="profile-field-label">Последний вход:</div>
                            <div className="profile-field-info">
                                {new Date(Date.parse(user.last_online)).toLocaleString()}
                            </div>
                        </div>
                        <div className="profile-field">
                            <div className="profile-field-label">Адрес:</div>
                            {user.address}
                        </div>
                        <div className="profile-field">
                            <div className="profile-field-label">Телефон:</div>
                            {user.phone_number}
                        </div>
                        <div className="form-button-create-container">
                            {currentUser.id !== user.id && (
                                <button className="form-button-create" onClick={() => setShowInviteModal(true)}>
                                    Пригласить в группу
                                </button>
                            )}
                        </div>
                    </div>
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
