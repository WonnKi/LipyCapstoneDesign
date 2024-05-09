import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from "../components/BC/Tab";
import CaseModal from "../components/BC/CaseModal";
import img01 from "../img/dumy.webp"

const SecondBookCase = () => {
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
                    <img className={'Books'} src={img01} alt="?"/>
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

export default SecondBookCase;