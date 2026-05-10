const express = require("express");
const axios = require("axios");
const db = require("../db");
const normalizeActivity = require("../utils/normalizeActivity");
const buildDerivedMetrics = require("../utils/buildDerivedMetrics");
const fetchStreams = require("../utils/fetchActivityStreams");
const normalizeStreams = require("../utils/normalizeStreams");
const runDataQA = require("../utils/dataQA");

const router = express.Router();

router.post("/activities", async (req, res) => {
  try {
    const { access_token, user_id } = req.body;

    // 1. Fetch Strava activities
    const response = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          per_page: 20,
          page: 1,
        },
      }
    );

    const activities = response.data;

    let saved = 0;

    // 2. Store in DB using normalized activity model
    for (let activity of activities) {
      const clean = normalizeActivity(activity);
      const derived = buildDerivedMetrics(clean);

      // Run QA check before inserting
      const qa = runDataQA(clean);
      console.log("QA Result:", qa);

      const activityResult = await db.query(
        `INSERT INTO activities
        (strava_activity_id, user_id, name, distance, moving_time, elapsed_time, average_heartrate, max_heartrate, pace_zone, hr_zone, efficiency_score)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        ON CONFLICT (strava_activity_id) DO UPDATE SET
          name = EXCLUDED.name,
          distance = EXCLUDED.distance,
          moving_time = EXCLUDED.moving_time,
          elapsed_time = EXCLUDED.elapsed_time,
          average_heartrate = EXCLUDED.average_heartrate,
          max_heartrate = EXCLUDED.max_heartrate,
          pace_zone = EXCLUDED.pace_zone,
          hr_zone = EXCLUDED.hr_zone,
          efficiency_score = EXCLUDED.efficiency_score
        RETURNING id`,
        [
          clean.id,
          user_id,
          clean.name,
          activity.distance,
          activity.moving_time,
          activity.elapsed_time,
          clean.avg_hr,
          clean.max_hr,
          derived.pace_zone,
          derived.hr_zone,
          derived.efficiency_score,
        ]
      );

      let localActivityId = activityResult.rows[0]?.id;
      if (!localActivityId) {
        const existing = await db.query(
          `SELECT id FROM activities WHERE strava_activity_id = $1`,
          [clean.id]
        );
        localActivityId = existing.rows[0]?.id;
      }

      // Store QA results
      if (localActivityId) {
        await db.query(
          `INSERT INTO activity_data_quality
           (activity_id, is_valid, completeness_score, issues, edge_cases)
           VALUES ($1,$2,$3,$4,$5)`,
          [
            localActivityId,
            qa.is_valid,
            qa.completeness_score,
            JSON.stringify(qa.issues),
            JSON.stringify(qa.edge_cases),
          ]
        );
      }

      if (localActivityId) {
        const streams = await fetchStreams(clean.id, access_token);
        const normalized = normalizeStreams(streams, localActivityId);

        for (let point of normalized) {
          await db.query(
            `INSERT INTO activity_metrics_timeseries
             (activity_id, metric_type, timestamp_seconds, value)
             VALUES ($1,$2,$3,$4)
             ON CONFLICT (activity_id, metric_type, timestamp_seconds) DO NOTHING`,
            [
              point.activity_id,
              point.metric_type,
              point.timestamp_seconds,
              point.value,
            ]
          );
        }
      }

      saved++;
    }

    res.json({
      message: "Sync complete",
      fetched: activities.length,
      saved,
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Sync failed" });
  }
});

module.exports = router;