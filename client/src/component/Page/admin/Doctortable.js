import React, { useState, useEffect } from "react";
import '../../Css/admin/Doctortable.css'
import { DataGrid } from '@mui/x-data-grid';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
const Doctortable = () => {

    const [doctors, setDoctors] = useState();

    const getDoctors = async () => {
        console.log("get doc...");
        const res = await fetch('/doctor', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response = await res.json();
        console.log(response);
        if (res.status === 200 || !response) {
            setDoctors(response);
        }
        else {
            console.log("Fail");
        }
    };

    useEffect(() => {
        console.log("executed only once!");
        getDoctors();
    }, []);

    const removeDoctor = async (doctor) => {
        console.log(doctor._id);
        if (window.confirm("Are you sure you want to delete this doctor?")) {
            let data = { id: doctor._id };
            const res = await fetch(`/doctor/${doctor._id}`, {
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

    const ConfirmDoctor = async (doctor) => {
        console.log("Confirm:" + doctor._id);
        let data = { status: true };
        const res = await fetch(`/doctor/${doctor._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const response = await res.json();
        console.log(response);
        if (res.status === 200 || !response) {
            getDoctors();
        }
        else {
            console.log("Fail");
        }
    };

    const BlockDoctor = async (doctor) => {
        console.log("Confirm:" + doctor._id);
        let data = { status: false };
        const res = await fetch(`/doctor/${doctor._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const response = await res.json();
        console.log(response);
        if (res.status === 200 || !response) {
            getDoctors();
        }
        else {
            console.log("Fail");
        }
    };

    return (
        <>
            <div className="home">
                <div className="featured" style={{ marginTop: "10px" }}>
                    <div className="featuredItem">
                        <h1>Doctor List</h1>
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">Doctor ID</th>
                                    <th scope="col">Doctor Name</th>
                                    <th scope="col">Doctor Category</th>
                                    <th scope="col">Doctor Degree</th>
                                    <th scope="col"></th>

                                </tr>
                            </thead>
                            <tbody>
                                {doctors && doctors.map((doctor, index) => {
                                    return (
                                        <tr key={`doctor_${doctor._id}`}>
                                            <th scope="row">{doctor._id}</th>
                                            <td>Dr.{doctor.fname} {doctor.lname}</td>
                                            <td>{doctor.category.name}</td>
                                            <td><PhotoOutlinedIcon /></td>
                                            <td>
                                                <div onClick={() => removeDoctor(doctor)} className="mr-5"><i className="fa fa-trash"></i> Delete</div>
                                            </td>
                                            <td>
                                                {doctor.status == true ?
                                                    <span className="btn btn-danger" onClick={() => BlockDoctor(doctor)} style={{ marginLeft: "-100px" }}>Block</span>
                                                    :
                                                    <span className="btn btn-success" onClick={() => ConfirmDoctor(doctor)} style={{ marginLeft: "-100px" }}>Confirm</span>
                                                }
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
export default Doctortable;
