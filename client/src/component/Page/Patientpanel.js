import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom';
import '../Page/Doctorlist';
import '../Css/Patientpanel.css';
import TextField from '@mui/material/TextField';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, InputLabel, MenuItem, Card } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
	Button,
} from 'reactstrap';
import UserProfile from "./UserProfile";
import { Modal } from "react-bootstrap";


const Patientpanel = () => {
	const [PatientAppointment, setPatientAppointment] = useState({
		doctor: "", date: "", slot: "", mode: "", symptoms: ""
	})
	let name, value;
	const [appointment_data, setAppointmentData] = useState(0);
	const [doctors, setDoctorData] = useState(0);
	const [paymentData, setPaymentData] = useState("");
	const [show, setShow] = useState(false);

	console.log(appointment_data)
    
	const hendleInput = (e) => {
		name = e.target.name;
		value = e.target.value;
		// if(name == "slot"){
		// 	setPatientAppointment({ ...PatientAppointment, ["slot"]: value });
		// 	// setPatientAppointment({ ...PatientAppointment, ["appointment_time"]: e.target.id });
		// }else{
		setPatientAppointment({ ...PatientAppointment, [name]: value });
		// }
		console.log(PatientAppointment);
	}

	const PostData = async (e, paymentdata) => {
		e.preventDefault();
		const data = PatientAppointment;
		if (data.doctor == "" || data.date == "" || data.slot == "" || data.mode == "" || data.symptoms == "") {
			window.alert("Please FillUp Data")

		} else {
			data.patient = UserProfile.getName().id;
			const res = await fetch('/appointment/create', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});

			const response = await res.json();
			console.log(response)
			if (res.status === 400 || !response) {
				console.log("Appointment Cancle");
			} else {
				window.alert("Your Appointment Is Booked Sucessfully")
				console.log("Your Appointment Is Booked Sucessfully")
			}
		}
	}


	const getAppointmentData = async () => {
		console.log("start get data............");
		const res = await fetch('/appointment', {
			credentials: "same-origin",
			method: "GET",
			headers: {
				Accept: 'application/json',
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

	const getDoctorList = async () => {
		const data = { status: true };
		const res = await fetch('/doctor?status=true', {
			credentials: "same-origin",
			method: "GET",
			headers: {
				Accept: 'application/json',
				"Content-Type": "application/json"
			}
		});
		let result = await res.json();
		console.log(result)
		if (result) {
			console.log("test");
			setDoctorData(result);
		} else {
			return false;
		}
	};

	useEffect(() => {
		console.log("executed only once!");
		getAppointmentData();
		getDoctorList();
	}, []);

	const nme = UserProfile.getName();

	const slots = [];
	for (
		let i = new Date(new Date().setHours(9, 0, 0)).getTime(), index = 1;
		i < new Date(new Date().setHours(17, 0, 0)).getTime() - 60000;
		i = i + 1800000, index++
	) {
		let start_time = new Date(i);
		let end_time = new Date(new Date(i).getTime() + 1800000);
		let data = {
			index: index,
			start_time: `${start_time.getHours() > 12 ? start_time.getHours() % 12 : start_time.getHours()} : ${start_time.getMinutes() < 10 ? "00" : start_time.getMinutes()}`,
			end_time: `${end_time.getHours() > 12 ? end_time.getHours() % 12 : end_time.getHours()} : ${end_time.getMinutes() < 10 ? "00" : end_time.getMinutes()}`,
		}
		slots.push(data);
	}
	console.log(slots);

	const removeAppointment = async (PatientAppointment) => {
		console.log(PatientAppointment._id);
		if (window.confirm("Are you sure you want to delete this Appointment?")) {
			let data = { id: PatientAppointment._id };
			const res = await fetch(`/appointment/${PatientAppointment._id}`, {
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
	// Edit Appointment


	return (
		<>
			<Header />
			<nav className="navbar navbar-expand-lg navbar-light shadow-sm">
				<div className="container">
					<h5>
						{nme.name}
					</h5>

					<div className="collapse navbar-collapse" id="navbarSupport">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link to="/Doctorlist" action className="nav-link" >Doctorlist</Link>
							</li>
							<li className="nav-item">
								<Link to='#' action className="nav-link">Appointment</Link>
							</li>

							<li className="nav-item">
								<Link to="/PatientProfile" action className="nav-link">Profile</Link>
							</li>
							<li className="nav-item">
								<Link to="/Logout" className="btn btn-primary ml-lg-3">Log Out</Link>
							</li>
						</ul>
					</div>

				</div>
			</nav>

			<div className="container-fluid" style={{ paddingTop: "50px" }}>
				<div className="row">
					<div className="col-md-6">
						<div className="card p-3 ml-3 mr-3" style={{ backgroundColor: "whitesmoke" }}>
							<h1 className="mb-2" style={{ textAlign: "center" }}>Book Your Appointment Now</h1>
							{/* < button onClick={makePayment}>Pay Now</button > */}
							<form method="POST" style={{ marginLeft: "70px", marginTop: "15px" }} >
								<FormControl variant="standard" style={{ width: "80%" }}>
									<InputLabel id="demo-simple-select-standard-label">Select Doctor</InputLabel>
									<Select
										labelId="demo-simple-select-standard-label"
										id="demo-simple-select-standard"
										label="Add Doctor Category"
										name="doctor"
										value={PatientAppointment.doctor}
										onChange={hendleInput}
										required
									>
										{doctors && doctors.map((doctor) => {
											return (
												<MenuItem value={doctor._id}>Dr. {doctor.fname} {doctor.lname}</MenuItem>
											)
										})}
										{/* <MenuItem value={"621ef3024054bec96d731112"}>Dr. Nilam Patel</MenuItem>
										<MenuItem value={"621ef3024054bec96d731112"}>Dr. Hemil Sorathiya</MenuItem> */}
									</Select>
								</FormControl><br /><br />
								<TextField
									id="outlined-basic"
									name="date"
									type="date"
									variant="outlined"
									autoComplete="off"
									style={{ width: "80%" }}
									value={PatientAppointment.date}
									onChange={hendleInput} required
									InputProps={{
										inputProps: {
											min: new Date().toISOString().split('T')[0],
										}
									}}
								/>
								<br /><br />
								<FormControl variant="standard" style={{ width: "80%" }}>
									<InputLabel id="demo-simple-select-standard-label">Select Time Slot</InputLabel>
									<Select
										labelId="demo-simple-select-standard-label-slot"
										id="demo-simple-select-standard-slot"
										label="Select time slot"
										name="slot"
										value={PatientAppointment.slot}
										onChange={hendleInput}
										required
									>
										{(() => {
											const options = [];
											for (let i = 0; i < slots.length; i++) {
												if (i == 6 || i == 7) {
													continue;
												} else {
													options.push(
														<MenuItem value={i + 1} id={slots[i].start_time}>{`${slots[i].index} ---- ${slots[i].start_time} to ${slots[i].end_time} `}</MenuItem>
													);
												}
											}
											return options;
										})()}


										{/* {slots.map(slot => (
								<>
									<MenuItem value={0} id={slot.start_time}>{`${slot.index} ---- ${slot.start_time} to ${slot.end_time} `}</MenuItem>
								</>
						))} */}
									</Select>
								</FormControl><br /><br />

								<FormControl component="fieldset" style={{ width: "80%" }} required >
									<FormLabel component="legend">mode</FormLabel>
									<RadioGroup name="mode" autoComplete="off" value={PatientAppointment.mode} onChange={hendleInput}>
										<FormControlLabel value="online" control={<Radio />} label="online" />
										<FormControlLabel value="offline" control={<Radio />} label="offline" />
									</RadioGroup>
								</FormControl><br />
								<TextField id="outlined-basic" style={{ width: "80%" }} label="symptoms " name="symptoms" variant="outlined" autoComplete="off" value={PatientAppointment.symptoms} onChange={hendleInput} required />
								<br /><br />
								<Button variant="outlined" onClick={PostData} >Book Appointment</Button>&nbsp;&nbsp;
								{/* <Button variant="outlined" onClick={makpayment} >Payment</Button>&nbsp;&nbsp; */}
								<Button variant="outlined" >Reset</Button>
								<br />
								<br />
							</form>
						</div>
					</div>
					<div className="col-md-6">
						<div className="card p-3 ml-3 mr-3" style={{ backgroundColor: "whitesmoke" }}>
							<div className="row">
								<div className="col-md-12">
									<center>
										<h1>Appointment Details</h1>
									</center>
								</div>
								<div className="col-md-12 mt-4">
									<center>
										{appointment_data === "" ?
											<h6>You have No Appointment Yet!</h6>
											:
											<div>
												<table className="table table-hover">
													<thead>
														<tr>
															<th>Doctor Name</th>
															<th>Date</th>
															<th>Slot</th>
															<th>Symptoms</th>
															<th>Mode</th>
															<th></th>
														</tr>
													</thead>
													{appointment_data && appointment_data.map((appointment) => {
														return (
															<tr>
																<td>{appointment.doctor.fname} {appointment.doctor.lname}</td>
																<td>{appointment.date}</td>
																<td>{appointment.slot}</td>
																<td>{appointment.symptoms}</td>
																<td>{appointment.mode}</td>
																<td>
																	<div className="btn-group">
																		<button className="btn btn-outline-primary btn-sm ml-2" ><i class="fa fa-pencil mr-1"></i></button>
																		<button className="btn btn-outline-danger btn-sm ml-2 " onClick={() => removeAppointment(appointment)}> <i class="fa fa-trash mr-1"></i></button>
																	</div>
																</td>
															</tr>
														);
													})}
												</table>
											</div>
										}
									</center>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<br />
			



		</>
	);
}

export default Patientpanel;