import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link } from 'react-router-dom';
import '../Css/bootstrap.css';
import '../Css/theme.css';
import '../Css/maicons.css';
import { TextField, Card } from "@mui/material";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, InputLabel, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

const DoctorRegister = () => {
    const navigate = useNavigate();

    const [Doctor, setDoctor] = useState({
        fname: "", lname: "", category: "", gender: "", date: "", file: "", Address: "", Mobileno: "", email: "", password: "", role: "Doctor" , p_img:""
    });

    const [categories, setCategories] = useState();

    let name, value;
    const hendleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setDoctor({ ...Doctor, [name]: value });
    }

    const getCategory = async () => {
        const res = await fetch('/category', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response = await res.json();
        if (res.status === 200 || !response) {
            setCategories(response);
        }
        else {
            console.log("Fail");
        }
    };



    const PostDate = async (e) => {
        e.preventDefault();
        const { fname, lname, date, gender, Address, Mobileno, email, password, category, file, role , p_img } = Doctor;
        const res = await fetch('/DoctorRegister', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, lname, date, gender, Address, Mobileno, email, password, category, file, role , p_img
            })
        });
        console.log(res)
        const xyz = await res.json();
        if (res.status === 422 || !xyz) {
            window.alert("Invalid Registration Details:");
            console.log("Invalid Registration Details:");
        }
        else {
            window.alert("Registration Successfull")
            console.log("Registration Successfull");
            navigate('/Login');
        }

    }

    useEffect(() => {
        console.log("executed only once!");
        getCategory();
    }, []);

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

                <form>
                    <TextField id="outlined-basic" name="fname" label="Enter Your First Name" variant="outlined" style={{ marginLeft: "270px", marginTop: "10px", width: "490px" }} value={Doctor.fname} onChange={hendleInput} onKeyPress={(event) => { if (!/[A-Za-z]/.test(event.key)) { event.preventDefault(); } }} required />
                    <br />
                    <TextField id="outlined-basic" name="lname" label="Enter Your Last Name" variant="outlined" style={{ marginLeft: "270px", marginTop: "10px", width: "490px" }} value={Doctor.lname} onChange={hendleInput} onKeyPress={(event) => { if (!/[A-Za-z]/.test(event.key)) { event.preventDefault(); } }} required />
                    <br />
                    <FormControl variant="standard" style={{ marginLeft: "270px", marginTop: "10px", width: "200px" }} required>
                        <InputLabel id="demo-simple-select-standard-label">Choose Your Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={Doctor.category}
                            onChange={hendleInput}
                            label="Add Doctor Category"
                            name="category"
                        >
                            {categories && categories.map((category, index) => {
                                return (
                                    <MenuItem value={category._id}>{category.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl><br />
                    <FormControl component="fieldset" style={{ marginLeft: "270px", marginTop: "25px", width: "490px" }} required>
                        <FormLabel component="legend">Chooes Your Gender</FormLabel>
                        <RadioGroup value={Doctor.gender} onChange={hendleInput} name="gender">
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" style={{ marginTop: "-50px", marginLeft: "100px" }} />
                            <FormControlLabel value="other" control={<Radio />} label="Other" style={{ marginTop: "-50px", marginLeft: "200px" }} />
                        </RadioGroup>
                    </FormControl><br />

                    <TextField id="outlined-basic" name="date" type="date" variant="outlined" style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }} value={Doctor.date} onChange={hendleInput} required />
                    <br /><br />
                    <label style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }}>Uplod Degree Document*</label>
                    <TextField type="file" style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }} value={Doctor.file} onChange={hendleInput} name="file" /><br />
                    <label style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }}>Uplod Profile Image*</label>
                    <TextField type="file" style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }} value={Doctor.p_img} onChange={hendleInput} name="p_img" /><br />
                    <TextField id="outlined-basic" multiline rows={5} name="Address" label="Address" variant="outlined" style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }} value={Doctor.Address} onChange={hendleInput} required />
                    <br />
                    <TextField id="outlined-basic" name="Mobileno" label="Mobile Number" variant="outlined" style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }} value={Doctor.Mobileno} onChange={hendleInput} onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} required />
                    <br />
                    <TextField id="outlined-basic" name="email" label="Enter Your Email" type="email" variant="outlined" style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }} value={Doctor.email} onChange={hendleInput} required />
                    <br />
                    <TextField id="outlined-basic" name="password" label="Enter Your Password" type="password" variant="outlined" style={{ marginLeft: "270px", marginTop: "15px", width: "490px" }} value={Doctor.password} onChange={hendleInput} required />
                    <br /><br />
                    <input className="btn btn-primary" type="submit" style={{ marginLeft: "270px" }} onClick={PostDate} /><br /><br />
                </form><br />
            </Card><br></br><br />
            <Footer />

        </>
    );

}

export default DoctorRegister;