import React from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface WalletButtonProps {
  onConnect: () => void;
  onDisconnect: () => void;
  connected: boolean;
  connecting: boolean;
  walletAddress?: string;
}

const formatAddress = (address?: string) => {
  if (!address) return '';
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const WalletButton: React.FC<WalletButtonProps> = ({
  onConnect,
  onDisconnect,
  connected,
  connecting,
  walletAddress,
}) => {
  return (
    <button
      onClick={connected ? onDisconnect : onConnect}
      disabled={connecting}
      className={`
        relative px-4 py-2 rounded-lg font-medium
        transition-all duration-300
        ${connected 
          ? 'bg-dark-800 text-glow-400 hover:bg-dark-700 border border-glow-500/20' 
          : 'bg-gradient-to-r from-glow-400 to-glow-600 text-white hover:shadow-lg hover:shadow-glow-500/20'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {connecting ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner className="text-glow-400" />
          <span>Connecting...</span>
        </div>
      ) : connected ? (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-glow-400" />
          <span>{formatAddress(walletAddress)}</span>
        </div>
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
};