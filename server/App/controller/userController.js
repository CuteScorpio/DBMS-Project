const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");

let userSignup = async (req, res) => {

    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
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
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        let user = await userModel.findOne({ email: email });

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
         
        if(user.adminStatus === true){
            res.status(200).json({ message: "Admin login successful" });
            console.log("Admin logged in:", user.firstName + " " + user.lastName);
        } else {
            res.status(200).json({ message: "Login successful" });
            console.log("User logged in:", user.firstName + " " + user.lastName);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

let userLogout = async (req, res) => {
    const username = req.body.username;

    try {
        let user = await userModel.findOne({ username: username });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Update loginStatus to false
        await userModel.updateOne({ _id: user._id }, { $set: { loginStatus: false } });

        res.status(200).json({ message: "Logout successful" });
        console.log("User logged out:", user.username);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    userSignup, userLogin, userLogout
}









