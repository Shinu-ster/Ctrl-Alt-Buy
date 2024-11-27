// src/pages/admin/AddProducts.jsx
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../components/AdminSidebar";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddProducts() {
  const [specificationKey, setSpecificationKey] = useState("");
  const [specificationValue, setSpecificationValue] = useState("");
  const [specifications, setSpecifications] = useState([]);

  const formik = useFormik({
    initialValues: {
      itemName: "",
      itemPrice: "",
      stocks: 1,
      description: "",
      typeofItem: "",
      productImage: [],
    },
    validationSchema: Yup.object({
      itemName: Yup.string().required("Name is required"),
      itemPrice: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      stocks: Yup.number()
        .required("Stock is required")
        .min(1, "Stock must be at least 1"),
      description: Yup.string().required("Description is required"),
      typeofItem: Yup.string().required("Item type is required"),
      productImage: Yup.array().min(1, "Please upload at least one image"),
      specifications: Yup.array()
        .of(
          Yup.object().shape({
            key: Yup.string().required("Specification key is required"),
            value: Yup.string().required("Specification value is required"),
          })
        )
        .min(1, "Please add at least one specification"),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("itemName", values.itemName);
        formData.append("itemPrice", values.itemPrice);
        formData.append("stocks", values.stocks);
        formData.append("description", values.description);
        formData.append("typeofItem", values.typeofItem);
        formData.append("specifications", JSON.stringify(specifications));

        values.productImage.forEach((file) => {
          formData.append("productImages", file);
        });

        const response = await axios.post('http://localhost:8000/products/addProducts', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(response.data.status);
        formik.resetForm();
        setSpecifications([]);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    },
  });

  const handleImageUpload = (event) => {
    formik.setFieldValue("productImage", Array.from(event.target.files));
  };

  const handleAddSpecification = () => {
    if (specificationKey.trim() === "" || specificationValue.trim() === "") {
      toast.error("Both key and value are required for specifications.");
      return;
    }

    // Check for duplicate keys
    const duplicate = specifications.find(
      (spec) => spec.key.toLowerCase() === specificationKey.toLowerCase()
    );
    if (duplicate) {
      toast.error("Specification key already exists.");
      return;
    }

    setSpecifications([
      ...specifications,
      { key: specificationKey.trim(), value: specificationValue.trim() },
    ]);
    setSpecificationKey("");
    setSpecificationValue("");
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecs);
  };

  return (
    <>
      <div className="flex">
        <div className="w-72">
          <AdminSidebar />
        </div>

        <div className="flex-1 p-6 bg-gray-50">
          <Container component="main" maxWidth="md" className="ml-2">
            <Box mt={5} mb={3} className="bg-white p-8 rounded-lg shadow-lg">
              <Typography variant="h4" className="font-bold text-center mb-6">
                Add Product
              </Typography>

              <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                {/* Item Name */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Item Name"
                  name="itemName"
                  value={formik.values.itemName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                  helperText={formik.touched.itemName && formik.errors.itemName}
                  className="mb-4"
                />

                {/* Item Price */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Item Price"
                  name="itemPrice"
                  type="number"
                  value={formik.values.itemPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.itemPrice && Boolean(formik.errors.itemPrice)}
                  helperText={formik.touched.itemPrice && formik.errors.itemPrice}
                  className="mb-4"
                />

                {/* Stocks */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Stocks"
                  name="stocks"
                  type="number"
                  value={formik.values.stocks}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.stocks && Boolean(formik.errors.stocks)}
                  helperText={formik.touched.stocks && formik.errors.stocks}
                  className="mb-4"
                  inputProps={{ min: 1 }}
                />

                {/* Description */}
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                  className="mb-4"
                />

                {/* Specifications */}
                <Box mb={4}>
                  <Typography variant="h6" gutterBottom>
                    Specifications
                  </Typography>
                  <Box display="flex" gap={2} mb={2}>
                    <TextField
                      label="Specification Key"
                      value={specificationKey}
                      onChange={(e) => setSpecificationKey(e.target.value)}
                      fullWidth
                      variant="outlined"
                      onBlur={() => {}}
                    />
                    <TextField
                      label="Specification Value"
                      value={specificationValue}
                      onChange={(e) => setSpecificationValue(e.target.value)}
                      fullWidth
                      variant="outlined"
                      onBlur={() => {}}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddSpecification}
                    fullWidth
                    className="mb-4 py-2"
                  >
                    Add Specification
                  </Button>
                  {specifications.length > 0 && (
                    <List>
                      {specifications.map((spec, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <Button
                              color="secondary"
                              onClick={() => handleRemoveSpecification(index)}
                            >
                              Remove
                            </Button>
                          }
                        >
                          <Typography>
                            <strong>{spec.key}:</strong> {spec.value}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  )}
                  {formik.touched.specifications && formik.errors.specifications && (
                    <Box color="error.main" mt={1}>
                      {typeof formik.errors.specifications === 'string'
                        ? formik.errors.specifications
                        : formik.errors.specifications.map((err, idx) => (
                            <Typography key={idx}>{`Spec ${idx + 1}: ${err.key || err.value}`}</Typography>
                          ))}
                    </Box>
                  )}
                </Box>

                {/* Type of Item */}
                <FormControl fullWidth variant="outlined" className="mb-6">
                  <InputLabel>Type of Item</InputLabel>
                  <Select
                    name="typeofItem"
                    value={formik.values.typeofItem}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Type of Item"
                    error={formik.touched.typeofItem && Boolean(formik.errors.typeofItem)}
                  >
                    <MenuItem value="mouse">Mouse</MenuItem>
                    <MenuItem value="keyboard">Keyboard</MenuItem>
                    <MenuItem value="headphones">Headphones</MenuItem>
                    <MenuItem value="mousepad">Mousepad</MenuItem>
                    <MenuItem value="monitor">Monitor</MenuItem>
                    <MenuItem value="components">Components</MenuItem>
                  </Select>
                  {formik.touched.typeofItem && formik.errors.typeofItem && (
                    <Box color="error.main" mt={1}>
                      {formik.errors.typeofItem}
                    </Box>
                  )}
                </FormControl>

                {/* Product Images */}
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  className="mb-4 py-2"
                >
                  Upload Product Images
                  <VisuallyHiddenInput
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    name="productImage"
                  />
                </Button>

                {formik.errors.productImage && formik.touched.productImage && (
                  <Box color="error.main" mt={1}>
                    {formik.errors.productImage}
                  </Box>
                )}

                {/* Selected Images Preview */}
                {formik.values.productImage.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="body1" className="font-semibold mb-2">
                      {formik.values.productImage.length} file(s) selected:
                    </Typography>
                    <List>
                      {formik.values.productImage.map((file, index) => (
                        <ListItem key={index}>{file.name}</ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "16px" }}
                  className="py-2"
                >
                  Add Product
                </Button>
              </form>
            </Box>
          </Container>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
