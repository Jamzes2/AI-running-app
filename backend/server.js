const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
const activityRoutes = require("./routes/activityRoutes");
const authRoutes = require("./routes/authRoutes");
const syncRoutes = require("./routes/syncRoutes");
const compareRoutes = require("./routes/compareRoutes");
const insightRoutes = require("./routes/insightRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const chartRoutes = require("./routes/chartRoutes");
const videoRoutes = require("./routes/videoRoutes");
const activityDetailRoutes = require("./routes/activityDetailRoutes");
app.use("/api/activities", activityRoutes);
app.use("/auth", authRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/insights", insightRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/charts", chartRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/activity", activityDetailRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API running clean architecture" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});