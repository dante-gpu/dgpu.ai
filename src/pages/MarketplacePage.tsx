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
  balance
}) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text">
          GPU Marketplace
        </h1>
        <p className="text-gray-400 mt-2">
          Rent high-performance GPUs for your AI and machine learning workloads
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