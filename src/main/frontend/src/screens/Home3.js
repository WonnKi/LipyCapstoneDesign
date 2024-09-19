import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";

const Home3 = () => {
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
                    <hr className="sidebar-divider my-0" />
                    <li className="nav-item active">
                        <a className="nav-link">
                            <Link className="nav-link" to="/mypage">
                            홈
                            </Link>
                        </a>
                    </li>
                    <hr />
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
                                <a className="btn btn-primary btn-user btn-block">
                                    로그인
                                </a>
                            </div>
                        </nav>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-8 mb-3">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">인기도서</h6>
                                        </div>
                                        <div className="card-body">
                                            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">--</h6>
                                        </div>
                                        <div className="card-body">
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">--</h6>
                                        </div>
                                        <div className="card-body">
                                            <br /> <br />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">최신 소셜링</h6>
                                            <Link to="/Socialing" className="text-primary text-decoration-none">더보기</Link>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                {socialings.slice(0, 4).map((socialing) => (
                                                    <div key={socialing.id} className="col-lg-3 col-md-3 mb-3">
                                                        <Link to={`/socialing/${socialing.id}`} className="text-decoration-none">
                                                            <Card className="h-100">
                                                                <Card.Body>
                                                                    <Card.Title>{socialing.title}<br />{new Date(socialing.date).toLocaleDateString()}</Card.Title>
                                                                    <Card.Text>{socialing.description}<br />{socialing.writer}</Card.Text>
                                                                    <hr />
                                                                    <p>참여자 수: {socialing.currentparticipants}</p>
                                                                    <p>최대 참여자 수: {socialing.maxparticipants}</p>
                                                                </Card.Body>
                                                            </Card>
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">인기 소셜링</h6>
                                            <Link to="/Socialing" className="text-primary text-decoration-none">더보기</Link>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                {socialings.slice(0, 4).map((socialing) => (
                                                    <div key={socialing.id} className="col-lg-3 col-md-3 mb-3">
                                                        <Link to={`/socialing/${socialing.id}`} className="text-decoration-none">
                                                            <Card className="h-100">
                                                                <Card.Body>
                                                                    <Card.Title>{socialing.title}<br />{new Date(socialing.date).toLocaleDateString()}</Card.Title>
                                                                    <Card.Text>{socialing.description}<br />{socialing.writer}</Card.Text>
                                                                    <hr />
                                                                    <p>참여자 수: {socialing.currentparticipants}</p>
                                                                    <p>최대 참여자 수: {socialing.maxparticipants}</p>
                                                                </Card.Body>
                                                            </Card>
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
            <div className="modal fade" id="logoutModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
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

export default Home3;
