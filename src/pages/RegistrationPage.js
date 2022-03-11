import React,{useState} from "react";
import Layout from "../components/Layout";
import {Paper,Grid,Button,TextField,Typography} from "@mui/material"
import {makeStyles} from "@mui/styles";
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
    name:"",
    email:"",
    phone:"",
    password:"",
    address:""
    }

const RegistrationPage = ()=>{
    const history = useHistory();
    const [userInput,setUserInput] = useState(initInput);
    const [errors,setErrors] = useState(initInput);

    const inputHandler=(e)=>{
        setUserInput({...userInput,[e.target.name]:e.target.value});
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const result = formValidation(userInput);
        setErrors(result);
        console.log(userInput);
        localStorage.setItem("signUp",JSON.stringify(userInput));
        history.push("/login");
     }
     
    const classes = useStyle();
    return(
        <>
           <Layout>
              <Grid container justifyContent="center">
                  <Grid item xs={10} sm={10} md={6}>
                     <Paper className={classes.paper}>
                     <Typography textAlign="center" variant="h5">Sign Up Here</Typography>
                       <form onSubmit={handleSubmit}>

                          <TextField 
                           type="text" 
                           fullWidth 
                           label="Enter Organization Name" name="name" 
                           sx={{margin:"10px 0px"}}  
                           value={userInput.name} 
                           onChange={inputHandler} />
                           <Typography color="red" variant="subtitle2">{errors.name}</Typography>

                           <TextField 
                            type="email" 
                            fullWidth 
                            label="Enter Organization Email " 
                            name="email" 
                            sx={{margin:"10px 0px"}}  
                            value={userInput.email} 
                            onChange={inputHandler} />
                            <Typography color="red" variant="subtitle2">{errors.email}</Typography>

                            <TextField 
                            type="text" 
                            fullWidth 
                            label="Enter Organization Phone N0 " 
                            name="phone" 
                            sx={{margin:"10px 0px"}}  
                            value={userInput.phone} 
                            onChange={inputHandler} />
                            <Typography color="red" variant="subtitle2">{errors.phone}</Typography>

                           <TextField 
                            type="password" 
                            fullWidth 
                            label="Enter Password" 
                            name="password" 
                            sx={{margin:"10px 0px"}}  
                            value={userInput.password} 
                            onChange={inputHandler} />
                            <Typography color="red" variant="subtitle2">{errors.password}</Typography>

                           <TextField 
                            type="text" 
                            fullWidth 
                            label="Enter Organization Address " 
                            name="address" 
                            sx={{margin:"10px 0px"}}  
                            value={userInput.address} 
                            onChange={inputHandler} />
                            <Typography color="red" variant="subtitle2">{errors.address}</Typography>

                            <Button size="large" sx={{marginLeft:"10px"}} type="submit" variant="contained">Sign Up</Button>
                        </form>
                     </Paper> 
                    </Grid> 
                </Grid>        
            </Layout>
        </>
    );
}
export default RegistrationPage;