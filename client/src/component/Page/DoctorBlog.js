import React, { useState } from "react";
import Header from "./Header";
import { Link } from 'react-router-dom';
import { TextField, Card } from "@mui/material";
import {
    Button
} from 'reactstrap';
import UserProfile from "./UserProfile";
// import '../Css/blog.css'

const DoctorBlog = () => {
    const Name = UserProfile.getName();
    const [blog, setblog] = useState({
        title: "", details:""
    });
    let name, value;
    const hendleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setblog({ ...blog, [name]: value });
    }
    const PostData = async (e) => {
		e.preventDefault();
		const data = blog;
        console.log(data)
		if (!data.title || !data.details ) {
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
			console.log(response)
			if (res.status === 400 || !response) {
				console.log("Error");
			} else {
				window.alert("Blog Is Upload scessfully")
				console.log("Blog Is Upload scessfully")
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
            {/* <Card sx={{ maxWidth: 1100 }} style={{ marginTop: "20px", marginLeft: "220px", backgroundColor: "whitesmoke" }}>
                <h1 style={{ color: "gray", textAlign: "center", letterSpacing: "20px", marginTop: "20px", fontSize: "50px", fontWeight: "bolder",color:"black" }}>BLOG</h1><hr style={{ borderTop: "3px solid gray"}}/>
                <form>
                   <TextField id="outlined-basic" name="blog_title" label="Blog Title" variant="outlined" style={{marginLeft:"350px",width:"450px",textAlign:"center"}}  value={blog.blog_title} onChange={hendleInput} /><br/><br/>
                   <TextField id="outlined-basic" name="blog_date" type="date" label="" variant="outlined" style={{marginLeft:"350px",width:"450px",textAlign:"center"}} value={blog.blog_date} onChange={hendleInput}  /><br/><br/>
                   <TextField id="outlined-basic" name="blog_details"   rows={5}  label="Blog Discription" variant="outlined" style={{marginLeft:"350px",width:"450px",textAlign:"center"}} value={blog.blog_details} onChange={hendleInput}  /><br/><br/>
                   <Button outline color="primary" style={{marginLeft:"350px"}}>Submit</Button>
                   <Button outline color="danger" style={{marginLeft:"10px"}}>Reset</Button>
                </form><br/><br/><br/>
 
            </Card> */}

        </>
    )
}
export default DoctorBlog;
