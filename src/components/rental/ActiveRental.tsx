import React from 'react';
import { RentalHistory } from '../../types/rental';
import { useRentalTimer } from '../../hooks/useRentalTimer';
import { ClockIcon, CheckCircleIcon } from 'lucide-react';

interface ActiveRentalProps {
  rental: RentalHistory;
  onExpire: (rentalId: string) => void;
}

export const ActiveRental: React.FC<ActiveRentalProps> = ({ rental, onExpire }) => {
  const { formattedTime, isExpired } = useRentalTimer(rental);

  React.useEffect(() => {
    if (isExpired) {
      onExpire(rental.id);
    }
  }, [isExpired, rental.id, onExpire]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{rental.gpu.name}</h3>
        <div className="flex items-center gap-2">
          <ClockIcon size={18} className="text-purple-600" />
          <span className="font-mono text-lg">
            {formattedTime}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Duration</span>
          <span>{rental.hours} hours</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Price</span>
          <span>{rental.price.toFixed(3)} SOL</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Status</span>
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircleIcon size={16} />
            Active
          </span>
        </div>
      </div>

      <div className="mt-4 bg-purple-50 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-700">
            Performance Score: {rental.gpu.performance}
          </span>
          <div className="flex-1 h-2 bg-purple-200 rounded-full">
            <div
              className="h-full bg-purple-600 rounded-full"
              style={{ width: `${rental.gpu.performance}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};