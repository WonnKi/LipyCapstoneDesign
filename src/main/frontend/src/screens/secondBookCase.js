import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import CaseModal from "../components/BC/CaseModal";
import Table from "react-bootstrap/Table";
import Sidebar from "../components/BC/Sidebar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SecondBookCase = () => {
    const [readingBooks, setReadingBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [memoText, setMemoText] = useState('');
    const [memoList, setMemoList] = useState([]);
    const [selectedMemoIndex, setSelectedMemoIndex] = useState(null);

    const addBookToReadingList = (bookImage, bookAuthor, bookTitle, bookPublisher, startDate) => {
        setReadingBooks([...readingBooks, {
            image: bookImage,
            author: bookAuthor,
            title: bookTitle,
            publisher: bookPublisher,
            status: "읽는 중",
            startDate: startDate
        }]);
    };

    const handleStatusChange = (index, newStatus) => {
        const updatedBooks = [...readingBooks];
        updatedBooks[index].status = newStatus;
        setReadingBooks(updatedBooks);
    };

    const handleTitleClick = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    };


    const handleMemoChange = (event) => {
        setMemoText(event.target.value);
    };

    const handleSaveMemo = () => {
        const newMemoList = [...memoList, memoText];
        setMemoList(newMemoList);
        setMemoText('');
    };

    const handleMemoButtonClick = (index) => {
        setSelectedMemoIndex(index);
        setShowModal(true);
    };

    const renderMemoButtons = () => {
        return memoList.map((memo, index) => (
            <Button
                key={index}
                variant="primary"
                onClick={() => handleMemoButtonClick(index)}
            >
                {index + 1}번째 메모
            </Button>
        ));
    };

    return (
        <div>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column" style={{ background: "#D9C5AD" }}>
                    <div id="content">
                        <div className="container-fluid">
                            <div className="row" style={{ marginTop: '20px' }}>
                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">독서 기록</h6>
                                            <CaseModal type="reading" onAddToSecondBookCase={addBookToReadingList} />
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <Table bordered hover>
                                                    <thead>
                                                    <tr>
                                                        <th style={{ width: '35%' }}>제목</th>
                                                        <th style={{ width: '5%' }}></th>
                                                        <th style={{ width: '15%' }}>작가</th>
                                                        <th style={{ width: '15%' }}>출판사</th>
                                                        <th style={{ width: '15%' }}>상태</th>
                                                        <th style={{ width: '15%' }}>독서 시작일</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {readingBooks.map((book, index) => (
                                                        <tr key={index}>
                                                            <td onClick={() => handleTitleClick(book)} style={{ cursor: 'pointer' }}>{book.title}</td>
                                                            <td><img src={book.image} alt={book.title} style={{ width: '50px' }} /></td>
                                                            <td>{book.author}</td>
                                                            <td>{book.publisher}</td>
                                                            <td>
                                                                <DropdownButton title={book.status} onSelect={(eventKey) => handleStatusChange(index, eventKey)}>
                                                                    <Dropdown.Item eventKey="읽는 중">읽는 중</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="완독">완독</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="독서 예정">독서 예정</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                            <td>{book.startDate}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Body style={{overflow: "auto", height: 600}}>
                    {selectedBook && (
                        <div>
                            <Row>
                                <Col xs lg="5">
                            <img src={selectedBook.image} alt={selectedBook.title} style={{ width: '100%' }} />
                                </Col>
                                <Col>
                            <p>작가: {selectedBook.author}</p>
                            <p>출판사: {selectedBook.publisher}</p>
                            <p>독서 상태: {selectedBook.status}</p>
                            <p>독서 시작일: {selectedBook.startDate}</p>
                                </Col>
                            </Row>

                        </div>
                    )}
                    {selectedMemoIndex !== null ? (
                        <div>
                            <h4>{selectedMemoIndex + 1}번째 메모</h4>
                            <p>{memoList[selectedMemoIndex]}</p>
                            <Button variant="primary" onClick={() => setSelectedMemoIndex(null)}>돌아가기</Button>
                        </div>
                    ) : (
                        <div>
                            <Row>
                                <Col>
                                </Col>
                            </Row>
                            <Row>
                                {renderMemoButtons()}
                                <textarea
                                    value={memoText}
                                    onChange={handleMemoChange}
                                    style={{width: '100%', height: 150, resize: 'none'}}
                                    placeholder="메모를 작성하세요..."/>
                                <Button variant="primary" onClick={handleSaveMemo}>메모 저장</Button>
                            </Row>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SecondBookCase;
