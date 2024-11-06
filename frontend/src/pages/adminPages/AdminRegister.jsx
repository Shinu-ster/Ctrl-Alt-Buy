import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

export default function AdminRegister() {
  const validationSchema = Yup.object({
    name:Yup.string().required('Name is required'),
    email:Yup.string().email('Invalid email format').required('email is required'),
    password:Yup.string().min(6,'Password should be minimum 6 characters').required('Password is required')
  })
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{name:'',email:'',password:''}}
      validationSchema={validationSchema}
      onSubmit={(values)=>{
        console.log('values',values);
        axios.post('http://localhost:8000/admin/register',values)
        .then((response)=>{
          toast.success(response.data.status);
          setTimeout(()=>{
            navigate('/login')
          },1000);
        })
        .catch((error)=>{
          toast.error(error.response.data.message);
        })
      }}
    >
      {({handleSubmit,isSubmitting})=>(
        <Box component="main" maxWidth="xs" mx="auto" mt={8}>
        <Typography component="h1" variant="h5">Register</Typography>
        <Form onSubmit={handleSubmit}>
          <Box mt={2}>
            <Field
              name="name"
              as={TextField}
              label="Full Name"
              fullWidth
              helperText={<ErrorMessage name="name" component="span" style={{ color: 'red' }} />}
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
  )
}
