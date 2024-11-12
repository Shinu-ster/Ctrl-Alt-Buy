import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Typography, Card, CardContent, CardMedia } from "@mui/material";
import BreadCrumbs from "../components/BreadCrumbs";

const fetchProduct = async (id) => {
    const authToken = localStorage.getItem("accessToken");
    const response = await axios.get(`http://localhost:8000/products/item/${id}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    return response.data;
};


function SingleProduct() {
    const { id } = useParams();
    const { isLoading, error, data: product } = useQuery({
        queryKey: ["product", id],
        queryFn: () => fetchProduct(id),
    });

    if (isLoading) {
        return (
            <>
                <Navbar />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <CircularProgress />
                </Box>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <Typography variant="h6" color="error">Error: {error.message}</Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <BreadCrumbs itemName ={product.itemName}/>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mt: 4 }}>
                <Card sx={{ maxWidth: 500, boxShadow: 3 }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={`http://localhost:8000${product.imageUrl[0]}`}
                        alt={product.itemName}
                    />
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {product.itemName}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            Price: ${product.itemPrice}
                        </Typography>
                        <Typography variant="body2" color={product.stocks > 0 ? "text.primary" : "error"} sx={{ mt: 1 }}>
                            {product.stocks > 0 ? `In stock: ${product.stocks}` : "Out of stock"}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
}

export default SingleProduct;
