import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from 'react-router-dom';
import '../Css/bootstrap.css';
import '../Css/theme.css';
import '../Css/maicons.css';
import { TextField, Card } from "@mui/material";
// import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";


const Register = () => {

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
                                <Link to="/Register" className="btn btn-primary ml-lg-3">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Login" className="btn btn-primary ml-lg-3">Login</Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>




            <Card sx={{ maxWidth: 1100 }} style={{ marginTop: "20px", marginLeft: "220px", backgroundColor: "whitesmoke" }}>
                <div className="page-hero" style={{marginTop:"10px",height:"450px" }}>
                    <div className="hero-section">
                        <div className="container text-center wow zoomIn">
                        <h3 className="display-4" style={{color:"black",letterSpacing:"20px"}}>REGISTER</h3>
                            <span className="subhead" style={{color:"black",letterSpacing:"8px"}}>LET'S LIVE HEALTHY LIFE</span><br></br>
                            
                            <Link to="/Login" class="btn btn-primary" style={{color:"black",marginTop:"30px"}}>Admin</Link>
                            <Link to="/DoctorRegister" class="btn btn-primary" style={{color:"black",marginTop:"30px",marginLeft:"30px"}}>I am a Doctor</Link>
                            <Link to="/PatientRegister" class="btn btn-primary" style={{color:"black",marginTop:"30px",marginLeft:"30px"}}>I am a Patient</Link>
                        </div>
                    </div>
                </div>


            </Card><br />



            <Footer />

        </>
    );
}

export default Register;
