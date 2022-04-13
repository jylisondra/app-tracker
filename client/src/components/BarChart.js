import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function BarChartComponent({ data }) {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={data} margin={{ right: 30 }}>
        <CartesianGrid stroke="white" strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke="white" />
        <YAxis stroke="white" allowDecimals={false} />
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={{ fill: 'rgba(245, 245, 250, .5)' }}
        />
        <Bar dataKey="count" fill="#9c7cf6" barSize={65} />
      </BarChart>
    </ResponsiveContainer>
  );
}
