const express = require("express");
const { getRunComparison } = require("../services/comparisonService");

const router = express.Router();

router.get("/:user_id/:activity_id", async (req, res) => {
  try {
    const { user_id, activity_id } = req.params;
    const data = await getRunComparison(user_id, activity_id);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Comparison failed" });
  }
});

module.exports = router;
