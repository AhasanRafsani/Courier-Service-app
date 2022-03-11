import React from "react";
import Header from "./Header";
import {makeStyles} from "@mui/styles";
import { width } from "@mui/system";

const useStyle = makeStyles({
    root:{
       margin:"0px",
       padding:"0px",
       boxSizing:"border-box",
       backgroundColor:"rgb(245,245,245)",
       height:"100vh",
       width:"100vw"
    },
 
 }); 

const Layout = ({children})=>{
    const classes =  useStyle();
    return(
        <div className={classes.root}>
           <Header/>
           {children}
        </div>
    );
}
export default Layout;