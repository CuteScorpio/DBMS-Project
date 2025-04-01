const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

let userSignup = async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        let user = new userModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();
        res.status(200).json({ message: "User registered successfully", user });
    } catch (err) {
        if (err.code === 11000) { // MongoDB duplicate key error
            return res.status(400).json({ error: "Email already exists" });
        }
        res.status(400).json({ error: err.message });
    }
};

let userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Update loginStatus to true
        await userModel.updateOne({ _id: user._id }, { $set: { loginStatus: true } });

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        if (user.adminStatus === true) {
            console.log("Admin logged in:", user.firstName + " " + user.lastName);
            return res.status(200).json({ message: "Admin login successful", token });
        }

        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

let userLogout = async (req, res) => {
    const { email } = req.body;  // Changed from username to email

    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        await userModel.updateOne({ _id: user._id }, { $set: { loginStatus: false } });

        res.status(200).json({ message: "Logout successful" });
        console.log("User logged out:", user.email);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


let findProfile= async (req, res) => {
    
    try {
        const user = await userModel.findById(req.params.id); // Extract user info using the userId from the token
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user's first name, last name, or other details you want
        res.json({ firstName: user.firstName, lastName: user.lastName, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user data" });
    }
}

module.exports = { userSignup, userLogin, userLogout ,findProfile};
