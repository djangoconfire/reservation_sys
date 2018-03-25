var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/check_auth');
var ReservationController = require('../controllers/reservation');


// Reservae a slot
router.post('/reserve' , ReservationController.reservation);


// Get Available Hous for a date
router.get('/availableHours' , ReservationController.getAvailableHours);


// Get All Reservations
router.get('/all_reservations' , ReservationController.get_all_reservations);


module.exports = router;