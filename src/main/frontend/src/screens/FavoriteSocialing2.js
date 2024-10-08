import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FavoriteSocialing = () => {
    const [favoriteSocialings, setFavoriteSocialings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavoriteSocialings = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    setError('No token found, please login again.');
                    setLoading(false);
                    return;
                }
                const response = await axios.get('http://localhost:8080/interest/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFavoriteSocialings(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching favorite socialings: ' + (error.response?.data || error.message));
                setLoading(false);
            }
        };

        fetchFavoriteSocialings();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h2>내가 관심 등록한 게시글</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {favoriteSocialings.map((socialing) => (
                    <Col key={socialing.id}>
                        <Link to={`/socialing/${socialing.id}`} style={{ textDecoration: 'none' }}>
                            <Card style={{ width: '18rem', margin: 20 }}>
                                <Card.Body>
                                    <Card.Title>{socialing.title}<br />{new Date(socialing.date).toLocaleDateString()}</Card.Title>
                                    <Card.Text>{socialing.description}<br />{socialing.writer}</Card.Text>
                                    <hr />
                                    <p>참여자 수: {socialing.currentparticipants}</p>
                                    <p>최대 참여자 수: {socialing.maxparticipants}</p>
                                    <p>id : {socialing.id}</p>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default FavoriteSocialing;
