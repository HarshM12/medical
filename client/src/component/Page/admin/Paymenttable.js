import React from "react";
import '../../Css/admin/Doctortable.css'
import { DataGrid } from '@mui/x-data-grid';
import PhotoOutlinedIcon from '@material-ui/icons/PhotoOutlined';
const Paymenttable = () => {
    return (
        <>
            <div className="home">
                <div className="featured" style={{ marginTop: "10px" }}>
                    <div className="featuredItem">
                        <h1>Payment History</h1>
                        <table class="table align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">Payment ID</th>
                                    <th scope="col">Doctor Name</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Payment Amount[INR]</th>
                                    <th scope="col"></th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Dr.Harsh Patel</td>
                                    <td>Harsh Patel</td>
                                    <td>200 INR</td>

                                    <td>
                                        <a class="dropdown-item" href="#"><i class="fa fa-eye mr-1"></i> View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Dr.Nilam Patel</td>
                                    <td>Hemil Sorathiya</td>
                                    <td>200 INR</td>

                                    <td>
                                        <a class="dropdown-item" href="#"><i class="fa fa-eye mr-1"></i> View</a>
                                    </td>
                                

                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Dr.Jainam vora</td>
                                    <td>Neel Goyani</td>
                                    <td>200 INR</td>
                                    <td>
                                        <a class="dropdown-item" href="#"><i class="fa fa-eye mr-1"></i> View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Dr.Sagar Bhikadiya</td>
                                    <td>Jemish Nakrani</td>
                                    <td>200 INR</td>
                                    <td>
                                        <a class="dropdown-item" href="#"><i class="fa fa-eye mr-1"></i> View</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Dr.Neela patel</td>
                                    <td>Riken Patel</td>
                                    <td>200 INR</td>
                                    <td>
                                        <a class="dropdown-item" href="#"><i class="fa fa-eye mr-1"></i> View</a>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>Dr.Mehul Choksi </td>
                                    <td>Kishan Rathod</td>
                                    <td>200 INR</td>
                                    <td>
                                        <a class="dropdown-item" href="#"><i class="fa fa-eye mr-1"></i> View</a>
                                    </td>
                                   
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Paymenttable;
