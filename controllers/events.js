const eventModel = require('../models/Event.js');
const { CustomError } = require('../utils.js');
const events = eventModel.getEvents()


// const testStaticMethodsFunction = async () => {
//     eventModel.modifyEvent(5, {
//         title: 'Updated New Year Concert',
//         description: 'Celebrate the new year with an even more amazing concert!',
//         date: '2024-12-31',
//         maxSeats: 20000
//     })
//     eventModel.deleteEvent(2);
// }


// testStaticMethodsFunction()




const index = (req, res) => {
    if (!events) throw new CustomError('Error retrieving events data', 500);
    const filteredEvents = eventModel.filterEvents(req.query);
    res.json(filteredEvents)
}

const store = (req, res) => {
    const { title, description, date, maxSeats } = req.body;
    const newEvent = new eventModel({ title, description, date, maxSeats })
    res.json({
        message: 'An event has been succesfully created',
        newEvent
    });
}

const show = (req, res) => {
    const foundEvent = eventModel.findEvent(req.params.eventId);
    res.json(foundEvent);
}

const update = (req, res) => {
    const { title, description, date, maxSeats } = req.body;
    const modifiedEvent = eventModel.modifyEvent(req.params.eventId, { title, description, date, maxSeats })
    res.json({
        message: 'An event has been succesfully modified',
        modifiedEvent
    });
}

const destroy = (req, res) => {
    eventModel.deleteEvent(req.params.eventId);
    res.json({
        message: `Successfully deleted the event with id ${req.params.eventId}`,
    });
}

module.exports = {
    index, store, update, show, destroy
}