const jwt = require('jsonwebtoken');


const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username
    };

    return jwt.sign(payload,
        process.env.JWT_SECRET,
        { expiresIn: "1d" });
}

module.exports = {
    generateToken
}