const express = require('express');
const upload = require('../../middlewares/upload');
const addProduct = require('./controllers/addProdocts');
const adminAuth = require('../../middlewares/adminAuth');
const getProducts = require('./controllers/getAllProducts');

const productsRouter = express.Router();

productsRouter.post('/addProducts',upload.array('productImages',5),addProduct);
productsRouter.get('/getall',getProducts)

module.exports = productsRouter;