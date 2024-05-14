import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from 'axios';

const SocialingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // useNavigate 훅 사용
    const [socialing, setSocialing] = useState(null);

    useEffect(() => {
        const fetchSocialingDetails = async () => {
            try {
                const response = await axios.get(`/socialing/${id}`);
                setSocialing(response.data);
            } catch (error) {
                console.error('게시글을 불러오는 중 에러 발생:', error);
            }
        };

        fetchSocialingDetails();
    }, [id]);

    const handleEditClick = () => {
        navigate(`/socialing/${id}/edit`); // 수정 페이지로 이동
    };

    const handleDeleteClick = () => {
        const isConfirmed = window.confirm('삭제 하시겠습니까?');
        if (isConfirmed) {
            axios.delete(`/socialing/${id}`)
                .then(() => {
                    navigate('/socialing'); // 삭제 후 목록 페이지로 이동
                })
                .catch(error => {
                    console.error('게시글을 삭제하는 중 에러 발생:', error);
                });
        }
    };

    if (!socialing) {
        return <div>로딩 중...</div>;
    }

    return (
        <div>
            <section className="page-section cta">
                <Container>
                    <div className="cta-inner bg-faded text-center rounded">
                        <h3>{socialing.title}</h3>
                        <hr/>
                        <h6 style={{ float: "left" }}>{socialing.writer}·{new Date(socialing.date).toLocaleDateString()}</h6>
                        <br/>
                        <br/>
                        <p>{socialing.content}</p>
                        <p>모집 : {socialing.currentparticipants}/{socialing.maxparticipants} </p>
                        <hr/>
                        <div style={{float: "left"}}>
                            <button onClick={handleEditClick}>수정</button>
                            <button onClick={handleDeleteClick}>삭제</button>
                        </div>
                        <div style={{float: "right" }}>
                            <button>신청하기</button>
                            <button>관심등록</button>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default SocialingDetails;