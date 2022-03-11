import React from "react";
import {AppBar,Toolbar,Button} from "@mui/material";
import {Box,Typography} from "@mui/material";
import {useHistory} from "react-router-dom";

const Header = ()=>{
    const history = useHistory();

    const shippingPrice=()=>{
        history.push("/shipping_price_page");
    }

    const productShipping=()=>{
        history.push("/product_shipping_page");  
    }
    const login=()=>{
        history.push("/login");
    }
    const logout=()=>{
        localStorage.removeItem("auth")
        history.push("/"); 
    }
    return(
        <>
           <AppBar position="static" sx={{height:"60px"}}>
               <Toolbar variant="dense" sx={{display:"flex",margin:"6px"}} >
                    <Box sx={{flexGrow:1}}>
                        <Typography variant="h5">DHL Limited</Typography>
                    </Box>

                    <Button onClick={productShipping} color="inherit">Shipping Products</Button>
                    <Button onClick={shippingPrice} color="inherit">Shipping price</Button>
                    <Button onClick={login} color="inherit">Login</Button>
                    <Button onClick={logout} color="inherit">Logout</Button>

               </Toolbar>
           </AppBar>
        </>
    );
}
export default Header;