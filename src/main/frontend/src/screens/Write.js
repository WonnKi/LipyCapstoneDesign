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
    const [imageUrls, setImageUrls] = useState([]); // 여러 이미지 URL 저장
    const navigate = useNavigate();

    const handleCreatePost = async (event) => {
        event.preventDefault();

        if (!title || !description || !content || !maxParticipants || !date) {
            setMessage('모든 필드를 채워주세요.');
            return;
        }

        const token = localStorage.getItem('jwtToken');
        try {
            const response = await axios.post(
                'http://localhost:8080/socialing/post',
                { title, description, content, maxparticipants: maxParticipants, date },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const postId = response.data.id;
            navigate(`/socialing/${postId}`);
        } catch (error) {
            setMessage('글 작성에 실패했습니다: ' + error.response.data);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(
                'http://localhost:8080/socialing/uploadImage',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                }
            );
            const imageUrl = response.data;
            setImageUrls([...imageUrls, imageUrl]);
            setContent((prevContent) => prevContent + `<img src="${imageUrl}" alt="uploaded image" />`);
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
        }
    };

    const isFormValid = title && description && content && maxParticipants > 0 && date;

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


                        {imageUrls.length > 0 && (
                            <div className="mt-3">
                                {imageUrls.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`uploaded preview ${index}`}
                                        style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }}
                                    />
                                ))}
                            </div>
                        )}

                        <Form.Group controlId="formContent" className="mt-3">
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ height: "400px" }}
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
                        <Form.Group controlId="image" className="mt-3">
                            <Form.Label>이미지</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-3"
                            disabled={!isFormValid}
                        >
                            작성하기
                        </Button>
                    </Form>
                    {message && <Alert variant="danger" className="mt-3">{message}</Alert>}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Write;
