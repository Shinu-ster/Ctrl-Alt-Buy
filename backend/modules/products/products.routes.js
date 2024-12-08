const express = require('express');
const upload = require('../../middlewares/upload');
const addProduct = require('./controllers/addProdocts');
const adminAuth = require('../../middlewares/adminAuth');
const getProducts = require('./controllers/getAllProducts');
const auth = require('../../middlewares/auth');
const getSingleProduct = require('./controllers/getSingleProduct');
const updateStocks = require('./controllers/updateStocks');

const productsRouter = express.Router();

productsRouter.post('/addProducts',upload.array('productImages',5),addProduct);
productsRouter.get('/getall',getProducts);
productsRouter.get('/item/:id',getSingleProduct);
productsRouter.put('/updateStocks/:id',updateStocks)

module.exports = productsRouter;