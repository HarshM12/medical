import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom';
import profilePic from '../../img/person/person_4.png';
import { TextField, Card } from "@mui/material";
import '../Css/patientprofile.css'
import { Button } from 'react-bootstrap';
import { Modal } from "react-bootstrap";
import UserProfile from "./UserProfile";

const PatientProfile = () => {
    const [Payment, setpayment] = useState(false);
    const [show, setShow] = useState(false);
    const [Patient_details, setPatientDetails] = useState(false);
    const user_details = UserProfile.getName();
    var [edit_user, setEditUserData] = useState({});

    const getPatientDetails = async () => {
        const res = await fetch('/patient/' + user_details.id, {
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
            console.log(JSON.stringify(result));
            setPatientDetails(result);
             console.log(JSON.stringify(Patient_details));

        } else {
            return false;
        }
    };
    const EditProfile = (Patient_details) => {
        console.log(JSON.stringify(Patient_details));
        setEditUserData(Patient_details);
        setShow(true);
    };
    const UpdateProfile = async () => {
        const res = await fetch('/patient/' + user_details.id, {
            credentials: "same-origin",
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(edit_user)
        });
        let result = await res.json();
        console.log(result)
        if (result) {
            console.log("Data:" + JSON.stringify(result));
            setPatientDetails(Patient_details);
            getPatientDetails();
            setShow(false);
            alert("Your profile information updated successfully.")
        } else {
            return false;
        }
    };
    useEffect(() => {
        console.log("executed only once!");
        getPatientDetails();
    }, []);

    return (
        <>
            <Header />
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
                <div className="container">

                    <div className="collapse navbar-collapse" id="navbarSupport">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/Doctorlist" action className="nav-link" >Doctorlist</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/PatientPanel' action className="nav-link">Appointment</Link>
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
            <br></br>

            <Card style={{ backgroundColor: "whitesmoke" }}>


                <div className="container emp-profile">
                    <form method="">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={profilePic} alt="profile" style={{ borderRadius: "10px", height: "180px" }}></img>
                                <div className="btn1 btn1--link" type="file" style={{ marginLeft: "-10px" }} >Update Profile Photo</div>
                            </div>
                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h3>{Patient_details && Patient_details.fname} {Patient_details && Patient_details.lname}</h3>

                                    <ul className="nav nav" role="tablist" style={{ marginTop: "40px" }}>
                                        <li className="nav-item">
                                            <h1>  <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab"> Personal Information</a></h1>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="btn1 btn1--link" onClick={() => EditProfile(Patient_details)}>Edit Profile</div>
                                <div className="btn1 btn1--link" onClick={() => setpayment(true)} style={{ marginTop: "-15px" }}>Payment History</div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-4">

                            </div>
                            <div className="col-md-8 pl-5 about-info">
                                <div className="tab-content profile-tab" id="mytab content">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" >
                                        <div className="row" style={{ marginTop: "-55px" }}>
                                            <div className="col-md-6">
                                                <label>Patient ID</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{Patient_details && Patient_details._id}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{Patient_details && Patient_details.fname} {Patient_details && Patient_details.lname}</p>
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Date Of Birth</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{Patient_details && Patient_details.date}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Gender</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{Patient_details && Patient_details.gender}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Address</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{Patient_details && Patient_details.address}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{Patient_details && Patient_details.email}</p>
                                            </div>
                                        </div><br /><br /><br />
                                    </div>

                                </div>

                            </div>
                        </div>


                        {/* Payment */}
                        <Modal
                            show={Payment}
                            onHide={() => setpayment(false)}
                            dialogClassName="modal-90w"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title">
                                    Payment Histoy
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="col-md-8 pl-5 about-info">
                                    <div className="tab-content profile-tab" id="mytab content">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" >

                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <label>Payment ID</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <p>Doctor Name</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p>Payment Amount</p>
                                                </div>

                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <label>60bf54124</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <p>Harsh</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p>200 INR</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <label>34dcv534</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <p>Hemil</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p>200 INR</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <label>64hncjd3</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <p>Hemil</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p>200 INR</p>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <label>65bf5676</label>
                                                </div>
                                                <div className="col-md-4">
                                                    <p>Neel</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <p>200 INR</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>

                        {/* Edit Profile */}
                        <Modal
                            show={show}
                            onHide={() => setShow(false)}
                            dialogClassName="modal-dialog modal-md"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="example-custom-modal-styling-title">
                                    Edit Your Profile
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="tab-content profile-tab" id="mytab content">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" >
                                        <div className="container">
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <label>First Name</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <TextField id="standard-basic" onChange={(e) => setEditUserData({ fname: e.target.value })} value={edit_user && edit_user.fname} className="form-control" variant="standard" autoComplete="off" placeholder="Enter First Name" />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <label>Last Name</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <TextField id="standard-basic" onChange={(e) => setEditUserData({ lname: e.target.value })} value={edit_user && edit_user.lname} className="form-control" variant="standard" autoComplete="off" />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <label>Date Of Birth</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <TextField id="standard-basic" className="form-control" onChange={(e) => setEditUserData({ date: e.target.value })} value={edit_user && edit_user.date} type="date" style={{ marginTop: "-5px" }} variant="standard" autoComplete="off" />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <label>Address</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <TextField id="standard-basic" onChange={(e) => setEditUserData({ address: e.target.value })} value={edit_user && edit_user.address}  className="form-control" variant="standard" autoComplete="off" />
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-4">
                                                    <label>Email</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <TextField id="standard-basic" onChange={(e) => setEditUserData({ email: e.target.value })} value={edit_user && edit_user.email} className="form-control" variant="standard" autoComplete="off" />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                </div>
                                                <div className="col-md-8">
                                                <Button variant="outline-success" onClick={(e) => UpdateProfile()}>Save Change</Button>{' '}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </form>
                </div>
            </Card>


        </>
    )
}

export default PatientProfile;
