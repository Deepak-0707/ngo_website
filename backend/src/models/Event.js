const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    foodQuantity: {
      type: String,
      required: [true, 'Food quantity is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    eventDate: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isClaimed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Index for efficient queries
eventSchema.index({ createdBy: 1 });
eventSchema.index({ isClaimed: 1 });

module.exports = mongoose.model('Event', eventSchema);
