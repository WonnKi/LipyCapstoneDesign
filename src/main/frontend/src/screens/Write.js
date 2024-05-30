import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

function Write() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [maxParticipants, setMaxParticipants] = useState(0);
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleCreatePost = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await axios.post(
                'http://localhost:8080/socialing/post',
                {
                    title,
                    description,
                    content,
                    maxparticipants: maxParticipants,
                    date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const postId = response.data.id;
            navigate(`/socialing/${postId}`);
        } catch (error) {
            setMessage('Post creation failed: ' + error.response.data);
        }
    };

    return (
        <Container>
            <Card className="my-3">
                <Card.Header as="h3">글쓰기</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleCreatePost}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription" className="mt-3">
                            <Form.Label>설명</Form.Label>
                            <Form.Control
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent" className="mt-3">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formMaxParticipants" className="mt-3">
                            <Form.Label>최대 참가 인원</Form.Label>
                            <Form.Control
                                type="number"
                                value={maxParticipants}
                                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate" className="mt-3">
                            <Form.Label>일시</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">작성하기</Button>
                    </Form>
                    {message && <Alert variant="danger" className="mt-3">{message}</Alert>}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Write;
