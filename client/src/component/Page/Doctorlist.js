import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../Css/bootstrap.css';
import '../Css/theme.css';
import '../Css/maicons.css';
import doctor1 from '../../img/doctors/dummy_doctor.png'
import Blog1 from '../../img/blog/blog_1.jpg'
import person1 from '../../img/person/person_1.jpg'
import blog2 from '../../img/blog/blog_2.jpg';
import person2 from '../../img/person/person_2.jpg';
import blog3 from '../../img/blog/blog_3.jpg';
import person3 from '../../img/person/person_3.jpg';
import Header from "./Header";
import Footer from "./Footer";
import bg_image_1 from '../../img/bg_image_1.jpg';
import UserProfile from "./UserProfile";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import profilePic from '../../img/person/person_4.png';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
import { Button } from 'reactstrap';



const Doctorlist = () => {


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const Name = UserProfile.getName();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [doctors, setDoctorData] = useState(0)
    const [showDoctor, setShowDoctorData] = useState(0)

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



    const showDoctorDetail = async(doctor) => {
        setShowDoctorData(doctor);
        console.log(JSON.stringify(doctor));
        handleOpen(true);
    };

    // const showDoctorDetail = async(doctor) => {
    //     const data = { status: true };
    //     const res = await fetch(`/doctor/${doctor._id}`, {
    //         credentials: "same-origin",
    //         method: "GET",
    //         headers: {
    //             Accept: 'application/json',
    //             "Content-Type": "application/json"
    //         }
    //     });
    //     let result = await res.json();
    //     console.log(result)
    //     if (result) {
    //         console.log(JSON.stringify(result));
    //         showDoctor(result);
    //     } else {
    //         return false;
    //     }
    // };

    useEffect(() => {
        console.log("executed only once!");
        getDoctorList();
    }, []);

    return (
        <>
            <Header />
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
                <div className="container">
                    <h5>{Name.name}</h5>

                    <div className="collapse navbar-collapse" id="navbarSupport">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/Doctorlist" action className="nav-link" >Doctorlist</Link>
                            </li>
                            <li className="nav-item ">
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

            <div className="owl-carousel wow fadeInUp" id="doctorSlideshow">
                <div className="container">
                    <div className="row">
                        {doctors && doctors.map((doctor) => {
                            return (
                                <div className="col-md-4">
                                    <div className="item">
                                        <div className="card-doctor" onClick={() => showDoctorDetail(doctor)}>
                                            <div className="header" >
                                                <img src={doctor1} alt="" />
                                                <div className="meta">
                                                </div>
                                            </div>
                                            <div className="body">
                                                <p className="text-xl mb-0">Dr.{doctor.fname} {doctor.lname}</p>
                                                <span className="text-sm text-grey">{doctor.category.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                             Dr.Sagarika patel                     
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography> */}

                        <div className="row">
                            <div className="col-md-4">
                                <h5>Name</h5>
                            </div>
                            <div className="col-md-4">
                                <h5>Dr. {showDoctor.fname} {showDoctor.lname}</h5>
                            </div>
                            <img src={profilePic} alt="profile" style={{ borderRadius: "50px", height: "150px" }}></img>
                        </div>
                        <div className="row" style={{ marginTop: "-100px" }}>
                            <div className="col-md-4">
                                <h5>Gender</h5>
                            </div>
                            <div className="col-md-4">
                                <h5>{showDoctor.gender}</h5>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <h5>Age</h5>
                            </div>
                            <div className="col-md-4">
                                <h5>30 year Old</h5>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <h5>Address</h5>
                            </div>
                            <div className="col-md-4">
                                <h5>Surat</h5>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <h5>Category</h5>
                            </div>
                            <div className="col-md-4">
                                <h5>{showDoctor && showDoctor.category && showDoctor.category.name}</h5>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <h5>Degree</h5>
                            </div>
                            <div className="col-md-4">
                                <h5><PhotoOutlinedIcon /></h5>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <h5>Experience</h5>
                            </div>
                            <div className="col-md-4">
                                <h5>5 Year </h5>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-4">
                                <h5>Feedback</h5>
                            </div>
                            <div className="col-md-12">
                                <form>
                                    <textarea id="message" style={{ width: "500px" }} className="form-control mt-3" rows="5" placeholder="Enter Message.."></textarea>
                                    <Button outline color="primary mt-3">Submit</Button>
                                </form>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>

        </>
    )
}

export default Doctorlist;
