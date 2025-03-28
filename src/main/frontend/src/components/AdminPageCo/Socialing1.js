import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookCount2.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Socialing1 = () => {
    const [socialings, setSocialings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSocialings = async () => {
            try {
                const response = await axios.get('http://localhost:8080/socialing');
                const sortedSocialings = response.data.reverse();
                setSocialings(sortedSocialings.slice(0, 4));
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching socialings');
                setLoading(false);
            }
        };

        fetchSocialings();
    }, []);

    const extractFirstImageUrl = (content) => {
        const imgTagRegex = /<img.*?src=['"](.*?)['"].*?>/;
        const match = content.match(imgTagRegex);
        return match ? match[1] : null;
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
            {socialings.map((socialing, index) => (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{
                        ease: "easeInOut",
                        duration: 1,
                        y: { duration: 1 },
                        type: 'spring', stiffness: 300, damping: 30, delay: index * 0.2
                    }}
                    key={socialing.id} className="socialing-card">
                    <Link to={`/socialing/${socialing.id}`} className="text-decoration-none">
                        <div style={{ height: '180px', backgroundColor: '#f4e3c1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {extractFirstImageUrl(socialing.content) ? (
                                <img
                                    src={extractFirstImageUrl(socialing.content)}
                                    alt="socialing preview"
                                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                                />
                            ) : (
                                <p>이미지가 없습니다.</p>
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
                </motion.div>
            ))}
        </div >
    );
};

export default Socialing1;
