import React from "react";

import { Route ,Redirect} from "react-router-dom";

const PrivateRoute = ({component:Com, ...rest})=>{
    console.log(rest);
    
    const isAuth = localStorage.getItem("auth");
       
      return(
        isAuth ? <Route {...rest} render={()=> <Com/> }/> : <Redirect to="/login"/>  )
        
    
}

export default PrivateRoute;