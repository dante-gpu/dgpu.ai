import React, { ReactNode } from 'react';
import { Button } from './Button';

interface NavButtonProps {
  onClick: () => void;
  label: string;
  icon?: ReactNode;
  active?: boolean;
}

export const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  label,
  icon,
  active = false,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={active ? 'primary' : 'ghost'}
      size="sm"
      icon={icon}
      className={`
        ${active 
          ? 'bg-purple-600 hover:bg-purple-700 text-white' 
          : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
        }
      `}
    >
      {label}
    </Button>
  );
};