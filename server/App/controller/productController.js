
const ProductModel = require('../models/productModel');
let productInsert = (req, res) => {
      let product = new ProductModel({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            image: req.body.image
        });                                  
    product.save()
        .then(() => {
            res.send({ status:1, message: 'Product added successfully' });
        })
        .catch(() => {
            res.send({status:0, message: 'Failed to add product'});
        });
};  


let productShow = async (req, res) => {
    let productList = await ProductModel.find();
    res.status(200).json({status:1, message:"product s fetch successfully",data:productList})
}

let productUpdate = (req, res) => {
    
    
}

let productDelete = (req, res) => {
let product_id = req.params.id; 
let deleted_product= ProductModel.deleteOne({_id:product
_id})
    .then(() => {
        res.send({status:1, message: 'Product deleted successfully'});
    })
    .catch(() => {
        res.send({status:0, message: 'Failed to delete product'});
    });
}




module.exports = {productInsert , productShow,productUpdate ,productDelete};