import React, {useEffect, useState} from "react";
import axios from "axios";
import CaseModal2 from "../components/BC/CaseModal2";
import img from "../img/9788959897223.jpg";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Card = ({ book, handleChangeStatus, handleDeleteBook, setSelectedBook, setShowModal }) => {
    return (
        <div className="card2">
            <div className="img">
                <img src={book.image || img} alt={book.title} style={{
                    width: "100%",
                    height: "200px",
                    marginTop: "10px"
                }}/>
            </div>
            <div className="product-name">
                <span>{book.title}</span>
            </div>
            <div className="overlay">
                <div className="detail">
                    <Button onClick={() => {
                        setSelectedBook(book);
                        setShowModal(true);
                    }}>
                        자세히
                    </Button>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title={book.bookStatus === 'WISH' ? '예정' :
                                book.bookStatus === 'READING' ? '독서중' :
                                book.bookStatus === 'DONE' ? '완독' :
                                book.bookStatus}
                        onSelect={(eventKey) => handleChangeStatus(book.isbn, eventKey)}
                    >
                        <Dropdown.Item eventKey="WISH">예정</Dropdown.Item>
                        <Dropdown.Item eventKey="READING">독서중</Dropdown.Item>
                        <Dropdown.Item eventKey="DONE">완독</Dropdown.Item>
                    </DropdownButton>
                    <Button variant="danger" onClick={() => handleDeleteBook(book.isbn)}>삭제</Button>
                </div>
            </div>
        </div>
    );
};

const Home6 = () => {
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

    return <div>

        <header>
            <h1 className="site-heading text-center text-faded d-none d-lg-block">
                <span className="site-heading-upper text-primary mb-3"></span>
                <span className="site-heading-lower">LIPY</span>
            </h1>
        </header>

        <nav className="navbar navbar-expand-lg navbar-dark py-lg-4" id="mainNav">
            <div className="container">
                <a className="navbar-brand text-uppercase fw-bold d-lg-none" href="index.html">Start Bootstrap</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                            href="index.html">Home</a></li>
                        <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                            href="about.html">BookCase</a></li>
                        <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                            href="products.html">Socialing</a></li>
                        {/*<li className="nav-item px-lg-4"><a className="nav-link text-uppercase"*/}
                        {/*                                    href="store.html">Store</a></li>*/}
                    </ul>
                </div>
            </div>
        </nav>

        <section className="page-section cta">
            <div>
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <div className="cta-inner bg-faded text-center rounded">
                            <h2 className="section-heading mb-4">
                                <span className="section-heading-upper"></span>
                                <span className="section-heading-lower">BookCase</span>
                            </h2>
                            <div>
                                <div className="grid">
                                    {bookList.map((book, index) => (
                                        <Card
                                            key={index}
                                            book={book}
                                            handleChangeStatus={handleChangeStatus}
                                            handleDeleteBook={handleDeleteBook}
                                            setSelectedBook={setSelectedBook}
                                            setShowModal={setShowModal}
                                        />
                                    ))}
                                    <div className="card2">
                                        <CaseModal2/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            .
        </footer>

        <Modal show={showRecordModal} onHide={() => setShowRecordModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>내 메모</Modal.Title>
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
};

export default Home6;