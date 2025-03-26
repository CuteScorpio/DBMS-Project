let express = require('express');
const { productDisplay, productAdd ,productDelete ,productSearch} = require('../controller/productController');
const upload = require("../config/multerConfig");

let productRouter = express.Router();

productRouter.get("/display", productDisplay);
productRouter.post("/add", upload.single("image"), productAdd);
productRouter.delete("/delete/:id" , productDelete);
productRouter.get("/search",productSearch);

module.exports = productRouter;