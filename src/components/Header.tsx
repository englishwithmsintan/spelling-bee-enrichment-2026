import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  GraduationCap, 
  Headphones, 
  Award, 
  Trophy, 
  Volume2, 
  VolumeX, 
  Menu, 
  X,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Calendar,
  Sparkles,
  Users,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Plus
} from 'lucide-react';
import { sound } from './SoundManager';
import { ClassroomScores } from '../types';

export interface StageInfo {
  id: string;
  number: number;
  time: string;
  minutes: number;
  targetRange: string;
  title: string;
  shortLabel: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const MEETING_STAGES: StageInfo[] = [
  {
    id: 'stage-1-warmup',
    number: 1,
    time: '10 min',
    minutes: 10,
    targetRange: '0:00 – 10:00',
    title: 'Warm-Up & Ear Training',
    shortLabel: '1. Warm-Up',
    subtitle: '10-word diagnostic baseline pre-test & ear training for origin patterns',
    icon: CheckCircle2
  },
  {
    id: 'stage-2-mastery',
    number: 2,
    time: '25 min',
    minutes: 25,
    targetRange: '10:00 – 35:00',
    title: 'Origin Patterns Lab (Latin, French, Greek, German, Italian)',
    shortLabel: '2. Origin Lab',
    subtitle: 'How to distinguish words by origin, 6 language decoders & 140+ Loan Words vault',
    icon: GraduationCap
  },
  {
    id: 'stage-3-stations',
    number: 3,
    time: '20 min',
    minutes: 20,
    targetRange: '35:00 – 55:00',
    title: 'Word Lab & Rotation Stations',
    shortLabel: '3. Word Lab',
    subtitle: '3 rotation stations: Origin listening dictation, 185+ study cards & quiz',
    icon: Headphones
  },
  {
    id: 'stage-4-mockbee',
    number: 4,
    time: '25 min',
    minutes: 25,
    targetRange: '55:00 – 80:00',
    title: 'Homophone Arena & Stage Mic',
    shortLabel: '4. Homophones & Bee',
    subtitle: 'Rule 4 Homophone showdown, Jacques Bailly stage mic & 30 mystery boxes',
    icon: Award
  },
  {
    id: 'stage-5-wrapup',
    number: 5,
    time: '10 min',
    minutes: 10,
    targetRange: '80:00 – 90:00',
    title: 'Post-Test & Etymology Star',
    shortLabel: '5. Post-Test & Star',
    subtitle: '10-word post-test growth delta (+pts gained) & Etymology Champion award',
    icon: Trophy
  }
];

interface HeaderProps {
  isTeacherMode: boolean;
  setIsTeacherMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  activeStage: string;
  setActiveStage: (stageId: string) => void;
  masteryPercentage?: number;
  genAlphaMode: boolean;
  setGenAlphaMode: (val: boolean) => void;
  isHeaderCollapsed: boolean;
  setIsHeaderCollapsed: (val: boolean) => void;
  teamScores: ClassroomScores;
  onAwardTeamScore?: (team: 'A' | 'B', pts: number) => void;
  onOpenAgenda: () => void;
}

export default function Header({
  isTeacherMode,
  setIsTeacherMode,
  soundEnabled,
  setSoundEnabled,
  activeStage,
  setActiveStage,
  masteryPercentage = 0,
  genAlphaMode,
  setGenAlphaMode,
  isHeaderCollapsed,
  setIsHeaderCollapsed,
  teamScores,
  onAwardTeamScore,
  onOpenAgenda
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 90-minute session countdown timer (in seconds: 90 * 60 = 5400)
  const [secondsLeft, setSecondsLeft] = useState<number>(() => {
    const saved = localStorage.getItem('spelling_90m_timer_seconds');
    return saved !== null ? parseInt(saved, 10) : 5400;
  });
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          const next = prev - 1;
          localStorage.setItem('spelling_90m_timer_seconds', next.toString());
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, secondsLeft]);

  const toggleTimer = () => {
    setTimerRunning(prev => !prev);
    sound.playClick();
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setSecondsLeft(5400);
    localStorage.setItem('spelling_90m_timer_seconds', '5400');
    sound.playClick();
  };

  const addFiveMinutes = () => {
    setSecondsLeft(prev => {
      const next = prev + 300;
      localStorage.setItem('spelling_90m_timer_seconds', next.toString());
      return next;
    });
    sound.playClick();
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    sound.enabled = newVal;
    sound.playClick();
  };

  const handleStageClick = (stageId: string) => {
    setActiveStage(stageId);
    setIsMobileMenuOpen(false);
    sound.playClick();
  };

  // Determine current active stage index & object
  const activeStageIndex = MEETING_STAGES.findIndex(s => s.id === activeStage);
  const currentStageObj = MEETING_STAGES[activeStageIndex] || MEETING_STAGES[0];

  // =========================================================================
  // 1. COLLAPSED / COMPACT MINI-RIBBON (MAXIMIZES PROJECTOR / SCREEN HEIGHT)
  // =========================================================================
  if (isHeaderCollapsed) {
    return (
      <header className="bg-white/95 backdrop-blur-md text-slate-900 border-b-3 border-[#560e51] sticky top-0 z-50 shadow-[0_4px_12px_rgba(86,14,81,0.12)] transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2">
          
          {/* Left: Active Stage Name & Stage Jumpers */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#560e51] text-[#78c222] font-black text-sm flex items-center justify-center shrink-0 border border-[#560e51] shadow-sm">
              {currentStageObj.number}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-black uppercase tracking-tight text-slate-950 truncate">
                  Stage {currentStageObj.number}: {currentStageObj.shortLabel}
                </span>
                <span className="text-[10px] font-mono font-black bg-[#78c222] text-[#560e51] px-1.5 py-0.2 rounded shrink-0">
                  {currentStageObj.time}
                </span>
              </div>
            </div>

            {/* Quick 1-5 Stage Quick Jump Buttons */}
            <div className="hidden md:flex items-center gap-1 ml-1 pl-2.5 border-l border-slate-200">
              {MEETING_STAGES.map((st) => (
                <button
                  key={st.id}
                  onClick={() => handleStageClick(st.id)}
                  title={`Jump to Stage ${st.number}: ${st.title} (${st.time})`}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-black transition-all cursor-pointer border ${
                    activeStage === st.id
                      ? 'bg-[#560e51] text-[#78c222] border-[#560e51] shadow-sm'
                      : 'bg-slate-50 hover:bg-fuchsia-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {st.number}
                </button>
              ))}
            </div>
          </div>

          {/* Center: Live Timer and Scores */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Countdown Timer */}
            <div className="flex items-center gap-1.5 bg-[#fefaf0] border border-[#560e51] px-2.5 py-1 rounded-xl text-xs font-mono font-black shadow-xs">
              <Clock className="w-3.5 h-3.5 text-[#9b2c98]" />
              <span className={secondsLeft < 600 ? 'text-red-600 animate-pulse' : 'text-slate-900'}>
                {formatTimer(secondsLeft)}
              </span>
              <button
                onClick={toggleTimer}
                title={timerRunning ? 'Pause' : 'Start'}
                className="p-0.5 text-[#560e51] hover:text-[#78c222] cursor-pointer"
              >
                {timerRunning ? <Pause className="w-3.5 h-3.5 text-amber-700" /> : <Play className="w-3.5 h-3.5 text-emerald-700" />}
              </button>
            </div>

            {/* Scoreboard Pill */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-black bg-fuchsia-50 border border-fuchsia-200 px-2.5 py-1 rounded-xl">
              <span className="text-emerald-700">🐝 {teamScores.teamA}</span>
              <span className="text-slate-300">|</span>
              <span className="text-indigo-700">✨ {teamScores.teamB}</span>
              {isTeacherMode && onAwardTeamScore && (
                <div className="flex gap-1 ml-1 pl-1 border-l border-fuchsia-300">
                  <button
                    onClick={() => { onAwardTeamScore('A', 10); sound.playCorrect(); }}
                    title="+10 Pts Honeybees"
                    className="text-[10px] px-1 bg-emerald-100 text-emerald-800 rounded font-black hover:bg-emerald-200"
                  >
                    +10A
                  </button>
                  <button
                    onClick={() => { onAwardTeamScore('B', 10); sound.playCorrect(); }}
                    title="+10 Pts Spellbinders"
                    className="text-[10px] px-1 bg-indigo-100 text-indigo-800 rounded font-black hover:bg-indigo-200"
                  >
                    +10B
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Sound & EXPAND HEADER BUTTON */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleSound}
              className={`p-1.5 rounded-lg border border-[#560e51] cursor-pointer ${soundEnabled ? 'bg-[#78c222] text-[#560e51]' : 'bg-slate-100 text-slate-500'}`}
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            </button>

            {/* EXPAND BUTTON */}
            <button
              onClick={() => {
                setIsHeaderCollapsed(false);
                sound.playClick();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
              title="Expand full header with all controls"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              <span>Show Header ▾</span>
            </button>
          </div>

        </div>
      </header>
    );
  }

  // =========================================================================
  // 2. FULL EXPANDED HEADER (ALL STAGE CONTROLS, TIMERS & TEACHER SETTINGS)
  // =========================================================================
  return (
    <header className="bg-white text-slate-900 border-b-4 border-[#560e51] sticky top-0 z-50 shadow-[0_4px_0_0_#560e51] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* TOP UTILITY & BRANDING BAR */}
        <div className="flex items-center justify-between py-2.5 sm:py-3.5 border-b-2 border-fuchsia-100">
          
          {/* Brand & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-[#560e51] text-[#78c222] p-2.5 sm:p-3 rounded-2xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222] flex items-center justify-center shrink-0">
              <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#9b2c98] font-mono leading-none">
                  SDIT Auliya · 90-Minute Enrichment Session
                </span>
                <span className="hidden md:inline-flex bg-[#78c222] text-[#560e51] text-[10px] font-black uppercase px-2 py-0.2 rounded-full border border-[#560e51]">
                  Scripps 2024–2025
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-black font-sans tracking-tight text-slate-950 uppercase flex items-center gap-2 mt-0.5">
                <span>Words of the Champions</span>
              </h1>
            </div>
          </div>

          {/* Center-Right Tools: Timer, Scoreboard, and Teacher Controls */}
          <div className="hidden lg:flex items-center space-x-2.5">
            
            {/* 90-Minute Class Countdown Timer */}
            <div className="bg-[#fefaf0] border-2 border-[#560e51] px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_#560e51] flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs font-mono font-black text-[#560e51]">
                <Clock className="w-4 h-4 text-[#9b2c98]" />
                <span className={`text-sm ${secondsLeft < 600 ? 'text-red-600 animate-pulse' : 'text-slate-900'}`}>
                  {formatTimer(secondsLeft)}
                </span>
              </div>
              <div className="flex items-center gap-1 border-l-2 border-fuchsia-200 pl-2">
                <button
                  onClick={toggleTimer}
                  title={timerRunning ? 'Pause Class Timer' : 'Start 90-Min Class Timer'}
                  className="p-1 rounded-lg hover:bg-fuchsia-100 text-[#560e51] cursor-pointer transition-colors"
                >
                  {timerRunning ? <Pause className="w-3.5 h-3.5 text-amber-700" /> : <Play className="w-3.5 h-3.5 text-emerald-700" />}
                </button>
                <button
                  onClick={addFiveMinutes}
                  title="Extend +5 Minutes"
                  className="px-1.5 py-0.5 text-[10px] font-mono font-black rounded bg-fuchsia-100 hover:bg-fuchsia-200 text-[#560e51] cursor-pointer"
                >
                  +5m
                </button>
                <button
                  onClick={resetTimer}
                  title="Reset to 90:00"
                  className="p-1 rounded-lg hover:bg-fuchsia-100 text-slate-500 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Quick Classroom Team Scoreboard */}
            <div className="bg-[#fdf2fe] border-2 border-[#560e51] px-3 py-1.5 rounded-xl shadow-[2px_2px_0px_0px_#560e51] flex items-center gap-2.5 text-xs font-black">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-700">🐝 Honeybees:</span>
                <span className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300 text-emerald-800">
                  {teamScores.teamA}
                </span>
                {onAwardTeamScore && isTeacherMode && (
                  <button
                    onClick={() => { onAwardTeamScore('A', 10); sound.playCorrect(); }}
                    title="+10 Pts for Team A"
                    className="p-1 rounded bg-emerald-100 hover:bg-emerald-200 text-emerald-800 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                )}
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <span className="text-indigo-700">✨ Spellbinders:</span>
                <span className="font-mono bg-white px-2 py-0.5 rounded border border-indigo-300 text-indigo-800">
                  {teamScores.teamB}
                </span>
                {onAwardTeamScore && isTeacherMode && (
                  <button
                    onClick={() => { onAwardTeamScore('B', 10); sound.playCorrect(); }}
                    title="+10 Pts for Team B"
                    className="p-1 rounded bg-indigo-100 hover:bg-indigo-200 text-indigo-800 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* 90-Min Agenda Cheatsheet Button */}
            <button
              onClick={onOpenAgenda}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight bg-white hover:bg-fuchsia-50 text-[#560e51] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
              title="View full 90-minute schedule"
            >
              <Calendar className="w-3.5 h-3.5 text-[#9b2c98]" />
              <span>90m Plan</span>
            </button>

            {/* Teacher / Student Toggle */}
            <div className="bg-[#fdf2fe] p-1 rounded-xl border-2 border-[#560e51] flex items-center shadow-[2px_2px_0px_0px_#560e51]">
              <button
                onClick={() => {
                  setIsTeacherMode(false);
                  sound.playClick();
                }}
                className={`px-2 py-1 rounded-lg text-xs font-black uppercase tracking-wide cursor-pointer transition-all ${
                  !isTeacherMode
                    ? 'bg-[#78c222] text-[#560e51] border border-[#560e51] shadow-[1px_1px_0px_0px_#560e51]'
                    : 'text-[#9b2c98]'
                }`}
              >
                Student
              </button>
              <button
                onClick={() => {
                  setIsTeacherMode(true);
                  sound.playClick();
                }}
                className={`px-2 py-1 rounded-lg text-xs font-black uppercase tracking-wide cursor-pointer transition-all ${
                  isTeacherMode
                    ? 'bg-[#560e51] text-white border border-[#560e51] shadow-[1px_1px_0px_0px_#78c222]'
                    : 'text-[#9b2c98]'
                }`}
              >
                Teacher
              </button>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer transition-all ${
                soundEnabled ? 'bg-[#78c222] text-[#560e51]' : 'bg-slate-200 text-slate-600'
              }`}
              title={soundEnabled ? 'Mute' : 'Unmute'}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Aura Mode Switch */}
            <button
              onClick={() => {
                const nv = !genAlphaMode;
                setGenAlphaMode(nv);
                if (nv) sound.playCorrect(); else sound.playClick();
              }}
              className={`p-2 rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer text-xs font-black ${
                genAlphaMode ? 'bg-[#560e51] text-[#78c222] animate-pulse' : 'bg-white text-slate-700'
              }`}
              title="Aura Mode (+orthographic confidence)"
            >
              ⚡
            </button>

            {/* HIDE / COLLAPSE HEADER BUTTON (TOP BAR) */}
            <button
              onClick={() => {
                setIsHeaderCollapsed(true);
                sound.playClick();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight bg-fuchsia-100 hover:bg-fuchsia-200 text-[#560e51] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
              title="Hide header to maximize workspace for projector/slides"
            >
              <ChevronUp className="w-4 h-4 text-[#560e51]" />
              <span>Hide Header ▴</span>
            </button>

          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => {
                setIsHeaderCollapsed(true);
                sound.playClick();
              }}
              className="p-2 rounded-xl border-2 border-[#560e51] bg-fuchsia-100 text-[#560e51] shadow-[1px_1px_0px_0px_#560e51]"
              title="Collapse Header"
            >
              <ChevronUp className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAgenda}
              className="p-2 rounded-xl border-2 border-[#560e51] bg-[#fdf2fe] text-[#560e51] shadow-[1px_1px_0px_0px_#560e51] text-xs font-bold"
              title="90-Min Schedule"
            >
              <Calendar className="w-4 h-4" />
            </button>

            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border-2 border-[#560e51] shadow-[1px_1px_0px_0px_#560e51] ${
                soundEnabled ? 'bg-[#78c222] text-[#560e51]' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border-2 border-[#560e51] bg-fuchsia-100 text-[#560e51] shadow-[1.5px_1.5px_0px_0px_#560e51]"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>

        {/* 5-STAGE NAVIGATION STEPPER ROW */}
        <div className="py-2.5">
          <nav className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar" aria-label="Stages">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 overflow-x-auto no-scrollbar py-0.5">
              {MEETING_STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                const isActive = activeStage === stage.id;
                const isPassed = activeStageIndex > idx;

                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageClick(stage.id)}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-tight transition-all duration-150 whitespace-nowrap cursor-pointer shrink-0 border-2 border-[#560e51] ${
                      isActive
                        ? 'bg-[#560e51] text-white shadow-[3px_3px_0px_0px_#78c222] translate-y-[-1px]'
                        : isPassed
                        ? 'bg-fuchsia-50 text-[#560e51] shadow-[2px_2px_0px_0px_#560e51] hover:bg-fuchsia-100'
                        : 'bg-white text-slate-700 shadow-[2px_2px_0px_0px_#560e51] hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono font-black ${
                      isActive 
                        ? 'bg-[#78c222] text-[#560e51]' 
                        : isPassed
                        ? 'bg-[#560e51] text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {stage.number}
                    </div>

                    <span className="font-extrabold">{stage.shortLabel}</span>

                    {/* Time Duration Badge */}
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-black ${
                      isActive
                        ? 'bg-[#78c222] text-[#560e51]'
                        : 'bg-fuchsia-100 text-[#560e51]'
                    }`}>
                      {stage.time}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Collapse Trigger in Stepper Bar */}
            <button
              onClick={() => {
                setIsHeaderCollapsed(true);
                sound.playClick();
              }}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border-2 border-[#560e51] bg-fuchsia-100 hover:bg-fuchsia-200 text-[#560e51] shadow-[2px_2px_0px_0px_#560e51] shrink-0"
              title="Hide header to maximize workspace for projector/slides"
            >
              <ChevronUp className="h-3.5 w-3.5" />
              <span>Hide Header ▴</span>
            </button>
          </nav>
        </div>

        {/* MOBILE NAVIGATION MENU */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-[#560e51] py-3.5 pb-4 space-y-3 animate-fade-in select-none">
            
            {/* Timer & Scores in Mobile */}
            <div className="flex items-center justify-between p-2.5 bg-[#fefaf0] rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]">
              <div className="flex items-center gap-1.5 text-xs font-mono font-black text-[#560e51]">
                <Clock className="w-4 h-4 text-[#9b2c98]" />
                <span>{formatTimer(secondsLeft)} Left</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleTimer}
                  className="px-2 py-1 text-xs font-black bg-[#78c222] text-[#560e51] rounded border border-[#560e51]"
                >
                  {timerRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={resetTimer}
                  className="p-1 text-slate-600 hover:text-slate-900"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono pl-1">
              90-Minute Teaching Stages
            </p>
            
            <div className="grid grid-cols-1 gap-2">
              {MEETING_STAGES.map((stage) => {
                const Icon = stage.icon;
                const isActive = activeStage === stage.id;
                return (
                  <button
                    key={stage.id}
                    onClick={() => handleStageClick(stage.id)}
                    className={`flex items-center justify-between p-3 rounded-xl text-xs font-black uppercase tracking-tight border-2 border-[#560e51] cursor-pointer ${
                      isActive
                        ? 'bg-[#560e51] text-white shadow-[2px_2px_0px_0px_#78c222]'
                        : 'bg-white text-slate-800 shadow-[2px_2px_0px_0px_#560e51]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-black ${
                        isActive ? 'bg-[#78c222] text-[#560e51]' : 'bg-fuchsia-100 text-[#560e51]'
                      }`}>
                        {stage.number}
                      </div>
                      <span>{stage.title}</span>
                    </div>
                    <span className="font-mono text-[10px] bg-fuchsia-100 text-[#560e51] px-2 py-0.5 rounded-full">
                      {stage.time}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Mode Switch & Collapse */}
            <div className="flex items-center justify-between pt-2 border-t border-fuchsia-200">
              <span className="text-xs font-mono font-black text-[#560e51]">Role:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setIsTeacherMode(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-black ${!isTeacherMode ? 'bg-[#78c222] text-[#560e51] border border-[#560e51]' : 'text-slate-600'}`}
                >
                  Student
                </button>
                <button
                  onClick={() => setIsTeacherMode(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-black ${isTeacherMode ? 'bg-[#560e51] text-white border border-[#560e51]' : 'text-slate-600'}`}
                >
                  Teacher
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setIsHeaderCollapsed(true);
                sound.playClick();
              }}
              className="w-full py-2 bg-fuchsia-100 text-[#560e51] font-black text-xs uppercase rounded-xl border border-[#560e51] flex items-center justify-center gap-1.5 mt-2"
            >
              <ChevronUp className="w-4 h-4" />
              <span>Hide Header (Focus View)</span>
            </button>

          </div>
        )}

      </div>
    </header>
  );
}
