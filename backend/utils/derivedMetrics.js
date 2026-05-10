function getPaceZone(pace) {
  if (pace < 4.5) return 5;
  if (pace < 5.25) return 4;
  if (pace < 6.25) return 3;
  if (pace < 7.5) return 2;
  return 1;
}

function getHRZone(hr) {
  if (!hr) return null;
  if (hr < 120) return 1;
  if (hr < 140) return 2;
  if (hr < 155) return 3;
  if (hr < 170) return 4;
  return 5;
}

function calculateEfficiency(pace, hr) {
  if (!pace || !hr) return null;

  const score = (pace / hr) * 1000;
  return Number(score.toFixed(2));
}

module.exports = {
  getPaceZone,
  getHRZone,
  calculateEfficiency,
};
