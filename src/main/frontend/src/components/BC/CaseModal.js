import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Example() {
    const [show, setShow] = useState(false);
    const [bookName, setBookName] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSearch = () => {
        axios.post(`/search/basic_search`, { bookName: bookName })
            .then(response => {
                setSearchResult(response.data);
            })
            .catch(error => {
                // 오류 처리
                console.error('ERROR :', error);
            });
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}
                    style={{
                        position: "absolute",
                        top: "40%",
                        left: "40%",
                        margin: "auto",
                        display: "block",
                    }}>
                +
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>책 검색</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{ height: 500 }}>
                    <input type="text" placeholder="책 제목을 입력하세요" value={bookName} onChange={e => setBookName(e.target.value)} />
                    <input type="submit" value="검색" onClick={handleSearch} />
                    {/* 검색 결과 출력 */}
                    <ul>
                        {searchResult.map((item, index) => (
                            <li key={index}>
                                <h3>{item.title}</h3>
                                <img src={item.image} alt={item.title}/>
                                <p>작가: {item.author}</p>
                                <p>출판사: {item.publisher}</p>
                                <p>{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        저장
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Example;
