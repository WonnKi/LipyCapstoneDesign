import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignUp2 = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nickname: '',
        email: '',
        gender: '',
        phonenumber: '',
        age: '',
    });
    const [inputCode, setInputCode] = useState('');
    const [message, setMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [nicknameMessage, setNicknameMessage] = useState('');
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckEmail = async () => {
        try {
            const response = await axios.get('http://localhost:8080/check-email', {
                params: { email: formData.email }
            });

            if (response.status === 200) {
                setEmailMessage('사용 가능한 이메일입니다.');
                setIsEmailChecked(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setEmailMessage('이미 사용 중인 이메일입니다.');
                setIsEmailChecked(false);
            } else {
                setEmailMessage('이메일 확인 실패');
            }
        }
    };

    const handleCheckNickname = async () => {
        try {
            const response = await axios.get('http://localhost:8080/check-nickname', {
                params: { nickname: formData.nickname }
            });

            if (response.status === 200) {
                setNicknameMessage('사용 가능한 닉네임입니다.');
                setIsNicknameChecked(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setNicknameMessage('이미 사용 중인 닉네임입니다.');
                setIsNicknameChecked(false);
            } else {
                setNicknameMessage('닉네임 확인 실패');
            }
        }
    };

    const handleSendVerificationCode = async () => {
        try {
            await axios.post('http://localhost:8080/send', { email: formData.email });
            setMessage('인증코드가 전송되었습니다.');
            setIsVerificationSent(true);
        } catch (error) {
            setMessage('인증코드 전송 실패');
        }
    };

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:8080/verify', {
                email: formData.email,
                code: inputCode
            });
            setMessage('이메일 인증이 완료되었습니다.');
            setIsVerified(true);
        } catch (error) {
            setMessage('이메일 인증 번호를 다시 확인하세요.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isVerified) {
            window.alert('이메일 인증을 완료하세요.');
            return;
        }

        if (!isNicknameChecked) {
            window.alert('닉네임 중복 확인을 해주세요.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (window.confirm("회원가입 성공.")) {
                navigate('/login');
            }
        } catch (error) {
            window.alert("회원가입 실패: 중복된 이메일 또는 닉네임");
        }
    };

    const isFormValid = formData.username && formData.password && formData.nickname &&
        formData.email && formData.gender && formData.phonenumber && formData.age &&
        isVerified && isNicknameChecked;

    return (
        <div
            style={{
                marginTop:"120px"
            }}>
            <Container>
                <div className="d-flex justify-content-center my-5">
                    <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                    <div className="card o-hidden border-0 shadow-lg" style={{ width: '600px' }}>
                        <div className="card-body p-0">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">회원가입</h1>
                                </div>
                                <form className="user" onSubmit={handleSubmit}>
                                    <div className="form-group d-flex">
                                        <input
                                            type="text"
                                            className="form-control me-2"
                                            name="nickname"
                                            placeholder="닉네임"
                                            value={formData.nickname}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button type="button" onClick={handleCheckNickname}
                                                className="btn btn-primary"
                                                style={{width: 150}}>
                                            닉네임 확인
                                        </button>
                                    </div>

                                    {nicknameMessage && <p className="text-success mt-1">{nicknameMessage}</p>}

                                    <div className="form-group d-flex">
                                        <input
                                            type="email"
                                            className="form-control me-2"
                                            name="email"
                                            placeholder="이메일"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button type="button" onClick={handleCheckEmail}
                                                className="btn btn-primary"
                                                style={{width: 150}}>
                                            이메일 확인
                                        </button>
                                    </div>

                                    <div>
                                        {emailMessage && <p className="text-success mt-1">{emailMessage}</p>}

                                        {isEmailChecked && !isVerificationSent && (
                                            <button type="button" onClick={handleSendVerificationCode}
                                                    className="btn btn-secondary"
                                                    style={{
                                                        marginBottom: 8
                                                    }}>
                                                인증코드 보내기
                                            </button>
                                        )}

                                        {isVerificationSent && !isVerified && (
                                            <div>
                                                <div className="form-group d-flex mt-2">
                                                    <input
                                                        type="text"
                                                        className="form-control me-2"
                                                        placeholder="인증 코드 입력"
                                                        value={inputCode}
                                                        onChange={(e) => setInputCode(e.target.value)}
                                                    />
                                                    <button type="button" onClick={handleVerifyCode}
                                                            className="btn btn-primary"
                                                            style={{width: 70}}>인증
                                                    </button>
                                                </div>
                                                {message && <p className="text-success mt-1">{message}</p>}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <input type="text" className="form-control" name="username"
                                               placeholder="이름" value={formData.username} onChange={handleChange}
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password"
                                               placeholder="비밀번호" value={formData.password} onChange={handleChange}
                                               required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="phonenumber"
                                               placeholder="전화번호" value={formData.phonenumber}
                                               onChange={handleChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control" name="gender"
                                                value={formData.gender} onChange={handleChange} required>
                                            <option value="">성별 선택</option>
                                            <option value="남">남성</option>
                                            <option value="여">여성</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input type="number" className="form-control" name="age"
                                               placeholder="나이" value={formData.age} onChange={handleChange}
                                               required/>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-user btn-block"
                                            disabled={!isFormValid}>
                                        계정 등록
                                    </button>
                                </form>
                                <hr/>
                                <div className="text-center">
                                <a className="small" href="Login">로그인</a>
                                    <a> | </a>
                                    <a className="small" href="PasswordReset">비밀번호 찾기</a>
                                </div>
                                {message && <p className="text-center mt-2">{message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SignUp2;