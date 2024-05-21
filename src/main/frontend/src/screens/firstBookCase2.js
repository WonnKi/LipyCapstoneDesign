// import React, { useState } from "react";
// import Tab from "../components/BC/Tab";
// import Case from "./Case";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import CaseModal from "../components/BC/CaseModal";
// import Button from "react-bootstrap/Button";
//
// const FirstBookCase = () => {
//     const [books, setBooks] = useState(Array(12).fill(null));
//     const [showModal, setShowModal] = useState(false);
//     const [targetCol, setTargetCol] = useState(null);
//
//     const handleShowModal = (col) => {
//         setShowModal(true);
//         setTargetCol(col);
//     };
//
//     const handleCloseModal = () => {
//         setShowModal(false);
//         setTargetCol(null);
//     };
//
//     const handleSelectBook = (book) => {
//         if (targetCol !== null) {
//             setBooks((prevBooks) => {
//                 const updatedBooks = [...prevBooks];
//                 updatedBooks[targetCol] = book;
//                 return updatedBooks;
//             });
//         }
//         handleCloseModal();
//     };
//
//     const handleDeleteBook = (index) => {
//         setBooks((prevBooks) => {
//             const updatedBooks = [...prevBooks];
//             updatedBooks[index] = null;
//             return updatedBooks;
//         });
//     };
//
//     return (
//         <div>
//             <Tab />
//             <Container style={{ background: "#E0B88A" }}>
//                 <Row>
//                     {books.slice(0, 6).map((book, index) => (
//                         <Col key={index} className="ColBC">
//                             {book && <Case book={book} />}
//                             {book && (
//                                 <Button
//                                     variant="danger"
//                                     onClick={() => handleDeleteBook(index)}
//                                     style={{
//                                         position: "absolute",
//                                         top: "10px",
//                                         right: "10px",
//                                     }}
//                                 >
//                                     X
//                                 </Button>
//                             )}
//                             <Button
//                                 variant="primary"
//                                 onClick={() => handleShowModal(index)}
//                                 style={{
//                                     position: "absolute",
//                                     top: "50%",
//                                     left: "50%",
//                                     transform: "translate(-50%, -50%)",
//                                     display: book ? "none" : "block",
//                                 }}
//                             >
//                                 +
//                             </Button>
//                         </Col>
//                     ))}
//                 </Row>
//
//                 <Row>
//                     {books.slice(6, 12).map((book, index) => (
//                         <Col key={index + 6} className="ColBC">
//                             {book && <Case book={book} />}
//                             {book && (
//                                 <Button
//                                     variant="danger"
//                                     onClick={() => handleDeleteBook(index + 6)}
//                                     style={{
//                                         position: "absolute",
//                                         top: "10px",
//                                         right: "10px",
//                                     }}
//                                 >
//                                    x
//                                 </Button>
//                             )}
//                             <Button
//                                 variant="primary"
//                                 onClick={() => handleShowModal(index + 6)}
//                                 style={{
//                                     position: "absolute",
//                                     top: "50%",
//                                     left: "50%",
//                                     transform: "translate(-50%, -50%)",
//                                     display: book ? "none" : "block",
//                                 }}
//                             >
//                                 +
//                             </Button>
//                         </Col>
//                     ))}
//                 </Row>
//
//                 <CaseModal
//                     show={showModal}
//                     onHide={handleCloseModal}
//                     onSelectBook={handleSelectBook}
//                 />
//             </Container>
//         </div>
//     );
// };
//
// export default FirstBookCase;
