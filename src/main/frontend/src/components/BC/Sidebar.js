import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        window.location.reload();
    };

    const jwtToken = localStorage.getItem('jwtToken');

    return (
        <div className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-text mx-3">LIPY</div>
            </a>
            <hr className="sidebar-divider my-0"/>
            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    <span>홈</span>
                </Link>
            </li>
            <hr/>
            <div className="nav-item">
                <Link className="nav-link" to="/secondBookCase2">
                    내 서재
                </Link>
            </div>
            <div className="nav-item">
                <Link className="nav-link" to="/socialing2">
                    소셜링 페이지
                </Link>
            </div>
            <hr/>
            <div style={{marginTop: "auto", paddingBottom: "10px"}}>
                {!jwtToken && (
                    <>
                        <Link className="btn btn-user btn-block" to="/Login">
                            로그인
                        </Link>
                        <Link className="btn btn-user btn-block" to="/signup2">
                            <a className="small" href="signup2">회원이 아니신가요?</a>
                        </Link>
                    </>
                )}
                {jwtToken && (
                    <a onClick={handleLogout} className="btn btn-user btn-block">
                        로그아웃
                    </a>
                )}
            </div>
        </div>
    );
}

export default Sidebar;
