    import React, { useState } from 'react';
    import Button from 'react-bootstrap/Button';
    import Modal from 'react-bootstrap/Modal';
    import axios from 'axios';
    import { PiStarFill, PiStarLight } from "react-icons/pi";
    import {Form} from "react-bootstrap";


    function CaseModal({ type, onAddToFirstBookCase, onAddToSecondBookCase, onAddToThirdBookCase }) {
        const [show, setShow] = useState(false);
        const [bookName, setBookName] = useState('');
        const [searchResult, setSearchResult] = useState([]);
        const [showConfirmReadingModal, setShowConfirmReadingModal] = useState(false);
        const [showConfirmDoneModal, setShowConfirmDoneModal] = useState(false);
        const [selectedBookImage, setSelectedBookImage] = useState(null);
        const [rating, setRating] = useState(3);

        // --
        const [selectedBookTitle, setSelectedBookTitle] = useState('');
        const [selectedBookAuthor, setSelectedBookAuthor] = useState('');
        const [selectedBookPublisher, setSelectedBookPublisher] = useState('');
        const [startDate, setStartDate] = useState("");
        // --


        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const handleSearch = () => {
            axios.post(`/search/basic_search`, { bookName: bookName })
                .then(response => {
                    setSearchResult(response.data);
                })
                .catch(error => {
                    console.error('ERROR :', error);
                });
        };

        const handleAddToWishList = (image) => {
            onAddToFirstBookCase(image);
            handleClose();
        };

        const handleOpenConfirmReadingModal = (image, author, title, publisher) => {
            setSelectedBookImage(image);
            setSelectedBookAuthor(author);
            setSelectedBookTitle(title);
            setSelectedBookPublisher(publisher);
            setShowConfirmReadingModal(true);
        };

        const handleConfirmAddToReadingList = () => {
            onAddToSecondBookCase(selectedBookImage, selectedBookAuthor, selectedBookTitle, selectedBookPublisher, startDate);
            setShowConfirmReadingModal(false);
            handleClose();
        };

        const handleOpenConfirmDoneModal = (image) => {
            setSelectedBookImage(image);
            setShowConfirmDoneModal(true);
        };

        const handleConfirmAddToDoneList = () => {
            onAddToThirdBookCase(selectedBookImage);
            setShowConfirmDoneModal(false);
            handleClose();
        };

        return (
            <>
                <Button variant="primary" onClick={handleShow}
                        >
                    +
                </Button>

                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton style={{ height: 100 }}>
                        <h2>책 검색</h2>
                        <div style={{ position: "absolute", right: "10%", top: "10%", border: '1px solid black' }}>
                            <input type="text" placeholder="책 제목을 입력하세요" value={bookName}
                                   onChange={e => setBookName(e.target.value)} />
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
                                                            {type === 'wish' && (
                                                                <Button variant="outline-primary"
                                                                        onClick={() => handleAddToWishList(item.image)}>
                                                                    읽고 싶은 책
                                                                </Button>
                                                            )}
                                                            {type === 'reading' && (
                                                                <Button variant="outline-success"
                                                                        onClick={() => handleOpenConfirmReadingModal(item.image, item.author, item.title, item.publisher)}>
                                                                    내 서재에 저장
                                                                </Button>
                                                            )}
                                                            {type === 'done' && (
                                                                <Button variant="outline-dark"
                                                                        onClick={() => handleOpenConfirmDoneModal(item.image)}>
                                                                    다 읽은 책
                                                                </Button>
                                                            )}
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
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showConfirmReadingModal} onHide={() => setShowConfirmReadingModal(false)} size="sm">
                    <Modal.Header closeButton>
                        <Modal.Title>독서 시작일</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirmReadingModal(false)}>
                            취소
                        </Button>
                        <Button variant="primary" onClick={handleConfirmAddToReadingList}>
                            저장
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showConfirmDoneModal} onHide={() => setShowConfirmDoneModal(false)} size="sm">
                    <Modal.Header closeButton>
                        <Modal.Title>페이지, 별점</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" placeholder="페이지를 입력하세요"/>
                        {/* npm install react-icons --save 설치 */}
                        <div>
                            {[...Array(rating)].map((a, i) => (
                                <PiStarFill className="star-lg" key={i} onClick={() => setRating(i + 1)}/>
                            ))}
                            {[...Array(5 - rating)].map((a, i) => (
                                <PiStarLight className="star-lg" key={i} onClick={() => setRating(rating + i + 1)}/>
                            ))}
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowConfirmDoneModal(false)}>
                            취소
                        </Button>
                        <Button variant="primary" onClick={handleConfirmAddToDoneList}>
                            저장
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    export default CaseModal;
