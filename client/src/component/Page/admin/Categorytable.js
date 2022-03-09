import React, { useEffect, useState } from "react";
import '../../Css/admin/Doctortable.css'
import { TextField } from "@mui/material";
import {
  Button,
} from 'reactstrap';

const Categorytable = () => {

  const [Category, setCategory] = useState();
  const [categories, setCategories] = useState();

  const saveData = async () => {
    const res = await fetch('/category/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: Category
      })
    });
    console.log(res)
    const response = await res.json();
    if (res.status === 200 || !response) {
      console.log(response);
      setCategory("");
      getCategory();
    }
    else {
      console.log("Fail");
    }
  };

  const getCategory = async () => {
    const res = await fetch('/category', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(res)
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

  const removeCat = async (categories) => {
    console.log(categories._id);
    if (window.confirm("Are you sure you want to delete this Category?")) {
      let data = { id: categories._id };
      const res = await fetch(`/category/${categories._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
      const response = await res.json();
      console.log(response);
      if (res.status === 200 || !response) {
        getCategory();
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
            <TextField id="outlined-basic" value={Category} name="name" onChange={(e) => setCategory(e.target.value)} label="Add category" variant="outlined" style={{ width: "400px" }} />
            <Button variant="outlined" className="mt-1 ml-5" onClick={() => saveData()} >Save</Button>
            <table className="table align-middle" style={{ width: "700px", marginTop: "50px" }}>
              <thead>
                <tr>
                  <th scope="col">Category ID</th>
                  <th scope="col">Category Name</th>
                  <th>Operation</th>
                </tr>
                {categories && categories.map((category, index) => {
                  return (
                    <tr>
                      <td>{category._id}</td>
                      <td>{category.name}</td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-outline-primary btn-sm ml-2"><i class="fa fa-pencil mr-1"></i></button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => removeCat(category)} ><i class="fa fa-trash mr-1"></i></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </thead>
            </table>
          </div>
        </div>
      </div>

    </>
  )
}

export default Categorytable;