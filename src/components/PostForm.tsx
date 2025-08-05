import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface PostFormProps {
  onSubmit: (text: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const maxLength = 200;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || text.length > maxLength) return;

    setIsSubmitting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      onSubmit(text.trim());
      setText('');
      setIsSubmitting(false);
      setShowSuccess(true);
      
      setTimeout(() => setShowSuccess(false), 2000);
    }, 1000);
  };

  const remainingChars = maxLength - text.length;
  const isOverLimit = remainingChars < 0;
  const isNearLimit = remainingChars <= 20 && remainingChars > 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/30 to-blue-50/0 transform -translate-x-full animate-[shimmer_3s_infinite]"></div>
      
      <div className="relative">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-gray-600" />
          <span>Share Your Thoughts</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind? Share it with the Aptos community..."
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500 min-h-[120px] bg-gray-50/50 focus:bg-white"
              disabled={isSubmitting}
            />
            
            {/* Animated border on focus */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 opacity-0 -z-10 blur-sm transition-opacity duration-300 focus-within:opacity-20"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Character Counter */}
              <div className={`text-sm font-medium transition-colors duration-300 ${
                isOverLimit ? 'text-red-600' :
                isNearLimit ? 'text-orange-600' :
                'text-gray-500'
              }`}>
                <span className="tabular-nums">{remainingChars}</span>
                <span className="ml-1">characters left</span>
              </div>

              {/* Character Progress Bar */}
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${
                    isOverLimit ? 'bg-red-500' :
                    isNearLimit ? 'bg-orange-500' :
                    'bg-gray-900'
                  }`}
                  style={{ 
                    width: `${Math.min(100, (text.length / maxLength) * 100)}%`,
                    transform: isOverLimit ? 'scaleX(1.1)' : 'scaleX(1)'
                  }}
                ></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!text.trim() || isOverLimit || isSubmitting}
              className={`relative px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group ${
                showSuccess ? 'bg-green-600 text-white' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-center space-x-2 relative z-10">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Posting...</span>
                  </>
                ) : showSuccess ? (
                  <>
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                    </div>
                    <span>Posted!</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Post Message</span>
                  </>
                )}
              </div>

              {/* Button animation effects */}
              {!isSubmitting && !showSuccess && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="absolute inset-0 bg-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
                </>
              )}
              
              {showSuccess && (
                <div className="absolute inset-0 bg-green-500 animate-pulse"></div>
              )}
            </button>
          </div>

          {/* Error Message */}
          {isOverLimit && (
            <div className="text-red-600 text-sm font-medium animate-[shake_0.5s_ease-in-out]">
              Message is too long. Please keep it under {maxLength} characters.
            </div>
          )}
        </form>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default PostForm;