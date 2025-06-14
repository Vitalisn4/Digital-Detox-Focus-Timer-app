
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Trophy, Target, Clock, Flame } from 'lucide-react';

interface WellnessDashboardProps {
  wellnessData: any;
}

const WellnessDashboard: React.FC<WellnessDashboardProps> = ({ wellnessData }) => {
  const { stats } = wellnessData;
  
  const today = new Date().toISOString().split('T')[0];
  const todayFocusTime = stats.weeklyData.find(d => d.date === today)?.focusTime || 0;
  const dailyProgress = (todayFocusTime / stats.dailyGoal) * 100;

  const badges = [
    { id: 'first-session', name: 'First Steps', description: 'Complete your first focus session', unlocked: stats.sessionsCompleted >= 1, icon: '🌱' },
    { id: 'week-streak', name: 'Consistent', description: '7-day focus streak', unlocked: stats.currentStreak >= 7, icon: '🔥' },
    { id: 'century', name: 'Centurion', description: '100 total focus hours', unlocked: stats.totalFocusTime >= 6000, icon: '💯' },
    { id: 'dedication', name: 'Dedicated', description: '30-day focus streak', unlocked: stats.currentStreak >= 30, icon: '🏆' },
    { id: 'master', name: 'Focus Master', description: '500 sessions completed', unlocked: stats.sessionsCompleted >= 500, icon: '👑' },
    { id: 'zen', name: 'Zen Mode', description: '1000 total focus hours', unlocked: stats.totalFocusTime >= 60000, icon: '🧘' }
  ];

  const chartConfig = {
    focusTime: {
      label: "Focus Time (minutes)",
      color: "#3B82F6",
    },
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Focus Time</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {formatTime(stats.totalFocusTime)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-full">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Sessions Completed</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {stats.sessionsCompleted}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-full">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Current Streak</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {stats.currentStreak} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-full">
                <Trophy className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Longest Streak</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-white">
                  {stats.longestStreak} days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Goal Progress */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-white">Today's Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600 dark:text-slate-400">
                {formatTime(todayFocusTime)} of {formatTime(stats.dailyGoal)} goal
              </span>
              <span className="text-slate-800 dark:text-white font-medium">
                {Math.round(dailyProgress)}%
              </span>
            </div>
            <Progress value={dailyProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Weekly Chart */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-white">Weekly Focus Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyData}>
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                  className="text-slate-600 dark:text-slate-400"
                />
                <YAxis 
                  tickFormatter={(value) => `${value}m`}
                  className="text-slate-600 dark:text-slate-400"
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar 
                  dataKey="focusTime" 
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Achievement Badges */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-white">Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border-yellow-400/50 shadow-lg'
                    : 'bg-slate-100/50 dark:bg-slate-800/50 border-slate-300/50 dark:border-slate-600/50 opacity-60'
                }`}
              >
                <div className="text-center space-y-2">
                  <div className={`text-3xl ${badge.unlocked ? 'animate-bounce' : 'grayscale'}`}>
                    {badge.icon}
                  </div>
                  <h3 className={`font-semibold ${
                    badge.unlocked ? 'text-slate-800 dark:text-white' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {badge.name}
                  </h3>
                  <p className={`text-xs ${
                    badge.unlocked ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'
                  }`}>
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WellnessDashboard;
