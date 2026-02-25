const express = require('express');
const { getAllUsers, getAllEvents, getAllBookings } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/users', getAllUsers);
router.get('/events', getAllEvents);
router.get('/bookings', getAllBookings);

module.exports = router;
