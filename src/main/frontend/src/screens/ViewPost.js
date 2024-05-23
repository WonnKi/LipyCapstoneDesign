import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [message, setMessage] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get(`http://localhost:8080/socialing/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPost(response.data);
                // 현재 로그인한 사용자의 정보를 가져옵니다.
                const userResponse = await axios.get('http://localhost:8080/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const loggedInUsername = userResponse.data.username;
                setIsAuthor(response.data.writer === loggedInUsername);
            } catch (error) {
                setMessage('Error fetching post: ' + error.response.data);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.delete(`http://localhost:8080/socialing/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/'); // 삭제 후 메인 페이지로 이동
        } catch (error) {
            setMessage('Error deleting post: ' + error.response.data);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <section className="page-section cta">
        <div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.content}</p>
            <p>Max Participants: {post.maxparticipants}</p>
            <p>Date: {new Date(post.date).toLocaleString()}</p>
            <p>Current Participants: {post.currentparticipants}</p>
            <p>Writer: {post.writer}</p>
            {message && <p>{message}</p>}
            {isAuthor && (
                <div>
                    <button onClick={() => navigate(`/socialing/edit/${id}`)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
        </section>
    );
};

export default ViewPost;