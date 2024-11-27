require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const createPayment = async (req, res) => {
  // console.log("Payment body",req.body);
  const { products } = req.body;
  console.log("Products:", products);
  const line_items = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.itemName
        // images: Array.isArray(product.imageUrl)
        //   ? product.imageUrl
        //   : [product.imageUrl],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.json({ id: session.id });
};
module.exports = createPayment;
