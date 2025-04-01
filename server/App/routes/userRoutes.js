const express = require('express');   
const userRouter = express.Router();
const { userSignup, userLogin, userLogout, getUserProfile } = require('../controller/userController');       
const authMiddleware = require("../middleware/authMiddleware")
userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);

userRouter.get('/profile', authMiddleware, getUserProfile

);


module.exports = userRouter;