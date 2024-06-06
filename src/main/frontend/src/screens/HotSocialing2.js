import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/BC/Sidebar";

const HotSocialing2 = () => {
    const [socialings, setSocialings] = useState([]);

    useEffect(() => {
        const fetchSocialings = async () => {
            try {
                const response = await axios.get('/socialing/hot');
                setSocialings(response.data);
            } catch (error) {
                console.error('소셜링을 불러오는 중 에러 발생:', error);
            }
        };

        fetchSocialings();
    }, []);

    return (
        <div>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">

                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3">
                                            <a className="navbar-brand">인기 소셜링</a>
                                            <ul className="nav nav-pills">
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
                                                    <Col key={index} className="col-lg-3 col-md-3 mb-3">
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
        </div>
    );
};

export default HotSocialing2;
