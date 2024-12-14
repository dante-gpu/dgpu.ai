import React from 'react';
import { AccountSettings } from '../../services/account';
import { Switch } from '../ui/Switch';
import { Bell, Eye, Globe, Moon, DollarSign } from 'lucide-react';

interface SettingsProps {
  settings: AccountSettings;
  onUpdate: (settings: Partial<AccountSettings>) => void;
}

export const AccountSettingsPanel: React.FC<SettingsProps> = ({ settings, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
        <h3 className="text-lg font-medium text-white mb-4">Notifications</h3>
        <div className="space-y-4">
          <Switch
            label="Email Notifications"
            description="Receive important updates via email"
            checked={settings.notifications.email}
            onChange={(checked) => onUpdate({
              notifications: { ...settings.notifications, email: checked }
            })}
            icon={Bell}
          />
          {/* Diğer notification ayarları */}
        </div>
      </div>

      <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
        <h3 className="text-lg font-medium text-white mb-4">Privacy</h3>
        <div className="space-y-4">
          <Switch
            label="Show Activity"
            description="Make your activity visible to others"
            checked={settings.privacy.showActivity}
            onChange={(checked) => onUpdate({
              privacy: { ...settings.privacy, showActivity: checked }
            })}
            icon={Eye}
          />
          {/* Diğer privacy ayarları */}
        </div>
      </div>

      <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
        <h3 className="text-lg font-medium text-white mb-4">Preferences</h3>
        {/* Theme, currency, language seçenekleri */}
      </div>
    </div>
  );
}; 