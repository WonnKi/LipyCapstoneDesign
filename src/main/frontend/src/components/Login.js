import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Login() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSignUp = () => {
        handleClose();
        navigate('/SignUp');
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                로그인
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control type="email" placeholder="email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100 mt-3">
                            로그인
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" onClick={handleSignUp} className="w-100">
                        회원가입
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login;
