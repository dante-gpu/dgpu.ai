import React, { useEffect, useState } from 'react';
import { UserProfile } from '../../types/user';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { formatSOL } from '../../utils/format';
import { Cpu, HardDrive, Activity, DollarSign, TrendingUp } from 'lucide-react';
import { useRentals } from '../../hooks/useRentals';
import { RentalHistory } from '../../types/rental';

interface ProfileStatsProps {
  profile: UserProfile;
}

interface ActivityData {
  time: string;
  earnings: number;
  spending: number;
  activeRentals: number;
  performance: number;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ profile }) => {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const { rentals } = useRentals();

  useEffect(() => {
    // Son 24 saatin verilerini oluştur
    const generateActivityData = () => {
      const data: ActivityData[] = [];
      const now = new Date();

      for (let i = 23; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        const startTime = new Date(time);
        startTime.setMinutes(0, 0, 0);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

        // Bu saat dilimindeki rental'ları filtrele
        const hourRentals = rentals.filter(rental => {
          const rentalTime = new Date(rental.timestamp);
          return rentalTime >= startTime && rentalTime < endTime;
        });

        // İstatistikleri hesapla
        const hourData: ActivityData = {
          time: time.toLocaleTimeString([], { hour: '2-digit' }),
          earnings: calculateEarnings(hourRentals, profile.address),
          spending: calculateSpending(hourRentals, profile.address),
          activeRentals: hourRentals.filter(r => r.status === 'active').length,
          performance: calculatePerformance(hourRentals)
        };

        data.push(hourData);
      }

      return data;
    };

    // İlk veriyi oluştur
    setActivityData(generateActivityData());

    // Her 5 dakikada bir güncelle
    const interval = setInterval(() => {
      setActivityData(generateActivityData());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [rentals, profile.address]);

  return (
    <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white">Activity Overview</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Last 24 Hours</span>
          <Activity className="w-4 h-4 text-glow-400 animate-pulse" />
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityData}>
            <defs>
              <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis 
              dataKey="time" 
              stroke="#4B5563"
              tick={{ fill: '#9CA3AF' }}
            />
            <YAxis 
              stroke="#4B5563"
              tick={{ fill: '#9CA3AF' }}
              tickFormatter={(value) => `${value} SOL`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem'
              }}
              labelStyle={{ color: '#9CA3AF' }}
              itemStyle={{ color: '#E5E7EB' }}
              formatter={(value: number) => [`${value.toFixed(3)} SOL`, '']}
            />

            <Area
              type="monotone"
              dataKey="earnings"
              name="Earnings"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorEarnings)"
            />
            <Area
              type="monotone"
              dataKey="spending"
              name="Spending"
              stroke="#8B5CF6"
              fillOpacity={1}
              fill="url(#colorSpending)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <StatCard
          label="Active Rentals"
          value={activityData[activityData.length - 1]?.activeRentals || 0}
          icon={Activity}
          trend={10}
        />
        <StatCard
          label="24h Earnings"
          value={formatSOL(calculateTotal(activityData, 'earnings'))}
          icon={DollarSign}
          trend={15}
          isCurrency
        />
        <StatCard
          label="24h Spending"
          value={formatSOL(calculateTotal(activityData, 'spending'))}
          icon={DollarSign}
          trend={-5}
          isCurrency
        />
        <StatCard
          label="Performance"
          value={`${Math.round(activityData[activityData.length - 1]?.performance || 0)}%`}
          icon={TrendingUp}
          trend={8}
        />
      </div>
    </div>
  );
};

// Yardımcı fonksiyonlar
const calculateEarnings = (rentals: RentalHistory[], address: string) => {
  return rentals
    .filter(r => r.gpu.creator?.address === address)
    .reduce((sum, r) => sum + r.price, 0);
};

const calculateSpending = (rentals: RentalHistory[], address: string) => {
  return rentals
    .filter(r => r.renterAddress === address)
    .reduce((sum, r) => sum + r.price, 0);
};

const calculatePerformance = (rentals: RentalHistory[]) => {
  if (rentals.length === 0) return 0;
  return rentals.reduce((sum, r) => sum + (r.performanceMetrics?.successRate || 0), 0) / rentals.length;
};

const calculateTotal = (data: ActivityData[], key: keyof ActivityData) => {
  return data.reduce((sum, item) => sum + (typeof item[key] === 'number' ? Number(item[key]) : 0), 0);
};

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.FC<{ className?: string }>;
  trend: number;
  isCurrency?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, isCurrency }) => (
  <div className="bg-dark-700 rounded-lg p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-400">{label}</span>
      <Icon className="w-4 h-4 text-glow-400" />
    </div>
    <div className="flex items-end justify-between">
      <span className="text-2xl font-bold text-white">{value}</span>
      <div className={`flex items-center text-sm ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        <TrendingUp className={`w-4 h-4 ${trend < 0 ? 'transform rotate-180' : ''}`} />
        <span>{Math.abs(trend)}%</span>
      </div>
    </div>
  </div>
); 