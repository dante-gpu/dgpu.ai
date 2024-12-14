import React from 'react';

interface RentalStatsProps {
  totalSpent: number;
}

export const RentalStats: React.FC<RentalStatsProps> = ({ totalSpent }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Your Dashboard</h2>
      <div className="bg-purple-50 p-4 rounded-lg">
        <p className="text-lg">
          Total Spent: <span className="font-bold">{totalSpent.toFixed(3)} SOL</span>
        </p>
      </div>
    </div>
  );
};