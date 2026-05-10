const db = require("../db");
const {
  compareRuns,
  calculateBaseline,
  compareToBaseline,
} = require("../utils/comparisonEngine");

async function getRunComparison(user_id, currentRunId) {
  const currentRes = await db.query(
    "SELECT * FROM activities WHERE id = $1",
    [currentRunId]
  );
  const current = currentRes.rows[0];

  const historyRes = await db.query(
    `SELECT * FROM activities
     WHERE user_id = $1 AND id != $2
     ORDER BY created_at DESC
     LIMIT 10`,
    [user_id, currentRunId]
  );
  const history = historyRes.rows;
  const previous = history[0];

  const runComparison = compareRuns(current, previous);
  const baseline = calculateBaseline(history);
  const baselineComparison = compareToBaseline(current, baseline);

  return {
    current,
    previous,
    runComparison,
    baselineComparison,
    baseline,
  };
}

module.exports = { getRunComparison };
