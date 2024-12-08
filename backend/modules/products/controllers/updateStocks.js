const mongoose = require('mongoose');
// Function to update product stock
const updateStocks = async (req, res) => {
    const Product = mongoose.model('Products'); // Assuming you have a Mongoose model for products
  try {
    const productId = req.params.id; // Extract product ID from the request parameters
    const { stock } = req.body; // Extract the new stock value from the request body

    // Validate stock value
    if (typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({ message: 'Invalid stock value' });
    }

    // Find the product by ID and update its stock
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { stocks: stock },
      { new: true } // Return the updated document
    );

    // If product not found
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Success response
    res.status(200).json({ message: 'Stock updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = updateStocks;
