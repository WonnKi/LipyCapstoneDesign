import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import Card from "react-bootstrap/Card";

const HotSocialing = () => {
    const [socialings, setSocialings] = useState([]);

    useEffect(() => {
        const fetchSocialings = async () => {
            try {
                const response = await axios.get('/socialing/hot');
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
                    <Row className="justify-content-end">
                        <Col xs="auto" className="mb-2">
                            <Link to="/Socialing">
                                <Button>최신순</Button>
                            </Link>
                        </Col>
                        <Col xs="auto" >
                            <Link to="/SocialSearch">
                                <Button>검색</Button>
                            </Link>
                        </Col>
                        <Col xs="auto">
                            <Link to="/Write">
                                <Button>글쓰기</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {socialings.map((socialing, index) => (
                            <Col key={index}>
                                <Link to={`/socialing/${socialing.id}`}
                                      className="text-decoration-none">
                                    <Card className="h-100">
                                        <Card.Body>
                                            <Card.Title>{socialing.title}<br />{new Date(socialing.date).toLocaleDateString()}</Card.Title>
                                            <Card.Text>{socialing.description}<br />{socialing.writer}</Card.Text>
                                            <hr />
                                            <p>참여자 수: {socialing.currentparticipants}</p>
                                            <p>최대 참여자 수: {socialing.maxparticipants}</p>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default HotSocialing;
