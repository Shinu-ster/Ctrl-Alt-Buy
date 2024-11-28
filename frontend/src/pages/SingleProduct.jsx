import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BreadCrumbs from "../components/BreadCrumbs";
import Carousel from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer, toast } from "react-toastify";

// Fetch Product details
const fetchProduct = async (id) => {
  const authToken = localStorage.getItem("accessToken");
  const response = await axios.get(
    `http://localhost:8000/products/item/${id}`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response.data;
};

const addToCart = async (cartItem) => {
  const authToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      "http://localhost:8000/cart/addtoCart",
      { cartItem: [cartItem] },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add to cart");
  }
};

function SingleProduct() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
  });

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Added to cart");
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Add to cart failed", error);
      toast.error("Adding to cart failed");
    },
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
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
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h6" color="error">
            Error: {error.message}
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <BreadCrumbs itemName={product.itemName} />
      <ToastContainer />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "row",
          mt: 4,
        }}
      >
        {/* Left side: Product Image */}
        <Box sx={{ width: "50%", padding: 2 }}>
          {/* Conditionally render the Carousel only if there are multiple images */}
          {product.imageUrl?.length > 1 ? (
            <Carousel
              dots={true}
              infinite={true}
              slidesToShow={1}
              slidesToScroll={1}
              centerMode={false}
              focusOnSelect={true}
            >
              {product.imageUrl?.map((image, index) => (
                <Box
                  key={index} // Using a unique key based on the image URL
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px", // Padding for better image positioning
                  }}
                >
                  <img
                    src={`http://localhost:8000${image}`}
                    alt={product.itemName}
                    style={{
                      width: "100%", // Adjust width as needed
                      height: "600px", // Set a fixed height for the image
                      objectFit: "cover", // Ensure the image covers the area without distortion
                    }}
                  />
                </Box>
              ))}
            </Carousel>
          ) : (
            // If there's only one image, display it directly without Carousel
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={`http://localhost:8000${product.imageUrl[0]}`}
                alt={product.itemName}
                style={{
                  width: "100%", // Adjust width as needed
                  height: "600px", // Set a fixed height for the image
                  objectFit: "cover", // Ensure the image covers the area without distortion
                }}
              />
            </Box>
          )}
        </Box>

        {/* Right side: Product Details */}
        <Box sx={{ width: "50%", padding: 2 }}>
          <Typography variant="h4">{product.itemName}</Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
            Price: ${product.itemPrice}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Specifications:
          </Typography>
          <Box sx={{ mt: 1, ml: 2 }}>
            {console.log(product)}
            {product.specifications && product.specifications.length > 0 ? (
              product.specifications.map((spec, index) => (
                <Typography key={index} variant="body2" sx={{ mt: 0.5 }}>
                  <strong>{spec.key}:</strong> {spec.value}
                </Typography>
              ))
            ) : (
              <Typography variant="body2">
                No specifications available
              </Typography>
            )}
          </Box>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Descriptions: <br />
            {product.description}
          </Typography>
          <Typography
            variant="body2"
            color={product.stocks > 0 ? "text.primary" : "error"}
            sx={{ mt: 2 }}
          >
            {product.stocks > 0
              ? `In stock: ${product.stocks}`
              : "Out of stock"}
          </Typography>

          {/* Action Buttons */}
          {/* Action Buttons */}
          <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddShoppingCartIcon />}
              sx={{ padding: "12px 24px" }}
              onClick={() => {
                // Trigger the mutation to add to cart
                mutation.mutate({
                  productId: product._id,
                  itemName: product.itemName,
                  itemPrice: product.itemPrice,
                  imageUrl: product.imageUrl[0], // Send the first image as a preview (if needed)
                  quantity: 1, // Default quantity when adding a new item
                });
              }}
              disabled={mutation.isLoading} // Disable the button while the mutation is in progress
            >
              {mutation.isLoading ? "Adding..." : "Add to Cart"}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              startIcon={<ShoppingCartIcon />}
              sx={{ padding: "12px 24px" }}
            >
              Buy Now
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SingleProduct;
