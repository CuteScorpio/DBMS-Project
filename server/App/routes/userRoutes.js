const express = require('express');   
const userRouter = express.Router();
const { userSignup, userLogin } = require('../controller/userController');       



userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);

module.exports = userRouter;