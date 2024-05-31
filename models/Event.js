const uniquid = require('uniqid')
const fs = require('fs');
const path = require('path');
const dbPath = path.join(process.cwd(), 'db', 'events.json');
module.exports = class Model {
    id
    constructor({ title, description, date, maxSeats }) {
        this.id = uniquid();
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
        Model.createEvent(this);
    }



    static getEvents() {
        return require('../db/events.json')
    };

    static createEvent(newEvent) {
        const newEvents = JSON.stringify([...Model.getEvents(), { ...newEvent }]);
        fs.writeFileSync(dbPath, newEvents, 'utf-8');
        console.log(`Successfully created a new event with title ${newEvent.title}`);
    };

    static findEvent(id) {
        return Model.getEvents().find(e => e.id === Number(id));
    }

    static deleteEvent(id) {
        const newEvents = JSON.stringify(Model.getEvents().filter(e => e.id !== id));
        fs.writeFileSync(dbPath, newEvents, 'utf-8')
        console.log(`Successfully deleted the event with id ${id}`)
    }

    static modifyEvent(id, newEvent) {
        const convertedID = Number(id)
        const updatedEvents = Model.getEvents().map(event => {
            if (event.id === convertedID) {
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
        return Model.findEvent(convertedID);
    }


}