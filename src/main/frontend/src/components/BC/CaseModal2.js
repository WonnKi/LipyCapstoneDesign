import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function CaseModal({ type, onAddToFirstBookCase, onAddToSecondBookCase, onAddToThirdBookCase }) {
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
                // Error handling
                console.error('ERROR :', error);
            });
    };

    const handleAddToWishList = (image) => {
        onAddToFirstBookCase(image);
        handleClose();
    };

    const handleAddToReadingList = (image) => {
        onAddToSecondBookCase(image);
        handleClose();
    };

    const handleAddToFinishedList = (image) => {
        onAddToThirdBookCase(image);
        handleClose();
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

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={{ height: 100 }}>
                    <h2>책 검색</h2>
                    <div style={{ position: "absolute", right: "10%", top: "10%", border: '1px solid black' }}>
                        <input type="text" placeholder="책 제목을 입력하세요" value={bookName}
                               onChange={e => setBookName(e.target.value)}/>
                        <input type="submit" value="검색" onClick={handleSearch}/>
                    </div>
                </Modal.Header>
                <Modal.Body style={{ overflow: "auto", height: 500 }}>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {searchResult.map((item, index) => (
                            <div key={index}>
                                <li style={{ display: 'flex', marginBottom: '20px' }}>
                                    <div style={{ display: 'flex' }}>
                                        <div style={{ marginRight: '20px', alignSelf: 'flex-start' }}>
                                            <img src={item.image} alt={item.title} style={{ width: '200px', height: '250px' }}/>
                                        </div>
                                        <div style={{ width: 500, height: 250 }}>
                                            <div style={{ width: 500, height: 250 }}>
                                                <br/>
                                                <h3 style={{ width: '400px' }}>{item.title}</h3>
                                                <br/>
                                                <p><strong>작가:</strong> {item.author}</p>
                                                <p><strong>출판사:</strong> {item.publisher}</p>
                                                <p><strong>ISBN:</strong> {item.isbn}
                                                    <span style={{float: 'right'}}>
                                                {type === 'wish' && (
                                                    <Button variant="outline-primary"
                                                            onClick={() => handleAddToWishList(item.image)}>
                                                        읽고 싶은 책
                                                    </Button>
                                                )}
                                                        {type === 'reading' && (
                                                            <Button variant="outline-success"
                                                                    onClick={() => handleAddToReadingList(item.image)}>
                                                                읽는 중인 책
                                                            </Button>
                                                        )}
                                                        {type === 'finished' && (
                                                            <Button variant="outline-dark"
                                                                    onClick={() => handleAddToFinishedList(item.image)}>
                                                                다 읽은 책
                                                            </Button>
                                                        )}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <hr/>
                            </div>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CaseModal;
