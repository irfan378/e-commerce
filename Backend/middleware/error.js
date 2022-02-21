const ErrorHandler = require('../Utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error"

    // Wrong mongodb id error
    if (err.name == "CastError") {
        const message = `Resource not found,Invalid :${err.path}`
    }

    // Mongoose duplicate key error
    if (err.code == 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)}`;
        err = new ErrorHandler(message, 400);
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid token";
        err = new ErrorHandler(message, 400);
    }

    // JWT expired error
    if (err.name === "TokenExpiredError") {
        const message = "Token expired";
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        Success: false,
        message: err.message
    })
}