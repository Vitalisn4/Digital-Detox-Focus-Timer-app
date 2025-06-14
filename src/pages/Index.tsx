
import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FocusTimer from '@/components/FocusTimer';
import WellnessDashboard from '@/components/WellnessDashboard';
import BreakSuggestions from '@/components/BreakSuggestions';
import SettingsPanel from '@/components/SettingsPanel';
import { useTheme } from '@/hooks/useTheme';
import { useWellnessData } from '@/hooks/useWellnessData';

const Index = () => {
  const [activeTab, setActiveTab] = useState('timer');
  const { isDark, toggleTheme } = useTheme();
  const wellnessData = useWellnessData();

  const tabs = [
    { id: 'timer', label: 'Focus Timer', icon: '⏱️' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'breaks', label: 'Mindful Breaks', icon: '🧘' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className={`text-4xl font-bold ${
              isDark ? 'text-white' : 'text-slate-800'
            } mb-2`}>
              Digital Wellness
            </h1>
            <p className={`text-lg ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Transform your focus, reclaim your time
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`rounded-full w-12 h-12 ${
              isDark ? 'hover:bg-slate-800' : 'hover:bg-white/50'
            }`}
          >
            {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                  : isDark
                    ? 'hover:bg-slate-800 text-slate-300'
                    : 'hover:bg-white/50 text-slate-600'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </Button>
          ))}
        </nav>

        {/* Main Content */}
        <main className="animate-fade-in">
          {activeTab === 'timer' && <FocusTimer wellnessData={wellnessData} />}
          {activeTab === 'dashboard' && <WellnessDashboard wellnessData={wellnessData} />}
          {activeTab === 'breaks' && <BreakSuggestions />}
          {activeTab === 'settings' && <SettingsPanel />}
        </main>

        {/* Daily Quote */}
        <footer className={`mt-12 text-center ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          <div className={`inline-block px-8 py-4 rounded-2xl ${
            isDark ? 'bg-slate-800/50' : 'bg-white/50'
          } backdrop-blur-sm`}>
            <p className="text-lg italic mb-2">
              "The present moment is the only time over which we have dominion."
            </p>
            <p className="text-sm">— Thích Nhất Hạnh</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
