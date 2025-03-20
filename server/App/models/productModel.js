let mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
  name:{ 
    type:String,
    required: true,
    unique: true,
  },
  price:{ Number,
    required: true,
  },
  category: {
    type :String,
  },
  description: String,


}); 

ProductModel= mongoose.model('Product', productSchema);

module.exports = ProductModel;