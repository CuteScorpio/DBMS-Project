const express = require('express');   
const userRouter = express.Router();
const { userSignup, userLogin, userLogout } = require('../controller/userController');       

userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);
// userRouter.get('display',userDisplay)


module.exports = userRouter;