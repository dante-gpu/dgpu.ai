import React, { useState } from 'react';
import { GPU } from '../types/gpu';
import { Button } from './ui/Button';
import { calculatePrice } from '../utils/solana';
import { RentalConfirmModal } from './rental/RentalConfirmModal';
import { DurationPicker } from './rental/DurationPicker';
import { formatSOL } from '../utils/format';

interface GPUCardProps {
  gpu: GPU;
  onRent: (gpu: GPU, hours: number) => Promise<void>;
  disabled?: boolean;
  userBalance?: number | null;
}

export const GPUCard: React.FC<GPUCardProps> = ({
  gpu,
  onRent,
  disabled,
  userBalance
}) => {
  const [hours, setHours] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const totalPrice = calculatePrice(gpu.pricePerHour, hours);

  const handleRent = async () => {
    if (!userBalance || totalPrice > userBalance) {
      alert('Insufficient balance!');
      return;
    }

    if (!window.solflare?.isConnected) {
      try {
        await window.solflare?.connect();
      } catch (error) {
        console.error('Failed to connect Solflare:', error);
        alert('Please connect your Solflare wallet first!');
        return;
      }
    }
    
    setShowConfirmModal(true);
  };

  const confirmRental = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    try {
      await onRent(gpu, hours);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-dark-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-glow-500/20 hover:scale-[1.02] border border-dark-700">
        <div className="relative">
          <img
            src={gpu.imageUrl}
            alt={gpu.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-gradient-to-r from-glow-400 to-glow-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {gpu.performance} Performance Score
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{gpu.name}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>VRAM</span>
                <span className="font-medium text-glow-400">{gpu.vram}GB</span>
              </div>
              <div className="flex justify-between text-glow-400">
                <span>Price per hour</span>
                <span className="font-semibold text-glow-300">{formatSOL(gpu.pricePerHour)} SOL</span>
              </div>
            </div>
          </div>
          
          <DurationPicker
            hours={hours}
            onChange={setHours}
          />
          
          <div className="flex items-center justify-between pt-4 border-t border-dark-700">
            <div>
              <span className="text-sm text-gray-400">Total Price</span>
              <p className="text-lg font-bold gradient-text">
                {formatSOL(totalPrice)} SOL
              </p>
            </div>
            <Button
              onClick={handleRent}
              disabled={disabled}
              loading={isLoading}
              variant="primary"
            >
              Rent Now
            </Button>
          </div>
        </div>
      </div>

      <RentalConfirmModal
        gpu={gpu}
        hours={hours}
        totalPrice={totalPrice}
        onConfirm={confirmRental}
        onCancel={() => setShowConfirmModal(false)}
        isOpen={showConfirmModal}
      />
    </>
  );
};