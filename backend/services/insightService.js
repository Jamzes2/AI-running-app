function generateInsights(activity, comparison) {
  const insights = [];

  // Pace insight
  if (comparison?.runComparison?.pace_diff > 0) {
    insights.push("Pace slowed compared to previous run.");
  } else if (comparison?.runComparison?.pace_diff < 0) {
    insights.push("Pace improved compared to previous run.");
  }

  // HR insight
  if (comparison?.runComparison?.hr_diff > 5) {
    insights.push("Heart rate significantly higher — possible fatigue.");
  }

  // Efficiency insight
  if (comparison?.runComparison?.efficiency_diff < 0) {
    insights.push("Running efficiency decreased.");
  } else if (comparison?.runComparison?.efficiency_diff > 0) {
    insights.push("Efficiency improving — good adaptation.");
  }

  // Zone-based insight
  if (activity.hr_zone >= 4) {
    insights.push("High intensity session — recovery recommended.");
  }

  return insights;
}

module.exports = { generateInsights };
