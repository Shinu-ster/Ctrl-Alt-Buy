const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const app = express();


require('./models/admin.model');
require('./models/users.model');
require('./models/products.model');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));



mongoose.connect(process.env.mongo_connect,{}).then(()=>{
    console.log('DB Connected');
})
.catch((e)=>{
    console.log('Connection failed',e);
})

app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.listen(8000,()=>{
    console.log('Server started Succesfully');
})