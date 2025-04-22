import React, { useState } from "react";
import "../../styles/Modal.css"; 
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const VoteReportModal = ({ vote, onClose }) => {
    const [fileType, setFileType] = useState("pdf");

    const handleDownload = () => {
        alert(`Скачивание отчёта в формате .${fileType}`);
    };

    const pieData = vote.options.map(option => ({
        name: option.option_text,
        value: option.vote_count,
    }));

    const timelineData = vote.options.flatMap(option =>
        (option.votes_time || []).map((voteTime, i) => ({
            name: `#${i + 1}`,
            time: voteTime,
            option: option.option_text,
        }))
    );

    return (
        <div className="modal-overlay">
            <div className="modal-content report-modal">
                <div>Отчёт по голосованию</div>

                <div className="section">
                    <div>Формат файла</div>
                    <select value={fileType} onChange={(e) => setFileType(e.target.value)}>
                        <option value="pdf">PDF</option>
                        <option value="csv">CSV</option>
                        <option value="xlsx">Excel</option>
                    </select>
                    <button className="form-button" onClick={handleDownload}>Скачать</button>
                </div>

                <div className="section">
                    <div>Распределение голосов</div>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" label>
                                {pieData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="section">
                    <div>Динамика голосов</div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={timelineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="time" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="section">
                    <div>Список проголосовавших</div>
                    {vote.options.map(option => (
                        <div key={option.id}>
                            <strong>{option.option_text}</strong>:
                            <ul>
                                {(option.voters || []).map((voter, i) => (
                                    <li key={i}>{voter}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="section">
                    <h3>Проверка на накрутку</h3>
                    <p>Пока нет данных. В будущем здесь появится результат анализа активности голосов.</p>
                </div>

                <button className="close-button" onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default VoteReportModal;
