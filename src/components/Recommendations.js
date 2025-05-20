import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Recommendations = () => {
    const [recommendations, setRecommendations] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [votesRes, historyRes, votedRes] = await Promise.all([
                    axios.get("http://localhost:3000/votes"),
                    axios.get(`http://localhost:3000/users/${user.id}/history`),
                    axios.get(`http://localhost:3000/users/${user.id}/voted`)
                ]);

                const votes = votesRes.data;
                const searchHistory = historyRes.data.map(entry => entry.query.toLowerCase());
                const votedIds = new Set(votedRes.data.map(v => v.vote_id));

                console.log(votes);
                console.log(searchHistory);
                console.log(votedIds);

                const userTags = new Set(
                    votes
                        .filter(v => votedIds.has(v.id) && Array.isArray(v.tags))
                        .flatMap(v => v.tags.map(tag => tag.name))
                );

                const scored = votes
                    .filter(v => !votedIds.has(v.id))
                    .map(vote => {
                        let score = 0;

                        const hoursSinceCreated = (new Date() - new Date(vote.start_date)) / (1000 * 60 * 60);
                        score += Math.max(0, 100 - hoursSinceCreated);

                        const titleLower = vote.title.toLowerCase();
                        searchHistory.forEach(term => {
                            if (titleLower.includes(term)) score += 20;
                        });

                        vote.tags?.forEach(tag => {
                            if (userTags.has(tag.name)) score += 15;
                        });

                        return { ...vote, score };
                    });

                const top5 = scored
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 5);

                setRecommendations(top5);
            } catch (err) {
                console.error("Ошибка при загрузке рекомендаций:", err);
            }
        };

        if (user?.id) {
            fetchData();
        }
    }, []);

    if (!recommendations.length) {
        return <div className="recom-frame">Нет рекомендаций</div>;
    }

    return (
        <div className="votes-frame">
            <div className="votes-list">
                {recommendations.map(vote => (
                    <div key={vote.id} className="form-frame simple">
                        <div className="form-title">
                            {vote.title}
                            {vote.round > 1 && <span className="second-round-alert"> ({vote.round}-й тур)</span>}
                        </div>
                        <div className="form-info">
                            <div>
                                Начало: {new Date(vote.start_date).toLocaleString("ru-RU")}
                            </div>
                        </div>
                        <button
                            className="form-button"
                            onClick={() => navigate(`/vote/${vote.id}`)}
                        >
                            Подробнее
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recommendations;