
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

interface FocusTimerProps {
  wellnessData: any;
}

const FocusTimer: React.FC<FocusTimerProps> = ({ wellnessData }) => {
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState<'focus' | 'short-break' | 'long-break'>('focus');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const timerPresets = {
    focus: [15, 25, 45, 60],
    'short-break': [5],
    'long-break': [15]
  };

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    
    if (soundEnabled) {
      // Play notification sound
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBj2U2/LZeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcCCQ==');
      audio.play().catch(() => {});
    }

    wellnessData.addSession({
      type: sessionType,
      duration: selectedDuration
    });

    toast({
      title: "Session Complete! 🎉",
      description: `Great job! You completed a ${selectedDuration}-minute ${sessionType.replace('-', ' ')} session.`,
    });
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration * 60);
  };

  const selectDuration = (duration: number) => {
    setSelectedDuration(duration);
    setTimeLeft(duration * 60);
    setIsRunning(false);
  };

  const selectSessionType = (type: 'focus' | 'short-break' | 'long-break') => {
    setSessionType(type);
    const defaultDuration = timerPresets[type][0];
    setSelectedDuration(defaultDuration);
    setTimeLeft(defaultDuration * 60);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Session Type Selector */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { key: 'focus', label: 'Focus Session', emoji: '🎯' },
              { key: 'short-break', label: 'Short Break', emoji: '☕' },
              { key: 'long-break', label: 'Long Break', emoji: '🌸' }
            ].map(({ key, label, emoji }) => (
              <Button
                key={key}
                variant={sessionType === key ? "default" : "ghost"}
                onClick={() => selectSessionType(key as any)}
                className={`flex items-center gap-2 ${
                  sessionType === key
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>{emoji}</span>
                {label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timer Display */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Circular Progress */}
            <div className="relative w-64 h-64 mx-auto">
              <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-slate-300 dark:text-slate-600"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${progress * 2.827} 282.7`}
                  className="transition-all duration-300 ease-out"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-slate-800 dark:text-white mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                    {sessionType.replace('-', ' ')}
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-12 h-12 rounded-full"
              >
                {soundEnabled ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
              </Button>
              
              <Button
                size="lg"
                onClick={toggleTimer}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isRunning ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
              
              <Button
                size="icon"
                variant="ghost"
                onClick={resetTimer}
                className="w-12 h-12 rounded-full"
              >
                <RotateCcw className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Duration Presets */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 text-center">
            Duration Options
          </h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {timerPresets[sessionType].map((duration) => (
              <Button
                key={duration}
                variant={selectedDuration === duration ? "default" : "outline"}
                onClick={() => selectDuration(duration)}
                className={`px-6 py-3 rounded-full ${
                  selectedDuration === duration
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                {duration} min
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FocusTimer;
