import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

function CaseModal2({ type, onAddToFirstBookCase, onAddToSecondBookCase, onAddToThirdBookCase }) {
    const [show, setShow] = useState(false);
    const [bookName, setBookName] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [savePage, setSavePage] = useState('');
    const [showPageInput, setShowPageInput] = useState(false); // 페이지 입력 모달 상태
    const [selectedBook, setSelectedBook] = useState(null); // 선택된 책 정보 저장
    const [userId, setUserId] = useState(null); // 사용자 ID 상태

    useEffect(() => {
        const fetchUserId = () => {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const decodedToken = parseJwt(token);
                const userIdFromToken = decodedToken.id; // 예를 들어, 토큰에서 사용자 ID 추출
                setUserId(userIdFromToken); // 추출된 사용자 ID 설정
            }
        };

        fetchUserId(); // 페이지 로드 시 한 번 호출하여 사용자 ID 설정
    }, []);

    const handleClose = () => {
        setShow(false);
        setShowPageInput(false);
    };

    const handleShow = () => setShow(true);

    const handleSearch = () => {
        axios.post(`/search/basic_search`, { bookName: bookName })
            .then(response => {
                setSearchResult(response.data);
            })
            .catch(error => {
                console.error('ERROR:', error);
            });
    };

    const handleSaveBook = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const page = parseInt(savePage, 10);

            if (!page || page < 1) {
                window.confirm("페이지를 입력하세요");
                return;
            }

            await axios.post(`/book/${userId}?page=${page}`, selectedBook, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            handleClose();
            window.location.reload(); // 페이지 새로고침은 특정 상황에서만 사용해야 하며, 다른 방법을 사용할 수도 있습니다.
        } catch (error) {
            console.error('Error saving book:', error);
        }
    };

    const handleSaveBookClick = (item) => {
        setSelectedBook(item); // 선택된 책 정보 저장
        setShowPageInput(true); // 페이지 입력 모달 열기
    };

    const Enter = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Enter 키가 눌리면 handleSearch 함수 호출
        }
    };

    // JWT 토큰 해석 함수 예시
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return {};
        }
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                +
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={{ height: 100 }}>
                    <h2>책 검색</h2>
                    <div style={{ position: "absolute", right: "10%", top: "10%", border: '1px solid black' }}>
                        <input type="text" placeholder="책 제목을 입력하세요" value={bookName}
                               onChange={e => setBookName(e.target.value)}
                               onKeyDown={Enter}/>
                        <input type="submit" value="검색" onClick={handleSearch} />
                    </div>
                </Modal.Header>
                <Modal.Body style={{ overflow: "auto", height: 500 }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {searchResult.map((item, index) => (
                            <div key={index}>
                                <li style={{ display: 'flex', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '20px', alignSelf: 'flex-start' }}>
                                            <img src={item.image} alt={item.title} style={{ width: '200px', height: '250px' }} />
                                        </div>
                                        <div style={{ width: 500, height: 250 }}>
                                            <div style={{ width: 500, height: 250 }}>
                                                <br />
                                                <h3 style={{ width: '400px' }}>{item.title}</h3>
                                                <br />
                                                <p><strong>작가:</strong> {item.author}</p>
                                                <p><strong>출판사:</strong> {item.publisher}</p>
                                                <p><strong>ISBN:</strong> {item.isbn}
                                                    <span style={{ float: 'right' }}>
                                                        <Button variant="outline-success" onClick={() => handleSaveBookClick(item)}>
                                                            내 서재에 저장
                                                        </Button>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <hr />
                            </div>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal show={showPageInput} onHide={() => setShowPageInput(false)} size="sm">
                    <Modal.Header closeButton>
                        <Modal.Title>페이지 입력</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            type="number"
                            placeholder="페이지를 입력하세요"
                            value={savePage}
                            onChange={(e) => setSavePage(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPageInput(false)}>
                            취소
                        </Button>
                        <Button variant="primary" onClick={handleSaveBook}>
                            저장
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Modal>
        </div>
    );
}

export default CaseModal2;
