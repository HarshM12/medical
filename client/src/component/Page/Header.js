import React from "react";
import '../Css/bootstrap.css';
import '../Css/theme.css';
import '../Css/maicons.css';
import { Link ,Router } from 'react-router-dom';
import bg_image_1 from '../../img/bg_image_1.jpg';


const Header = () => {
    return (
        <>

            <header>
            
                    <div className="topbar">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-8 text-sm">
                                    <div class="site-info">
                                        <Link to="#"><span class="mai-call text-primary"></span> +91 99043 65345</Link>
                                        <span class="divider">|</span>
                                        <Link to="#"><span class="mai-mail text-primary"></span> MedicalHome12@gmail.com</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>      
          
                  
        </header>
     
        </>
    );
}
export default Header;
