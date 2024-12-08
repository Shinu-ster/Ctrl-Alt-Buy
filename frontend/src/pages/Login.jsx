import { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const checkLogin = () => {
    const auth = localStorage.getItem("accessToken");
    if (auth) {
      console.log("User logged in");
      navigate("/shop");
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <div className="flex w-full h-screen " style={{ background: "#f1f1f1" }}>
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <LoginForm />
      </div>
      <div className=" hidden  relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-green-500 to-blue-500 rounded-full animate-spin"></div>
        <div className="w-full  h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
      </div>
    </div>
  );
}
