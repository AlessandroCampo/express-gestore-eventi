const eventModel = require('../models/Event.js');
const reservationModel = require('../models/Reservation.js');



const index = (req, res) => {
    const foundReservations = eventModel.getReservations(req.params.eventId);
    res.json(foundReservations);
}



const store = (req, res) => {
    const { firstName, lastName, email } = req.body;
    const { eventId } = req.params;
    const newEvent = new reservationModel({ firstName, lastName, email, eventId })
    res.json({
        message: 'Your reservation has been succesfully created',
        newEvent
    });
}

const destroy = (req, res) => {
    reservationModel.delete(req.params.reservationId);
    res.json({
        message: `Successfully deleted the event with id ${req.params.reservationId}`,
    });
}


module.exports = {
    index, store, destroy
}