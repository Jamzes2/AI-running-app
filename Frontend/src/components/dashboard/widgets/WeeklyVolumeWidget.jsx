function WeeklyVolumeWidget({ weekly }) {
  return (
    <div className="widget">
      <h2>Weekly Volume</h2>

      {weekly && weekly.length > 0 ? (
        weekly.map((week, i) => (
          <div key={i} className="week-row">
            <div>
              {new Date(week.week).toLocaleDateString()}
            </div>

            <div>
              {(week.total_distance / 1000).toFixed(1)} km
            </div>
          </div>
        ))
      ) : (
        <p>No weekly data</p>
      )}
    </div>
  );
}

export default WeeklyVolumeWidget;
