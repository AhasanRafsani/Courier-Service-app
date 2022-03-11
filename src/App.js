import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ShippingPricePage from "./pages/ShippingPricePage";
import ProductShippingPage from "./pages/ProductShippingPage";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoute from "./components/ProtectedRoute";
import IsLogInRoute from "./components/IsLogIn";

function App() {
  return (
    <>
      <BrowserRouter>
         <Switch>

              <Route exact path="/" component={HomePage}/>
              <Route exact path="/shipping_price_page" component={ShippingPricePage}/>
              <PrivateRoute exact path="/product_shipping_page" component={ProductShippingPage}/>
              <IsLogInRoute exact path="/login" component={LoginPage}/>
              <Route exact path="/signUp" component={RegistrationPage}/>
              
         </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
