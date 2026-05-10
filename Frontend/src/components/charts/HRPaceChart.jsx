import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

function HRPaceChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="widget">
        <h2>HR vs Pace</h2>
        <p>No chart data available</p>
      </div>
    );
  }

  return (
    <div className="widget">
      <h2>HR vs Pace</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />

          <XAxis
            dataKey="time"
            stroke="#999"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            yAxisId="left"
            stroke="#999"
            tick={{ fontSize: 12 }}
            label={{
              value: "Heart Rate (bpm)",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 12 },
            }}
          />

          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#999"
            tick={{ fontSize: 12 }}
            label={{
              value: "Pace (min/km)",
              angle: 90,
              position: "insideRight",
              style: { fontSize: 12 },
            }}
          />

          <Tooltip
            contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #61dafb" }}
          />

          <Legend />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="heartrate"
            stroke="#ff6b6b"
            dot={false}
            isAnimationActive={false}
            name="Heart Rate"
          />

          <Line
            yAxisId="right"
            type="monotone"
            dataKey="cadence"
            stroke="#61dafb"
            dot={false}
            isAnimationActive={false}
            name="Cadence"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HRPaceChart;
