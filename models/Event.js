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

    static async createEvent(newEvent) {
        const newEvents = JSON.stringify([...Model.getEvents(), { ...newEvent }])
        await fs.writeFile(dbPath, newEvents, 'utf-8', () => {
            console.log(`Successfully created a new event with title ${newEvent.title}`)
        })
    };

    static async deleteEvent(id) {
        const newEvents = JSON.stringify(Model.getEvents().filter(e => e.id !== id));
        await fs.writeFile(dbPath, newEvents, 'utf-8', () => {
            console.log(`Successfully deleted the event with id ${id}`)
        })
    }

    static modifyEvent(id, newEvent) {
        const updatedEvents = Model.getEvents().map(event => {
            if (event.id === id) {
                return {
                    newEvent
                };
            }
            return event;
        });
        fs.writeFileSync(dbPath, JSON.stringify(updatedEvents), 'utf8');
        console.log(`Successfully modified an event with id ${id}`)
    }


}