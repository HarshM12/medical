import React from "react";
import Leftbar from '../../Page/admin/Leftbar';
import Appointmenttable from "./Appointmenttable";
import '../../Css/admin/admin.css';

const Appointment = () => {
    return (
        <>
            <div className="container2">
                <Leftbar />
                <Appointmenttable />
            </div>
        </>
    )
}

export default Appointment;