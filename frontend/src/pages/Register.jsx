
import { Button, TextField, Box, Typography } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';

const Register = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password should be minimum 6 characters').required('Password is required'),
    phoneNo: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required')
  });
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '', phoneNo: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Register Form Values', values);
        axios.post('http://localhost:8000/user/register',values)
        .then((response)=>{
          toast.success(response.data.status);
          setTimeout(()=>{
            navigate('/login');
          },1000);
        })
        .catch((error)=>{
          toast.error(error.response.data.message);
        })
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box component="main" maxWidth="xs" mx="auto" mt={8}>
          <Typography component="h1" variant="h5">Register</Typography>
          <Form onSubmit={handleSubmit}>
            <Box mt={2}>
              <Field
                name="username"
                as={TextField}
                label="Username"
                fullWidth
                helperText={<ErrorMessage name="username" component="span" style={{ color: 'red' }} />}
              />
            </Box>
            <Box mt={2}>
              <Field
                name="email"
                as={TextField}
                label="Email"
                type="email"
                fullWidth
                helperText={<ErrorMessage name="email" component="span" style={{ color: 'red' }} />}
              />
            </Box>
            <Box mt={2}>
              <Field
                name="password"
                as={TextField}
                label="Password"
                type="password"
                fullWidth
                helperText={<ErrorMessage name="password" component="span" style={{ color: 'red' }} />}
              />
            </Box>
            <Box mt={2}>
              <Field
                name="phoneNo"
                as={TextField}
                label="Phone Number"
                fullWidth
                helperText={<ErrorMessage name="phoneNo" component="span" style={{ color: 'red' }} />}
              />
            </Box>
            <Box mt={4}>
              <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
                Register
              </Button>
            </Box>
          </Form>
          <ToastContainer/>
        </Box>
      )}
    </Formik>
  );
};

export default Register;
