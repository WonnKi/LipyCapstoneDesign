import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookCount2.css';
import {Link} from "react-router-dom";

const Socialing1 = () => {
    const [socialings, setSocialings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSocialings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/socialing');
                const sortedSocialings = response.data.reverse();
                setSocialings(sortedSocialings.slice(0, 3));
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
        <div className="socialing-grid">
            {socialings.map((socialing) => (
                <div key={socialing.id} className="socialing-card">
                    <Link to={`/socialing/${socialing.id}`}
                          className="text-decoration-none">
                        <div style={{
                            height: '180px',
                            backgroundColor: '#f4e3c1'
                        }}></div>
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
            ))}
        </div>
    );
};

export default Socialing1;
