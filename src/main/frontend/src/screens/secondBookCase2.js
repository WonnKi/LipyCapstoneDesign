import React, { useState } from "react";
import CaseModal from "../components/BC/CaseModal";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const SecondBookCase2 = () => {
    const [readingBooks, setReadingBooks] = useState([]);

    const addBookToReadingList = (bookImage, bookAuthor, bookTitle, bookPublisher, startDate) => {
        setReadingBooks([...readingBooks, { image: bookImage, author: bookAuthor, title: bookTitle, publisher: bookPublisher, status: "읽는 중", startDate: startDate }]);
    };

    const handleStatusChange = (index, newStatus) => {
        const updatedBooks = [...readingBooks];
        updatedBooks[index].status = newStatus;
        setReadingBooks(updatedBooks);
    };

    return (
        <div>
            <Container>
                <Table bordered hover>
                    <thead>
                    <tr>
                        <th style={{width: '40%'}}>제목</th>
                        <th style={{width: '15%'}}>작가</th>
                        <th style={{width: '15%'}}>출판사</th>
                        <th style={{width: '15%'}}>상태</th>
                        <th style={{width: '15%'}}>독서 시작일</th>
                    </tr>
                    </thead>
                    <tbody>
                    {readingBooks.map((book, index) => (
                        <tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>
                                <DropdownButton title={book.status} onSelect={(eventKey) => handleStatusChange(index, eventKey)}>
                                    <Dropdown.Item eventKey="읽는 중">읽는 중</Dropdown.Item>
                                    <Dropdown.Item eventKey="완독">완독</Dropdown.Item>
                                    <Dropdown.Item eventKey="독서 예정">독서 예정</Dropdown.Item>
                                </DropdownButton>
                            </td>
                            <td>{book.startDate}</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="5" style={{textAlign: 'center'}}>
                            <CaseModal type="reading" onAddToSecondBookCase={addBookToReadingList} />
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default SecondBookCase2;
