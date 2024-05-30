import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Container from "react-bootstrap/Container";
import NavBar from "../components/NavBar";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import { Link } from "react-router-dom";

const Home2 = () => {
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
            <Container>
                <div id="wrapper">
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <NavBar />
                            <div className="p-4 p-md-5 mb-4 text-black rounded bg">
                                <div className="col-md-6 px-0">
                                    <h1 className="display-4 fst-italic">Title of a longer featured blog post</h1>
                                    <p className="lead my-3">Multiple lines of text that form the lede, informing new
                                        readers quickly and efficiently about what’s most interesting in this post’s
                                        contents.</p>
                                    <p className="lead mb-0"><a href="#" className="text-white fw-bold">Continue
                                        reading...</a></p>
                                </div>
                            </div>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-xl-7 col-lg-7">
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
                                    <div className="col-xl-5 col-lg-5">
                                        <div className="card shadow mb-4">
                                            <div
                                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-primary">현재 읽는 중</h6>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    {/* 현재 읽는 중 컨텐츠 */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-8 mb-5">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                                <h6 className="m-0 font-weight-bold text-primary">최신 소셜링</h6>
                                                <Link to="/Socialing" className="text-primary text-decoration-none">게시판으로</Link>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    {socialings.slice(0, 3).map((socialing) => (
                                                        <div key={socialing.id} className="col-md-4 mb-2">
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

                                    <div className="col-lg-4 mb-3">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">인기도서</h6>
                                            </div>
                                            <div className="card-body">

                                            </div>
                                        </div>

                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3">
                                                <h6 className="m-0 font-weight-bold text-primary">--</h6>
                                            </div>
                                            <div className="card-body">
                                                ㅇ
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    Image by <a href="https://www.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_24307396.htm#query=book&position=22&from_view=keyword&track=sph&uuid=2aa4178a-b432-4eb9-9057-c70213446950">Freepik</a>
                                    <br />
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
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary" href="login.html">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Home2;
