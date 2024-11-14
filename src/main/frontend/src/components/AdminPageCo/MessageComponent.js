import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageComponent.css'; // 스타일 시트를 불러옵니다.

const MessageComponent = ({ receiverNickname }) => {
    const [receiverList, setReceiverList] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    const [messageTitle, setMessageTitle] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [sentMessages, setSentMessages] = useState([]);
    const [message, setMessage] = useState('');

    // 쪽지 전송
    const handleSendMessage = async () => {
        try {
            await axios.post('http://localhost:8080/messages/send', {
                receiverList: [receiverNickname],
                messageDto: {
                    title: messageTitle,
                    content: messageContent,
                    senderName: '',
                    receiverName: ''
                }
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            setMessage("쪽지를 보냈습니다.");
            setReceiverList([]);
            setMessageTitle('');
            setMessageContent('');
            fetchSentMessages();
        } catch (error) {
            setMessage("쪽지 전송에 실패했습니다.");
            console.error(error);
        }
    };

    // // 받은 쪽지 조회
    // const fetchReceivedMessages = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:8080/messages/received', {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    //             }
    //         });
    //         setReceivedMessages(response.data);
    //     } catch (error) {
    //         console.error("받은 쪽지를 가져오는 중 오류가 발생했습니다.", error);
    //     }
    // };

    // 보낸 쪽지 조회
    const fetchSentMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/messages/sent', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            // 선택한 회원에게 보낸 메시지만 필터링
            const filteredMessages = response.data.filter(msg => msg.receiverName === receiverNickname);
            setSentMessages(filteredMessages);
        } catch (error) {
            console.error("보낸 쪽지를 가져오는 중 오류가 발생했습니다.", error);
        }
    };

    // // 받은 쪽지 삭제
    // const handleDeleteReceivedMessage = async (messageId) => {
    //     try {
    //         await axios.delete(`http://localhost:8080/messages/received/${messageId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
    //             }
    //         });
    //         setMessage("받은 쪽지를 삭제했습니다.");
    //         fetchReceivedMessages(); // 삭제 후 받은 쪽지 목록 갱신
    //     } catch (error) {
    //         console.error("받은 쪽지를 삭제하는 중 오류가 발생했습니다.", error);
    //     }
    // };

    // 보낸 쪽지 삭제
    const handleDeleteSentMessage = async (messageId) => {
        try {
            await axios.delete(`http://localhost:8080/messages/sent/${messageId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            setMessage("보낸 쪽지를 삭제했습니다.");
            fetchSentMessages(); // 삭제 후 보낸 쪽지 목록 갱신
        } catch (error) {
            console.error("보낸 쪽지를 삭제하는 중 오류가 발생했습니다.", error);
        }
    };

    useEffect(() => {
        // fetchReceivedMessages();
        fetchSentMessages();
    }, []);

    return (
        <div className="message-container">
            <h2>쪽지 관리</h2>

            {/* 쪽지 전송 */}
            <div className="message-send">
                <input
                    type="text"
                    className="message-input"
                    placeholder="쪽지 제목"
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)} // 제목 입력
                />
                <textarea
                    className="message-input"
                    rows="4"
                    placeholder="쪽지 내용"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                />
                <button className="message-button" onClick={handleSendMessage}>쪽지 보내기</button>
                {message && <p className="message-status">{message}</p>}
            </div>

            {/*/!* 받은 쪽지 목록 *!/*/}
            {/*<div className="message-list">*/}
            {/*    <h3>받은 쪽지</h3>*/}
            {/*    {receivedMessages.length > 0 ? (*/}
            {/*        receivedMessages.map(msg => (*/}
            {/*            <div key={msg.id} className="message-item received">*/}
            {/*                <p><strong>보낸 사람:</strong> {msg.senderName}</p>*/}
            {/*                <p><strong>내용:</strong> {msg.content}</p>*/}
            {/*                <button className="delete-button" onClick={() => handleDeleteReceivedMessage(msg.id)}>삭제</button>*/}
            {/*            </div>*/}
            {/*        ))*/}
            {/*    ) : (*/}
            {/*        <p>받은 쪽지가 없습니다.</p>*/}
            {/*    )}*/}
            {/*</div>*/}

            {/* 보낸 쪽지 목록 */}
            <div className="message-list">
                <h3>보낸 쪽지</h3>
                {sentMessages.length > 0 ? (
                    sentMessages.map(msg => (
                        <div key={msg.id} className="message-item sent">
                            <p><strong>제목:</strong> {msg.title}</p> {/* 제목 표시 */}
                            <p><strong>받는 사람:</strong> {msg.receiverName}</p>
                            <p><strong>내용:</strong> {msg.content}</p>
                            <button className="delete-button" onClick={() => handleDeleteSentMessage(msg.id)}>삭제</button>
                        </div>
                    ))
                ) : (
                    <p>보낸 쪽지가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default MessageComponent;
