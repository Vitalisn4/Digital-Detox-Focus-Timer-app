
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Eye, Heart, Droplets, Dumbbell, RefreshCw } from 'lucide-react';

const BreakSuggestions = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [breathingTimer, setBreathingTimer] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [eyeExerciseStep, setEyeExerciseStep] = useState(0);

  const breakActivities = [
    {
      id: 'stretch',
      title: 'Neck & Shoulder Stretch',
      description: 'Relieve tension from long sitting periods',
      icon: <Dumbbell className="h-6 w-6" />,
      duration: '2 minutes',
      steps: [
        'Slowly roll your shoulders backward 5 times',
        'Gently tilt your head to the right for 15 seconds',
        'Tilt your head to the left for 15 seconds',
        'Look up and down slowly 5 times',
        'Roll your head in a gentle circle'
      ]
    },
    {
      id: 'hydration',
      title: 'Hydration Break',
      description: 'Stay hydrated for better focus',
      icon: <Droplets className="h-6 w-6" />,
      duration: '1 minute',
      steps: [
        'Drink a full glass of water slowly',
        'Take 5 deep breaths',
        'Notice how the water makes you feel refreshed'
      ]
    },
    {
      id: 'movement',
      title: 'Quick Movement',
      description: 'Get your blood flowing',
      icon: <Heart className="h-6 w-6" />,
      duration: '3 minutes',
      steps: [
        'Stand up and march in place for 30 seconds',
        'Do 10 gentle jumping jacks',
        'Stretch your arms above your head',
        'Touch your toes (or as far as comfortable)',
        'Take 3 deep breaths'
      ]
    }
  ];

  // Breathing Exercise Logic
  useEffect(() => {
    if (activeExercise === 'breathing') {
      const interval = setInterval(() => {
        setBreathingTimer(prev => {
          if (breathingPhase === 'inhale' && prev >= 4) {
            setBreathingPhase('hold');
            return 0;
          } else if (breathingPhase === 'hold' && prev >= 4) {
            setBreathingPhase('exhale');
            return 0;
          } else if (breathingPhase === 'exhale' && prev >= 6) {
            setBreathingPhase('inhale');
            return 0;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [activeExercise, breathingPhase]);

  // Eye Exercise Logic
  const eyeExercises = [
    'Look at something 20 feet away for 20 seconds',
    'Blink slowly 10 times',
    'Look up, down, left, right (hold each for 2 seconds)',
    'Make circles with your eyes - 5 clockwise, 5 counter-clockwise',
    'Focus on your finger, then something far away (repeat 5 times)',
    'Close your eyes and rest for 10 seconds'
  ];

  const startBreathingExercise = () => {
    setActiveExercise('breathing');
    setBreathingTimer(0);
    setBreathingPhase('inhale');
  };

  const startEyeExercise = () => {
    setActiveExercise('eyes');
    setEyeExerciseStep(0);
  };

  const nextEyeStep = () => {
    if (eyeExerciseStep < eyeExercises.length - 1) {
      setEyeExerciseStep(prev => prev + 1);
    } else {
      setActiveExercise(null);
      setEyeExerciseStep(0);
    }
  };

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
    }
  };

  const getBreathingCircleSize = () => {
    const baseSize = 120;
    const expansion = 40;
    
    switch (breathingPhase) {
      case 'inhale': return `${baseSize + (expansion * breathingTimer / 4)}px`;
      case 'hold': return `${baseSize + expansion}px`;
      case 'exhale': return `${baseSize + expansion - (expansion * breathingTimer / 6)}px`;
      default: return `${baseSize}px`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Quick Exercise Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Breathing Exercise */}
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={startBreathingExercise}>
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-blue-500/20 rounded-full w-fit mx-auto mb-4">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
              Breathing Exercise
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              2-minute guided breathing
            </p>
          </CardContent>
        </Card>

        {/* Eye Rest Exercise */}
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={startEyeExercise}>
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-green-500/20 rounded-full w-fit mx-auto mb-4">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
              Eye Rest Exercise
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              20-20-20 rule & more
            </p>
          </CardContent>
        </Card>

        {/* Random Activity */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => {
                const randomActivity = breakActivities[Math.floor(Math.random() * breakActivities.length)];
                setActiveExercise(randomActivity.id);
              }}>
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-purple-500/20 rounded-full w-fit mx-auto mb-4">
              <RefreshCw className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
              Surprise Me
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Random mindful activity
            </p>
          </CardContent>
        </Card>

        {breakActivities.slice(0, 1).map((activity) => (
          <Card key={activity.id} 
                className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setActiveExercise(activity.id)}>
            <CardContent className="p-6 text-center">
              <div className="p-3 bg-orange-500/20 rounded-full w-fit mx-auto mb-4">
                {activity.icon}
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-2">
                {activity.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {activity.duration}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Exercise Display */}
      {activeExercise === 'breathing' && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <div className="text-center space-y-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Guided Breathing Exercise
              </h2>
              
              {/* Breathing Circle Animation */}
              <div className="relative flex items-center justify-center h-64">
                <div 
                  className="rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-1000 ease-in-out flex items-center justify-center"
                  style={{ 
                    width: getBreathingCircleSize(), 
                    height: getBreathingCircleSize(),
                    opacity: 0.7
                  }}
                >
                  <div className="text-white font-semibold">
                    {getBreathingInstruction()}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-lg text-slate-700 dark:text-slate-300">
                  {getBreathingInstruction()} • {breathingTimer}s
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveExercise(null)}
                  className="border-slate-300 dark:border-slate-600"
                >
                  Stop Exercise
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeExercise === 'eyes' && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Eye Rest Exercise
              </h2>
              
              <div className="bg-green-500/20 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
                <Eye className="h-12 w-12 text-green-600" />
              </div>

              <div className="space-y-4">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Step {eyeExerciseStep + 1} of {eyeExercises.length}
                </div>
                <Progress value={((eyeExerciseStep + 1) / eyeExercises.length) * 100} className="h-2" />
                <p className="text-lg text-slate-700 dark:text-slate-300 font-medium">
                  {eyeExercises[eyeExerciseStep]}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={nextEyeStep}>
                    {eyeExerciseStep < eyeExercises.length - 1 ? 'Next Step' : 'Complete'}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveExercise(null)}
                    className="border-slate-300 dark:border-slate-600"
                  >
                    Stop Exercise
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Break Activity Instructions */}
      {breakActivities.find(a => a.id === activeExercise) && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-slate-800 dark:text-white flex items-center gap-3">
              {breakActivities.find(a => a.id === activeExercise)?.icon}
              {breakActivities.find(a => a.id === activeExercise)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600 dark:text-slate-400">
              {breakActivities.find(a => a.id === activeExercise)?.description}
            </p>
            <div className="space-y-3">
              {breakActivities.find(a => a.id === activeExercise)?.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">{step}</p>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              onClick={() => setActiveExercise(null)}
              className="w-full border-slate-300 dark:border-slate-600"
            >
              Complete Exercise
            </Button>
          </CardContent>
        </Card>
      )}

      {/* All Break Activities */}
      {!activeExercise && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {breakActivities.map((activity) => (
            <Card key={activity.id} 
                  className="bg-white/10 backdrop-blur-sm border-white/20 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
                  onClick={() => setActiveExercise(activity.id)}>
              <CardHeader>
                <CardTitle className="text-slate-800 dark:text-white flex items-center gap-3">
                  {activity.icon}
                  {activity.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  {activity.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    {activity.duration}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {activity.steps.length} steps
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BreakSuggestions;
