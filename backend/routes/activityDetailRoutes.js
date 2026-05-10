const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM activities
       WHERE id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Activity not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch activity" });
  }
});

module.exports = router;
