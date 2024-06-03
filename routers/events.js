const express = require('express');
const router = express.Router();
const multer = require('multer');
const eventsController = require('../controllers/events.js');
const reservationController = require('../controllers/reservations.js');




//import and usage middlewares
const storage = require('../middlewares/storage.js');
const eventExists = require('../middlewares/eventExists.js');
const reservationExists = require('../middlewares/reservationExists.js');
const validateStoreEventData = require('../middlewares/validateStoreEventData.js');
const validateStoreReservationData = require('../middlewares/validateStoreReservationData.js');
const isReservationValid = require('../middlewares/isReservationValid.js');
const upload = multer({ storage });
const auth = require('../middlewares/auth.js');



router.use(express.urlencoded({ extended: true }))




router.get('/', eventsController.index);
router.post('/', upload.single('image'), validateStoreEventData, eventsController.store);
router.use('/:eventId', eventExists);
router.put('/:eventId', eventsController.update);
router.get('/:eventId', eventsController.show);
router.delete('/:eventId', eventsController.destroy);
router.get('/:eventId/reservations', reservationController.index);
router.post('/:eventId/reservations', auth, isReservationValid, reservationController.store);
router.delete('/:eventId/reservations/:reservationId', auth, reservationExists, reservationController.destroy);


module.exports = router;