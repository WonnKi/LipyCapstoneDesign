import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Sidebar from "../components/BC/Sidebar"

const Home = () => {
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
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column"
                     style={{
                         background:"#D9C5AD"
                     }}>
                    <div id="content">
                        <div className="container-fluid">
                            <div className="row"
                                 style={{ marginTop: '20px' }}>
                                <div className="row">
                                    <div className="col-xl-8 col-lg-5">
                                        <div className="card shadow mb-4">
                                            <div
                                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold">캘린더</h6>
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
                                    <div className="col-xl-4 col-lg-3">
                                        <div className="card shadow mb-4">
                                            <div
                                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold">현재 읽는 중</h6>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                                    <br/><br/><br/><br/><br/><br/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
                                                                <Card
                                                                    style={{
                                                                        background: "white"
                                                                    }}>
                                                                    <h5 className="card-title"
                                                                        style={{
                                                                            background:"white"
                                                                        }}>{socialing.title}</h5>
                                                                    <p className="card-text2"
                                                                       style={{
                                                                           background:"white"
                                                                       }}>
                                                                        {socialing.description}
                                                                    </p>
                                                                    <p
                                                                        style={{
                                                                            paddingLeft:15
                                                                        }}>
                                                                        {new Date(socialing.date).toLocaleDateString()}<br/>
                                                                        {new Date(socialing.date).toLocaleTimeString()}
                                                                    </p>
                                                                    <div className="card-footer"
                                                                         style={{
                                                                             display:"flex",
                                                                             justifyContent:"space-between",
                                                                             alignItems:"center"
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
                                        <div
                                            className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold ">인기 소셜링</h6>
                                            <Link to="/Socialing"
                                                  className="text-primary text-decoration-none">더보기</Link>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                {socialings.slice(0, 3).map((socialing) => (
                                                    <div key={socialing.id} className="col-lg-4 col-md-6 mb-8">
                                                        <Link to={`/socialing/${socialing.id}`}
                                                              className="text-decoration-none">
                                                            <Card
                                                                style={{
                                                                    background: "white"
                                                                }}>
                                                                <h5 className="card-title"
                                                                    style={{
                                                                        background:"white"
                                                                    }}>{socialing.title}</h5>
                                                                <p className="card-text2"
                                                                   style={{
                                                                       background:"white"
                                                                   }}>
                                                                    {socialing.description}
                                                                </p>
                                                                <p
                                                                    style={{
                                                                        paddingLeft:15
                                                                    }}>
                                                                    {new Date(socialing.date).toLocaleDateString()}<br/>
                                                                    {new Date(socialing.date).toLocaleTimeString()}
                                                                </p>
                                                                <div className="card-footer"
                                                                     style={{
                                                                         display:"flex",
                                                                         justifyContent:"space-between",
                                                                         alignItems:"center"
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
                    <footer className="sticky-footer">
                        <div className="container my-auto">

                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Home;
