const bcrypt = require('bcrypt');
const users = require('./db/users.json');

async function hashPasswords(users) {
    const saltRounds = 10;

    for (let user of users) {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
    }

    return users;
}

// Hash the passwords and log the updated users
hashPasswords(users).then(updatedUsers => {
    console.log(JSON.stringify(updatedUsers, null, 2));
}).catch(err => {
    console.error('Error hashing passwords:', err);
});