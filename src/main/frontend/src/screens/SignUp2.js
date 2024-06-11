import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const SignUp2 = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
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

    const handleVerifyCode = async () => {
        try {
            const response = await axios.post('http://localhost:8080/verify', null, {
                params: {
                    email: formData.email,
                    code: inputCode,
                },
            });
            setMessage('이메일 인증 성공');
            setIsVerified(true);
        } catch (error) {
            setMessage('인증 코드를 확인하세요' );
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isVerified) {
            setMessage('이메일을 확인하세요');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/register', formData);
            if (window.confirm("회원가입 성공.")) {
                navigate('/login');
            }
        } catch (error) {
            setMessage('Registration failed: ' + error.response?.data);
        }
    };




    return <div>
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
                                <form className="user" onSubmit={handleSubmit} >
                                    <div className="form-group">
                                        <input type="text" className="form-control form-control-user" name="name"
                                               placeholder="이름" value={formData.name} onChange={handleChange} required />
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
                                                className=" btn-primary">인증 코드 받기</button>
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
                                               placeholder="아이디" value={formData.username} onChange={handleChange}
                                               required/>

                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-user" name="password"
                                           placeholder="비밀번호" value={formData.password} onChange={handleChange} required />

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

};

export default SignUp2;
