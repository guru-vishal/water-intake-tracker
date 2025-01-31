const express = require('express');
const router = express.Router();
const {
  addWaterIntake,
  getDailyWaterIntake,
  getWeeklyWaterIntake,
  deleteWaterIntake,
} = require('../controllers/waterController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All routes require authentication

router.post('/', addWaterIntake);
router.get('/daily', getDailyWaterIntake);
router.get('/weekly', getWeeklyWaterIntake);
router.delete('/:id', deleteWaterIntake);

module.exports = router;