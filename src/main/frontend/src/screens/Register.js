import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [inputCode, setInputCode] = useState('');
    const [message, setMessage] = useState('');
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleRegister = async (event) => {
        event.preventDefault();
        if (!isVerified) {
            setMessage('Please verify your email first.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/register', {
                username,
                password,
                name,
                email,
            });
            setMessage('Registration successful. You can now log in.');
        } catch (error) {
            setMessage('Registration failed: ' + error.response.data);
        }
    };

    const handleSendVerificationCode = async () => {
        try {
            const response = await axios.post('http://localhost:8080/send', { email });
            setMessage('Verification code sent. Please check your email.');
            setIsVerificationSent(true);
        } catch (error) {
            setMessage('Failed to send verification code: ' + error.response.data);
        }
    };

    const handleVerifyCode = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/verify', null, {
                params: {
                    email,
                    code: inputCode,
                },
            });
            setMessage('Email verification successful. You can now complete your registration.');
            setIsVerified(true);
        } catch (error) {
            setMessage('Email verification failed: ' + error.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="button" onClick={handleSendVerificationCode}>Send Verification Code</button>
                </div>
                {isVerificationSent && !isVerified && (
                    <div>
                        <label>Verification Code</label>
                        <input
                            type="text"
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                        />
                        <button type="button" onClick={handleVerifyCode}>Verify Code</button>
                    </div>
                )}
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Register;
