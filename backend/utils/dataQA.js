function validateActivity(activity) {
  const issues = [];

  // Distance check
  if (!activity.distance || activity.distance <= 0) {
    issues.push("Invalid distance");
  }

  // Time check
  if (!activity.moving_time || activity.moving_time <= 0) {
    issues.push("Invalid duration");
  }

  // Pace check (extreme outliers)
  if (activity.pace_min_per_km > 15) {
    issues.push("Pace unusually slow");
  }

  if (activity.pace_min_per_km < 2) {
    issues.push("Pace unrealistically fast");
  }

  // Heart rate check
  if (activity.avg_hr && activity.avg_hr > 210) {
    issues.push("Heart rate too high (sensor error likely)");
  }

  if (activity.avg_hr && activity.avg_hr < 30) {
    issues.push("Heart rate too low (missing or error)");
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

function checkMissingData(activity) {
  const missing = [];

  if (!activity.avg_hr) missing.push("avg_hr");
  if (!activity.max_hr) missing.push("max_hr");
  if (!activity.cadence_spm) missing.push("cadence");
  if (!activity.stride_length_m) missing.push("stride_length");

  return {
    missing_fields: missing,
    completeness_score: 1 - missing.length / 4,
  };
}

function detectEdgeCases(activity) {
  const flags = [];

  // Too short run
  if (activity.distance_km < 0.5) {
    flags.push("Very short activity");
  }

  // Walk vs run confusion
  if (activity.pace_min_per_km > 12) {
    flags.push("Likely walking activity");
  }

  // GPS error spikes
  if (activity.efficiency_score > 20) {
    flags.push("Possible sensor distortion");
  }

  // No movement detected
  if (activity.distance_km > 0 && activity.moving_time < 60) {
    flags.push("Time-distance mismatch");
  }

  return flags;
}

function runDataQA(activity) {
  const validation = validateActivity(activity);
  const missing = checkMissingData(activity);
  const edgeCases = detectEdgeCases(activity);

  return {
    is_valid: validation.isValid,
    issues: validation.issues,
    missing_fields: missing.missing_fields,
    completeness_score: missing.completeness_score,
    edge_cases: edgeCases,
  };
}

module.exports = runDataQA;
