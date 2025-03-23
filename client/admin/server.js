const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

mongoose.connect("mongodb://localhost:27017/atharv", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const orderSchema = new mongoose.Schema({
  productsName: String,
  prouctPrice: Number,
  productQuantity: Number,
});

const customerSchema = new mongoose.Schema({
  customerName: String,
  orders: [orderSchema],
});

const Customer = mongoose.model("Customer", customerSchema);

app.get("/products", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

app.listen(3000, () => console.log("Server running on port 3000"));
