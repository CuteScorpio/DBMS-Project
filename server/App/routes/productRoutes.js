let express = require('express');
const { productDisplay, productAdd ,productDelete} = require('../controller/productController');
const upload = require("../config/multerConfig");

let productRouter = express.Router();

productRouter.get("/display", productDisplay);
productRouter.post("/add", upload.single("image"), productAdd);
productRouter.delete("/delete/:id" , productDelete);

module.exports = productRouter;