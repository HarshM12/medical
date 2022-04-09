import React from 'react';
import '../../Css/admin/Leftbar.css';
import {
    LineStyle,
    PermIdentity,
    Storefront,
    AttachMoney,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report,
} from "@material-ui/icons";
import ReportIcon from '@mui/icons-material/Report';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const Leftbar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Dashboard</h3>
                        <ul className="sidebarList">
                            <Link to="/" className="link">
                                <li className="sidebarListItem active">
                                    <LineStyle className="sidebarIcon" />
                                    Home
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle">Quick Menu</h3>
                        <ul className="sidebarList">
                            <Link to="/Doctorinfo" className="link">
                                <li className="sidebarListItem">
                                    <PermIdentity className="sidebarIcon" />
                                    Doctors
                                </li>
                            </Link>
                            <Link to="/Patientinfo" className="link">
                                <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                    Patients
                                </li>
                            </Link>
                            <Link to="/Payment" className="link">
                            <li className="sidebarListItem">
                                <AttachMoney className="sidebarIcon" />
                                payment
                            </li>
                            </Link>
                            <Link to="/appointment" className="link">
                            <li className="sidebarListItem">
                                <CalendarTodayIcon className="sidebarIcon" />
                                Appointment
                            </li>
                            </Link>
                            <Link to="/Category" className="link">
                            <li className="sidebarListItem">
                                <CategoryIcon className="sidebarIcon" />
                                 Category
                            </li>
                            </Link>
                           
                            <Link to="/Report" className="link">
                            <li className="sidebarListItem">
                                <ReportIcon className="sidebarIcon" />
                                 Report
                            </li>
                            </Link>

                            <Link to="/Contact" className="link">
                            <li className="sidebarListItem">
                                <ContactSupportIcon className="sidebarIcon" />
                                 Contact Us
                            </li>
                            </Link>
                        </ul>
                    </div>
                   
                    <Link to="/Logout" className="link">
                        <li className="sidebarListItem">
                            <LogoutIcon className="logout" />
                            Logout
                        </li>
                    </Link>

                </div>
            </div>
        </>
    );
};

export default Leftbar;