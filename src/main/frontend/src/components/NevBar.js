import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Login from "./Login";

function OffcanvasExample() {
    return (
        <>
            {[false].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
                    <Container fluid>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Brand href="/">LIPY</Navbar.Brand>
                        <Login/>

                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>MENU</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav.Link href={"/Bookcase"}> MY Bookcase </Nav.Link>
                                <Nav.Link href={"/Community"}> Community </Nav.Link>
                                <Nav.Link href={"/Socialing"}> Socialing </Nav.Link>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    );
}

export default OffcanvasExample;