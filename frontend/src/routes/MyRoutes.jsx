import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLogin from "../pages/adminPages/AdminLogin";
import AdminRegister from "../pages/adminPages/AdminRegister";
import AddProducts from "../pages/adminPages/AddProducts";
import AdminDashboard from "../pages/adminPages/AdminDashboard";

import Shop from "../pages/Shop";
import ViewOrders from "../pages/adminPages/ViewOrders";
import SingleProduct from "../pages/SingleProduct";

export default function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/devportal/login" element={<AdminLogin/>}/>
        <Route path="/devportal/register" element={<AdminRegister/>}/>
        <Route path="/addproducts" element={<AddProducts/>}/>
        <Route path="/adminDashboard" element={<AdminDashboard/>}/>
        <Route path="/viewOrders" element={<ViewOrders/>}/>
        <Route path="/productdetails/:id" element={<SingleProduct/>}/>
        <Route path="/shop" element={<Shop/>}/>
      </Routes>
    </BrowserRouter>
  );
}
