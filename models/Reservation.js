const uniquid = require('uniqid')
const fs = require('fs');
const path = require('path');
const dbPath = path.join(process.cwd(), 'db', 'events.json');

module.exports = class Reservation {
    id
    constructor({ firstName, lastName, email, eventId }) {
        this.id = uniquid();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventId = eventId;
    }

    static getAllReservations() {
        return require('../db/reservations.json');
    }
}