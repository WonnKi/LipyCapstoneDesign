import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

const EditSocialing = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        currentparticipants: 0,
        maxparticipants: 0,
        date: new Date().toISOString()
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchSocialingDetails = async () => {
            try {
                const response = await axios.get(`/socialing/${id}`);
                const { title, description, content, currentparticipants, maxparticipants, date } = response.data;
                setFormData({ title, description, content, currentparticipants, maxparticipants, date });
            } catch (error) {
                console.error('게시글을 불러오는 중 에러 발생:', error);
                setMessage('Error fetching post: ' + error.message);
            }
        };

        fetchSocialingDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setMessage('No token found, please login again.');
                return;
            }
            await axios.put(`/socialing/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate(`/socialing/${id}`);
        } catch (error) {
            console.error('게시글을 수정하는 중 에러 발생:', error);
            setMessage('Error updating post: ' + error.response?.data || error.message);
        }
    };

    return (
        <Container>
            <Card className="my-3">
                <Card.Header as="h3">글 수정</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="제목을 입력하세요"
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription" className="mt-3">
                            <Form.Label>설명</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="설명을 입력하세요"
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent" className="mt-3">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="content"
                                rows={5}
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="내용을 입력하세요"
                            />
                        </Form.Group>
                        <Form.Group controlId="formMaxParticipants" className="mt-3">
                            <Form.Label>최대 참여 인원</Form.Label>
                            <Form.Control
                                type="number"
                                name="maxparticipants"
                                value={formData.maxparticipants}
                                onChange={handleChange}
                                placeholder="최대 참여 인원을 입력하세요"
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate" className="mt-3">
                            <Form.Label>일시</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">수정 완료</Button>
                    </Form>
                    {message && <Alert variant="danger" className="mt-3">{message}</Alert>}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditSocialing;
