import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/BC/Sidebar";
import Footer from "../components/BC/Footer";
import {Dropdown} from "react-bootstrap";
import ReceivedMessageComponent from "../components/AdminPageCo/ReceivedMessageComponent";
import Button from "react-bootstrap/Button";

const FavoriteSocialing = () => {
    const [favoriteSocialings, setFavoriteSocialings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [role, setRole] = useState(null);
    const jwtToken = localStorage.getItem('jwtToken');
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
        }, 10);

        return () => clearInterval(intervalId);
    }, [receivedMessages.length]);

    const handleShowMessageModal = () => {
        setShowMessageModal(true);
    };

    // 모달 닫기
    const handleCloseMessageModal = () => {
        setShowMessageModal(false);
    };


    const handleSearch = async () => {
        try {
            const response = await axios.get(`/socialing/search?title=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('게시글 검색 중 에러 발생:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole');
        window.location.reload();
    };

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setRole(userRole);
    }, []);


    useEffect(() => {
        const fetchFavoriteSocialings = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    console.error('No token found, please login again.');
                    return;
                }
                const response = await axios.get('http://localhost:8080/interest/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFavoriteSocialings(response.data);
            } catch (error) {
                console.error('Error fetching favorite socialings:', error);
            }
        };

        fetchFavoriteSocialings();
    }, []);

    return (
        <div>
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
                                    <span className="section-heading-lower">관심 소셜링</span>
                                </h2>

                                <ul className="nav nav-pills justify-content-center mb-4">
                                    {jwtToken ? (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/Write">글쓰기</Link>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <span className="nav-link text-muted">글쓰기</span>
                                        </li>
                                    )}
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/Socialing">최신</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/HotSocialing2">인기</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/FavoriteSocialing">관심</Link>
                                    </li>
                                </ul>

                                <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <div className="socialing-grid">
                                            {favoriteSocialings.map((socialing, index) => (
                                                <div key={socialing.id} className="socialing-card">
                                                    <Link to={`/socialing/${socialing.id}`}
                                                          className="text-decoration-none">
                                                                     <div style={{ height: '180px', backgroundColor: '#f4e3c1' }}>
                                                                               <div
                                                                                                                   dangerouslySetInnerHTML={{
                                                                                                                       __html: socialing?.content.replace(/\n/g, '<br />'),
                                                                                                                   }}
                                                                                                               /></div>
                                                        <div className="socialing-card-content">
                                                            <h4>{socialing.title}</h4>
                                                            <h3>{socialing.description}</h3>
                                                            <p>
                                                                <b>{socialing.currentparticipants}/{socialing.maxparticipants}</b> 명의
                                                                회원이 신청했어요</p>
                                                        </div>
                                                        <div className="socialing-card-footer">
                                                            <p>{socialing.writer}</p>
                                                            <p>{new Date(socialing.date).toLocaleDateString()}</p>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ReceivedMessageComponent show={showMessageModal} handleClose={handleCloseMessageModal}/>


        </div>
    );
};

export default FavoriteSocialing;
