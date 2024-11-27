const express = require('express');
const auth = require('../../middlewares/auth');
const createPayment = require('./controllers/createPayment');
const paymentRouter = express.Router();


paymentRouter.post('/create-checkout-session',auth,createPayment)

module.exports = paymentRouter;