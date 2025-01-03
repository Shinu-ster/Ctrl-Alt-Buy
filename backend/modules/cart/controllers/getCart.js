const mongoose = require('mongoose');
const getCart = async(req,res)=>{
    const Cart = require('../../../models/cart.models');
    const userId = req.userId._id;
    console.log("User Id: ",userId);
    try{
        const cart = await Cart.findOne({userId}).populate('item.productId');
        if(cart.length===0){
            return res.status(404).json({
                message: "Add items in your cart to view them here"
            });
        }
        return res.status(200).json(cart);
    }catch(error){
        return res.status(500).json({
            message:"Server error. Couldnt retrive products"
        })
    }
}
module.exports = getCart;