import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CadenceTrendChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="widget">
        <h2>Cadence Trends</h2>
        <p>No chart data available</p>
      </div>
    );
  }

  return (
    <div className="widget">
      <h2>Cadence Trends</h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis
            dataKey="time"
            stroke="#999"
            tick={{ fontSize: 12 }}
          />

          <YAxis
            stroke="#999"
            tick={{ fontSize: 12 }}
            label={{
              value: "Cadence (spm)",
              angle: -90,
              position: "insideLeft",
              style: { fontSize: 12 },
            }}
          />

          <Tooltip
            contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #61dafb" }}
          />

          <Area
            type="monotone"
            dataKey="cadence"
            stroke="#61dafb"
            fill="rgba(97, 218, 251, 0.1)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CadenceTrendChart;
