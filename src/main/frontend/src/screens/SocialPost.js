import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Container from "react-bootstrap/Container";

const SocialPost = () => {
    return <div>

        <section className="page-section cta">
            <Container>
                <div className="cta-inner bg-faded text-center rounded">
                    <h3>제목</h3>
                    <hr/>
                    <h6
                        style={{
                            float: "left"
                        }}>작성자·2024년 5월 13일</h6>
                    <br/>
                    <br/>
                    <img
                        src="https://previews.123rf.com/images/ssstocker/ssstocker1608/ssstocker160800387/61832978-%EB%8F%85%EC%84%9C-%ED%81%B4%EB%9F%BD-%EC%86%90-%EC%83%81%EC%9C%84-%EB%B7%B0-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8%EC%99%80-%ED%95%A8%EA%BB%98-%ED%85%8C%EC%9D%B4%EB%B8%94%EC%97%90-%EC%98%A4%ED%94%88-%EC%B1%85.jpg"
                        alt="img"
                        style={{
                            height: 400,
                            width: 400
                        }}/>
                    <br/>
                    <br/>
                    <p>글 내용</p>
                    <hr/>
                    <div
                        style={{
                            float: "left"
                        }}>
                        <button>수정</button>
                        <button>삭제</button>
                    </div>
                    <div
                        style={{
                            float: "right"
                        }}>
                        <button>신청하기</button>
                        <button>관심등록</button>
                    </div>

                </div>
            </Container>
        </section>
    </div>

};

export default SocialPost;
