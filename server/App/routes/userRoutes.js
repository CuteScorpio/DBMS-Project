const express = require('express');   
const userRouter = express.Router();
const { userSignup, userLogin, userLogout,  findProfile } = require('../controller/userController');       
const authMiddleware = require("../middleware/authMiddleware")
userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);
userRouter.post('/logout', userLogout);

userRouter.get('/verify', authMiddleware, (req, res) => {
    res.json({ message: "Authenticated", user: req.user });
});


userRouter.get('/profile/:id',authMiddleware, findProfile);

module.exports = userRouter;
