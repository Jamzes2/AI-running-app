import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import HRPaceChart from "../components/charts/HRPaceChart";
import CadenceTrendChart from "../components/charts/CadenceTrendChart";

function RunDetail() {
  const { id } = useParams();

  const [activity, setActivity] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    // Activity data
    axios
      .get(`http://localhost:5000/api/activity/${id}`)
      .then((res) => setActivity(res.data))
      .catch((err) => console.error("Activity fetch error:", err));

    // Chart data
    axios
      .get(`http://localhost:5000/api/charts/${id}`)
      .then((res) => setChartData(res.data || []))
      .catch((err) => console.error("Chart data fetch error:", err));

    // Comparison data
    axios
      .get(`http://localhost:5000/api/compare/1/${id}`)
      .then((res) => setComparison(res.data.data))
      .catch((err) => console.error("Comparison fetch error:", err));

    // AI insights
    axios
      .get(`http://localhost:5000/api/insights/1/${id}`)
      .then((res) => setInsights(res.data.insights || []))
      .catch((err) => console.error("Insights fetch error:", err));
  }, [id]);

  if (!activity) {
    return <div className="page">Loading...</div>;
  }

  return (
    <div className="page">
      <h1>{activity.name}</h1>

      {/* CORE METRICS */}
      <div className="metrics-grid">
        <div className="metric-card">
          <span>Distance</span>
          <strong>{(activity.distance / 1000).toFixed(2)} km</strong>
        </div>

        <div className="metric-card">
          <span>Avg HR</span>
          <strong>{activity.average_heartrate || "--"}</strong>
        </div>

        <div className="metric-card">
          <span>Pace Zone</span>
          <strong>{activity.pace_zone || "--"}</strong>
        </div>

        <div className="metric-card">
          <span>Efficiency</span>
          <strong>{activity.efficiency_score || "--"}</strong>
        </div>
      </div>

      {/* CHARTS */}
      <div className="dashboard-grid">
        <HRPaceChart data={chartData} />

        <CadenceTrendChart data={chartData} />
      </div>

      {/* COMPARISONS */}
      {comparison && (
        <div className="widget">
          <h2>Comparisons</h2>

          <p>
            Pace Difference:{" "}
            {comparison.runComparison?.pace_diff?.toFixed(2) || "--"}
          </p>

          <p>
            HR Difference:{" "}
            {comparison.runComparison?.hr_diff?.toFixed(2) || "--"}
          </p>

          <p>
            Efficiency Difference:{" "}
            {comparison.runComparison?.efficiency_diff?.toFixed(2) || "--"}
          </p>
        </div>
      )}

      {/* AI INSIGHTS */}
      <div className="widget">
        <h2>AI Insights</h2>

        {insights.length > 0 ? (
          insights.map((insight, i) => <p key={i}>🧠 {insight}</p>)
        ) : (
          <p>No insights available</p>
        )}
      </div>
    </div>
  );
}

export default RunDetail;
