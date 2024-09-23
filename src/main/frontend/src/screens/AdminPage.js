import  React, {useEffect, useState} from "react";
import Sidebar from "../components/BC/Sidebar";
import Table from "react-bootstrap/Table";
import {  LineChart, Line, BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
                        {/*<div className="container-fluid">*/}
                        {/*    <div className="row" style={{marginTop: "20px"}}>*/}
                        {/*        <div className="col-lg-12 mb-8">*/}
                        {/*            <div className="card shadow mb-4">*/}
                        {/*                <div*/}
                        {/*                    className="card-header py-3 d-flex justify-content-between align-items-center">*/}
                        {/*                    <h6 className="m-0 font-weight-bold text-primary">사이트 통계</h6>*/}
                        {/*                </div>*/}
                        {/*                <div className="card-body">*/}
                        {/*                    <div className="row">*/}
                        {/*                        <div className="chart-container"*/}
                        {/*                             style={{width: '100%', height: 300, marginTop: '20px'}}>*/}
                        {/*                            <ResponsiveContainer width="100%" height="100%">*/}
                        {/*                                <BarChart*/}
                        {/*                                    width={500}*/}
                        {/*                                    height={300}*/}
                        {/*                                    data={data}*/}
                        {/*                                    margin={{*/}
                        {/*                                        top: 5,*/}
                        {/*                                        right: 30,*/}
                        {/*                                        left: 20,*/}
                        {/*                                        bottom: 5,*/}
                        {/*                                    }}*/}
                        {/*                                >*/}
                        {/*                                    <CartesianGrid strokeDasharray="3 3" />*/}
                        {/*                                    <XAxis dataKey="name" />*/}
                        {/*                                    <YAxis />*/}
                        {/*                                    <Tooltip />*/}
                        {/*                                    <Legend />*/}
                        {/*                                    <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />*/}
                        {/*                                    <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />*/}
                        {/*                                </BarChart>*/}
                        {/*                            </ResponsiveContainer>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*            <div className="card shadow mb-4">*/}
                        {/*                <div*/}
                        {/*                    className="card-header py-3 d-flex justify-content-between align-items-center">*/}
                        {/*                    <h6 className="m-0 font-weight-bold text-primary">회원 관리</h6>*/}
                        {/*                </div>*/}
                        {/*                <div className="card-body">*/}
                        {/*                    <div className="row">*/}
                        {/*                        <Table bordered hover>*/}
                        {/*                            <thead>*/}
                        {/*                            <tr>*/}
                        {/*                                <th style={{width: "15%"}}>회원 번호</th>*/}
                        {/*                                <th style={{width: "15%"}}>가입일</th>*/}
                        {/*                                <th style={{width: "15%"}}>닉네임</th>*/}
                        {/*                                <th style={{width: "15%"}}>이름</th>*/}
                        {/*                                <th style={{width: "15%"}}>이메일</th>*/}
                        {/*                                <th style={{width: "15%"}}>작성 글</th>*/}
                        {/*                                <th style={{width: "10%"}}>상태</th>*/}
                        {/*                            </tr>*/}
                        {/*                            </thead>*/}
                        {/*                            <tbody>*/}
                        {/*                            </tbody>*/}
                        {/*                        </Table>*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}


                        <div className="container-fluid pt-4 px-4">
                            <div className="row g-4">
                                <div className="col-sm-6 col-xl-3">
                                    <div
                                        className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                        <i className="fa fa-chart-line fa-3x text-primary"></i>
                                        <div className="ms-3">
                                            <p className="mb-2">Today Sale</p>
                                            <h6 className="mb-0">$1234</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xl-3">
                                    <div
                                        className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                        <i className="fa fa-chart-bar fa-3x text-primary"></i>
                                        <div className="ms-3">
                                            <p className="mb-2">Total Sale</p>
                                            <h6 className="mb-0">$1234</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xl-3">
                                    <div
                                        className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                                        <i className="fa fa-chart-area fa-3x text-primary"></i>
                                        <div className="ms-3">
                                            <p className="mb-2">Today Revenue</p>
                                            <h6 className="mb-0">$1234</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xl-3">
                                    <div
                                        className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
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
                                <div className="col-sm-12 col-xl-6" style={{ height: "300px"}}>
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
                                <div className="col-sm-12 col-xl-6" style={{ height: "300px"}}>
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
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid pt-4 px-4">
                            <div className="bg-secondary text-center rounded p-4">
                                <div className="d-flex align-items-center justify-content-between mb-4">
                                    <h6 className="mb-0">Recent Salse</h6>
                                    <a href="">Show All</a>
                                </div>
                                <div className="table-responsive">
                                    <table className="table text-start align-middle table-bordered table-hover mb-0">
                                        <thead>
                                        <tr className="text-white">

                                            <th scope="col">닉네임</th>
                                            <th scope="col">가입일</th>
                                            <th scope="col">이름</th>
                                            <th scope="col">이메일</th>
                                            <th scope="col">작성글</th>
                                            <th scope="col">상태</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>

                                            <td>a</td>
                                            <td></td>
                                            <td>Jhon Doe</td>
                                            <td>a@a</td>
                                            <td><a className="btn btn-sm btn-primary" href="">보기</a></td>
                                            <td><a className="btn btn-sm btn-primary" href="">정상</a></td>
                                        </tr>
                                        <tr>

                                            <td>b</td>
                                            <td></td>
                                            <td>Jhon Doe</td>
                                            <td>b@b</td>
                                            <td><a className="btn btn-sm btn-primary" href="">보기</a></td>
                                            <td><a className="btn btn-sm btn-primary" href="">정상</a></td>
                                        </tr>
                                        <tr>

                                            <td>c</td>
                                            <td></td>
                                            <td>Jhon Doe</td>
                                            <td>c@c</td>
                                            <td><a className="btn btn-sm btn-primary" href="">보기</a></td>
                                            <td><a className="btn btn-sm btn-primary" href="">정상</a></td>
                                        </tr>
                                        <tr>

                                            <td>d</td>
                                            <td></td>
                                            <td>Jhon Doe</td>
                                            <td>d@d</td>
                                            <td><a className="btn btn-sm btn-primary" href="">보기</a></td>
                                            <td><a className="btn btn-sm btn-primary" href="">차단</a></td>
                                        </tr>
                                        <tr>

                                            <td>e</td>
                                            <td></td>
                                            <td>Jhon Doe</td>
                                            <td>e@e</td>
                                            <td><a className="btn btn-sm btn-primary" href="">보기</a></td>
                                            <td><a className="btn btn-sm btn-primary" href="">정상</a></td>
                                        </tr>
                                        </tbody>
                                    </table>
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
