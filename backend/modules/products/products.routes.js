const express = require('express');
const upload = require('../../middlewares/upload');
const addProduct = require('./controllers/addProdocts');
const adminAuth = require('../../middlewares/adminAuth');

const productsRouter = express.Router();

productsRouter.post('/addProducts',upload.array('productImages',5),adminAuth,addProduct);