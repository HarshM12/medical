import React, { useEffect, useState } from "react";
import '../../Css/admin/Doctortable.css';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';


const Appointmenttable = () => {
    const [appointment_data, setAppointmentData] = useState(0);
    const getAppointmentData = async () => {
        const res = await fetch('/appointment', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        if (result) {
            console.log("test");
            if (appointment_data != result) {
                console.log(JSON.stringify(result[0]));
                setAppointmentData(result);
            }
        } else {
            return false;
        }
    };

    useEffect(() => {
        console.log("executed only once!");
        getAppointmentData();
    }, []);

    const slots = [
        {
            "index": 1,
            "start_time": "9 : 00",
            "end_time": "9 : 30"
        },
        {
            "index": 2,
            "start_time": "9 : 30",
            "end_time": "10 : 00"
        },
        {
            "index": 3,
            "start_time": "10 : 00",
            "end_time": "10 : 30"
        },
        {
            "index": 4,
            "start_time": "10 : 30",
            "end_time": "11 : 00"
        },
        {
            "index": 5,
            "start_time": "11 : 00",
            "end_time": "11 : 30"
        },
        {
            "index": 6,
            "start_time": "11 : 30",
            "end_time": "12 : 00"
        },
        {
            "index": 7,
            "start_time": "12 : 00",
            "end_time": "12 : 30"
        },
        {
            "index": 8,
            "start_time": "12 : 30",
            "end_time": "1 : 00"
        },
        {
            "index": 9,
            "start_time": "1 : 00",
            "end_time": "1 : 30"
        },
        {
            "index": 10,
            "start_time": "1 : 30",
            "end_time": "2 : 00"
        },
        {
            "index": 11,
            "start_time": "2 : 00",
            "end_time": "2 : 30"
        },
        {
            "index": 12,
            "start_time": "2 : 30",
            "end_time": "3 : 00"
        },
        {
            "index": 13,
            "start_time": "3 : 00",
            "end_time": "3 : 30"
        },
        {
            "index": 14,
            "start_time": "3 : 30",
            "end_time": "4 : 00"
        },
        {
            "index": 15,
            "start_time": "4 : 00",
            "end_time": "4 : 30"
        },
        {
            "index": 16,
            "start_time": "4 : 30",
            "end_time": "5 : 00"
        }
    ];

    const removeAppointment = async (appointment_data) => {
        console.log(appointment_data._id);
        if (window.confirm("Are you sure you want to delete this Appointment?")) {
            let data = { id: appointment_data._id };
            const res = await fetch(`/appointment/${appointment_data._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const response = await res.json();
            console.log(response);
            if (res.status === 200 || !response) {
                getAppointmentData();
            }
            else {
                console.log("Fail");
            }
        }
    };

    return (
        <>
            <div className="home">
                <div className="featured" style={{ marginTop: "10px" }}>
                    <div className="featuredItem">
                        <table class="table align-middle text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Appointment ID</th>
                                    <th scope="col">Doctor Name</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Appointment Date</th>
                                    <th scope="col">Appointment Time</th>
                                    <th scope="col">Mode</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointment_data && appointment_data.map((appointment) => {
                                    let slot_time = slots[appointment.slot];
                                    return (
                                        <tr>
                                            <td>{appointment._id}</td>
                                            <td>Dr.{appointment.doctor.fname} {appointment.doctor.lname}</td>
                                            <td>{appointment.patient.fname}</td>
                                            <td>{appointment.date}</td>
                                            <td>{slot_time.start_time} - {slot_time.end_time}</td>
                                            <td>{appointment.mode}</td>
                                            <td>
                                                <div className="btn-group">
                                                    <button className="btn btn-outline-primary btn-sm ml-2" ><i class="fa fa-pencil mr-1"></i></button>
                                                    <button className="btn btn-outline-danger btn-sm " onClick={() => removeAppointment(appointment)}> <i class="fa fa-trash mr-1"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Appointmenttable;