const express = require("express");
const axios = require("axios");
const db = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const token = process.env.STRAVA_ACCESS_TOKEN;

    const response = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          per_page: 10,
          page: 1,
        },
      }
    );

    const activities = response.data;

    // 🔥 INSERT INTO DATABASE
    for (let activity of activities) {
      await db.query(
        `INSERT INTO activities
        (strava_activity_id, name, distance, moving_time, elapsed_time, average_heartrate, max_heartrate)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        ON CONFLICT DO NOTHING`,
        [
          activity.id,
          activity.name,
          activity.distance,
          activity.moving_time,
          activity.elapsed_time,
          activity.average_heartrate,
          activity.max_heartrate,
        ]
      );
    }

    res.json({
      message: "Activities saved to database",
      count: activities.length,
      raw: activities,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch/store activities" });
  }
});

module.exports = router;
