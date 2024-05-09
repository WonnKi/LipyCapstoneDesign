import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';




function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                로그인
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
                </Modal.Header>
                <Modal.Body closeButton>
                    <Form>

                        <input type="email" placeholder="Email" /><br/>
                        <input type="password" placeholder="Password"/><br/>
                        <input type="submit" value="로그인"/>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Example;