import React from "react";
import {NavLink} from "react-router-dom";
import communityImg from "../../img/임시.png"


const Co = () => {
    return <div style={{
        backgroundColor:"gray",
        height:300,
        margin:20,
        backgroundImage: `url(${communityImg})`,
        backgroundSize:"70vh",
        border: '1px solid black'
        }}>
        <a href="/Community"
           style={{color:"black",
               textDecorationLine:"none"}}>

        </a>
    </div>;
};

export default Co;
