const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.js');

const reservationRouter = require('../routers/reservations.js');

//import and usage middlewares
const eventExists = require('../middlewares/eventExists.js');
const validateStoreEventData = require('../middlewares/validateStoreEventData.js');
router.use(express.urlencoded({ extended: true }))




router.get('/', eventsController.index);
router.post('/', validateStoreEventData, eventsController.store);
router.put('/:eventId', eventExists, eventsController.update);
router.get('/:eventId', eventExists, eventsController.show);
router.delete('/:eventId', eventExists, eventsController.destroy);

router.use('/:eventId/reservations', reservationRouter);

module.exports = router;