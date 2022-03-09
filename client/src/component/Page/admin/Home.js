import React from "react";
import '../../Css/admin/home.css'
import Featureinfo from "./Featureinfo"; 
import Charts from "./Charts";
import { Userdata } from "./data";
import Widgetsm from "./Widgetsm";
import WidgetLg from "./WidgetLg";

const  Home = ()=>{
    return(
        <>
            <div className="home">
                 <Featureinfo/>
                  <Charts data={Userdata} title="Total Active User" datakey="Active User"  grid />
                  <div className="homeWidget">
                      <Widgetsm/>
                      <WidgetLg/>
                  </div>
            </div>
        </>
    )
}

export default Home;
