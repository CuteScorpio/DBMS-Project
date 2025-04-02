
const productModel = require('../models/productModel');
const orderModel = require('../models/orderModel');

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
  

const placeOrder = async (req,res) => {
  
  const userId = req.user.userId;  // Get userId from the authenticated user
  const customerName = req.body.userName; // Full name
  const { products } = req.body; // Products array sent from frontend (cart items)

  try {
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalBill = 0;
    let processedProducts = [];

    for (let product of products) {
      const productDetails = await productModel.findOne({ name: product.productName });

      if (!productDetails) {
        return res.status(400).json({ message: `Product not found: ${product.productName}` });
      }

      if (productDetails.quantity < product.productQuantity) {
        return res.status(400).json({ message: `Insufficient stock for: ${product.productName}` });
      }

      totalBill += productDetails.price * product.productQuantity;

      processedProducts.push({
        productId: productDetails._id,
        productQuantity: product.productQuantity
      });

      // Subtract ordered quantity from available stock
      productDetails.quantity -= product.productQuantity;
      await productDetails.save();
    }

    const order = new orderModel({
      customerId: userId,
      customerName,
      products: processedProducts,
      billTotal: totalBill,
      status: 'pending',
    });

    await order.save();

    res.status(200).json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Error placing order' });
  }
}


  module.exports = { pendingOrderDisplay ,placeOrder };

