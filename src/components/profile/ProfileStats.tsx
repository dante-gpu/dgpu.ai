import React from 'react';
import { UserProfile } from '../../types/user';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatSOL } from '../../utils/format';

interface ProfileStatsProps {
  profile: UserProfile;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ profile }) => {
  // Son 7 günlük aktivite verilerini oluştur
  const activityData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayActivities = profile.activity.filter(a => 
      new Date(a.timestamp).toDateString() === date.toDateString()
    );

    return {
      date: date.toLocaleDateString(),
      activities: dayActivities.length,
      spent: dayActivities
        .filter(a => a.type === 'rental')
        .reduce((sum, a) => sum + (a.details.amount || 0), 0),
      earned: dayActivities
        .filter(a => a.type === 'listing')
        .reduce((sum, a) => sum + (a.details.amount || 0), 0),
    };
  }).reverse();

  return (
    <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
      <h3 className="text-lg font-medium text-white mb-6">Activity Overview</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityData}>
            <XAxis 
              dataKey="date" 
              stroke="#4B5563"
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { weekday: 'short' })}
            />
            <YAxis stroke="#4B5563" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#E5E7EB',
              }}
              formatter={(value: number, name: string) => [
                name === 'spent' || name === 'earned' ? formatSOL(value) : value,
                name.charAt(0).toUpperCase() + name.slice(1)
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="activities" 
              stroke="#4FD1C5" 
              strokeWidth={2} 
              dot={false}
              name="Activities"
            />
            <Line 
              type="monotone" 
              dataKey="spent" 
              stroke="#8B5CF6" 
              strokeWidth={2} 
              dot={false}
              name="Spent"
            />
            <Line 
              type="monotone" 
              dataKey="earned" 
              stroke="#10B981" 
              strokeWidth={2} 
              dot={false}
              name="Earned"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-dark-700 rounded-lg p-4">
          <p className="text-sm text-gray-400">Total Activities</p>
          <p className="text-2xl font-bold text-white mt-1">
            {profile.activity.length}
          </p>
        </div>
        <div className="bg-dark-700 rounded-lg p-4">
          <p className="text-sm text-gray-400">Total Spent</p>
          <p className="text-2xl font-bold gradient-text mt-1">
            {formatSOL(profile.stats.totalSpent)} SOL
          </p>
        </div>
        <div className="bg-dark-700 rounded-lg p-4">
          <p className="text-sm text-gray-400">Total Earned</p>
          <p className="text-2xl font-bold gradient-text mt-1">
            {formatSOL(profile.stats.totalEarned)} SOL
          </p>
        </div>
      </div>
    </div>
  );
}; 