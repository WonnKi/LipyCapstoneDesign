import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookListComponent() {
    const [bookList, setBookList] = useState([]);
    const userId = 1; // 실제 사용자 ID로 변경해야 합니다.

    useEffect(() => {
        const fetchBookList = async () => {
            try {
                const token = localStorage.getItem('jwtToken'); // JWT 토큰 가져오기 (필요한 경우)
                const response = await axios.get(`/book/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰 설정 (필요한 경우)
                    },
                });
                setBookList(response.data);
            } catch (error) {
                console.error('Error fetching book list:', error);
                // 에러 처리 로직 추가 (예: 사용자에게 에러 메시지 표시)
            }
        };

        fetchBookList();
    }, [userId]); // userId가 변경될 때마다 다시 호출

    return (
        <div>
            <h2>내 책 목록</h2>
            <ul>
                {bookList.map((book) => (
                    <li key={book.isbn}>
                        <img src={book.image} alt={book.title} />
                        <h3>{book.title}</h3>
                        <p>저자: {book.author}</p>
                        <p>출판사: {book.publisher}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>설명: {book.description}</p>
                        <p>상태: {book.status}</p> 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookListComponent;
