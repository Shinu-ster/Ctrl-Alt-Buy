import { useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const checkAdminLogin = ()=>{
    console.log('object')
    const auth = localStorage.getItem('adminAT');
    if(!auth){
      console.log("User isn't logged in");
      navigate('/admin/login');
    }
  }

  useEffect(()=>{checkAdminLogin();},[])
  return (
    <div className="flex">
      
      <div className="w-72">
        <AdminSidebar />
      </div>
      
      
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <h2 className="mt-4">askdjf</h2>
        
      </div>
    </div>
  );
}
