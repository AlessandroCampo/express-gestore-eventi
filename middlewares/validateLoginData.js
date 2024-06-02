const UserModel = require('../models/User.js');
const bcrypt = require('bcrypt');
const { CustomError } = require('../utils');



module.exports = async (req, res, next) => {
    const { username, password } = req.body;
    const foundUser = await UserModel.find(username, password)
    if (!foundUser) {
        throw new CustomError('Invalid username or password', 401)
    }
    req.user = foundUser;
    next();

}