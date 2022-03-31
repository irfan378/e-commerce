const Product = require('../models/productModel');
const ErrorHandler = require('../Utils/ErrorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const apiFeatures = require('../Utils/apiFeatures');

// Create Product-- Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});
// get all products
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new apiFeatures(Product.find(), req.query).search().filter()
    let products = await apiFeature.query;
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);
    products = await apiFeature.query.clone().exec();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount
    });
});

// Update a product -- admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
}
)
// Delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: "Product  Deleted Sucessfully"
    })
})

// get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
});

// Create new review or update an existing review

exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id);

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user_id) (rev.rating = rating), (rev.comment = comment)
        });
    }
    else {
        product.reviews.push(review);
        product.noOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.ratings = product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })
})

// Get all reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString())

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    ratings = avg / reviews.length;

    const noOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        noOfReviews
    },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
    res.status(200).json({
        success: true
    })

})
