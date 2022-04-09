import React,{useEffect, useState} from "react";
import '../../Css/admin/Featureinfo.css';
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

const Featureinfo = () => {

    // ============================================ start doctor count===================================

    const [doctor , setDoctorReport] = useState()
    const get_doctor_report = async () => {
        const res = await fetch('/dashboard/get_total_doctor', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        console.log(result)
        if (result) {
            console.log(result[0]);
            setDoctorReport(result);
        } else {
            return false;
        }
    };
    useEffect(() => {
        get_doctor_report();
    }, []);
    // ============================================ end doctor count====================================
    // ============================================ start patient count===================================
    const [patient , setPatientReport] = useState()
    const get_patient_report = async () => {
        const res = await fetch('/dashboard/get_total_patient', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        console.log(result)
        if (result) {
            console.log(result[0]);
            setPatientReport(result);
        } else {
            return false;
        }
    };
    useEffect(() => {
        get_patient_report();
    }, []);
    // =============================end patient count ========================

    // =============================================Get payemnt Details =============================
    const [payment , setpayment] = useState()
    const get_payment_report = async () => {
        const res = await fetch('/dashboard/get_total_payment', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        console.log(result)
        if (result) {
            console.log(result[0]);
            setpayment(result);
        } else {
            return false;
        }
    };
    useEffect(() => {
        get_payment_report();
    }, []);


    
    // =============================================End payemnt Details =============================

    return (
        <>
            <div className="featured" style={{marginTop:"10px"}}>
                <div className="featuredItem">
                    <span className="featuredTitle">Total Doctors</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{doctor}</span>
                        {/* <span className="featuredMoneyRate">
                            +1 <ArrowUpward className="featuredIcon" />
                        </span> */}
                    </div>
                    <span className="featuredSub"> <strong>Total Number Of Registered Doctors</strong> </span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Total Patient</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{patient}</span>
                        {/* <span className="featuredMoneyRate">
                            +2 <ArrowUpward className="featuredIcon" />
                        </span> */}
                    </div>
                    <span className="featuredSub">Total Number Of Registered patients</span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Total payment</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{payment} ₹ </span>
                        {/* <span className="featuredMoneyRate">
                            +2.4 <ArrowUpward className="featuredIcon" />
                        </span> */}
                    </div>
                    <span className="featuredSub">Total Payment</span>
                </div>
            </div>

        </>
    )
}
export default Featureinfo;
