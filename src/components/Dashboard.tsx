import React from 'react';
import { RentalHistory } from '../types/rental';
import { RentalCard } from './rental/RentalCard';
import { RentalStats } from './rental/RentalStats';
import { ActiveRental } from './rental/ActiveRental';

interface DashboardProps {
  rentals: RentalHistory[];
  totalSpent: number;
  onExpire: (rentalId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  rentals,
  totalSpent,
  onExpire
}) => {
  const activeRentals = rentals.filter(rental => rental.status === 'active');
  const completedRentals = rentals.filter(rental => rental.status !== 'active');

  return (
    <div className="max-w-4xl mx-auto p-6">
      <RentalStats totalSpent={totalSpent} activeCount={activeRentals.length} />
      
      {activeRentals.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Active Rentals</h3>
          {activeRentals.map(rental => (
            <ActiveRental
              key={rental.id}
              rental={rental}
              onExpire={onExpire}
            />
          ))}
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Rental History</h3>
        <div className="space-y-4">
          {completedRentals.map((rental) => (
            <RentalCard key={rental.id} rental={rental} />
          ))}
          {completedRentals.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No rental history yet. Start by renting a GPU!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};