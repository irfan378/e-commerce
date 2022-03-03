const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../Utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Create new Order
exports.createOrder = catchAsyncError(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id
    })

    res.status(201).json({
        success: true,
        order
    })
})

// Get logged in user orders
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler(404, "Order not found"));
    }
    res.status(200).json({
        success: true,
        order
    })
})

// My orders

exports.myOrders = catchAsyncError(async (req, res, next) => {

    const order = await Order.find({ user: req.user._id })
    res.status(200).json({
        success: true,
        order
    })
})