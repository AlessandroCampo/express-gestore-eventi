const eventModel = require("../models/Event.js");
const { CustomError } = require("../utils.js");

module.exports = (req, res, next) => {
    const id = req.params.eventId;
    if (!eventModel.findEvent(id)) {
        throw new CustomError(`Could not find an event with ID: ${id}`, 404)
    }
    next();
}