import React, { useEffect, useState } from "react";
import Sidebar from "../components/BC/Sidebar";
import FullCalendar from "@fullcalendar/react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";
import dayGridPlugin from "@fullcalendar/daygrid";
import Card from "react-bootstrap/Card";

const Home3 = () => {
    const [socialings, setSocialings] = useState([]);
    const [hotSocialings, setHotSocialings] = useState([]);
    const [readingBooks, setReadingBooks] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = () => {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                const decodedToken = parseJwt(token);
                const userIdFromToken = decodedToken.id;
                setUserId(userIdFromToken);
            }
        };

        const fetchSocialings = async () => {
            try {
                const response = await axios.get('/socialing');
                setSocialings(response.data.reverse());
            } catch (error) {
                console.error('소셜링을 불러오는 중 에러 발생:', error);
            }
        };

        const fetchHotSocialings = async () => {
            try {
                const response = await axios.get('/socialing/hot');
                setHotSocialings(response.data);
            } catch (error) {
                console.error('인기 소셜링을 불러오는 중 에러 발생:', error);
            }
        };

        const fetchReadingBooks = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                const response = await axios.get(`/book/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReadingBooks(response.data);
            } catch (error) {
                console.error("현재 읽는 중인 책을 불러오는 중 에러 발생:", error);
            }
        };

        fetchUserId();
        fetchSocialings();
        fetchHotSocialings();
        if (userId) {
            fetchReadingBooks();
        }
    }, [userId]);

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return {};
        }
    };

    return (
        <div>
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column" style={{ background: "#D9C5AD"}}>


                    <div className="p-md-5 text-white bg" style={{ height: "700px"}}>
                        <div className="col-md-6">
                            <h1 className="display-2 fst-italic">LIPY</h1>

                        </div>
                    </div>

                    <div className="p-5 py-5 ">
                        <div>
                            <div>
                                <div className="row">
                                    <div className="col-xl-8 col-lg-5">
                                        <div className="card shadow mb-4">
                                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold">캘린더</h6>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-4 col-lg-3">
                                        <div className="card shadow mb-4">
                                            <div
                                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold">나의 서재</h6>
                                                <Link to="/secondBookCase2"
                                                      className="text-primary text-decoration-none">더보기</Link>
                                            </div>
                                            <div className="card-body">
                                                {readingBooks.length > 0 ? (
                                                    <Table bordered hover>
                                                        <tbody>
                                                        {readingBooks.slice(0, 6).map((book) => (
                                                            <tr key={book.isbn}>
                                                                <td>
                                                                    <img src={book.image} alt={book.title}
                                                                         style={{width: "50px"}}/>
                                                                </td>
                                                                <td>{book.title}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </Table>
                                                ) : (
                                                    <p>서재가 비어있습니다.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>



                    <div className="p-5 py-5" style={{ background: "#EBDDCC" }}>
                        <div className="col-lg-12 mb-8">
                            <div className="card shadow mb-4">
                                <div
                                    className="card-header py-3 d-flex justify-content-between align-items-center">
                                    <h6 className="m-0 font-weight-bold">최신 소셜링</h6>
                                    <Link to="/Socialing"
                                          className="text-primary text-decoration-none">더보기</Link>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        {socialings.slice(0, 3).map((socialing) => (
                                            <div key={socialing.id} className="col-lg-4 col-md-6 mb-8">
                                                <Link to={`/socialing/${socialing.id}`}
                                                      className="text-decoration-none">
                                                    <Card className="h-100">
                                                        <Card style={{background: "white"}}>
                                                            <h5 className="card-title"
                                                                style={{background: "white"}}>{socialing.title}</h5>
                                                            <p className="card-text2"
                                                               style={{background: "white"}}>
                                                                {socialing.description}
                                                            </p>
                                                            <p style={{paddingLeft: 15}}>
                                                                {new Date(socialing.date).toLocaleDateString()}<br/>
                                                                {new Date(socialing.date).toLocaleTimeString()}
                                                            </p>
                                                            <div className="card-footer" style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center"
                                                            }}>
                                                                <a>{socialing.writer}</a>
                                                                <a>{socialing.currentparticipants}/{socialing.maxparticipants}</a>
                                                            </div>
                                                        </Card>
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
                                    <h6 className="m-0 font-weight-bold">인기 소셜링</h6>
                                    <Link to="/Socialing" className="text-primary text-decoration-none">더보기</Link>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        {hotSocialings.slice(0, 3).map((socialing) => (
                                            <div key={socialing.id} className="col-lg-4 col-md-6 mb-8">
                                                <Link to={`/socialing/${socialing.id}`}
                                                      className="text-decoration-none">
                                                    <Card style={{background: "white"}}>
                                                        <h5 className="card-title"
                                                            style={{background: "white"}}>{socialing.title}</h5>
                                                        <p className="card-text2" style={{background: "white"}}>
                                                            {socialing.description}
                                                        </p>
                                                        <p style={{paddingLeft: 15}}>
                                                            {new Date(socialing.date).toLocaleDateString()}<br/>
                                                            {new Date(socialing.date).toLocaleTimeString()}
                                                        </p>
                                                        <div className="card-footer" style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center"
                                                        }}>
                                                            <a>{socialing.writer}</a>
                                                            <a>{socialing.currentparticipants}/{socialing.maxparticipants}</a>
                                                        </div>
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
        </div>
    );
};

export default Home3;
