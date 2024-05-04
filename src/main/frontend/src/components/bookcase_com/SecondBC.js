import React from "react";
import {NavLink} from "react-router-dom";


const SecondBC = () => {
    return <div style={{
        backgroundColor:"gray",
        position:"absolute",
        top:"10%",
        left:"34%",
        height:"40%",
        width:"30%",
        margin:20}}>
        <a href="/Bookcase"
           style={{color:"black",
               textDecorationLine:"none"}}>
            읽는책
        </a>
    </div>
};

export default SecondBC;
