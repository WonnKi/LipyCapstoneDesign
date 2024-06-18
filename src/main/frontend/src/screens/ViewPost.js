// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Modal from 'react-modal';
//
// const ViewPost = () => {
//     const { id } = useParams();
//     const [post, setPost] = useState(null);
//     const [applicants, setApplicants] = useState([]);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [isWriter, setIsWriter] = useState(false);
//     const [modalIsOpen, setModalIsOpen] = useState(false);
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         axios.get(`/socialing/${id}`)
//             .then(response => {
//                 setPost(response.data);
//                 setLoading(false);
//                 checkIfWriter(response.data.writer);
//             })
//             .catch(error => {
//                 setError('Error fetching post');
//                 setLoading(false);
//             });
//     }, [id]);
//
//     const checkIfWriter = (writer) => {
//         const name = localStorage.getItem('name'); // assuming you store name in localStorage
//         if (writer === name) {
//             setIsWriter(true);
//             fetchApplicants();
//         }
//     };
//
//     const fetchApplicants = () => {
//         axios.get(`/socialing/apply/${id}`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         })
//             .then(response => {
//                 setApplicants(response.data);
//             })
//             .catch(error => {
//                 alert('Failed to fetch applicants');
//             });
//     };
//
//     const openModal = () => {
//         setModalIsOpen(true);
//     };
//
//     const closeModal = () => {
//         setModalIsOpen(false);
//     };
//
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;
//
//     return (
//         <div>
//             <h1>{post.title}</h1>
//             <p>{post.description}</p>
//             <p>Writer: {post.writer}</p>
//             <p>Content: {post.content}</p>
//             <p>Current Participants: {post.currentparticipants}</p>
//             <p>Max Participants: {post.maxparticipants}</p>
//             <p>Date: {new Date(post.date).toLocaleString()}</p>
//             <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>
//             {isWriter && (
//                 <button onClick={openModal}>참여인원 확인하기</button>
//             )}
//
//             <Modal
//                 isOpen={modalIsOpen}
//                 onRequestClose={closeModal}
//                 contentLabel="Applicants Modal"
//             >
//                 <h2>Applicants</h2>
//                 <button onClick={closeModal}>Close</button>
//                 <ul>
//                     {applicants.map((applicant, index) => (
//                         <li key={index}>{applicant.name} ({applicant.email})</li>
//                     ))}
//                 </ul>
//             </Modal>
//         </div>
//     );
// };
//
// export default ViewPost;
//
// Modal.setAppElement('#root');
// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)'
//     }
// };
