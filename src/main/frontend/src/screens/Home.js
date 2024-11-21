import React, {useEffect, useState} from "react";
import axios from "axios";
import BookCount2 from "../components/AdminPageCo/BookCount2";
import Socialing1 from "../components/AdminPageCo/Socialing1";
import {Link} from "react-router-dom";
import {motion, AnimatePresence, isValidMotionProp} from "framer-motion";
import { Dropdown } from 'react-bootstrap';
import ReceivedMessageComponent from "../components/AdminPageCo/ReceivedMessageComponent";
import Button from "react-bootstrap/Button";
import Image from '../bookimg/소년이온다_한강.jpg';
import Image2 from '../bookimg/채식주의자_한강.jpg';
import Image3 from '../bookimg/트럼프 2.0 시대_박종훈.jpg';
import Image4 from '../bookimg/모순_양귀자.jpg';
import Image5 from '../bookimg/이처럼 사소한 것들_클레어 키건.jpg'
import "./Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../font/font.css"
import { jwtDecode } from "jwt-decode";



const Home = () => {
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [newMessages, setNewMessages] = useState(false);
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
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

    const handleShowMessageModal = () => {
        setShowMessageModal(true);
        setNewMessages(false);
    };

    // 모달 닫기
    const handleCloseMessageModal = () => {
        setShowMessageModal(false);
    };



    const books = [
        { id: 1, title: "소년이 온다", description: "한강",  image: Image },
        { id: 2, title: "채식주의자", description: "한강",  image: Image2 },
        { id: 3, title: "트럼프 2.0 시대", description: "박종훈",  image: Image3 },
        { id: 4, title: "모순", description: "양귀자",  image: Image4 },
        { id: 5, title: "이처럼 사소한 것들", description: "클레어 키건",  image: Image5 },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true,
        centerPadding: "30%",
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

                <nav className="navbar navbar-expand-lg navbar-dark py-lg-4" id="mainNav"
                     style={{
                         marginBottom: '5rem'
                     }}>
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


            <section className="cta">

                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <div className="cta-inner bg-faded text-center rounded"
                             style={{
                                 backgroundColor: "#e0b88a"
                             }}>
                            <h2 className="section-heading mb-4">
                                <span className="section-heading-lower">베스트셀러</span>
                            </h2>
                            <Slider {...settings}>
                                {books.map((book) => (
                                    <div key={book.id} className="slide">
                                        <img src={book.image} alt={book.title}/>
                                        <h3>{book.title}</h3>
                                        <p>{book.description}</p>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta2">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <div className="cta-inner bg-faded text-center rounded"

                        >

                            <h2 className="section-heading mb-4">
                                <span className="section-heading-upper"></span>
                                <span className="section-heading-lower">LIPY <span style={{color: "#e0b88a"}}>회원</span>들의 선택</span>
                            </h2>
                            <div className="row">
                                <div>
                                    <div
                                        // className="card mb-4"
                                    >
                                        <div
                                            // className="card-body"
                                        >
                                            <BookCount2/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="cta">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{
                                ease: "easeInOut",
                                duration: 1,
                                y: { duration: 1 },
                            }}
                            className="cta-inner bg-faded text-center rounded card mb-4"
                             style={{
                                 backgroundColor: "#EBDDCC"
                             }}>
                            <div className="custom-container ">
                                <div className="left-section">
                                    <div className="icon-group">
                                        <div className="icon-item">
                                            <div className="icon">📚</div>
                                            <p>책을 고르고</p>
                                        </div>
                                        <div className="icon-item">
                                            <div className="icon">📖</div>
                                            <p>독서 하고</p>
                                        </div>
                                        <div className="icon-item">
                                            <div className="icon">✍️️</div>
                                            <p>기록 하고</p>
                                        </div>
                                        <div className="icon-item">
                                            <div className="icon">💡</div>
                                            <p>영감을 얻다</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="right-section">
                                    <h1>읽고, 느끼고, 기록하다</h1>
                                    <p>
                                        책의 세계로 떠나보세요. 한 페이지, 한 페이지가 새로운 이야기를 선사합니다.
                                    </p>
                                    <p>
                                        당신을 감동시키고, 도전하고, 성장시키는 책을 선택하세요.
                                    </p>
                                    <p>
                                        읽는 순간 떠오른 생각과 느낀 점을 기록하며, 책과의 대화를 이어가세요.
                                    </p>
                                    <p>
                                        한 권의 책, 한 편의 글이 쌓여 당신만의 독서 여정을 완성합니다.
                                    </p>
                                    <p>
                                        기록을 통해 책과 나를 더 깊이 이해하고, 그 순간을 오래도록 간직하세요.
                                        이곳은 당신만의 책장입니다.
                                    </p>
                                    <a href="/home6">
                                        <button className="read-more">→</button>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="cta2">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{
                                ease: "easeInOut",
                                duration: 1,
                                y: { duration: 1 },
                            }}
                            className="cta-inner bg-faded text-center rounded card mb-4"
                             style={{
                                 backgroundColor: "#e0b88a",
                             }}>
                            <div className="custom-container"
                                 style={{
                                     marginTop: 50,
                                     marginBottom: 40
                                 }}>
                                <div className="right-section">
                                    <h1>모임을 갖고, 나누고, 성장하다</h1>
                                    <p>
                                        책은 혼자 읽을 때도 좋지만, 함께 읽을 때 더 큰 가치를 만들어냅니다.
                                    </p>
                                    <p>
                                        소셜링 기능을 통해 책을 사랑하는 사람들과 소통하며 새로운 관점과 영감을 얻으세요.
                                    </p>
                                    <p>
                                        소셜링은 독서로 연결된 사람들과의 특별한 공간입니다.
                                    </p>
                                    <p>
                                        독서의 즐거움이 당신의 이야기가 되고, 이야기가 누군가의 영감이 되는 순간을 경험해 보세요.
                                    </p>
                                    <a href="/socialing">
                                        <button className="read-more">→</button>
                                    </a>


                                </div>

                                <div className="left-section">
                                    <div className="icon-group">
                                        <div className="icon-item">
                                            <div className="icon">👥</div>
                                            <p>사람들과 만나</p>
                                        </div>
                                        <div className="icon-item">
                                            <div className="icon">💬</div>
                                            <p>토론 하고</p>
                                        </div>
                                        <div className="icon-item">
                                            <div className="icon">🤝</div>
                                            <p>생각을 공유하며</p>
                                        </div>
                                        <div className="icon-item">
                                            <div className="icon">🌟</div>
                                            <p>영감을 나누다</p>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="cta">
                <div>
                    <div className="row">
                        <div className="col-xl-9 mx-auto">
                            <div className="cta-inner bg-faded text-center rounded"
                                 style={{
                                     backgroundColor: "#e0b88a"
                                 }}>
                                <h2 className="section-heading mb-4">
                                    <span className="section-heading-upper"></span>
                                    <span className="section-heading-lower">최신 <span
                                        style={{color: "#EBDDCC"}}>소셜링</span></span>
                                </h2>
                                <div className="row">
                                    <div>
                                        <div
                                            // className="card shadow mb-4"
                                        >

                                            <div
                                                // className="card-body"
                                            >
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

            <section style={{backgroundColor: "white"}}>
                <footer className="container py-5">
                    <div className="row">
                        <div className="col-12 col-md">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                 stroke="currentColor"
                                 stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                 className="d-block mb-2"
                                 role="img" viewBox="0 0 24 24"><title>Product</title>
                                <circle cx="12" cy="12" r="10"/>
                                <path
                                    d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/>
                            </svg>
                            <small className="d-block mb-3 text-muted">&copy; 2017–2022</small>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Features</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="link-secondary" href="#">Cool stuff</a></li>
                                <li><a className="link-secondary" href="#">Random feature</a></li>
                                <li><a className="link-secondary" href="#">Team feature</a></li>
                                <li><a className="link-secondary" href="#">Stuff for developers</a></li>
                                <li><a className="link-secondary" href="#">Another one</a></li>
                                <li><a className="link-secondary" href="#">Last time</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Resources</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="link-secondary" href="#">Resource name</a></li>
                                <li><a className="link-secondary" href="#">Resource</a></li>
                                <li><a className="link-secondary" href="#">Another resource</a></li>
                                <li><a className="link-secondary" href="#">Final resource</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Resources</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="link-secondary" href="#">Business</a></li>
                                <li><a className="link-secondary" href="#">Education</a></li>
                                <li><a className="link-secondary" href="#">Government</a></li>
                                <li><a className="link-secondary" href="#">Gaming</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>About</h5>
                            <ul className="list-unstyled text-small">
                                <li><a className="link-secondary" href="#">Team</a></li>
                                <li><a className="link-secondary" href="#">Locations</a></li>
                                <li><a className="link-secondary" href="#">Privacy</a></li>
                                <li><a className="link-secondary" href="#">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </section>


            <ReceivedMessageComponent show={showMessageModal} handleClose={handleCloseMessageModal}/>


    </div>
};

export default Home;