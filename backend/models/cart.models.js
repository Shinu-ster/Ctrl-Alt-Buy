const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"products",
        required:true,
    },
    itemName:{
        type:String,
        required:true
    },
    itemPrice:{
        type:Number,
        required:true,
    },
    quality:{
        type:Number,
        required:true,
        default:1
    },
    totalPrice:{
        type:Number,
        required:true,
        default:function(){
            return this.itemPrice * this.quantity;
        }
    }
});

const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },
    item:[cartItemSchema],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
});
CartSchema.pre('save',function(next){
    this.updatedAt = Date.now();
    next();
});

const Cart = mongoose.model("Cart",CartSchema);
mondule.exports = Cart;