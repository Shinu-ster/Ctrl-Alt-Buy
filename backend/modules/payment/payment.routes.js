const express = require('express');
const auth = require('../../middlewares/auth');
const createPayment = require('./controllers/createPayment');
const webHook = require('./controllers/webHook');
const bodyParser = require('body-parser');
const paymentRouter = express.Router();


paymentRouter.post('/create-checkout-session',auth,createPayment)
paymentRouter.post(
    '/webhook',
    bodyParser.raw({ type: 'application/json' }),
    webHook
  );

module.exports = paymentRouter;