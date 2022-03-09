import React from "react";
import UserProfile from "./UserProfile";

const logout = async () =>{
    const res = await fetch('/Logout', {
        method: "GET",
    });
    const response =  await res.json();
    console.log(response);        
    var user = UserProfile.removeUser();
    if(response.data){
        window.location.assign("/");
    }
};
export default logout;