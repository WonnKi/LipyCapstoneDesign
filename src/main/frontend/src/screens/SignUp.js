import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const SignUp = () => {
    return <div>
        <section className="page-section cta">
            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Col md={6}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>아이디</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="아이디"
                                    name="username"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>비밀번호</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="비밀번호"
                                    name="password"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>이름</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="이름"
                                    name="name"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>이메일</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="이메일"
                                    name="email"
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="w-100">
                                회원가입
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    </div>

};

export default SignUp;