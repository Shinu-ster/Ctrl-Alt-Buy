import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNo: '',
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate and submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.phoneNo) {
      newErrors.phoneNo = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNo)) {
      newErrors.phoneNo = 'Phone number must be exactly 10 digits';
    }else {
        delete newErrors.phoneNo;  // Ensures no leftover error if valid
      }

    if (Object.keys(newErrors).length === 0) {
      // Submit the form (e.g., send data to the backend)
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h2>Register</h2>

      <TextField
        label="Username"
        name="username"
        variant="standard"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
      />

      <TextField
        label="Email"
        name="email"
        variant="standard"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        label="Password"
        name="password"
        variant="standard"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />

      <TextField
        label="Phone Number"
        name="phoneNo"
        variant="standard"
        value={formData.phoneNo}
        onChange={handleChange}
        error={!!errors.phoneNo}
        helperText={errors.phoneNo}
      />

      <Button variant="contained" type="submit">Submit</Button>
    </Box>
  );
}
