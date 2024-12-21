import React from "react";
import { ChatInterface } from "../components/chat/ChatInterface";
import { useChat } from "../hooks/useChat";
import { useWallet } from "../hooks/useWallet";
import { Button } from "../components/ui/Button";
import { Bot, Shield, Trash2 } from "lucide-react";

export const ChatPage: React.FC = () => {
  const { connected, onConnect } = useWallet();
  const {
    messages,
    isLoading,
    isTyping,
    handleUserMessage,
    clearHistory,
    retryMessage,
    messagesEndRef,
  } = useChat();

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700 p-12 text-center">
          <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-glow-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Please connect your wallet to access the AI Chat feature. Experience
            personalised chats supported by advanced language models.
          </p>
          <Button
            onClick={onConnect}
            className="bg-gradient-to-r from-glow-400 to-glow-600 hover:from-glow-500 hover:to-glow-700"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-glow-400 to-glow-600 rounded-xl flex items-center justify-center shadow-lg shadow-glow-400/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">Clean Chat </h1>
              <p className="text-gray-400">
                Powered by advanced language models{" "}
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              onClick={clearHistory}
              className="text-gray-400 hover:text-gray-300"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clean Chat
            </Button>
          )}
        </div>
        <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg border border-dark-700 p-4">
          <p className="text-gray-300 text-sm">
            Welcome to our AI Chat Assistant! You can ask your questions,
            discuss your ideas or get help on various topics. Our AI is designed
            to provide a natural flow of conversation while providing
            informative and helpful answers.
          </p>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl border border-dark-700 shadow-xl">
        <ChatInterface
          messages={messages}
          onSendMessage={handleUserMessage}
          isLoading={isLoading}
          isTyping={isTyping}
          onRetry={retryMessage}
          onClearHistory={clearHistory}
          messagesEndRef={messagesEndRef}
        />
      </div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Natural Conversations",
            description:
              "Have fluent and context-sensitive discussions with AI",
          },
          {
            title: "Instant Answers",
            description: "Get fast and accurate answers to your questions",
          },
          {
            title: "Safe & Private",
            description: "Your chats are protected and kept private",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-dark-800/30 backdrop-blur-sm rounded-lg border border-dark-700 p-4"
          >
            <h3 className="text-glow-400 font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
