import React, { useState } from "react";
import Tab from "../components/BC/Tab";
import CaseModal from "../components/BC/CaseModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ThirdBookCase = () => {
    const [readingBooks, setReadingBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null)

    const addBookToDoneList = (bookImage) => {
        setReadingBooks([...readingBooks, { image: bookImage }]);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const removeBook = (index) => {
        const updatedBooks = [...readingBooks];
        updatedBooks.splice(index, 1);
        setReadingBooks(updatedBooks);
    };

    const renderBooks = () => {
        const rows = [];
        let currentRow = [];
        let totalCols = readingBooks.length;

        readingBooks.forEach((book, index) => {
            currentRow.push(
                <Col key={index} className={'ColBC'} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={book.image}
                        alt="Book"
                        style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', cursor: 'pointer' }}
                        onClick={() => handleImageClick(book.image)}
                    />
                    <Button
                        variant="danger"
                        style={{ position: 'absolute', top: '0%', right: '10%' }}
                        onClick={() => removeBook(index)}
                    >
                        x
                    </Button>
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
                    <CaseModal type="done" onAddToThirdBookCase={addBookToDoneList} />
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

            {showModal && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton style={{ height: 100 }}>
                    </Modal.Header>
                    <Modal.Body style={{overflow: "auto", height: 500}}>
                        <img src={selectedImage} alt="Book" style={{width: '40%', height: 'auto'}}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-primary">
                            읽고 싶은 책
                        </Button>
                        <Button variant="outline-success">
                            읽는 중인 책
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default ThirdBookCase;
