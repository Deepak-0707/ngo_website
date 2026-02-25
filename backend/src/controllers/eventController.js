const Event = require('../models/Event');

/**
 * @desc    Create a new event
 * @route   POST /api/events
 * @access  Private (Organizer)
 */
const createEvent = async (req, res, next) => {
  try {
    const { title, description, foodQuantity, location, eventDate } = req.body;

    const event = await Event.create({
      title,
      description,
      foodQuantity,
      location,
      eventDate,
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, message: 'Event created successfully', event });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all events created by the logged-in organizer
 * @route   GET /api/events/my
 * @access  Private (Organizer)
 */
const getMyEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ createdBy: req.user._id }).sort({ eventDate: 1 });
    res.status(200).json({ success: true, count: events.length, events });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all available (unclaimed) events
 * @route   GET /api/events
 * @access  Private (NGO, Admin)
 */
const getAllEvents = async (req, res, next) => {
  try {
    const filter = req.user.role === 'ngo' ? { isClaimed: false } : {};
    const events = await Event.find(filter)
      .populate('createdBy', 'name email')
      .sort({ eventDate: 1 });
    res.status(200).json({ success: true, count: events.length, events });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update an event
 * @route   PUT /api/events/:id
 * @access  Private (Organizer - owner only)
 */
const updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this event' });
    }

    if (event.isClaimed) {
      return res.status(400).json({ success: false, message: 'Cannot update a claimed event' });
    }

    const { title, description, foodQuantity, location, eventDate } = req.body;
    event = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, foodQuantity, location, eventDate },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Event updated successfully', event });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an event
 * @route   DELETE /api/events/:id
 * @access  Private (Organizer - owner only)
 */
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    if (event.isClaimed) {
      return res.status(400).json({ success: false, message: 'Cannot delete a claimed event' });
    }

    await event.deleteOne();
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createEvent, getMyEvents, getAllEvents, updateEvent, deleteEvent };
