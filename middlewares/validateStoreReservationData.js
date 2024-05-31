const { CustomError } = require("../utils");
const { validationResult, body } = require('express-validator');

module.exports = [
    body('firstName')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string')
        .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),

    body('lastName')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string')
        .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),

    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
