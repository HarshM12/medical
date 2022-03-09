import React, { useState, useEffect } from "react";
import '../../Css/admin/Doctortable.css'
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';

const Patienttable = () => {
    const [patients, setPatients] = useState();

    const getDoctors = async () => {
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
            setPatients(response);
        }
        else {
            console.log("Fail");
        }
    };

    useEffect(() => {
        console.log("executed only once!");
        getDoctors();
    }, []);

    const removeDoctor = async (patient) => {
        console.log(patients._id);
        if (window.confirm("Are you sure you want to Block this Patient?")) {
            let data = { id: patients._id };
            const res = await fetch(`/patient/${patient._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const response = await res.json();
            console.log(response);
            if (res.status === 200 || !response) {
                getDoctors();
            }
            else {
                console.log("Fail");
            }
        }
    };

    return (
        <>
            <div className="home">
                <div className="featured" style={{ marginTop: "10px" }}>
                    <div className="featuredItem">
                        <h1>Patient List</h1>
                        <table class="table align-middle text-center">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients && patients.map((patient) => {
                                    return (
                                        <tr>
                                            <th scope="row"><text>{patient._id}</text></th>
                                            <td><text className="text-capitalize">{patient.fname} {patient.lname}</text></td>
                                            <td><text className="text-capitalize">{patient.gender}</text></td>
                                            <td>{patient.email}</td>
                                            <td>{patient.mobile}</td>
                                            <td>
                                                {/* <div onClick={() => removeDoctor(patient)}><i class="fa fa-ban mr-1"></i> Block</div> */}
                                                <div onClick={() => removeDoctor(patient)} className="mr-5"><i className="fa fa-trash"></i> Delete</div>

                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Patienttable;
