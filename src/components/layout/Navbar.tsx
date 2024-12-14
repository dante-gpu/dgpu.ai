import React from 'react';
import { WalletButton } from '../wallet/WalletButton';
import { NavButton } from '../ui/NavButton';
import { Store, Brain, LayoutDashboard, MessageSquare, User, Home, Settings } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
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
    { id: 'chat', label: 'Chat', icon: MessageSquare, path: '/chat' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const SettingsButton = () => (
    <Link 
      to="/settings"
      onClick={() => onChangeView('settings')}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium
        transition-all duration-300 ease-out group
        ${currentView === 'settings' 
          ? 'bg-gradient-to-r from-glow-400/90 to-glow-600/90 text-white shadow-lg shadow-glow-500/20 scale-105' 
          : 'text-gray-400 hover:text-glow-400'
        }
        hover:scale-105
        overflow-hidden
      `}
    >
      <div className={`
        absolute inset-0 opacity-50 blur-xl transition-all duration-300
        ${currentView === 'settings' 
          ? 'bg-glow-500/20' 
          : 'bg-transparent group-hover:bg-glow-500/10'
        }
      `} />

      <div className="relative flex items-center gap-2">
        <Settings 
          size={20} 
          className={`
            transition-all duration-300
            ${currentView === 'settings' ? 'rotate-180' : 'group-hover:rotate-180'}
          `}
        />
        <span className={`
          transition-all duration-300
          ${currentView === 'settings'
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
          }
        `}>
          Settings
        </span>
      </div>

      <div className={`
        absolute bottom-0 left-0 h-[2px] w-full
        bg-gradient-to-r from-glow-400 to-glow-600
        transition-all duration-300
        ${currentView === 'settings' 
          ? 'opacity-100' 
          : 'opacity-0 group-hover:opacity-70'
        }
      `} />
    </Link>
  );

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
              <SettingsButton />
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