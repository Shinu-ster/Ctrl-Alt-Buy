const mongoose = require("mongoose");
const getProducts = async (req, res) => {
  const Products = mongoose.model("products");
  try {
    const products = await Products.find();
    if (products.length === 0) {
      return res.status(404).json({
        message: "No Prodcuts found",
      });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.log("Error fetching photos:", error);
    return res.status(500).json({
      message: "Server error. Coudln't retrive products",
    });
  }
};
module.exports = getProducts;
