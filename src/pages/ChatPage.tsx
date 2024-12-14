import React from 'react';
import { ChatInterface } from '../components/chat/ChatInterface';
import { useChat } from '../hooks/useChat';

export const ChatPage: React.FC = () => {
  const { messages, isLoading, handleUserMessage } = useChat();

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <ChatInterface
        messages={messages}
        onSendMessage={handleUserMessage}
        isLoading={isLoading}
      />
    </div>
  );
};