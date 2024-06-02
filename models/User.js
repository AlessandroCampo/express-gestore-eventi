const path = require('path');
const fs = require('fs');
const dbPath = path.join(process.cwd, 'db', 'users.json');
const bcrypt = require('bcrypt');
const uniqid = require('uniqid');
const ReservationModel = require('../models/Reservation.js');

module.exports = class User {
    id
    constructor({ mail, username, bithdate, nationality, password }) {
        this.id = uniqid('user-');
        this.mail = mail;
        this.username = username;
        this.bithdate = bithdate;
        this.nationality = nationality;
        this.password = password;
        User.create(this);
    }

    static all() {
        return require('../db/users.json');
    }

    static create(newUser) {
        const users = User.all();
        const newUsers = [...users, newUser];
        fs.writeFileSync(dbPath, newUsers);
        return newUser;
    }

    static async find(username, password) {
        const user = User.all().find(u => u.username === username);
        const match = await bcrypt.compare(password, user.password);
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