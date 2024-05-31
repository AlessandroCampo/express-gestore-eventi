const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservations.js');
router.use(express.urlencoded({ extended: true }))



router.get('/', reservationController.index);
router.post('/', reservationController.store);
router.delete('/:id', reservationController.destroy);




module.exports = router;