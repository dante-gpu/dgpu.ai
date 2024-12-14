import React from 'react';
import { RentalHistory } from '../../types/rental';
import { formatSOL } from '../../utils/format';
import { Clock, Cpu, Timer } from 'lucide-react';
import { Button } from '../ui/Button';

interface ActiveRentalProps {
  rental: RentalHistory;
  onExpire: (rentalId: string) => void;
}

export const ActiveRental: React.FC<ActiveRentalProps> = ({ rental, onExpire }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-all">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between md:justify-start gap-4">
            <h4 className="text-lg font-bold text-white">{rental.gpu.name}</h4>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full">
              Active
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <Timer className="w-4 h-4" />
              <span className="text-sm">{rental.timer?.remainingTime || '00:00'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Duration: {rental.hours}h</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Cpu className="w-4 h-4" />
              <span className="text-sm">Score: {rental.gpu.performance}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2">
          <div className="text-right">
            <p className="text-sm text-gray-400">Price</p>
            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">
              {formatSOL(rental.price)} SOL
            </p>
          </div>
          
          <Button
            onClick={() => onExpire(rental.id)}
            variant="secondary"
            className="w-full md:w-auto"
          >
            End Rental
          </Button>
        </div>
      </div>
    </div>
  );
};