import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { MarketplacePage } from './pages/MarketplacePage';
import { Dashboard } from './pages/Dashboard';
import { ChatPage } from './pages/ChatPage';
import { AIModelsPage } from './pages/AIModelsPage';
import { useWallet } from './hooks/useWallet';
import { useRentals } from './hooks/useRentals';
import { useToast } from './hooks/useToast';
import { useWalletBalance } from './hooks/useWalletBalance';
import { GPU } from './types/gpu';
import { ProfilePage } from './pages/ProfilePage';
import { accountService } from './services/account';
import { ParticleBackground } from './components/ui/ParticleBackground';
import { SettingsPage } from './pages/SettingsPage';

type View = 'marketplace' | 'dashboard' | 'chat' | 'ai-models' | 'settings';

function App() {
  const { connected, publicKey, connectWallet, disconnectWallet, connecting } = useWallet();
  const { balance } = useWalletBalance(publicKey);
  const { rentals, handleRent, getTotalSpent, handleExpire } = useRentals();
  const { toasts, showToast, removeToast } = useToast();
  const [currentView, setCurrentView] = useState<View>('marketplace');

  useEffect(() => {
    if (connected && publicKey) {
      accountService.initializeAccount(publicKey.toBase58());
    }
  }, [connected, publicKey]);

  const onRent = async (gpu: GPU, hours: number) => {
    if (!publicKey) {
      showToast('Please connect your wallet first!', 'error');
      return;
    }

    try {
      const result = await handleRent(gpu, hours, publicKey);
      if (result.success) {
        showToast(`Successfully rented ${gpu.name} for ${hours} hours!`, 'success');
      } else {
        showToast('Transaction failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Rental transaction error:', error);
      showToast('Transaction failed. Please try again.', 'error');
    }
  };

  return (
    <>
      <MainLayout
        connected={connected}
        connecting={connecting}
        walletAddress={publicKey?.toBase58()}
        onConnect={connectWallet}
        onDisconnect={disconnectWallet}
        currentView={currentView}
        onChangeView={(view: View) => setCurrentView(view)}
        toasts={toasts}
        onRemoveToast={removeToast}
      >
        <Routes>
          <Route path="/" element={
            <MarketplacePage
              onRent={onRent}
              connected={connected}
              balance={balance}
              walletAddress={publicKey?.toBase58()}
            />
          } />
          <Route path="/dashboard" element={
            <Dashboard 
              rentals={rentals} 
              totalSpent={getTotalSpent()}
              onExpire={handleExpire}
            />
          } />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/ai-models" element={<AIModelsPage />} />
          <Route path="/profile/:address" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
      <ParticleBackground />
    </>
  );
}

export default App;