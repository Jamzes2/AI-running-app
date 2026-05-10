import { useEffect, useState } from "react";
import axios from "axios";
import GridLayout from "react-grid-layout";
import { widgetMap } from "../../config/dashboardWidgets";
import HRPaceChart from "../charts/HRPaceChart";
import CadenceTrendChart from "../charts/CadenceTrendChart";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [layout, setLayout] = useState([
    { i: "recent_runs", x: 0, y: 0, w: 6, h: 4 },
    { i: "key_stats", x: 6, y: 0, w: 3, h: 2 },
    { i: "weekly_volume", x: 9, y: 0, w: 3, h: 2 },
    { i: "ai_summary", x: 6, y: 2, w: 6, h: 2 },
    { i: "hr_pace_chart", x: 0, y: 4, w: 6, h: 3 },
    { i: "cadence_chart", x: 6, y: 4, w: 6, h: 3 },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dashboard/1")
      .then((res) => setDashboardData(res.data))
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setDashboardData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Fetch chart data for first activity (activity_id = 1)
    axios
      .get("http://localhost:5000/api/charts/1")
      .then((res) => setChartData(res.data || []))
      .catch((err) => {
        console.error("Chart data fetch error:", err);
        setChartData([]);
      });
  }, []);

  if (loading) {
    return <div className="page"><h1>Dashboard</h1><p>Loading...</p></div>;
  }

  if (!dashboardData) {
    return <div className="page"><h1>Dashboard</h1><p>Failed to load dashboard</p></div>;
  }

  const chartWidgets = {
    hr_pace_chart: <HRPaceChart data={chartData} />,
    cadence_chart: <CadenceTrendChart data={chartData} />,
  };

  return (
    <div className="page">
      <h1>Dashboard</h1>

      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1200}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={(newLayout) => {
          setLayout(newLayout);
          console.log("Updated Layout:", newLayout);
          // Future: save to DB
        }}
      >
        {layout.map((item) => {
          // Check if it's a chart widget
          if (chartWidgets[item.i]) {
            return (
              <div key={item.i} className="grid-widget">
                {chartWidgets[item.i]}
              </div>
            );
          }

          // Otherwise render from widgetMap
          const WidgetComponent = widgetMap[item.i];

          if (!WidgetComponent) return null;

          return (
            <div key={item.i} className="grid-widget">
              <WidgetComponent
                runs={dashboardData.recent_runs}
                stats={dashboardData.stats}
                weekly={dashboardData.weekly_summary}
              />
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
}

export default Dashboard;
