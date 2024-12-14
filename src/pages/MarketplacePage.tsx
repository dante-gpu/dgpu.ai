import React from 'react';
import { GPUCard } from '../components/GPUCard';
import { gpus } from '../data/gpus';
import { GPU } from '../types/gpu';

interface MarketplacePageProps {
  onRent: (gpu: GPU, hours: number) => Promise<void>;
  connected: boolean;
  balance: number | null;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  onRent,
  connected,
  balance,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
          GPU Marketplace
        </h2>
        <p className="text-gray-400 mt-2">
          Rent high-performance GPUs for your computational needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gpus.map((gpu) => (
          <GPUCard
            key={gpu.id}
            gpu={gpu}
            onRent={onRent}
            disabled={!connected}
            userBalance={balance}
          />
        ))}
      </div>
    </div>
  );
};