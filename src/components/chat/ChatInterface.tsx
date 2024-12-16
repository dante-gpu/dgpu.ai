import React, { useState, useRef } from 'react';
import { ChatMessage } from '../../types/chat';
import { Send, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { RentalCard } from '../rental/RentalCard';
import { RentalHistory } from '../../types/rental';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  isTyping: boolean;
  onRetry?: (messageId: string) => void;
  onClearHistory?: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

// Mesaj içeriğini parse et
function parseMessageContent(content: string): { text: string; rental: RentalHistory | null } {
  try {
    // Kiralama verilerini içeren JSON'ı bul
    const match = content.match(/\{[\s\S]*"performanceMetrics"[\s\S]*\}/);
    if (match) {
      const rentalData = JSON.parse(match[0]);
      // Kiralama verilerini çıkardıktan sonra kalan metni temizle
      const text = content.replace(match[0], '').trim();
      return { text, rental: rentalData };
    }
  } catch (error) {
    console.error('Kiralama verisi parse edilemedi:', error);
  }
  return { text: content, rental: null };
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
  isTyping,
  onRetry,
  onClearHistory,
  messagesEndRef
}) => {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      {/* Mesaj Listesi */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => {
            const { text, rental } = parseMessageContent(message.content);
            
            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-glow-500/20 text-white ml-4'
                      : 'bg-dark-700/50 text-gray-200 mr-4'
                  }`}
                >
                  {/* Metin içeriği */}
                  <div className="whitespace-pre-wrap">{text}</div>

                  {/* Kiralama kartı */}
                  {rental && (
                    <div className="mt-4">
                      <RentalCard rental={rental} />
                    </div>
                  )}

                  {/* Hata durumu */}
                  {message.status === 'error' && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-red-400 text-sm">{message.error}</span>
                      {onRetry && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => onRetry(message.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Tekrar Dene
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Yazıyor göstergesi */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-glow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-glow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-glow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-sm">AI yazıyor...</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Giriş Alanı */}
      <div className="border-t border-dark-700 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Mesajınızı yazın..."
            className="flex-1 bg-dark-800/50 border border-dark-700 rounded-lg p-3 text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-glow-400/50"
            rows={1}
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-gradient-to-r from-glow-400 to-glow-600 hover:from-glow-500 hover:to-glow-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </form>

        {/* Temizle butonu */}
        {messages.length > 0 && onClearHistory && (
          <div className="mt-2 flex justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={onClearHistory}
              className="text-gray-400 hover:text-gray-300"
            >
              Sohbeti Temizle
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};