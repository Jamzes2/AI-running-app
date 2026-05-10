import { Link } from "react-router-dom";

function RecentRunsWidget({ runs }) {
  return (
    <div className="widget large-widget">
      <h2>Recent Runs</h2>

      {runs && runs.length > 0 ? (
        runs.map((run) => (
          <Link
            key={run.id}
            to={`/run/${run.id}`}
            className="run-link"
          >
            <div className="run-row">
              <div>
                <strong>{run.name}</strong>
              </div>

              <div>
                {(run.distance / 1000).toFixed(2)} km
              </div>

              <div>
                HR: {run.average_heartrate || "--"}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No recent runs</p>
      )}
    </div>
  );
}

export default RecentRunsWidget;
