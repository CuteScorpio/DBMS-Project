let express=require('express');

const {productInsert,productShow,productDelete,productUpdate}=require('../controller/productController');

let productRouter=express.Router();


productRouter.post('/insert',productInsert);
productRouter.get('/show',productShow);
productRouter.put('/update',productUpdate);
productRouter.delete('/delete/:id',productDelete); 

module.exports=productRouter;