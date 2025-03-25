let express=require('express');
let {pendingOrderDisplay}= require('../controller/orderController');


let orderRouter=express.Router();

orderRouter.get("/display",pendingOrderDisplay );

module.exports=orderRouter;