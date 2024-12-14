import React from 'react';
import { WalletIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { WalletMenu } from './WalletMenu';

interface WalletButtonProps {
  onConnect: () => void;
  onDisconnect: () => void;
  connected: boolean;
  connecting: boolean;
  walletAddress?: string;
}

export const WalletButton: React.FC<WalletButtonProps> = ({
  onConnect,
  onDisconnect,
  connected,
  connecting,
  walletAddress,
}) => {
  if (connected && walletAddress) {
    return <WalletMenu walletAddress={walletAddress} onDisconnect={onDisconnect} />;
  }

  return (
    <Button
      onClick={onConnect}
      variant="primary"
      size="sm"
      loading={connecting}
      icon={<WalletIcon size={16} />}
      className="bg-purple-600 hover:bg-purple-700"
    >
      {connecting ? 'Connecting...' : 'Connect Solflare'}
    </Button>
  );
};