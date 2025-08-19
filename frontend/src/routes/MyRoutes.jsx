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

import Cart from "../pages/Cart";
import Success from "../pages/payment/Success";
import CancelPage from "../pages/payment/Cancel";
import AdminViewProducts from "../pages/adminPages/AdminViewProducts";



export default function MyRoutes() {
  return (
    <BrowserRouter>
    
      <Routes>

        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/addproducts" element={<AddProducts />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/viewOrders" element={<ViewOrders />} />
        <Route path="/admin/viewProducts" element={<AdminViewProducts />} />
        <Route path="/productdetails/:id" element={<SingleProduct />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<CancelPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}
