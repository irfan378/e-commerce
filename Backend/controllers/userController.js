const ErrorHandler = require('../Utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const { findOne } = require('../models/userModel');
const sendToken = require('../Utils/jwtToken');

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
        return next(new ErrorHandler('User already exists', 400));
    }

    user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicUrl",
        },
    });

    sendToken(user, 201, res);
})

// Login user
exports.login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    //  checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter email and password", 400));
    }
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    const isPasswordMatched = user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    sendToken(user, 200, res);
})
