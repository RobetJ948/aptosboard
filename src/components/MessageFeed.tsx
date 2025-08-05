import React, { useState } from 'react';
import { Copy, Clock, MoreHorizontal } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
  avatar: string;
}

interface MessageFeedProps {
  messages: Message[];
}

const MessageFeed: React.FC<MessageFeedProps> = ({ messages }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visibleMessages, setVisibleMessages] = useState(10);

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return `${Math.floor(diff / 86400000)}d ago`;
  };

  const copyToClipboard = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(messageId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const loadMore = () => {
    setVisibleMessages(prev => Math.min(prev + 10, messages.length));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Message Feed</h2>
      
      {messages.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <MoreHorizontal className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 text-lg">No messages yet</p>
          <p className="text-gray-400 text-sm">Be the first to post a message!</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {messages.slice(0, visibleMessages).map((message, index) => (
              <div
                key={message.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group animate-[slideIn_0.5s_ease-out] relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50/0 via-gray-50/50 to-gray-50/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <div className="relative">
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg transform group-hover:scale-110 transition-transform duration-300 shadow-lg"
                        style={{ backgroundColor: message.avatar }}
                      >
                        {message.sender.slice(2, 4).toUpperCase()}
                      </div>
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        <button
                          onClick={() => copyToClipboard(message.sender, message.id)}
                          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 group/copy"
                        >
                          <span className="font-medium">{message.sender}</span>
                          <Copy size={14} className="opacity-0 group-hover/copy:opacity-100 transition-opacity duration-200" />
                          {copiedId === message.id && (
                            <span className="text-green-600 animate-[fadeIn_0.3s_ease-out]">Copied!</span>
                          )}
                        </button>
                        
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                          <Clock size={12} />
                          <span>{formatTimestamp(message.timestamp)}</span>
                        </div>
                      </div>

                      {/* Message Content */}
                      <div className="prose prose-sm max-w-none">
                        <p className="text-gray-900 leading-relaxed font-medium text-base">
                          {message.text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleMessages < messages.length && (
            <div className="flex justify-center pt-8">
              <button
                onClick={loadMore}
                className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Load More Messages</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          )}

          {/* Loading Skeletons */}
          {visibleMessages >= messages.length && messages.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">You've reached the end of the feed</p>
            </div>
          )}
        </>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default MessageFeed;