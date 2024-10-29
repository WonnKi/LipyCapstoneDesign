import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Modal, Spinner, Alert } from 'react-bootstrap'
import Sidebar from "../components/BC/Sidebar";

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
    const [isFavorite, setIsFavorite] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
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
                const loggedInName = userResponse.data.Nickname;
                setIsAuthor(postResponse.data.writer === loggedInName);

                const applyResponse = await axios.get(`http://localhost:8080/${id}/isApplied`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsApplied(applyResponse.data.isApplied);
                setApplicationId(applyResponse.data.applicationId);

                const favoriteResponse = await axios.get(`http://localhost:8080/${id}/isFavorite`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsFavorite(favoriteResponse.data.isFavorite);


            } catch (error) {

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
                    setMessage('회원에게만 보이는 글 입니다');
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
                setLoading(false);
            }
        };
        fetchApplicants();
    }, [id]);

    const handleDeleteClick = async () => {
        const isConfirmed = window.confirm('삭제 하시겠습니까?');
        if (isConfirmed) {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    setMessage('No token found, please login again.');
                    return;
                }
                await axios.delete(`http://localhost:8080/socialing/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                navigate('/socialing2');
            } catch (error) {
                console.error('게시글을 삭제하는 중 에러 발생:', error);
            }
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
            window.location.reload();
        } catch (error) {
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
            window.location.reload();
        } catch (error) {

        }
    };

    const handleShowApplicants = async () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    const handleAddInterestClick = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setMessage('No token found, please login again.');
                return;
            }
            await axios.post(`http://localhost:8080/socialing/${id}/interest`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.reload();
        } catch (error) {
        }
    };

    const handleRemoveInterestClick = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                setMessage('No token found, please login again.');
                return;
            }
            await axios.delete(`http://localhost:8080/socialing/${id}/interest`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.reload();
        } catch (error) {
        }
    };


    return (
        <div>
            <div id="wrapper">

                <Container>
                    <div
                        style={{
                            padding: 130,
                        }}>
                        <div
                            style={{
                                background: "#F2EFE4",
                                padding: 20
                            }}>
                            <h2
                                style={{
                                    fontWeight: "bold"
                                }}>
                                {post?.title}
                            </h2>
                            <div className="d-flex justify-content-between">
                                <span>{post?.writer}</span>
                                {isAuthor && (
                                    <div>
                                        <Button onClick={() => navigate(`/socialing`)}>뒤로가기</Button>{' '}
                                        <Button onClick={() => navigate(`/socialing/${id}/edit`)}>수정</Button>{' '}
                                        <Button onClick={handleDeleteClick}>삭제</Button>
                                    </div>
                                )}
                            </div>
                            <hr/>
                            <div className="post-content">
                                <div dangerouslySetInnerHTML={{__html: post?.content}}/>
                            </div>
                            <div style={{margin: '100px 0'}}></div>
                            <div className="text-center my-4">
                                <span>날짜 : {new Date(post?.date).toLocaleDateString()}</span>
                            </div>
                            <hr/>
                            <p>모집: {post?.currentparticipants}/{post?.maxparticipants}</p>
                            <div className="d-flex justify-content-between">
                                {isAuthor && (
                                    <Button onClick={handleShowApplicants}>신청자 보기</Button>
                                )}
                                <div>
                                    {!isAuthor && (
                                        <>
                                            {isApplied ? (
                                                <Button onClick={handleCancelClick}>신청 취소</Button>
                                            ) : (
                                                <Button onClick={handleApplyClick}>신청 하기</Button>
                                            )}
                                            {' '}
                                            {isFavorite ? (
                                                <Button onClick={handleRemoveInterestClick}>관심 등록 취소</Button>
                                            ) : (
                                                <Button onClick={handleAddInterestClick}>관심 등록</Button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            {message && <Alert variant="info" className="mt-3">{message}</Alert>}
                        </div>
                    </div>
                </Container>
            </div>


            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>신청자 목록</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <Spinner an imation="border" />
                    ) : (
                        <ul>
                            {applicants.map((applicant, index) => (
                                <li key={index}>{applicant}</li> // applicant 자체가 문자열이므로 그대로 출력
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
        </div>

    );
};

export default SocialingDetails;

