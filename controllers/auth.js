const jwt = require('jsonwebtoken');


const generateToken = (user) => {

    const payload = {
        id: user.id,
        username: user.username
    };
    console.log(payload, process.env.JWT_SECRET);

    return jwt.sign(payload,
        process.env.JWT_SECRET,
        { expiresIn: "1d" });
}

module.exports = {
    generateToken
}