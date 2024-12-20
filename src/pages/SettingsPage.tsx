import React, { useState } from 'react';
import { AccountSettingsPanel } from '../components/profile/AccountSettings';
import { useWallet } from '../hooks/useWallet';
import { accountService } from '../services/account';
import { Settings, Shield, User, Bell } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export const SettingsPage: React.FC = () => {
  const { publicKey, connect } = useWallet();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Account');

  const handleConnectWallet = async () => {
    try {
      await connect();
      showToast('Wallet connected successfully!', 'success');
    } catch (error) {
      console.error('Wallet connection failed:', error);
      showToast('Failed to connect wallet', 'error');
    }
  };

  const handleSettingsUpdate = async (updates: any) => {
    if (!publicKey) {
      showToast('Please connect your wallet first!', 'error');
      return;
    }

    setLoading(true);
    try {
      await accountService.updateSettings(publicKey.toBase58(), updates);
      showToast('Settings updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating settings:', error);
      showToast('Failed to update settings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { key: 'Account', icon: User, label: 'Account' },
    { key: 'Notifications', icon: Bell, label: 'Notifications' },
    { key: 'Privacy', icon: Shield, label: 'Privacy & Security' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-glow-400" />
          <h1 className="text-3xl font-bold gradient-text">Settings</h1>
        </div>
        <p className="text-gray-400 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium min-w-max
              ${activeTab === tab.key
                ? 'bg-gradient-to-r from-glow-400 to-glow-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-dark-700'
              }
              transition-all duration-300
            `}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
        {activeTab === 'Account' && publicKey && (
          <AccountSettingsPanel
            settings={{
              notifications: { email: true, rental: true, marketing: false },
              privacy: { showActivity: true, showStats: true, showRentals: true },
              preferences: { theme: 'dark', currency: 'SOL', language: 'en' },
            }}
            onUpdate={handleSettingsUpdate}
          />
        )}
        {activeTab === 'Notifications' && (
          <div>Notifications settings coming soon...</div>
        )}
        {activeTab === 'Privacy' && (
          <div>Privacy settings coming soon...</div>
        )}
        {!publicKey && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">Please connect your wallet</p>
            <button
              onClick={handleConnectWallet}
              className="px-4 py-2 bg-gradient-to-r from-glow-400 to-glow-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
