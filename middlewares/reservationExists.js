const reservationModel = require("../models/Reservation.js");
const { CustomError } = require("../utils.js");

module.exports = (req, res, next) => {
    const id = req.params.reservationId;

    if (!reservationModel.find(id)) {
        throw new CustomError(`Could not find a reservation with ID: ${id}`, 404)
    }
    next();
}