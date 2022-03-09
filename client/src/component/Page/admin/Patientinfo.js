import React from "react";
import Leftbar from '../../Page/admin/Leftbar';
import Patienttable from '../../Page/admin/Patienttable'
import '../../Css/admin/admin.css'

const Patientinfo = () => {
    return (
        <>
            <div className="container2">
                <Leftbar/>
                <Patienttable/>
            </div>
            
        </>
    )
}

export default Patientinfo;
