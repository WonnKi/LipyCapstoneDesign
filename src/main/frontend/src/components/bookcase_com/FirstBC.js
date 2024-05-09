import React from "react";
import {NavLink} from "react-router-dom";


const FirstBC = () => {
    return <div style={{
        backgroundColor:"gray",
        // position:"absolute",
        // top:"10%",
        // left:"0%",
        height:300,
        // width:"30%",
        // margin:20
        }}>
        <a href="/firstBookCase"
           style={{color:"black",
               textDecorationLine:"none"}}>
            읽은책
        </a>
    </div>
};

export default FirstBC;
