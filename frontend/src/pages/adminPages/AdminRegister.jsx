import { Button, TextField, Typography, Paper, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import * as Yup from 'yup';

export default function AdminRegister() {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password should be minimum 6 characters').required('Password is required'),
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
          Admin Register
        </Typography>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('Form values:', values);
            axios
              .post('http://localhost:8000/admin/register', values)
              .then((response) => {
                toast.success(response.data.status);
                setTimeout(() => {
                  navigate('/login');
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
                  name="name"
                  as={TextField}
                  label="Full Name"
                  fullWidth
                  variant="outlined"
                  error={Boolean(ErrorMessage.name === 'name')}
                  helperText={<ErrorMessage name="name" component="span" style={{ color: 'red' }} />}
                />
              </Box>
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
                {isSubmitting ? 'Registering...' : 'Register'}
              </Button>
            </Form>
          )}
        </Formik>
        <ToastContainer />
        <Link to='/admin/login'>
        <button className="text-blue-700 text-base font-medium mt-4">
          Sign in
        </button>
        </Link>
      </Paper>
    </Box>
  );
}
