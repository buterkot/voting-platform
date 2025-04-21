import React from 'react';
import { Link } from 'react-router-dom';

const VotesModal = ({ participants, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <div className='modal-title'>Участники голосования</div>
                    <button onClick={onClose} className="close-button">×</button>
                </div>
                <div className="modal-scroll-container">
                    <table className="votes-table">
                        <thead>
                            <tr>
                                <th>Имя и фамилия</th>
                                <th>Выбранный вариант</th>
                                <th>Дата и время</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.map((participant) => (
                                <tr key={participant.id}>
                                    <td>
                                        <Link to={`/user/${participant.id}`} className="user-link">
                                            {participant.firstname} {participant.lastname}
                                        </Link>
                                    </td>
                                    <td>{participant.option_text}</td>
                                    <td>{new Date(participant.voted_date).toLocaleString('ru-RU')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default VotesModal;
