import React from "react";
import Cards from "../components/comuunity/Cards";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Community = () => {
    return <div>
        <Container>
            <Row>
                <Col><Cards/></Col>
                <Col><Cards/></Col>
                <Col><Cards/></Col>
                <Col><Cards/></Col>
                <Col><Cards/></Col>
                <Col><Cards/></Col>
            </Row>
        </Container>
    </div>;

};

export default Community;


