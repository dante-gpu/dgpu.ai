import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, BotIcon, UserIcon } from 'lucide-react';
import { ChatMessage } from '../../types/chat';

interface ChatInterfaceProps {
  onSendMessage: (message: string) => void;
  messages: ChatMessage[];
  isLoading?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onSendMessage,
  messages,
  isLoading = false,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center gap-2">
        <BotIcon className="text-purple-600" size={24} />
        <h2 className="text-lg font-semibold">GPU Rental Assistant</h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 ${
              message.type === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' ? 'bg-purple-100' : 'bg-gray-100'
              }`}
            >
              {message.type === 'user' ? (
                <UserIcon size={16} className="text-purple-600" />
              ) : (
                <BotIcon size={16} className="text-gray-600" />
              )}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <BotIcon size={16} className="text-gray-600" />
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about GPU rentals..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-2 rounded-lg ${
              !input.trim() || isLoading
                ? 'bg-gray-100 text-gray-400'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            } transition-colors`}
          >
            <SendIcon size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};