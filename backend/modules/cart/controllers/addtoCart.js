const mongoose = require('mongoose');

const addtoCart = async (req,res)=>{
    const Cart = require('../../../models/cart.models');
    const {cartItem} = req.body;
    const userId = req.userId;
    
    try {
            if(!userId) throw new Error ("User id required");
            if(!cartItem || !Array.isArray(cartItem) || cartItem.length === 0){
                throw new Error("Items are required and should be in array");
            }
            let cart = await Cart.findOne({userId});

            if(!cart){
                cart = await Cart.create({userId,item:cartItem});
            }else{
                cartItem.forEach(newItem=>{
                    const existingItem = cart.item.find(item => item.productId.equals(newItem.productId));
                    if(existingItem){
                        existingItem.quantity += newItem.quantity || 1;
                    }else{
                        cart.item.push(newItem);
                    }
                });
                await cart.save();
            }
            res.status(200).json({
                status:"Added to cart Succesfully",
                cart,
            })
    } catch (error) {
        res.status(400).json({
            status:"Add to cart failed",
            message:error.message,
        })
    }
}

module.exports = addtoCart;