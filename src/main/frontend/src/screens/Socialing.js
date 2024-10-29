import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SocialingPage from "../components/AdminPageCo/SocialingPage";

const Home = () => {
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
                            <li className="nav-item px-lg-4"><a className="nav-link text-uppercase" href="home">Home</a></li>
                            <li className="nav-item px-lg-4"><a className="nav-link text-uppercase" href="home6">BookCase</a></li>
                            <li className="nav-item px-lg-4"><a className="nav-link text-uppercase" href="socialing2">Socialing</a></li>
                            {!jwtToken && (
                                <li className="nav-item px-lg-4"><a className="nav-link text-uppercase" href="Login">로그인</a></li>
                            )}
                            {jwtToken && (
                                <li className="nav-item px-lg-4"><a onClick={handleLogout} className="btn btn-user btn-block nav-link text-uppercase">로그아웃</a></li>
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
                                    <span className="section-heading-lower">소셜링</span>
                                </h2>


                                <ul className="nav nav-pills justify-content-center mb-4">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Write">글쓰기</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/SocialSearch2">검색</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/Socialing2">최신</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/HotSocialing2">인기</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/FavoriteSocialing">관심</a>
                                    </li>
                                </ul>

                                {/* 소셜링 콘텐츠 */}
                                <div className="row">
                                    <div>
                                        <div className="card shadow mb-4">
                                            <div className="card-body">
                                                <SocialingPage />
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
        </div>
    );
};

export default Home;
