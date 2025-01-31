const mongoose = require('mongoose');

const waterIntakeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ['ml', 'oz'],
      default: 'ml',
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const WaterIntake = mongoose.model('WaterIntake', waterIntakeSchema);
module.exports = WaterIntake;