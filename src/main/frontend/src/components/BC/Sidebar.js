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
                <img alt="logo" src="/img/185043_ink_pen_icon.png"
                     style={{width: '25px', height: '25px'}}/>
            </a>
            <hr className="sidebar-divider my-0"/>
            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    <img alt="logo" src="/img/1976053_home_home_page_homepage_homepages_icon.png"
                         style={{width: '25px', height: '25px'}}/>
                    <span>홈</span>
                </Link>
            </li>
            <hr/>
            <div className="nav-item">
                <Link className="nav-link" to="/secondBookCase2">
                    <img alt="logo" src="/img/3952927_bookcase_cabinet_cupboard_furniture_icon.png"
                         style={{width: '25px', height: '25px'}}/>
                    내 서재
                </Link>
            </div>
            <div className="nav-item">
                <Link className="nav-link" to="/socialing2">
                    <img alt="logo" src="/img/3643747_friend_group_people_peoples_team_icon.png"
                         style={{width: '25px', height: '25px'}}/>
                    소셜링 페이지
                </Link>
            </div>
            <hr/>
            <div style={{marginTop: "auto", paddingBottom: "10px"}}>
            {!jwtToken && (
                    <>
                        <Link className="btn btn-user btn-block font-weight-bold"
                              to="/Login">
                            로그인
                        </Link>
                        <Link className="btn btn-user btn-block"
                              to="/signup2">
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
