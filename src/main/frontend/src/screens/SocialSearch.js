import React from "react";

const Write = () => {
    return <div>
        <section className="page-section cta">
            <div>
                <div>
                    <span>제목</span>
                    <input type="text"/>
                </div>
                <br/>
                <div>
                    <span>내용</span>
                    <textarea
                        cols="30"
                        rows="10"
                    ></textarea>
                </div>
                <br/>
                <div>
                    <button>저장</button>
                    <button>취소</button>
                </div>
            </div>
        </section>
    </div>

};

export default Write;
