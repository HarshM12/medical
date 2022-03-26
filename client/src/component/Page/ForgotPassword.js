import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from 'react-router-dom';
import '../Css/bootstrap.css';
import '../Css/theme.css';
import '../Css/maicons.css';
import { TextField, Card } from "@mui/material";
import {Button} from 'react-bootstrap'
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import UserProfile from './UserProfile';


const ForgotPassword = () => {
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

                        </ul>
                    </div>

                </div>
            </nav>



            <Card className="card1">

                <h1 className="subhead" style={{ color: "black", letterSpacing: "8px", marginTop: "20px" }} > Forgot Your Password  </h1><br></br>
                <h6 className="note"> Please Enter The Email Address You Use to Ragister in to System</h6>

                <form method="POST">
                   
                   <TextField id="standard-basic" label="Enter Your Register Email Address" variant="standard" style={{marginLeft:"150px", width:"350px",marginTop:"10px"}}  /><br/>

                   <Link to="/OtpGenration" className="btn btn-primary" style={{ marginLeft:"150px" ,width:"350px",marginTop:"20px"}}>Get Otp
                   </Link>

                </form>
                <Link to="/Login" style={{marginLeft: "270px"}}>Back to Sign in</Link>
                <br />
                <br/>
            </Card>


            <Footer />

        </>
    )
}

export default ForgotPassword;
