import React, { useEffect, useState } from "react";
import '../../Css/admin/widgetLg.css'

const WidgetLg = () => {
  const [doctors, setDoctors] = useState();
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
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

  return (
    <>
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Doctor Info</h3><br />
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Doctor Name</th>
            <th className="widgetLgTh">category</th>
            <th className="widgetLgTh">Status</th>
          </tr><br />
          {doctors && doctors.map((doctor, index) => {
            return (
              <>
                <tr className="widgetLgTr">
                  <td className="widgetLgUser">
                    <span className="widgetLgName">{doctor.fname} {doctor.lname}</span>
                  </td>
                  <td className="widgetLgAmount">{doctor.category.name}</td>
                  <td className="widgetLgStatus">
                    <Button type="Approved" />
                  </td>
                </tr><br />
              </>
            )
          })
          }
  
        </table>
      </div>
    </>
  )
}

export default WidgetLg;