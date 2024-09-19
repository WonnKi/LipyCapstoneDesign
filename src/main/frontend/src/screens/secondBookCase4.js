import React, { useEffect, useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Sidebar from "../components/BC/Sidebar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CaseModal2 from "../components/BC/CaseModal2";

const SecondBookCase = () => {
    const [showModal, setShowModal] = useState(false);
    const [showRecordModal, setShowRecordModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookList, setBookList] = useState([]);
    const [recordList, setRecordList] = useState([]);
    const [recordTitle, setRecordTitle] = useState("");
    const [recordContent, setRecordContent] = useState("");
    const [selectedRecord, setSelectedRecord] = useState(null);

    const userId = 1;

    useEffect(() => {
        const fetchBookList = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                const response = await axios.get(`/book/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBookList(response.data);
            } catch (error) {
                console.error("Error fetching book list:", error);
            }
        };
        fetchBookList();
    }, [userId]);

    const handleDeleteBook = async (isbn) => {
        try {
            const token = localStorage.getItem("jwtToken");
            await axios.delete(`/book/${userId}/${isbn}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookList(bookList.filter((book) => book.isbn !== isbn));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    const handleChangeStatus = async (isbn, newStatus) => {
        try {
            const token = localStorage.getItem("jwtToken");
            await axios.patch(
                `/book/${userId}/${isbn}`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const updatedBookList = bookList.map((book) =>
                book.isbn === isbn ? { ...book, status: newStatus } : book
            );
            setBookList(updatedBookList);
        } catch (error) {
            console.error("Error changing book status:", error);
        }
    };

    const handleSaveRecord = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await axios.post(
                `/record/${userId}/${selectedBook.isbn}`,
                { title: recordTitle, content: recordContent },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
            setShowModal(false);
            setRecordTitle("");
            setRecordContent("");
        } catch (error) {
            console.error("Error saving record:", error);
        }
    };

    const handleViewRecords = async (isbn) => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await axios.get(`/record/${userId}/${isbn}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRecordList(response.data);
            setShowRecordModal(true);
        } catch (error) {
            console.error("Error fetching record list:", error);
        }
    };

    const handleViewRecordDetails = (record) => {
        setSelectedRecord(record);
        setShowRecordModal(true);
    };

    const renderRecordButtons = () => {
        return recordList.map((record, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
                <Button variant="outline-secondary" onClick={() => handleViewRecordDetails(record)}>
                    {record.title}
                </Button>
            </div>
        ));
    };

    return (
        <div>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column" style={{ background: "#D9C5AD" }}>
                    <div id="content">
                        <div className="container-fluid">
                            <div className="row" style={{ marginTop: "20px" }}>
                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">독서 기록</h6>
                                            <CaseModal2/>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <Table bordered hover>
                                                    <thead>
                                                    <tr>
                                                        <th style={{ width: "30%" }}>제목</th>
                                                        <th style={{ width: "5%" }}></th>
                                                        <th style={{ width: "15%" }}>작가</th>
                                                        <th style={{ width: "15%" }}>출판사</th>
                                                        <th style={{ width: "10%" }}>독서 시작일</th>
                                                        <th style={{ width: "10%" }}>전체 페이지</th>
                                                        <th style={{ width: "5%" }}></th>
                                                        <th style={{ width: "5%" }}>상태 변경</th>
                                                        <th style={{ width: "5%" }}>독서 기록 보기</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {bookList.map((book, index) => (
                                                        <tr key={index}>
                                                            <td
                                                                onClick={() => {
                                                                    setSelectedBook(book);
                                                                    setShowModal(true);
                                                                }}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                {book.title}
                                                            </td>
                                                            <td>
                                                                <img src={book.image} alt={book.title} style={{ width: "50px" }} />
                                                            </td>
                                                            <td>{book.author}</td>
                                                            <td>{book.publisher}</td>
                                                            <td>{book.startDate}</td>
                                                            <td>{book.totPage}</td>
                                                            <td>
                                                                <Button variant="danger" onClick={() => handleDeleteBook(book.isbn)}>
                                                                    삭제
                                                                </Button>
                                                            </td>
                                                            <td>
                                                                <DropdownButton
                                                                    id="dropdown-basic-button"
                                                                    title={book.status}
                                                                    onSelect={(eventKey) => handleChangeStatus(book.isbn, eventKey)}
                                                                >
                                                                    <Dropdown.Item eventKey="WISH">예정</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="READING">독서중</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="DONE">완독</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                            <td>
                                                                <Button variant="info" onClick={() => handleViewRecords(book.isbn)}>
                                                                    독서 기록 보기
                                                                </Button>
                                                            </td>
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

            {/* 새로운 모달 창 */}
            <Modal show={showRecordModal} onHide={() => setShowRecordModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>도서 기록 상세 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflow: "auto", maxHeight: "80vh" }}>
                    {selectedRecord ? (
                        <div>
                            <h5>{selectedRecord.title}</h5>
                            <p>{selectedRecord.content}</p>
                            <Button variant="outline-primary" onClick={() => setSelectedRecord(null)}>
                                뒤로가기
                            </Button>
                        </div>
                    ) : (
                        <div>
                            {renderRecordButtons()} {/* 독서 기록 버튼 목록 */}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRecordModal(false)}>닫기</Button>
                </Modal.Footer>
            </Modal>

            {/* 기존 모달 창 */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedBook && selectedBook.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflow: "auto", maxHeight: "80vh" }}>
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
                                    <p>전체 페이지: {selectedBook.totPage}</p>
                                </Col>
                            </Row>
                            <input
                                type="text"
                                placeholder="독서 기록 제목"
                                value={recordTitle}
                                onChange={(e) => setRecordTitle(e.target.value)}
                            />
                            <textarea
                                placeholder="독서 기록 내용"
                                value={recordContent}
                                onChange={(e) => setRecordContent(e.target.value)}
                            />
                            <Button variant="info" onClick={handleSaveRecord}>저장</Button>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>닫기</Button>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SecondBookCase;

