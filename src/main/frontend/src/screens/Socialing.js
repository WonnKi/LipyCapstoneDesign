import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import axios from 'axios';
import Card from "react-bootstrap/Card";

const Socialing = () => {
    const [socialings, setSocialings] = useState([]);

    useEffect(() => {
        const fetchSocialings = async () => {
            try {
                const response = await axios.get('/socialing');
                setSocialings(response.data);
            } catch (error) {
                console.error('소셜링을 불러오는 중 에러 발생:', error);
            }
        };

        fetchSocialings();
    }, []);

    return (
        <div style={{ position: "relative" }}>
            <section className="page-section cta">
                <Container>
                    <Link to="/SocialSearch" style={{ position: "absolute", right: "12%", top: "5%" }}>
                        <Button>검색</Button>
                    </Link>
                    <Link to="/Write" style={{ position: "absolute", right: "5%", top: "5%" }}>
                        <Button>글쓰기</Button>
                    </Link>

                    <div>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {socialings.map((socialing, index) => (
                                <li key={index}>
                                    <Link to={`/socialing/${socialing.id}`} style={{ textDecoration: 'none' }}>
                                        <Card style={{ width: '18rem', margin: 20 }}>
                                            {/*<Card.Img variant="top" src={socialing.imageUrl} />*/}
                                            <Card.Body>
                                                <Card.Title>{socialing.title}<br />{new Date(socialing.date).toLocaleDateString()}</Card.Title>
                                                <Card.Text>{socialing.description}<br />{socialing.writer}</Card.Text>
                                                <Card.Text><hr /></Card.Text>
                                                <p>참여자 수: {socialing.currentparticipants}</p>
                                                <p>최대 참여자 수: {socialing.maxparticipants}</p>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Socialing;