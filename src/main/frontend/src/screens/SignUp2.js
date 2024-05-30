import React, {useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';


const SignUp2 = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/register', formData);
            setMessage('회원가입 성공!');
        } catch (error) {
            setMessage('회원가입 실패: ' + error.response.data);
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
                                        <input type="email" className="form-control form-control-user" name="email"
                                               placeholder="이메일" value={formData.email} onChange={handleChange} required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text"  className="form-control form-control-user" name="username"
                                               placeholder="아이디" value={formData.username} onChange={handleChange} required/>

                                    </div>
                                    <div className="form-group">
                                    <input type="password" className="form-control form-control-user" name="password"
                                           placeholder="비밀번호" value={formData.password} onChange={handleChange} required />

                                    </div>
                                    <button type="submit" className="btn btn-primary btn-user btn-block">
                                        계정 등록
                                    </button>
                                    {message && <p>{message}</p>}
                                </form>
                                <hr/>
                                <div className="text-center">
                                <a className="small" href="login">이미 계정이 있으신가요?</a>
                                </div>
                                <div>
                                    <a href="https://www.freepik.com/free-vector/hand-drawn-flat-design-poetry-illustration_23252610.htm#fromView=search&page=2&position=3&uuid=785c4f8e-4b31-4c52-851f-860ecc552c56">Image
                                        by freepik</a>
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
