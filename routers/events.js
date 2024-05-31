const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events.js');
router.use(express.urlencoded({ extended: true }))



router.get('/', eventsController.index);
router.post('/', eventsController.store);
router.put('/:id', eventsController.update);
router.get('/:id', eventsController.show);
router.delete('/:id', eventsController.destroy);

module.exports = router;