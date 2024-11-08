import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminLogin from "../pages/adminPages/AdminLogin";
import AdminRegister from "../pages/adminPages/AdminRegister";
import AddProducts from "../pages/adminPages/AddProducts";
import AdminDashboard from "../pages/adminPages/AdminDashboard";
import ViewProducts from "../pages/adminPages/ViewProducts";
import Shop from "../pages/Shop";

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
        <Route path="/viewProducts" element={<ViewProducts/>}/>
        <Route path="/shop" element={<Shop/>}/>
      </Routes>
    </BrowserRouter>
  );
}
