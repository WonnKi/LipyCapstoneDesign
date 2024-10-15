import React, {useEffect, useState} from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

const Home4 = () => {

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


    return <div>

        <header>
            <h1 className="site-heading text-center text-faded d-none d-lg-block">
                <span className="site-heading-upper text-primary mb-3"></span>
                <span className="site-heading-lower">LIPY</span>
            </h1>
        </header>

        <nav className="navbar navbar-expand-lg navbar-dark py-lg-4" id="mainNav">
            <div className="container">
                <a className="navbar-brand text-uppercase fw-bold d-lg-none" href="index.html">Start Bootstrap</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                            href="index.html">Home</a></li>
                        <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                            href="about.html">BookCase</a></li>
                        <li className="nav-item px-lg-4"><a className="nav-link text-uppercase"
                                                            href="products.html">Socialing</a></li>
                        {/*<li className="nav-item px-lg-4"><a className="nav-link text-uppercase"*/}
                        {/*                                    href="store.html">Store</a></li>*/}
                    </ul>
                </div>
            </div>
        </nav>

        <section className="page-section cta">
            <div className="container">
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <div className="cta-inner bg-faded text-center rounded">
                            <h2 className="section-heading mb-4">
                                <span className="section-heading-upper"></span>
                                <span className="section-heading-lower">BookCase</span>
                            </h2>
                            <div className="row">
                                <div>
                                    <div className="card shadow mb-4">

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
            </div>
        </section>

        <section className="page-section cta">
            <div>
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <div className="cta-inner bg-faded text-center rounded">
                            <h2 className="section-heading mb-4">
                                <span className="section-heading-upper"></span>
                                <span className="section-heading-lower">최신 소셜링</span>
                            </h2>
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
                </div>
            </div>
        </section>

        <footer>
            .
        </footer>


    </div>
};

export default Home4;