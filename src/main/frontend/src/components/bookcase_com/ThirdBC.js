import React from "react";
import {NavLink} from "react-router-dom";
import ThirdBookCase from "../../screens/thirdBookCase";


const ThirdBC = () => {
    return <div style={{
        backgroundColor:"gray",
        position:"absolute",
        top:"10%",
        right:"0%",
        height:"40%",
        width:"30%",
        margin:20}}>
        <a href="/thirdBookCase"
           style={{color:"black",
               textDecorationLine:"none"}}>
            읽을책
        </a>
    </div>
};

export default ThirdBC;
