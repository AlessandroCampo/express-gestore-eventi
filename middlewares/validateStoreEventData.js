const { CustomError } = require("../utils");
const { validationResult, body } = require('express-validator');
const path = require('path');
const fs = require('fs');

const isValidImage = (file) => {
    if (!file) {
        fs.unlinkSync(file.path);
        throw new CustomError('Please upload an image for this event', 400)

    }
    if (!file.mimetype.startsWith('image')) {
        fs.unlinkSync(file.path);
        throw new CustomError('Uploaded file is not an image', 400);
    }
    const allowedExtensions = ['png', 'jpg', 'jpeg'];
    const fileExtension = path.extname(file.originalname).toLowerCase().substring(1);
    if (!allowedExtensions.includes(fileExtension)) {
        fs.unlinkSync(file.path);
        throw new CustomError('Only PNG, JPG, and JPEG file formats are allowed', 400);
    }
    const maxSize = 1024 * 1024;
    if (file.size > maxSize) {
        fs.unlinkSync(file.path);
        throw new CustomError('Uploaded image size exceeds the allowed limit of 1MB', 400);
    }

}

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
        if (!isValidImage(req.file)) return
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
