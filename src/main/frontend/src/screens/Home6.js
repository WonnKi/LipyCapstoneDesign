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
import {Link} from "react-router-dom";
import { motion } from 'framer-motion';
import ReceivedMessageComponent from "../components/AdminPageCo/ReceivedMessageComponent";
import {jwtDecode} from "jwt-decode";




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

const pageVariants = {
    initial: { opacity: 0, rotateY: 90 },
    in: { opacity: 1, rotateY: 0 },
    out: { opacity: 0, rotateY: -90 },
};

const transition = { type: 'spring', stiffness: 300, damping: 30 };

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
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [newMessages, setNewMessages] = useState(false);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [nickname, setNickname] = useState(null);

    const fetchReceivedMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/messages/received', {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            setReceivedMessages(response.data);
            return response.data;
        } catch (error) {
            console.error("받은 쪽지를 가져오는 중 오류가 발생했습니다.", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchMessagesOnce = async () => {
            const messages = await fetchReceivedMessages();
            if (messages.length > receivedMessages.length) {
                setNewMessages(true);
            }
        };

        fetchMessagesOnce();

    }, []);

    const handleShowMessageModal = () => {
        setShowMessageModal(true);
    };

    // 모달 닫기
    const handleCloseMessageModal = () => {
        setShowMessageModal(false);
    };



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
            fetchBookList();
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

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole');
        window.location.reload();
    };

    const [role, setRole] = useState(null);

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setRole(userRole);
    }, []);

    const jwtToken = localStorage.getItem('jwtToken');

    useEffect(() => {
        if (jwtToken) {
            try {
                // JWT 디코딩으로 닉네임 추출
                const decodedToken = jwtDecode(jwtToken);
                setNickname(decodedToken.nickname);

            } catch (error) {
                console.error("닉네임을 가져오는 중 오류 발생:", error);
            }
        }
    }, [jwtToken]);

    return <div>
     {role === "ADMIN" && (
                <Button>
                    <Link className="nav-link" to="/AdminPage">
                        관리자 페이지
                    </Link>
                </Button>
            )}

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

                        <li className="nav-item px-lg-4">
                            <a className="nav-link text-uppercase" href="home">Home</a>
                        </li>
                        {jwtToken ? (
                            <li className="nav-item px-lg-4">
                                <a className="nav-link text-uppercase" href="home6">BookCase</a>
                            </li>
                        ) : (
                            <li className="nav-item px-lg-4">
                                <span className="nav-link text-uppercase text-secondary">BookCase</span>
                            </li>
                        )}
                        <li className="nav-item px-lg-4">
                            <a className="nav-link text-uppercase" href="socialing">Socialing</a>
                        </li>
                        {!jwtToken && (
                            <li className="nav-item px-lg-4">
                                <a className="nav-link text-uppercase" href="Login">로그인</a>
                            </li>
                        )}
                        {jwtToken && (
                            <li className="nav-item px-lg-4">
                                <Dropdown>
                                    <Dropdown.Toggle className="profile-icon nav-link" id="dropdown-basic">
                                        {newMessages ? `${nickname}님 🔔` : `${nickname}님` || "회원"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleShowMessageModal}>받은 쪽지</Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                        )}
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

                            <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
                                <button
                                    onClick={() => handleStatusChange("ALL")}
                                    style={{
                                        backgroundColor: selectedStatus === 'ALL' ? '#D9AE89' : 'transparent',
                                        border: '1px solid black',
                                        color: 'black',
                                        padding: '10px 20px',
                                        margin: '0 10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    전체
                                </button>
                                <button
                                    onClick={() => handleStatusChange("WISH")}
                                    style={{
                                        backgroundColor: selectedStatus === 'WISH' ? '#D9AE89' : 'transparent',
                                        border: '1px solid black',
                                        color: 'black',
                                        padding: '10px 20px',
                                        margin: '0 10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    예정
                                </button>
                                <button
                                    onClick={() => handleStatusChange("READING")}
                                    style={{
                                        backgroundColor: selectedStatus === 'READING' ? '#D9AE89' : 'transparent',
                                        border: '1px solid black',
                                        color: 'black',
                                        padding: '10px 20px',
                                        margin: '0 10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    독서중
                                </button>
                                <button
                                    onClick={() => handleStatusChange("DONE")}
                                    style={{
                                        backgroundColor: selectedStatus === 'DONE' ? '#D9AE89' : 'transparent',
                                        border: '1px solid black',
                                        color: 'black',
                                        padding: '10px 20px',
                                        margin: '0 10px',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    완독
                                </button>
                            </div>

                            <div>
                                <div className="grid"
                                     style={{
                                         backgroundColor: "#F2F1E9"
                                     }}>
                                    <div className="card2">
                                        <CaseModal2/>
                                    </div>
                                    {bookList.slice().reverse().map((book, index) => (
                                        <Card
                                            key={index}
                                            book={book}
                                            handleChangeStatus={handleChangeStatus}
                                            handleDeleteBook={handleDeleteBook}
                                            setSelectedBook={setSelectedBook}
                                            setShowModal={setShowModal}
                                        />
                                    ))}

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

        <Modal show={showRecordModal} onHide={() => setShowRecordModal(false)}
               centered>
            <Modal.Header closeButton
                          style={{
                              backgroundColor: "#EBDDCC"
                          }}>
                <Modal.Title>내 메모</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "auto", maxHeight: "80vh", backgroundColor: "#F2E3D5"}}>
                {selectedRecord ? (
                    <div style={{textAlign: "center"}}>
                        {!isEditingRecord ? (
                            <div>
                                <h5>{selectedRecord.title}</h5>
                                <hr/>
                                <p style={{whiteSpace: "pre-wrap"}}>{selectedRecord.content}</p>
                                <div style={{textAlign: "left"}}>
                                    <Button variant="outline-primary" onClick={() => setSelectedRecord(null)}>
                                        뒤로가기
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDeleteRecord(selectedRecord.id)}
                                            style={{marginLeft: 10}}>
                                        삭제
                                    </Button>
                                    <Button variant="info" onClick={() => {
                                        setIsEditingRecord(true);
                                        setRecordTitle(selectedRecord.title);
                                        setRecordContent(selectedRecord.content);
                                    }} style={{marginLeft: 10}}>
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
                                <Button variant="info" onClick={handleEditRecord} style={{marginRight: "10px"}}>
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

            <Modal.Footer
                style={{
                    backgroundColor: "#EBDDCC"
                }}>
                <Button variant="secondary" onClick={() => setShowRecordModal(false)}>닫기</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showModal} onHide={() => setShowModal(false)}
               centered>
            <Modal.Header closeButton style={{backgroundColor: "#EBDDCC"}}>
                <Modal.Title>{selectedBook && selectedBook.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{
                overflow: "auto",
                maxHeight: "80vh",
                backgroundSize: "100% 30px",
                backgroundColor: "#F2E3D5",
                fontWeight: "bold",

            }}>
                {selectedBook && (
                    <motion.div
                        initial="initial"
                        animate={isAddingRecord ? "out" : "in"}
                        exit="out"
                        variants={pageVariants}
                        transition={transition}
                    >
                        {!isAddingRecord && (
                            <div>
                                <Row>
                                    <Col xs lg="5" style={{marginLeft: '30px'}}>
                                        <img src={selectedBook.image} alt={selectedBook.title} style={{width: '100%'}}/>
                                    </Col>
                                    <Col>
                                        <p>작가: {selectedBook.author}</p>
                                        <p>출판사: {selectedBook.publisher}</p>
                                        <p>독서 상태: {selectedBook.bookStatus === 'WISH' ? '예정' :
                                            selectedBook.bookStatus === 'READING' ? '독서중' :
                                                selectedBook.bookStatus === 'DONE' ? '완독' :
                                                    selectedBook.bookStatus}</p>
                                        <p>독서 시작일: {selectedBook.startDate}</p>
                                        <p>전체 페이지: {selectedBook.totPage}</p>
                                    </Col>
                                </Row>
                                <div style={{marginTop: '10px', display: 'flex', justifyContent: 'center'}}>
                                    <Button variant="info" onClick={() => setIsAddingRecord(true)}>메모 하기</Button>
                                    <Button variant="info" onClick={() => handleViewRecords(selectedBook.isbn)}
                                            style={{marginLeft: '10px'}}>
                                        메모 보기
                                    </Button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}

                {selectedBook && isAddingRecord && (
                    <motion.div
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={transition}
                    >
                        <input
                            type="text"
                            placeholder="제목"
                            value={recordTitle}
                            onChange={(e) => setRecordTitle(e.target.value)}
                            style={{
                                marginBottom: "10px",
                                width: "100%",
                                padding: "8px",
                                fontSize: "16px",
                                backgroundColor: "#F2F1EB"
                            }}
                        />
                        <textarea
                            placeholder="내용"
                            value={recordContent}
                            onChange={(e) => setRecordContent(e.target.value)}
                            style={{
                                marginBottom: "10px",
                                width: "100%",
                                padding: "5px",
                                fontSize: "17px",
                                minHeight: "400px",
                                lineHeight: "30px",
                                backgroundSize: "100% 30px",
                                backgroundColor: "#F2F1EB"
                            }}
                        />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button variant="info" onClick={handleSaveRecord} style={{marginRight: "10px"}}>
                                저장
                            </Button>
                            <Button variant="secondary" onClick={() => setIsAddingRecord(false)}>
                                취소
                            </Button>
                        </div>
                    </motion.div>
                )}
            </Modal.Body>
        </Modal>

        <ReceivedMessageComponent show={showMessageModal} handleClose={handleCloseMessageModal}/>
    </div>
};

export default Home6;