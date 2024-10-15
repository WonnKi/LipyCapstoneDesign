import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EditMember = ({ userId, show, handleClose, handleUpdate }) => {
    const [member, setMember] = useState({
        email: '',
        password: '',
        username: '',
        nickname: '',
        gender: '',
        age: 0,
        phonenumber: ''
    });

    const fetchMemberDetails = async (userId) => {
        try {
            const response = await axios.get(`/admin/members/${userId}`);
            setMember(response.data);
        } catch (error) {
            console.error("Error fetching member details:", error);
        }
    };

    useEffect(() => {
        if (show && userId) {
            fetchMemberDetails(userId);
        }
    }, [userId, show]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember({ ...member, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/members/${userId}`, member);
            alert('Member updated successfully!');
            handleUpdate();  // Call parent update handler
            handleClose();    // Close the modal
        } catch (error) {
            console.error("Error updating member:", error);
            alert('Failed to update member.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>회원 정보 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={member.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={member.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formUsername">
                        <Form.Label>이름</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={member.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formNickname">
                        <Form.Label>닉네임</Form.Label>
                        <Form.Control
                            type="text"
                            name="nickname"
                            value={member.nickname}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formGender">
                        <Form.Label>성별</Form.Label>
                        <Form.Control
                            as="select"
                            name="gender"
                            value={member.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">성별 선택</option>
                            <option value="남">남자</option>
                            <option value="여">여자</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formAge">
                        <Form.Label>나이</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            value={member.age}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPhone">
                        <Form.Label>휴대폰 번호</Form.Label>
                        <Form.Control
                            type="text"
                            name="phonenumber"
                            value={member.phonenumber}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                        변경하기
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditMember;
