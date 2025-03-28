import  React, {useEffect, useState} from "react";

import {  LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import UserLogs from "../components/Log/UserLogs";
import Memo from "../components/Log/Memo";
import EditMember from "../components/Log/EditMember";
import BookCount from "../components/AdminPageCo/BookCount";
import {Link} from "react-router-dom";
import MessageComponent from "../components/AdminPageCo/MessageComponent";
import ManagerMemo from "../components/AdminPageCo/ManagerMemo";
import {Dropdown} from "react-bootstrap";
import ReceivedMessageComponent from "../components/AdminPageCo/ReceivedMessageComponent";
import GroupMessageModal from '../components/AdminPageCo/GroupMessageModal';



const data = [
    { name: '1월', uv: 4000, pv: 2400, amt: 2400 },
    { name: '2월', uv: 3000, pv: 1398, amt: 2210 },
    { name: '3월', uv: 2000, pv: 9800, amt: 2290 },
    { name: '4월', uv: 2780, pv: 3908, amt: 2000 },
    { name: '5월', uv: 1890, pv: 4800, amt: 2181 },
    { name: '6월', uv: 2390, pv: 4500, amt: 2500 },
];

const AdminPage = () => {

    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOption, setSearchOption] = useState('name');
    const [selectedMember, setSelectedMember] = useState(null);
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [showLogsModal, setShowLogsModal] = useState(false);
    const [genderFilter, setGenderFilter] = useState('');
    const [ageFilter, setAgeFilter] = useState('');
    const [showRecordsModal, setShowRecordsModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showMemoModal, setShowMemoModal] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState([])

    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showGroupMessageModal, setShowGroupMessageModal] = useState(false);


    const handleSendGroupMessage = async (receiverList, title, content) => {
        try {
            await axios.post('http://localhost:8080/messages/send', {
                receiverList,
                messageDto: { title, content, senderName: '', receiverName: '' },
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            alert("메시지를 보냈습니다.");
        } catch (error) {
            console.error("메시지 전송 실패:", error);
            alert("메시지 전송에 실패했습니다.");
        }
    };

    const handleOpenRecordsModal = () => {
        setShowRecordsModal(true);
    };

    const handleCloseRecordsModal = () => {
        setShowRecordsModal(false);
    };


    const fetchAllMembers = async () => {
        try {
            const response = await axios.get('/manager/');
            setMembers(response.data);
        } catch (error) {
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/manager/detail', {
                params: {
                    [searchOption]: searchTerm || null,
                },
            });
            setMembers(response.data);
        } catch (error) {
        }
    };

    const handleRowClick = (member) => {
        setSelectedMember(member);
        setShowMemberModal(true);
    };

    const handleCloseMemberModal = () => {
        setShowMemberModal(false);
    };

    const handleOpenLogsModal = () => {
        setShowLogsModal(true);
    };

    const handleCloseLogsModal = () => {
        setShowLogsModal(false);
    };

    const handleGenderFilterChange = (e) => {
        setGenderFilter(e.target.value);
    };

    const handleOpenEditModal = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleUpdateMemberList = () => {
        fetchAllMembers();
    };

    const handleOpenMessageModal = () => {
        setShowMessageModal(true);
    };

    const handleCloseMessageModal = () => {
        setShowMessageModal(false);
    };

    const handleOpenGroupMessageModal = () => {
        setShowGroupMessageModal(true);
    };

    const handleCloseGroupMessageModal = () => {
        setShowGroupMessageModal(false);
    };





    const handleOpenMemoModal = () => {
        setShowMemoModal(true);
    };

    const handleCloseMemoModal = () => {
        setShowMemoModal(false);
    };


    useEffect(() => {
        fetchAllMembers();
    }, []);

    const filteredMembers = members.filter(member => {
        if (!genderFilter) return true;
        return member.gender === genderFilter;
    });


    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole');
        window.location.reload();
    };

    const jwtToken = localStorage.getItem('jwtToken');

    const [role, setRole] = useState(null);

    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        setRole(userRole);
    }, []);


    return <div>

        <Button>
            <Link className="nav-link" to="/home">
                홈
            </Link>
        </Button>

        <section className="page-section cta">
            <div>
                <div className="row">
                    <div className="col-xl-9 mx-auto">
                        <div className="cta-inner bg-faded text-center rounded">
                            <div id="content">


                                <div className="container-fluid pt-4 px-4">
                                    <div className="row g-4">
                                        <div className="col-sm-6 col-xl-3">
                                            <div
                                                className="BackColor rounded d-flex align-items-center justify-content-between p-4">
                                                <i className="fa fa-chart-line fa-3x text-primary"></i>
                                                <div className="ms-3">
                                                    <p className="mb-2">Today Sale</p>
                                                    <h6 className="mb-0">$1234</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xl-3">
                                            <div
                                                className="BackColor rounded d-flex align-items-center justify-content-between p-4">
                                                <i className="fa fa-chart-bar fa-3x text-primary"></i>
                                                <div className="ms-3">
                                                    <p className="mb-2">Total Sale</p>
                                                    <h6 className="mb-0">$1234</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xl-3">
                                            <div
                                                className="BackColor rounded d-flex align-items-center justify-content-between p-4">
                                                <i className="fa fa-chart-area fa-3x text-primary"></i>
                                                <div className="ms-3">
                                                    <p className="mb-2">Today Revenue</p>
                                                    <h6 className="mb-0">$1234</h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-xl-3">
                                            <div
                                                className="BackColor rounded d-flex align-items-center justify-content-between p-4">
                                                <i className="fa fa-chart-pie fa-3x text-primary"></i>
                                                <div className="ms-3">
                                                    <p className="mb-2">Total Revenue</p>
                                                    <h6 className="mb-0">$1234</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="container-fluid pt-4 px-4">
                                    <div className="row g-4">
                                        <div className="col-sm-12 col-xl-6" style={{height: "300px"}}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    width={500}
                                                    height={300}
                                                    data={data}
                                                    margin={{
                                                        top: 5,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5,
                                                    }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3"/>
                                                    <XAxis dataKey="name"/>
                                                    <YAxis/>
                                                    <Tooltip/>
                                                    <Legend/>
                                                    <Bar dataKey="pv" fill="#8884d8"
                                                         activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                                                    <Bar dataKey="uv" fill="#82ca9d"
                                                         activeBar={<Rectangle fill="gold" stroke="purple"/>}/>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="col-sm-12 col-xl-6" style={{height: "300px"}}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart
                                                    width={500}
                                                    height={300}
                                                    data={data}
                                                    margin={{
                                                        top: 5,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5,
                                                    }}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3"/>
                                                    <XAxis dataKey="name"/>
                                                    <YAxis/>
                                                    <Tooltip/>
                                                    <Legend/>
                                                    <Line type="monotone" dataKey="pv" stroke="#8884d8"
                                                          activeDot={{r: 8}}/>
                                                    <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </div>

                                <div className="container-fluid pt-4 px-4">
                                    <BookCount/>
                                </div>


                                <div className="container-fluid pt-4 px-4">
                                    <div className="BackColor text-center rounded p-4">

                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <h6 className="mb-0">회원 관리</h6>
                                            <form onSubmit={handleSearch}>
                                                <Button variant="primary" onClick={handleOpenGroupMessageModal} style={{ margin: 5 }}>
                                                    단체 쪽지 보내기
                                                </Button>

                                                <Modal show={showGroupMessageModal} onHide={handleCloseGroupMessageModal}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>단체 쪽지</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <GroupMessageModal  members={members} onClose={handleCloseGroupMessageModal} onSend={handleSendGroupMessage} />
                                                    </Modal.Body>
                                                </Modal>

                                                <input
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />

                                                <select
                                                    value={searchOption}
                                                    onChange={(e) => setSearchOption(e.target.value)}
                                                    style={{margin: '10px'}}
                                                >
                                                    <option value="name">이름</option>
                                                    <option value="nickname">닉네임</option>
                                                    <option value="email">이메일</option>
                                                </select>

                                                <button type="submit">검색</button>
                                            </form>
                                        </div>

                                        <div className="table-responsive"
                                             style={{maxHeight: '500px', overflowY: 'auto'}}>
                                            <table
                                                className="table text-start align-middle table-bordered table-hover mb-0">
                                                <thead>
                                                <tr className="text-white"
                                                    style={{
                                                        position: 'sticky',
                                                        top: 0,
                                                        zIndex: 1
                                                    }}>

                                                    <th>이름</th>
                                                    <th>이메일</th>
                                                    <th>닉네임</th>
                                                    <th>
                                                        <select value={genderFilter}
                                                                onChange={handleGenderFilterChange}>
                                                            <option value="">성별</option>
                                                            <option value="남">남</option>
                                                            <option value="여">여</option>
                                                        </select>
                                                    </th>
                                                    <th>나이</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {filteredMembers.map((member) => (
                                                    <tr key={member.id} onClick={() => handleRowClick(member)}
                                                        style={{cursor: 'pointer'}}>
                                                        <td>{member.username}</td>
                                                        <td>{member.email}</td>
                                                        <td>{member.nickname}</td>
                                                        <td>{member.gender}</td>
                                                        <td>{member.age}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                {selectedMember && (
                                    <>
                                        {/* 회원 정보 모달 */}
                                        <Modal show={showMemberModal} onHide={handleCloseMemberModal}
                                               centered>
                                            <Modal.Header closeButton>
                                                <Modal.Title>회원 정보</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <p><strong>이름:</strong> {selectedMember.username}</p>
                                                <p><strong>이메일:</strong> {selectedMember.email}</p>
                                                <p><strong>닉네임:</strong> {selectedMember.nickname}</p>
                                                <p><strong>성별:</strong> {selectedMember.gender}</p>
                                                <p><strong>나이:</strong> {selectedMember.age}</p>
                                                <p><strong>책 목록:</strong></p>
                                                {selectedMember.books && selectedMember.books.length > 0 ? (
                                                    <>
                                                        <h5>예정</h5>
                                                        <ul>
                                                            {selectedMember.books
                                                                .filter((book) => book.bookStatus === 'WISH')
                                                                .map((book, index) => (
                                                                    <li key={index}>
                                                                        {book.title}
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                        <h5>독서중</h5>
                                                        <ul>
                                                            {selectedMember.books
                                                                .filter((book) => book.bookStatus === 'READING')
                                                                .map((book, index) => (
                                                                    <li key={index}>
                                                                        {book.title}
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                        <h5>완독</h5>
                                                        <ul>
                                                            {selectedMember.books
                                                                .filter((book) => book.bookStatus === 'DONE')
                                                                .map((book, index) => (
                                                                    <li key={index}>
                                                                        {book.title}
                                                                    </li>
                                                                ))}
                                                        </ul>
                                                    </>
                                                ) : (
                                                    <p>책 목록이 없습니다.</p>
                                                )}

                                                <Button variant="primary" onClick={handleOpenLogsModal}>
                                                    로그 보기
                                                </Button>
                                                <Button variant="primary" onClick={handleOpenRecordsModal}
                                                        style={{margin: 5}}>
                                                    기록 보기
                                                </Button>
                                                <Button variant="primary" onClick={handleOpenEditModal}>정보 수정</Button>

                                                    <Button variant="primary" onClick={handleOpenMessageModal} style={{ margin: 5 }}>
                                                        쪽지 보내기
                                                    </Button>
                                                <Button variant="primary" onClick={handleOpenMemoModal} style={{ margin: 5 }}>
                                                    메모
                                                </Button>
                                            </Modal.Body>
                                        </Modal>


                                        <Modal show={showMessageModal} onHide={handleCloseMessageModal}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>쪽지 보내기</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <MessageComponent receiverNickname={selectedMember?.nickname} onClose={handleCloseMessageModal} />
                                            </Modal.Body>
                                        </Modal>

                                        <Modal show={showMemoModal} onHide={handleCloseMemoModal}>
                                            <Modal.Body >
                                                <ManagerMemo memberId={selectedMember.id} />
                                            </Modal.Body>
                                        </Modal>


                                        {selectedMember && (
                                            <EditMember
                                                userId={selectedMember.id}
                                                show={showEditModal}
                                                handleClose={handleCloseEditModal}
                                                handleUpdate={handleUpdateMemberList}
                                                email={selectedMember.email}
                                                password={selectedMember.password}
                                                username={selectedMember.username}
                                                nickname={selectedMember.nickname}
                                                gender={selectedMember.gender}
                                                age={selectedMember.age}
                                                phonenumber={selectedMember.phonenumber}
                                            />
                                        )}

                                        {/* 로그 모달 */}
                                        <Modal show={showLogsModal} onHide={handleCloseLogsModal} size="xl">
                                            <Modal.Header closeButton>
                                                <Modal.Title>Log</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <UserLogs userId={selectedMember.id}/>
                                            </Modal.Body>
                                        </Modal>

                                        <Modal show={showRecordsModal} onHide={handleCloseRecordsModal} size="lg">
                                            <Modal.Header closeButton>
                                                <Modal.Title>기록 보기</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Memo userId={selectedMember.id}/>
                                            </Modal.Body>
                                        </Modal>

                                    </>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer>
            .
        </footer>

    </div>
};

export default AdminPage;