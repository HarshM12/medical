import React from "react";
import Leftbar from '../../Page/admin/Leftbar';
import '../../Css/admin/admin.css'
import Paymenttable from "../../Page/admin/Paymenttable";

const Payment = () => {

    return (
        <>
                    <div className="container2">
                        <Leftbar />
                        <Paymenttable/>
                    </div>
        </>


    );
};
export default Payment;