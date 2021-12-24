const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err }

        error.message = err.message;

        // wrong mongoose objectid error
        if (err.name === 'CastError') {
            const message = `Invalid type: ${err.path}`
            err.message = message;
            error = new ErrorHandler(message, 400);
        }

        // mongoose validation error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        // json token error
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON Web Token is invalid. Try again.'
            error = new ErrorHandler(message, 400);
        }

        // json token expired
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON Web Token is expired.'
            error = new ErrorHandler(message, 400);
        }

        // mongoose duplicate key error
        if (err.code === 11020) {
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message, 400);
        }

        res.status(err.statusCode).json({
            success: false,
            message: error.message,
        });
    } else if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            error: {
                status: err.statusCode,
                message: err.message,
                stack: err.stack
            }
        });
    } 
};