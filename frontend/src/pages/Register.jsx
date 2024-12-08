import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useEffect } from "react";

const Register = () => {
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
    <div className="flex flex-col lg:flex-row w-full h-screen" style={{ background: "#f1f1f1" }}>
      {/* Form Section */}
      <div className="w-full flex items-center justify-center lg:w-1/2 p-4">
        <RegisterForm />
      </div>

      {/* Decorative Section */}
      <div className="hidden lg:flex relative h-full w-1/2 items-center justify-center bg-gray-200">
        <div className="w-60 h-60 bg-gradient-to-tr from-green-500 to-blue-500 rounded-full animate-spin"></div>
        <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"></div>
      </div>
    </div>
  );
};

export default Register;
