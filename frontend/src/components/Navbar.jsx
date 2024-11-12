import { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Badge, Popover, Box, Typography, Button } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";

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
            <Badge color="error">
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
              <Typography variant="body2">Your cart is empty.</Typography>
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
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
