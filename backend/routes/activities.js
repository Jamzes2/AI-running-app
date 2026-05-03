const express = require('express');
const router = express.Router();
const { getActivities, getActivityById } = require('../controllers/activitiesController');

// GET all activities
router.get('/', getActivities);

// GET specific activity by ID
router.get('/:id', getActivityById);

module.exports = router;
