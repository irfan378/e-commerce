const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Plaese enter your name"],
        maxlength: [50, "Name must be less than 50 characters"],
        minlength: [2, "Name must be at least 2 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        validate: [validator.isEmail, 'Please Enter a valid Email']
    },
    password: {
        type: String,
        required: [true, "Please Enter your password"],
        minlength: [8, "Password should be greater than 8 characters"],
        select: false
    },
    avatar: {

        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})
module.exports = mongoose.model("User", userSchema);