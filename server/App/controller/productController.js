let productData = require('../models/productModel');

let productInsert = (req, res) => {
      let product = new productData({
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

module.exports = {productInsert};