import React, { useEffect, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import PasswordReset from "./PasswordReset";

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {
                email,
                password,
            });


            const token = response.data.split(' ')[2]; // 서버에서 받은 JWT 토큰 추출
            const decodedToken = jwtDecode(token);  // JWT 토큰 디코딩
            const role = decodedToken.role;
            const id = decodedToken.id;      // 사용자 ID 추출

            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userRole', role);  // 역할 저장
            localStorage.setItem('userId', id);      // 사용자 ID 저장

            if (role === "ADMIN") {
                if (window.confirm("관리자로 로그인 되었습니다.")) {
                    navigate('/AdminPage'); // 관리자라면 AdminPage로 이동
                }
            } else {
                if (window.confirm("로그인 성공.")) {
                    navigate('/Home'); // 관리자가 아니면 Home으로 이동
                }
            }

        } catch (error) {
            window.alert("로그인 실패: 이메일 또는 비밀번호를 확인하세요.");
        }
    };

    return (
        <div
        style={{
            marginTop:"100px"
        }}>
            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5"
                        style={{
                            height:500
                        }}>
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"
                                         style={{
                                             height: 500
                                         }}></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <Link style={{
                                                    textDecorationLine: "none"
                                                }} to="/">
                                                    <h1 className="h4 text-gray-900 mb-4">LIPY</h1>
                                                </Link>

                                            </div>

                                            <form className="user" onSubmit={handleLogin}
                                            style={{
                                                marginTop:60
                                            }}>
                                                <div className="form-group">
                                                    <input type="text" className="form-control form-control-user"
                                                           id="exampleInputEmail" aria-describedby="emailHelp"
                                                           value={email}
                                                           onChange={(e) => setEmail(e.target.value)}
                                                           placeholder="이메일"/>
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

                                                <hr/>
                                            </form>
                                            {/*<div className="text-center">회원이 아니신가요?</div>*/}
                                            {/*<div className="text-center">*/}
                                            {/*    <a className="small" href="signup2">회원가입 하기</a>*/}
                                            {/*</div>*/}
                                            {/*<div className="text-center">비밀번호를 잊으셨나요?</div>*/}
                                            {/*<div className="text-center">*/}
                                            {/*    <a className="small" href="signup2">비밀번호 찾기</a>*/}
                                            {/*</div>*/}

                                            <div className="text-center">
                                                <a className="small" href="signup2">회원가입</a>
                                                <a> | </a>
                                                <a className="small" href="PasswordReset">비밀번호 찾기</a>
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
