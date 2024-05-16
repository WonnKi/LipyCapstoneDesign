import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

const EditSocialing = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        writer: '',
        currentparticipants: 0,
        maxparticipants: 0,
        date: new Date().toISOString()
    });

    useEffect(() => {
        const fetchSocialingDetails = async () => {
            try {
                const response = await axios.get(`/socialing/${id}`);
                const { title, description, writer, currentparticipants, maxparticipants, date } = response.data;
                setFormData({ title, description, writer, currentparticipants, maxparticipants, date });
            } catch (error) {
                console.error('게시글을 불러오는 중 에러 발생:', error);
            }
        };

        fetchSocialingDetails();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/socialing/${id}`, formData);
            navigate(`/socialing/${id}`);
        } catch (error) {
            console.error('게시글을 수정하는 중 에러 발생:', error);
        }
    };

    return (
        <div>
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
                        <label>최대 참여자 수</label>
                        <input type="number" name="maxparticipants" value={formData.maxparticipants}
                               onChange={handleChange}/>
                    </div>
                    <div>
                        <label>날짜</label>
                        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange}/>
                    </div>
                    <button type="submit">수정 완료</button>
                </form>
            </section>
        </div>
    );
};

export default EditSocialing;