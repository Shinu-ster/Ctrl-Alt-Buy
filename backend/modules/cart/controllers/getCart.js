const mongoose = require('mongoose');
const getCart = async(req,res)=>{
    const Cart = mongoose.model('Cart');
    const userId = req.userId;
    try{
        const cart = await Cart.findById({userId}).populate('item.productId');
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