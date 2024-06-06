import React, { useState } from 'react';
import axios from 'axios';

function SearchComponent() {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.post('/search/basic_search', {
                    bookName: query },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching for books:', error);
        }
    };

    const handleSaveBook = async (book) => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.post(`/book/1`, { // userId는 실제 사용자 ID로 변경
                info: {
                    isbn: book.isbn,
                    title: book.title,
                    image: book.image,
                    author: book.author,
                    publisher: book.publisher,
                    description: book.description
                },
            },{
                headers: {
                    Authorization: `Bearer ${token}` // Authorization 헤더 설정
                }
            });
            console.log('Book saved:', response.data);
            // 저장 성공 메시지 표시 (예: alert 또는 상태 메시지 업데이트)
        } catch (error) {
            console.error('Error saving book:', error);
            // 에러 처리 로직 추가 (예: 에러 메시지 표시)
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="책 제목을 입력하세요"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>검색</button>

            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((book) => (
                        <li key={book.isbn}>
                            <img src={book.image} alt={book.title}/>
                            <h3>{book.title}</h3>
                            <p>저자: {book.author}</p>
                            <p>출판사: {book.publisher}</p>
                            <p>isbn: {book.isbn}</p>
                            <button onClick={() => handleSaveBook(book)}>저장</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>{query ? '검색 결과가 없습니다.' : '검색어를 입력하세요.'}</p>
            )}
        </div>
    );
}

export default SearchComponent;
