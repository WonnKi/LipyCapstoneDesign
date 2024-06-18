import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Sidebar from "../components/BC/Sidebar";
import Footer from "../components/BC/Footer";

const FavoriteSocialing = () => {
    const [favoriteSocialings, setFavoriteSocialings] = useState([]);

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
                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3">
                                            <a className="navbar-brand">관심 소셜링</a>
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
                                                <li className="nav-item">
                                                    <a className="nav-link" href="FavoriteSocialing">관심</a>
                                                </li>
                                            </ul>
                                        </nav>
                                        <div className="card-body">
                                            <div className="row">
                                                {favoriteSocialings.map((socialing, index) => (
                                                    <Col key={index} className="col-lg-4 col-md-6 mb-8">
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
                                                    </Col>
                                                ))}
                                            </div>
                                        </div>
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

export default FavoriteSocialing;
