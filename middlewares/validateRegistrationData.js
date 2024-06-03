const { CustomError } = require("../utils");
const { validationResult, body } = require('express-validator');
const User = require('../models/User.js');

module.exports = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string')
        .isLength({ max: 50 }).withMessage('Username cannot exceed 50 characters')
        .custom(username => {
            const allUsernames = User.all().map(u => u.username);
            if (allUsernames.includes(username)) {
                throw new CustomError(`${username} has already been taken, please choose a different one`, 400)
            }
            return true
        }),

    body('firstName')
        .notEmpty().withMessage('First name is required')
        .isString().withMessage('First name must be a string')
        .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters'),

    body('lastName')
        .notEmpty().withMessage('Last name is required')
        .isString().withMessage('Last name must be a string')
        .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters'),

    body('mail')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .custom(mail => {
            const allMails = User.all().map(u => u.mail);
            if (allMails.includes(mail)) {
                throw new CustomError(`${mail} has already been taken, please choose a different one`, 400)
            }
            return true
        }),

    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    body('birthdate')
        .notEmpty().withMessage('Birthdate is required')
        .isDate().withMessage('Invalid birthdate format'),

    body('nationality')
        .notEmpty().withMessage('Nationality is required')
        .isString().withMessage('Nationality must be a string')
        .isLength({ max: 50 }).withMessage('Nationality cannot exceed 50 characters'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const formattedErrors = errors.array().map(err => ({
                value: err.value,
                msg: err.msg,
            }));
            return res.status(400).json({ errors: formattedErrors });
        }
        next();
    }
];
