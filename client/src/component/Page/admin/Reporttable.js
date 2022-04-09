import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

const Reporttable = () => {
    const [appoinment_report_data, setAppointmentReportData] = useState();
    const [doctor_appoinment_report_data, setDoctorAppointmentReportData] = useState();
    console.log(appoinment_report_data)
    const slots = [
        {
            id: 1,
            Slot: 1,
            start_time: "9 : 00",
            end_time: "9 : 30"
        },
        {
            id: 2,
            Slot: 2,
            start_time: "9 : 30",
            end_time: "10 : 00"
        },
        {
            id: 3,
            Slot: 3,
            start_time: "10 : 00",
            end_time: "10 : 30"
        },
        {
            id: 4,
            Slot: 4,
            start_time: "10 : 30",
            end_time: "11 : 00"
        },
        {
            id: 5,
            Slot: 5,
            start_time: "11 : 00",
            end_time: "11 : 30"
        },
        {
            id: 6,
            Slot: 6,
            start_time: "11 : 30",
            end_time: "12 : 00"
        },
        {
            id: 7,
            Slot: 7,
            start_time: "12 : 00",
            end_time: "12 : 30"
        },
        {
            id: 8,
            Slot: 8,
            start_time: "12 : 30",
            end_time: "1 : 00"
        },
        {
            id: 9,
            Slot: 9,
            start_time: "1 : 00",
            end_time: "1 : 30"
        },
        {
            id: 10,
            Slot: 10,
            start_time: "1 : 30",
            end_time: "2 : 00"
        },
        {
            id: 11,
            Slot: 11,
            start_time: "2 : 00",
            end_time: "2 : 30"
        },
        {
            id: 12,
            Slot: 12,
            start_time: "2 : 30",
            end_time: "3 : 00"
        },
        {
            id: 13,
            Slot: 13,
            start_time: "3 : 00",
            end_time: "3 : 30"
        },
        {
            id: 14,
            Slot: 14,
            start_time: "3 : 30",
            end_time: "4 : 00"
        },
        {
            id: 15,
            Slot: 15,
            start_time: "4 : 00",
            end_time: "4 : 30"
        },
        {
            id: 16,
            Slot: 16,
            start_time: "4 : 30",
            end_time: "5 : 00"
        }
    ];
    const [values, setValues] = useState();
    
    const get_appointment_slot = async () => {
        const res = await fetch('/dashboard/get_appointment_slot', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        console.log(result)
        console.log("slots" + JSON.stringify(slots));
        if (result) {
            console.log(result[0]);
            console.log("result:" + JSON.stringify(result));
            setAppointmentReportData(result);
            let data = [];
            for (let i = 1; i <= 16; i++) {
                let temp = slots[i-1];
                temp["total"] = 0;
                result.forEach(appointment => {
                    if (i == appointment._id) {
                        temp["total"] = appointment.count
                    }
                });
                data.push(temp);
            }
            setValues(data);
            console.log("values:" + data);
        } else {
            return false;
        }
    };

    const get_appointment_by_doctors = async () => {
        const res = await fetch('/dashboard/get_appointment_by_doctors', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        console.log(result)
        console.log("slots" + JSON.stringify(slots));
        if (result) {
            // console.log(result[0]);
            // console.log("Doctors:" + JSON.stringify(result));
            let data = [];
            result.forEach(doctor => {
                data.push({
                    id: doctor._id,
                    fname: doctor.fname,
                    lname: doctor.lname,
                    total_appointment: doctor.total_appointment
                })                                
            });
            setDoctorAppointmentReportData(data);
            console.log("report:" + JSON.stringify(data));
        } else {
            return false;
        } 
    };

    useEffect(() => {
        get_appointment_slot();
        get_appointment_by_doctors();
    }, []);

    return (
        <>
            <div className="home">
                <div className="featured" style={{ marginTop: "10px" }}>
                    <div className="featuredItem">
                        <h3>Total Slots Reports</h3>
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid
                                columns={[
                                    { field: 'Slot'},
                                    { field: 'start_time' },
                                    { field: 'end_time' },
                                    { field: 'total' },
                                  ]}
                                  rows={values}
                                  components={{
                                    Toolbar: GridToolbar,
                                  }}
                            />
                        </div>
                    </div>
                </div>
                <div className="featured" style={{ marginTop: "10px" }}>
                    <div className="featuredItem">
                        <h3>Appointment-wise Doctor Report</h3>
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid
                                columns={[
                                    { field: '_id', hide: true},
                                    { field: 'fname'},
                                    { field: 'lname' },
                                    { field: 'total_appointment' },
                                  ]}
                                  rows={doctor_appoinment_report_data}
                                  components={{
                                    Toolbar: GridToolbar,
                                  }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reporttable;
