import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Reporttable = () => {
    const [appoinment_report_data, setAppointmentReportData] = useState();
    const slots = ["9:00","9:30","10:00","10:30", "11:00","11:30", "12:00", "1:00", "1:30", "2:00", "2:30", "3:00","3:30", "4:00", "4:30", "5:00"];
    const [values, setValues] = useState();
    const data = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: slots
            }
        },
        series: [
            {
                name: "Total Appointment",
                data: values
            }
        ]    };

    const get_appointment_slot = async () => {
        const res = await fetch('/dashboard/get_appointment_slot', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        console.log(result)
        if (result) {
            console.log(result[0]);
            setAppointmentReportData(result);
            let data = [];
            for(let i=1;i<=16;i++){
                let temp = 0;
                result.forEach(appointment => {
                    if(i==appointment._id){
                        temp = appointment.count
                    }                    
                });
                data.push(temp);
            }
            setValues(data);
        } else {
            return false;
        }
    };

    useEffect(() => {
        get_appointment_slot();
    }, []);

    return ( 
        <>
            <div className="home">
                <div className="featured" style={{ marginTop: "10px" }}>
                    <div className="featuredItem">
                        <h3>Appointment Report</h3>
                        <center>
                            <Chart options={data.options} series={data.series} type="line" width="100%" height="300px"/>
                        </center>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Reporttable;
