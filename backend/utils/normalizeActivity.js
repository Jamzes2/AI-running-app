function normalizeActivity(activity) {
  const distance_km = activity.distance / 1000;
  const duration_min = activity.moving_time / 60;

  const pace_min_per_km = distance_km > 0 ? duration_min / distance_km : 0;

  const avg_hr = activity.average_heartrate || null;
  const max_hr = activity.max_heartrate || null;

  const cadence_spm = activity.average_cadence || null;

  const stride_length_m =
    cadence_spm && activity.moving_time
      ? (activity.distance / cadence_spm) / activity.moving_time
      : null;

  const vertical_oscillation_cm = activity.average_vertical_oscillation || null;
  const ground_contact_ms = activity.average_ground_contact_time || null;

  const training_load_score = duration_min * (avg_hr ? avg_hr / 100 : 1);

  return {
    id: activity.id,
    name: activity.name,

    distance_km: Number(distance_km.toFixed(2)),
    duration_min: Number(duration_min.toFixed(1)),
    pace_min_per_km: Number(pace_min_per_km.toFixed(2)),

    avg_hr,
    max_hr,

    cadence_spm,
    stride_length_m,
    vertical_oscillation_cm,
    ground_contact_ms,

    training_load_score: Number(training_load_score.toFixed(2)),

    raw: activity,
  };
}

module.exports = normalizeActivity;
