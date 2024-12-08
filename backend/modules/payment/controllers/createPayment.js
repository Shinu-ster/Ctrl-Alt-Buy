require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Mongoose = require('mongoose')

const createPayment = async (req, res) => {
  const { products } = req.body;
  console.log("user Id from payment",req.userId._id);
  const customer = await stripe.customers.create({
    metadata:{
      userId:req.userId._id,
      cart:JSON.stringify(products)
    }
  })
  const Order = Mongoose.model('Order');
  // Log the products to check the data being sent
  console.log("Products:", products);

  const line_items = products.map((product) => {
    return {
      price_data: {
        currency: "npr",
        product_data: {
          name: product.itemName,
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    };
  });

  try {




    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Supported payment methods
      line_items, // The line items in the checkout session
      customer:customer.id,
      mode: "payment", // Mode for the checkout session
      success_url: "http://localhost:5173/success", // Redirect URL after successful payment
      cancel_url: "http://localhost:5173/cancel", 
      shipping_address_collection: {
        allowed_countries: ["NP"], 
      },
    });



    // Send back the session ID to the client
    res.json({ id: session.id });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating Stripe session:", error);
    res.status(500).send("Error creating Stripe session");
  }
};




module.exports = createPayment;
