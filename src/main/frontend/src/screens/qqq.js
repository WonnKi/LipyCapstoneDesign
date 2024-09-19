import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isWriter, setIsWriter] = useState(false);
    const [isApplied, setIsApplied] = useState(false);
    const [applicationId, setApplicationId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/socialing/${id}`)
            .then(response => {
                setPost(response.data);
                setLoading(false);
                checkIfWriter(response.data.writer);
                checkIfApplied();
            })
            .catch(error => {
                setError('Error fetching post');
                setLoading(false);
            });
    }, [id]);

    const checkIfWriter = (writer) => {
        const currentUser = localStorage.getItem('username');
        setIsWriter(writer === currentUser);
    };

    const checkIfApplied = () => {
        axios.get(`/socialing/${id}/isApplied`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                setIsApplied(response.data.isApplied);
                setApplicationId(response.data.applicationId);
            })
            .catch(error => {
                console.log('Error checking application', error);
            });
    };

    const handleApply = () => {
        axios.post('/socialing/apply', null, {
            params: { socialingId: id },
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                alert('Successfully applied to the socialing event');
                setIsApplied(true);
                setApplicationId(response.data);
            })
            .catch(error => {
                alert('Failed to apply for the socialing event');
            });
    };

    const handleCancel = () => {
        axios.delete(`/socialing/apply/${applicationId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                alert('Successfully canceled the application');
                setIsApplied(false);
                setApplicationId(null);
            })
            .catch(error => {
                alert('Failed to cancel the application');
            });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <p>Writer: {post.writer}</p>
            <p>Content: {post.content}</p>
            <p>Current Participants: {post.currentparticipants}</p>
            <p>Max Participants: {post.maxparticipants}</p>
            <p>Date: {new Date(post.date).toLocaleString()}</p>
            <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
            <button onClick={() => navigate(-1)}>Back</button>
            {isApplied ? (
                <button onClick={handleCancel}>Cancel Application</button>
            ) : (
                <button onClick={handleApply}>Apply for this socialing event</button>
            )}
        </div>
    );
};

export default ViewPost;