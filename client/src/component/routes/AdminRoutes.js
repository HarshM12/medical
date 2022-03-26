import React from "react";
import Admin from "../Page/admin/Admin";
import Logout from "../Page/Logout";
import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import Home from "../Page/admin/Home";
import Doctorinfo from "../Page/admin/Doctorinfo";
import Sidebar from "../Page/admin/Sidebar";
import Patientinfo from '../Page/admin/Patientinfo';
import Payment from "../Page/admin/Payment";
import Appointment from '../Page/admin/Appointment';
import Category from "../Page/admin/Category";
import Report from "../Page/admin/Report";

const AdminRoute = () => {
    return(
        <React.Fragment>
            <Sidebar />
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Admin/>} exact />
                        <Route path='/Admin' element={<Admin/>} exact />
                        <Route path='/Doctorinfo' element={<Doctorinfo/>} exact />
                        <Route path='/Patientinfo' element={<Patientinfo/>} exact />
                        <Route path='/Payment' element={<Payment/>} exact />
                        <Route path='/appointment' element={<Appointment/>} exact />
                        <Route path='/Category' element={<Category/>} exact />
                        <Route path='/Report' element={<Report/>} exact />
                        <Route path='/Logout' element={<Logout/>} exact/>
                    </Routes>
                </BrowserRouter>
        </React.Fragment>
        // <BrowserRouter>
        //     <Routes>
        //         <Route path="/" element={<Home />} />
        //         <Route path="/Admin" element={<Admin />}>
        //             <Route path="/Logout" element={<Logout />} />
        //         </Route>
        //     </Routes>
        // </BrowserRouter>
    );
};
export default AdminRoute;