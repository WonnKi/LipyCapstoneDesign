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
                    style={{ height: 700, width: 600, overflowY: 'auto' }}>
                    <input type="text" placeholder="책 제목을 입력하세요" value={bookName} onChange={e => setBookName(e.target.value)} />
                    <input type="submit" value="검색" onClick={handleSearch} />

                    <ul style={{listStyleType: 'none', padding: 0}}>
                        {searchResult.map((item, index) => (
                            <li key={index} style={{display: 'flex', marginBottom: '20px'}}>
                                <div style={{backgroundColor: '#FBF2EF', display: 'flex'}}>
                                    <div style={{marginRight: '20px', alignSelf: 'flex-start'}}>
                                        <img src={item.image} alt={item.title}
                                             style={{width: '130px', height: '160px'}}/>
                                    </div>
                                    <div>
                                        <h6 style={{
                                            marginBottom: '10px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            width: '400px' // 글자 수 조절
                                        }}>{item.title}</h6>
                                        <div>
                                            <p><strong>작가:</strong> {item.author}</p>
                                            <p><strong>출판사:</strong> {item.publisher}</p>
                                            <p><strong>ISBN:</strong> {item.isbn}</p>
                                        </div>
                                    </div>
                                </div>
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
