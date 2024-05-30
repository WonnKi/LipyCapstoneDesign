import React, { useState } from "react";
import Tab from "../components/BC/Tab";
import CaseModal from "../components/BC/CaseModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const SecondBookCase = () => {
    const [readingBooks, setReadingBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [memoText, setMemoText] = useState('');
    const [memoList, setMemoList] = useState([]);
    const [selectedMemoIndex, setSelectedMemoIndex] = useState(null);

    const addBookToReadingList = (bookImage) => {
        setReadingBooks([...readingBooks, { image: bookImage }]);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowModal(true);
    };

    const removeBook = (index) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const updatedBooks = [...readingBooks];
            updatedBooks.splice(index, 1);
            setReadingBooks(updatedBooks);
        }
    };

    const handleMemoChange = (event) => {
        setMemoText(event.target.value);
    };

    const handleSaveMemo = () => {
        const newMemoList = [...memoList, memoText];
        setMemoList(newMemoList);
        setMemoText('');
    };

    const handleMemoButtonClick = (index) => {
        setSelectedMemoIndex(index);
        setShowModal(true);
    };

    const renderMemoButtons = () => {
        return memoList.map((memo, index) => (
            <Button
                key={index}
                variant="primary"
                onClick={() => handleMemoButtonClick(index)}
            >
                {index + 1}번째 메모
            </Button>
        ));
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
            {/*<Tab/>*/}
            <Container style={{ background: "#E0B88A" }}>
                {renderBooks()}
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Body style={{overflow: "auto", height: 600}}>
                    {selectedMemoIndex !== null ? (
                        <div>
                            <h4>{selectedMemoIndex + 1}번째 메모</h4>
                            <p>{memoList[selectedMemoIndex]}</p>
                            <Button variant="primary" onClick={() => setSelectedMemoIndex(null)}>돌아가기</Button>
                        </div>
                    ) : (
                        <div>
                            <Row>
                                <Col xs lg="5">
                                    <img src={selectedImage} alt="Book" style={{width: '100%', height: 'auto'}}/>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                            <Row>
                                {renderMemoButtons()}
                                <textarea
                                    value={memoText}
                                    onChange={handleMemoChange}
                                    style={{width: '100%', height: 150, resize: 'none'}}
                                    placeholder="메모를 작성하세요..."/>
                                <Button variant="primary" onClick={handleSaveMemo}>메모 저장</Button>
                            </Row>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary">
                        읽고 싶은 책
                    </Button>
                    <Button variant="outline-dark">
                        다 읽은 책
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SecondBookCase;
