import React from "react";
import {NavLink} from "react-router-dom";


const Co = () => {
    return <div style={{
        backgroundColor:"gray",
        position:"absolute",
        top:"60%",
        height:"40%",
        width:"48%",
        margin:20,
        }}>
        <a href="/Community"
           style={{color:"black",
               textDecorationLine:"none"}}>
            커뮤니티
        </a>
    </div>;
};

export default Co;
