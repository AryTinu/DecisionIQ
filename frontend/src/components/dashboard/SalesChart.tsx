
"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const salesData = [
  { month: "Jan", actual: 62, forecast: null },
  { month: "Feb", actual: 74, forecast: null },
  { month: "Mar", actual: 70, forecast: null },
  { month: "Apr", actual: 92, forecast: null },
  { month: "May", actual: 84, forecast: null },
  { month: "Jun", actual: 111, forecast: null },
  { month: "Jul", actual: 101, forecast: 101 },
  { month: "Aug", actual: null, forecast: 121 },
  { month: "Sep", actual: null, forecast: 114 },
  { month: "Oct", actual: null, forecast: 134 },
  { month: "Nov", actual: null, forecast: 125 },
  { month: "Dec", actual: null, forecast: 145 },
];

export default function SalesChart() {
  return (
    <section className="diq-panel diq-sales-chart-panel">
      <div className="diq-panel-header">
        <div>
          <h2>Sales performance</h2>
          <p>Track actual sales and projected performance</p>
        </div>

        <select className="diq-select" defaultValue="2026" aria-label="Chart year">
          <option value="2026">Year 2026</option>
          <option value="2025">Year 2025</option>
        </select>
      </div>

      <div className="diq-chart-legend">
        <span>
          <i className="diq-legend-dot actual" /> Actual sales
        </span>
        <span>
          <i className="diq-legend-dot forecast" /> Forecast
        </span>
      </div>

      <div className="diq-main-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={salesData}
            margin={{ top: 10, right: 8, left: -18, bottom: 0 }}
          >
            <defs>
              <linearGradient id="diqSalesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#35628e" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#35628e" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient
                id="diqForecastFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#8aa8c9" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#8aa8c9" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#edf1f5" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8794a7", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#8794a7", fontSize: 11 }}
              tickFormatter={(value: number) => `${value}k`}
            />
            <Tooltip
              contentStyle={{
                border: "1px solid #dce3ec",
                borderRadius: 10,
                fontSize: 12,
              }}
              formatter={(value, name) => [
                value == null ? "—" : `${value}k`,
                name === "actual" ? "Actual sales" : "Forecast",
              ]}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#35628e"
              strokeWidth={2.5}
              fill="url(#diqSalesFill)"
              connectNulls={false}
              activeDot={{ r: 4 }}
            />
            <Area
              type="monotone"
              dataKey="forecast"
              stroke="#7e9fc3"
              strokeWidth={2.5}
              strokeDasharray="6 5"
              fill="url(#diqForecastFill)"
              connectNulls={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="diq-chart-note">
        <span className="diq-chart-note-dot" />
        Illustrative demo data · Values shown in thousands
      </div>
    </section>
  );
}
