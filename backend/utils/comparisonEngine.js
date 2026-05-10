function compareRuns(current, previous) {
  if (!previous) return null;

  return {
    pace_diff: current.pace_min_per_km - previous.pace_min_per_km,
    hr_diff: current.avg_hr - previous.avg_hr,
    efficiency_diff: current.efficiency_score - previous.efficiency_score,
    distance_diff: current.distance_km - previous.distance_km,
  };
}

function calculateBaseline(runs) {
  if (!runs.length) return null;

  const avg = (arr, key) =>
    arr.reduce((sum, r) => sum + (r[key] || 0), 0) / arr.length;

  return {
    avg_pace: avg(runs, "pace_min_per_km"),
    avg_hr: avg(runs, "avg_hr"),
    avg_efficiency: avg(runs, "efficiency_score"),
  };
}

function compareToBaseline(current, baseline) {
  if (!baseline) return null;

  return {
    pace_vs_avg: current.pace_min_per_km - baseline.avg_pace,
    hr_vs_avg: current.avg_hr - baseline.avg_hr,
    efficiency_vs_avg: current.efficiency_score - baseline.avg_efficiency,
  };
}

module.exports = {
  compareRuns,
  calculateBaseline,
  compareToBaseline,
};
