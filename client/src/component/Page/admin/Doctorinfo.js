import React from "react";
import Leftbar from '../../Page/admin/Leftbar';
import '../../Css/admin/admin.css'
import Doctortable from '../../Page/admin/Doctortable'

const Doctorinfo = () => {

    return (
        <>
                    <div className="container2">
                        <Leftbar />
                        <Doctortable/>
                    </div>
        </>


    );
};
export default Doctorinfo;