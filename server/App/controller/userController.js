const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");

let userSignup = async (req, res) => {

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = new userModel({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
    });
    await user.save()
    .then((user) => {
        res.status(200).json({user: user});
        console.log(user);
    })
    .catch((err) => {
        res.status(400).json({error: err});
    });
}

let userLogin = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    try {
        let user = await userModel.findOne({ username: username });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Compare hashed password
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Update loginStatus to true
        await userModel.updateOne({ _id: user._id }, { $set: { loginStatus: true } });

        res.status(200).json({ message: "Login successful" });
        console.log("User logged in:", user.username);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    userSignup, userLogin
}









