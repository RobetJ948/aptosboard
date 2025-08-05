import React from 'react';
import { Wallet, User, Shield, Home, BarChart3, Menu } from 'lucide-react';

interface HeaderProps {
  connectedWallet: string | null;
  onWalletConnect: () => void;
  onProfileClick: () => void;
  onModerationClick: () => void;
  currentView: 'home' | 'stats' | 'moderation';
  onViewChange: (view: 'home' | 'stats' | 'moderation') => void;
  isAdmin: boolean;
}

const Header: React.FC<HeaderProps> = ({
  connectedWallet,
  onWalletConnect,
  onProfileClick,
  onModerationClick,
  currentView,
  onViewChange,
  isAdmin
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const formatWallet = (wallet: string) => {
    return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-600 rounded-xl flex items-center justify-center transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl blur opacity-20 animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Aptos Board</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Decentralized Messages</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onViewChange('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentView === 'home'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            
            <button
              onClick={() => onViewChange('stats')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                currentView === 'stats'
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <BarChart3 size={18} />
              <span>Stats</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => onViewChange('moderation')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  currentView === 'moderation'
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Shield size={18} />
                <span>Moderation</span>
              </button>
            )}
          </nav>

          {/* Wallet & Profile */}
          <div className="flex items-center space-x-3">
            {connectedWallet && (
              <button
                onClick={onProfileClick}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 transform hover:scale-110"
                aria-label="Profile"
              >
                <User size={20} />
              </button>
            )}

            <button
              onClick={onWalletConnect}
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                connectedWallet
                  ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                  : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Wallet size={18} />
                <span className="hidden sm:inline">
                  {connectedWallet ? formatWallet(connectedWallet) : 'Connect Wallet'}
                </span>
              </div>
              
              {!connectedWallet && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]"></div>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-[slideDown_0.3s_ease-out]">
            <button
              onClick={() => {
                onViewChange('home');
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === 'home'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </button>
            
            <button
              onClick={() => {
                onViewChange('stats');
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                currentView === 'stats'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 size={18} />
              <span>Stats</span>
            </button>

            {isAdmin && (
              <button
                onClick={() => {
                  onViewChange('moderation');
                  setIsMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentView === 'moderation'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Shield size={18} />
                <span>Moderation</span>
              </button>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default Header;