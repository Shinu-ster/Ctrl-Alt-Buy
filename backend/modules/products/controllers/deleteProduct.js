const mongoose = require("mongoose");

const deleteProduct = async (req, res) => {
  const Product = mongoose.model("products");
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product deleted Succesfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleteing product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = deleteProduct;
