import { useState, useCallback, useEffect } from 'react';
import { ChatMessage } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Başlangıç mesajını ekle
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleUserMessage = useCallback(async (content: string) => {
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Demo cevap için timeout
      await new Promise(resolve => setTimeout(resolve, 1000));

      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: `I understand your message: "${content}"\n\nHow can I assist you further?`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    handleUserMessage,
  };
};