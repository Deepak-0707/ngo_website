const express = require('express');
const { claimEvent, getMyBookings, getAllBookings } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/:eventId', protect, authorize('ngo'), claimEvent);
router.get('/my', protect, authorize('ngo'), getMyBookings);
router.get('/', protect, authorize('admin'), getAllBookings);

module.exports = router;
