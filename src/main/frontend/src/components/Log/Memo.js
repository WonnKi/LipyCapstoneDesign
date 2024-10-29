import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Memo = ({ userId }) => {
    const [records, setRecords] = useState([]); // 초기 상태를 빈 배열로 설정
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const fetchRecords = async () => {
        try {
            const response = await axios.get(`/manager/record/${userId}`);
            // 응답이 배열인지 확인하고 상태 업데이트
            if (Array.isArray(response.data)) {
                setRecords(response.data);
            } else {
                console.error('Expected an array, but received:', response.data);
                setRecords([]); // 배열이 아닌 경우 빈 배열로 설정
            }
        } catch (error) {
            console.error('Error fetching records:', error);
            setRecords([]); // 오류 발생 시 빈 배열로 설정
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
                {records.length > 0 ? (
                    records.map((record) => (
                        <tr key={record.id} onClick={() => handleRowClick(record)}>
                            <td>{record.bookTitle || '제목을 찾을 수 없습니다'}</td>
                            <td>{record.title}</td>
                            <td>{record.recordDate}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3">기록이 없습니다.</td>
                    </tr>
                )}
                </tbody>
            </table>


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
