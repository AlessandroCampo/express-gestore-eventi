const eventModel = require('../models/Event.js');

const events = eventModel.getEvents()



const testStaticMethodsFunction = async () => {
    eventModel.modifyEvent(5, {
        title: 'Updated New Year Concert',
        description: 'Celebrate the new year with an even more amazing concert!',
        date: '2024-12-31',
        maxSeats: 20000
    })
    eventModel.deleteEvent(2);
}


testStaticMethodsFunction()




const index = (req, res) => {
    res.send('router working');
}

const store = (req, res) => {
    res.end();
}

const update = (req, res) => {
    res.end();
}

module.exports = {
    index, store, update
}