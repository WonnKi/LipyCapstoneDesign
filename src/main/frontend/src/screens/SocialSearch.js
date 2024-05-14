import React from "react";

const Write = () => {
    return <div>
        <section className="page-section cta"
        style={{
            position:"absolute",
            width:"100%",
            height:1000
        }}>
            <div>
                <div
                style={{
                    position:"absolute",
                    right:"25%"
                }}>
                    <input type="text" placeholder="검색어를 입력하세요"
                    style={{
                        width:500,
                        height:50
                    }}/>
                    <input type="submit" value="검색"
                    style={{
                        width:100,
                        height:50
                    }}/>

                </div>
            </div>
        </section>
    </div>

};

export default Write;
