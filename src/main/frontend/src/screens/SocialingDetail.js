import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";

const SocialingDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [message, setMessage] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    setMessage('No token found, please login again.');
                    return;
                }
                const postResponse = await axios.get(`http://localhost:8080/socialing/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPost(postResponse.data);

                const userResponse = await axios.get('http://localhost:8080/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const loggedInName = userResponse.data.name;
                setIsAuthor(postResponse.data.writer === loggedInName);

            } catch (error) {
                setMessage('Error fetching post: ' + (error.response?.data || error.message));
            }
        };
        fetchPost();
    }, [id]);

    const handleDeleteClick = () => {
        const isConfirmed = window.confirm('삭제 하시겠습니까?');
        if (isConfirmed) {
            axios.delete(`/socialing/${id}`)
                .then(() => {
                    navigate('/socialing');
                })
                .catch(error => {
                    console.error('게시글을 삭제하는 중 에러 발생:', error);
                });
        }
    };

    const handleApplyClick = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setMessage('No token found, please login again.');
                return;
            }
            await axios.post(`http://localhost:8080/socialing/apply?socialingId=${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('신청 성공');
        } catch (error) {
            setMessage('신청 실패: ' + (error.response?.data || error.message));
        }
    };

    if (!post) {
        return (
            <div>
                <section className="page-section cta">
                    회원에게만 보이는 글 입니다
                </section>
            </div>
        );
    }

    return (
        <section className="page-section cta">
            <Container>
                <div className="cta-inner bg-faded text-center rounded">
                    <h3>{post.title}</h3>
                    <hr/>
                    <h6 style={{float: "left"}}>{post.writer}·{new Date(post.date).toLocaleDateString()}</h6>
                    <br/>
                    <br/>
                    <p>{post.content}</p>
                    <p>모집 : {post.currentparticipants}/{post.maxparticipants} </p>
                    <hr/>
                    <div style={{float: "left"}}>
                        {isAuthor && (
                            <div>
                                <button onClick={() => navigate(`/socialing/${id}/edit`)}>수정</button>
                                <button onClick={handleDeleteClick}>삭제</button>
                            </div>
                        )}
                    </div>
                    <div style={{float: "right"}}>
                        <button onClick={handleApplyClick}>신청하기</button>

                        <button>관심등록</button>
                    </div>
                    {message && <p>{message}</p>}
                </div>
            </Container>
        </section>
    );
};

export default SocialingDetails;


