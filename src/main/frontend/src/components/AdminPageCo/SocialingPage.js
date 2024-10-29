import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookCount2.css'; // CSS 파일을 따로 관리

const SocialingPage = () => {
    const [socialings, setSocialings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSocialings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/socialing');
                const sortedSocialings = response.data.reverse();
                setSocialings(sortedSocialings.slice(0, 5));
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching socialings');
                setLoading(false);
            }
        };

        fetchSocialings();
    }, []);

    if (loading) {
        return <p>Loading socialings...</p>;
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (socialings.length === 0) {
        return <div className="alert alert-info">소셜링이 없습니다.</div>;
    }

    return (
        <div className="book-grid">
            {socialings.map((socialing) => (
                <div key={socialing.id} className="book-card">
                    <Link to={`/socialing/${socialing.id}`} className="text-decoration-none">
                        <p><b>{socialing.currentparticipants}/{socialing.maxparticipants}</b> 명의 회원이 신청했어요</p>
                        <h4>{socialing.title}</h4>
                        <h3>{socialing.description}</h3>
                        <p>{socialing.writer}</p>
                        <p>{new Date(socialing.date).toLocaleDateString()}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default SocialingPage;
