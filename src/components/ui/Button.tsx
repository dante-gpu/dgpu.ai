import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const variantStyles = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 focus:ring-purple-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-lg shadow-gray-500/20 hover:shadow-gray-500/30 focus:ring-gray-500',
    outline: 'border border-gray-700 text-gray-300 hover:bg-gray-800 focus:ring-gray-700',
    ghost: 'text-gray-400 hover:text-gray-300 hover:bg-gray-800 focus:ring-gray-700'
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';
  const fullWidthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${(disabled || loading) ? disabledStyles : ''}
        ${fullWidthStyles}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <LoadingSpinner />
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {icon && <span className="flex-shrink-0">{icon}</span>}
          {children}
        </div>
      )}
    </button>
  );
};