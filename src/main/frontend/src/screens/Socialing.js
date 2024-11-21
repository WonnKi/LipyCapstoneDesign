import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SocialingPage from "../components/AdminPageCo/SocialingPage";
import {Dropdown} from "react-bootstrap";
import ReceivedMessageComponent from "../components/AdminPageCo/ReceivedMessageComponent";
import Button from "react-bootstrap/Button";
import { jwtDecode } from "jwt-decode";

const Socialing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [role, setRole] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
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
        const intervalId = setInterval(async () => {
            const messages = await fetchReceivedMessages();
            if (messages.length > receivedMessages.length) {
                setNewMessages(true);
            }
        }, 10);

        return () => clearInterval(intervalId);
    }, [receivedMessages.length]);

    const jwtToken = localStorage.getItem('jwtToken');

    const handleShowMessageModal = () => {
        setShowMessageModal(true);
    };

    // 모달 닫기
    const handleCloseMessageModal = () => {
        setShowMessageModal(false);
    };


    const handleSearch = async () => {
        setIsSearching(true);
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
                                    <span className="section-heading-lower">최신 소셜링</span>
                                </h2>

                                <div className="search-bar mb-4">
                                    <input
                                        type="text"
                                        placeholder="검색어를 입력하세요"
                                        style={{width: 500, height: 50}}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button onClick={handleSearch} style={{height: 50}}>검색</button>
                                </div>

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
                                    {jwtToken ? (
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/FavoriteSocialing">관심</Link>
                                        </li>
                                    ) : (
                                        <li className="nav-item">
                                            <span className="nav-link text-muted">관심</span>
                                        </li>
                                    )}
                                </ul>

                                <div className="row">
                                    <div>
                                        <div className="card shadow mb-4">
                                            <div className="card-body">
                                                {isSearching ? (
                                                    <div className="socialing-grid">
                                                        {searchResults.length > 0 ? (
                                                            searchResults.map((socialing) => (
                                                                <div key={socialing.id} className="socialing-card">
                                                                    <Link to={`/socialing/${socialing.id}`}
                                                                          className="text-decoration-none">
                                                                        <div style={{
                                                                            height: '180px',
                                                                            backgroundColor: '#f4e3c1'
                                                                        }}></div>
                                                                        <div className="socialing-card-content">
                                                                            <h4>{socialing.title}</h4>
                                                                            <h3>{socialing.description}</h3>
                                                                            <p><b>{socialing.currentparticipants}/{socialing.maxparticipants}</b> 명의 회원이 신청했어요</p>
                                                                        </div>
                                                                        <div className="socialing-card-footer">
                                                                            <p>{socialing.writer}</p>
                                                                            <p>{new Date(socialing.date).toLocaleDateString()}</p>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <p>검색 결과가 없습니다.</p>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <SocialingPage/>
                                                )}
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

            <ReceivedMessageComponent show={showMessageModal} handleClose={handleCloseMessageModal}/>
        </div>
    );
};

export default Socialing;
