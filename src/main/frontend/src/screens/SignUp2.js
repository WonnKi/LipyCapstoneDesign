import React, {useState} from "react";
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
    const [verificationCode, setVerificationCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [message, setMessage] = useState('');
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

    const handleSendVerificationCode = async () => {
        try {
            const response = await axios.post('http://localhost:8080/send', { email: formData.email });
            setMessage('인증코드가 전송되었습니다.');
            setIsVerificationSent(true);
        } catch (error) {
            setMessage('인증코드 전송 실패');
        }
    };

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/verify', {
                email: formData.email,
                code: inputCode
            });
            setMessage('Email verification successful. You can now complete your registration.');
            setIsVerified(true);
        } catch (error) {
            setMessage('Email verification failed: ' + error.response?.data || error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isVerified) {
            setMessage('이메일을 확인하세요');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (window.confirm("회원가입 성공.")) {
                navigate('/login');
            }
        } catch (error) {
            window.confirm("중복된 이메일");
        }
    };

    return (
        <div>
            <Container>
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        <div className="row">
                            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                            <div className="col-lg-7">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">회원가입</h1>
                                    </div>
                                    <form className="user" onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-user" name="nickname"
                                                   placeholder="닉네임" value={formData.nickname} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="email"
                                                className="form-control form-control-user"
                                                name="email"
                                                placeholder="이메일"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            <button type="button" onClick={handleSendVerificationCode}
                                                    className="btn btn-primary">인증 코드 받기</button>
                                        </div>

                                        {isVerificationSent && !isVerified && (
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-user"
                                                    placeholder="인증 코드 입력"
                                                    value={inputCode}
                                                    onChange={(e) => setInputCode(e.target.value)}
                                                />
                                                <button type="button" onClick={handleVerifyCode}>인증 확인</button>
                                                {message && <p>{message}</p>}
                                            </div>
                                        )}

                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-user" name="username"
                                                   placeholder="이름" value={formData.username} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-user" name="password"
                                                   placeholder="비밀번호" value={formData.password} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-user" name="phonenumber"
                                                   placeholder="전화번호" value={formData.phonenumber} onChange={handleChange} required />
                                        </div>
                                        <div className="form-group">
                                            <select className="form-control form-control-user" name="gender"
                                                    value={formData.gender} onChange={handleChange} required>
                                                <option value="">성별 선택</option>
                                                <option value="남">남성</option>
                                                <option value="여">여성</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <input type="number" className="form-control form-control-user" name="age"
                                                   placeholder="나이" value={formData.age} onChange={handleChange} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-user btn-block">
                                            계정 등록
                                        </button>
                                    </form>
                                    <hr/>
                                    <div className="text-center">
                                        <a className="small" href="login">이미 계정이 있으신가요?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SignUp2;
