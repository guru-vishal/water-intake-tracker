const WaterIntake = require('../models/WaterIntake');

// Add water intake
const addWaterIntake = async (req, res) => {
  try {
    const { amount, unit, note } = req.body;
    const waterIntake = await WaterIntake.create({
      user: req.user._id,
      date: new Date(),
      amount,
      unit,
      note,
    });
    res.status(201).json(waterIntake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get daily water intake
const getDailyWaterIntake = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const waterIntakes = await WaterIntake.find({
      user: req.user._id,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    }).sort({ date: -1 });

    const totalIntake = waterIntakes.reduce((sum, record) => {
      // Convert all measurements to ml for consistency
      const amount = record.unit === 'oz' ? record.amount * 29.5735 : record.amount;
      return sum + amount;
    }, 0);

    res.json({
      records: waterIntakes,
      totalIntake: Math.round(totalIntake),
      unit: 'ml',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get weekly water intake
const getWeeklyWaterIntake = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const waterIntakes = await WaterIntake.find({
      user: req.user._id,
      date: {
        $gte: weekAgo,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const dailyTotals = {};
    waterIntakes.forEach((intake) => {
      const date = intake.date.toISOString().split('T')[0];
      const amount = intake.unit === 'oz' ? intake.amount * 29.5735 : intake.amount;
      dailyTotals[date] = (dailyTotals[date] || 0) + amount;
    });

    res.json({
      dailyTotals,
      unit: 'ml',
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete water intake record
const deleteWaterIntake = async (req, res) => {
  try {
    const waterIntake = await WaterIntake.findById(req.params.id);
    if (!waterIntake) {
      return res.status(404).json({ message: 'Record not found' });
    }

    if (waterIntake.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await waterIntake.remove();
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addWaterIntake,
  getDailyWaterIntake,
  getWeeklyWaterIntake,
  deleteWaterIntake,
};