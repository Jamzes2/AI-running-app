const axios = require("axios");

async function fetchStreams(activityId, token) {
  const response = await axios.get(
    `https://www.strava.com/api/v3/activities/${activityId}/streams`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        keys: "time,heartrate,cadence",
        key_by_type: true,
      },
    }
  );

  return response.data;
}

module.exports = fetchStreams;
