import React, {useEffect, useState} from "react";
import axios from "axios";
import BookCount2 from "../components/AdminPageCo/BookCount2";
import Socialing1 from "../components/AdminPageCo/Socialing1";
import {Link} from "react-router-dom";
import { motion } from 'framer-motion';
import { Dropdown } from 'react-bootstrap';
import ReceivedMessageComponent from "../components/AdminPageCo/ReceivedMessageComponent";
import Button from "react-bootstrap/Button";

const Home = () => {
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [newMessages, setNewMessages] = useState(false);
    const [receivedMessages, setReceivedMessages] = useState([]);

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
        const intervalId = setInterval(async () => {
            const messages = await fetchReceivedMessages();
            if (messages.length > receivedMessages.length) {
                setNewMessages(true);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [receivedMessages.length]);


    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole');
        window.location.reload();
    };

    const jwtToken = localStorage.getItem('jwtToken');

    const [role, setRole] = useState(null);

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setRole(userRole);
    }, []);

    const handleShowMessageModal = () => {
        setShowMessageModal(true);
        setNewMessages(false);
    };

    // 모달 닫기
    const handleCloseMessageModal = () => {
        setShowMessageModal(false);
    };


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
                                        {newMessages ? "회원 🔔" : "회원"}
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
                                <span className="section-heading-lower">인기 도서</span>
                            </h2>
                            <div className="row">
                                <div>
                                    <div className="card shadow mb-4">

                                        <div className="card-body">
                                            <BookCount2/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="page-section cta">

            <div>
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <div className="cta-inner bg-faded text-center rounded">
                            <h2 className="section-heading mb-4">
                                <span className="section-heading-upper"></span>
                                <span className="section-heading-lower">최신 소셜링</span>
                            </h2>
                            <div className="row">
                                <div>
                                    <div className="card shadow mb-4">

                                        <div className="card-body">
                                            <Socialing1/>
                                        </div>
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

        <ReceivedMessageComponent show={showMessageModal} handleClose={handleCloseMessageModal} />


    </div>
};

export default Home;