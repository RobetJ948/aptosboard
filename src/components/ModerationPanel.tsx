import React, { useState } from 'react';
import { Shield, Flag, Trash2, Eye, EyeOff, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
  avatar: string;
}

interface ModerationPanelProps {
  messages: Message[];
  onClose?: () => void;
}

const ModerationPanel: React.FC<ModerationPanelProps> = ({ messages, onClose }) => {
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'flagged' | 'pending'>('all');

  const handleSelectMessage = (messageId: string) => {
    const newSelected = new Set(selectedMessages);
    if (newSelected.has(messageId)) {
      newSelected.delete(messageId);
    } else {
      newSelected.add(messageId);
    }
    setSelectedMessages(newSelected);
  };

  const handleBulkAction = (action: 'hide' | 'delete' | 'approve') => {
    console.log(`Performing ${action} on messages:`, Array.from(selectedMessages));
    setSelectedMessages(new Set());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Shield className="w-7 h-7 text-gray-700" />
            <span>Moderation Dashboard</span>
          </h1>
          <p className="text-gray-600 mt-1">Manage and moderate community messages</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Close
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Messages ({messages.length})
            </button>
            <button
              onClick={() => setFilter('flagged')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === 'flagged'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Flagged (0)
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                filter === 'pending'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Pending Review (0)
            </button>
          </div>

          {selectedMessages.size > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {selectedMessages.size} selected
              </span>
              <button
                onClick={() => handleBulkAction('hide')}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                title="Hide selected"
              >
                <EyeOff size={16} />
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Delete selected"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 ${
              selectedMessages.has(message.id) ? 'ring-2 ring-gray-900' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedMessages.has(message.id)}
                onChange={() => handleSelectMessage(message.id)}
                className="mt-1 w-4 h-4 text-gray-900 rounded focus:ring-gray-900"
              />
              
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: message.avatar }}
              >
                {message.sender.slice(2, 4).toUpperCase()}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-medium text-gray-900">{message.sender}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      title="Flag message"
                    >
                      <Flag size={16} />
                    </button>
                    <button
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      title="Hide message"
                    >
                      <EyeOff size={16} />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete message"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-900 leading-relaxed">{message.text}</p>

                {/* Moderation Status */}
                <div className="mt-3 flex items-center space-x-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Eye size={12} className="mr-1" />
                    Approved
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {messages.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages to moderate</h3>
          <p className="text-gray-600">All messages are currently approved and visible.</p>
        </div>
      )}
    </div>
  );
};

export default ModerationPanel;