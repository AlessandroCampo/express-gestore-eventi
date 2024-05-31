const uniquid = require('uniqid')

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
        return require('../db/events.json')
    };


}