import React, { useState } from 'react';
import { Wallet, MessageCircle, Users, Sparkles, ArrowRight, X } from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
  onWalletConnect: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose, onWalletConnect }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Sparkles,
      title: "Welcome to Aptos Board",
      description: "A decentralized message board built on the Aptos blockchain. Share your thoughts with the community in a truly decentralized way.",
      action: null
    },
    {
      icon: Wallet,
      title: "Connect Your Wallet",
      description: "To post messages and interact with the community, you'll need to connect your Aptos wallet. Don't worry, it's completely secure!",
      action: "Connect Wallet"
    },
    {
      icon: MessageCircle,
      title: "Start Sharing",
      description: "Once connected, you can post messages up to 200 characters, view real-time updates, and engage with the community."
    },
    {
      icon: Users,
      title: "Join the Community",
      description: "You're all set! Welcome to the future of decentralized communication. Let's build something amazing together."
    }
  ];

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleWalletConnect = () => {
    onWalletConnect();
    handleNext();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.4s_ease-out]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-[slideUp_0.5s_ease-out]">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 p-8 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
          >
            <X size={20} />
          </button>
          
          <div className="mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-[bounce_1s_infinite]">
              <Icon size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{currentStepData.title}</h2>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <p className="text-gray-600 text-center leading-relaxed mb-8">
            {currentStepData.description}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            {currentStepData.action === "Connect Wallet" ? (
              <button
                onClick={handleWalletConnect}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Wallet size={18} />
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>{currentStep === steps.length - 1 ? "Get Started" : "Next"}</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          {/* Skip Option */}
          {currentStep === 0 && (
            <div className="text-center mt-4">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
              >
                Skip introduction
              </button>
            </div>
          )}
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
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
          }
          40%, 43% {
            transform: translateY(-8px);
          }
          70% {
            transform: translateY(-4px);
          }
          90% {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  );
};

export default OnboardingModal;