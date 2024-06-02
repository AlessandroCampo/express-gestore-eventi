const jwt = require('jsonwebtoken');
const { CustomError } = require('../utils');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        throw new CustomError('Missing Token', 403)
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            throw new CustomError(err, 403)
        }
        console.log(user, 'this is user');
        req.user = user
        next();
    })
}