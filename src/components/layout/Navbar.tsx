import React from 'react';
import { WalletButton } from '../wallet/WalletButton';
import { NavButton } from '../ui/NavButton';
import { Store, Brain, LayoutDashboard, MessageSquare } from 'lucide-react';

interface NavbarProps {
  connected: boolean;
  connecting: boolean;
  walletAddress?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  currentView: 'marketplace' | 'dashboard' | 'chat';
  onChangeView: (view: 'marketplace' | 'dashboard' | 'chat') => void;
}

const navItems = [
  { id: 'marketplace', label: 'Marketplace', icon: Store },
  { id: 'ai-models', label: 'AI Models', icon: Brain },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'chat', label: 'Chat', icon: MessageSquare }
] as const;

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
    <nav className="bg-dark-900 border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-glow-400 to-glow-600">
              Dgpu.fun
            </h1>
            <div className="flex items-center gap-2">
              {navItems.map(item => (
                <NavButton
                  key={item.id}
                  onClick={() => onChangeView(item.id as 'marketplace' | 'dashboard' | 'chat')}
                  label={item.label}
                  icon={item.icon}
                  active={currentView === item.id}
                />
              ))}
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