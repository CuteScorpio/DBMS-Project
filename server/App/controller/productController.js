const productModel = require('../models/productModel');
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

let productDisplay = async (req, res) => {
   const products = await productModel.find();
   res.send(products);
};

let productAdd = async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    console.log("Received File:", req.file);

    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }

    const { name, price, quantity, category, description } = req.body;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads", // Store in a "products" folder
    });
    fs.unlinkSync(req.file.path); // Delete local file

    const newProduct = new productModel({
        name,
        price,
        quantity,
        category,
        description,
        imgURL: result.secure_url, // Cloudinary image URL
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const productDelete =async (req, res) => {
  try {
      const productId = req.params.id;
      await productModel.findOneAndDelete({name:productId});
      
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }


      res.status(200).json({ message: 'Product deleted successfully' });

      
  } catch (error) {
      res.status(500).json({ error: 'Error deleting product' });
  }
}

module.exports = { productDisplay, productAdd , productDelete };