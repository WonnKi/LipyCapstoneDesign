import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SocialingDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [message, setMessage] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [applicationId, setApplicationId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(false);
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

                // 사용자가 이미 신청했는지 확인
                const applyResponse = await axios.get(`http://localhost:8080/${id}/isApplied`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsApplied(applyResponse.data.isApplied);
                setApplicationId(applyResponse.data.applicationId);

            } catch (error) {
                setMessage('Error fetching post: ' + (error.response?.data || error.message));
            }
        };
        fetchPost();
    }, [id]);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    setMessage('No token found, please login again.');
                    return;
                }
                const response = await axios.get(`http://localhost:8080/apply/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setApplicants(response.data);
                setLoading(false);
            } catch (error) {
                setMessage('Error fetching applicants: ' + (error.response?.data || error.message));
                setLoading(false);
            }
        };
        fetchApplicants();
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
            setIsApplied(true);
            setMessage('신청 성공');
            // 페이지 새로고침
            window.location.reload();
        } catch (error) {
            setMessage('신청 실패: ' + (error.response?.data || error.message));
        }
    };

    const handleCancelClick = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setMessage('No token found, please login again.');
                return;
            }
            await axios.delete(`http://localhost:8080/socialing/apply/${applicationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsApplied(false);
            setMessage('취소 성공');
        } catch (error) {
            setMessage('취소 실패: ' + (error.response?.data || error.message));
        }
    };

    const handleShowApplicants = async () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <section className="page-section cta">
            <Container>
                <div className="cta-inner bg-faded text-center rounded">
                    <h3>{post?.title}</h3>
                    <hr/>
                    <h6 style={{float: "left"}}>{post?.writer}·{new Date(post?.date).toLocaleDateString()}</h6>
                    <br/>
                    <br/>
                    <p>{post?.content}</p>
                    <p>모집 : {post?.currentparticipants}/{post?.maxparticipants} </p>
                    <button onClick={handleShowApplicants}>신청자 보기</button>
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
                        {isApplied ? (
                            <button onClick={handleCancelClick}>신청 취소</button>
                        ) : (
                            <button onClick={handleApplyClick}>신청하기</button>
                        )}
                        <button>관심등록</button>
                    </div>
                    {message && <p>{message}</p>}
                </div>
            </Container>

            {/* Applicants Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>신청자 목록</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {applicants.map((applicant, index) => (
                                <li key={index}>{applicant.name} - {applicant.email}</li>
                            ))}
                        </ul>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default SocialingDetails;
