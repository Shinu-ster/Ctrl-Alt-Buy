import axios from "axios";
import Navbar from "../components/Navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Function to add items to the cart
const addToCart = async (cartItem) => {
  const authToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      "http://localhost:8000/cart/addtoCart",
      { cartItem: [cartItem] },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add to cart");
  }
};

export default function Shop() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      console.log("Added successfully:", data);
      queryClient.invalidateQueries(["cart"]);

      // Optional: Update any state here, e.g., cart count
    },
    onError: (error) => {
      console.error("Add to cart failed:", error);
      alert(error.message);  // Optional: Show error to user
    }
  });

  const checkLogin = (product) => {
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
      mutation.mutate({...product,quantity:1,productId: product._id});
    } else {
      handleOpen();  // Open modal if user isn't logged in
    }
  };

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:8000/products/getall");
    return response.data;
  };

  const { isLoading, error, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (error) {
    return <>Error loading products...</>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Shop</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link to={`/productdetails/${product._id}`}>
                <img
                  src={`http://localhost:8000${product.imageUrl[0]}`}
                  alt={product.itemName}
                  className="w-full h-48 object-cover"
                />
                <h2 className="text-xl font-semibold p-4">{product.itemName}</h2>
                <h3 className="text-xl font-extralight p-2 truncate">{product.description}</h3>
              </Link>

              {/* Product Price and Button */}
              <div className="p-4">
                <p className="text-lg text-green-500">{`$${product.itemPrice}`}</p>
                <button
                  className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none"
                  onClick={() => checkLogin(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login Required
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please <Link to='/login' className="text-blue-600">log in</Link> to add items to your cart.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
