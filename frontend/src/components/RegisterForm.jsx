import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function RegisterForm() {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Enter valid email").required("Enter your email"),
    password: Yup.string().required("Enter your password"),
    phoneNo: Yup.string().required("Enter your phone number"),
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/register",
        values
      );
      toast.success(response.data.status);
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="bg-white px-6 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20 rounded-2xl border-2 border-gray-200 max-w-lg mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center">
        Make an Account
      </h1>
      <p className="font-medium text-sm sm:text-base md:text-lg text-gray-500 mt-4 text-center">
        Please enter your details
      </p>
      <Formik
        initialValues={{ username: "", email: "", password: "", phoneNo: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mt-6 space-y-6">
              <div>
                <label htmlFor="email" className="text-lg font-medium">
                  Email
                </label>
                <Field
                  className="w-full border-2 border-gray-100 rounded-xl p-3 sm:p-4 mt-1 bg-transparent"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-lg font-medium">
                  Password
                </label>
                <Field
                  className="w-full border-2 border-gray-100 rounded-xl p-3 sm:p-4 mt-1 bg-transparent"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label htmlFor="username" className="text-lg font-medium">
                  Username
                </label>
                <Field
                  className="w-full border-2 border-gray-100 rounded-xl p-3 sm:p-4 mt-1 bg-transparent"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label htmlFor="phoneNo" className="text-lg font-medium">
                  Phone No.
                </label>
                <Field
                  className="w-full border-2 border-gray-100 rounded-xl p-3 sm:p-4 mt-1 bg-transparent"
                  type="text"
                  name="phoneNo"
                  id="phoneNo"
                  placeholder="Enter your phone number"
                />
                <ErrorMessage
                  name="phoneNo"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-green-600 text-white text-lg font-bold transition-transform transform active:scale-95 hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign up"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-6 text-center">
        <p className="font-medium text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 font-medium">
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
