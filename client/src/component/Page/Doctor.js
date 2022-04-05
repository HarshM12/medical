import React, { useEffect, useState } from "react";
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
import { Link } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import bg_image_1 from '../../img/bg_image_1.jpg';


const Doctor = () => {
    const [doctors, setdoctor] = useState(0);

    const getdoctor = async (doctor) => {
        console.log("start get data............");
        const res = await fetch('/doctor', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        console.log(result)
        if (result) {
            console.log("test");
            if (doctor != result) {
                console.log(result[0]);
                setdoctor(result);
            }
        } else {
            return false;
        }
    };
    useEffect(() => {
        console.log("executed only once!");
        getdoctor();
    }, []);
    return (
        <>
            <Header />
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
                <div className="container">


                    <Link className="navbar-brand" to="/"><span className="text-primary">Virtual </span>-Medical <span className="text-primary"> Home</span></Link>
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

            <div class="page-banner overlay-dark bg-image" style={{ backgroundImage: `url(${bg_image_1})` }}>
                <div class="banner-section">
                    <div class="container text-center wow fadeInUp">
                        <nav aria-label="Breadcrumb">
                            <ol class="breadcrumb breadcrumb-dark bg-transparent justify-content-center py-0 mb-2">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">Doctors</li>
                            </ol>
                        </nav>
                        <h1 class="font-weight-normal">Our Doctors</h1>
                    </div>
                </div>
            </div>

            <div className="page-section">
                <div className="container">
                    <h1 className="text-center mb-5 wow fadeInUp">Our Doctors</h1>
                    <div className="container">
                        <div className="row">
                            {doctors && doctors.map((doctor) => {
                                return (
                                    <div className="col-md-4">
                                        <div className="item">
                                            <div className="card-doctor">
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
            </div>




            <Footer />


        </>

    );

}

export default Doctor;
