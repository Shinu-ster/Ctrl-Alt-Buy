// models/productModel.js
const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, "Specification key is required"],
  },
  value: {
    type: String,
    required: [true, "Specification value is required"],
  },
});

const productSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, "Name is required"],
  },
  itemPrice: {
    type: Number,
    required: [true, "Item Price is required"],
  },
  stocks: {
    type: Number,
    required: [true, "Stock is required"],
    min: [1, "Stock must be at least 1"],
  },
  imageUrl: [
    {
      type: String,
      required: [true, "Image URL is required"],
    },
  ],
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  typeofItem: {
    type: String,
    required: [true, "Item type is required"],
    enum: {
      values: ["mouse", "keyboard", "headphones", "mousepad", "monitor", "components"],
      message: "{VALUE} is not supported",
    },
  },
  specifications: {
    type: [specificationSchema],
    required: [true, "Specifications are required"],
  },
}, { timestamps: true });

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
