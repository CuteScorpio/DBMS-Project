let express=require('express');
let {pendingOrderDisplay,placeOrder}= require('../controller/orderController');
const authMiddleware = require("../middleware/authMiddleware")

let orderRouter=express.Router();

orderRouter.get("/display",pendingOrderDisplay );
orderRouter.post("/place",authMiddleware,placeOrder);

module.exports=orderRouter;