  import {  useState } from "react";
  import { Link } from "react-router-dom";
  import {
    IconButton,
    Badge,
    Popover,
    Box,
    Typography,
    Button,
    CircularProgress,
  } from "@mui/material";
  import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
  import axios from "axios";
  
  

  import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);


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

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  return (
    <nav className="text-white shadow-md" style={{ height: "64px" }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-full">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src="/logo/NavLogo.png"
              className="w-52 h-16 object-contain"
              alt="Home Logo"
            />
          </Link>
        </div>

        {/* Cart Icon with Badge */}
        <div>
          <IconButton onClick={handleCartClick}>
            <Badge color="error" badgeContent={cartData?.item?.length || 0}>
              <ShoppingCartIcon sx={{ color: "black" }} />
            </Badge>
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
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
              ) : cartData && cartData.item.length > 0 ? (
                <Box>
                  {cartData.item.map((cartItem) => (
                    <Box
                      key={cartItem._id}
                      display="flex"
                      alignItems="center"
                      my={1}
                    >
                      <img
                        src={`http://localhost:8000${
                          cartItem.productId?.imageUrl?.[0] || ""
                        }`}
                        alt={cartItem.itemName}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                      <Box flex="1">
                        <Typography variant="body2">
                          {cartItem.productId.itemName}
                        </Typography>
                        <Typography variant="body2">
                          Qty: {cartItem.quantity}
                        </Typography>
                        <Typography variant="body2">
                          Price: ${cartItem.itemPrice}
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        ${cartItem.totalPrice}
                      </Typography>
                    </Box>
                  ))}

                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="body1">Total:</Typography>
                    <Typography variant="body1">
                      $
                      {cartData.item.reduce(
                        (sum, cartItem) => sum + cartItem.totalPrice,
                        0
                      )}
                    </Typography>
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
