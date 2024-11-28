const mongoose = require('mongoose');

// Define the schema for the Order model
const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference to the User model
    required: true 
  },
  customerId:{
    type:String,
  },
  paymentIntentId:{type:String},
  products: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',  // Reference to the Product model
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  subTotal:{
    type:Number,
    required:true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now  // Automatically set the current date and time when the order is created
  },
  status: {
    type: String,
    default: 'pending'  // Set default status as 'pending'
  },
  shipping:{type:Object,required:true}
});

// Create and export the model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
