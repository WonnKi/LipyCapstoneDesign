import React, { useState } from 'react';
import axios from 'axios';

function Write() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        writer: '',
        currentparticipants: 0,
        maxparticipants: 0,
        date: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/socialing/posts', formData);
            console.log(response.data);
            // 작업이 성공적으로 완료되었을 때 사용자에게 알림 등을 표시할 수 있습니다.
        } catch (error) {
            console.error(error);
            // 에러가 발생했을 때 사용자에게 알림 등을 표시할 수 있습니다.
        }
    };

    return (
        <section className="page-section cta">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange}/>
                </div>
                <div>
                    <label>설명</label>
                    <textarea name="description" value={formData.description} onChange={handleChange}/>
                </div>
                <div>
                    <label>글 내용</label>
                    <textarea name="content" value={formData.content} onChange={handleChange}/>
                </div>
                <div>
                    <label>작성자</label>
                    <input type="text" name="writer" value={formData.writer} onChange={handleChange}/>
                </div>
                <div>
                    <label>참여자 수</label>
                    <input type="number" name="currentparticipants" value={formData.currentparticipants}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>최대 참여자 수</label>
                    <input type="number" name="maxparticipants" value={formData.maxparticipants}
                           onChange={handleChange}/>
                </div>
                <div>
                    <label>날짜</label>
                    <input type="datetime-local" name="date" value={formData.date} onChange={handleChange}/>
                </div>
                <button type="submit">작성하기</button>
            </form>
        </section>
    );
}

export default Write;