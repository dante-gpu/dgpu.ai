import React from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { generateAvatarUrl } from '../../utils/avatar';

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
        group
      `}
    >
      {connecting ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner className="text-glow-400" />
          <span>Connecting...</span>
        </div>
      ) : connected ? (
        <div className="flex items-center gap-3">
          <div className="relative w-6 h-6 rounded-full overflow-hidden border border-glow-400/30 group-hover:border-glow-400/50 transition-colors">
            <img 
              src={generateAvatarUrl(walletAddress || '')}
              alt="Wallet Avatar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-glow-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm">{formatAddress(walletAddress)}</span>
            <span className="text-xs text-gray-400">Connected</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-glow-400 animate-pulse" />
        </div>
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
};