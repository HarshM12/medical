import React, { useEffect, useState } from "react";
import '../Css/bootstrap.css';
import '../Css/theme.css';
import '../Css/maicons.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import bg_image_1 from '../../img/bg_image_1.jpg';
import bg_doctor from '../../img/bg-doctor.png'
import './Header';
import Header from "./Header";
import About from './About';
import Doctor from "./Doctor";
import doctor1 from '../../img/doctors/dummy_doctor.png'
import Blog1 from '../../img/blog/blog_1.jpg'
import person1 from '../../img/person/person_1.jpg'
import blog2 from '../../img/blog/blog_2.jpg';
import person2 from '../../img/person/person_2.jpg';
import blog3 from '../../img/blog/blog_3.jpg';
import person3 from '../../img/person/person_3.jpg';
import Footer from "./Footer";
import { Button } from 'reactstrap';
const Home = () => {
    const [doctors, setdoctor] = useState(0);
    const [blogs, setblogs] = useState("")

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

    const getBlogData = async () => {
        console.log("start get data............");
        const res = await fetch('/blog', {
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
            console.log(result[0]);
            setblogs(result);

        } else {
            return false;
        }
    };
    useEffect(() => {
        console.log("executed only once!");
        getBlogData();
    }, []);


    return (
        <>
            <Header />
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
                <div className="container">


                    <Link className="navbar-brand" to="#"><span className="text-primary">Virtual</span>-Medical<span className="text-primary"> Home</span></Link>
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

            <div className="page-hero bg-image overlay-dark" style={{ backgroundImage: `url(${bg_image_1})` }}>
                <div className="hero-section">
                    <div className="container text-center wow zoomIn">
                        <span className="subhead">Let's make your life happier</span>
                        <h1 className="display-4">Healthy Living</h1>
                        <Link to="/Doctor" class="btn btn-primary">Let's Consult</Link>

                    </div>
                </div>
            </div>


            <div className="bg-light">
                <div className="page-section py-3 mt-md-n5 custom-index">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-4 py-3 py-md-0">
                                <div className="card-service wow fadeInUp">
                                    <div className="circle-shape bg-secondary text-white">
                                        <span className="mai-chatbubbles-outline"></span>
                                    </div>
                                    <p><span>Chat</span> with a doctors</p>
                                </div>
                            </div>

                            <div className="col-md-4 py-3 py-md-0">
                                <div className="card-service wow fadeInUp">
                                    <div className="circle-shape bg-accent text-white">
                                        <span className="mai-basket"></span>
                                    </div>
                                    <p><span></span>Health Blog</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="page-section pb-0">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 py-3 wow fadeInUp">
                                <h1>Welcome to Your Virtual Health Center</h1>
                                <p className="text-grey mb-4">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Accusantium aperiam earum ipsa eius, inventore nemo labore eaque porro consequatur ex aspernatur. Explicabo, excepturi accusantium! Placeat voluptates esse ut optio facilis!</p>
                                <Link to="/" classNameName="btn btn-primary">Learn More</Link>
                                {/* <Routes>
                                    <Route path='/' element={<About/>} exact />
                                </Routes> */}
                            </div>
                            <div className="col-lg-6 wow fadeInRight" data-wow-delay="400ms">
                                <div className="img-place custom-img-1">
                                    <img src={bg_doctor} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doctor Selection */}


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

            {/* Blog Selection */}
            <div className="container">
                <h1 className="m-5 text-center">Blog Section</h1>
                <hr />
                <div className="row">
                    {blogs && blogs.map((d_blog) => {
                        return (
                            <>
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="blog_card">
                                        <div className="blog_card_image">
                                            {/* <img src="https://abhishekdana1999.github.io/Mywebsite/img/blog_1.png" alt=""> */}
                                        </div>
                                        <div className="blog_card_content">
                                            <h3 style={{marginTop:"-25px"}}><strong>{d_blog.title}</strong></h3>
                                            <p>{d_blog.details}</p>
                                            <Link to='/ReadMore' >Read More</Link>

                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })

                    }
                </div>
            </div>



           
            {/* contact with as */}

            <div class="page-section">
                <div class="container">
                    <h1 class="text-center wow fadeInUp">Get in Touch</h1>

                    <form class="contact-form mt-5">
                        <div class="row mb-3">
                            <div class="col-sm-6 py-2 wow fadeInLeft">
                                <label for="fullName">Name</label>
                                <input type="text" id="fullName" class="form-control" placeholder="Full name.." />
                            </div>
                            <div class="col-sm-6 py-2 wow fadeInRight">
                                <label for="emailAddress">Email</label>
                                <input type="text" id="emailAddress" class="form-control" placeholder="Email address.." />
                            </div>
                            <div class="col-12 py-2 wow fadeInUp">
                                <label for="subject">Subject</label>
                                <input type="text" id="subject" class="form-control" placeholder="Enter subject.." />
                            </div>
                            <div class="col-12 py-2 wow fadeInUp">
                                <label for="message">Message</label>
                                <textarea id="message" class="form-control" rows="8" placeholder="Enter Message.."></textarea>
                            </div>
                        </div>
                        <Button outline color="primary">Submit</Button>

                    </form>
                </div>
            </div>
            <Footer />


        </>

    );
}
export default Home;