const eventModel = require("../models/Event.js");
const { CustomError } = require("../utils");



module.exports = (req, res, next) => {
    const eventID = req.params.eventId;
    const { date, availableSeats, title } = eventModel.findEvent(eventID);
    const currentDate = new Date();
    const eventDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);
    if (eventDate <= currentDate) {
        throw new CustomError('Unless you own a time machine, I doubt you would be able to attend this event', 400)
    }
    if (availableSeats <= 0) {
        throw new CustomError(`There are no available seats for ${title}, I suggest you to try again later in case someone deletes his reservation`, 400)
    }
    next();
};

