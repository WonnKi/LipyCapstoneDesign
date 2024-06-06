import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center">
                <div className="sidebar-brand-text mx-3">LIPY</div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    <span>홈</span>
                </Link>
            </li>
            <hr />
            <div className="nav-item">
                <Link className="nav-link" to="/mypage2">
                    마이 페이지
                </Link>
            </div>
            <div className="nav-item">
                <Link className="nav-link" to="/socialing2">
                    소셜링 페이지
                </Link>
            </div>
            <hr />
            <Link className="btn btn-user btn-block" to="/Login">
                로그인
            </Link>
            <Link className="btn btn-user btn-block" to="/signup2">
                <a className="small" href="signup2">회원이 아니신가요?</a>
            </Link>
        </div>
    );
}

export default Sidebar;