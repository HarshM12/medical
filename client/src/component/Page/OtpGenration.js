import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from 'react-router-dom';
import '../Css/bootstrap.css';
import '../Css/theme.css';
import '../Css/maicons.css';
import { TextField, Card } from "@mui/material";
import { useNavigate } from 'react-router-dom';



const OtpGenration = () => {
    const navigate = useNavigate();
    const [otp, setotp] = useState({
        otp: ""
    });
    console.log(otp)
    let name, value;
    const hendleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setotp({ ...otp, [name]: value });
    }

    const verify_otp = async () => {
        const res = await fetch('/otpverify', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(otp)
        });
        const response = await res.json();
        console.log(response);
        

       if(res.status === 400){
           alert("Invalid OTP")
       }
       if(res.status===200){
           navigate("/ResetPassword")
       }else{
           alert("Invalid")
       }

    };




    return (
        <>
            <Header />
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
                <div className="container">


                    <Link className="navbar-brand" to="/"><span className="text-primary">Virtual</span>-Medical-<span className="text-primary">Home</span></Link>
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

                <h1 className="subhead" style={{ color: "black", letterSpacing: "8px", marginTop: "20px",textAlign:"center"}} > Enter OTP  </h1><br></br>
                <h6 className="note" style={{textAlign:"center"}}>Chek Your Email For OTP</h6>

                <form method="POST">

                    <TextField id="standard-basic" label="Enter OTP" name="otp" variant="standard" style={{ marginLeft: "240px", width: "350px", marginTop: "10px" }} onChange={hendleInput} value={otp.otp}  inputProps={{ maxLength: 6,}} /><br />

                    <div className="btn btn-primary" style={{ marginLeft: "240px", width: "350px", marginTop: "20px" }} onClick={verify_otp} >Submit</div>

                </form>
                <br />
            </Card>



            <Footer />

        </>
    )
}

export default OtpGenration;
