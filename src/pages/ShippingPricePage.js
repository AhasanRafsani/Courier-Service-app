import React,{useEffect, useState} from "react";
import Layout from "../components/Layout";
import {Typography, Paper,TextField,MenuItem,Grid ,TableContainer,Table,TableHead,TableBody,TableRow,TableCell} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {shippingInfo} from "../mockApi/shippingPrice";
import {promotionDate} from "../mockApi/PromotionDate";

const useStyle = makeStyles({
  paper:{
      boxSizing:"border-box",
      minHeight:"60vh",
      marginTop:"20px",
      padding:"20px"
      
      
  },
 
 
})

const ShippingPricePage = ()=>{
    
    const [location,setLocation]=useState("");
    const [data,setData]=useState([]);
    const [ priceOffPercentage , setPriceOffPercentage] = useState(0)

    const locationHandler = (e)=>{
        setLocation(e.target.value)
    }

    console.log(location);

    const promotionPrice = ()=>{

        promotionDate.forEach((d)=>{
           const d1 = new Date(d.date)
           const d2 = new Date()

           if((d1.getDate()===d2.getDate()) && (d1.getMonth()===d2.getMonth())){
            
               setPriceOffPercentage (d.priceOffPercent);
           }
        }
        ) 
    }  

    useEffect(()=>{
        promotionPrice();
    },[]) 


    useEffect(()=>{
        
        if(location !==""){
            const result = shippingInfo.filter((val)=>val.location===location)
            setData(result);
            }
        
    },[location]);

    console.log(data);


    
      console.log(priceOffPercentage);
      const classes = useStyle();
    return(
        <>
            <Layout>
                
                  
                   <Grid container justifyContent="center">
                     
                        <Grid  item xs={10} sm={10} md={6}>
                          <Paper className={classes.paper}>
                          <Typography textAlign="center" variant="h5">All Shipping Information</Typography>
                             <TextField fullWidth label="Select Location" name="location" sx={{margin:"10px 0px"}} value={location} onChange={locationHandler} select >
                                <MenuItem value="Inside Dhaka">Inside Dhaka</MenuItem>
                              <  MenuItem value="outside Dhaka">outside Dhaka</MenuItem>
                             </TextField>
                            { data.length !==0 &&
                              <TableContainer>
                                  <Table>
                                      <TableHead sx={{backgroundColor:"rgb(240,255,255)"}}>
                                         <TableRow>

                                             <TableCell align="center"><Typography>Size</Typography></TableCell>
                                             <TableCell align="center"><Typography>Weight (KG)</Typography></TableCell>
                                             <TableCell align="center"><Typography>Shipping Price (TK)</Typography></TableCell>
                                             <TableCell align="center"><Typography>Today Off (TK)</Typography></TableCell>
                                             
                                         </TableRow>
                                      </TableHead>

                                      <TableBody>
                                          {
                                            data.map((val,index)=>(
                                                <TableRow key={index}>
                                                    <TableCell align="center">{val.producrSize}</TableCell>
                                                    <TableCell align="center">{val.minMaxweight}</TableCell>
                                                    <TableCell align="center">{val.courierCharge}</TableCell>
                                                    <TableCell align="center">{(val.courierCharge*priceOffPercentage/100)}</TableCell>
                                                </TableRow>
                                            ))   
                                          }
                                      </TableBody>
                                  </Table>
                              </TableContainer>
                             }
                           </Paper>
                        </Grid>
                     
                   </Grid>

                 
               
            </Layout>
        </>
    );
}

export default ShippingPricePage;