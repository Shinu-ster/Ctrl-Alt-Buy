import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Container,
  TextField,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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
  const formik = useFormik({
    initialValues: {
      itemName: "",
      itemPrice: "",
      stocks: 1,
      productImage: [],
    },
    validationSchema: Yup.object({
      itemName: Yup.string().required("Name is required"),
      itemPrice: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      stocks: Yup.number()
        .required("Stock is required")
        .positive("Stock must be at least 1"),
      productImage: Yup.array().min(1, "Please upload at least one image"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("itemName", values.itemName);
      formData.append("itemPrice", values.itemPrice);
      formData.append("stocks", values.stocks);

      values.productImage.forEach((file) => {
        formData.append("productImages", file);
      });

      axios.post('http://localhost:8000/products/addProducts', formData)
        .then((response) => {
          toast.success(response.data.status);
          formik.resetForm();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    },
  });

  const handleImageUpload = (event) => {
    formik.setFieldValue("productImage", Array.from(event.target.files));
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar with fixed width */}
        <div className="w-72">
          <AdminSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-gray-50">
          <Container component="main" maxWidth="sm" className="ml-2">
            <Box mt={5} mb={3} className="bg-white p-8 rounded-lg shadow-lg">
              {/* Heading */}
              <Typography variant="h4" className="font-bold text-center mb-6">
                Add Product
              </Typography>

              <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Item Name"
                  name="itemName"
                  value={formik.values.itemName}
                  onChange={formik.handleChange}
                  error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                  helperText={formik.touched.itemName && formik.errors.itemName}
                  className="mb-4"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Item Price"
                  name="itemPrice"
                  type="number"
                  value={formik.values.itemPrice}
                  onChange={formik.handleChange}
                  error={formik.touched.itemPrice && Boolean(formik.errors.itemPrice)}
                  helperText={formik.touched.itemPrice && formik.errors.itemPrice}
                  className="mb-4"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Stocks"
                  name="stocks"
                  type="number"
                  value={formik.values.stocks}
                  onChange={formik.handleChange}
                  error={formik.touched.stocks && Boolean(formik.errors.stocks)}
                  helperText={formik.touched.stocks && formik.errors.stocks}
                  className="mb-4"
                />
                
                {/* Image Upload Button */}
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

                {/* Show selected files */}
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
