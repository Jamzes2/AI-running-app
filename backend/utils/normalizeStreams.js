function normalizeStreams(streams, activityId) {
  const result = [];

  const time = streams.time?.data || [];
  const hr = streams.heartrate?.data || [];
  const cadence = streams.cadence?.data || [];

  for (let i = 0; i < time.length; i++) {
    if (hr[i] !== undefined && hr[i] !== null) {
      result.push({
        activity_id: activityId,
        metric_type: "heart_rate",
        timestamp_seconds: time[i],
        value: hr[i],
      });
    }

    if (cadence[i] !== undefined && cadence[i] !== null) {
      result.push({
        activity_id: activityId,
        metric_type: "cadence",
        timestamp_seconds: time[i],
        value: cadence[i],
      });
    }
  }

  return result;
}

module.exports = normalizeStreams;
