const productModel = require('../models/productModel');

let productDisplay = async (req, res) => {
  const products = await productModel.find();
  res.send(products);
};

module.exports = { productDisplay };