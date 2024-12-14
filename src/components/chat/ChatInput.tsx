import React, { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  showSuggestions?: boolean;
}

const SUGGESTIONS = [
  "What can you help me with?",
  "Tell me about your capabilities",
  "How do I get started?",
  "Can you give me an example?",
];

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled,
  showSuggestions = false,
}) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="space-y-4">
      {showSuggestions && message.length === 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessage(suggestion)}
              className="flex-shrink-0 px-3 py-1 text-sm bg-dark-700 hover:bg-dark-600 rounded-full text-gray-300 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-2 bg-dark-800 rounded-lg p-2 border border-dark-700">
        <button
          className="p-2 hover:bg-dark-700 rounded-lg transition-colors text-gray-400 hover:text-gray-300"
          title="Attach file"
        >
          <Paperclip size={20} />
        </button>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={disabled}
          className="flex-1 bg-transparent border-none resize-none outline-none text-white placeholder-gray-500 min-h-[40px] max-h-[120px] py-2 px-3"
          rows={1}
        />

        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`
            p-2 rounded-lg transition-colors
            ${isRecording 
              ? 'bg-glow-400/20 text-glow-400' 
              : 'hover:bg-dark-700 text-gray-400 hover:text-gray-300'
            }
          `}
          title="Voice input"
        >
          <Mic size={20} />
        </button>

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
    </div>
  );
}; 