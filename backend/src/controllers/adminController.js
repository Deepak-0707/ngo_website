const User = require('../models/User');
const Event = require('../models/Event');
const Booking = require('../models/Booking');

/**
 * @desc    Get all users
 * @route   GET /api/admin/users
 * @access  Private (Admin)
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all events
 * @route   GET /api/admin/events
 * @access  Private (Admin)
 */
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: events.length, events });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all bookings
 * @route   GET /api/admin/bookings
 * @access  Private (Admin)
 */
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate('event', 'title location eventDate foodQuantity')
      .populate('ngo', 'name email')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getAllEvents, getAllBookings };
