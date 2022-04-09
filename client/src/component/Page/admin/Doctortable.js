import React, { useState, useEffect } from "react";
import '../../Css/admin/Doctortable.css'
import { DataGrid } from '@mui/x-data-grid';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

    const [searchdoctor, setsearchdoctor] = useState('');

    const handleChange = (event) => {
        console.log(event.target.value);
        setsearchdoctor(event.target.value);
    };

    const [doctorlist, setdoctorlist] = useState(0);

    const getdoctorlist = async (doctor) => {
        console.log("start get data............");
        const res = await fetch('/doctor', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        console.log(result)
        if (result) {
            console.log("test");
            if (doctorlist != result) {
                console.log(result[0]);
                setdoctorlist(result);
                setsearchdoctor(result[0])
            }
        } else {
            return false;
        }
    };
    useEffect(() => {
        console.log("executed only once!");
        getdoctorlist();
    }, []);
    const [categories, setCategories] = useState();

    const getCategory = async () => {
        const res = await fetch('/category', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const response = await res.json();
        if (res.status === 200 || !response) {
            setCategories(response);
        }
        else {
            console.log("Fail");
        }
    };

    useEffect(() => {
        console.log("executed only once!");
        getCategory();
    }, []);

    // photo


    return (
        <>
            <div className="home">
                <div className="featured" style={{ marginTop: "10px" }}>
                    <div className="featuredItem">
                        <h1>Doctor List</h1>
                        {/* <div className="row mt-4 ml-2">
                            <div className="col-md-6 mt-4">
                                <FormControl style={{ width: "50%" }}>
                                    <InputLabel id="demo-simple-select-label">Search Doctor</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value=""
                                        label="Search Doctor"
                                        onChange={handleChange}
                                    >
                                        {doctorlist && doctorlist.map((doctorlist, index) => {
                                            return (
                                                <>
                                                    <MenuItem value={doctorlist._id}>{doctorlist.fname} {doctorlist.lname}</MenuItem>

                                                </>
                                            )
                                        })

                                        }

                                    </Select>
                                </FormControl>
                            </div>
                            <div className="col-md-6 mt-4">
                                <FormControl style={{ width: "50%" }}>
                                    <InputLabel id="demo-simple-select-standard-label">Search Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Add Doctor Category"
                                        name="category"
                                    >
                                        {categories && categories.map((category, index) => {
                                            return (
                                                <MenuItem value={category._id}>{category.name}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div> */}


                        <table className="table align-middle mt-3">
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
