import React from 'react';
import { RentalHistory } from '../types/rental';
import { RentalCard } from '../components/rental/RentalCard';
import { RentalStats } from '../components/rental/RentalStats';
import { ActiveRental } from '../components/rental/ActiveRental';

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
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text">
          Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your GPU rentals and view statistics
        </p>
      </div>

      <RentalStats totalSpent={totalSpent} activeCount={activeRentals.length} />
      
      {activeRentals.length > 0 && (
        <div className="bg-dark-800 rounded-xl shadow-lg p-6 border border-dark-700">
          <h3 className="text-xl font-bold gradient-text mb-4">
            Active Rentals
          </h3>
          <div className="space-y-4">
            {activeRentals.map(rental => (
              <ActiveRental
                key={rental.id}
                rental={rental}
                onExpire={onExpire}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className="bg-dark-800 rounded-xl shadow-lg p-6 border border-dark-700">
        <h3 className="text-xl font-bold gradient-text mb-4">
          Rental History
        </h3>
        <div className="space-y-4">
          {completedRentals.map((rental) => (
            <RentalCard key={rental.id} rental={rental} />
          ))}
          {completedRentals.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-2">No rental history yet</p>
              <p className="text-sm text-gray-500">
                Start by renting a GPU from the marketplace!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 