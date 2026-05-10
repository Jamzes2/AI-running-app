const getActivities = () => {
  return [
    {
      id: 1,
      name: "Morning Run",
      distance_km: 5.2,
      duration_sec: 1620,
      pace: 312, // seconds per km
      heart_rate_avg: 158,
      cadence_avg: 172
    },
    {
      id: 2,
      name: "Tempo Run",
      distance_km: 10,
      duration_sec: 3600,
      pace: 360,
      heart_rate_avg: 165,
      cadence_avg: 168
    },
    {
      id: 3,
      name: "Easy Run",
      distance_km: 3,
      duration_sec: 900,
      pace: 300,
      heart_rate_avg: 150,
      cadence_avg: 175
    }
  ];
};

module.exports = { getActivities };
