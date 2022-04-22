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
import Checkbox from '@mui/material/Checkbox';
import UserProfile from './UserProfile';

const Login = () => {
    const navigate = useNavigate();
    const [User, setuser] = useState({
        email: "", password: "" , role:""
    });
    let name, value;
    const hendleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setuser({ ...User, [name]: value });
    }

    const Data = async (e) => {
        e.preventDefault();
        const { email, password , full_name} = User;
        const res = await fetch('/Login', {
            credentials: "same-origin",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password 
            })
        });
 
        const Login  = await res.json();
        const data = Login.data;

        if(res.status === 400 || !Login){
            window.alert("Invalid Login Details:");
            console.log("Invalid Login Details:");
        }else{
            // window.alert("Login Details:");
            console.log(data); 
            if(data.role == "Doctor"){
                UserProfile.setName(data.id, data.full_name, data.role);
                window.alert("You Have scessfully Login")
                window.location.assign("/");
            }else if(data.role == "Patient"){
                UserProfile.setName(data.id, data.full_name, data.role);
                window.alert("You Have scessfully Login")
                window.location.assign("/");
            }else if(data.role == "Admin"){
                UserProfile.setName(null, null, data.role);
                window.alert("You Have scessfully Login")
                window.location.assign("/");
            }else{
                alert("Invalid Credentials");
            }
        }
    
    }

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

            <Card sx={{ maxWidth: 1100 }} style={{ marginTop: "20px", marginLeft: "220px", backgroundColor: "whitesmoke" }}>

                <h1 className="subhead" style={{ color: "black", letterSpacing: "8px", textAlign: "center", marginTop: "20px" }}>LogIn To your Account</h1><br></br>

                <form method="POST">
                    <TextField id="outlined-basic" name="email" label="Enter Your User Name" variant="outlined" style={{ marginLeft: "270px", marginTop: "10px", width: "490px" }} value={User.email} onChange={hendleInput} autoComplete="off" required />
                    <br />
                    <TextField id="outlined-basic" type="password" name="password" label="Enter Your Password" variant="outlined" style={{ marginLeft: "270px", marginTop: "10px", width: "490px" }} value={User.password} onChange={hendleInput} autoComplete="off"  required/>
                    <br />
                    {/* <FormControlLabel control={<Checkbox />} label="Rember Password" style={{ marginLeft: "260px", marginTop: "-20px", width: "490px" }} /> */}
                    

                    <input className="btn btn-primary" type="submit"  style={{ marginLeft: "270px",width:"490px" , marginTop:"10px" }} onClick={Data} autoComplete="off" /><br/>
                    <Link to="/ForgotPassword" style={{marginLeft: "270px",marginLeft:"630px"}}>Forgot Password?</Link>

                </form>


                <br />
            </Card>
            <br />

            <Footer />

        </>
    );
}

export default Login;