import React, { useState, useEffect } from 'react';
import Header, { MEETING_STAGES, StageInfo } from './components/Header';
import FlashcardModule from './components/FlashcardModule';
import PatternReviewLab from './components/PatternReviewLab';
import ListeningStations from './components/ListeningStations';
import MockSpellingBeeStage from './components/MockSpellingBeeStage';
import ProgressCheckModule from './components/ProgressCheckModule';
import ClassroomGames from './components/ClassroomGames';
import Meeting3MasterLesson from './components/Meeting3MasterLesson';
import HomophoneStageShowdown from './components/HomophoneStageShowdown';
import LoanWordsVault from './components/LoanWordsVault';
import OriginPatternDetective from './components/OriginPatternDetective';
import ProgressTracker from './components/ProgressTracker';
import { StudentProgress, ClassroomScores } from './types';
import { 
  ALL_WORD_STUDY_CARDS, 
  SCRIPPS_LORE
} from './data/reviewData';
import { sound } from './components/SoundManager';
import { 
  Trophy, 
  BookOpen, 
  Sparkles, 
  Headphones, 
  Award, 
  CheckCircle2, 
  Play, 
  Users, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  X, 
  Flame, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCcw,
  Scale,
  Globe,
  Calendar,
  Layers,
  HelpCircle,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const INITIAL_PROGRESS: StudentProgress = {
  vocabReviewed: [],
  patternAccuracy: {},
  preTestScore: null,
  postTestScore: null,
  mockBeeScore: null,
  grammarAccuracy: {},
  mockExamScore: null,
  mockExamCompleted: false,
  gamesPlayed: [],
  unlockedBadges: [],
  projectSaved: false
};

const INITIAL_SCORES: ClassroomScores = {
  teamA: 0,
  teamB: 0
};

export default function App() {
  // Main stage state: 'stage-1-warmup' | 'stage-2-mastery' | 'stage-3-stations' | 'stage-4-mockbee' | 'stage-5-wrapup'
  const [activeStage, setActiveStage] = useState<string>('stage-1-warmup');

  // Sub-view states inside each stage for clean, focused teaching
  const [stage1SubView, setStage1SubView] = useState<'pre-test' | 'recap'>('pre-test');
  const [stage2SubView, setStage2SubView] = useState<'origin-detective' | 'loan-words' | 'lesson'>('origin-detective');
  const [stage3SubView, setStage3SubView] = useState<'stations' | 'flashcards'>('stations');
  const [stage4SubView, setStage4SubView] = useState<'homophones' | 'mock-bee' | 'games'>('homophones');
  const [stage5SubView, setStage5SubView] = useState<'post-test' | 'celebration'>('post-test');

  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(false);
  const [genAlphaMode, setGenAlphaMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('spelling_header_collapsed') === 'true';
  });
  const [showProgressModal, setShowProgressModal] = useState<boolean>(false);
  const [showAgendaModal, setShowAgendaModal] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('spelling_header_collapsed', isHeaderCollapsed ? 'true' : 'false');
  }, [isHeaderCollapsed]);

  // Keyboard shortcut: Press 'H' to quickly collapse/expand header during classroom presentations
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'h' || e.key === 'H') &&
        !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)
      ) {
        setIsHeaderCollapsed(prev => !prev);
        sound.playClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Pre-test & Post-test scores
  const [preTestScore, setPreTestScore] = useState<number | null>(() => {
    const saved = localStorage.getItem('spelling_pre_test_score');
    return saved !== null ? parseInt(saved, 10) : null;
  });

  const [postTestScore, setPostTestScore] = useState<number | null>(() => {
    const saved = localStorage.getItem('spelling_post_test_score');
    return saved !== null ? parseInt(saved, 10) : null;
  });

  // Student progress state with LocalStorage persistence
  const [progress, setProgress] = useState<StudentProgress>(() => {
    const saved = localStorage.getItem('spelling_bee_enrichment_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_PROGRESS, ...parsed };
      } catch (e) {
        console.error('Failed to parse saved progress', e);
      }
    }
    return INITIAL_PROGRESS;
  });

  // Team scores state with LocalStorage persistence
  const [teamScores, setTeamScores] = useState<ClassroomScores>(() => {
    const saved = localStorage.getItem('spelling_bee_team_scores');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved scores', e);
      }
    }
    return INITIAL_SCORES;
  });

  useEffect(() => {
    localStorage.setItem('spelling_bee_enrichment_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('spelling_bee_team_scores', JSON.stringify(teamScores));
  }, [teamScores]);

  // Mastered words count
  const masteredCount = progress.vocabReviewed?.length || 0;
  const totalWords = ALL_WORD_STUDY_CARDS.length;

  // Session Mastery percentage (0 - 100)
  const wordScore = totalWords > 0 ? (masteredCount / totalWords) * 35 : 0;
  const preScoreContribution = preTestScore !== null ? (preTestScore / 10) * 15 : 0;
  const postScoreContribution = postTestScore !== null ? (postTestScore / 10) * 35 : 0;
  const gamesScore = Math.min(progress.gamesPlayed.length * 5, 15);
  const masteryPercentage = Math.min(100, Math.round(wordScore + preScoreContribution + postScoreContribution + gamesScore));

  const handleMarkWordReviewed = (id: string, mastered: boolean) => {
    setProgress(prev => {
      const current = prev.vocabReviewed || [];
      const updated = mastered
        ? Array.from(new Set([...current, id]))
        : current.filter(x => x !== id);
      return { ...prev, vocabReviewed: updated };
    });
  };

  const handleSaveScores = (pre: number, post: number) => {
    setPreTestScore(pre);
    setPostTestScore(post);
    localStorage.setItem('spelling_pre_test_score', pre.toString());
    localStorage.setItem('spelling_post_test_score', post.toString());
  };

  const handleAwardTeamScore = (team: 'A' | 'B', pts: number) => {
    setTeamScores(prev => ({
      ...prev,
      [team === 'A' ? 'teamA' : 'teamB']: prev[team === 'A' ? 'teamA' : 'teamB'] + pts
    }));
  };

  const handleGamePlayed = (gameKey: string) => {
    setProgress(prev => ({
      ...prev,
      gamesPlayed: Array.from(new Set([...prev.gamesPlayed, gameKey]))
    }));
  };

  const handleResetProgress = () => {
    setProgress(INITIAL_PROGRESS);
    setTeamScores(INITIAL_SCORES);
    setPreTestScore(null);
    setPostTestScore(null);
    localStorage.removeItem('spelling_bee_enrichment_progress');
    localStorage.removeItem('spelling_bee_team_scores');
    localStorage.removeItem('spelling_pre_test_score');
    localStorage.removeItem('spelling_post_test_score');
  };

  // Cross-navigation adapter for legacy links in child components
  const handleNavigateTab = (destination: string) => {
    sound.playClick();
    if (destination === 'origin-detective' || destination === 'patterns') {
      setActiveStage('stage-2-mastery');
      setStage2SubView('origin-detective');
    } else if (destination === 'loan-words') {
      setActiveStage('stage-2-mastery');
      setStage2SubView('loan-words');
    } else if (destination === 'meeting-3-mastery') {
      setActiveStage('stage-2-mastery');
      setStage2SubView('lesson');
    } else if (destination === 'word-study') {
      setActiveStage('stage-3-stations');
      setStage3SubView('flashcards');
    } else if (destination === 'listening') {
      setActiveStage('stage-3-stations');
      setStage3SubView('stations');
    } else if (destination === 'homophones') {
      setActiveStage('stage-4-mockbee');
      setStage4SubView('homophones');
    } else if (destination === 'mock-bee') {
      setActiveStage('stage-4-mockbee');
      setStage4SubView('mock-bee');
    } else if (destination === 'arcade') {
      setActiveStage('stage-4-mockbee');
      setStage4SubView('games');
    } else if (destination === 'progress-check' || destination === 'pre-test') {
      setActiveStage('stage-1-warmup');
      setStage1SubView('pre-test');
    } else if (destination === 'post-test') {
      setActiveStage('stage-5-wrapup');
      setStage5SubView('post-test');
    }
  };

  // Stage sequence helper
  const stageIndex = MEETING_STAGES.findIndex(s => s.id === activeStage);
  const currentStage = MEETING_STAGES[stageIndex] || MEETING_STAGES[0];
  const prevStage = stageIndex > 0 ? MEETING_STAGES[stageIndex - 1] : null;
  const nextStage = stageIndex < MEETING_STAGES.length - 1 ? MEETING_STAGES[stageIndex + 1] : null;

  const goToStage = (stageId: string) => {
    setActiveStage(stageId);
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-slate-900 flex flex-col font-sans selection:bg-[#78c222] selection:text-[#560e51]">
      
      {/* 5-Stage Header with 90-Minute Class Timer and Team Buzzers */}
      <Header
        activeStage={activeStage}
        setActiveStage={setActiveStage}
        isTeacherMode={isTeacherMode}
        setIsTeacherMode={setIsTeacherMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        masteryPercentage={masteryPercentage}
        genAlphaMode={genAlphaMode}
        setGenAlphaMode={setGenAlphaMode}
        isHeaderCollapsed={isHeaderCollapsed}
        setIsHeaderCollapsed={setIsHeaderCollapsed}
        teamScores={teamScores}
        onAwardTeamScore={handleAwardTeamScore}
        onOpenAgenda={() => setShowAgendaModal(true)}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* Gen Alpha Slang Mode Alert Banner */}
        {genAlphaMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-[#560e51] text-white border-3 border-[#78c222] shadow-[4px_4px_0px_0px_#78c222] flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="text-xs font-black uppercase font-mono text-[#78c222] tracking-wider">
                  CHAMPION SPELLER AURA MODE ACTIVE! (+9999 Orthographic Aura)
                </p>
                <p className="text-xs font-bold text-fuchsia-100">
                  Silent letter traps decoded, Greek root rizz unlocked, and Scripps stage confidence maxed out!
                </p>
              </div>
            </div>
            <button
              onClick={() => setGenAlphaMode(false)}
              className="px-3 py-1.5 bg-[#78c222] text-[#560e51] font-black text-xs rounded-xl uppercase tracking-tight border-2 border-white/30 cursor-pointer shrink-0"
            >
              Exit Aura
            </button>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* CURRENT STAGE OVERVIEW BANNER WITH SUB-VIEW SELECTOR     */}
        {/* ======================================================== */}
        <div className="mb-6 bg-white rounded-2xl p-4 sm:p-5 border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#560e51] text-[#78c222] font-black flex items-center justify-center text-xl shrink-0 shadow-sm border-2 border-[#560e51]">
              {currentStage.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-black uppercase text-[#9b2c98] tracking-wider">
                  Stage {currentStage.number} of 5 · Recommended: {currentStage.time} ({currentStage.targetRange})
                </span>
                <span className="text-[10px] font-mono bg-[#78c222] text-[#560e51] font-black px-2 py-0.2 rounded-full border border-[#560e51]">
                  ACTIVE
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
                {currentStage.title}
              </h2>
              <p className="text-xs font-bold text-slate-600 mt-0.5">
                {currentStage.subtitle}
              </p>
            </div>
          </div>

          {/* Clean Sub-View Toggles Specific to This Stage */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
            
            {/* Stage 1 Sub-views */}
            {activeStage === 'stage-1-warmup' && (
              <>
                <button
                  onClick={() => { setStage1SubView('pre-test'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${
                    stage1SubView === 'pre-test'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  📝 10-Word Pre-Test
                </button>
                <button
                  onClick={() => { setStage1SubView('recap'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${
                    stage1SubView === 'recap'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  ⚡ Foundational Recap
                </button>
              </>
            )}

            {/* Stage 2 Sub-views */}
            {activeStage === 'stage-2-mastery' && (
              <>
                <button
                  onClick={() => { setStage2SubView('origin-detective'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all flex items-center gap-1.5 ${
                    stage2SubView === 'origin-detective'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  <span>🔎 Origin Patterns Lab</span>
                </button>
                <button
                  onClick={() => { setStage2SubView('loan-words'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all flex items-center gap-1.5 ${
                    stage2SubView === 'loan-words'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-purple-100 text-purple-950 hover:bg-purple-200 border border-purple-300'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-purple-700" />
                  <span>Loan Words Vault (100+)</span>
                </button>
                <button
                  onClick={() => { setStage2SubView('lesson'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${
                    stage2SubView === 'lesson'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  🎓 Master Slides
                </button>
              </>
            )}

            {/* Stage 3 Sub-views */}
            {activeStage === 'stage-3-stations' && (
              <>
                <button
                  onClick={() => { setStage3SubView('stations'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${
                    stage3SubView === 'stations'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  🎧 3 Listening Stations
                </button>
                <button
                  onClick={() => { setStage3SubView('flashcards'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${
                    stage3SubView === 'flashcards'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  📖 185+ Word Study Cards
                </button>
              </>
            )}

            {/* Stage 4 Sub-views */}
            {activeStage === 'stage-4-mockbee' && (
              <>
                <button
                  onClick={() => { setStage4SubView('homophones'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all flex items-center gap-1.5 ${
                    stage4SubView === 'homophones'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border border-amber-300'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5 text-amber-600" />
                  <span>Rule 4 Homophone Arena</span>
                </button>
                <button
                  onClick={() => { setStage4SubView('mock-bee'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${
                    stage4SubView === 'mock-bee'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  🐝 Stage Mic & 30 Boxes
                </button>
                <button
                  onClick={() => { setStage4SubView('games'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${
                    stage4SubView === 'games'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  🎮 Classroom Arena
                </button>
              </>
            )}

            {/* Stage 5 Sub-views */}
            {activeStage === 'stage-5-wrapup' && (
              <>
                <button
                  onClick={() => { setStage5SubView('post-test'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${
                    stage5SubView === 'post-test'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  📝 Post-Test Check
                </button>
                <button
                  onClick={() => { setStage5SubView('celebration'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all ${
                    stage5SubView === 'celebration'
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  🌟 Delta Meter & Certificate
                </button>
              </>
            )}

            {/* Quick Next Stage Jumper */}
            {nextStage && (
              <button
                onClick={() => goToStage(nextStage.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight bg-[#78c222] hover:bg-[#6cb31b] text-[#560e51] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-1 shrink-0 ml-1"
                title={`Advance to ${nextStage.title}`}
              >
                <span>Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

          </div>
        </div>

        {/* ======================================================== */}
        {/* STAGE 1: WARM-UP & DIAGNOSTIC (10 MIN)                   */}
        {/* ======================================================== */}
        {activeStage === 'stage-1-warmup' && (
          <motion.div
            key="stage-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            {stage1SubView === 'pre-test' ? (
              <ProgressCheckModule
                preTestScore={preTestScore}
                postTestScore={postTestScore}
                onSaveScores={handleSaveScores}
                onAwardTeamScore={handleAwardTeamScore}
                genAlphaMode={genAlphaMode}
                activeMeeting="meeting-3"
                initialTab="pre-test"
              />
            ) : (
              /* Foundational Recap & Bridge Cards */
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
                <div className="flex items-center justify-between border-b-2 border-fuchsia-100 pb-3">
                  <div>
                    <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">Foundational Bridge</span>
                    <h3 className="text-xl font-black text-slate-900 uppercase">5 Core Bridge Traps Recap</h3>
                    <p className="text-xs font-bold text-slate-600 mt-1">
                      Quickly review these 5 rules on the whiteboard before introducing the French and Greek championship rules!
                    </p>
                  </div>
                  <Sparkles className="w-6 h-6 text-[#78c222]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      word: 'guardian',
                      rule: "Silent 'u' after 'g'",
                      bridge: "Levels up to French silent endings ('duvet', 'faux', 'plateau')",
                      badge: "Silent Letters"
                    },
                    {
                      word: 'telepathic',
                      rule: "Greek 'tele-' (far across distance)",
                      bridge: "Levels up to 'phil-' (love in philharmonic) and '-phobia' (fear in brontophobia)",
                      badge: "Greek Morphology"
                    },
                    {
                      word: 'disembark',
                      rule: "Prefix 'dis-' (away / opposite)",
                      bridge: "Levels up to affixes in 'decrepitude' (de-) and 'exoneration' (ex-)",
                      badge: "Prefixes & Affixes"
                    },
                    {
                      word: 'harmonious',
                      rule: "Suffix '-ous' (full of)",
                      bridge: "Prepares for championship adjectives: 'unctuous', 'nebulous', 'salubrious'",
                      badge: "Latin Suffixes"
                    },
                    {
                      word: 'flannel',
                      rule: "Double 'n' with single 'l'",
                      bridge: "Prepares for the biggest Two-Bee trap: 'personnel' vs 'personal'",
                      badge: "Double Consonants"
                    }
                  ].map((card, idx) => (
                    <div key={idx} className="bg-[#fefaf0] p-4 rounded-2xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono font-black uppercase text-[#9b2c98] bg-fuchsia-100 px-2 py-0.5 rounded">
                          {card.badge}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500">#{idx + 1}</span>
                      </div>
                      <h4 className="text-lg font-black text-[#560e51] font-mono tracking-wide">{card.word}</h4>
                      <p className="text-xs font-bold text-slate-700"><strong>Rule:</strong> {card.rule}</p>
                      <p className="text-xs font-bold text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                        <strong>Meeting 3 Bridge:</strong> {card.bridge}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* STAGE 2: MASTER LESSON & CORE PATTERNS (25 MIN)          */}
        {/* ======================================================== */}
        {activeStage === 'stage-2-mastery' && (
          <motion.div
            key="stage-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            {stage2SubView === 'origin-detective' && (
              <OriginPatternDetective
                onAwardTeamScore={handleAwardTeamScore}
                onNavigateTab={handleNavigateTab}
                genAlphaMode={genAlphaMode}
              />
            )}

            {stage2SubView === 'loan-words' && (
              <LoanWordsVault
                onNavigateTab={handleNavigateTab}
                genAlphaMode={genAlphaMode}
              />
            )}

            {stage2SubView === 'lesson' && (
              <Meeting3MasterLesson
                onAwardTeamScore={handleAwardTeamScore}
                onNavigateTab={handleNavigateTab}
                genAlphaMode={genAlphaMode}
              />
            )}
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* STAGE 3: WORD LAB & STATIONS (20 MIN)                    */}
        {/* ======================================================== */}
        {activeStage === 'stage-3-stations' && (
          <motion.div
            key="stage-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            {stage3SubView === 'stations' ? (
              <ListeningStations
                onAwardTeamScore={handleAwardTeamScore}
                genAlphaMode={genAlphaMode}
                activeMeeting="meeting-3"
              />
            ) : (
              <FlashcardModule
                reviewedIds={progress.vocabReviewed || []}
                onMarkReviewed={handleMarkWordReviewed}
                genAlphaMode={genAlphaMode}
                activeMeeting="meeting-3"
              />
            )}
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* STAGE 4: CHAMPIONSHIP MOCK BEE STAGE (25 MIN)            */}
        {/* ======================================================== */}
        {activeStage === 'stage-4-mockbee' && (
          <motion.div
            key="stage-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            {stage4SubView === 'mock-bee' && (
              <MockSpellingBeeStage
                onAwardTeamScore={handleAwardTeamScore}
                genAlphaMode={genAlphaMode}
                activeMeeting="meeting-3"
              />
            )}

            {stage4SubView === 'homophones' && (
              <HomophoneStageShowdown
                onAwardTeamScore={handleAwardTeamScore}
                genAlphaMode={genAlphaMode}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {stage4SubView === 'games' && (
              <ClassroomGames
                isTeacherMode={isTeacherMode}
                onGamePlayed={handleGamePlayed}
                teamScores={teamScores}
                setTeamScores={setTeamScores}
                genAlphaMode={genAlphaMode}
                activeMeeting="meeting-3"
              />
            )}
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* STAGE 5: POST-TEST & STAR CELEBRATION (10 MIN)           */}
        {/* ======================================================== */}
        {activeStage === 'stage-5-wrapup' && (
          <motion.div
            key="stage-5"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="space-y-6"
          >
            <ProgressCheckModule
              preTestScore={preTestScore}
              postTestScore={postTestScore}
              onSaveScores={handleSaveScores}
              onAwardTeamScore={handleAwardTeamScore}
              genAlphaMode={genAlphaMode}
              activeMeeting="meeting-3"
              initialTab={stage5SubView === 'post-test' ? 'post-test' : 'star-celebration'}
            />
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* STEP-BY-STEP STAGE PROGRESSION FOOTER (90-MIN NAV)       */}
        {/* ======================================================== */}
        <div className="mt-8 pt-6 border-t-3 border-[#560e51]/20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51]">
          {/* Previous Stage Button */}
          {prevStage ? (
            <button
              onClick={() => goToStage(prevStage.id)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-tight bg-white hover:bg-fuchsia-50 text-[#560e51] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center justify-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous: Stage {prevStage.number} ({prevStage.shortLabel})</span>
            </button>
          ) : (
            <div className="hidden sm:block text-xs font-bold font-mono text-slate-400">
              🏁 Beginning of 90-Minute Session
            </div>
          )}

          {/* Current Stage Indicator */}
          <div className="text-center">
            <span className="text-[11px] font-mono font-black uppercase text-[#9b2c98] block">
              90-Minute Enrichment Flow
            </span>
            <span className="text-xs sm:text-sm font-black text-slate-800">
              Stage {currentStage.number} of 5 · {currentStage.time}
            </span>
          </div>

          {/* Next Stage Button */}
          {nextStage ? (
            <button
              onClick={() => goToStage(nextStage.id)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-tight bg-[#78c222] hover:bg-[#6ab317] text-[#560e51] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Next: Stage {nextStage.number} ({nextStage.shortLabel})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                setShowProgressModal(true);
                sound.playCorrect();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-tight bg-[#9b2c98] text-white border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center justify-center gap-2"
            >
              <Trophy className="w-4 h-4 text-[#78c222]" />
              <span>Session Complete! View Stamps 🏆</span>
            </button>
          )}
        </div>

      </main>

      {/* ======================================================== */}
      {/* 90-MINUTE AGENDA TIMETABLE MODAL                         */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showAgendaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[32px] border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] p-6 sm:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-4 border-b-2 border-fuchsia-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#560e51] text-[#78c222] rounded-2xl border-2 border-[#560e51]">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight">
                      90-Minute Teaching Schedule
                    </h3>
                    <p className="text-xs font-bold text-slate-600">
                      Step-by-step agenda for Words of the Champions 2024–2025
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAgendaModal(false)}
                  className="p-2 bg-fuchsia-50 hover:bg-fuchsia-100 text-[#560e51] rounded-full border-2 border-[#560e51] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* 5-Stage Schedule Table */}
              <div className="space-y-3">
                {MEETING_STAGES.map((st) => {
                  const Icon = st.icon;
                  const isCurrent = activeStage === st.id;

                  return (
                    <div
                      key={st.id}
                      onClick={() => {
                        goToStage(st.id);
                        setShowAgendaModal(false);
                      }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isCurrent
                          ? 'bg-[#560e51] text-white border-[#560e51] shadow-[3px_3px_0px_0px_#78c222]'
                          : 'bg-[#fefaf0] hover:bg-fuchsia-50 text-slate-900 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-black text-sm shrink-0 ${
                          isCurrent ? 'bg-[#78c222] text-[#560e51]' : 'bg-fuchsia-100 text-[#560e51]'
                        }`}>
                          {st.number}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black uppercase tracking-tight">
                              {st.title}
                            </h4>
                            {isCurrent && (
                              <span className="text-[10px] font-mono font-black uppercase bg-[#78c222] text-[#560e51] px-2 py-0.2 rounded-full">
                                Now
                              </span>
                            )}
                          </div>
                          <p className={`text-xs mt-0.5 line-clamp-1 ${isCurrent ? 'text-fuchsia-100' : 'text-slate-600'}`}>
                            {st.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-xs font-mono font-black block ${isCurrent ? 'text-[#78c222]' : 'text-[#9b2c98]'}`}>
                          {st.time}
                        </span>
                        <span className={`text-[10px] font-mono ${isCurrent ? 'text-fuchsia-200' : 'text-slate-500'}`}>
                          {st.targetRange}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Teacher Tips Box */}
              <div className="mt-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-black uppercase font-mono text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Teacher 90-Minute Pacing Tips:</span>
                </div>
                <p className="text-xs font-bold text-amber-950 leading-relaxed">
                  Keep students moving through each stage sequentially! Use the countdown timer in the header to ensure Stage 1 finishes at the 10-minute mark, Stage 2 ends at 35:00, and enough time remains for the live Mock Bee Stage (Stage 4).
                </p>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowAgendaModal(false)}
                  className="px-6 py-2.5 bg-[#560e51] hover:bg-[#450941] text-[#78c222] text-xs font-black uppercase tracking-wide rounded-xl border-2 border-[#78c222] shadow-[2px_2px_0px_0px_#78c222] cursor-pointer"
                >
                  Close & Continue Teaching
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Progress Tracker Modal */}
      <AnimatePresence>
        {showProgressModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[32px] border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] p-6 max-w-md w-full relative"
            >
              <div className="flex justify-between items-center pb-3 border-b-2 border-fuchsia-100 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#9b2c98]" />
                  <h3 className="text-base font-black text-[#560e51] uppercase tracking-tight">Student Progress & Stamps</h3>
                </div>
                <button
                  onClick={() => setShowProgressModal(false)}
                  className="p-1.5 bg-fuchsia-50 hover:bg-fuchsia-100 text-[#560e51] rounded-full border-2 border-[#560e51] cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <ProgressTracker
                progress={progress}
                onResetProgress={handleResetProgress}
                isTeacherMode={isTeacherMode}
                teamScores={teamScores}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Clean Minimal Footer */}
      <footer className="w-full border-t-2 border-[#560e51]/20 bg-white py-3.5 px-6 mt-12 text-center text-xs text-[#560e51] font-bold">
        <p>Spelling Bee Enrichment Session · Words of the Champions 2024–2025 · SDIT Auliya</p>
      </footer>

    </div>
  );
}
