import React, { useState } from 'react';
import axios from 'axios';

const CreateSocialingPost = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        writer: '',
        content: '',
        currentparticipants: 0,
        maxparticipants: 0,
        date: new Date().toISOString().slice(0, 10) // 현재 날짜를 ISO 형식으로 설정
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/socialing/post', formData);
            console.log('게시글이 성공적으로 생성되었습니다:', response.data);
            // 게시글 생성 후 어떤 동작을 취할지 여기에 추가
        } catch (error) {
            console.error('게시글 생성 중 에러 발생:', error);
        }
    };

    return (
        <div>
            <h2>게시글 생성</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div>
                    <label>Writer:</label>
                    <input type="text" name="writer" value={formData.writer} onChange={handleChange} />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} />
                </div>
                <div>
                    <label>Current Participants:</label>
                    <input type="number" name="currentparticipants" value={formData.currentparticipants} onChange={handleChange} />
                </div>
                <div>
                    <label>Max Participants:</label>
                    <input type="number" name="maxparticipants" value={formData.maxparticipants} onChange={handleChange} />
                </div>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <button type="submit">게시글 생성</button>
            </form>
        </div>
    );
};

export default CreateSocialingPost;