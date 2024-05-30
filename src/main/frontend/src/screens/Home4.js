import React, {useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";

const Home = () => {

    return <div>
        {/*<FullCalendar*/}
        {/*    plugins={[dayGridPlugin]}*/}
        {/*    initialView="dayGridMonth"*/}
        {/*/>*/}

        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
        <meta name="description" content=""/>
        <meta name="author" content=""/>
        <title>Business Casual - Start Bootstrap Theme</title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico"/>

        <link
            href="https://fonts.googleapis.com/css?family=Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i"
            rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Lora:400,400i,700,700i" rel="stylesheet"/>

        <link href="css/styles.css" rel="stylesheet"/>

        <header>
            <h1 className="site-heading text-center text-faded d-none d-lg-block">
                <span className="site-heading-upper text-primary mb-3">Literature & Insights Platform for You</span>
                <span className="site-heading-lower">LIPY</span>
            </h1>
        </header>

        <section className="page-section cta">

            <div className="col">
                <div className="col-xl-11 mx-auto">

                    <div className="row g-5">

                        <div className="col-md-7">
                            <article className="blog-post">
                                <div className="row featurette">
                                    <div className="cta-inner bg-faded text-center rounded">
                                        <FullCalendar
                                            plugins={[dayGridPlugin]}
                                            initialView="dayGridMonth"
                                        />
                                    </div>
                                </div>
                            </article>
                        </div>

                        <div className="col-md-5">
                            <article className="blog-post">
                                <div className="row featurette">
                                    <div className="cta-inner bg-faded text-center rounded"
                                         style={{
                                             height: 620
                                         }}>
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="row-md-5">
                            <article className="blog-post">
                                <div className="row featurette">
                                    <div className="cta-inner bg-faded text-center rounded">
                                        <Container>
                                            <Row>
                                                <Col>
                                                    <Card style={{ width: '20rem', margin: 10 }}>
                                                        <Card.Img variant="top" src="https://velog.velcdn.com/images/oneoneone/post/b80ef382-273f-46fb-8cd4-700a136fc3c1/image.png" />
                                                        <Card.Body>
                                                            <Card.Title
                                                            style={{
                                                                width:"300px",
                                                                overflow:"hidden",
                                                                whiteSpace:"nowrap",
                                                                textOverflow:"ellipsis",
                                                            }}>[TOP 10] 개발자들이 많이 읽은 아티클 모음 - 5월 1주차</Card.Title>
                                                            <Card.Text
                                                            style={{
                                                                textAlign:"left",
                                                                height:100,
                                                                fontSize:15
                                                            }}>
                                                                IT 제품 팀을 위한 감도 높은 정보 큐레이션 플랫폼 일일일에서 한 주간 개발자들이 많이 읽은 상위 10개의 아티클들을 소개합니다.
                                                            </Card.Text>
                                                            <Card.Footer></Card.Footer>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col>
                                                    <Card style={{ width: '20rem', margin: 10 }}>
                                                        <Card.Img variant="top" src="https://velog.velcdn.com/images/surim014/post/bf98b93c-8b93-4b49-bcdd-642866e51e8d/image.png" />
                                                        <Card.Body>
                                                            <Card.Title
                                                                style={{
                                                                    width:"300px",
                                                                    overflow:"hidden",
                                                                    whiteSpace:"nowrap",
                                                                    textOverflow:"ellipsis",
                                                                }}>[번역] 소프트웨어 개발의 미래에 대한 생각</Card.Title>
                                                            <Card.Text
                                                            style={{
                                                                textAlign:"left",
                                                                height:100,
                                                                fontSize:15
                                                            }}>
                                                                원문 : https://www.sheshbabu.com/posts/thoughts-on-the-future-of-software-development
                                                            </Card.Text>
                                                            <Card.Footer></Card.Footer>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col>
                                                    <Card style={{ width: '20rem', margin: 10 }}>
                                                        <Card.Img variant="top" src="https://velog.velcdn.com/images/wijoonwu/post/b62dca0d-c782-492f-9c0e-409dd0e086d9/image.jpg" />
                                                        <Card.Body>
                                                            <Card.Title
                                                                style={{
                                                                    width:"300px",
                                                                    overflow:"hidden",
                                                                    whiteSpace:"nowrap",
                                                                    textOverflow:"ellipsis",
                                                                }}>2024 정보처리기사 실기 1회차 후기(+공부 방법)</Card.Title>
                                                            <Card.Text
                                                                style={{
                                                                    textAlign:"left",
                                                                    height:100,
                                                                    fontSize:15
                                                                }}>
                                                                1회차는 쉽다고 했는데..
                                                            </Card.Text>
                                                            <Card.Footer></Card.Footer>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </div>
                                </div>
                            </article>
                        </div>


                        {/*// 옆 게시판*/}
                        {/*<div className="col-md-4">*/}
                        {/*    <div className="position-sticky">*/}

                        {/*        <div>*/}
                        {/*            <h4 className="fst-italic">최신 게시물</h4>*/}
                        {/*            <ul className="cta-inner bg-faded text-center rounded">*/}
                        {/*                <li>*/}
                        {/*                    <test className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"*/}
                        {/*                       href="#">*/}
                        {/*                        <svg className="bd-placeholder-img" width="100%" height="96"*/}
                        {/*                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true"*/}
                        {/*                             preserveAspectRatio="xMidYMid slice" focusable="false">*/}
                        {/*                            <rect width="100%" height="100%" fill="#777"/>*/}
                        {/*                        </svg>*/}
                        {/*                        <div className="col-lg-8">*/}
                        {/*                            <h6 className="mb-0">CaseModal blog post title</h6>*/}
                        {/*                            <small className="text-body-secondary">January 15, 2024</small>*/}
                        {/*                        </div>*/}
                        {/*                    </test>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <test className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"*/}
                        {/*                       href="#">*/}
                        {/*                        <svg className="bd-placeholder-img" width="100%" height="96"*/}
                        {/*                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true"*/}
                        {/*                             preserveAspectRatio="xMidYMid slice" focusable="false">*/}
                        {/*                            <rect width="100%" height="100%" fill="#777"/>*/}
                        {/*                        </svg>*/}
                        {/*                        <div className="col-lg-8">*/}
                        {/*                            <h6 className="mb-0">This is another blog post title</h6>*/}
                        {/*                            <small className="text-body-secondary">January 14, 2024</small>*/}
                        {/*                        </div>*/}
                        {/*                    </test>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <test className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"*/}
                        {/*                       href="#">*/}
                        {/*                        <svg className="bd-placeholder-img" width="100%" height="96"*/}
                        {/*                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true"*/}
                        {/*                             preserveAspectRatio="xMidYMid slice" focusable="false">*/}
                        {/*                            <rect width="100%" height="100%" fill="#777"/>*/}
                        {/*                        </svg>*/}
                        {/*                        <div className="col-lg-8">*/}
                        {/*                            <h6 className="mb-0">Longer blog post title: This one has*/}
                        {/*                                multiple*/}
                        {/*                                lines!</h6>*/}
                        {/*                            <small className="text-body-secondary">January 13, 2024</small>*/}
                        {/*                        </div>*/}
                        {/*                    </test>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </div>*/}

                        {/*        <div>*/}
                        {/*            <h4 className="fst-italic">최신 소셜링</h4>*/}
                        {/*            <ul className="cta-inner bg-faded text-center rounded">*/}
                        {/*                <li>*/}
                        {/*                    <test className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"*/}
                        {/*                       href="#">*/}
                        {/*                        <svg className="bd-placeholder-img" width="100%" height="96"*/}
                        {/*                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true"*/}
                        {/*                             preserveAspectRatio="xMidYMid slice" focusable="false">*/}
                        {/*                            <rect width="100%" height="100%" fill="#777"/>*/}
                        {/*                        </svg>*/}
                        {/*                        <div className="col-lg-8">*/}
                        {/*                            <h6 className="mb-0">CaseModal blog post title</h6>*/}
                        {/*                            <small className="text-body-secondary">January 15, 2024</small>*/}
                        {/*                        </div>*/}
                        {/*                    </test>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <test className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"*/}
                        {/*                       href="#">*/}
                        {/*                        <svg className="bd-placeholder-img" width="100%" height="96"*/}
                        {/*                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true"*/}
                        {/*                             preserveAspectRatio="xMidYMid slice" focusable="false">*/}
                        {/*                            <rect width="100%" height="100%" fill="#777"/>*/}
                        {/*                        </svg>*/}
                        {/*                        <div className="col-lg-8">*/}
                        {/*                            <h6 className="mb-0">This is another blog post title</h6>*/}
                        {/*                            <small className="text-body-secondary">January 14, 2024</small>*/}
                        {/*                        </div>*/}
                        {/*                    </test>*/}
                        {/*                </li>*/}
                        {/*                <li>*/}
                        {/*                    <test className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"*/}
                        {/*                       href="#">*/}
                        {/*                        <svg className="bd-placeholder-img" width="100%" height="96"*/}
                        {/*                             xmlns="http://www.w3.org/2000/svg" aria-hidden="true"*/}
                        {/*                             preserveAspectRatio="xMidYMid slice" focusable="false">*/}
                        {/*                            <rect width="100%" height="100%" fill="#777"/>*/}
                        {/*                        </svg>*/}
                        {/*                        <div className="col-lg-8">*/}
                        {/*                            <h6 className="mb-0">Longer blog post title: This one has*/}
                        {/*                                multiple*/}
                        {/*                                lines!</h6>*/}
                        {/*                            <small className="text-body-secondary">January 13, 2024</small>*/}
                        {/*                        </div>*/}
                        {/*                    </test>*/}
                        {/*                </li>*/}
                        {/*            </ul>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>

                </div>

            </div>
        </section>
        <footer className="footer text-faded text-center py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <h4 className="text-uppercase mb-4">LIPY</h4>
                        <p className="lead mb-0"
                           style={{
                               fontSize: 15
                           }}>
                            소개
                            <br/>
                            FAQ
                            <br/>
                        </p>
                    </div>

                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <h4 className="text-uppercase mb-4">오시는 길</h4>
                        <p className="lead mb-0"
                           style={{
                               fontSize: 15
                           }}>
                            경기도 의정부시 서부로 545
                        </p>
                    </div>

                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <h4 className="text-uppercase mb-4">업무 시간</h4>
                        <p className="lead mb-0"
                           style={{
                               fontSize: 15
                           }}>
                            평일 : 오전 10시 ~ 오후 7시
                            <br/>
                            토요일 : 오전 10시 ~ 오후 8시
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    </div>
};

export default Home;