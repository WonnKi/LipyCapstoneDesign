import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManagerMemo.css';

const ManagerMemo = ({ memberId }) => {
    const [memoContent, setMemoContent] = useState('');
    const [currentMemo, setCurrentMemo] = useState('');
    const [message, setMessage] = useState('');

    // 메모 조회 함수
    const handleViewMemo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/manager/memo/view/${memberId}`);
            setCurrentMemo(response.data);
            setMessage("메모를 성공적으로 가져왔습니다.");
        } catch (error) {
            setMessage("메모 조회에 실패했습니다.");
            console.error(error);
        }
    };

    // 메모 작성 함수
    const handleWriteMemo = async () => {
        try {
            await axios.post(`http://localhost:8080/manager/memo/write/${memberId}`, memoContent, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            setMessage("메모가 성공적으로 작성되었습니다.");
            setMemoContent('');
            handleViewMemo(); // 메모 작성 후 최신 메모를 다시 가져옵니다.
        } catch (error) {
            setMessage("메모 작성에 실패했습니다.");
            console.error(error);
        }
    };

    // 컴포넌트가 처음 렌더링될 때 최신 메모를 가져옵니다.
    useEffect(() => {
        handleViewMemo();
    }, [memberId]); // memberId가 변경될 때마다 메모를 조회합니다.

    return (
        <div className="memo-container">
            <h3 className="memo-title">관리자 메모</h3>
            <textarea
                className="memo-input"
                rows="5"
                placeholder="메모 작성"
                value={memoContent}
                onChange={(e) => setMemoContent(e.target.value)}
            />
            <button className="memo-button" onClick={handleWriteMemo}>메모 작성</button>
            {message && <p className="memo-message">{message}</p>}
            <div className="current-memo">
                <h4>현재 메모:</h4>
                <p>{currentMemo || "메모가 없습니다."}</p>
            </div>
        </div>
    );
};

export default ManagerMemo;
