import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, Activity, TrendingUp, Clock, Zap } from 'lucide-react';

interface Stats {
  totalMessages: number;
  uniqueUsers: number;
  activeNow: number;
}

interface StatsPanelProps {
  stats: Stats;
  expanded?: boolean;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, expanded = false }) => {
  const [animatedStats, setAnimatedStats] = useState({
    totalMessages: 0,
    uniqueUsers: 0,
    activeNow: 0
  });

  // Animate counters
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats({
        totalMessages: Math.floor(stats.totalMessages * easeOutQuart),
        uniqueUsers: Math.floor(stats.uniqueUsers * easeOutQuart),
        activeNow: Math.floor(stats.activeNow * easeOutQuart)
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedStats(stats);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stats]);

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    change, 
    color = "gray",
    delay = 0 
  }: {
    icon: React.ElementType;
    title: string;
    value: number;
    change?: string;
    color?: string;
    delay?: number;
  }) => (
    <div 
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/0 to-gray-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-${color}-100 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
          {change && (
            <span className="text-green-600 text-sm font-medium flex items-center space-x-1">
              <TrendingUp size={14} />
              <span>{change}</span>
            </span>
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-2xl font-bold text-gray-900 tabular-nums">
            {value.toLocaleString()}
          </p>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
        </div>
      </div>
    </div>
  );

  if (expanded) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Real-time insights into the Aptos Message Board</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={MessageCircle}
            title="Total Messages"
            value={animatedStats.totalMessages}
            change="+12.5%"
            color="blue"
            delay={0}
          />
          <StatCard
            icon={Users}
            title="Unique Users"
            value={animatedStats.uniqueUsers}
            change="+8.3%"
            color="green"
            delay={200}
          />
          <StatCard
            icon={Activity}
            title="Active Now"
            value={animatedStats.activeNow}
            change="+15.7%"
            color="purple"
            delay={400}
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
            <Clock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">2.3s</p>
            <p className="text-sm text-gray-600">Avg Response Time</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
            <Zap className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">99.9%</p>
            <p className="text-sm text-gray-600">Uptime</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
            <TrendingUp className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">24.8%</p>
            <p className="text-sm text-gray-600">Growth Rate</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-100 text-center hover:shadow-lg transition-all duration-300">
            <Activity className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-gray-900">1.8M</p>
            <p className="text-sm text-gray-600">Total Interactions</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Message Activity (Last 24h)</h3>
          <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Interactive charts coming soon</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Live Stats</h2>
      
      <div className="space-y-4">
        <StatCard
          icon={MessageCircle}
          title="Total Messages"
          value={animatedStats.totalMessages}
          change="+12.5%"
          delay={0}
        />
        <StatCard
          icon={Users}
          title="Unique Users"
          value={animatedStats.uniqueUsers}
          change="+8.3%"
          delay={200}
        />
        <StatCard
          icon={Activity}
          title="Active Now"
          value={animatedStats.activeNow}
          change="+15.7%"
          delay={400}
        />
      </div>

      {/* Mini Activity Indicator */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Network Activity</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600">Live</span>
          </div>
        </div>
        <div className="flex space-x-1">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="flex-1 bg-gray-200 rounded-sm animate-pulse"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 100}ms`,
                animationDuration: '2s'
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;