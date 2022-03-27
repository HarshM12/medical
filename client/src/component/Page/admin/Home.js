import React, { useEffect, useState } from "react";
import '../../Css/admin/home.css'
import Featureinfo from "./Featureinfo";
import Charts from "./Charts";
import Chart from "react-apexcharts";
import { Userdata } from "./data";
import Widgetsm from "./Widgetsm";
import WidgetLg from "./WidgetLg";

const Home = () => {
    // ===================Patient Report ==================
    const [patient_report, setPatientReport] = useState(0);
    const [patient_report_data, setPatientReportData] = useState();
    const data = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            }
        },
        series: [
            {
                name: "Patient",
                data: patient_report_data
            }
        ]
    };

    const get_patient_report = async () => {
        const res = await fetch('/dashboard/get_patient_by_month', {
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
            setData(result);
        } else {
            return false;
        }
    };

    const setData = async(patient_data) => {
        console.log("-------- Set data -------");
        let year = new Date().getFullYear();
        let p_data = [0,0,0,0,0,0,0,0,0,0,0,0];
        // console.log("Length" + patient_report);
        patient_data.forEach(result => {
            console.log("result:" + JSON.stringify(result));
            if(result._id.year === year){
                p_data[result._id.month - 1] = result.count ? result.count : 0
            }            
        });
        console.log("Data:" + p_data);
        setPatientReportData(p_data);
    };

    useEffect(() => {
        get_patient_report();
    }, []);
    // ===================Patient Report END ==========================

    // =========================Doctor report Start==============================
    const [doctor_report, setDoctorReport] = useState(0);
    const [doctor_report_data, setDoctorReportData] = useState();
    const doctor_data = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            }
        },
        series: [
            {
                name: "Doctor",
                data: doctor_report_data
            }
        ]
    };
    const get_doctor_report = async () => {
        const res = await fetch('/dashboard/get_doctor_by_month', {
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
            setdoctorData(result);
        } else {
            return false;
        }
    };
    const setdoctorData = async(doctor_data) => {
        console.log("-------- Set data -------");
        let year = new Date().getFullYear();
        let d_data = [0,0,0,0,0,0,0,0,0,0,0,0];
        // console.log("Length" + patient_report);
        doctor_data.forEach(result => {
            console.log("result:" + JSON.stringify(result));
            if(result._id.year === year){
                d_data[result._id.month - 1] = result.count ? result.count : 0
            }            
        });
        console.log("Data:" + d_data);
        setDoctorReportData(d_data);
    };
    useEffect(() => {
        get_doctor_report();
    }, []);

        // =========================Doctor report End==============================


    return (
        <>
            <div className="home">
                <Featureinfo />
                {/* <Charts data={Userdata} title="Total Active User" datakey="Active User" grid /> */}
                <div className="featured mt-4">
                    <div className="featuredItem">
                        <Chart
                            options={data.options}
                            series={data.series}
                            type="bar"
                        />
                    </div>
                    <div className="featuredItem">
                    <Chart
                            options={doctor_data.options}
                            series={doctor_data.series}
                            type="bar"
                        />
                    </div>
                </div>
                
                <div className="homeWidget">
                    <Widgetsm />
                    <WidgetLg />
                </div>
            </div>
        </>
    )
}

export default Home;
