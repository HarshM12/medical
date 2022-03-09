import React from "react";
import '../Css/bootstrap.css';
import '../Css/theme.css';
import '../Css/maicons.css';
import Header from "./Header";
import { Link } from 'react-router-dom';
import Blog1 from '../../img/blog/blog_1.jpg'
import person1 from '../../img/person/person_1.jpg'
import blog2 from '../../img/blog/blog_2.jpg';
import person2 from '../../img/person/person_2.jpg';
import blog3 from '../../img/blog/blog_3.jpg';
import person3 from '../../img/person/person_3.jpg';
import Footer from "./Footer";
import bg_image_1 from '../../img/bg_image_1.jpg';

const Blog = () => {
    return (
        <>
            <Header />
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
                <div className="container">


                    <Link className="navbar-brand" to="/"><span className="text-primary">Virtual </span>-Medical Home</Link>
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
                                <li class="breadcrumb-item active" aria-current="page">Blog</li>
                            </ol>
                        </nav>
                        <h1 class="font-weight-normal">Blog </h1>
                    </div> 
                </div> 
            </div> 


            <div className="page-section bg-light">
                <div className="container">
                    <h1 className="text-center wow fadeInUp">Blog Section</h1>
                    <div className="row mt-5">
                        <div className="col-lg-4 py-2 wow zoomIn">
                            <div className="card-blog">
                                <div className="header">
                                    <div className="post-category">
                                        <a href="#">Covid19</a>
                                    </div>
                                    <a href="blog-details.html" className="post-thumb">
                                        <img src={Blog1} alt="" />
                                    </a>
                                </div>
                                <div className="body">
                                    <h5 className="post-title"><a href="blog-details.html">List of Countries without Coronavirus case</a></h5>
                                    <div className="site-info">
                                        <div className="avatar mr-2">
                                            <div className="avatar-img">
                                                <img src={person1} alt="" />
                                            </div>
                                            <span>Roger Adams</span>
                                        </div>
                                        <span className="mai-time"></span> 1 week ago
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 py-2 wow zoomIn">
                            <div className="card-blog">
                                <div className="header">
                                    <div className="post-category">
                                        <a href="#">Covid19</a>
                                    </div>
                                    <a href="blog-details.html" className="post-thumb">
                                        <img src={blog2} alt="" />
                                    </a>
                                </div>
                                <div className="body">
                                    <h5 className="post-title"><a href="blog-details.html">Recovery Room: News beyond the pandemic</a></h5>
                                    <div className="site-info">
                                        <div className="avatar mr-2">
                                            <div className="avatar-img">
                                                <img src={person2} alt="" />
                                            </div>
                                            <span>Roger Adams</span>
                                        </div>
                                        <span className="mai-time"></span> 4 weeks ago
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 py-2 wow zoomIn">
                            <div className="card-blog">
                                <div className="header">
                                    <div className="post-category">
                                        <a href="#">Covid19</a>
                                    </div>
                                    <a href="blog-details.html" className="post-thumb">
                                        <img src={blog3} alt="" />
                                    </a>
                                </div>
                                <div className="body">
                                    <h5 className="post-title"><a href="blog-details.html">What is the impact of eating too much sugar?</a></h5>
                                    <div className="site-info">
                                        <div className="avatar mr-2">
                                            <div className="avatar-img">
                                                <img src={person3} alt="" />
                                            </div>
                                            <span>Diego Simmons</span>
                                        </div>
                                        <span className="mai-time"></span> 2 months ago
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 text-center mt-4 wow zoomIn">
                            <Link to="#" className="btn btn-primary">Read More</Link>
                        </div>

                    </div>
                </div>
            </div>
            

            <Footer />
        </>
    );

}

export default Blog;