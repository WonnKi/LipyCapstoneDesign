import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Container from "react-bootstrap/Container";

import FirstBookCase from "./firstBookCase";
import SecondBookCase from "./secondBookCase";
import ThirdBookCase from "./thirdBookCase";
import Sidebar from "../components/BC/Sidebar";

const MyPage2 = () => {
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
                <Sidebar />
                <div id="content-wrapper" className="d-flex flex-column"
                     style={{
                         background:"#D9C5AD"
                     }}>
                    <div id="content">
                        <div className="container-fluid">

                            <div className="row">
                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">읽는 중인 책</h6>
                                            <Link to="/secondBookCase" className="text-primary text-decoration-none">더보기</Link>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <Container style={{ background: "#E0B88A" }}>
                                                    <SecondBookCase />
                                                </Container>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">이미 읽은 책</h6>
                                            <Link to="/ThirdBookCase" className="text-primary text-decoration-none">더보기</Link>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <Container style={{ background: "#E0B88A" }}>
                                                    <ThirdBookCase />
                                                </Container>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">읽고 싶은 책</h6>
                                            <Link to="/FirstBookCase" className="text-primary text-decoration-none">더보기</Link>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <Container style={{ background: "#E0B88A" }}>
                                                    <FirstBookCase />
                                                </Container>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="sticky-footer">
                        <div className="container my-auto">

                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default MyPage2;
