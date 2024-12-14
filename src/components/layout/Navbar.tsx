import React from 'react';
import { WalletButton } from '../wallet/WalletButton';
import { NavButton } from '../ui/NavButton';
import { Store, Brain, LayoutDashboard, MessageSquare, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  connected: boolean;
  connecting: boolean;
  walletAddress?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  currentView: 'marketplace' | 'dashboard' | 'chat';
  onChangeView: (view: 'marketplace' | 'dashboard' | 'chat') => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path?: string;
}

const navItems: NavItem[] = [
  { id: 'marketplace', label: 'Marketplace', icon: Store, path: '/' },
  { id: 'ai-models', label: 'AI Models', icon: Brain, path: '/ai-models' },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'chat', label: 'Chat', icon: MessageSquare, path: '/chat' }
];

export const Navbar: React.FC<NavbarProps> = ({
  connected,
  connecting,
  walletAddress,
  onConnect,
  onDisconnect,
  currentView
}) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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
                  onClick={() => handleNavigation(item.path || `/${item.id}`)}
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
};