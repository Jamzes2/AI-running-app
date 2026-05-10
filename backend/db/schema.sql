-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  strava_id VARCHAR(50) UNIQUE,
  name VARCHAR(100),
  access_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ACTIVITIES
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  strava_activity_id VARCHAR(50) UNIQUE,
  user_id INTEGER REFERENCES users(id),
  name TEXT,
  distance FLOAT,
  moving_time INTEGER,
  elapsed_time INTEGER,
  average_heartrate FLOAT,
  max_heartrate FLOAT,
  pace_zone INTEGER,
  hr_zone INTEGER,
  efficiency_score FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- METRICS (future AI layer storage)
CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  activity_id INTEGER REFERENCES activities(id),
  cadence FLOAT,
  stride_length FLOAT,
  vertical_oscillation FLOAT,
  ground_contact_time FLOAT,
  training_load FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TIME-SERIES METRICS
CREATE TABLE activity_metrics_timeseries (
  id SERIAL PRIMARY KEY,
  activity_id INTEGER REFERENCES activities(id),
  metric_type VARCHAR(50),
  timestamp_seconds INTEGER,
  value FLOAT
);

CREATE UNIQUE INDEX activity_metrics_timeseries_unique
ON activity_metrics_timeseries(activity_id, metric_type, timestamp_seconds);

-- VIDEO UPLOADS
CREATE TABLE activity_videos (
  id SERIAL PRIMARY KEY,
  activity_id INTEGER REFERENCES activities(id),
  file_path TEXT,
  file_name TEXT,
  duration_seconds INTEGER,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DATA QUALITY ASSESSMENT
CREATE TABLE activity_data_quality (
  id SERIAL PRIMARY KEY,
  activity_id INTEGER REFERENCES activities(id),
  is_valid BOOLEAN,
  completeness_score FLOAT,
  issues TEXT,
  edge_cases TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
