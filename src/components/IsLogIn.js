import React from "react";

import { Route ,Redirect} from "react-router-dom";

const IsLogInRoute = ({component:Com, ...rest})=>{
    console.log(rest);
    
    const isAuth = localStorage.getItem("auth");
       
      return(
        isAuth ? <Redirect to="/"/> : < Route {...rest} render={()=> <Com/> }/> )
        
    
}

export default IsLogInRoute;