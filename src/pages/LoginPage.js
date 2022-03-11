import React,{useState} from "react";
import Layout from "../components/Layout";
import {Button, Grid,Paper,TextField,Typography}  from "@mui/material";
import {makeStyles} from "@mui/styles";
import { NavLink } from "react-router-dom";
import {formValidation} from "../userInputValidation/formInputValidation";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
    paper:{
        boxSizing:"border-box",
        minHeight:"60vh",
        marginTop:"20px",
        padding:"20px"
        },
});

const initInput={
    organizationName:'',
    password:'',

}
const LoginPage = ()=>{
    const [userInput,setUserInput] = useState(initInput);
    const [errors,setErrors] = useState(initInput);
    const history = useHistory();

    const inputHandler=(e)=>{
        setUserInput({...userInput,[e.target.name]:e.target.value});
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const result = formValidation(userInput);//check validation
        setErrors(result);

        
        const {organizationName,password} = userInput; 
        const signUpInfo = JSON.parse(localStorage.getItem("signUp"));
        //console.log(signUpInfo);
          if(signUpInfo.name===organizationName && signUpInfo.password===password ) { 
            localStorage.setItem("auth","sucessfully Login");
            history.push("/");  
          } 
          
        //console.log(userInput);
     }
    const classes = useStyle();
    return(
        <>
           <Layout>
              <Grid container justifyContent="center">
                <Grid item xs={10} sm={10} md={6}>
                    <Paper className={classes.paper}> 
                      <Typography textAlign="center" variant="h5">Login Here</Typography>
                      <form onSubmit={handleSubmit}>
                        <TextField 
                           type="text" 
                           fullWidth 
                           label="Enter Organization Name" name="organizationName" 
                           sx={{margin:"10px 0px"}}  
                           value={userInput.organizationName} 
                           onChange={inputHandler} />
                        <Typography color="red" variant="subtitle2">{errors.organizationName}</Typography>

                         <TextField 
                            type="password" 
                            fullWidth 
                            label="Enter Password" 
                            name="password" 
                            sx={{margin:"10px 0px"}}  
                            value={userInput.password} 
                            onChange={inputHandler} />
                         <Typography color="red" variant="subtitle2">{errors.password}</Typography>

                           <Button size="large" sx={{marginLeft:"10px"}} type="submit" variant="contained">Login</Button>
                         </form>
                           <NavLink to="/signUp">
                              <Button color="secondary" variant="text">
                                  If You Not Register User Please Sign Up
                               </Button>
                           </NavLink>
                        </Paper>
                    </Grid>    
               </Grid>            
           </Layout>
        </>
    );
}
export default LoginPage;