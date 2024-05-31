const uniquid = require('uniqid')
const fs = require('fs');
const path = require('path');


module.exports = class Model {
    #id
    constructor(title, description, date, maxSeats) {
        this.#id = uniquid();
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    get id() {
        return this.#id;
    };

    static getEvents() {
        const dbPath = path.join(__dirname, '../db/events.json');
        console.log(dbPath);
    };


}