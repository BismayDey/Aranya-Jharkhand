import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle,
  X,
  Send,
  Maximize2,
  Minimize2,
  Bot,
  User,
  MapPin,
  Calendar,
  Info,
  Star,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatBotProps {
  className?: string;
}

export function ChatBot({ className = "" }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  // Processed bot logo with background removed (white -> transparent)
  const [botLogo, setBotLogo] = useState<string>("/chatbot.png");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "🙏 Namaste! I'm your AI travel companion for Jharkhand. I can help you with destinations, bookings, cultural insights, and local tips. What would you like to explore?",
      timestamp: new Date(),
      suggestions: [
        "Popular Destinations",
        "Cultural Experiences",
        "Marketplace",
        "Travel Planning",
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // On mount: attempt to remove white background from chatbot.png using canvas
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/chatbot.png";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        // Simple white threshold removal
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // If near white, make transparent
          if (r > 245 && g > 245 && b > 245) {
            data[i + 3] = 0; // alpha
          }
        }
        ctx.putImageData(imageData, 0, 0);
        const cleaned = canvas.toDataURL("image/png");
        if (cleaned.startsWith("data:image/png")) {
          setBotLogo(cleaned);
        }
      } catch (e) {
        // Fail silently; fallback original image
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const quickResponses = [
    "Tell me about Netarhat",
    "Best time to visit Jharkhand",
    "Local festivals and culture",
    "Tribal art and handicrafts",
    "Adventure activities",
    "Traditional cuisine",
    "Accommodation options",
    "Transportation guide",
  ];

  const getBotResponse = (
    userMessage: string
  ): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();

    if (message.includes("netarhat") || message.includes("hill station")) {
      return {
        content:
          '🏔️ Netarhat is known as the "Queen of Chotanagpur"! It\'s a beautiful hill station perfect for sunrise/sunset views, trekking, and cool weather. Best visited from October to March. Would you like me to help you plan a trip there?',
        suggestions: [
          "Plan Netarhat Trip",
          "Best Hotels in Netarhat",
          "Things to Do",
          "Weather Info",
        ],
      };
    }

    if (
      message.includes("culture") ||
      message.includes("festival") ||
      message.includes("tribal")
    ) {
      return {
        content:
          "🎭 Jharkhand has a rich tribal heritage! Major festivals include Sarhul, Karam, and Sohrai. The state is famous for tribal dances like Chhau and Jhumair, and traditional crafts like Dokra art and Paitkar paintings. Want to explore our cultural marketplace?",
        suggestions: [
          "View Cultural Events",
          "Tribal Art Marketplace",
          "Festival Calendar",
          "Traditional Cuisine",
        ],
      };
    }

    if (
      message.includes("food") ||
      message.includes("cuisine") ||
      message.includes("eat")
    ) {
      return {
        content:
          "🍽️ Jharkhand cuisine is delicious! Try Litti-Chokha, Dhuska, Arsa roti, and traditional rice beer (Handia). Local markets offer fresh tribal organic produce. I can recommend the best local restaurants and food experiences!",
        suggestions: [
          "Food Guide",
          "Restaurant Recommendations",
          "Cooking Classes",
          "Local Markets",
        ],
      };
    }

    if (
      message.includes("book") ||
      message.includes("hotel") ||
      message.includes("stay")
    ) {
      return {
        content:
          "🏨 I can help you find perfect accommodations! From luxury resorts to eco-friendly tribal homestays. What's your preference and budget? I'll show you the best options with authentic local experiences.",
        suggestions: [
          "Luxury Hotels",
          "Eco Homestays",
          "Budget Options",
          "Unique Experiences",
        ],
      };
    }

    if (
      message.includes("travel") ||
      message.includes("plan") ||
      message.includes("itinerary")
    ) {
      return {
        content:
          "🗺️ Let me create a personalized itinerary for you! I can suggest destinations based on your interests - adventure, culture, nature, or spirituality. How many days do you have and what interests you most?",
        suggestions: [
          "3-Day Adventure",
          "5-Day Cultural",
          "7-Day Complete",
          "Custom Planning",
        ],
      };
    }

    if (
      message.includes("shop") ||
      message.includes("buy") ||
      message.includes("market")
    ) {
      return {
        content:
          "🛍️ Our marketplace features authentic tribal handicrafts, traditional textiles, dokra art, and local produce. All directly from local artisans and certified eco-friendly. Shall I show you our featured collections?",
        suggestions: [
          "Handicrafts",
          "Textiles",
          "Art & Jewelry",
          "Local Products",
        ],
      };
    }

    if (
      message.includes("weather") ||
      message.includes("when") ||
      message.includes("time")
    ) {
      return {
        content:
          "🌤️ Best time to visit Jharkhand is October to March with pleasant weather. Monsoon (July-Sept) is beautiful but can affect travel. Summer (April-June) is hot but good for hill stations. What season do you prefer?",
        suggestions: [
          "Winter Travel",
          "Monsoon Beauty",
          "Summer Hill Stations",
          "Festival Seasons",
        ],
      };
    }

    if (
      message.includes("adventure") ||
      message.includes("trek") ||
      message.includes("activity")
    ) {
      return {
        content:
          "⛰️ Jharkhand offers amazing adventures! Rock climbing at Netarhat, trekking in Palamau, river rafting, wildlife safaris at Betla National Park, and paragliding. What type of adventure excites you?",
        suggestions: [
          "Trekking Trails",
          "Wildlife Safari",
          "Water Sports",
          "Rock Climbing",
        ],
      };
    }

    // Default responses
    const defaultResponses = [
      {
        content:
          "🤔 I'd love to help you discover Jharkhand! Can you tell me more about what you're looking for? I'm here to assist with destinations, culture, bookings, and local insights.",
        suggestions: [
          "Popular Places",
          "Cultural Sites",
          "Adventure Activities",
          "Local Experiences",
        ],
      },
      {
        content:
          "✨ That's interesting! Let me help you explore Jharkhand better. I can provide information about our beautiful destinations, rich culture, local cuisine, and help you plan your perfect trip.",
        suggestions: [
          "Plan a Trip",
          "Cultural Guide",
          "Food & Dining",
          "Transportation",
        ],
      },
    ];

    return defaultResponses[
      Math.floor(Math.random() * defaultResponses.length)
    ];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse.content,
        timestamp: new Date(),
        suggestions: botResponse.suggestions,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className={`fixed bottom-6 right-6 z-50 ${className}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => {
            setIsOpen(true);
            if (!hasShownWelcome) {
              toast.success("🤖 AI Assistant Activated", {
                description:
                  "Your personal Jharkhand travel guide is ready to help!",
                duration: 3000,
              });
              setHasShownWelcome(true);
            }
          }}
          className="relative w-20 h-20 bg-[#18B668] rounded-full shadow-2xl hover:shadow-[0_8px_34px_-4px_rgba(24,182,104,0.65)] transition-all duration-300 group ring-1 ring-white/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulse Animation */}
          <div className="absolute inset-0 rounded-full bg-[#18B668] animate-ping opacity-25"></div>

          {/* Icon / Custom Logo */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <img
              src={botLogo}
              alt="Chatbot Logo"
              className="w-14 h-14 object-contain pointer-events-none select-none drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <MessageCircle className="w-7 h-7 text-white hidden" />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/90 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap backdrop-blur-md">
            AI Travel Assistant
            <div className="absolute top-full right-4 border-4 border-transparent border-t-black/90"></div>
          </div>

          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-white" />
          </div>
        </motion.button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed inset-0 z-[9999] ${
              isFullscreen ? "" : "pointer-events-none"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            {isFullscreen && (
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
            )}

            {/* Chat Window */}
            <motion.div
              className={`absolute ${
                isFullscreen
                  ? "inset-4 md:inset-8"
                  : "bottom-6 right-6 w-96 h-[32rem]"
              } glass-premium rounded-2xl shadow-2xl overflow-hidden pointer-events-auto`}
              initial={
                isFullscreen
                  ? { scale: 0.5, opacity: 0 }
                  : { scale: 0, originX: 1, originY: 1 }
              }
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-[#18B668] to-[#0EA5E9] p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#18B668] rounded-full flex items-center justify-center overflow-hidden shadow-md">
                      <img
                        src={botLogo}
                        alt="AI Assistant"
                        className="w-10 h-10 object-contain pointer-events-none select-none"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display =
                            "none";
                        }}
                      />
                      <Bot className="w-6 h-6 hidden" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Travel Assistant</h3>
                      <p className="text-sm text-white/80">
                        Always here to help
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-white/20 p-2"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-white hover:bg-white/20 p-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 flex flex-col h-full">
                <ScrollArea
                  className={`flex-1 p-4 chatbot-scroll ${
                    isFullscreen ? "h-[calc(100vh-12rem)]" : "h-80"
                  }`}
                >
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        className={`flex ${
                          message.type === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`flex gap-3 max-w-[85%] ${
                            message.type === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          {/* Avatar */}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                              message.type === "user"
                                ? "bg-[#18B668] text-white"
                                : "bg-[#18B668] text-white shadow"
                            }`}
                          >
                            {message.type === "user" ? (
                              <User className="w-4 h-4" />
                            ) : (
                              <>
                                <img
                                  src={botLogo}
                                  alt="Bot"
                                  className="w-8 h-8 object-contain pointer-events-none select-none"
                                  onError={(e) => {
                                    (
                                      e.currentTarget as HTMLImageElement
                                    ).style.display = "none";
                                  }}
                                />
                                <Bot className="w-4 h-4 hidden" />
                              </>
                            )}
                          </div>

                          {/* Message Bubble */}
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              message.type === "user"
                                ? "bg-[#18B668] text-white rounded-br-lg"
                                : "glass-dark text-white rounded-bl-lg"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">
                              {message.content}
                            </p>

                            {/* Suggestions */}
                            {message.suggestions && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {message.suggestions.map(
                                  (suggestion, index) => (
                                    <button
                                      key={index}
                                      onClick={() =>
                                        handleSuggestionClick(suggestion)
                                      }
                                      className="px-3 py-1 text-xs bg-white/10 hover:bg-white/20 rounded-full border border-white/20 hover:border-white/40 transition-all duration-200"
                                    >
                                      {suggestion}
                                    </button>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="flex gap-3 max-w-[85%]">
                          <div className="w-8 h-8 rounded-full bg-[#18B668] text-white flex items-center justify-center overflow-hidden shadow">
                            <img
                              src={botLogo}
                              alt="Bot typing"
                              className="w-8 h-8 object-contain pointer-events-none select-none"
                              onError={(e) => {
                                (
                                  e.currentTarget as HTMLImageElement
                                ).style.display = "none";
                              }}
                            />
                            <Bot className="w-4 h-4 hidden" />
                          </div>
                          <div className="glass-dark text-white px-4 py-3 rounded-2xl rounded-bl-lg">
                            <div className="flex gap-1">
                              <div
                                className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Quick Responses */}
                {!isTyping && messages.length <= 3 && (
                  <div className="px-4 py-2 border-t border-white/10">
                    <p className="text-xs text-white/60 mb-2">
                      Quick Questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickResponses.slice(0, 4).map((response, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(response)}
                          className="px-2 py-1 text-xs glass-dark text-white/80 hover:text-white rounded-full border border-white/10 hover:border-white/30 transition-all duration-200"
                        >
                          {response}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about Jharkhand..."
                      className="flex-1 glass-dark border-white/20 text-white placeholder:text-white/50 focus:border-[#18B668]"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-[#18B668] hover:bg-[#18B668]/90 text-white p-3"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-white/40 mt-2 text-center">
                    Powered by AI • Always learning to serve you better
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
