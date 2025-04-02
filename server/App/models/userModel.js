let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    loginStatus: { 
        type: Boolean, 
        default: false 
    },
    adminStatus: { 
        type: Boolean, 
        default: false 
    }
});

let userModel = mongoose.model('users', userSchema);

module.exports = userModel;