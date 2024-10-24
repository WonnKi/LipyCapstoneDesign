import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Alert } from 'react-bootstrap';

const BookCount = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/book/all');
                const sortedBooks = response.data.sort((a, b) => b.saveCount - a.saveCount);
                setBooks(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Error fetching books');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <p>Loading books...</p>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    if (books.length === 0) {
        return <Alert variant="info"></Alert>;
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
                                <th></th>
                                <th>저장된 수</th>
                            </tr>
                            </thead>
                            <tbody>
                            {books.map((book) => (
                                <tr key={book.isbn}>
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
        </div>


    );
};

export default BookCount;
