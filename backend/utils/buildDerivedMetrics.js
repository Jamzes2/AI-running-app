const { getPaceZone, getHRZone, calculateEfficiency } = require("./derivedMetrics");

function buildDerivedMetrics(activity) {
  const pace = activity.pace_min_per_km;
  const hr = activity.avg_hr;

  return {
    pace_zone: getPaceZone(pace),
    hr_zone: getHRZone(hr),
    efficiency_score: calculateEfficiency(pace, hr),
  };
}

module.exports = buildDerivedMetrics;
