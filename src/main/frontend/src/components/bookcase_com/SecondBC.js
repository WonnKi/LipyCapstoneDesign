import React from "react";
import {NavLink} from "react-router-dom";
import SecondBookCase from "../../screens/secondBookCase";


const SecondBC = () => {
    return <div style={{
        backgroundColor:"gray",
        // position:"absolute",
        // top:"10%",
        // left:"34%",
        height:300,
        // width:"30%",
        // margin:20
        }}>
        <a href="/secondBookCase"
           style={{color:"black",
               textDecorationLine:"none"}}>
            읽는책
        </a>
    </div>
};

export default SecondBC;
