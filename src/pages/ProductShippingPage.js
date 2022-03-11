import React,{useEffect, useState} from "react";
import Layout from "../components/Layout";
import {Grid,Paper,TextField,MenuItem, Button,Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {shippingInfo} from "../mockApi/shippingPrice";
import {promotionDate} from "../mockApi/PromotionDate";
import {formValidation} from "../userInputValidation/formInputValidation";

const useStyle = makeStyles({
    paper:{
        boxSizing:"border-box",
        minHeight:"80vh",
        marginTop:"20px",
        padding:"20px"
        },
})
const initInput={
    organizationName:"",
    consumerName:"",
    consumerPhone:"",
    location:"",
    size:"",
    price:""

}
const ProductShippingPage = ()=>{
    const [userInput,setUserInput] = useState(initInput);
    const [ priceOffPercentage , setPriceOffPercentage] = useState(0);
    const [errors,setErrors] = useState(initInput);

    const inputHandler =(e)=>{
        setUserInput({...userInput,[e.target.name]:e.target.value});
    }

    const promotionPrice = ()=>{

        promotionDate.forEach((d)=>{
           const d1 = new Date(d.date)
           const d2 = new Date()

           if((d1.getDate()===d2.getDate()) && (d1.getMonth()===d2.getMonth())){
            
               setPriceOffPercentage (d.priceOffPercent); //find promotion offer price
           }
        }
        ) 
    }

    useEffect(()=>{
        promotionPrice(); 
    },[]) 

    const {location,size} = userInput;

    useEffect(()=>{ // product price calculate depend on location , size and promotion offer

         if(location !=="" && size !==""){

            const {courierCharge} = shippingInfo.find((val)=> val.location===location && val.producrSize===size )
            const exactPrice = (courierCharge)-((courierCharge*priceOffPercentage)/100);
            setUserInput({...userInput,price:exactPrice});

            }
      },[location,size])// when location and size change price again calculate;

     const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(userInput);
        const result = formValidation(userInput);//check validation
        setErrors(result);

        if(Object.values(result).length===0){
        setUserInput({
            organizationName:"",
            consumerName:"",
            consumerPhone:"",
            location:"",
            size:"",
            price:"" 
           })
        }
     }

    const classes = useStyle();
    return(
        <>
           <Layout>
               <Grid container justifyContent="center">
                  <Grid item xs={9} sm={10} md={6}>
                       
                     <Paper className={classes.paper}>
                        
                        <form onSubmit={handleSubmit}>
                           <TextField type="text" fullWidth label="Organization Name" name="organizationName" sx={{margin:"10px 0px"}}  value={userInput.organizationName} onChange={inputHandler} />
                           <Typography color="red" variant="subtitle2">{errors.organizationName}</Typography>

                           <TextField type="text" fullWidth label="consumer name" name="consumerName" sx={{margin:"10px 0px"}}  value={userInput.consumerName} onChange={inputHandler}  />
                           <Typography color="red" variant="subtitle2">{errors.consumerName}</Typography>

                           <TextField type="text" fullWidth label="consumer phone" name="consumerPhone" sx={{margin:"10px 0px"}}  value={userInput.consumerPhone} onChange={inputHandler}  />
                           <Typography color="red" variant="subtitle2">{errors.consumerPhone}</Typography>

                           <TextField fullWidth label="Select Location" name="location" sx={{margin:"10px 0px"}} value={userInput.location} onChange={inputHandler}  select >
                                <MenuItem value="Inside Dhaka">Inside Dhaka</MenuItem>
                                <MenuItem value="outside Dhaka">outside Dhaka</MenuItem>
                            </TextField>
                            <Typography color="red" variant="subtitle2">{errors.location}</Typography>

                            <TextField fullWidth label="Select Product size" name="size" sx={{margin:"10px 0px"}} value={userInput.size} onChange={inputHandler}  select >
                                <MenuItem value="small">Small</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="large">Large</MenuItem>
                                <MenuItem value="extra large">Extra Large</MenuItem>
                           </TextField>
                           <Typography color="red" variant="subtitle2">{errors.size}</Typography>

                           <TextField type="text" fullWidth label="Product Price" name="price" sx={{margin:"10px 0px"}}  value={userInput.price}/>
                           <Button type="submit" variant="contained">submit</Button>
                        </form>
                      </Paper>
                    </Grid>    
                </Grid>        
           </Layout>
        </>
    );
}
export default  ProductShippingPage ;