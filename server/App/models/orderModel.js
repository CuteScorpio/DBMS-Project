const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   customerName: { 
    type: String,
  },
 products:[{productName: { 
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },

  productQuantity: {
    type: Number,
    required: true,
  },
  productTotal:{
    type:Number,
    required:true
  }
}],

billTotal:{
    type:Number,
    required:true
},

status:{
type:Boolean,
required: true
}

}); 

const orderModel = mongoose.model('Products', productSchema);

module.exports = orderModel;