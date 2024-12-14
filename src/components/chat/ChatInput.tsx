import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex gap-2 bg-dark-800 rounded-lg p-2 border border-dark-700">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        disabled={disabled}
        className="flex-1 bg-transparent border-none resize-none outline-none text-white placeholder-gray-500 min-h-[40px] max-h-[120px] py-2 px-3"
        rows={1}
      />
      <button
        onClick={handleSend}
        disabled={!message.trim() || disabled}
        className={`
          p-2 rounded-lg transition-all duration-200
          ${message.trim() && !disabled
            ? 'bg-gradient-to-r from-glow-400 to-glow-600 text-white hover:shadow-lg hover:shadow-glow-500/20'
            : 'bg-dark-700 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        <Send size={20} />
      </button>
    </div>
  );
}; 