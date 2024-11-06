import { useState } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function AddProducts() {
  const [formData, setFormData] = useState({
    itemName: '',
    itemPrice: '',
    stocks: 1,
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImageFiles(Array.from(e.target.files)); // Convert FileList to Array
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.itemName) newErrors.itemName = 'Name is required';
    if (!formData.itemPrice) newErrors.itemPrice = 'Item Price is required';
    if (imageFiles.length === 0) newErrors.imageFiles = 'Please upload at least one image';
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData, imageFiles);
      // Submit the form (e.g., send data to the backend)
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <h2>Add Product</h2>

      <TextField
        label="Item Name"
        name="itemName"
        variant="standard"
        value={formData.itemName}
        onChange={handleChange}
        error={!!errors.itemName}
        helperText={errors.itemName}
      />

      <TextField
        label="Item Price"
        name="itemPrice"
        variant="standard"
        type="number"
        value={formData.itemPrice}
        onChange={handleChange}
        error={!!errors.itemPrice}
        helperText={errors.itemPrice}
      />

      <TextField
        label="Stocks"
        name="stocks"
        variant="standard"
        type="number"
        value={formData.stocks}
        onChange={handleChange}
        InputProps={{ inputProps: { min: 1 } }}
      />

      <Typography variant="body1">Add Product Images:</Typography>
      <Button variant="outlined" component="label">
        Select Images
        <input
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>

      {imageFiles.length > 0 && (
        <List dense>
          {imageFiles.map((file, index) => (
            <ListItem key={index}>
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
      )}

      {errors.imageFiles && (
        <Typography variant="caption" color="error">
          {errors.imageFiles}
        </Typography>
      )}

      <Button variant="contained" type="submit">Submit</Button>
    </Box>
  );
}
