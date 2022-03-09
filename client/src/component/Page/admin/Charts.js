import React from "react";
import '../../Css/admin/Chart.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Charts = ({title,data,datakey,grid}) => {
    
    return (
        <>
           <div className="chart">
               <h3 className="chartTitle">{title}</h3>
               <ResponsiveContainer width="100%" aspect={4/1}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" stroke="#0555bd"></XAxis>
                        <Line type="monotone" dataKey={datakey} stroke="#0555bd"></Line>
                        <Tooltip/>
{                         grid &&<CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5 "/>}
                   </LineChart>
               </ResponsiveContainer>

           </div>
            
        </>
    )
}
export default Charts;
