const orderModel =require('../models/orderModel');


let pendingOrderDisplay = async (req, res) => {
  try {
    const pendingOrders = await orderModel.find({ status: 'pending' }).populate('products.productId');

    if (!pendingOrders.length) {
      return res.status(404).json({ message: 'No pending orders found' });
    }

    res.status(200).json(pendingOrders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
  

  module.exports = { pendingOrderDisplay };

