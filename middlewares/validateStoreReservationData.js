const { CustomError } = require("../utils");
const { validationResult, body } = require('express-validator');

//currently not needed

module.exports = [

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
