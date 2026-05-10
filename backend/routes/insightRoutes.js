const express = require("express");
const db = require("../db");
const { getRunComparison } = require("../services/comparisonService");
const { generateInsights } = require("../services/insightService");

const router = express.Router();

router.get("/:user_id/:activity_id", async (req, res) => {
  try {
    const { user_id, activity_id } = req.params;

    const comparison = await getRunComparison(user_id, activity_id);
    const activity = comparison.current;
    const insights = generateInsights(activity, comparison);

    res.json({
      success: true,
      insights,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Insight generation failed" });
  }
});

module.exports = router;
