import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage as ChatMessageType, ChatSession } from '../../types/chat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatSidebar } from './ChatSidebar';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Menu, X, Plus } from 'lucide-react';

interface ChatInterfaceProps {
  messages: ChatMessageType[];
  onSendMessage: (message: string) => Promise<void>;
  isLoading?: boolean;
  sessions: ChatSession[];
  currentSession?: ChatSession;
  onNewSession: () => void;
  onSelectSession: (sessionId: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading = false,
  sessions,
  currentSession,
  onNewSession,
  onSelectSession,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex h-[calc(100vh-200px)]">
      {/* Sidebar */}
      <div className={`
        ${showSidebar ? 'w-64' : 'w-0'} 
        transition-all duration-300 
        border-r border-dark-700
        overflow-hidden
      `}>
        <ChatSidebar
          sessions={sessions}
          currentSession={currentSession}
          onSelectSession={onSelectSession}
          onNewSession={onNewSession}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-dark-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
            >
              {showSidebar ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 className="font-semibold text-glow-400">
              {currentSession?.title || 'New Chat'}
            </h2>
          </div>
          <button
            onClick={onNewSession}
            className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-glow-400"
            title="New Chat"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-center py-4">
              <LoadingSpinner className="text-glow-400" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-dark-700">
          <ChatInput 
            onSendMessage={onSendMessage} 
            disabled={isLoading}
            showSuggestions
          />
        </div>
      </div>
    </div>
  );
};