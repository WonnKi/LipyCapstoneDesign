import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [maxParticipants, setMaxParticipants] = useState(0);
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');

    const handleCreatePost = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await axios.post(
                'http://localhost:8080/socialing/post',
                {
                    title,
                    description,
                    content,
                    maxparticipants: maxParticipants,
                    date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setMessage('Post created successfully');
        } catch (error) {
            setMessage('Post creation failed: ' + error.response.data);
        }
    };

    return (
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleCreatePost}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <label>Max Participants:</label>
                    <input
                        type="number"
                        value={maxParticipants}
                        onChange={(e) => setMaxParticipants(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <button type="submit">Create Post</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreatePost;