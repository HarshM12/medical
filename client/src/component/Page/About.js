import React from "react";
import '../Css/bootstrap.css';
import '../Css/theme.css';
import '../Css/maicons.css';
import doctor1 from '../../img/doctors/doctor_1.jpg'
import doctor2 from '../../img/doctors/doctor_2.jpg'
import doctor3 from '../../img/doctors/doctor_3.jpg'
import Blog1 from '../../img/blog/blog_1.jpg'
import person1 from '../../img/person/person_1.jpg'
import blog2 from '../../img/blog/blog_2.jpg';
import person2 from '../../img/person/person_2.jpg';
import blog3 from '../../img/blog/blog_3.jpg';
import person3 from '../../img/person/person_3.jpg';
import { Link } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import bg_doctor from '../../img/bg-doctor.png'
import bg_image_1 from '../../img/bg_image_1.jpg';


const About = () => {
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

            <div class="page-banner overlay-dark bg-image" style={{ backgroundImage: `url(${bg_image_1})` }}>
                <div class="banner-section">
                    <div class="container text-center wow fadeInUp">
                        <nav aria-label="Breadcrumb">
                            <ol class="breadcrumb breadcrumb-dark bg-transparent justify-content-center py-0 mb-2">
                                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li class="breadcrumb-item active" aria-current="page">About</li>
                            </ol>
                        </nav>
                        <h1 class="font-weight-normal">About Us</h1>
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



            <Footer />

        </>

    );
}

export default About;