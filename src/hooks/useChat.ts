import { useState, useCallback, useEffect } from 'react';
import { ChatMessage, ChatSession, MessageStatus } from '../types/chat';
import { v4 as uuidv4 } from 'uuid';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  // Load sessions from localStorage
  useEffect(() => {
    try {
      const savedSessions = localStorage.getItem('chat-sessions');
      if (savedSessions) {
        const parsed = JSON.parse(savedSessions);
        setSessions(parsed.map((s: any) => ({
          ...s,
          timestamp: new Date(s.timestamp)
        })));
      }
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  }, []);

  // Save sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chat-sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions:', error);
    }
  }, [sessions]);

  const createNewSession = useCallback(() => {
    const newSession: ChatSession = {
      id: uuidv4(),
      title: 'New Chat',
      timestamp: new Date(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSession(newSession);
    setMessages([{
      id: uuidv4(),
      role: 'assistant',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
      status: 'sent'
    }]);
  }, []);

  const selectSession = useCallback((sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSession(session);
      // TODO: Load messages for this session
      setMessages([]);
    }
  }, [sessions]);

  const handleUserMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
      status: 'sending' as MessageStatus
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: `I understand your message: "${content}"\n\nHow can I assist you further?`,
        timestamp: new Date(),
        status: 'sent' as MessageStatus
      };

      setMessages(prev => [
        ...prev.map(m => m.id === userMessage.id ? { ...m, status: 'sent' as MessageStatus } : m),
        assistantMessage
      ]);

      if (currentSession) {
        const updatedSession = {
          ...currentSession,
          lastMessage: content,
          timestamp: new Date(),
        };
        setSessions(prev => 
          prev.map(s => s.id === currentSession.id ? updatedSession : s)
        );
        setCurrentSession(updatedSession);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => 
        prev.map(m => m.id === userMessage.id ? { 
          ...m, 
          status: 'error' as MessageStatus, 
          error: 'Failed to send message' 
        } : m)
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentSession]);

  return {
    messages,
    isLoading,
    handleUserMessage,
    sessions,
    currentSession,
    createNewSession,
    selectSession,
  };
};