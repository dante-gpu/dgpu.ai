import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Toast } from '../components/ui/Toast';
import { ToastData } from '../types/toast';

type View = 'marketplace' | 'dashboard' | 'chat' | 'ai-models';

interface MainLayoutProps {
  children: React.ReactNode;
  connected: boolean;
  connecting: boolean;
  walletAddress?: string;
  onConnect: () => void;
  onDisconnect: () => void;
  currentView: View;
  onChangeView: (view: View) => void;
  toasts: ToastData[];
  onRemoveToast: (id: number) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  connected,
  connecting,
  walletAddress,
  onConnect,
  onDisconnect,
  currentView,
  onChangeView,
  toasts,
  onRemoveToast,
}) => {
  return (
    <div className="min-h-screen bg-dark-900">
      <div className="pt-20">
        <Navbar
          connected={connected}
          connecting={connecting}
          walletAddress={walletAddress}
          onConnect={onConnect}
          onDisconnect={onDisconnect}
          currentView={currentView as any}
          onChangeView={onChangeView as any}
        />

        <main className="bg-gradient-radial from-dark-800 to-dark-900">
          {children}
        </main>

        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => onRemoveToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};