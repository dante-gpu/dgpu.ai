import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavButtonProps {
  onClick: () => void;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

export const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  label,
  icon: Icon,
  active = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium
        transition-all duration-300 ease-out
        ${active 
          ? 'bg-gradient-to-r from-glow-400/90 to-glow-600/90 text-white shadow-lg shadow-glow-500/20 scale-105' 
          : 'text-gray-400 hover:text-glow-400'
        }
        hover:scale-105
        group
        overflow-hidden
      `}
    >
      {/* Neon glow effect */}
      <div className={`
        absolute inset-0 opacity-50 blur-xl transition-all duration-300
        ${active 
          ? 'bg-glow-500/20' 
          : 'bg-transparent group-hover:bg-glow-500/10'
        }
      `} />

      {/* Content */}
      <div className="relative flex items-center gap-2">
        <Icon 
          size={20} 
          className={`
            transition-transform duration-300 
            ${active ? 'scale-110' : 'group-hover:scale-110'}
          `}
        />
        <span className={`
          transition-all duration-300
          ${active 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
          }
        `}>
          {label}
        </span>
      </div>

      {/* Bottom border gradient */}
      <div className={`
        absolute bottom-0 left-0 h-[2px] w-full
        bg-gradient-to-r from-glow-400 to-glow-600
        transition-all duration-300
        ${active 
          ? 'opacity-100' 
          : 'opacity-0 group-hover:opacity-70'
        }
      `} />
    </button>
  );
};