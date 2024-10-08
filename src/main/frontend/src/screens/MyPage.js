import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import CaseModal from "../components/BC/CaseModal";


const MyPage = () => {
    const [socialings, setSocialings] = useState([]);

    useEffect(() => {
        const fetchSocialings = async () => {
            try {
                const response = await axios.get('/socialing');
                setSocialings(response.data.reverse());
            } catch (error) {
                console.error('소셜링을 불러오는 중 에러 발생:', error);
            }
        };

        fetchSocialings();
    }, []);


    // ---

    const [readingBooks, setReadingBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null)

    const addBookToWishList = (bookImage) => {
        setReadingBooks([...readingBooks, { image: bookImage }]);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const removeBook = (index) => {
        const updatedBooks = [...readingBooks];
        updatedBooks.splice(index, 1);
        setReadingBooks(updatedBooks);
    };

    const renderBooks = () => {
        const rows = [];
        let currentRow = [];
        let totalCols = readingBooks.length;

        readingBooks.forEach((book, index) => {
            currentRow.push(
                <Col key={index} className={'ColBC'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={book.image}
                        alt="Book"
                        style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', cursor: 'pointer' }}
                        onClick={() => handleImageClick(book.image)}
                    />
                    <Button
                        variant="danger"
                        style={{ position: 'absolute', top: '0%', right: '10%' }}
                        onClick={() => removeBook(index)}
                    >
                        x
                    </Button>
                </Col>
            );
            if (currentRow.length === 5) {
                rows.push(<Row key={index / 5}>{currentRow}</Row>);
                currentRow = [];
            }
        });

        if (currentRow.length < 5) {
            currentRow.push(
                <Col key={totalCols} className={'ColBC'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CaseModal type="wish" onAddToFirstBookCase={addBookToWishList} />
                </Col>
            );
            totalCols += 1;
        }

        while (currentRow.length < 5) {
            currentRow.push(<Col key={totalCols} className={'ColBC'}/>);
            totalCols += 1;
        }

        rows.push(<Row key={totalCols / 5}>{currentRow}</Row>);

        return rows;
    };


    // --


    return (
        <div>
            <div id="wrapper">
                <div className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                        <div className="sidebar-brand-text mx-3">LIPY</div>
                    </a>
                    <hr className="sidebar-divider my-0"/>
                    <li className="nav-item active">
                        <a className="nav-link" href="/">
                            <span>홈</span></a>
                    </li>
                    <hr/>
                    <div className="nav-item">
                        <Link className="nav-link" to="/mypage">
                            마이 페이지
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link className="nav-link" to="/socialing">
                            소셜링 페이지
                        </Link>
                    </div>
                </div>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">

                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            <div className="navbar-nav ml-auto">
                                <Link className="btn btn-primary btn-user btn-block" to="/Login">
                                    로그인
                                </Link>
                            </div>
                        </nav>

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-8 col-lg-5">
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">캘린더</h6>
                                        </div>
                                        <div className="card-body">
                                            <div>
                                                <FullCalendar
                                                    plugins={[dayGridPlugin]}
                                                    initialView="dayGridMonth"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-3">
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">현재 읽는 중</h6>
                                        </div>
                                        <div className="card-body">
                                            <div>
                                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                                <br/><br/><br/><br/><br/><br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">읽는 중인 책</h6>
                                            <Link to="/Socialing"
                                                  className="text-primary text-decoration-none">더보기</Link>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <Container style={{background: "#E0B88A"}}>
                                                    {renderBooks()}
                                                </Container>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">이미 읽은 책</h6>
                                            <Link to="/Socialing"
                                                  className="text-primary text-decoration-none">더보기</Link>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <Container style={{ background: "#E0B88A" }}>
                                                    {renderBooks()}
                                                </Container>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">읽고 싶은 책</h6>
                                            <Link to="/Socialing"
                                                  className="text-primary text-decoration-none">더보기</Link>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">

                                                <Container style={{background: "#E0B88A"}}>
                                                    {renderBooks()}
                                                </Container>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2021</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>

            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current
                            session.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                            <a className="btn btn-primary" href="login.html">Logout</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MyPage;
