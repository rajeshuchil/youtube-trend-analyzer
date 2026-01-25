import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Loader2, Sparkles, User } from "lucide-react";
import { Message } from "../../hooks/useAIChat";

interface AISearchBarProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  regionCode: string;
}

function AISearchBar({
  messages,
  isLoading,
  onSendMessage,
  regionCode,
}: AISearchBarProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      setShowResults(true);
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="relative w-full max-w-2xl">
      {/* Search Input */}
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative flex items-center gap-3 bg-white rounded-2xl border-2 transition-all duration-300 ${
            isFocused
              ? "border-orange-500 shadow-lg shadow-orange-500/20"
              : "border-gray-200 hover:border-orange-300"
          }`}
          style={
            isFocused
              ? {
                  background: "linear-gradient(to right, #fff, #fff9f5)",
                }
              : {}
          }
        >
          {/* AI Icon */}
          <div className="pl-4 flex items-center">
            <div className="relative">
              <Bot
                className={`w-5 h-5 ${isFocused ? "text-orange-500" : "text-gray-400"}`}
              />
              {isFocused && (
                <motion.div
                  className="absolute -inset-2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <Sparkles className="w-5 h-5 text-orange-400" />
                </motion.div>
              )}
            </div>
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask AI about YouTube trends..."
            className="flex-1 py-3 bg-transparent focus:outline-none text-sm text-gray-900 placeholder:text-gray-400"
            disabled={isLoading}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="mr-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span className="text-xs font-medium hidden md:inline">Ask AI</span>
          </button>
        </div>

        {/* Gradient Border Effect */}
        {isFocused && (
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-2xl -z-10 blur-sm opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
          />
        )}
      </form>

      {/* Results Dropdown */}
      <AnimatePresence>
        {showResults && messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 max-h-[500px] overflow-hidden z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-white" />
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    AI Trends Assistant
                  </h3>
                  <p className="text-orange-100 text-xs">
                    Region: {regionCode}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowResults(false)}
                className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="overflow-y-auto p-4 space-y-4 bg-gray-50 max-h-[400px]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-white border-2 border-orange-500 text-orange-500"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`flex-1 ${message.role === "user" ? "text-right" : ""}`}
                  >
                    <div
                      className={`inline-block max-w-[85%] px-4 py-2 rounded-2xl ${
                        message.role === "user"
                          ? "bg-orange-500 text-white rounded-br-none"
                          : "bg-white border border-gray-200 text-gray-900 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">
                        {message.content}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-white border-2 border-orange-500 text-orange-500 flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-3">
                    <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AISearchBar;
