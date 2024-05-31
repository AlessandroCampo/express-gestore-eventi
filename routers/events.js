const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.js');
const reservationController = require('../controllers/reservations.js');


//import and usage middlewares
const eventExists = require('../middlewares/eventExists.js');
const reservationExists = require('../middlewares/reservationExists.js');
const validateStoreEventData = require('../middlewares/validateStoreEventData.js');

router.use(express.urlencoded({ extended: true }))




router.get('/', eventsController.index);
router.post('/', validateStoreEventData, eventsController.store);
router.use('/:eventId', eventExists);
router.put('/:eventId', eventsController.update);
router.get('/:eventId', eventsController.show);
router.delete('/:eventId', eventsController.destroy);
router.get('/:eventId/reservations', reservationController.index);
router.post('/:eventId/reservations', reservationController.store);;
router.delete('/:eventId/reservations/:reservationId', reservationExists, reservationController.destroy);


module.exports = router;