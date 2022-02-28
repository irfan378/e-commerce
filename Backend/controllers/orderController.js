const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../Utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');

// Create new Order