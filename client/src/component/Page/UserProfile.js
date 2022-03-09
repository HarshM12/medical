import React from "react";

var UserProfile = (function() {
    var full_name = "";
  
    var getName = function() {
      if(localStorage.getItem('session_id')){
        let user = {
          id: localStorage.getItem('session_id'),   
          name: localStorage.getItem('name'),   
          role: localStorage.getItem('role'),
        }
        return user;
      }else{
        return null;
      }
    };

    var getRole = function() {
      if(localStorage.getItem('role')){
        return localStorage.getItem('role');
      }else{
        return null;
      }
    };
  
    var setName = function(user_id, name, role) {
      if(user_id){
        localStorage.setItem('session_id', user_id);
      }
      if(name){
        localStorage.setItem('name', name);
      }
      if(role){
        localStorage.setItem('role', role);
      }
    };

    var removeUser = function(){
      localStorage.removeItem('session_id');
      localStorage.removeItem('name');
      localStorage.removeItem('role');
    };
  
    return {
      getName: getName,
      setName: setName,
      removeUser: removeUser,
      getRole: getRole
    }
  
  })();
  
export default UserProfile;