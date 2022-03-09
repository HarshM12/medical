import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Doctorpanel from './../../component/Page/Doctorpanel';
import DoctorProfile from './../../component/Page/DoctorProfile';
import DoctorBlog from './../../component/Page/DoctorBlog';
import Logout from './../../component/Page/Logout';

const DoctorRoutes = () =>{
    return(
        <Router>
            <Routes>
            {/* <Redirect path='/' element={<Doctorpanel/>} exact/> */}
            <Route path='/' element={<Doctorpanel/>} exact />
            <Route path='/Doctorpanel' element={<Doctorpanel/>} exact />
            <Route path='/DoctorProfile' element={<DoctorProfile/>} exact/>
            <Route path='/DoctorBlog' element={<DoctorBlog/>} exact/>            
            <Route path='/Logout' element={<Logout/>} exact/>            
            </Routes>
        </Router>
    );
};
export default DoctorRoutes;