const { CustomError } = require("../utils");
const { validationResult, body } = require('express-validator');

module.exports = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isString().withMessage('Title must be a string')
        .isLength({ max: 50 }).withMessage('Title cannot exceed 50 characters'),

    body('description')
        .notEmpty().withMessage('Description is required')
        .isString().withMessage('Description must be a string')
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),

    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Invalid date format, accepted format is YYYY-MM-DD'),

    body('maxSeats')
        .notEmpty().withMessage('Max seats is required')
        .isInt({ min: 1 }).withMessage('Max seats must be a positive integer'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
