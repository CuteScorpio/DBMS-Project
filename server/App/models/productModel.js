let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
  name:{ 
    type:String,
    required: true,
    unique: true,
  },
  price:{ 
    type:Number,
    required: true,
  },
  category: {
    type :String,
  },
  description: {String,
  },
  stock: {
    type: Number,
    required: true,
  },



}); 

ProductModel= mongoose.model('Product', productSchema);

module.exports = ProductModel;