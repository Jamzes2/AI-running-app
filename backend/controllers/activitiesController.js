const activitiesService = require('../services/activitiesService');

const getActivities = (req, res) => {
  const activities = activitiesService.getActivities();
  res.json(activities);
};

const getActivityById = (req, res) => {
  const { id } = req.params;
  const activity = activitiesService.getActivityById(id);
  res.json(activity);
};

module.exports = { getActivities, getActivityById };
