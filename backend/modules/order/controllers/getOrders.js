const mongoose = require('mongoose');


const getOrder=async(req,res)=>{
const Order = mongoose.model('Order');
    try {
        const orders = await Order.find();
        if(orders.length === 0){
            return res.status(404).json({
                message:"No products found"
            })
        }
        return res.status(200).json(orders);
    } catch (error) {
        console.log('Error fetching orders',error);
        return res.status(500).json({
            message:"Server error. Couldn't retrive orders"
        })
    }

}
module.exports = getOrder;