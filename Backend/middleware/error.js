const ErrorHandler = require('../Utils/ErrorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error"

    // Wrong mongodb id error
    if (err.name == "CastError") {
        const message = `Resource not found,Invalid :${err.path}`
    }

    res.status(err.statusCode).json({
        Success: false,
        message: err.message
    })
}