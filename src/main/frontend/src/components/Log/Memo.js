import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Memo = ({ userId }) => {
    const [records, setRecords] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const fetchRecords = async () => {
        try {
            const response = await axios.get(`/manager/record/${userId}`);
            setRecords(response.data);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchRecords();
        }
    }, [userId]);

    const handleRowClick = (record) => {
        setSelectedRecord(record);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>책 제목</th>
                    <th>메모 제목</th>
                    <th>날짜</th>

                </tr>
                </thead>
                <tbody>
                {records.map((record) => (
                    <tr key={record.id} onClick={() => handleRowClick(record)}>
                        <td>{record.bookTitle || '제목을 찾을 수 없습니다'}</td>
                        <td>{record.title}</td>
                        <td>{record.recordDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal for displaying record details */}
            {selectedRecord && (
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedRecord.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>날짜:</strong> {selectedRecord.recordDate}</p>
                        <p><strong>내용:</strong> {selectedRecord.content}</p>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default Memo;
