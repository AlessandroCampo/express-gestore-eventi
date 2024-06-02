const express = require('express');
const router = express.Router();
router.use(express.urlencoded({ extended: true }))
const userController = require('../controllers/users.js');
const validateLoginData = require('../middlewares/validateLoginData.js');
const auth = require('../middlewares/auth.js');



router.get('/', userController.index);
router.post('/register', userController.register);
router.post('/login', validateLoginData, userController.login);
router.get('/events', auth, userController.getReservations);
router.get('/delete', auth, userController.destroy);

module.exports = router;