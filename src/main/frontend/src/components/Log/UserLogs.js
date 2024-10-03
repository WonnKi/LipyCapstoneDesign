import React, { useState, useEffect } from 'react';
import { getUserLogs } from './logService'; // API 함수 import

const UserLogs = ({ userId }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await getUserLogs(userId); // userId로 API 호출
                setLogs(data);
            } catch (err) {
                setError('Failed to fetch user logs');
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, [userId]); // userId가 변경될 때마다 로그를 다시 불러옴

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            {logs.length > 0 ? (
                <table className="table text-start align-middle table-bordered table-hover mb-0">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>행동</th>
                        <th>상세</th>
                        <th>시간</th>
                        <th>IP Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.map((log) => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.action}</td>
                            <td>{log.details}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                            <td>{log.ipAddress || 'N/A'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>로그가 없습니다</p>
            )}
        </div>
    );
};

export default UserLogs;
