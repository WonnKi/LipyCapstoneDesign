import  React, {useEffect, useState} from "react";
import Sidebar from "../components/BC/Sidebar";
import Table from "react-bootstrap/Table";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: '1월',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: '2월',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: '3월',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: '4월',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: '5월',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: '6월',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
];

const AdminPage = () => {

    return (
        <div>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column" style={{background: "#D9C5AD"}}>
                    <div id="content">
                        <div className="container-fluid">
                            <div className="row" style={{marginTop: "20px"}}>
                                <div className="col-lg-12 mb-8">
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">사이트 통계</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="chart-container"
                                                     style={{width: '100%', height: 300, marginTop: '20px'}}>
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
                                                            <CartesianGrid strokeDasharray="3 3" />
                                                            <XAxis dataKey="name" />
                                                            <YAxis />
                                                            <Tooltip />
                                                            <Legend />
                                                            <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                                                            <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                                                        </BarChart>
                                                    </ResponsiveContainer>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card shadow mb-4">
                                        <div
                                            className="card-header py-3 d-flex justify-content-between align-items-center">
                                            <h6 className="m-0 font-weight-bold text-primary">회원 관리</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="row">
                                                <Table bordered hover>
                                                    <thead>
                                                    <tr>
                                                        <th style={{width: "15%"}}>회원 번호</th>
                                                        <th style={{width: "15%"}}>가입일</th>
                                                        <th style={{width: "15%"}}>닉네임</th>
                                                        <th style={{width: "15%"}}>이름</th>
                                                        <th style={{width: "15%"}}>이메일</th>
                                                        <th style={{width: "15%"}}>작성 글</th>
                                                        <th style={{width: "10%"}}>상태</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminPage;
