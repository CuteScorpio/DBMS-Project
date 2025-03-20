let express=require('express');

const {productInsert,productShow,productDelete,productUpdate}=require('../controller/productController');

let productRouter=express.Router();



module.exports=productRouter;