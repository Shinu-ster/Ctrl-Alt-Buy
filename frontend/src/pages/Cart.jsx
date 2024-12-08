import  { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import {loadStripe} from '@stripe/stripe-js';
import { Box, Typography, Button, CircularProgress, Checkbox, FormControlLabel } from "@mui/material";

const Cart = () => {
  const fetchCart = async () => {
    const authToken = localStorage.getItem("accessToken");
    const response = await axios.get("http://localhost:8000/cart/getCart", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  };

  const { isLoading, error, data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  // State to manage which items are selected
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (cartItemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(cartItemId)
        ? prevSelectedItems.filter((id) => id !== cartItemId) // Deselect
        : [...prevSelectedItems, cartItemId] // Select
    );
  };

  // Handle the case when cart data is loading, has errors, or is empty
  if (isLoading) {
    return (
      <div>
        <Navbar />
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <Typography variant="body1" color="error">
          Error loading cart data
        </Typography>
      </div>
    );
  }

  // Calculate total price for selected items
  const selectedItemsTotalPrice = cartData?.item
    .filter((item) => selectedItems.includes(item._id))
    .reduce((sum, cartItem) => sum + cartItem.totalPrice, 0);


    const makePayment = async () => {
      const authToken = localStorage.getItem('accessToken');
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    
      // Collect all the details of the selected items
      const selectedItemsDetails = cartData.item.filter(item =>
        selectedItems.includes(item._id) // Only selected items
      ).map(item => ({
        itemName: item.productId.itemName,
        quantity: item.quantity,
        imageUrl: item.productId?.imageUrl?.[0] || "", // Assuming the first image
        price: item.itemPrice,
        totalPrice: item.totalPrice
      }));
    
      const body = {
        products: selectedItemsDetails // Send the full details
      };
    
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };
    
      const response = await fetch("http://localhost:8000/pay/create-checkout-session", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
    
      const session = await response.json();
    
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    };
    

  return (
    <div>
      <Navbar />
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Your Cart
        </Typography>

        {cartData && cartData.item.length > 0 ? (
          <Box>
            {cartData.item.map((cartItem) => (
              <Box
                key={cartItem._id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                my={2}
                p={2}
                border="1px solid #ddd"
                borderRadius="8px"
              >
                {/* Checkbox to select item */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedItems.includes(cartItem._id)}
                      onChange={() => handleCheckboxChange(cartItem._id)}
                    />
                  }
                  
                />

                <img
                  src={`http://localhost:8000${cartItem.productId?.imageUrl?.[0] || ""}`}
                  alt={cartItem.productId.itemName}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "15px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Box flex="1">
                  <Typography variant="h6">{cartItem.productId.itemName}</Typography>
                  <Typography variant="body2">Qty: {cartItem.quantity}</Typography>
                  <Typography variant="body2">Price: ${cartItem.itemPrice}</Typography>
                </Box>
                <Typography variant="h6">${cartItem.totalPrice}</Typography>
              </Box>
            ))}

            <Box display="flex" justifyContent="space-between" mt={3}>
              <Typography variant="h5">Total:</Typography>
              <Typography variant="h5">${selectedItemsTotalPrice}</Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3 }}
              disabled={selectedItems.length === 0} // Disable if no item selected
              onClick={makePayment}
            >
              Pay ${selectedItemsTotalPrice}
            </Button>
          </Box>
        ) : (
          <Typography variant="body1">Your cart is empty.</Typography>
        )}
      </Box>
    </div>
  );
};

export default Cart;
