const ErrorHandler = require('../Utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require('../models/userModel');
const { findOne } = require('../models/userModel');
const sendToken = require('../Utils/jwtToken');
const sendEmail = require("../Utils/sendEmail");
const crypto = require('crypto');
const cloudinary = require("cloudinary");

exports.registerUser = catchAsyncError(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    })
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
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
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

// Logout user
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "logged out"
    })
})

// Forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    // Get ResetPasswordToken
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your Password reset token is :- \n\n${resetPasswordUrl}\n\n If you have not requested for password reset, please ignore this email.`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Password reset Recovery",
            message
        })
        res.status(200).json({
            success: true,
            message: `Message sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
})

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) {
        return next(new ErrorHandler("Reset password token is invalid or has expired", 400))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})


// Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update User Password
exports.updatePassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect", 400))
    }
    if (req.body.newPassword != req.body.confirmPassword) {
        return next(new ErrorHandler("New Password and Confirm Password do not match", 400))
    }
    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);
})

// Update user Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// Get all users(admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    })
})

// Get Single user (admin)
exports.getUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user
    });
})

// Update User role --Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {

        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    if (!user) {
        return next(new ErrorHandler("User doesn't exist", 404));
    }

    res.status(200).json({
        success: true
    })
})

// Delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("User doesn't exist", 404));
    }
    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})
