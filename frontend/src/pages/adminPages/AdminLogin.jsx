import { Box, Button, TextField, Typography, Paper, Avatar } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Avatar
          src="/admin/profile-pic.jpg"
          alt="Admin Logo"
          sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
        />
        <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Admin Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            axios
              .post('http://localhost:8000/admin/login', values)
              .then((response) => {
                toast.success(response.data.status);
                console.log(response.data);
                localStorage.setItem('adminAT',response.data.accessToken);
                setTimeout(() => {

                  navigate('/admin/viewProducts');
                }, 1000);
              })
              .catch((error) => {
                toast.error(error.response?.data?.message || 'An error occurred');
              });
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Box mb={2}>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  error={Boolean(ErrorMessage.name === 'email')}
                  helperText={<ErrorMessage name="email" component="span" style={{ color: 'red' }} />}
                />
              </Box>
              <Box mb={3}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={Boolean(ErrorMessage.name === 'password')}
                  helperText={<ErrorMessage name="password" component="span" style={{ color: 'red' }} />}
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  backgroundColor: '#3f51b5',
                  '&:hover': { backgroundColor: '#2e3b8e' },
                }}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
        <Link to='/admin/register'>
        <button className="text-blue-700 text-base font-medium mt-4">
          Sign up
        </button>
        </Link>
      </Paper>
    </Box>
  );
}
