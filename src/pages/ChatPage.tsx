import React from 'react';
import { ChatInterface } from '../components/chat/ChatInterface';
import { useChat } from '../hooks/useChat';

export const ChatPage: React.FC = () => {
  const { messages, isLoading, handleUserMessage } = useChat();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text">
          AI Chat
        </h1>
        <p className="text-gray-400 mt-2">
          Chat with our AI assistant powered by advanced language models
        </p>
      </div>

      <div className="bg-dark-800 rounded-xl border border-dark-700">
        <ChatInterface
          messages={messages}
          onSendMessage={handleUserMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};