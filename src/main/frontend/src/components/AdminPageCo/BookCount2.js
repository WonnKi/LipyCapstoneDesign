import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './BookCount2.css';

const BookCount2 = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/book/all');
                const sortedBooks = response.data.sort((a, b) => b.saveCount - a.saveCount);
                setBooks(sortedBooks.slice(0, 5));
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
        return <div className="alert alert-danger">{error}</div>;
    }

    if (books.length === 0) {
        return <div className="alert alert-info">책이 없습니다.</div>;
    }

    return (
        <div className="book-grid">
            {books.map((book, index) => (
                <motion.div
                    key={book.isbn}
                    className="book-card"
                    initial={{ x: '100%', opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30, delay: index * 0.2 }}
                >
                    <p><b>{book.saveCount}</b> 명의 회원이 읽고 있어요</p>
                    <img
                        src={book.image}
                        alt={book.title}
                        className="book-cover"
                    />
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                </motion.div>
            ))}
        </div>
    );
};

export default BookCount2;
