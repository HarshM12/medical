import React from 'react';
import Sidebar from './Sidebar';
import Leftbar from './Leftbar';
import Home from './Home';
import '../../Css/admin/admin.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Admin = () => {
    return (
        <>
            <div className='container2'>
                <Leftbar />    
                <Home/>
            </div>
        </>
    );
};

export default Admin;