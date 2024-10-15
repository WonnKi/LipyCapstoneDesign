import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Home5 = ({ userId }) => {
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
            <h3>Records for User {userId}</h3>
            <table className="table">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {records.map((record) => (
                    <tr key={record.id} onClick={() => handleRowClick(record)}>
                        <td>{record.title}</td>
                        <td>{record.recordDate}</td>
                        <td>
                            <Button onClick={() => handleRowClick(record)}>View</Button>
                        </td>
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
                        <p><strong>Date:</strong> {selectedRecord.recordDate}</p>
                        <p><strong>Content:</strong> {selectedRecord.content}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Home5;
