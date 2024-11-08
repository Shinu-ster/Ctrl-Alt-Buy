import axios from "axios";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress } from "@mui/material";

export default function Shop() {
  const fetchProducts = async () => {
    const authToken = localStorage.getItem("accessToken");
    const response = await axios.get("http://localhost:8000/products/getall", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  };

  const { isLoading, error, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <>
    <Navbar/>
    <Box sx={{ display: 'flex' ,justifyContent:'center',alignItems:'center',height:'100vh'}}>
      <CircularProgress />
    </Box>
    
    </>;
  }

  if (error) {
    return <>Error..</>;
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
              {/* Product Image */}
              <img
                src={`http://localhost:8000${product.imageUrl[0]}`}
                alt={product.itemName}
                className="w-full h-48 object-cover"
              />

              {/* Product Details */}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.itemName}</h2>
                <p className="text-lg text-green-500 mt-2">{`$${product.itemPrice}`}</p>
                <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 focus:outline-none">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
