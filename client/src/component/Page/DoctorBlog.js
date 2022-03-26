import React, { useState } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom';
import { TextField, Card } from "@mui/material";
import { Button } from 'reactstrap';

import UserProfile from "./UserProfile";
import '../Css/blog.css'
import ReadMore from "./ReadMore";

const id  = UserProfile
console.error("Id"+ JSON.stringify(id))

const DoctorBlog = () => {
    const Name = UserProfile.getName();
    console.log(Name.id);
    const [blog, setblog] = useState({
        title: "", details: "", doctor: Name.id 
    });
    console.log(JSON.stringify(blog));
    console.log(blog.title)
    console.log(blog.details)
    let name, value;
    const hendleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setblog({ ...blog, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();
        const data = blog;
        if (data.title == "" || data.details == "") {
            window.alert("Please FillUp Data")

        } else {
            const res = await fetch('/blog/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const response = await res.json();
            console.log("0----------------")
            console.log(JSON.stringify(response))
            console.log("0----------------")

            if (res.status === 400 || !response) {
                console.log("Invalid");
            } else {
                window.alert("Blog Uploaded Sucessfully")
                console.log("Blog Uploaded Sucessfully")
            }
        }
    }
    return (
        <>
            <Header />
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
                <div className="container">
                    <h5>{Name.name}</h5>

                    <div className="collapse navbar-collapse" id="navbarSupport">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to='/Doctorpanel' action className="nav-link">Appointment</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/DoctorProfile" action className="nav-link" >Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/DoctorBlog" action className="nav-link">Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Logout" className="btn btn-primary ml-lg-3">Log Out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="page-section">
                <div class="container">
                    <h1 class="text-center wow fadeInUp">Blog</h1>

                    <form class="contact-form mt-5">
                        <div class="row mb-3">

                            <div class="col-12 py-2 wow fadeInUp">
                                <label for="subject">Blog Title</label>
                                <input type="text" name="title" id="subject" class="form-control" placeholder="Enter Blog Title.." value={blog.title} onChange={hendleInput} />
                            </div>
                            <div class="col-12 py-2 wow fadeInUp">
                                <label for="message">Blog Description</label>
                                <textarea id="message" class="form-control" name="details" rows="8" placeholder="Blog Discription.." value={blog.details} onChange={hendleInput}></textarea>
                            </div>
                        </div>
                        <Button outline color="primary" onClick={PostData}>Add Blog</Button>
                    </form>
                </div>
            </div>
            {/* blog  */}
            <div className="container">
                <h1 className="m-5 text-center">MY BLOGS</h1>
                <hr />
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="blog_card">
                            <div className="blog_card_image">
                                {/* <img src="https://abhishekdana1999.github.io/Mywebsite/img/blog_1.png" alt=""> */}
                            </div>
                            <div className="blog_card_content">
                                <h3>Here Comes The Blog Title.</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia provident voluptatem.</p>
                                <Link to='/ReadMore' >Read More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="blog_card">
                            <div className="blog_card_image">
                                {/* <img src="https://abhishekdana1999.github.io/Mywebsite/img/blog_2.png" alt=""> */}
                            </div>
                            <div className="blog_card_content">
                                <h3>Here Comes The Blog Title.</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia provident voluptatem.</p>
                                <a href="https://abhishekdana1999.github.io/Mywebsite/blog/login-page.html"><h6>Read More</h6></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="blog_card">
                            <div className="blog_card_image">
                                {/* <img src="https://abhishekdana1999.github.io/Mywebsite/img/blog_1.png" alt=""> */}
                            </div>
                            <div className="blog_card_content">
                                <h3>Here Comes The Blog Title.</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia provident voluptatem.</p>
                                <a href="https://abhishekdana1999.github.io/Mywebsite/blog/login-page.html"><h6>Read More</h6></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default DoctorBlog;
