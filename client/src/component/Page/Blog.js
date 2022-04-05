import React,{useState , useEffect} from "react";
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
    const [blogs, setblogs] = useState("");
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
                                <li class="breadcrumb-item active" aria-current="page">Blog</li>
                            </ol>
                        </nav>
                        <h1 class="font-weight-normal">Blog </h1>
                    </div> 
                </div> 
            </div> 

            {/* Blog Section */}
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
                                            <h3>{d_blog.title}</h3>
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





            

            <Footer />
        </>
    );

}

export default Blog;