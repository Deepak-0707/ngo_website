const express = require('express');
const { body } = require('express-validator');
const {
  createEvent,
  getMyEvents,
  getAllEvents,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

const eventValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('foodQuantity').trim().notEmpty().withMessage('Food quantity is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('eventDate').isISO8601().withMessage('Valid event date is required'),
];

// Organizer routes
router.post('/', protect, authorize('organizer'), eventValidation, validate, createEvent);
router.get('/my', protect, authorize('organizer'), getMyEvents);
router.put('/:id', protect, authorize('organizer'), eventValidation, validate, updateEvent);
router.delete('/:id', protect, authorize('organizer'), deleteEvent);

// NGO + Admin route
router.get('/', protect, authorize('ngo', 'admin'), getAllEvents);

module.exports = router;
