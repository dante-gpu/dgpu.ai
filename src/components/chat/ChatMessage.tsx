import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-full 
        flex items-center justify-center
        ${isUser ? 'bg-glow-500/20' : 'bg-dark-700'}
      `}>
        {isUser ? <User size={16} className="text-glow-400" /> : <Bot size={16} className="text-glow-400" />}
      </div>
      
      <div className={`
        max-w-[80%] rounded-2xl px-4 py-2
        ${isUser 
          ? 'bg-gradient-to-r from-glow-400/10 to-glow-600/10 text-white ml-auto' 
          : 'bg-dark-700 text-gray-200'
        }
      `}>
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span className="text-xs text-gray-500 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}; 