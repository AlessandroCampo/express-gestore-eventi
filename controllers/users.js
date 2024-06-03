const UserModel = require('../models/User.js');
const { generateToken } = require('./auth.js');


const index = (req, res) => {
    return res.json(UserModel.all())
};

const register = (req, res) => {
    const { username, mail, firstName, lastName, password, nationality, birthdate } = req.body;
    const newUser = new UserModel({ username, mail, password, nationality, birthdate });
    return res.json({
        message: 'New user succesfully created',
        newUser
    })
};

const login = async (req, res) => {
    const { username, id } = await UserModel.find(req.body.username, req.body.password);
    const token = generateToken({ username, id });
    return res.json(token);
}

const update = (req, res) => {

};

const destroy = (req, res) => {
    const userId = req.user.id;
    const deletedUser = UserModel.delete(userId);
    return res.json({
        message: `User ${deletedUser.username} has been succesfully deleted`,
    })
};

const getReservations = (req, res) => {
    const userId = req.user.id;
    console.log(userId)
    return res.json(UserModel.getReservations(userId));
}

module.exports = {
    index, register, destroy, getReservations, login
}