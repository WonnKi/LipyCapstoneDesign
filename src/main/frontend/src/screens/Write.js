import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FirstBC from "../components/bookcase_com/FirstBC";
import SecondBC from "../components/bookcase_com/SecondBC";
import ThirdBC from "../components/bookcase_com/ThirdBC";


const Bookcase = () => {
    return <div>
        <Container>
                <Row>
                    <Col>
                        <FirstBC/>
                    </Col>
                    <Col>
                        <SecondBC/>
                    </Col>
                    <Col>
                        <ThirdBC/>
                    </Col>
                </Row>
        </Container>
    </div>

    };

export default Bookcase;
