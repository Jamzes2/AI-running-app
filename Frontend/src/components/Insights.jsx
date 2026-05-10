import { useEffect, useState } from "react";
import axios from "axios";

function Insights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/insights/1/1")
      .then((res) => {
        setInsights(res.data.insights || []);
      })
      .catch((err) => {
        console.error("Insights fetch error:", err);
        setInsights([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page">
      <h2>AI Insights</h2>

      <div className="card">
        {loading ? (
          <p>Loading insights...</p>
        ) : insights.length > 0 ? (
          insights.map((insight, i) => (
            <p key={i} className="insight-item">
              🧠 {insight}
            </p>
          ))
        ) : (
          <p>No insights available yet</p>
        )}
      </div>
    </div>
  );
}

export default Insights;
