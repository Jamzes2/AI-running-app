// Mock running data
const mockActivities = [
  {
    id: 1,
    distance: 5.2, // km
    time: 1860, // seconds
    heart_rate: 145, // bpm
    cadence: 178 // steps/min
  },
  {
    id: 2,
    distance: 3.8,
    time: 1440,
    heart_rate: 138,
    cadence: 175
  },
  {
    id: 3,
    distance: 8.5,
    time: 2520,
    heart_rate: 155,
    cadence: 182
  }
];

const getActivities = () => {
  return {
    status: "success",
    data: mockActivities,
    count: mockActivities.length
  };
};

const getActivityById = (id) => {
  const activity = mockActivities.find(a => a.id === parseInt(id));
  if (!activity) {
    return {
      status: "error",
      message: "Activity not found"
    };
  }
  return {
    status: "success",
    data: activity
  };
};

module.exports = { getActivities, getActivityById };
