import React, { useState } from "react";
import "../../styles/Modal.css";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const VoteReportModal = ({ vote, participants, onClose }) => {
    const [fileType, setFileType] = useState("pdf");

    if (!vote || !participants) return null;

    const handleDownload = () => {
        alert(`Скачивание отчёта в формате .${fileType}`);
    };

    const pieData = vote.options
        .filter(option => option.vote_count > 0)
        .map(option => ({

            name: option.option_text,
            value: option.vote_count,
        }));

    const startTime = new Date(vote.start_date);
    const endTime = vote.end_date ? new Date(vote.end_date) : new Date();
    const durationInHours = (endTime - startTime) / (1000 * 60 * 60);

    let intervalMinutes;

    if (durationInHours <= 2) {
        intervalMinutes = 5;
    } else if (durationInHours <= 6) {
        intervalMinutes = 10;
    } else if (durationInHours <= 24) {
        intervalMinutes = 30;
    } else {
        intervalMinutes = 60;
    }

    const timeData = participants
        .sort((a, b) => new Date(a.voted_date) - new Date(b.voted_date))
        .reduce((acc, curr) => {
            const date = new Date(curr.voted_date);

            const roundedMinutes = Math.floor(date.getMinutes() / intervalMinutes) * intervalMinutes;
            const timeLabel = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${roundedMinutes.toString().padStart(2, '0')}`;

            const existing = acc.find(item => item.time === timeLabel);
            if (existing) {
                existing.count += 1;
            } else {
                acc.push({ time: timeLabel, count: 1 });
            }
            return acc;
        }, []);

    const votersByOption = vote.options.reduce((acc, option) => {
        acc[option.option_text] = participants
            .filter(p => p.option_text === option.option_text)
            .map(p => `${p.firstname} ${p.lastname} (${p.email})`);
        return acc;
    }, {});

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
                                onChange={(e) => setFileType(e.target.value)}
                            >
                                <option value="pdf">PDF</option>
                                <option value="csv">CSV</option>
                                <option value="xlsx">Excel</option>
                            </select>
                            <button
                                className="form-button"
                                id="download"
                                onClick={handleDownload}
                            >
                                Скачать
                            </button>
                        </div>
                    </div>

                    <div className="section">
                        <div className="modal-subtitle">Распределение голосов</div>
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label={({ name }) => name}
                                >
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
                        <ResponsiveContainer width="95%" height={250}>
                            <LineChart data={timeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis allowDecimals={false} />
                                <Tooltip />
                                <Line type="monotone" dataKey="count" stroke="#8884d8" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="section">
                        <div className="modal-subtitle">Проверка на накрутку</div>
                        <p>Пока нет данных. В будущем здесь появится результат анализа активности голосов.</p>
                    </div>

                    <div className="section">
                        <div className="modal-subtitle">Список проголосовавших</div>
                        {vote.options.map(option => (
                            <div key={option.id}>
                                <strong>{option.option_text}:</strong>
                                <div style={{ marginLeft: "10px" }}>
                                    {(votersByOption[option.option_text] || []).map((voter, i) => (
                                        <div key={i}>{voter}</div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoteReportModal;
