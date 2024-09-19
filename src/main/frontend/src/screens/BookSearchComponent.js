import React, { useState } from 'react';
import axios from 'axios';

function BookSearchComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const userId = 1;
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호를 저장할 상태 추가
    const [savePage, setSavePage] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.post('/search/basic_search', {
                bookName: searchTerm,
            });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSaveBook = async (book) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const page = parseInt(savePage, 10) || currentPage;
            await axios.post(`/book/${userId}?page=${currentPage}`, book, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error saving book:', error);
            // 에러 처리 로직 추가
        }
    };


    return (
        <div>
            <input
                type="text"
                placeholder="책 제목을 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>검색</button>

            <ul>
                {searchResults.map((book) => (
                    <li key={book.isbn}>
                        <img src={book.image} alt={book.title}/>
                        <h3>{book.title}</h3>
                        <p>저자: {book.author}</p>
                        <p>출판사: {book.publisher}</p>
                        <p>ISBN: {book.isbn}</p>
                        <p>설명: {book.description}</p>
                        <div>
                            <label htmlFor={`pageInput-${book.isbn}`}>저장 페이지:</label>
                            <input
                                type="number"
                                id={`pageInput-${book.isbn}`}
                                value={savePage}
                                onChange={(e) => setSavePage(e.target.value)}
                            />
                            <button onClick={() => handleSaveBook(book)}>저장</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookSearchComponent;
