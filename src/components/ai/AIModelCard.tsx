import React, { useState } from 'react';
import { AIModel } from '../../types/ai';
import { Button } from '../ui/Button';
import { Brain, Cpu, Memory } from 'lucide-react';
import { formatSOL } from '../../utils/format';
import { DurationPicker } from '../rental/DurationPicker';
import { RentalConfirmModal } from '../rental/RentalConfirmModal';

interface AIModelCardProps {
  model: AIModel;
  onRent: (model: AIModel, hours: number) => Promise<void>;
  disabled?: boolean;
}

export const AIModelCard: React.FC<AIModelCardProps> = ({
  model,
  onRent,
  disabled
}) => {
  const [hours, setHours] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleRent = () => {
    setShowConfirmModal(true);
  };

  const confirmRental = async () => {
    setShowConfirmModal(false);
    setIsLoading(true);
    try {
      await onRent(model, hours);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-purple-600/20 hover:scale-[1.02] border border-gray-800">
        <div className="relative">
          <img
            src={model.imageUrl}
            alt={model.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
            {model.type === 'training' ? 'Training' : 'Inference'}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{model.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{model.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Brain size={16} />
                <span className="text-sm">{model.performance}% Perf</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Memory size={16} />
                <span className="text-sm">{model.vram}GB VRAM</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Cpu size={16} />
                <span className="text-sm">{formatSOL(model.pricePerHour)} SOL/h</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {model.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <DurationPicker
            hours={hours}
            onChange={setHours}
          />

          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <div>
              <span className="text-sm text-gray-400">Total Price</span>
              <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-300">
                {formatSOL(model.pricePerHour * hours)} SOL
              </p>
            </div>
            <Button
              onClick={handleRent}
              disabled={disabled}
              loading={isLoading}
              variant="primary"
            >
              Rent Model
            </Button>
          </div>
        </div>
      </div>

      <RentalConfirmModal
        gpu={model}
        hours={hours}
        totalPrice={model.pricePerHour * hours}
        onConfirm={confirmRental}
        onCancel={() => setShowConfirmModal(false)}
        isOpen={showConfirmModal}
      />
    </>
  );
};