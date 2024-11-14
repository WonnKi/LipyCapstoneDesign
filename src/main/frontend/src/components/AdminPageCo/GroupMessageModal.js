import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const GroupMessageModal = ({ members, show, onClose, onSend }) => {
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [messageTitle, setMessageTitle] = useState('');
    const [messageContent, setMessageContent] = useState('');

    const handleMemberSelection = (nickname) => {
        setSelectedMembers((prev) =>
            prev.includes(nickname)
                ? prev.filter((member) => member !== nickname)
                : [...prev, nickname]
        );
    };

    const handleSend = () => {
        onSend(selectedMembers, messageTitle, messageContent);
        onClose();
    };

    return(
    <div className="message-container">
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
            <button className="message-button" onClick={handleSend}>쪽지 보내기</button>
        </div>
        <div className="message-list">
            <h3>닉네임</h3>
            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"flex-start"
                }}>

            {members.map((member) => (
                <Form.Check
                    key={member.id}
                    type="checkbox"
                    label={member.nickname}
                    checked={selectedMembers.includes(member.nickname)}
                    onChange={() => handleMemberSelection(member.nickname)}
                />
            ))}
            </div>
        </div>
    </div>
    );
};

export default GroupMessageModal;
