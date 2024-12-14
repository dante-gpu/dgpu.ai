import React from 'react';
import { Clock, Plus, Minus } from 'lucide-react';

interface DurationPickerProps {
  hours: number;
  onChange: (hours: number) => void;
  maxHours?: number;
  minHours?: number;
}

export const DurationPicker: React.FC<DurationPickerProps> = ({
  hours,
  onChange,
  maxHours = 168, // 1 week
  minHours = 1,
}) => {
  const handleIncrement = () => {
    onChange(Math.min(maxHours, hours + 1));
  };

  const handleDecrement = () => {
    onChange(Math.max(minHours, hours - 1));
  };

  const handleQuickSelect = (value: number) => {
    onChange(Math.min(maxHours, Math.max(minHours, value)));
  };

  const quickSelectOptions = [
    { label: '1h', value: 1 },
    { label: '12h', value: 12 },
    { label: '24h', value: 24 },
    { label: '1w', value: 168 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-gray-300">
        <Clock size={20} />
        <span>Rental Duration</span>
      </div>

      <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
        <button
          onClick={handleDecrement}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          disabled={hours <= minHours}
        >
          <Minus size={20} className="text-gray-300" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-white">{hours}</span>
          <span className="text-sm text-gray-400">hours</span>
        </div>

        <button
          onClick={handleIncrement}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          disabled={hours >= maxHours}
        >
          <Plus size={20} className="text-gray-300" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {quickSelectOptions.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => handleQuickSelect(value)}
            className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              hours === value
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};