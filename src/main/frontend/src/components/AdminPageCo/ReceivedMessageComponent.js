import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './MessageComponent.css'; // MessageComponent와 동일한 스타일 시트를 불러옵니다.

const ReceivedMessageComponent = ({ show, handleClose }) => {
    const [receivedMessages, setReceivedMessages] = useState([]);

    // 받은 쪽지 조회
    const fetchReceivedMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/messages/received', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            setReceivedMessages(response.data);
        } catch (error) {
            console.error("받은 쪽지를 가져오는 중 오류가 발생했습니다.", error);
        }
    };

    // 받은 쪽지 삭제
    const handleDeleteReceivedMessage = async (messageId) => {
        try {
            await axios.delete(`http://localhost:8080/messages/received/${messageId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            fetchReceivedMessages(); // 삭제 후 받은 쪽지 목록 갱신
        } catch (error) {
            console.error("받은 쪽지를 삭제하는 중 오류가 발생했습니다.", error);
        }
    };

    useEffect(() => {
        if (show) {
            fetchReceivedMessages();
        }
    }, [show]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>받은 쪽지</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {receivedMessages.length > 0 ? (
                    receivedMessages.map(msg => (
                        <div key={msg.id} className="message-item">
                            <p><strong>보낸 사람:</strong> {msg.senderName}</p>
                            <p><strong>내용:</strong> {msg.content}</p>
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteReceivedMessage(msg.id)}
                                className="delete-button"
                            >
                                삭제
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>받은 쪽지가 없습니다.</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    닫기
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReceivedMessageComponent;
