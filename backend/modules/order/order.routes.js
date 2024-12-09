const express = require('express');
const adminAuth = require('../../middlewares/adminAuth');
const getOrder = require('./controllers/getOrders');
const orderRouter = express.Router();



orderRouter.get('/all',adminAuth,getOrder);


module.exports = orderRouter;