import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Col from "react-bootstrap/Col";
import SocialSearch from "./SocialSearch";
import Button from "react-bootstrap/Button";
import Sidebar from "../components/BC/Sidebar";
import Footer from "../components/BC/Footer";

const SocialSearch2 = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/socialing/search?title=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('게시글 검색 중 에러 발생:', error);
        }
    };

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
                                            <a className="navbar-brand">
                                                <input
                                                    type="text"
                                                    placeholder="검색어를 입력하세요"
                                                    style={{width: 500, height: 50}}
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                                <Button onClick={handleSearch} style={{height: 50}}>검색</Button>
                                            </a>
                                        </nav>
                                        <div className="card-body">
                                            <div className="row">
                                                {searchResults.map((socialing, index) => (
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
                    <Footer/>
                </div>
            </div>

        </div>
    );
};

export default SocialSearch2;
