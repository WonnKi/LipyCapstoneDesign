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
import Footer from "../components/BC/Footer";

const SecondBookCase = () => {
    const [showModal, setShowModal] = useState(false);
    const [showRecordModal, setShowRecordModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookList, setBookList] = useState([]);
    const [recordList, setRecordList] = useState([]);
    const [recordTitle, setRecordTitle] = useState("");
    const [recordContent, setRecordContent] = useState("");
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [isAddingRecord, setIsAddingRecord] = useState(false);
    const [isEditingRecord, setIsEditingRecord] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("ALL");

    const [userId, setUserId] = useState(null);

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

    const fetchBookListByStatus = async (status) => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await axios.get(`/book/${userId}/detail?status=${status}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookList(response.data);
        } catch (error) {
            console.error("Error fetching book list by status:", error);
        }
    };

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        if (status === "ALL") {
            window.location.reload();
        } else {
            fetchBookListByStatus(status);
        }
    };

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
                `/book/${userId}/${isbn}`, {
                    status: newStatus
                },
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
            window.location.reload();
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
            setIsAddingRecord(false);
        } catch (error) {
            console.error("Error saving record:", error);
        }
    };

    const handleEditRecord = async () => {
        try {
            const token = localStorage.getItem("jwtToken");
            const response = await axios.put(
                `/record/${userId}/${selectedBook.isbn}/${selectedRecord.id}`,
                { title: recordTitle, content: recordContent },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
            setShowRecordModal(false);
            setRecordTitle("");
            setRecordContent("");
            setIsEditingRecord(false);
            setSelectedRecord(null);
        } catch (error) {
            console.error("Error editing record:", error);
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

    const handleDeleteRecord = async (rId) => {
        try {
            const token = localStorage.getItem("jwtToken");
            await axios.delete(`/record/${userId}/${selectedBook.isbn}/${rId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setRecordList(recordList.filter((record) => record.id !== rId));
            setSelectedRecord(null);
        } catch (error) {
            console.error("Error deleting record:", error);
        }
    };

    const renderRecordButtons = () => {
        return recordList.map((record, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
                <Button
                    variant="outline-secondary"
                    onClick={() => handleViewRecordDetails(record)}
                    style={{
                        width: "100%",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                    className="d-flex justify-content-center align-items-center"
                >
                    {record.title}
                </Button>
            </div>
        ));
    };


    useEffect(() => {
        const fetchUserId = () => {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                const decodedToken = parseJwt(token);
                const userIdFromToken = decodedToken.id;
                setUserId(userIdFromToken);
            }
        };

        fetchUserId();
    }, []);

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return {};
        }
    };

    useEffect(() => {
        if (userId) {
            fetchBookList();
        }
    }, [userId]);

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
                                                <DropdownButton
                                                    id="dropdown-status-button"
                                                    title={`상태: ${selectedStatus}`}
                                                    onSelect={handleStatusChange}
                                                    style={{ marginBottom: "20px" }}
                                                >
                                                    <Dropdown.Item eventKey="ALL">모두</Dropdown.Item>
                                                    <Dropdown.Item eventKey="WISH">예정</Dropdown.Item>
                                                    <Dropdown.Item eventKey="READING">독서중</Dropdown.Item>
                                                    <Dropdown.Item eventKey="DONE">완독</Dropdown.Item>
                                                </DropdownButton>
                                                <Table bordered hover>
                                                    <thead>
                                                    <tr>
                                                        <th style={{ width: "27%" }}>제목</th>
                                                        <th style={{ width: "5%" }}></th>
                                                        <th style={{ width: "15%" }}>작가</th>
                                                        <th style={{ width: "15%" }}>출판사</th>
                                                        <th style={{ width: "10%" }}>독서 시작일</th>
                                                        <th style={{ width: "10%" }}>전체 페이지</th>
                                                        <th style={{ width: "5%" }}></th>
                                                        <th style={{ width: "5%" }}>상태</th>
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
                                                                    x
                                                                </Button>
                                                            </td>
                                                            <td>
                                                                <DropdownButton
                                                                    id="dropdown-basic-button"
                                                                    title={book.bookStatus}
                                                                    onSelect={(eventKey) => handleChangeStatus(book.isbn, eventKey)}
                                                                >
                                                                    <Dropdown.Item eventKey="WISH">예정</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="READING">독서중</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="DONE">완독</Dropdown.Item>
                                                                </DropdownButton>
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


            <Modal show={showRecordModal} onHide={() => setShowRecordModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>도서 기록 상세 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflow: "auto", maxHeight: "80vh" }}>
                    {selectedRecord ? (
                        <div style={{ textAlign: "center" }}>
                            {!isEditingRecord ? (
                                <div>
                                    <h5>{selectedRecord.title}</h5>
                                    <hr/>
                                    <p style={{ whiteSpace: "pre-wrap" }}>{selectedRecord.content}</p>
                                    <div style={{ textAlign: "left" }}>
                                        <Button variant="outline-primary" onClick={() => setSelectedRecord(null)}>
                                            뒤로가기
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDeleteRecord(selectedRecord.id)} style={{ marginLeft: 10 }}>
                                            삭제
                                        </Button>
                                        <Button variant="info" onClick={() => {
                                            setIsEditingRecord(true);
                                            setRecordTitle(selectedRecord.title);
                                            setRecordContent(selectedRecord.content);
                                        }} style={{ marginLeft: 10 }}>
                                            수정
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="제목"
                                        value={recordTitle}
                                        onChange={(e) => setRecordTitle(e.target.value)}
                                        style={{ marginBottom: "10px", width: "100%", padding: "8px", fontSize: "16px" }}
                                    />
                                    <textarea
                                        placeholder="내용"
                                        value={recordContent}
                                        onChange={(e) => setRecordContent(e.target.value)}
                                        style={{
                                            marginBottom: "10px",
                                            width: "100%",
                                            padding: "8px",
                                            fontSize: "16px",
                                            minHeight: "400px"
                                        }}
                                    />
                                    <Button variant="info" onClick={handleEditRecord} style={{ marginRight: "10px" }}>
                                        저장
                                    </Button>
                                    <Button variant="secondary" onClick={() => {
                                        setIsEditingRecord(false);
                                        setRecordTitle("");
                                        setRecordContent("");
                                    }}>
                                        취소
                                    </Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {renderRecordButtons()}
                        </div>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRecordModal(false)}>닫기</Button>
                </Modal.Footer>
            </Modal>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedBook && selectedBook.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflow: "auto", maxHeight: "80vh" }}>
                    {selectedBook && !isAddingRecord &&  (
                        <div>
                            <Row>
                                <Col xs lg="5">
                                    <img src={selectedBook.image} alt={selectedBook.title} style={{width: '100%'}}/>
                                </Col>
                                <Col>
                                    <p>작가: {selectedBook.author}</p>
                                    <p>출판사: {selectedBook.publisher}</p>
                                    <p>독서 상태: {selectedBook.bookStatus}</p>
                                    <p>독서 시작일: {selectedBook.startDate}</p>
                                    <p>전체 페이지: {selectedBook.totPage}</p>
                                </Col>
                            </Row>
                            <div style={{marginTop: '10px'}}>
                                <Button variant="info" onClick={() => setIsAddingRecord(true)}>메모 하기</Button>
                                <Button variant="info" onClick={() => handleViewRecords(selectedBook.isbn)}
                                        style={{marginLeft: '10px'}}>
                                    메모 보기
                                </Button>
                            </div>
                        </div>
                    )}

                    {selectedBook && isAddingRecord && (
                        <div>
                            <input
                                type="text"
                                placeholder="제목"
                                value={recordTitle}
                                onChange={(e) => setRecordTitle(e.target.value)}
                                style={{marginBottom: "10px", width: "100%", padding: "8px", fontSize: "16px"}}
                            />
                            <textarea
                                placeholder="내용"
                                value={recordContent}
                                onChange={(e) => setRecordContent(e.target.value)}
                                style={{
                                    marginBottom: "10px",
                                    width: "100%",
                                    padding: "8px",
                                    fontSize: "16px",
                                    minHeight: "400px"
                                }}
                            />
                            <Button variant="info" onClick={handleSaveRecord} style={{marginRight: "10px"}}>
                                저장
                            </Button>
                            <Button variant="secondary" onClick={() => setIsAddingRecord(false)}>
                                취소
                            </Button>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SecondBookCase;
