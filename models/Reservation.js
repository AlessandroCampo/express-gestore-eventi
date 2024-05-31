const uniquid = require('uniqid')
const fs = require('fs');
const path = require('path');
const dbPath = path.join(process.cwd(), 'db', 'reservations.json');



module.exports = class Reservation {
    id
    constructor({ firstName, lastName, email, eventId }) {
        this.id = uniquid('res-');
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventId = eventId;
        Reservation.create(this);
    }

    static getAllReservations() {
        return require('../db/reservations.json');
    }

    static find(id) {
        return Reservation.getAllReservations().find(r => r.id == id);
    }

    static create(newReservation) {
        const eventModel = require('../models/Event.js');
        const newEvents = JSON.stringify([...Reservation.getAllReservations(), { ...newReservation }]);
        fs.writeFileSync(dbPath, newEvents, 'utf-8');

        const relatedEvent = eventModel.findEvent(newReservation.eventId);
        relatedEvent.availableSeats--
        console.log(relatedEvent.availableSeats);
        eventModel.modifyEvent(relatedEvent.id, { ...relatedEvent })
        console.log(`Successfully created a new reservation for ${newReservation.firstName} ${newReservation.lastName}`);
    }

    static delete(id) {
        const newData = JSON.stringify(Reservation.getAllReservations().filter(e => e.id !== id));
        fs.writeFileSync(dbPath, newData, 'utf-8');
    }
}