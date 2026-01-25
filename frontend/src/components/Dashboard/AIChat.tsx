import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, X, MessageSquare } from "lucide-react";
import { TrendsResponse } from "../../services/api";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  trendsData: TrendsResponse | undefined;
  regionCode: string;
}

function AIChat({ trendsData, regionCode }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hello! 👋 I'm your YouTube Trends AI assistant. I can help you analyze trending videos in ${regionCode}. Ask me anything like:\n\n• "What's the most viewed video?"\n• "Show me gaming trends"\n• "Which category is most popular?"\n• "Compare top 5 videos by engagement"`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeData = (question: string): string => {
    if (!trendsData?.data) {
      return "I don't have any trending data loaded yet. Please wait for the data to load.";
    }

    const videos = trendsData.data;
    const lowerQuestion = question.toLowerCase();

    // Category mapping
    const categoryNames: Record<string, string> = {
      "1": "Film & Animation",
      "10": "Music",
      "17": "Sports",
      "20": "Gaming",
      "24": "Entertainment",
      "25": "News & Politics",
      "27": "Education",
      "28": "Science & Technology",
    };

    // Most viewed video
    if (
      lowerQuestion.includes("most viewed") ||
      lowerQuestion.includes("highest views") ||
      lowerQuestion.includes("top video")
    ) {
      const topVideo = videos.reduce(
        (max, v) => (v.metrics.views > max.metrics.views ? v : max),
        videos[0],
      );
      return `🏆 The most viewed trending video is:\n\n**"${topVideo.title}"**\n\n📊 Views: ${(topVideo.metrics.views / 1000000).toFixed(1)}M\n👍 Likes: ${(topVideo.metrics.likes / 1000).toFixed(1)}K\n💬 Comments: ${(topVideo.metrics.comments / 1000).toFixed(1)}K\n🎯 Category: ${categoryNames[topVideo.category] || "Other"}`;
    }

    // Most liked video
    if (
      lowerQuestion.includes("most liked") ||
      lowerQuestion.includes("highest likes")
    ) {
      const topVideo = videos.reduce(
        (max, v) => (v.metrics.likes > max.metrics.likes ? v : max),
        videos[0],
      );
      return `❤️ The most liked trending video is:\n\n**"${topVideo.title}"**\n\n👍 Likes: ${(topVideo.metrics.likes / 1000).toFixed(1)}K\n📊 Views: ${(topVideo.metrics.views / 1000000).toFixed(1)}M\n💬 Comments: ${(topVideo.metrics.comments / 1000).toFixed(1)}K`;
    }

    // Category analysis
    if (
      lowerQuestion.includes("category") ||
      lowerQuestion.includes("categories")
    ) {
      const categoryCounts: Record<string, number> = {};
      videos.forEach((v) => {
        const cat = categoryNames[v.category] || "Other";
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      });
      const sorted = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
      const top3 = sorted.slice(0, 3);
      return `📊 **Category Distribution:**\n\n${top3.map(([cat, count], i) => `${i + 1}. **${cat}**: ${count} videos (${((count / videos.length) * 100).toFixed(1)}%)`).join("\n")}\n\nThe most popular category is **${top3[0][0]}** with ${top3[0][1]} trending videos!`;
    }

    // Gaming trends
    if (lowerQuestion.includes("gaming") || lowerQuestion.includes("game")) {
      const gamingVideos = videos.filter((v) => v.category === "20");
      if (gamingVideos.length === 0) {
        return "No gaming videos are currently trending in this region.";
      }
      const totalViews = gamingVideos.reduce(
        (sum, v) => sum + v.metrics.views,
        0,
      );
      const avgViews = totalViews / gamingVideos.length;
      return `🎮 **Gaming Trends:**\n\n📹 Total: ${gamingVideos.length} gaming videos\n📊 Avg Views: ${(avgViews / 1000000).toFixed(1)}M\n🔥 Total Views: ${(totalViews / 1000000).toFixed(1)}M\n\nTop gaming video: "${gamingVideos[0].title}"`;
    }

    // Music trends
    if (lowerQuestion.includes("music") || lowerQuestion.includes("song")) {
      const musicVideos = videos.filter((v) => v.category === "10");
      if (musicVideos.length === 0) {
        return "No music videos are currently trending in this region.";
      }
      return `🎵 **Music Trends:**\n\n📹 Total: ${musicVideos.length} music videos\n🎸 Top music video: "${musicVideos[0].title}"\n📊 Views: ${(musicVideos[0].metrics.views / 1000000).toFixed(1)}M`;
    }

    // Total stats
    if (
      lowerQuestion.includes("total") ||
      lowerQuestion.includes("overall") ||
      lowerQuestion.includes("summary")
    ) {
      const totalViews = videos.reduce((sum, v) => sum + v.metrics.views, 0);
      const totalLikes = videos.reduce((sum, v) => sum + v.metrics.likes, 0);
      const totalComments = videos.reduce(
        (sum, v) => sum + v.metrics.comments,
        0,
      );
      return `📈 **Overall Statistics for ${regionCode}:**\n\n📹 Total Videos: ${videos.length}\n👁️ Total Views: ${(totalViews / 1000000000).toFixed(2)}B\n❤️ Total Likes: ${(totalLikes / 1000000).toFixed(1)}M\n💬 Total Comments: ${(totalComments / 1000000).toFixed(1)}M\n📊 Avg Engagement: ${((totalLikes + totalComments) / videos.length / 1000).toFixed(1)}K per video`;
    }

    // Top 5 videos
    if (lowerQuestion.includes("top 5") || lowerQuestion.includes("top five")) {
      const top5 = [...videos]
        .sort((a, b) => b.metrics.views - a.metrics.views)
        .slice(0, 5);
      return `🏆 **Top 5 Trending Videos:**\n\n${top5.map((v, i) => `${i + 1}. "${v.title}"\n   📊 ${(v.metrics.views / 1000000).toFixed(1)}M views`).join("\n\n")}`;
    }

    // Compare engagement
    if (
      lowerQuestion.includes("engagement") ||
      lowerQuestion.includes("compare")
    ) {
      const withEngagement = videos
        .map((v) => ({
          title: v.title,
          engagement: v.metrics.likes + v.metrics.comments,
          views: v.metrics.views,
        }))
        .sort((a, b) => b.engagement - a.engagement)
        .slice(0, 3);

      return `💡 **Top 3 by Engagement (Likes + Comments):**\n\n${withEngagement.map((v, i) => `${i + 1}. "${v.title}"\n   🔥 ${(v.engagement / 1000).toFixed(1)}K engagement\n   📊 ${(v.views / 1000000).toFixed(1)}M views`).join("\n\n")}`;
    }

    // Average views
    if (lowerQuestion.includes("average") || lowerQuestion.includes("avg")) {
      const avgViews =
        videos.reduce((sum, v) => sum + v.metrics.views, 0) / videos.length;
      const avgLikes =
        videos.reduce((sum, v) => sum + v.metrics.likes, 0) / videos.length;
      return `📊 **Average Statistics:**\n\n👁️ Avg Views: ${(avgViews / 1000000).toFixed(2)}M\n❤️ Avg Likes: ${(avgLikes / 1000).toFixed(1)}K\n📹 Based on ${videos.length} trending videos in ${regionCode}`;
    }

    // Default response
    return `I understand you're asking about: "${question}"\n\nI can help you with:\n• Most viewed/liked videos\n• Category analysis\n• Gaming, Music, or other category trends\n• Total statistics and summaries\n• Top 5 comparisons\n• Engagement metrics\n\nTry asking something like "What's trending in gaming?" or "Show me the top 5 videos"`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userQuestion = input;
    setInput("");
    setIsLoading(true);

    try {
      // Use centralized API function
      const { chatWithAI } = await import("../../services/api");
      const data = await chatWithAI(userQuestion, regionCode);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an error processing your request. Please make sure the backend server is running and the Groq API key is configured.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button with Tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <>
            {/* Tooltip Banner - Hidden on mobile */}
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.5 }}
                className="hidden md:block fixed bottom-24 right-6 z-50 bg-white rounded-xl shadow-2xl p-4 max-w-xs border border-orange-200"
              >
                <button
                  onClick={() => setShowTooltip(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-3 pr-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      AI Assistant Available!
                    </h4>
                    <p className="text-sm text-gray-600">
                      Ask me anything about YouTube trends 👇
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-orange-200 transform rotate-45" />
              </motion.div>
            )}

            {/* Main Chat Button - Responsive */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 group overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Mobile: Icon only, Desktop: Full button */}
              <div className="relative px-4 py-4 md:px-6 flex items-center gap-3">
                <div className="relative">
                  <Bot className="w-6 h-6 md:w-7 md:h-7" />
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="text-left hidden md:block">
                  <div className="font-bold text-sm">AI Assistant</div>
                  <div className="text-xs text-orange-100">Ask me anything</div>
                </div>
              </div>

              {/* Pulse effect */}
              <motion.div
                className="absolute inset-0 bg-white rounded-2xl"
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Chat Window - Responsive */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-4 md:bottom-6 md:right-6 md:left-auto md:top-auto z-50 md:w-96 md:h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header - Responsive padding */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">
                    AI Trends Assistant
                  </h3>
                  <p className="text-orange-100 text-xs">
                    Ask me anything about trends
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === "user"
                        ? "bg-orange-500 text-white"
                        : "bg-white border-2 border-orange-500 text-orange-500"
                      }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-3 h-3 md:w-4 md:h-4" />
                    ) : (
                      <Bot className="w-3 h-3 md:w-4 md:h-4" />
                    )}
                  </div>
                  <div
                    className={`flex-1 ${message.role === "user" ? "text-right" : ""}`}
                  >
                    <div
                      className={`inline-block max-w-[85%] px-4 py-2 rounded-2xl ${message.role === "user"
                          ? "bg-orange-500 text-white rounded-br-none"
                          : "bg-white border border-gray-200 text-gray-900 rounded-bl-none"
                        }`}
                    >
                      <p className="text-xs md:text-sm whitespace-pre-line">
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
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-2 border-orange-500 text-orange-500 flex items-center justify-center">
                    <Bot className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-3 py-2 md:px-4 md:py-3">
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 text-orange-500 animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input - Responsive */}
            <form
              onSubmit={handleSubmit}
              className="p-3 md:p-4 bg-white border-t border-gray-200"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about trends..."
                  className="flex-1 px-3 py-2 md:px-4 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-3 py-2 md:px-4 md:py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AIChat;
