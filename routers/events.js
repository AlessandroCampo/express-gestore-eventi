const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.js');
const reservationController = require('../controllers/reservations.js');


//import and usage middlewares
const eventExists = require('../middlewares/eventExists.js');
const validateStoreEventData = require('../middlewares/validateStoreEventData.js');
router.use(express.urlencoded({ extended: true }))




router.get('/', eventsController.index);
router.post('/', validateStoreEventData, eventsController.store);
router.put('/:eventId', eventExists, eventsController.update);
router.get('/:eventId', eventExists, eventsController.show);
router.delete('/:eventId', eventExists, eventsController.destroy);

router.get('/:eventId/reservations', reservationController.index);
router.post('/:eventId/reservations', reservationController.index);;
router.delete('/:eventId/:reservationId', reservationController.destroy);


module.exports = router;