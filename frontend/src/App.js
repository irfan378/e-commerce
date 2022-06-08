
import React, { useState } from 'react'
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js"
import LoginSignUp from './components/User/LoginSignUp.js';
import store from "./store"
import { loadUser } from './actions/userAction.js';
import UserOptions from "./components/layout/Header/UserOptions.js"
import { useSelector } from 'react-redux';
import Profile from "./components/User/Profile.js"
import ProtectedRoute from './components/Route/ProtectedRoute.js';
import UpdateProfile from "./components/User/UpdateProfile.js"
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/ForgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from "./components/Cart/Cart.js"
import Shipping from "./components/Cart/Shipping.js"
import ConfirmOrder from "./components/Cart/ConfirmOrder.js"
import axios from 'axios';
import Payment from "./components/Cart/Payment.js"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import OrderSuccess from "./components/Cart/OrderSucess.js"
import MyOrders from "./components/Order/MyOrders.js"
import OrderDetails from "./components/Order/OrderDetails.js"
import Dashboard from "./components/admin/Dashboard.js"
import ProductList from "./components/admin/ProductList.js"
import NewProduct from './components/admin/NewProduct.js';
import UpdateProduct from './components/admin/UpdateProduct.js'
import OrderList from './components/admin/OrderList.js'
import ProcessOrder from './components/admin/ProcessOrder.js'
import UserList from './components/admin/UserList.js'
import UpdateUser from './components/admin/UpdateUser.js'
function App() {
  const { isAuthenticated, user } = useSelector(state => state.user)
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey);
  }
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto:300,400,500,700', 'Material Icons']
      }
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [])

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/account" element={<ProtectedRoute />} >
          <Route exact path="/account" element={<Profile />} />
        </Route >
        <Route exact path="/me/update" element={<ProtectedRoute />} >
          <Route exact path="/me/update" element={<UpdateProfile />} />
        </Route >
        <Route exact path="/password/update" element={<ProtectedRoute />} >
          <Route exact path="/password/update" element={<UpdatePassword />} />
        </Route >
        <Route exact path="/password/forget" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/shipping" element={<ProtectedRoute />} >
          <Route exact path="/shipping" element={<Shipping />} />
        </Route >
        <Route exact path="/order/confirm" element={<ProtectedRoute />} >
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        </Route >
        {stripeApiKey && (
          <Route exact path="/process/payment" element={<ProtectedRoute />} >
            <Route exact path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment /> </Elements>} />
          </Route >
        )}
        <Route exact path="/success" element={<ProtectedRoute />} >
          <Route exact path="/success" element={<OrderSuccess />} />
        </Route >
        <Route exact path="/orders" element={<ProtectedRoute />} >
          <Route exact path="/orders" element={<MyOrders />} />
        </Route >
        <Route exact path="/order/:id" element={<ProtectedRoute />} >
          <Route exact path="/order/:id" element={<OrderDetails />} />
        </Route >
        <Route exact path="/admin/dashboard" element={<ProtectedRoute />} >
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
        </Route >
        <Route exact path="/admin/products" element={<ProtectedRoute />} >
          <Route exact path="/admin/products" element={<ProductList />} />
        </Route >
        <Route exact path="/admin/product" element={<ProtectedRoute />} >
          <Route exact path="/admin/product" element={<NewProduct />} />
        </Route >
        <Route exact path="/admin/product/:id" element={<ProtectedRoute />} >
          <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
        </Route >
        <Route exact path="/admin/orders" element={<ProtectedRoute />} >
          <Route exact path="/admin/orders" element={<OrderList />} />
        </Route >
        <Route exact path="/admin/order/:id" element={<ProtectedRoute />} >
          <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
        </Route >
        <Route exact path="/admin/users" element={<ProtectedRoute />} >
          <Route exact path="/admin/users" element={<UserList />} />
        </Route >
        <Route exact path="/admin/user/:id" element={<ProtectedRoute />} >
          <Route exact path="/admin/user/:id" element={<UpdateUser />} />
        </Route >

      </Routes>


      <Footer />
    </Router>
  );
}

export default App;
