import {
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function ViewOrders() {
  const fetchProducts = async () => {
    const authToken = localStorage.getItem("accessToken");
    const response = await axios.get("http://localhost:8000/products/getall", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  };

  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <>
        <div className="flex">
          <div className="w-72">
            <AdminSidebar />
          </div>
          <div className="flex-1 p-6">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return <>Error..</>;
  }

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "itemName", headerName: "Items", width: 150 },
    { field: "itemPrice", headerName: "Price", width: 100 },
    { field: "stocks", headerName: "Stock", width: 100 },
    { field: "orders", headerName: "Orders", width: 220 },
    { field: "update", headerName: "Update", width: 180 }
  ];

  // Map product data to fit DataGrid rows
  const rows = products.map((product, index) => ({
    id: product._id || index,
    itemName: product.itemName,
    itemPrice: product.itemPrice,
    stocks: product.stocks,
    orders: product.orders || "N/A",  // Assuming you have an `orders` field, otherwise set a default
    update: "Update" // Placeholder text for 'Update' column
  }));

  return (
    <div className="flex">
      <div className="w-72">
        <AdminSidebar />
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Paper sx={{ height: 600, width: "100%",margin:"auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </div>
  );
}

export default ViewOrders;
