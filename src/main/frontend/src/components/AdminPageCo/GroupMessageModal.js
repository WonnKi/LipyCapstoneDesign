import React, { useState } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

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

    return (
        <div>
            <div className="message-send">
                <input
                    type="text"
                    className="message-input"
                    placeholder="쪽지 제목"
                    value={messageTitle}
                    onChange={(e) => setMessageTitle(e.target.value)}
                />
                <textarea
                    className="message-input"
                    rows="4"
                    placeholder="쪽지 내용"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                />
                <button className="message-button" onClick={handleSend}>
                    쪽지 보내기
                </button>
            </div>
            <div className="message-list" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <Table className="table text-start align-middle table-bordered table-hover mb-0">
                    <thead style={{position: 'sticky', top: 0,  zIndex: 1}}>
                        <tr>
                           <th style={{textAlign: 'center', width: '20%'}}>선택</th>
                           <th style={{textAlign: 'center'}}>닉네임</th>
                      </tr>
                    </thead>
                    <tbody>
                    {members.map((member) => (
                        <tr key={member.id}>
                            <td style={{textAlign: 'center'}}>
                                <input
                                    type="checkbox"
                                    checked={selectedMembers.includes(member.nickname)}
                                    onChange={() => handleMemberSelection(member.nickname)}
                                    style={{
                                        position: 'static',
                                    }}
                                />
                            </td>
                            <td
                                style={{textAlign: 'center', cursor: 'pointer'}}
                                onClick={() => handleMemberSelection(member.nickname)}
                            >
                                {member.nickname}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default GroupMessageModal;
