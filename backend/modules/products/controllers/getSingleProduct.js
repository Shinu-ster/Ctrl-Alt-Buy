const mongoose = require('mongoose');

const getSingleProduct = async (req,res)=>{
    const Products = mongoose.model('products');
    const id = req.params.id;
    console.log(id);
    try {
        const product = await Products.findById(id)
        if (!product) {
            return res.status(400).json({
                message:"No product found"
            });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({
            message:"Failed fetching product",
        })
    }
}
module.exports = getSingleProduct;