import React from "react";
import Tab from "../components/BC/Tab";
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import img01 from "../img/dumy.webp";
import CaseModal from "../components/BC/CaseModal";

const ThirdBookCase = () => {
    return <div>
        <Tab/>
        <Container
            style={{
                background:"#E0B88A"
            }}>
            <Row>
                <Col
                    className={'ColBC'}>
                    <CaseModal/>
                </Col>
                <Col
                    className={'ColBC'}>
                </Col>
                <Col
                    className={'ColBC'}>
                </Col>
                <Col
                    className={'ColBC'}>
                </Col>
                <Col
                    className={'ColBC'}>
                </Col>
                <Col
                    className={'ColBC'}>
                </Col>
            </Row>

            <Row>
                <Col
                    className={'ColBC'}>
                </Col>
                <Col
                    className={'ColBC'}>
                </Col>
                <Col
                    className={'ColBC'}>
                </Col>
                <Col
                    className={'ColBC'}>
                </Col>
                <Col
                    className={'ColBC'}>
                </Col>
                <Col
                    className={'ColBC'}>
                </Col>

            </Row>

        </Container>
    </div>
};

export default ThirdBookCase;