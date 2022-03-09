import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from 'react-router-dom';
import '../Css/bootstrap.css';
import '../Css/theme.css';
import '../Css/maicons.css';
import { TextField, Card } from "@mui/material";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const PatientRegister = () => {

    const navigate = useNavigate();

    const [Patient, setPatient] = useState({
        fname: "", lname: "", date: "", gender: "", address: "", mobile: "", email: "", password: "", role: "Patient"
    })

    let name, value;
    const hendleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setPatient({ ...Patient, [name]: value });
    }

    const PostDate = async (e) => {
        e.preventDefault();
        const { fname, lname, date, gender, address, mobile, email, password, role } = Patient;
        const res = await fetch('/PatientRegister', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, lname, date, gender, address, mobile, email, password, role
            })
        });

        console.log(Patient)
        const response = await res.json(); 
        if (res.status === 201 || !response) {
            window.alert("Registration Successfull")
            console.log("Registration Successfull");
            navigate('/Login');
        }
        else {
            window.alert("Invalid Registration Details:");
            console.log("Invalid Registration Details:");
        }

    }

    const isNumber = (evt) => {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }

    return (
        <>
            <Header />
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
                <div className="container">


                    <Link className="navbar-brand" to="/"><span className="text-primary">Virtual</span>-Medical Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupport" aria-controls="navbarSupport" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupport">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to='/' action className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/About' action className="nav-link">About Us</Link>

                            </li>
                            <li className="nav-item">
                                <Link to="/Doctor" action className="nav-link">Doctors</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Blog" action className="nav-link" >Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Contact" action className="nav-link">Contact</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Login" className="btn btn-primary ml-lg-3">Login</Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>

            <Card sx={{ maxWidth: 1100 }} style={{ marginTop: "20px", marginLeft: "220px", backgroundColor: "whitesmoke" }}>

                <h1 className="subhead" style={{ color: "black", letterSpacing: "8px", textAlign: "center", marginTop: "20px" }}>Please Fill Up The Form</h1><br></br>

                <form method="POST">
                    <TextField id="outlined-basic" name="fname" label="Enter Your First Name" variant="outlined" style={{ marginLeft: "270px", marginTop: "10px", width: "490px" }} value={Patient.fname} onChange={hendleInput} autoComplete="off" onKeyPress={(event) => { if (!/[A-Za-z]/.test(event.key)) {event.preventDefault();}}} required  />
                    <br />
                    <TextField id="outlined-basic" name="lname" label="Enter Your Last Name" variant="outlined" style={{ marginLeft: "270px", marginTop: "10px", width: "490px" }} value={Patient.lname} onChange={hendleInput} autoComplete="off" onKeyPress={(event) => { if (!/[A-Za-z]/.test(event.key)) {event.preventDefault();}}} required />
                    <br /> 
                    <TextField id="outlined-basic" name="date" type="date" variant="outlined" style={{ marginLeft: "270px", marginTop: "25px", width: "490px" }} value={Patient.date} onChange={hendleInput} autoComplete="off" required />
                    <br />
                    <FormControl component="fieldset" style={{ marginLeft: "270px", marginTop: "25px", width: "490px" }} required>
                        <FormLabel component="legend">Chooes Your Gender</FormLabel>
                        <RadioGroup value={Patient.gender} onChange={hendleInput} name="gender" autoComplete="off">
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" style={{ marginTop: "-50px", marginLeft: "100px" }} />
                            <FormControlLabel value="other" control={<Radio />} label="Other" style={{ marginTop: "-50px", marginLeft: "200px" }} />
                        </RadioGroup>
                    </FormControl><br />
                    <TextField id="outlined-basic" multiline rows={5} name="address" label="address" variant="outlined" style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }} value={Patient.address} onChange={hendleInput} autoComplete="off" required />
                    <br />
                    <TextField id="outlined-basic" name="mobile" label="Mobile Number" variant="outlined" style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }} value={Patient.mobile} onChange={hendleInput} autoComplete="off" onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} required />
                    <br />
                    <TextField id="outlined-basic" name="email" label="Enter Your Email" type="email" variant="outlined" style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }} value={Patient.email} onChange={hendleInput} autoComplete="off" required />
                    <br />
                    <TextField id="outlined-basic" name="password" label="Enter Your Password" type="password" variant="outlined" style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }} value={Patient.password} onChange={hendleInput} autoComplete="off" required />
                    <br /><br />
                    <input className="btn btn-primary" type="submit" style={{ marginLeft: "270px" }} onClick={PostDate} /><br /><br />
                </form>
            </Card>

            <br />



            <Footer />

        </>
    );
}

export default PatientRegister;
