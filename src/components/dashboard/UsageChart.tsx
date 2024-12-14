import React from 'react';
import { UsageStats } from '../../types/rental';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface UsageChartProps {
  stats: UsageStats;
}

export const UsageChart: React.FC<UsageChartProps> = ({ stats }) => {
  // Mock time series data
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: i,
    cpu: stats.cpuUsage + Math.random() * 10 - 5,
    memory: stats.memoryUsage + Math.random() * 10 - 5,
    temperature: stats.temperature + Math.random() * 5 - 2.5,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#4B5563" />
          <YAxis stroke="#4B5563" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: 'none',
              borderRadius: '0.5rem',
              color: '#E5E7EB',
            }}
          />
          <Line type="monotone" dataKey="cpu" stroke="#4FD1C5" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="memory" stroke="#8B5CF6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="temperature" stroke="#F87171" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}; 