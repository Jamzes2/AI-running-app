const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/:activity_id", async (req, res) => {
  try {
    const { activity_id } = req.params;

    const metrics = await db.query(
      `SELECT *
       FROM activity_metrics_timeseries
       WHERE activity_id = $1
       ORDER BY timestamp_seconds ASC`,
      [activity_id]
    );

    const grouped = {};

    metrics.rows.forEach((row) => {
      if (!grouped[row.timestamp_seconds]) {
        grouped[row.timestamp_seconds] = {
          time: row.timestamp_seconds,
        };
      }

      grouped[row.timestamp_seconds][row.metric_type] = row.value;
    });

    res.json(Object.values(grouped));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Chart data failed" });
  }
});

module.exports = router;
