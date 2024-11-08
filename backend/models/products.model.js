const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:[true,"Name is required"]
    },
    itemPrice:{
        type:Number,
        required:[true,"Item Price is required"]
    },
    stocks:{
        type:Number,
        required:[true]
    },
    imageUrl:[{
        type:String,
        required:[true,"Image URL is required"]
    }]
},{
    timestamps:true
})

const productModel = mongoose.model('products',productSchema);
module.exports = productModel;