const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    // 1. Recent runs
    const recent = await db.query(
      `SELECT * FROM activities
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 5`,
      [user_id]
    );

    // 2. Weekly volume
    const weekly = await db.query(
      `SELECT 
         DATE_TRUNC('week', created_at) as week,
         SUM(distance) as total_distance,
         SUM(moving_time) as total_time
       FROM activities
       WHERE user_id = $1
       GROUP BY week
       ORDER BY week DESC
       LIMIT 4`,
      [user_id]
    );

    // 3. Average performance
    const stats = await db.query(
      `SELECT 
         AVG(pace_zone) as avg_pace_zone,
         AVG(hr_zone) as avg_hr_zone,
         AVG(efficiency_score) as avg_efficiency
       FROM activities
       WHERE user_id = $1`,
      [user_id]
    );

    res.json({
      success: true,
      recent_runs: recent.rows,
      weekly_summary: weekly.rows,
      stats: stats.rows[0],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Dashboard failed" });
  }
});

module.exports = router;
