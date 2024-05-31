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
router.put('/:id', eventExists, eventsController.update);
router.get('/:id', eventExists, eventsController.show);
router.delete('/:id', eventExists, eventsController.destroy);

router.use('/:id/reservations', reservationRouter);

module.exports = router;