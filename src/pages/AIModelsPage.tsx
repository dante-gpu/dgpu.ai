import React from 'react';
import { AIModelCard } from '../components/ai/AIModelCard';
import { aiModels } from '../data/aiModels';
import { useWallet } from '../hooks/useWallet';
import { useToast } from '../hooks/useToast';
import { AIModel } from '../types/ai';

export const AIModelsPage: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const { showToast } = useToast();

  const handleRent = async (model: AIModel, hours: number) => {
    if (!publicKey) {
      showToast('Please connect your wallet first!', 'error');
      return;
    }

    try {
      // Implement rental logic here
      showToast(`Successfully rented ${model.name} for ${hours} hours!`, 'success');
    } catch (error) {
      showToast('Failed to rent the model. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
          AI Models
        </h2>
        <p className="text-gray-400 mt-2">
          Rent high-performance AI models for training and inference
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiModels.map((model) => (
          <AIModelCard
            key={model.id}
            model={model}
            onRent={handleRent}
            disabled={!connected}
          />
        ))}
      </div>
    </div>
  );
};