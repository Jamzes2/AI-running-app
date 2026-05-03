require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const healthRoutes = require('./routes/health');
const activitiesRoutes = require('./routes/activities');

app.use('/health', healthRoutes);
app.use('/activities', activitiesRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});