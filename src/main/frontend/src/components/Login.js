import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Login() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSignUp = () => {
        handleClose();
        navigate('/SignUp');
    };

    // --------

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {
                username,
                password,
            });
            const token = response.data.split(' ')[2]; // "login succeed <token>"에서 토큰만 추출
            localStorage.setItem('jwtToken', token);
            setMessage('로그인 완료');
        } catch (error) {
            setMessage('아이디 또는 비밀번호를 확인하세요');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken'); // JWT 토큰 삭제
    };


    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                로그인
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form onSubmit={handleLogin}>
                            <div>
                                <label>Username:</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit">Login</button>
                            <button onClick={handleLogout}>Logout</button>
                        </form>
                        {message && <p>{message}</p>}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="link" onClick={handleSignUp} className="w-100">
                        회원가입
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Login;

