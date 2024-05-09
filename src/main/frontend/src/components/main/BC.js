import React from "react";
import {NavLink} from "react-router-dom";
import backgroundColor from "../../img/backColor.png";
import bookCaseImg from "../../img/bookCaseImg.webp"


const BC = () => {
    return <div style={{
        backgroundColor:"gray",
        height:300,
        margin:20,
        backgroundImage: `url(${bookCaseImg})`,
        backgroundSize:"100vh"
        }}>
        <a href="/Bookcase"
        style={{color:"black",
                textDecorationLine:"none"}}>
            책장
        </a>
    </div>;
};

export default BC;
