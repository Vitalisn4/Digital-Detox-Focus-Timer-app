
import { useState, useEffect } from 'react';

export interface WellnessSession {
  id: string;
  type: 'focus' | 'short-break' | 'long-break';
  duration: number;
  completedAt: Date;
  date: string;
}

export interface WellnessStats {
  totalFocusTime: number;
  sessionsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  dailyGoal: number;
  weeklyData: { date: string; focusTime: number }[];
}

export const useWellnessData = () => {
  const [sessions, setSessions] = useState<WellnessSession[]>([]);
  const [stats, setStats] = useState<WellnessStats>({
    totalFocusTime: 0,
    sessionsCompleted: 0,
    currentStreak: 0,
    longestStreak: 0,
    dailyGoal: 120, // 2 hours in minutes
    weeklyData: []
  });

  useEffect(() => {
    const savedSessions = localStorage.getItem('wellness-sessions');
    const savedStats = localStorage.getItem('wellness-stats');
    
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  const addSession = (session: Omit<WellnessSession, 'id' | 'completedAt' | 'date'>) => {
    const newSession: WellnessSession = {
      ...session,
      id: Date.now().toString(),
      completedAt: new Date(),
      date: new Date().toISOString().split('T')[0]
    };

    const updatedSessions = [...sessions, newSession];
    setSessions(updatedSessions);

    // Update stats
    const newStats = calculateStats(updatedSessions);
    setStats(newStats);

    // Save to localStorage
    localStorage.setItem('wellness-sessions', JSON.stringify(updatedSessions));
    localStorage.setItem('wellness-stats', JSON.stringify(newStats));
  };

  const calculateStats = (sessions: WellnessSession[]): WellnessStats => {
    const focusSessions = sessions.filter(s => s.type === 'focus');
    const totalFocusTime = focusSessions.reduce((sum, s) => sum + s.duration, 0);
    
    // Calculate streak
    const dates = [...new Set(focusSessions.map(s => s.date))].sort().reverse();
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = new Date().toISOString().split('T')[0];
    let checkDate = new Date();

    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const hasSession = dates.includes(dateStr);
      
      if (hasSession) {
        tempStreak++;
        if (dateStr === today || i === 0) {
          currentStreak = tempStreak;
        }
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        if (i === 0) currentStreak = 0;
        tempStreak = 0;
      }
      
      checkDate.setDate(checkDate.getDate() - 1);
    }

    longestStreak = Math.max(longestStreak, tempStreak, currentStreak);

    // Weekly data
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayFocusTime = focusSessions
        .filter(s => s.date === dateStr)
        .reduce((sum, s) => sum + s.duration, 0);
      
      weeklyData.push({
        date: dateStr,
        focusTime: dayFocusTime
      });
    }

    return {
      totalFocusTime,
      sessionsCompleted: focusSessions.length,
      currentStreak,
      longestStreak,
      dailyGoal: stats.dailyGoal,
      weeklyData
    };
  };

  const updateDailyGoal = (goal: number) => {
    const newStats = { ...stats, dailyGoal: goal };
    setStats(newStats);
    localStorage.setItem('wellness-stats', JSON.stringify(newStats));
  };

  return {
    sessions,
    stats,
    addSession,
    updateDailyGoal
  };
};
