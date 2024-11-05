const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const app = express();


require('./models/admin.model');
require('./models/users.model');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));



mongoose.connect(process.env.mongo_connect,{}).then(()=>{
    console.log('DB Connected');
})
.catch((e)=>{
    console.log('Connection failed',e);
})
app.listen(8000,()=>{
    console.log('Server started Succesfully');
})