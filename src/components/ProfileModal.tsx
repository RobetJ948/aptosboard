import React from 'react';
import { X, User, MessageCircle, Calendar, Award } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
  avatar: string;
}

interface ProfileModalProps {
  wallet: string | null;
  onClose: () => void;
  messages: Message[];
}

const ProfileModal: React.FC<ProfileModalProps> = ({ wallet, onClose, messages }) => {
  if (!wallet) return null;

  const joinDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
  const streak = Math.floor(Math.random() * 30) + 1;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden animate-[slideUp_0.4s_ease-out]">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {wallet.slice(2, 4).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold">Your Profile</h2>
              <p className="text-white/80 font-mono text-sm">{wallet}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors duration-200">
              <MessageCircle className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
              <p className="text-sm text-gray-600">Messages Posted</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors duration-200">
              <Award className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{streak}</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </div>

          {/* Join Date */}
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium text-gray-900">Member Since</p>
              <p className="text-sm text-gray-600">{joinDate.toLocaleDateString()}</p>
            </div>
          </div>

          {/* Recent Messages */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Recent Messages</h3>
            {messages.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No messages posted yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {messages.slice(0, 5).map((message) => (
                  <div
                    key={message.id}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <p className="text-sm text-gray-900 line-clamp-2">{message.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Achievements</h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">🎯</div>
                <p className="text-xs text-gray-600">First Post</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">🔥</div>
                <p className="text-xs text-gray-600">Active User</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg opacity-50">
                <div className="text-2xl mb-1">👑</div>
                <p className="text-xs text-gray-600">Top Poster</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProfileModal;