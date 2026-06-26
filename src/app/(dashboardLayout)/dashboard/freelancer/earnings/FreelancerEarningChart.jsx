"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function FreelancerEarningChart({ chartData }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="4 4" vertical={false} />

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 10px 25px rgba(0,0,0,.1)",
          }}
          formatter={(value) => [`$${value}`, "Earnings"]}
          labelFormatter={(label) => `Month: ${label}`}
        />

        <Bar dataKey="earning" radius={[10, 10, 0, 0]} fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  );
}
