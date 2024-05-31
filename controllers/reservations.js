const eventModel = require('../models/Event.js');


const index = (req, res) => {
    const foundReservations = eventModel.getReservations(req.params.eventId);
    res.send(foundReservations);
}

const store = (req, res) => {

}

const destroy = (req, res) => {

}


module.exports = {
    index, store, destroy
}