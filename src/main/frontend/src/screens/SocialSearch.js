import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const SocialSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/socialing/search?title=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('게시글 검색 중 에러 발생:', error);
        }
    };

    return (
        <div>
            <section className="page-section cta" >
                <Container>
                    <Row className="justify-content-center mb-2">
                        <Col xs="auto">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요"
                                style={{ width: 500, height: 50 }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Col>
                        <Col xs="auto">
                            <Button onClick={handleSearch} style={{ height: 50 }}>검색</Button>
                        </Col>
                    </Row>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {searchResults.map((socialing, index) => (
                            <Col key={index}>
                                <Link to={`/socialing/${socialing.id}`} style={{ textDecoration: 'none' }}>
                                    <Card style={{ width: '18rem', margin: 20 }}>
                                        {/*<Card.Img variant="top" src={socialing.imageUrl} />*/}
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

export default SocialSearch;
