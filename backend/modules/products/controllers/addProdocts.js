const mongoose = require('mongoose');
const addProduct = async (req,res)=>{
    const {itemName,itemPrice,stocks} = req.body;
    const productImage = req.files;

    if(!productImage || productImage.length === 0){
        return res.status(400).json({message: "No images uploaded"})
    }

    try {
        if(!itemName || !itemPrice) {
            return res.status(400).json({
                message:"Please provide item name and price"
            })
        }
        const parsedItemPrice = parseFloat(itemPrice);
        const parseStocks = parseInt(stocks);
        
        const productData = {
            itemName,
            itemPrice:parsedItemPrice,
            stock:parseStocks,
            imageUrl:productImage.map((file)=> '/uploads/'+file.filename)
        }

        const Products = mongoose.model('products');
        const createProduct = await Products.create(productData);

        return res.status(200).json({
            status:"Succesfully added to the database"
        })
    } catch (error) {
        return res.status(400).json({
            status:"Product creation failed",
            message:error.message || error,
        })
    }
    
}

module.exports = addProduct;