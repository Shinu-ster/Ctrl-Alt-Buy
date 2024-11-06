const express = require('express');
const adminRegister = require('./controllers/adminRegister');
const adminLogin = require('./controllers/adminLogin');

const adminRouter = express.Router();
adminRouter.post('/login',adminLogin);
adminRouter.post('/register',adminRegister)


module.exports = adminRouter;