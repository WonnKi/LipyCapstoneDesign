import React from "react";
import {NavLink} from "react-router-dom";


const BC = () => {
    return <div style={{
        backgroundColor:"gray",
        position:"absolute",
        top:"10%",
        height:"45%",
        width:"60%",
        margin:20}}>
        <a href="/Bookcase"
        style={{color:"black",
                textDecorationLine:"none"}}>
            책장
        </a>
    </div>;
};

export default BC;
