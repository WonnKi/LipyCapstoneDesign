import React, {useState} from "react";
import Tab from "../components/BC/Tab";
import CaseModal from "../components/BC/CaseModal";

const FirstBookCase = () => {
    return <div>
        <Tab/>
        <div style={{
            backgroundColor: "gray",
            position: "absolute",
            top: "20%",
            height: 400,
            width: "100%"
        }}>
            <div style={{
                position: "absolute",
                top: "15%",
                left: "5%",
            }}>
                <CaseModal/>

            </div>

        </div>
    </div>

};

export default FirstBookCase;