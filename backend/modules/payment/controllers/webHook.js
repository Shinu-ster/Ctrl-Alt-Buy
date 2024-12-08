//Stripe webhook
// This example uses Express to receive webhooks
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
// const Order = require('../../../models/cart.models');
// const Product = require('../../../models/products.model')

const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);
  const Order = mongoose.model('Order')
  const Product = mongoose.model('products');
  const Cart = mongoose.model('Cart');

  // Transform the items array to include itemId references from your Product model
  const products = await Promise.all(Items.map(async (item) => {
    // Assuming 'Product' is the model for your product data
    const product = await Product.findOne({ itemName: item.itemName });

    return {
      itemId: product._id,  // Reference to the Product's ID
      quantity: item.quantity,
      price: item.price,
    };
  }));

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: products,
    subTotal: data.amount_subtotal,
    totalAmount: data.amount_total,
    shipping: data.customer_details,
    status: data.payment_status,
  });

  try {
    const savedOrder = await newOrder.save();
    console.log("Saved Order", savedOrder);

    await Cart.findOneAndUpdate({
      userId:customer.metadata.userId
    },
    {$pull:{item:{productId:{$in:products.map(p=>p.itemId)}}}}

  )

  console.log("items removed from the cart");
  await Promise.all(products.map(async (orderedProduct) => {
    const product = await Product.findById(orderedProduct.itemId);
    if (product) {
      // Decrease the stock by the ordered quantity
      product.stocks -= orderedProduct.quantity;

      if (product.stocks < 0) {
        throw new Error(`Not enough stock for product: ${product.itemName}`);
      }

      // Save the updated product
      await product.save();
      console.log(`Stock updated for product: ${product.itemName}, New Stock: ${product.stocks}`);
    }
  }));
  } catch (error) {
    console.log("Error in creating new order:", error.message);
  }
};


const webHook = (req,res)=>{
    const event = req.body;

    let data;
    let eventType;
    
    data = req.body.data.object;
    eventType = req.body.type;
    
    // Handle the event
    if(eventType === 'checkout.session.completed'){
      
       stripe.customers.retrieve(data.customer).then((customer)=>{
        console.log("Customer",customer);
        console.log("Data of customer",data);
        createOrder(customer,data);
       }).catch(error=>console.log('Error in stripe',error.message))
    }
    
    res.json({received: true});


}

module.exports = webHook;


// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body

