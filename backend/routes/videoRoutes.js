const express = require("express");
const db = require("../db");
const upload = require("../middleware/uploadVideo");

const router = express.Router();

router.post(
  "/upload",
  upload.single("video"),
  async (req, res) => {
    try {
      const { activity_id } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filePath = req.file.path;
      const fileName = req.file.filename;
      const duration_seconds = null;

      const result = await db.query(
        `INSERT INTO activity_videos 
        (activity_id, file_path, file_name, duration_seconds)
        VALUES ($1,$2,$3,$4)
        RETURNING *`,
        [activity_id, filePath, fileName, duration_seconds]
      );

      res.json({
        message: "Video uploaded successfully",
        video: result.rows[0],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

module.exports = router;
