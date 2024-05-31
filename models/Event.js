const uniquid = require('uniqid')
const fs = require('fs');
const path = require('path');
const dbPath = path.join(process.cwd(), 'db', 'events.json');
const reservationModel = require('../models/Reservation.js');
module.exports = class Model {
    id
    constructor({ title, description, date, maxSeats }) {
        this.id = uniquid('event-');
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
        this.availableSeats = maxSeats;
        Model.createEvent(this);
    }



    static getEvents() {
        return require('../db/events.json')
    };

    static getReservations(id) {
        return reservationModel.getAllReservations().filter(r => r.eventId == id);
    }

    static filterEvents(query) {
        const possibleFilters = ['max_date', 'min_date', 'not_sold_out', 'title_contains'];
        const filterFunctions = {
            max_date: event => !query.max_date || event.date <= query.max_date,
            min_date: event => !query.min_date || event.date >= query.min_date,
            not_sold_out: event => !query.not_sold_out || event.availableSeats > 0,
            title_contains: event => !query.title_contains || event.title.includes(query.title_contains)
        };

        const filteredEvents = possibleFilters.reduce((acc, filter) => {
            if (query[filter]) {
                return acc.filter(filterFunctions[filter])
            }
            return acc
        }, Model.getEvents());
        return filteredEvents;
    }

    static createEvent(newEvent) {
        const newEvents = JSON.stringify([...Model.getEvents(), { ...newEvent }]);
        fs.writeFileSync(dbPath, newEvents, 'utf-8');
        console.log(`Successfully created a new event with title ${newEvent.title}`);
    };

    static findEvent(id) {
        return Model.getEvents().find(e => e.id == id);
    }

    static deleteEvent(id) {
        const newEvents = JSON.stringify(Model.getEvents().filter(e => e.id !== id));
        fs.writeFileSync(dbPath, newEvents, 'utf-8')
        console.log(`Successfully deleted the event with id ${id}`)
    }

    static modifyEvent(id, newEvent) {
        const updatedEvents = Model.getEvents().map(event => {
            if (event.id == id) {
                const updatedEvent = {
                    ...event,
                    title: newEvent.title !== undefined ? newEvent.title : event.title,
                    description: newEvent.description !== undefined ? newEvent.description : event.description,
                    date: newEvent.date !== undefined ? newEvent.date : event.date,
                    maxSeats: newEvent.maxSeats !== undefined ? newEvent.maxSeats : event.maxSeats,
                };
                return updatedEvent;
            }
            return event;
        });
        fs.writeFileSync(dbPath, JSON.stringify(updatedEvents), 'utf8');
        console.log(`Successfully modified an event with id ${id}`)
        return Model.findEvent(id);
    }


}