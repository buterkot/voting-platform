import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header.js";
import "../styles/App.css";

function Admin() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Администратор";
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/users");
            setUsers(response.data);
        } catch (error) {
            setError("Ошибка загрузки пользователей.");
            console.error(error);
        }
    };

    const toggleBanStatus = async (userId, currentBanStatus) => {
        try {
            await axios.patch(`http://localhost:3000/users/${userId}`, {
                ban: currentBanStatus === 1 ? 0 : 1,
            });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId
                        ? { ...user, ban: currentBanStatus === 1 ? 0 : 1 }
                        : user
                )
            );
        } catch (error) {
            setError("Ошибка обновления статуса пользователя.");
            console.error(error);
        }
    };

    return (
        <div className="main">
            <Header />
            <div className="main-content">
                <div className="admin-panel">
                    <div className="block-title">Пользователи</div>
                    {error && <div className="error-message">{error}</div>}
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Email</th>
                                <th>Статус</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.ban === 1 ? "Заблокирован" : "Активен"}</td>
                                    <td>
                                        <button
                                            className={`form-button ${
                                                user.ban === 1 ? "unban" : "ban"
                                            }`}
                                            onClick={() =>
                                                toggleBanStatus(user.id, user.ban)
                                            }
                                        >
                                            {user.ban === 1
                                                ? "Разблокировать"
                                                : "Заблокировать"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Admin;
