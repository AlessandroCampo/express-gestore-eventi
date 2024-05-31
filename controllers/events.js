const eventModel = require('../models/Event.js');

console.log(eventModel.getEvents());


const index = (req, res) => {
    res.send('router working');
}

const store = (req, res) => {
    res.end();
}

const update = (req, res) => {
    res.end();
}

module.exports = {
    index, store, update
}