import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Write() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [maxParticipants, setMaxParticipants] = useState(0);
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 기능을 활용합니다.

    const handleCreatePost = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await axios.post(
                'http://localhost:8080/socialing/post',
                {
                    title,
                    description,
                    content,
                    maxparticipants: maxParticipants,
                    date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const postId = response.data.id; // 작성된 글의 ID를 얻습니다.
            navigate(`/socialing/${postId}`); // 작성된 글의 상세 페이지로 이동합니다.
        } catch (error) {
            setMessage('Post creation failed: ' + error.response.data);
        }
    };

    return (
        <section className="page-section cta">
            <div>
                <h2>글쓰기</h2>
                <form onSubmit={handleCreatePost}>
                    <div>
                        <label>제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>설명</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>최대 참가 인원</label>
                        <input
                            type="number"
                            value={maxParticipants}
                            onChange={(e) => setMaxParticipants(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>일시</label>
                        <input
                            type="datetime-local"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <button type="submit">작성하기</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </section>
    );
}

export default Write;
