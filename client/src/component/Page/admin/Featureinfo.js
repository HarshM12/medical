import React from "react";
import '../../Css/admin/Featureinfo.css';
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";


const Featureinfo = () => {
    return (
        <>
            <div className="featured" style={{marginTop:"10px"}}>
                <div className="featuredItem">
                    <span className="featuredTitle">Total Doctors</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">10</span>
                        <span className="featuredMoneyRate">
                            +1 <ArrowUpward className="featuredIcon" />
                        </span>
                    </div>
                    <span className="featuredSub">Compared to last month</span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Total Patient</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">100</span>
                        <span className="featuredMoneyRate">
                            +2 <ArrowUpward className="featuredIcon" />
                        </span>
                    </div>
                    <span className="featuredSub">Compared to last month</span>
                </div>
                <div className="featuredItem">
                    <span className="featuredTitle">Total payment</span>
                    <div className="featuredMoneyContainer">
                        <span className="featuredMoney">2,225₹</span>
                        <span className="featuredMoneyRate">
                            +2.4 <ArrowUpward className="featuredIcon" />
                        </span>
                    </div>
                    <span className="featuredSub">Compared to last month</span>
                </div>
            </div>

        </>
    )
}
export default Featureinfo;
