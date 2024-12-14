import React, { useState } from 'react';
import { RentalHistory } from '../../types/rental';
import { formatDate } from '../../utils/format';
import { RentalConfirmModal } from './RentalConfirmModal';

interface RentalCardProps {
  rental: RentalHistory;
}

export const RentalCard: React.FC<RentalCardProps> = ({ rental }) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  const handleRentClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmRental = async () => {
    // Kiralama işlemleri
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <div className="border-b last:border-b-0 pb-4 last:pb-0">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-semibold">{rental.gpu.name}</h4>
            <p className="text-gray-600">
              {rental.hours} hours @ {rental.gpu.pricePerHour} SOL/hour
            </p>
            <p className="text-sm text-gray-500">
              {formatDate(rental.timestamp)}
            </p>
            <span className={`text-sm ${
              rental.status === 'active' ? 'text-yellow-600' :
              rental.status === 'expired' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
            </span>
          </div>
          <p className="font-bold">{rental.price.toFixed(3)} SOL</p>
        </div>
      </div>
      
      <RentalConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmRental}
        gpuDetails={{
          name: "NVIDIA RTX 4090",
          price: 0.5,
          duration: 24
        }}
      />
    </>
  );
};