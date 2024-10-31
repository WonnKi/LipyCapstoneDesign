import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/BC/Sidebar";
import Footer from "../components/BC/Footer";

const FavoriteSocialing = () => {
    const [favoriteSocialings, setFavoriteSocialings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [role, setRole] = useState(null);
    const jwtToken = localStorage.getItem('jwtToken');

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
            <header>
                <h1 className="site-heading text-center text-faded d-none d-lg-block">
                    <span className="site-heading-upper text-primary mb-3"></span>
                    <span className="site-heading-lower">LIPY</span>
                </h1>
            </header>

            <nav className="navbar navbar-expand-lg navbar-dark py-lg-4" id="mainNav">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto">
                            {role === "ADMIN" && (
                                <Link className="nav-link" to="/AdminPage">
                                    관리 페이지
                                </Link>
                            )}
                            <li className="nav-item px-lg-4"><a className="nav-link text-uppercase" href="home">Home</a>
                            </li>
                            <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                                href="home6">BookCase</a></li>
                            <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                                href="socialing2">Socialing</a></li>
                            {!jwtToken && (
                                <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                                    href="Login">로그인</a></li>
                            )}
                            {jwtToken && (
                                <li className="nav-item px-lg-4"><a onClick={handleLogout}
                                                                    className="btn btn-user btn-block nav-link text-uppercase">로그아웃</a>
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
                                    <span className="section-heading-lower">인기 소셜링</span>
                                </h2>

                                <ul className="nav nav-pills justify-content-center mb-4">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Write">글쓰기</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/SocialSearch2">검색</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Socialing">최신</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/HotSocialing2">인기</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/FavoriteSocialing">관심</a>
                                    </li>
                                </ul>

                                <div className="card shadow mb-4">
                                    <div className="card-body">
                                        <div className="book-grid">
                                            {favoriteSocialings.map((socialing, index) => (
                                                <div key={socialing.id} className="book-card">
                                                    <Link to={`/socialing/${socialing.id}`}
                                                          className="text-decoration-none">
                                                        <p>
                                                            <b>{socialing.currentparticipants}/{socialing.maxparticipants}</b> 명의
                                                            회원이 신청했어요</p>
                                                        <h4>{socialing.title}</h4>
                                                        <h3>{socialing.description}</h3>
                                                        <p>{socialing.writer}</p>
                                                        <p>{new Date(socialing.date).toLocaleDateString()}</p>
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



        </div>
    );
};

export default FavoriteSocialing;
