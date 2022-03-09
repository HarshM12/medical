import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom';
import { Card } from "@mui/material";
import '../Css/Doctorpanel.css'
import user1 from '../../img/user1.jpg';
import UserProfile from "./UserProfile";

const Doctorpanel = () => {

    const [appointment_data, setAppointmentData] = useState(0);

    const name = UserProfile.getName();
    const getAppointmentData = async () => {
        console.log("start get data............");
        const res = await fetch('/appointment', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        console.log(result)
        if (result) {
            console.log("test");
            if (appointment_data != result) {
                console.log(result[0]);
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
            <Header />
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
                <div className="container">
                    <h5>
                        {
                            name.name
                        }
                    </h5>
                    <div className="collapse navbar-collapse" id="navbarSupport">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item ">
                                <Link to='/Doctorpanel' action className="nav-link">Appointment</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/DoctorProfile" action className="nav-link" >Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/DoctorBlog" action className="nav-link">Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Logout" className="btn btn-primary ml-lg-3">Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br />
            <br />
            <section className="main-content">
                <div className="container">
                    <h1 style={{ marginTop: "-140px" }}>Appointment Details</h1>
                    <br />
                    <br />
                    <table class="table text-center">
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Status</th>
                                <th>Appointment</th>
                                <th>Mode</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        {appointment_data && appointment_data.map((appointment) => {
                            let slot_time = slots[appointment.slot];

                            return (
                                <>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="user-info">
                                                    <div class="user-info__img">
                                                        <img src={user1} alt="User Img" />
                                                    </div>
                                                    <div class="user-info__basic">
                                                        <h5 class="mb-0">{appointment.patient.fname}  {appointment.patient.lname}</h5>
                                                        <p class="text-muted mb-0">{appointment.patient.date},{appointment.patient.gender}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span class="btn btn-success">Done</span>
                                            </td>
                                            <td>
                                                <h6 class="mb-0">{slot_time.start_time} - {slot_time.end_time}</h6>
                                                <small>{appointment.date}</small>

                                            </td>
                                            <td>
                                                <h6 class="mb-0">{appointment.mode}</h6>
                                            </td>
                                            <td>
                                                <h6 class="mb-0">+91{appointment.patient.mobile}</h6>
                                                <a href="#!"><small>Contact</small></a>
                                            </td>
                                            <td>
                                                <div class="dropdown open">
                                                    <a href="#!" class="px-2" id="triggerId1" data-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                        <i class="fa fa-ellipsis-v"></i>
                                                    </a>
                                                    <div class="dropdown-menu" aria-labelledby="triggerId1">
                                                    <div onClick={() => removeAppointment(appointment)} className="dropdown-item text-danger"><i class="fa fa-trash mr-1"></i> Delete</div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>                          
                                    </tbody>
                                </>
                            )
                        })}







                    </table>
                </div>


            </section>



        </>
    );
}

export default Doctorpanel;