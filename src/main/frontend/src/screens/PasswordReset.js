import React, { useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('비밀번호를 찾고자하는 이메일을 입력해주세요.');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isCodeVerified, setIsCodeVerified] = useState(false);

    const navigate = useNavigate();

    const requestPasswordReset = async () => {
        try {
            const response = await axios.post('http://localhost:8080/find/password/request', { email });
            setMessage('이메일로 인증 코드가 발송되었습니다.');
            setIsCodeSent(true);
        } catch (error) {
            setMessage('이메일을 다시 확인하세요.');
        }
    };

    const verifyResetCode = async () => {
        try {
            const response = await axios.post('http://localhost:8080/find/password/verify', { email, code });
            setMessage('변경할 비밀번호를 입력하세요.');
            setIsCodeVerified(true);
        } catch (error) {
            setMessage('인증 코드를 다시 확인하세요.');
        }
    };

    const resetPassword = async () => {
        try {
            const response = await axios.post('http://localhost:8080/password/reset', {
                email,
                newPassword
            });
            if (window.confirm("비밀번호가 변경되었습니다.")) {
                navigate('/login');
            }
        } catch (error) {
            setMessage('');
        }
    };

    return (
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
                                    height:500
                                }}></div>
                                <div className="col-lg-6">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <Link style={{
                                                textDecorationLine: "none"
                                            }} to="/">
                                                <h1 className="h4 text-gray-900 mb-4">LIPY</h1>
                                            </Link>
                                            <div
                                                style={{
                                                    marginTop: 100,
                                                    marginBottom: 20
                                                }}>
                                                {message && <p className="text-center mt-3">{message}</p>}
                                            </div>
                                        </div>

                                        {!isCodeSent && (
                                            <form className="user" onSubmit={(e) => {
                                                e.preventDefault();
                                                requestPasswordReset();
                                            }}
                                            >
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-user"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="이메일"
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    인증 코드 전송
                                                </button>
                                            </form>
                                        )}

                                        {isCodeSent && !isCodeVerified && (
                                            <form className="user" onSubmit={(e) => {
                                                e.preventDefault();
                                                verifyResetCode();
                                            }}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-user"
                                                        value={code}
                                                        onChange={(e) => setCode(e.target.value)}
                                                        placeholder="인증 코드"
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    인증 코드 확인
                                                </button>
                                            </form>
                                        )}

                                        {isCodeVerified && (
                                            <form className="user" onSubmit={(e) => {
                                                e.preventDefault();
                                                resetPassword();
                                            }}>
                                                <div className="form-group">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        placeholder="새 비밀번호"
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block">
                                                    비밀번호 재설정
                                                </button>
                                            </form>
                                        )}


                                        <hr/>
                                        <div className="text-center">
                                            <a className="small" href="signup2">회원가입</a>
                                            <a> | </a>
                                            <a className="small" href="Login">로그인</a>
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

export default PasswordReset;
