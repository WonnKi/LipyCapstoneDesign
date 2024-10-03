import React, { useEffect, useState } from "react";
import img from '../img/9788959897223.jpg';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Card = ({ book, handleChangeStatus, handleDeleteBook, setSelectedBook, setShowModal }) => {
    return (
        <div className="card2">
            <div className="number">
                <span>{book.title}</span>
            </div>
            <div className="img">
                <img src={book.image || img} alt={book.title} style={{
                    width: "100%",
                    height: "100px",
                    marginTop: "10px"
                }} />
            </div>
            <div className="product-name">
                <span>{book.author}</span>
            </div>
            <div className="overlay2">
                <div className="detail">
                    <Button onClick={() => {
                        setSelectedBook(book);
                        setShowModal(true);
                    }}>
                        Details
                    </Button>
                    <DropdownButton
                        id="dropdown-basic-button"
                        title={book.bookStatus}
                        onSelect={(eventKey) => handleChangeStatus(book.isbn, eventKey)}
                    >
                        <Dropdown.Item eventKey="WISH">예정</Dropdown.Item>
                        <Dropdown.Item eventKey="READING">독서중</Dropdown.Item>
                        <Dropdown.Item eventKey="DONE">완독</Dropdown.Item>
                    </DropdownButton>
                    <Button variant="danger" onClick={() => handleDeleteBook(book.isbn)}>Delete</Button>
                </div>
            </div>
        </div>
    );
};

const Home5 = () => {
    const [bookList, setBookList] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showModal, setShowModal] = useState(false);
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

        const fetchUserId = () => {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                const decodedToken = parseJwt(token);
                const userIdFromToken = decodedToken.id;
                setUserId(userIdFromToken);
            }
        };

        fetchUserId();
        if (userId) {
            fetchBookList();
        }
    }, [userId]);

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return {};
        }
    };

    const handleChangeStatus = async (isbn, newStatus) => {
        try {
            const token = localStorage.getItem("jwtToken");
            await axios.patch(
                `/book/${userId}/${isbn}`, { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setBookList(bookList.map((book) =>
                book.isbn === isbn ? { ...book, status: newStatus } : book
            ));
        } catch (error) {
            console.error("Error changing book status:", error);
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

    return (
        <div>
            <div className="container">
                <div className="box">
                    <div className="wrapper">
                        <div className="content">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for book details */}
            {selectedBook && showModal && (
                <div className="modal">
                    <h2>{selectedBook.title}</h2>
                    <p>Author: {selectedBook.author}</p>
                    <p>Publisher: {selectedBook.publisher}</p>
                    <p>Status: {selectedBook.bookStatus}</p>
                    <p>Start Date: {selectedBook.startDate}</p>
                    <p>Total Pages: {selectedBook.totPage}</p>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                </div>
            )}
        </div>
    );
};

export default Home5;
