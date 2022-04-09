import React from "react";
import '../../Css/admin/admin.css';
import Contacttbl from "./Contacttbl";
import Leftbar from "./Leftbar";

const Contact = () =>{
    return(
        <>
        <div className="container2">
                <Leftbar />
                <Contacttbl/>
            </div>
        </>
    )
}

export default Contact;
