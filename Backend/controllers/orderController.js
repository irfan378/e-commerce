const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../Utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Create new Orde
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