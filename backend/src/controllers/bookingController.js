const Booking = require('../models/Booking');
const Event = require('../models/Event');

/**
 * @desc    Claim food from an event (NGO)
 * @route   POST /api/bookings/:eventId
 * @access  Private (NGO)
 */
const claimEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.isClaimed) {
      return res.status(409).json({ success: false, message: 'This event has already been claimed' });
    }

    // Create booking — unique index on event field prevents race conditions
    const booking = await Booking.create({
      event: event._id,
      ngo: req.user._id,
    });

    // Mark event as claimed
    event.isClaimed = true;
    await event.save();

    await booking.populate([
      { path: 'event', select: 'title location eventDate foodQuantity' },
      { path: 'ngo', select: 'name email' },
    ]);

    res.status(201).json({ success: true, message: 'Food claimed successfully', booking });
  } catch (error) {
    // Handle duplicate key error (race condition where two NGOs try to claim simultaneously)
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'This event has already been claimed' });
    }
    next(error);
  }
};

/**
 * @desc    Get all bookings for the logged-in NGO
 * @route   GET /api/bookings/my
 * @access  Private (NGO)
 */
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ ngo: req.user._id })
      .populate('event', 'title description location eventDate foodQuantity isClaimed')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all bookings (Admin)
 * @route   GET /api/bookings
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

module.exports = { claimEvent, getMyBookings, getAllBookings };
