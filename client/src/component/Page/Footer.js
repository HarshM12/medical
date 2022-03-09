import react from "react";
import { Link } from 'react-router-dom';

const Footer = () =>{
    return(
        <>
        <footer className="page-footer">
                <div className="container">
                    <div className="row px-md-3">
                        <div className="col-sm-6 col-lg-3 py-3">
                            <h5>Company</h5>
                            <ul className="footer-menu">
                                <li><Link to="/About">About Us</Link></li>
                                {/* <li><Link to="#">Career</Link></li> */}
                            </ul>
                        </div>
                        <div className="col-sm-6 col-lg-3 py-3">
                            <h5>More</h5>
                            <ul className="footer-menu">
                                <li><Link to="#">Terms & Condition</Link></li>
                                <li><Link to="#">Privacy</Link></li>
                                <li><Link to="/DoctorRegister">Join as Doctors</Link></li>
                                <li><Link to="/PatientRegister">Join as Patient</Link></li>

                            </ul>
                        </div>
                        {/* <div className="col-sm-6 col-lg-3 py-3">
                            <h5>Our partner</h5>
                            <ul className="footer-menu">
                                <li><Link to="#">Fitness</Link></li>
                             
                            </ul>
                        </div> */}
                        <div className="col-sm-6 col-lg-3 py-3">
                            <h5>Contact</h5>
                            <p className="footer-link mt-2">Law Garden Ahmdabad</p>
                            <Link to="#" className="footer-link">+91 99043 65345</Link>
                            <Link to="#" className="footer-link">MedicalHome12@gmail.com</Link>

                            
                        </div>
                    </div>

                    <hr/>

                      
                </div>
            </footer>
        </>
    );
}

export default Footer;