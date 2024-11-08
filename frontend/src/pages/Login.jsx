import { Box, Button, TextField, Typography } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {  useNavigate } from 'react-router-dom';



export default function Login() {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required')
  });
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}  
      onSubmit={(values) => {
        console.log('Login Form data:', values);
        axios.post('http://localhost:8000/user/login',values)
        .then((response)=>{
          toast.success(response.data.status);
          setTimeout(()=>{
            navigate('/shop');
            localStorage.setItem('accessToken',response.data.accessToken);
          },1000);
        })
        .catch((error)=>{
          toast.error(error.response.data.message);
        })
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Box component="main" maxWidth="xs" mx="auto" mt={8}>
          <Typography component="h1" variant="h5">Login</Typography>
          <Form onSubmit={handleSubmit}>
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
            <Box mt={4}>
              <Button type="submit" fullWidth variant="contained" color="primary" disabled={isSubmitting}>
                Login
              </Button>
            </Box>
          </Form>
          <ToastContainer />
        </Box>
      )}
    </Formik>
  );
}
