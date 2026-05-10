const getAllActivities = (req, res) => {
  res.json([
    {
      id: 1,
      name: "Morning Run",
      distance: 5.2,
      heart_rate: 158,
      cadence: 172
    },
    {
      id: 2,
      name: "Tempo Run",
      distance: 10,
      heart_rate: 165,
      cadence: 168
    }
  ]);
};

module.exports = { getAllActivities };