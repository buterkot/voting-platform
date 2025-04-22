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
        <div className="modal">
            <div className="modal-content" id="report-content">
                <div className="modal-header">
                    <div className="modal-title">
                        Отчёт по голосованию
                    </div>
                    <button onClick={onClose} className="close-button">×</button>
                </div>
                <div className="modal-scroll-container">

                    <div className="section">
                        <div className="modal-subtitle">Формат файла</div>
                        <div className="file-section">
                            <select 
                            className="group-selection" 
                            id="file-type"
                            value={fileType} 
                            onChange={(e) => setFileType(e.target.value)}>
                                <option value="pdf">PDF</option>
                                <option value="csv">CSV</option>
                                <option value="xlsx">Excel</option>
                            </select>
                            <button 
                            className="form-button" 
                            id="download"
                            onClick={handleDownload}>Скачать</button>
                        </div>

                    </div>

                    <div className="section">
                        <div className="modal-subtitle">Распределение голосов</div>
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
                        <div className="modal-subtitle">Динамика голосов</div>
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
                        <div className="modal-subtitle">Список проголосовавших</div>
                        {vote.options.map(option => (
                            <div key={option.id}>
                                <div>{option.option_text}</div>:
                                <div>
                                    {(option.voters || []).map((voter, i) => (
                                        <div key={i}>{voter}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="section">
                        <div className="modal-subtitle">Проверка на накрутку</div>
                        <p>Пока нет данных. В будущем здесь появится результат анализа активности голосов.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoteReportModal;
