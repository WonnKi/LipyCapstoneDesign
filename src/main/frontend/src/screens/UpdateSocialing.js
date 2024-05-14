import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from 'axios';

const EditSocialing = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        writer: '',
        currentparticipants: 0,
        maxparticipants: 0,
        date: new Date().toISOString() // 현재 날짜와 시간을 ISO 형식으로 초기값으로 설정
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
            navigate(`/socialing/${id}`); // 수정 완료 후 해당 게시글 페이지로 이동
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
                        <label>내용</label>
                        <textarea name="description" value={formData.description} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>작성자</label>
                        <input type="text" name="writer" value={formData.writer} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>최대 참여자 수</label>
                        <input type="number" name="maxparticipants" value={formData.maxparticipants}
                               onChange={handleChange}/>
                    </div>
                    <button type="submit">수정 완료</button>
                </form>
            </section>
        </div>
    );
};

export default EditSocialing;