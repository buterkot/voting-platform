import React from 'react';

const VotesModal = ({ participants, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Участники голосования</h3>
                    <button onClick={onClose} className="close-button">×</button>
                </div>
                <table className="votes-table">
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Почта</th>
                            <th>Выбранный вариант</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((participant) => (
                            <tr key={participant.id}>
                                <td>{participant.firstname}</td>
                                <td>{participant.lastname}</td>
                                <td>{participant.email}</td>
                                <td>{participant.option_text}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VotesModal;
