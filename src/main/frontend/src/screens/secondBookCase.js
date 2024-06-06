import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import CaseModal from "../components/BC/CaseModal";
import Table from "react-bootstrap/Table";

const SecondBookCase = () => {
    const [readingBooks, setReadingBooks] = useState([]);
    const addBookToReadingList = (bookImage, bookAuthor, bookTitle, bookPublisher, startDate) => {
        setReadingBooks([...readingBooks, {
            image: bookImage,
            author: bookAuthor,
            title: bookTitle,
            publisher: bookPublisher,
            status: "읽는 중",
            startDate: startDate }]);
    };
    const handleStatusChange = (index, newStatus) => {
        const updatedBooks = [...readingBooks];
        updatedBooks[index].status = newStatus;
        setReadingBooks(updatedBooks);
    };
    return (
        <div>
            <div id="wrapper">
                <div className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center">
                        <div className="sidebar-brand-text mx-3">LIPY</div>
                    </a>
                    <hr className="sidebar-divider my-0"/>
                    <li className="nav-item active">
                        <a className="nav-link" href="/">
                            <span>홈</span></a>
                    </li>
                    <hr/>
                    <div className="nav-item">
                        <Link className="nav-link" to="/mypage2">
                            마이 페이지
                        </Link>
                    </div>
                    <div className="nav-item">
                        <Link className="nav-link" to="/socialing2">
                            소셜링 페이지
                        </Link>
                    </div>
                    <hr/>
                    <Link className="btn btn-user btn-block" to="/Login">
                        로그인
                    </Link>
                    <Link className="btn btn-user btn-block" to="/signup2">
                        <a className="small" href="signup2">회원이 아니신가요?</a>
                    </Link>
                </div>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">독서 기록</h6>
                                            <CaseModal type="reading"
                                                       onAddToSecondBookCase={addBookToReadingList}/>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
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
                                                                <DropdownButton title={book.status}
                                                                                onSelect={(eventKey) => handleStatusChange(index, eventKey)}>
                                                                    <Dropdown.Item eventKey="읽는 중">읽는 중</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="완독">완독</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="독서 예정">독서
                                                                        예정</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                            <td>{book.startDate}</td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecondBookCase;
