import { useState } from 'react';
import { ChatMessage } from '../types/chat';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      content: 'Hello! I\'m your GPU rental assistant. How can I help you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message: string, type: 'user' | 'bot') => {
    setMessages(prev => [...prev, { type, content: message }]);
  };

  const handleUserMessage = async (message: string) => {
    addMessage(message, 'user');
    setIsLoading(true);
    
    // Burada backend entegrasyonu yapılacak
    // Şimdilik örnek bir yanıt döndürelim
    setTimeout(() => {
      addMessage('I understand you\'re interested in GPU rentals. How can I assist you with that?', 'bot');
      setIsLoading(false);
    }, 1000);
  };

  return {
    messages,
    isLoading,
    handleUserMessage
  };
};