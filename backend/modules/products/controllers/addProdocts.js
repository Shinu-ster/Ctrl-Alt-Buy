const mongoose = require('mongoose');
const addProduct = async (req,res)=>{
    const {itemName,itemPrice,stocks,description,typeofItem,specifications} = req.body;
    const productImage = req.files;
    console.log('Specifications:',specifications);

    if(!productImage || productImage.length === 0){
        return res.status(400).json({message: "No images uploaded"})
    }
    let parsedSpecifications;
    if (typeof specifications === 'string') {
      parsedSpecifications = JSON.parse(specifications);
    } else {
      parsedSpecifications = specifications;
    }
    console.log('Parsed Specifications:',parsedSpecifications);
    try {
        if(!itemName || !itemPrice) {
            return res.status(400).json({
                message:"Please provide item name and price"
            })
        }
        const parsedItemPrice = parseFloat(itemPrice);
        const parseStocks = parseInt(stocks);
        console.log('Parsed Stocks',parseStocks)
        const productData = {
            itemName,
            itemPrice:parsedItemPrice,
            stocks:parseStocks,
            imageUrl:productImage.map((file)=> '/uploads/'+file.filename),
            description,
            typeofItem,
            specifications: parsedSpecifications,
        }
        console.log('productData:',productData);

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