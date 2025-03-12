import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header.js";
import "../styles/App.css";

function Admin() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        const user = JSON.parse(storedUser);
        if (!storedUser || user.role !== "A") {
            navigate("/");
            return;
        }

        document.title = "Администратор";
        fetchUsers();
    }, [navigate]);

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

    const toggleUserRole = async (userId, currentRole) => {
        const newRole = currentRole === "M" ? "U" : "M";
        try {
            await axios.patch(`http://localhost:3000/users/${userId}/role`, {
                role: newRole,
            });
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId
                        ? { ...user, role: newRole }
                        : user
                )
            );
        } catch (error) {
            setError("Ошибка обновления роли пользователя.");
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
                                <th>Бан</th>
                                <th>Роль</th>
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
                                            className={`form-button ${user.ban === 1 ? "unban" : "ban"
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
                                    <td>
                                        <button
                                            className="form-button role-change"
                                            onClick={() => toggleUserRole(user.id, user.role)}
                                        >
                                            {user.role === "M" ? "Понизить" : "Повысить"}
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
