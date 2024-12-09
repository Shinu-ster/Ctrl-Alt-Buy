import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {toast,ToastContainer} from 'react-toastify'
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminViewProducts() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Check admin login
  const checkAdminLogin = () => {
    const auth = localStorage.getItem("adminAT");
    if (!auth) {
      console.log("User isn't logged in");
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    checkAdminLogin();
  }, []);

  // Fetch products function
  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:8000/products/getall");
    return response.data;
  };

  // Update stock function
  const updateStock = async ({ productId, newStock }) => {
    const response = await axios.put(`http://localhost:8000/products/updateStocks/${productId}`, { stock: newStock });
    return response.data;
  };

  // Delete product function
  const deleteProduct = async (productId) => {
    const response = await axios.delete(`http://localhost:8000/products/delete/${productId}`);
    return response.data;
  };

  // React Query hooks
  const { isLoading, error, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const updateStockMutation = useMutation({
    mutationFn: updateStock,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]); // Refresh product list after stock update
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success('Product Deleted'); // Refresh product list after deletion
    },
  });

  if (isLoading) {
    return (
      <div className="flex">
        <div className="w-72">
          <AdminSidebar />
        </div>
        <div className="flex-1 p-6">
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
          </Box>
        </div>
      </div>
    );
  }

  if (error) {
    return ( <div className="flex">
    <div className="w-72">
      <AdminSidebar />
    </div>
    <div className="flex-1 p-6">
      <p>No Products</p>
    </div>
  </div>);
  }

  // UI for displaying all products
  return (
    <div className="flex">
      <div className="w-72">
        <AdminSidebar />
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Update Stock</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={`http://localhost:8000${product.imageUrl[0]}`}
                      alt={product.itemName}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell>{product.itemName}</TableCell>
                  <TableCell>${product.itemPrice}</TableCell>
                  <TableCell>{product.stocks}</TableCell>
                  <TableCell>
                    <StockUpdater
                      productId={product._id}
                      currentStock={product.stocks}
                      onUpdate={(newStock) => {
                        updateStockMutation.mutate({ productId: product._id, newStock });
                      }}
                      isLoading={updateStockMutation.isLoading}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteMutation.mutate(product._id)}
                      disabled={deleteMutation.isLoading}
                    >
                      {deleteMutation.isLoading ? "Deleting..." : "Delete Item"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <ToastContainer/>
    </div>
  );
}

// Component to handle stock update
function StockUpdater({ productId, currentStock, onUpdate, isLoading }) {
  const [newStock, setNewStock] = useState(currentStock);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <TextField
        type="number"
        value={newStock}
        onChange={(e) => setNewStock(Number(e.target.value))}
        size="small"
        sx={{ width: 80 }}
        disabled={isLoading}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onUpdate(newStock)}
        disabled={isLoading || newStock === currentStock}
      >
        Update
      </Button>
    </Box>
  );
}

export default AdminViewProducts;
