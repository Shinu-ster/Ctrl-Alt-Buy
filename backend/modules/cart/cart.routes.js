const express = require('express');
const addtoCart = require('./controllers/addtoCart');
const auth = require('../../middlewares/auth');
const getCart = require('./controllers/getCart');

const cartRouter = express.Router();

cartRouter.post('/addtoCart',auth,addtoCart);
cartRouter.get('/getCart',auth,getCart);

module.exports = cartRouter;