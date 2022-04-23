import React from "react";
import Leftbar from '../../Page/admin/Leftbar';
import Reporttable from "./Reporttable";

const Report = () =>{
        return(
            <>
            <div className="container2">
                <Leftbar />
                <Reporttable></Reporttable>
            </div>
            </>
        )
}

export default Report;