import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tab from "../components/BC/Tab";
import CaseModal from "../components/BC/CaseModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SecondBookCase = () => {
    const [readingBooks, setReadingBooks] = useState([]);
    const navigate = useNavigate();

    const addBookToReadingList = (bookImage) => {
        setReadingBooks([...readingBooks, bookImage]);
    };

    const handleBookClick = (bookId) => {
        navigate(`/books/${bookId}`);
    };

    const renderBooks = () => {
        const rows = [];
        let currentRow = [];
        let totalCols = readingBooks.length;

        readingBooks.forEach((bookImage, index) => {
            currentRow.push(
                <Col key={index} className={'ColBC'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={bookImage}
                        alt="Book"
                        style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', cursor: 'pointer' }}
                        onClick={() => handleBookClick(index)}
                    />
                </Col>
            );
            if (currentRow.length === 5) {
                rows.push(<Row key={index / 5}>{currentRow}</Row>);
                currentRow = [];
            }
        });

        if (currentRow.length < 5) {
            currentRow.push(
                <Col key={totalCols} className={'ColBC'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CaseModal type="reading" onAddToSecondBookCase={addBookToReadingList} />
                </Col>
            );
            totalCols += 1;
        }

        while (currentRow.length < 5) {
            currentRow.push(<Col key={totalCols} className={'ColBC'}/>);
            totalCols += 1;
        }

        rows.push(<Row key={totalCols / 5}>{currentRow}</Row>);

        return rows;
    };

    return (
        <div>
            <Tab/>
            <Container style={{ background: "#E0B88A" }}>
                {renderBooks()}
            </Container>
        </div>
    );
};

export default SecondBookCase;
