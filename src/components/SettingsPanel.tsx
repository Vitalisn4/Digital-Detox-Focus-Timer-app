
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Download, Upload, Volume2, VolumeX, Palette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SettingsPanel = () => {
  const [settings, setSettings] = useState({
    dailyGoal: 120, // minutes
    soundEnabled: true,
    notifications: true,
    theme: 'blue',
    ambientSound: 'none',
    autoBreakReminder: true,
    breakReminderInterval: 30 // minutes
  });

  const [ambientVolume, setAmbientVolume] = useState(50);
  const [currentAmbientSound, setCurrentAmbientSound] = useState<HTMLAudioElement | null>(null);

  const themes = [
    { id: 'blue', name: 'Ocean Blue', gradient: 'from-blue-400 to-cyan-400' },
    { id: 'purple', name: 'Purple Dream', gradient: 'from-purple-400 to-pink-400' },
    { id: 'green', name: 'Forest Green', gradient: 'from-green-400 to-emerald-400' },
    { id: 'orange', name: 'Sunset Orange', gradient: 'from-orange-400 to-red-400' }
  ];

  const ambientSounds = [
    { id: 'none', name: 'None', file: null },
    { id: 'rain', name: 'Rain', file: '/sounds/rain.mp3' },
    { id: 'forest', name: 'Forest', file: '/sounds/forest.mp3' },
    { id: 'ocean', name: 'Ocean Waves', file: '/sounds/ocean.mp3' },
    { id: 'whitenoise', name: 'White Noise', file: '/sounds/whitenoise.mp3' }
  ];

  useEffect(() => {
    const savedSettings = localStorage.getItem('wellness-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('wellness-settings', JSON.stringify(settings));
    toast({
      title: "Settings Saved! ✅",
      description: "Your preferences have been updated successfully."
    });
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const playAmbientSound = (soundId: string) => {
    // Stop current sound
    if (currentAmbientSound) {
      currentAmbientSound.pause();
      setCurrentAmbientSound(null);
    }

    const sound = ambientSounds.find(s => s.id === soundId);
    if (sound && sound.file) {
      // In a real app, you'd load actual audio files
      // For demo purposes, we'll just show the selection
      updateSetting('ambientSound', soundId);
      toast({
        title: `${sound.name} Selected`,
        description: "Ambient sound will play during focus sessions."
      });
    } else {
      updateSetting('ambientSound', 'none');
    }
  };

  const exportData = () => {
    const sessions = localStorage.getItem('wellness-sessions');
    const stats = localStorage.getItem('wellness-stats');
    const settingsData = localStorage.getItem('wellness-settings');

    const exportData = {
      sessions: sessions ? JSON.parse(sessions) : [],
      stats: stats ? JSON.parse(stats) : {},
      settings: settingsData ? JSON.parse(settingsData) : {}
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `wellness-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported! 📁",
      description: "Your wellness data has been downloaded successfully."
    });
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.sessions) localStorage.setItem('wellness-sessions', JSON.stringify(data.sessions));
        if (data.stats) localStorage.setItem('wellness-stats', JSON.stringify(data.stats));
        if (data.settings) {
          localStorage.setItem('wellness-settings', JSON.stringify(data.settings));
          setSettings(data.settings);
        }

        toast({
          title: "Data Imported! 🎉",
          description: "Your wellness data has been restored successfully."
        });
      } catch (error) {
        toast({
          title: "Import Failed ❌",
          description: "Invalid file format. Please select a valid JSON file.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* General Settings */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-white">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="dailyGoal" className="text-slate-700 dark:text-slate-300">
              Daily Focus Goal (minutes)
            </Label>
            <Input
              id="dailyGoal"
              type="number"
              value={settings.dailyGoal}
              onChange={(e) => updateSetting('dailyGoal', Number(e.target.value))}
              className="bg-white/50 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-700 dark:text-slate-300">Sound Notifications</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Play sound when timer completes
              </p>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => updateSetting('soundEnabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-slate-700 dark:text-slate-300">Break Reminders</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Remind me to take breaks
              </p>
            </div>
            <Switch
              checked={settings.autoBreakReminder}
              onCheckedChange={(checked) => updateSetting('autoBreakReminder', checked)}
            />
          </div>

          {settings.autoBreakReminder && (
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300">
                Break Reminder Interval: {settings.breakReminderInterval} minutes
              </Label>
              <Slider
                value={[settings.breakReminderInterval]}
                onValueChange={([value]) => updateSetting('breakReminderInterval', value)}
                max={60}
                min={15}
                step={5}
                className="w-full"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Theme Customization */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-white flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme & Appearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {themes.map((theme) => (
              <Button
                key={theme.id}
                variant={settings.theme === theme.id ? "default" : "outline"}
                onClick={() => updateSetting('theme', theme.id)}
                className={`h-20 flex flex-col items-center justify-center gap-2 ${
                  settings.theme === theme.id 
                    ? `bg-gradient-to-r ${theme.gradient} text-white` 
                    : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.gradient}`} />
                <span className="text-sm">{theme.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ambient Sounds */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-white flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            Ambient Sounds
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ambientSounds.map((sound) => (
              <Button
                key={sound.id}
                variant={settings.ambientSound === sound.id ? "default" : "outline"}
                onClick={() => playAmbientSound(sound.id)}
                className={`h-16 ${
                  settings.ambientSound === sound.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'border-slate-300 dark:border-slate-600'
                }`}
              >
                {sound.id === 'none' ? <VolumeX className="h-5 w-5 mr-2" /> : <Volume2 className="h-5 w-5 mr-2" />}
                {sound.name}
              </Button>
            ))}
          </div>

          {settings.ambientSound !== 'none' && (
            <div className="space-y-2">
              <Label className="text-slate-700 dark:text-slate-300">
                Volume: {ambientVolume}%
              </Label>
              <Slider
                value={[ambientVolume]}
                onValueChange={([value]) => setAmbientVolume(value)}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-slate-800 dark:text-white">Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={exportData} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            
            <label className="cursor-pointer">
              <Button variant="outline" className="flex items-center gap-2 border-slate-300 dark:border-slate-600">
                <Upload className="h-4 w-4" />
                Import Data
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          </div>
          
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Export your wellness data for backup or import previously saved data.
          </p>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-center">
        <Button 
          onClick={saveSettings}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 text-lg"
        >
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
