const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    unique: true,
  },
  price: { 
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  stock: {
    type: Number,
    required: true,
  },
}); 

const ProductModel = mongoose.model('Products', productSchema);

module.exports = ProductModel;