
import React from "react";
import Leftbar from '../../Page/admin/Leftbar';
import Categorytable from "./Categorytable";
import '../../Css/admin/admin.css';

const Category = () => {
    return (
        <>
            <div className="container2">
                <Leftbar />
                <Categorytable/>
            </div>
        </>
    )
}

export default Category;