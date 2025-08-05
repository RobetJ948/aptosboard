import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MessageFeed from './components/MessageFeed';
import PostForm from './components/PostForm';
import StatsPanel from './components/StatsPanel';
import ProfileModal from './components/ProfileModal';
import ModerationPanel from './components/ModerationPanel';
import Footer from './components/Footer';
import Toast from './components/Toast';
import OnboardingModal from './components/OnboardingModal';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
  avatar: string;
}

interface Stats {
  totalMessages: number;
  uniqueUsers: number;
  activeNow: number;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [stats, setStats] = useState<Stats>({ totalMessages: 0, uniqueUsers: 0, activeNow: 0 });
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showModeration, setShowModeration] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'stats' | 'moderation'>('home');
  const [isAdmin] = useState(false); // This would be determined by wallet address

  // Mock data for demonstration
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        text: 'Welcome to the Aptos Message Board! This is the future of decentralized communication.',
        sender: '0x1234...5678',
        timestamp: Date.now() - 3600000,
        avatar: generateAvatar('0x1234...5678')
      },
      {
        id: '2',
        text: 'Just posted my first message on Aptos! The transaction was lightning fast ⚡',
        sender: '0x9876...5432',
        timestamp: Date.now() - 1800000,
        avatar: generateAvatar('0x9876...5432')
      },
      {
        id: '3',
        text: 'Building the future of Web3 communication, one message at a time 🚀',
        sender: '0xabcd...efgh',
        timestamp: Date.now() - 900000,
        avatar: generateAvatar('0xabcd...efgh')
      }
    ];
    
    setMessages(mockMessages);
    setStats({
      totalMessages: 1247,
      uniqueUsers: 342,
      activeNow: 23
    });

    // Check if first time user
    const hasVisited = localStorage.getItem('aptos-board-visited');
    if (!hasVisited) {
      setShowOnboarding(true);
      localStorage.setItem('aptos-board-visited', 'true');
    }
  }, []);

  // Simulate real-time messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const newMessage: Message = {
          id: Date.now().toString(),
          text: getRandomMessage(),
          sender: getRandomWallet(),
          timestamp: Date.now(),
          avatar: generateAvatar(getRandomWallet())
        };
        
        setMessages(prev => [newMessage, ...prev]);
        setStats(prev => ({
          ...prev,
          totalMessages: prev.totalMessages + 1
        }));
        
        showToast('New message arrived!', 'info');
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const generateAvatar = (address: string): string => {
    // Simple deterministic avatar generation based on address
    const colors = ['#1a1a1a', '#2a2a2a', '#3a3a3a', '#4a4a4a', '#5a5a5a'];
    const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const getRandomMessage = (): string => {
    const messages = [
      'Just discovered this amazing dApp! The UX is incredible.',
      'Loving the smooth animations and clean design 🎨',
      'Aptos is the future of blockchain technology!',
      'This message board feels so responsive and modern.',
      'Web3 UX is finally catching up to Web2 standards.',
      'The greyscale theme is absolutely gorgeous 🖤',
      'Seamless wallet integration, well done developers!'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getRandomWallet = (): string => {
    const prefixes = ['0x1a2b', '0x3c4d', '0x5e6f', '0x7890', '0xabcd'];
    const suffixes = ['1234', '5678', '9abc', 'def0', '2468'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix}...${suffix}`;
  };

  const handleWalletConnect = () => {
    if (connectedWallet) {
      setConnectedWallet(null);
      showToast('Wallet disconnected', 'info');
    } else {
      // Simulate wallet connection
      setTimeout(() => {
        setConnectedWallet('0x742d35Cc6634C0532925a3b8D0Ca05c5E8d9a93e');
        showToast('Wallet connected successfully!', 'success');
      }, 1500);
    }
  };

  const handlePostMessage = (text: string) => {
    if (!connectedWallet) {
      showToast('Please connect your wallet first', 'error');
      return;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: connectedWallet,
      timestamp: Date.now(),
      avatar: generateAvatar(connectedWallet)
    };

    setMessages(prev => [newMessage, ...prev]);
    setStats(prev => ({
      ...prev,
      totalMessages: prev.totalMessages + 1
    }));
    
    showToast('Message posted successfully!', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        connectedWallet={connectedWallet}
        onWalletConnect={handleWalletConnect}
        onProfileClick={() => setShowProfile(true)}
        onModerationClick={() => setShowModeration(true)}
        currentView={currentView}
        onViewChange={setCurrentView}
        isAdmin={isAdmin}
      />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {currentView === 'home' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <PostForm onSubmit={handlePostMessage} />
              <MessageFeed messages={messages} />
            </div>
            <div className="space-y-6">
              <StatsPanel stats={stats} />
            </div>
          </div>
        )}

        {currentView === 'stats' && (
          <div className="max-w-4xl mx-auto">
            <StatsPanel stats={stats} expanded={true} />
          </div>
        )}

        {currentView === 'moderation' && isAdmin && (
          <div className="max-w-4xl mx-auto">
            <ModerationPanel messages={messages} />
          </div>
        )}
      </main>

      <Footer />

      {showProfile && (
        <ProfileModal
          wallet={connectedWallet}
          onClose={() => setShowProfile(false)}
          messages={messages.filter(m => m.sender === connectedWallet)}
        />
      )}

      {showModeration && isAdmin && (
        <ModerationPanel
          messages={messages}
          onClose={() => setShowModeration(false)}
        />
      )}

      {showOnboarding && (
        <OnboardingModal
          onClose={() => setShowOnboarding(false)}
          onWalletConnect={handleWalletConnect}
        />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;