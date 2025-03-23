import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookCount2.css';


const SocialingPage = () => {
    const [socialings, setSocialings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSocialings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/socialing');
                const sortedSocialings = response.data.reverse();
                setSocialings(sortedSocialings);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching socialings');
                setLoading(false);
            }
        };

        fetchSocialings();
    }, []);

    const extractImageUrl = (content) => {
        const imgTagMatch = content.match(/<img[^>]+src="([^">]+)"/);
        return imgTagMatch ? imgTagMatch[1] : null;
    };

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
        <div className="socialing-grid">
            {socialings.map((socialing) => {
                const imageUrl = extractImageUrl(socialing.content);
                return (
                    <div key={socialing.id} className="socialing-card">
                        <Link to={`/socialing/${socialing.id}`} className="text-decoration-none">
                            <div style={{ height: '180px', backgroundColor: '#f4e3c1' }}>
                                {imageUrl ? (
                                    <img src={imageUrl} alt="Socialing Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                                ) : (
                                    <p>이미지가 없습니다</p>
                                )}
                            </div>
                            <div className="socialing-card-content">
                                <h4>{socialing.title}</h4>
                                <h3>{socialing.description}</h3>
                                <p><b>{socialing.currentparticipants}/{socialing.maxparticipants}</b> 명의 회원이 신청했어요</p>
                            </div>
                            <div className="socialing-card-footer">
                                <p>{socialing.writer}</p>
                                <p>{new Date(socialing.date).toLocaleDateString()}</p>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default SocialingPage;
