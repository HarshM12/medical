import React, { useEffect, useState } from "react";
import '../../Css/admin/widgetsm.css'
import { Visibility } from "@material-ui/icons";

const Widgetsm = () => {

    const [patients, setpatients] = useState();

    const getpatients = async () => {
        console.log("get doc...");
        const res = await fetch('/patient', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response = await res.json();
        console.log(response);
        if (res.status === 200 || !response) {
            setpatients(response);
        }
        else {
            console.log("Fail");
        }
    };
    useEffect(() => {
        console.log("executed only once!");
        getpatients();
    }, []);


    return (
        <>
            <div className="widgetSm">
                <span className="widgetSmTitle">Patient Info</span>

                {patients && patients.map((patient) => {
                    return (
                        <>
                            <div className="row">
                                <div className="col-md-2">
                                    <ul className="widgetSmList">
                                        <li className="widgetSmListItem">
                                            <img
                                                src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                                                alt=""
                                                className="widgetSmImg"
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul className="widgetSmList">
                                        <li className="widgetSmListItem">
                                            <div className="widgetSmUser">
                                                <span className="widgetSmUsername">{patient.fname} {patient.lname}</span>
                                                <span className="widgetSmUserTitle">Patient</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-4">
                                    <ul className="widgetSmList">
                                        <li className="widgetSmListItem">
                                            <button className="widgetSmButton">
                                                <Visibility className="widgetSmIcon" />
                                                Display
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>

                    );
                })}



                {/* <li className="widgetSmListItem">
                        <img
                            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">vandan Goyani</span>
                            <span className="widgetSmUserTitle">Patient</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                    <li className="widgetSmListItem">
                        <img
                            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">Harsha Patel</span>
                            <span className="widgetSmUserTitle">Patient</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                    <li className="widgetSmListItem">
                        <img
                            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">krishna Patel</span>
                            <span className="widgetSmUserTitle">Patient</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                    <li className="widgetSmListItem">
                        <img
                            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">Sagar Ramani</span>
                            <span className="widgetSmUserTitle">Patient</span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li> */}
            </div>
        </>
    )
}

export default Widgetsm;