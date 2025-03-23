import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookDetails = ({ isbn }) => {
    const [userStatusList, setUserStatusList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/book/${isbn}/users`);
                setUserStatusList(response.data);
            } catch (err) {
                setError('Failed to fetch data. Please try again.');
            }
        };
        fetchUserStatus();
    }, [isbn]);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table className="table text-start align-middle table-bordered table-hover mb-0">
                <thead>
                <tr>
                    <th>이름</th>
                    <th>이메일</th>
                    <th>닉네임</th>
                    <th>상태</th>
                </tr>
                </thead>
                <tbody>
                {userStatusList.map((user, index) => (
                    <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.nickname}</td>
                        <td>{user.email}</td>
                        <td>{user.bookStatus === 'WISH' ? '예정' :
                            user.bookStatus === 'READING' ? '독서중' :
                                user.bookStatus === 'DONE' ? '완독' :
                                    user.bookStatus}</td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookDetails;