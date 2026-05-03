const healthService = require('../services/healthService');

const getHealth = (req, res) => {
  const health = healthService.getHealth();
  res.json(health);
};

module.exports = { getHealth };