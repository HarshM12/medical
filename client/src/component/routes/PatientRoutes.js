import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Doctorlist from "../Page/Doctorlist";
import Patientpanel from "../Page/Patientpanel";
import PatientProfile from "../Page/PatientProfile";
import Logout from './../../component/Page/Logout';

const PatientRoutes = () =>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Doctorlist/>} exact />
                <Route path='/Patientpanel' element={<Patientpanel/>} exact />
                <Route path='/Doctorlist' element={<Doctorlist/>} exact />
                <Route path='/PatientProfile' element={<PatientProfile/>} exact/>
                <Route path='/Logout' element={<Logout/>} exact/>            
            </Routes>
        </Router>
    );
};
export default PatientRoutes;