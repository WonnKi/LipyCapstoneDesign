import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Alert, Modal, Button } from 'react-bootstrap';
import BookDetails from './BookDetails';

const BookCount = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBookIsbn, setSelectedBookIsbn] = useState(null);  // 선택된 책의 ISBN 저장
    const [showModal, setShowModal] = useState(false);  // 모달 창 상태

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/book/all');
                const sortedBooks = response.data.sort((a, b) => b.saveCount - a.saveCount);
                setBooks(sortedBooks);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching books');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // 모달 열기 함수
    const handleOpenModal = (isbn) => {
        setSelectedBookIsbn(isbn);
        setShowModal(true);
    };

    // 모달 닫기 함수
    const handleCloseModal = () => {
        setSelectedBookIsbn(null);
        setShowModal(false);
    };

    if (loading) {
        return <p>Loading books...</p>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (books.length === 0) {
        return <Alert variant="info">No books available.</Alert>;
    }

    return (
        <div>
            <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">책 관리</h6>
                    </div>

                    <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                            <tr className="text-white"
                                style={{position: 'sticky', top: 0, backgroundColor: '#343a40', zIndex: 1}}>
                                <th>제목</th>
                                <th>저자</th>
                                <th>출판사</th>
                                <th>이미지</th>
                                <th>저장된 수</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books.map((book) => (
                                <tr
                                    key={book.isbn}
                                    onClick={() => handleOpenModal(book.isbn)}  // 클릭 시 모달 열기
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publisher}</td>
                                    <td>
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            style={{width: '50px', height: '75px'}}
                                        />
                                    </td>
                                    <td>{book.saveCount}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* BookDetails 모달 */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>저장한 회원</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBookIsbn && <BookDetails isbn={selectedBookIsbn} />}  {/* 선택된 ISBN 전달 */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BookCount;
