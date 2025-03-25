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
  quantity: {
    type: Number,
    required: true,
  },
  imgURL: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  }
}); 

const ProductModel = mongoose.model('Products', productSchema);

module.exports = ProductModel;