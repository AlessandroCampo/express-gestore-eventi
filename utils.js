const fs = require('fs');
const path = require('path');



class CustomError extends Error {
    constructor(message, status) {
        super(message)
    }
}


module.exports = {
    CustomError
}