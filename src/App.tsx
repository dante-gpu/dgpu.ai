import React, { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { MarketplacePage } from './pages/MarketplacePage';
import { Dashboard } from './components/Dashboard';
import { ChatPage } from './pages/ChatPage';
import { AIModelsPage } from './pages/AIModelsPage';
import { useWallet } from './hooks/useWallet';
import { useRentals } from './hooks/useRentals';
import { useToast } from './hooks/useToast';
import { useWalletBalance } from './hooks/useWalletBalance';
import { GPU } from './types/gpu';

type View = 'marketplace' | 'dashboard' | 'chat' | 'ai-models';

function App() {
  const { connected, publicKey, connectWallet, disconnectWallet, connecting } = useWallet();
  const { balance } = useWalletBalance(publicKey);
  const { rentals, handleRent, getTotalSpent, handleExpire } = useRentals();
  const { toasts, showToast, removeToast } = useToast();
  const [currentView, setCurrentView] = useState<View>('marketplace');

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

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            rentals={rentals} 
            totalSpent={getTotalSpent()}
            onExpire={handleExpire}
          />
        );
      case 'chat':
        return <ChatPage />;
      case 'ai-models':
        return <AIModelsPage />;
      default:
        return (
          <MarketplacePage
            onRent={onRent}
            connected={connected}
            balance={balance}
          />
        );
    }
  };

  return (
    <MainLayout
      connected={connected}
      connecting={connecting}
      walletAddress={publicKey?.toString()}
      onConnect={connectWallet}
      onDisconnect={disconnectWallet}
      currentView={currentView}
      onChangeView={(view: View) => setCurrentView(view)}
      toasts={toasts}
      onRemoveToast={removeToast}
    >
      {renderContent()}
    </MainLayout>
  );
}

export default App;