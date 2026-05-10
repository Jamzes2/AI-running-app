function KeyStatsWidget({ stats }) {
  return (
    <div className="widget">
      <h2>Key Stats</h2>

      {stats ? (
        <>
          <div className="stat">
            <span>Avg Efficiency</span>
            <strong>
              {stats.avg_efficiency ? Number(stats.avg_efficiency).toFixed(2) : "--"}
            </strong>
          </div>

          <div className="stat">
            <span>Avg HR Zone</span>
            <strong>
              {stats.avg_hr_zone ? Number(stats.avg_hr_zone).toFixed(1) : "--"}
            </strong>
          </div>

          <div className="stat">
            <span>Avg Pace Zone</span>
            <strong>
              {stats.avg_pace_zone ? Number(stats.avg_pace_zone).toFixed(1) : "--"}
            </strong>
          </div>
        </>
      ) : (
        <p>No stats available</p>
      )}
    </div>
  );
}

export default KeyStatsWidget;
