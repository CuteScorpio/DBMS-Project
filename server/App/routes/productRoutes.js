let express=require('express');

const { productDisplay}=require('../controller/productController');

let productRouter=express.Router();

productRouter.get("/display", productDisplay);

module.exports=productRouter;