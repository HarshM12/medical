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
    return (
        <>
            <div className="featured" style={{marginTop:"10px"}}>
                <div className="featuredItem">
                    <span className="featuredTitle">Total Doctors</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{doctor}</span>
                        <span className="featuredMoneyRate">
                            +1 <ArrowUpward className="featuredIcon" />
                        </span>
                    </div>
                    <span className="featuredSub"> <strong>Total Number Of Register Doctors</strong> </span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Total Patient</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">{patient}</span>
                        <span className="featuredMoneyRate">
                            +2 <ArrowUpward className="featuredIcon" />
                        </span>
                    </div>
                    <span className="featuredSub">Total Number Of Register patients</span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Total payment</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">2,225₹</span>
                        <span className="featuredMoneyRate">
                            +2.4 <ArrowUpward className="featuredIcon" />
                        </span>
                    </div>
                    <span className="featuredSub">Compared to last month</span>
                </div>
            </div>

        </>
    )
}
export default Featureinfo;
