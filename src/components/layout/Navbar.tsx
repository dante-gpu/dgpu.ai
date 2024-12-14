import React from 'react';
import { WalletButton } from '../wallet/WalletButton';
import { NavButton } from '../ui/NavButton';
import { LayoutGridIcon, LayoutDashboardIcon, MessageCircleIcon } from 'lucide-react';

interface NavbarProps {
  connected: boolean;
  connecting: boolean;
  walletAddress?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  currentView: 'marketplace' | 'dashboard' | 'chat';
  onChangeView: (view: 'marketplace' | 'dashboard' | 'chat') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  connected,
  connecting,
  walletAddress,
  onConnect,
  onDisconnect,
  currentView,
  onChangeView,
}) => {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Dgpu.fun
            </h1>
            <div className="flex items-center gap-2">
              <NavButton
                onClick={() => onChangeView('marketplace')}
                label="Marketplace"
                icon={<LayoutGridIcon size={20} />}
                active={currentView === 'marketplace'}
              />
              {connected && (
                <NavButton
                  onClick={() => onChangeView('dashboard')}
                  label="Dashboard"
                  icon={<LayoutDashboardIcon size={20} />}
                  active={currentView === 'dashboard'}
                />
              )}
              <NavButton
                onClick={() => onChangeView('chat')}
                label="Chat"
                icon={<MessageCircleIcon size={20} />}
                active={currentView === 'chat'}
              />
            </div>
          </div>
          
          <WalletButton
            onConnect={onConnect}
            onDisconnect={onDisconnect}
            connected={connected}
            connecting={connecting}
            walletAddress={walletAddress}
          />
        </div>
      </div>
    </nav>
  );
}