import React, { useState, useEffect } from "react";
import '../../Css/admin/Doctortable.css'
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


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

    const [Patient_details, setPatientDetails] = useState(false);

    const getPatientDetails = async () => {
        const res = await fetch('/patient', {
            credentials: "same-origin",
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            }
        });
        let result = await res.json();
        console.log(result)
        if (result) {
            console.log(JSON.stringify(result));
            setPatientDetails(result);
            console.log(JSON.stringify(Patient_details));

        } else {
            return false;
        }
    };
    useEffect(() => {
        console.log("executed only once!");
        getPatientDetails();
    }, []);

    return (
        <>
            <div className="home">
                <div className="featured" style={{ marginTop: "10px" }}>
                    <div className="featuredItem">
                        <h1>Patient List</h1>
                        <div className="row">
                            <div className="col-md-6 mt-4">
                                <FormControl style={{ width: "50%" }}>
                                    <InputLabel id="demo-simple-select-standard-label">Search</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        label="Add Doctor Category"
                                        name="name"
                                    >
                                        {Patient_details && Patient_details.map((patient, index) => {
                                            return (
                                                <MenuItem value={patient._id}>{patient.fname} {patient.lname}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>

                            </div>
                            <div className="col-md-6 mt-4">
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        defaultValue="All"

                                    >
                                        <FormControlLabel value="All" control={<Radio />} label="All" />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        
                                    </RadioGroup>
                                </FormControl>
                            </div>

                        </div>
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
