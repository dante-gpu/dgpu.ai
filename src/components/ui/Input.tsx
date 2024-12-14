import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        className={`
          w-full px-3 py-2 
          bg-dark-700 border border-dark-600 
          rounded-lg text-white 
          placeholder-gray-500
          focus:outline-none focus:border-glow-400/50
          transition-colors
          ${className}
        `}
        {...props}
      />
    </div>
  );
}; 