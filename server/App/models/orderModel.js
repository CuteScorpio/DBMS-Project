const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { 
    type: String,
    required: true,
    trim: true
  },
  products: [{
    productId: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
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

const OrderModel = mongoose.model('Orders', orderSchema);

module.exports = OrderModel;
