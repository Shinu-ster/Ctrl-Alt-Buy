import { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Badge, Popover, Box, Typography, Button, CircularProgress } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Open dropdown on cart icon click
  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const fetchCart = async () => {
    const response = await axios.get('http://localhost:8000/cart/getCart'); // Ensure correct URL
    return response.data;
  };

  const { isLoading, error, data: cart } = useQuery({
    queryKey: ['cart'],
    queryFn: fetchCart,
  });

  // Calculate total price if cart data exists
  const totalPrice = cart?.item.reduce((sum, cartItem) => sum + cartItem.totalPrice, 0);

  return (
    <nav className="bg-[#4CAF50] text-white shadow-md" style={{ height: '64px' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-full">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src="src/assets/logo.jpg" className="w-32 h-auto" alt="Home Logo" />
          </Link>
        </div>

        {/* Cart Icon with Badge */}
        <div>
          <IconButton onClick={handleCartClick}>
            <Badge color="error" badgeContent={cart?.item?.length || 0}>
              <ShoppingCartIcon sx={{ color: "white" }} />
            </Badge>
          </IconButton>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Box sx={{ p: 2, width: "300px" }}>
              <Typography variant="h6">Your Cart</Typography>

              {isLoading ? (
                <CircularProgress />
              ) : error ? (
                <Typography variant="body2" color="error">
                  Could not load cart items.
                </Typography>
              ) : cart?.item?.length > 0 ? (
                <Box>
                  {cart.item.map((cartItem) => (
                    <Box key={cartItem.productId} display="flex" alignItems="center" my={1}>
                      <img
                        src={`http://localhost:8000${cartItem.productId.imageUrl[0]}`} // Use actual image URL path
                        alt={cartItem.itemName}
                        style={{ width: "50px", height: "50px", marginRight: "10px" }}
                      />
                      <Box flex="1">
                        <Typography variant="body2">{cartItem.itemName}</Typography>
                        <Typography variant="body2">Qty: {cartItem.quantity}</Typography>
                      </Box>
                      <Typography variant="body2">${cartItem.totalPrice}</Typography>
                    </Box>
                  ))}
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="body1">Total:</Typography>
                    <Typography variant="body1">${totalPrice}</Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    component={Link}
                    to="/cart"
                    onClick={handleClose}
                  >
                    View Cart
                  </Button>
                </Box>
              ) : (
                <Typography variant="body2">Your cart is empty.</Typography>
              )}
            </Box>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
