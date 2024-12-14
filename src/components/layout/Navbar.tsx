import React from 'react';
import { WalletButton } from '../wallet/WalletButton';
import { NavButton } from '../ui/NavButton';
import { Store, Brain, LayoutDashboard, MessageSquare, User, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlobalSearch } from '../search/GlobalSearch';
import { AccountSearchBar } from '../search/AccountSearchBar';

const ADMIN_WALLET = "B99ZeAHD4ZxGfSwbQRqbpQPpAigzwDCyx4ShHTcYCAtS";

interface NavbarProps {
  connected: boolean;
  connecting: boolean;
  walletAddress?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  currentView: string;
  onChangeView: (view: string) => void;
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
  const navigate = useNavigate();
  const isAdmin = walletAddress === ADMIN_WALLET;

  const navItems = [
    { id: 'marketplace', label: 'Marketplace', icon: Store, path: '/' },
    { id: 'ai-models', label: 'AI Models', icon: Brain, path: '/ai-models' },
    ...(isAdmin && connected ? [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' }
    ] : []),
    { id: 'chat', label: 'Chat', icon: MessageSquare, path: '/chat' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            onClick={() => navigate('/')}
            className="text-2xl font-bold gradient-text cursor-pointer hover:opacity-80 transition-opacity mr-8"
          >
            Dgpu.fun
          </div>
          
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center space-x-4">
              {navItems.map(item => (
                <NavButton
                  key={item.id}
                  onClick={() => {
                    handleNavigation(item.path);
                    onChangeView(item.id);
                  }}
                  label={item.label}
                  icon={item.icon}
                  active={currentView === item.id}
                />
              ))}
            </div>

            <div className="ml-8">
              <AccountSearchBar />
            </div>
          </div>
          
          <div className="ml-4">
            <WalletButton
              onConnect={onConnect}
              onDisconnect={onDisconnect}
              connected={connected}
              connecting={connecting}
              walletAddress={walletAddress}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};