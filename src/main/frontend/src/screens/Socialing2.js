import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Col from "react-bootstrap/Col";

const Socialing2 = () => {
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
                        <Link className="nav-link" to="/mypage2">
                            마이 페이지
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link className="nav-link" to="/socialing2">
                            소셜링 페이지
                        </Link>
                    </div>
                    <hr/>
                    <Link className="btn btn-user btn-block" to="/Login">
                        로그인
                    </Link>
                    <Link className="btn btn-user btn-block" to="/signup2">
                        회원이 아니신가요?
                    </Link>
                </div>

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3">
                                            <a className="navbar-brand">최신 소셜링</a>
                                            <ul className="nav nav-pills">
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
                                                    <a className="nav-link" href="HotSocialing2">인기</a>
                                                </li>
                                            </ul>
                                        </nav>
                                        <div className="card-body">
                                            <div className="row">
                                            {socialings.map((socialing, index) => (
                                                    <Col key={socialing.id} className="col-lg-3 col-md-3 mb-3">
                                                        <Link to={`/socialing/${socialing.id}`}
                                                              className="text-decoration-none">
                                                            <Card className="h-100">
                                                                <Card.Body>
                                                                    <Card.Title>{socialing.title}<br/>{new Date(socialing.date).toLocaleDateString()}
                                                                    </Card.Title>
                                                                    <Card.Text>{socialing.description}<br/>{socialing.writer}
                                                                    </Card.Text>
                                                                    <hr/>
                                                                    <p>참여자 수: {socialing.currentparticipants}</p>
                                                                    <p>최대 참여자 수: {socialing.maxparticipants}</p>
                                                                </Card.Body>
                                                            </Card>
                                                        </Link>
                                                    </Col>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">

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

export default Socialing2;
