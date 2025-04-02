const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Assuming your user model is named 'Users'
    required: true
  },
  customerName:{
    type: String,
    required:true
  },
  products: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true
    },
    productQuantity: {
      type: Number,
      required: true,
      min: 1
    },
  }],
  billTotal: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed'],
    default: 'pending',
    index: true
  }
}, { timestamps: true });

const orderModel = mongoose.model('orders', orderSchema);





module.exports = orderModel ;
