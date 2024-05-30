import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const Login = () => {

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
            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">로그인</h1>
                                            </div>
                                            <form className="user" onSubmit={handleLogin}>
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-user"
                                                           id="exampleInputEmail" aria-describedby="emailHelp"
                                                           value={username}
                                                           onChange={(e) => setUsername(e.target.value)}
                                                           placeholder="아이디"/>
                                                </div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user"
                                                           id="exampleInputPassword"
                                                           value={password}
                                                           onChange={(e) => setPassword(e.target.value)}
                                                           placeholder="비밀번호"/>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    로그인
                                                </button>
                                                {message && <p>{message}</p>}
                                                <hr/>
                                            </form>
                                            <div className="text-center">회원이 아니신가요?</div>
                                            <br/>
                                            <div className="text-center">
                                                <a className="small" href="signup2">회원가입 하러 가기</a>
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

export default Login;
