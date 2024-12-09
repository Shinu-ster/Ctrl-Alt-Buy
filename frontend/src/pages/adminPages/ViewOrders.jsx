import React from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminSidebar from "../../components/AdminSidebar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ViewOrders() {
  const navigate = useNavigate();
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

  const fetchOrder = async () => {
    const authToken = localStorage.getItem("adminAT");
    const response = await axios.get("http://localhost:8000/order/all", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  };

  const { isLoading, error, data: orders } = useQuery({
    queryKey: ["order"],
    queryFn: fetchOrder,
  });

  if (isLoading) {
    return (
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
    );
  }

  if (error) {
    return <>Error..</>;
  }

  const handlePrint = (order) => {
    const printContent = `
      Order ID: ${order.id}
      Items: ${order.itemName}
      Sub Total: $${order.itemPrice}
      Status: ${order.status}
      Shipping Address: ${order.shipping_address}
    `;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`<pre>${printContent}</pre>`);
    newWindow.print();
    newWindow.close();
  };

  const columns = [
    { field: "id", headerName: "OrderId", width: 150 },
    { field: "itemName", headerName: "Items", width: 250 },
    { field: "itemPrice", headerName: "Sub Total", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "shipping_address", headerName: "Shipping Address", width: 200 },
    {
      field: "print",
      headerName: "Print",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePrint(params.row)}
        >
          Print
        </Button>
      ),
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    itemName: order.products
      .map(
        (product) =>
          `${product.quantity} x Item ID: ${product.itemId} ($${product.price} each)`
      )
      .join(", "),
    itemPrice: order.subTotal,
    status: order.status,
    shipping_address: `${order.shipping.address.line1}, ${order.shipping.address.city}, ${order.shipping.address.country}, ${order.shipping.address.postal_code}`,
  }));

  return (
    <div className="flex">
      <div className="w-72">
        <AdminSidebar />
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <Paper sx={{ height: 600, width: "100%", margin: "auto" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </div>
  );
}

export default ViewOrders;
