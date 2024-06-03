const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, '..', 'db', 'users.json');
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const ReservationModel = require('../models/Reservation.js');

module.exports = class User {
    id
    constructor({ mail, username, firstName, lastName, birthdate, nationality, password }) {
        this.id = uniqid('user-');
        this.mail = mail;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.nationality = nationality;
        this.password = password;
        User.create(this);
    }

    static all() {
        return require('../db/users.json');
    }

    static async create(newUser) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        const users = User.all();
        const newUsers = JSON.stringify([...users, newUser]);
        fs.writeFileSync(dbPath, newUsers);
        return newUser;
    }

    static async find(username, password) {
        const user = User.all().find(u => u.username === username);
        console.log(user);
        const match = await bcrypt.compare(password, user.password);
        console.log(match);
        return match ? user : null;
    }

    static getReservations(id) {
        return ReservationModel.getAllReservations().filter(r => r.userId == id);
    }

    static delete(id) {
        const deletedUser = User.all().find(u.id == id);
        const newUsers = User.all().filter(u => u.id !== id);
        fs.writeFileSync(dbPath, newUsers);
        console.log(`User with id ${id} has been deleted from the database`);
        return deletedUser;
    }
}