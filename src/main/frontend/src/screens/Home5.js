// import React, { useState } from "react";
// import {Link, useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
//
// const PasswordReset = () => {
//     const [email, setEmail] = useState('');
//     const [code, setCode] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const [isCodeSent, setIsCodeSent] = useState(false);
//     const [isCodeVerified, setIsCodeVerified] = useState(false);
//
//     // 비밀번호 재설정 요청 (인증 코드 이메일 전송)
//     const requestPasswordReset = async () => {
//         try {
//             const response = await axios.post('http://localhost:8080/find/password/request', { email });
//             setMessage(response.data);
//             setIsCodeSent(true);
//         } catch (error) {
//             setMessage('Error: ' + (error.response?.data || error.message));
//         }
//     };
//
//     // 인증 코드 확인
//     const verifyResetCode = async () => {
//         try {
//             const response = await axios.post('http://localhost:8080/find/password/verify', { email, code });
//             setMessage(response.data);
//             setIsCodeVerified(true);
//         } catch (error) {
//             setMessage('Error: ' + (error.response?.data || error.message));
//         }
//     };
//
//     // 비밀번호 재설정
//     const resetPassword = async () => {
//         try {
//             const response = await axios.post('http://localhost:8080/password/reset', {
//                 email,
//                 newPassword
//             });
//             setMessage(response.data);
//         } catch (error) {
//             setMessage('Error: ' + (error.response?.data || error.message));
//         }
//     };
//
//
//     return (
//         <div>
//             <div className="container">
//
//                 <div className="row justify-content-center">
//                     <div className="col-xl-10 col-lg-12 col-md-9">
//                         <div className="card o-hidden border-0 shadow-lg my-5">
//                             <div className="card-body p-0">
//                                 <div className="row">
//                                     <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
//                                     <div className="col-lg-6">
//                                         <div className="p-5">
//                                             <div className="text-center">
//                                                 <Link style={{
//                                                     textDecorationLine:"none"
//                                                 }} to="/">
//                                                     <h4 className="text-gray-900 mb-4">LIPY</h4>
//                                                 </Link>
//
//                                             </div>
//                                             <form className="user">
//                                                 <div className="text-center"><br/>비밀번호를 찾고자하는 이메일을 입력해주세요<br/><br/></div>
//                                                 {!isCodeSent && (
//                                                     <div>
//                                                         <div className="form-group">
//                                                             <input
//                                                                 className="form-control form-control-user"
//                                                                 type="email"
//                                                                 placeholder="이메일"
//                                                                 value={email}
//                                                                 onChange={(e) => setEmail(e.target.value)}
//                                                             />
//                                                         </div>
//                                                         <button
//                                                             className="btn btn-primary btn-user btn-block"
//                                                             onClick={requestPasswordReset}>이메일 발송
//                                                         </button>
//                                                     </div>
//
//                                                 )}
//
//                                                 {isCodeSent && !isCodeVerified && (
//                                                     <div>
//                                                         <input
//                                                             type="text"
//                                                             placeholder="Enter the verification code"
//                                                             value={code}
//                                                             onChange={(e) => setCode(e.target.value)}
//                                                         />
//                                                         <button onClick={verifyResetCode}>Verify Code</button>
//                                                     </div>
//                                                 )}
//
//                                                 {isCodeVerified && (
//                                                     <div>
//                                                         <input
//                                                             type="password"
//                                                             placeholder="Enter your new password"
//                                                             value={newPassword}
//                                                             onChange={(e) => setNewPassword(e.target.value)}
//                                                         />
//                                                         <button onClick={resetPassword}>Reset Password</button>
//                                                     </div>
//                                                 )}
//
//                                                 {message && <p>{message}</p>}
//
//
//                                                 <hr/>
//                                             </form>
//                                             <div className="text-center">회원이 아니신가요?</div>
//                                             <br/>
//                                             <div className="text-center">
//                                                 <a className="small" href="signup2">회원가입 하러 가기</a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//
//                     </div>
//
//                 </div>
//
//             </div>
//
//         </div>
//     );
// };
//
// export default PasswordReset;
