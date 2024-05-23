// import React, { useState } from 'react';
// import axios from 'axios';
//
// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//
//     const handleLogin = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/login', {
//                 username,
//                 password,
//             });
//             const token = response.data.split(' ')[2]; // "login succeed <token>"에서 토큰만 추출
//             localStorage.setItem('jwtToken', token);
//             setMessage('Login successful');
//         } catch (error) {
//             setMessage('Login failed: ' + error.response.data);
//         }
//     };
//
//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Username:</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };
//
// export default Login;