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
//     const [selectedBook, setSelectedBook] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//
//     const handleShowModal = () => setShowModal(true);
//     const handleCloseModal = () => setShowModal(false);
//     const handleSelectBook = (book) => {
//         setSelectedBook(book);
//         handleCloseModal();
//     };
//
//     return (
//         <div>
//             <Tab />
//             <Container style={{ background: "#E0B88A" }}>
//                 <Row>
//                     <Col className="ColBC" style={{ position: "relative" }}>
//                         <Case book={selectedBook} />
//                         <Button
//                             variant="primary"
//                             onClick={handleShowModal}
//                             style={{
//                                 position: "absolute",
//                                 top: "50%",
//                                 left: "50%",
//                                 transform: "translate(-50%, -50%)",
//                             }}
//                         >
//                             +
//                         </Button>
//                     </Col>
//                     <Col className="ColBC"></Col>
//                     <Col className="ColBC"></Col>
//                     <Col className="ColBC"></Col>
//                     <Col className="ColBC"></Col>
//                     <Col className="ColBC"></Col>
//                 </Row>
//
//                 <Row>
//                     <Col className="ColBC"></Col>
//                     <Col className="ColBC"></Col>
//                     <Col className="ColBC"></Col>
//                     <Col className="ColBC"></Col>
//                     <Col className="ColBC"></Col>
//                     <Col className="ColBC"></Col>
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
