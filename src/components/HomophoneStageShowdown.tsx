import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Trophy, 
  ShieldAlert, 
  Scale, 
  MessageSquare, 
  Lightbulb, 
  BookOpen, 
  Search,
  Shuffle,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { HomophonePair, HomophoneWord } from '../types';
import { SCRIPPS_HOMOPHONE_PAIRS, SCRIPPS_STAGE_QUESTIONS, StageQuestion } from '../data/homophonesData';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';

interface HomophoneShowdownProps {
  onAwardTeamScore?: (team: 'A' | 'B', pts: number) => void;
  genAlphaMode: boolean;
  onNavigateTab?: (tab: string) => void;
}

export default function HomophoneStageShowdown({
  onAwardTeamScore,
  genAlphaMode,
  onNavigateTab
}: HomophoneShowdownProps) {
  // Main view mode: 'stage-sim' (interactive drill) | 'duo-explorer' (side-by-side cards) | 'stage-rules' (how it's done on stage)
  const [activeView, setActiveView] = useState<'stage-sim' | 'duo-explorer' | 'stage-rules'>('stage-sim');

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'Grade 3-6 Staples' | 'Scripps Two-Bee Traps' | 'Championship Finalists'>('all');
  
  // Search query for duo explorer
  const [searchQuery, setSearchQuery] = useState('');

  // Current pair index for Stage Simulation
  const [currentPairIndex, setCurrentPairIndex] = useState(0);

  // Stage Simulation state
  const [unlockedQuestions, setUnlockedQuestions] = useState<Record<string, boolean>>({});
  const [userSelectedWord, setUserSelectedWord] = useState<string | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [spellingInput, setSpellingInput] = useState('');
  const [inputMode, setInputMode] = useState<'podium-click' | 'spelling-box'>('podium-click');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [lastPronouncedText, setLastPronouncedText] = useState<string | null>(null);
  const [awardedTeam, setAwardedTeam] = useState<'A' | 'B'>('A');
  const [sessionStreak, setSessionStreak] = useState(0);

  // Filtered pairs based on category
  const filteredPairs = SCRIPPS_HOMOPHONE_PAIRS.filter(pair => {
    if (selectedCategory !== 'all' && pair.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchWords = pair.words.some(w => w.word.toLowerCase().includes(q) || w.definition.toLowerCase().includes(q));
      return matchWords || pair.category.toLowerCase().includes(q);
    }
    return true;
  });

  const currentPair: HomophonePair = filteredPairs[currentPairIndex] || SCRIPPS_HOMOPHONE_PAIRS[0];

  // Target word details
  const targetWordObj = currentPair.words.find(w => w.word.toLowerCase() === currentPair.targetWord.toLowerCase()) || currentPair.words[0];
  const otherWordObj = currentPair.words.find(w => w.word.toLowerCase() !== currentPair.targetWord.toLowerCase()) || currentPair.words[1];

  // Reset drill state when moving to a new pair
  const handleSelectPair = (index: number) => {
    setCurrentPairIndex(index);
    setUnlockedQuestions({});
    setUserSelectedWord(null);
    setIsAnswerRevealed(false);
    setSpellingInput('');
    setLastPronouncedText(null);
    sound.playClick();
  };

  const handleNextPair = () => {
    if (currentPairIndex < filteredPairs.length - 1) {
      handleSelectPair(currentPairIndex + 1);
    } else {
      handleSelectPair(0);
    }
  };

  const handlePrevPair = () => {
    if (currentPairIndex > 0) {
      handleSelectPair(currentPairIndex - 1);
    } else {
      handleSelectPair(filteredPairs.length - 1);
    }
  };

  const handleShuffle = () => {
    const randomIdx = Math.floor(Math.random() * filteredPairs.length);
    handleSelectPair(randomIdx);
  };

  // Pronounce word (Pronouncer role)
  const speakCurrentWord = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    sound.playClick();
    setLastPronouncedText(`Pronouncer: "Your word is: ${targetWordObj.word}"`);
    try {
      await humanVoice.speakWordTwice(targetWordObj.word);
    } catch {
      // Fallback handled inside humanVoice
    } finally {
      setIsSpeaking(false);
    }
  };

  // Speller asks one of the official Scripps questions to the Pronouncer
  const handleAskQuestion = async (q: StageQuestion) => {
    if (isSpeaking) return;
    sound.playClick();
    setUnlockedQuestions(prev => ({ ...prev, [q.id]: true }));
    setIsSpeaking(true);

    let answerSpeech = '';
    let answerText = '';

    if (q.id === 'definition') {
      answerSpeech = `Definition: ${targetWordObj.definition}`;
      answerText = `📖 Definition: "${targetWordObj.definition}"`;
    } else if (q.id === 'sentence') {
      answerSpeech = targetWordObj.sentence;
      answerText = `💬 Sentence: "${targetWordObj.sentence}"`;
    } else if (q.id === 'partOfSpeech') {
      answerSpeech = `Part of speech: ${targetWordObj.partOfSpeech}`;
      answerText = `🏷️ Part of Speech: ${targetWordObj.partOfSpeech}`;
    } else if (q.id === 'origin') {
      answerSpeech = `This word comes from: ${targetWordObj.origin}`;
      answerText = `🏛️ Language of Origin: ${targetWordObj.origin}`;
    } else if (q.id === 'alternatePronunciation') {
      const alternates = targetWordObj.alternatePronunciations;
      if (alternates && alternates.length > 0) {
        answerSpeech = `Alternate pronunciations include: ${alternates.join(', ')}`;
        answerText = `🗣️ Alternate Pronunciations: ${alternates.join(' · ')}`;
      } else {
        answerSpeech = `There are no alternate pronunciations recorded in Merriam-Webster for this word.`;
        answerText = `🗣️ Alternate Pronunciations: None recorded (standard pronunciation only).`;
      }
    }

    setLastPronouncedText(answerText);

    try {
      await humanVoice.speakSentence(answerSpeech);
    } catch {
      // Audio fallback
    } finally {
      setIsSpeaking(false);
    }
  };

  // Handle Speller's Answer
  const handleCheckAnswer = (selectedWordText: string) => {
    if (isAnswerRevealed) return;
    const isCorrect = selectedWordText.trim().toLowerCase() === currentPair.targetWord.toLowerCase();
    setUserSelectedWord(selectedWordText);
    setIsAnswerRevealed(true);

    if (isCorrect) {
      sound.playCorrect();
      setSessionStreak(prev => prev + 1);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      if (onAwardTeamScore) {
        onAwardTeamScore(awardedTeam, 10);
      }
    } else {
      sound.playBuzzer();
      setSessionStreak(0);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* HERO BANNER & HOMOPHONE ARENA HEADER                                      */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#560e51] via-[#701a69] to-[#9b2c98] rounded-[32px] p-6 sm:p-8 text-white border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] relative overflow-hidden">
        {/* Decorative background grid and badges */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none select-none">
          <Scale className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-widest font-mono bg-[#78c222] text-[#560e51] px-3.5 py-1 rounded-full border-2 border-white/40 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] flex items-center gap-1.5">
              <Scale className="w-4 h-4" /> Championship Stage Homophone Arena
            </span>
            <span className="text-xs font-black uppercase tracking-widest font-mono bg-white/20 text-white px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm">
              Scripps Rule 4 Protocol 🎙️
            </span>
            <span className="text-xs font-black uppercase tracking-widest font-mono bg-amber-400 text-slate-950 px-3 py-1 rounded-full border-2 border-slate-950">
              {filteredPairs.length} Competition Pairs Available
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white flex items-center gap-3">
            <span>Homophone Stage Showdown</span>
            <span className="text-3xl sm:text-4xl">⚖️</span>
          </h2>

          <p className="text-sm sm:text-base font-bold text-fuchsia-100 leading-relaxed max-w-3xl">
            At the <strong>Scripps National Spelling Bee</strong>, homophones are the deadliest traps on stage! Two words sound exactly the same, but have completely different spellings and meanings. Practice stepping up to the microphone, asking Dr. Jacques Bailly for definitions, and mastering stage etiquette!
          </p>

          {/* Quick Sub-Navigation for the 3 Homophone Modes */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => { setActiveView('stage-sim'); sound.playClick(); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-tight transition-all cursor-pointer flex items-center gap-2 ${
                activeView === 'stage-sim'
                  ? 'bg-[#78c222] text-[#560e51] border-2 border-white shadow-[3px_3px_0px_0px_#560e51] -translate-y-0.5'
                  : 'bg-white/15 hover:bg-white/25 text-white border-2 border-white/30'
              }`}
            >
              <span>🎙️ Stage Mic Simulator</span>
              <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-mono">Live Drill</span>
            </button>

            <button
              onClick={() => { setActiveView('duo-explorer'); sound.playClick(); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-tight transition-all cursor-pointer flex items-center gap-2 ${
                activeView === 'duo-explorer'
                  ? 'bg-[#78c222] text-[#560e51] border-2 border-white shadow-[3px_3px_0px_0px_#560e51] -translate-y-0.5'
                  : 'bg-white/15 hover:bg-white/25 text-white border-2 border-white/30'
              }`}
            >
              <span>⚖️ Side-by-Side Duo Cards</span>
              <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-mono">All Pairs</span>
            </button>

            <button
              onClick={() => { setActiveView('stage-rules'); sound.playClick(); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-tight transition-all cursor-pointer flex items-center gap-2 ${
                activeView === 'stage-rules'
                  ? 'bg-[#78c222] text-[#560e51] border-2 border-white shadow-[3px_3px_0px_0px_#560e51] -translate-y-0.5'
                  : 'bg-white/15 hover:bg-white/25 text-white border-2 border-white/30'
              }`}
            >
              <span>📜 Scripps Stage Protocol & Rules</span>
              <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-mono">Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: STAGE MIC SIMULATOR (PRACTICE ASKING QUESTIONS ON STAGE)          */}
      {/* ========================================================================= */}
      {activeView === 'stage-sim' && (
        <div className="space-y-6">
          
          {/* Pair Switcher & Filters */}
          <div className="bg-white rounded-2xl p-4 border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider font-mono text-[#9b2c98]">Filter Category:</span>
              {(['all', 'Grade 3-6 Staples', 'Scripps Two-Bee Traps', 'Championship Finalists'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPairIndex(0);
                    setUnlockedQuestions({});
                    setUserSelectedWord(null);
                    setIsAnswerRevealed(false);
                    sound.playClick();
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#560e51] text-white border-2 border-[#560e51] shadow-[1px_1px_0px_0px_#560e51]'
                      : 'bg-fuchsia-50 text-slate-700 hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  {cat === 'all' ? 'All (22)' : cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPair}
                className="p-2 bg-fuchsia-100 hover:bg-fuchsia-200 text-[#560e51] rounded-xl border-2 border-[#560e51] cursor-pointer"
                title="Previous Pair"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-black text-[#560e51] bg-[#fdf2fe] px-3 py-1.5 rounded-xl border-2 border-[#560e51]">
                Pair {currentPairIndex + 1} of {filteredPairs.length}
              </span>

              <button
                onClick={handleNextPair}
                className="p-2 bg-fuchsia-100 hover:bg-fuchsia-200 text-[#560e51] rounded-xl border-2 border-[#560e51] cursor-pointer"
                title="Next Pair"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleShuffle}
                className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl border-2 border-[#560e51] cursor-pointer flex items-center gap-1 text-xs font-black uppercase"
                title="Random Pair"
              >
                <Shuffle className="w-4 h-4" />
                <span className="hidden sm:inline">Shuffle</span>
              </button>
            </div>
          </div>

          {/* THE STAGE PODIUM CARD */}
          <div className="bg-white rounded-[32px] border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] overflow-hidden">
            
            {/* Top Stage Lighting Header */}
            <div className="bg-[#240322] text-white p-5 sm:p-6 border-b-4 border-[#560e51] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#9b2c98] border-2 border-white/40 flex items-center justify-center text-2xl shadow-inner">
                  🎙️
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black uppercase text-[#78c222] tracking-wider">
                      Stage Microphone Active · Round 1 Simulation
                    </span>
                    <span className="text-[10px] font-mono bg-white/20 text-white px-2 py-0.5 rounded-full uppercase">
                      {currentPair.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white mt-0.5">
                    Dr. Jacques Bailly Pronouncer Station
                  </h3>
                </div>
              </div>

              {/* Award Team Selector & Streak */}
              <div className="flex items-center gap-3">
                {sessionStreak > 0 && (
                  <span className="bg-amber-400 text-slate-950 font-black text-xs font-mono px-3 py-1.5 rounded-xl border-2 border-slate-950 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> {sessionStreak} Streak!
                  </span>
                )}
                {onAwardTeamScore && (
                  <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/20 text-xs">
                    <button
                      onClick={() => setAwardedTeam('A')}
                      className={`px-2 py-1 rounded-lg font-black uppercase ${
                        awardedTeam === 'A' ? 'bg-[#78c222] text-[#560e51]' : 'text-fuchsia-200'
                      }`}
                    >
                      Team A
                    </button>
                    <button
                      onClick={() => setAwardedTeam('B')}
                      className={`px-2 py-1 rounded-lg font-black uppercase ${
                        awardedTeam === 'B' ? 'bg-[#78c222] text-[#560e51]' : 'text-fuchsia-200'
                      }`}
                    >
                      Team B
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* STAGE ARENA BODY */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* HOMOPHONE ALERT WARNING BANNER */}
              <div className="bg-amber-50 border-3 border-amber-500 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-[3px_3px_0px_0px_#f59e0b]">
                <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900 font-mono">
                      Scripps Stage Homophone Trap Warning!
                    </span>
                    <span className="text-[10px] font-mono bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-black">
                      IPA Sound: {currentPair.soundIpa}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-amber-900 leading-relaxed">
                    <strong>Beware:</strong> The word you are about to hear has an identical-sounding partner! If you start spelling without asking questions, you might spell the wrong word and be eliminated instantly.
                  </p>
                  <p className="text-xs font-semibold text-amber-800 italic pt-1">
                    {currentPair.ruleTip}
                  </p>
                </div>
              </div>

              {/* PRONOUNCER'S AUDIO PROMPT */}
              <div className="bg-[#fcf9f2] rounded-2xl p-6 border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">Step 1: Pronouncer Speaks</span>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900">
                    {lastPronouncedText || `Click the microphone to hear the pronouncer introduce the word.`}
                  </h4>
                  <p className="text-xs font-bold text-slate-600">
                    Notice: The pronouncer only gives you the sound—they won't tell you the spelling!
                  </p>
                </div>

                <button
                  onClick={speakCurrentWord}
                  disabled={isSpeaking}
                  className="px-6 py-3.5 bg-[#9b2c98] hover:bg-[#832480] text-white font-black text-sm uppercase rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-2 shrink-0 disabled:opacity-50"
                >
                  <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-pulse text-[#78c222]' : ''}`} />
                  <span>{isSpeaking ? 'Speaking...' : 'Pronounce Word 🔊'}</span>
                </button>
              </div>

              {/* STEP 2: THE 5 OFFICIAL SCRIPPS STAGE QUESTIONS */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">Step 2: Speller Interrogation</span>
                    <h4 className="text-base sm:text-lg font-black uppercase text-slate-900">
                      Ask the 5 Legal Questions to Dr. Jacques Bailly 🎙️
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    Click each question to listen
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SCRIPPS_STAGE_QUESTIONS.map(q => {
                    const isUnlocked = unlockedQuestions[q.id];
                    return (
                      <div
                        key={q.id}
                        className={`rounded-2xl border-2 transition-all p-3.5 flex flex-col justify-between ${
                          isUnlocked
                            ? 'bg-[#fdf2fe] border-[#560e51] shadow-[3px_3px_0px_0px_#560e51]'
                            : 'bg-white border-slate-300 hover:border-[#560e51] hover:bg-slate-50 shadow-sm'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-black uppercase text-[#560e51] flex items-center gap-1.5">
                              <span>{q.icon}</span>
                              <span>{q.label}</span>
                            </span>
                            {isUnlocked && (
                              <span className="text-[10px] font-mono font-bold bg-[#78c222] text-[#560e51] px-2 py-0.5 rounded-full">
                                Unlocked ✓
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-slate-800">
                            "{q.questionPhrase}"
                          </p>
                          <p className="text-[11px] font-medium text-slate-500">
                            {q.description}
                          </p>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleAskQuestion(q)}
                            disabled={isSpeaking}
                            className={`w-full py-1.5 px-3 rounded-xl text-xs font-black uppercase tracking-tight flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isUnlocked
                                ? 'bg-[#9b2c98] text-white hover:bg-[#832480]'
                                : 'bg-[#560e51] text-[#78c222] hover:bg-[#450b41]'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isUnlocked ? 'Re-listen Answer' : 'Ask Pronouncer 🎙️'}</span>
                          </button>
                        </div>

                        {/* Unlocked Answer Content Display */}
                        {isUnlocked && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-2.5 p-2.5 bg-white rounded-xl border border-[#560e51]/30 text-xs space-y-1"
                          >
                            {q.id === 'definition' && (
                              <p className="font-bold text-[#560e51]">
                                <span className="font-mono text-[10px] uppercase text-slate-500 block">Pronouncer Definition:</span>
                                "{targetWordObj.definition}"
                              </p>
                            )}
                            {q.id === 'sentence' && (
                              <p className="font-bold text-slate-800 italic">
                                <span className="font-mono text-[10px] uppercase text-slate-500 block not-italic">Pronouncer Sentence:</span>
                                "{targetWordObj.sentence}"
                              </p>
                            )}
                            {q.id === 'partOfSpeech' && (
                              <p className="font-bold text-purple-900">
                                <span className="font-mono text-[10px] uppercase text-slate-500 block">Part of Speech:</span>
                                {targetWordObj.partOfSpeech}
                              </p>
                            )}
                            {q.id === 'origin' && (
                              <p className="font-bold text-emerald-900">
                                <span className="font-mono text-[10px] uppercase text-slate-500 block">Language of Origin:</span>
                                {targetWordObj.origin}
                              </p>
                            )}
                            {q.id === 'alternatePronunciation' && (
                              <p className="font-bold text-blue-900">
                                <span className="font-mono text-[10px] uppercase text-slate-500 block">Alternate Pronunciations:</span>
                                {targetWordObj.alternatePronunciations && targetWordObj.alternatePronunciations.length > 0 
                                  ? targetWordObj.alternatePronunciations.join(' · ')
                                  : 'None recorded (standard pronunciation only)'}
                              </p>
                            )}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: THE SPELLER'S FINAL DECISION & SUBMISSION */}
              <div className="space-y-4 pt-2 border-t-2 border-dashed border-fuchsia-200">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">Step 3: Spelling Bee Stage Decision</span>
                    <h4 className="text-base sm:text-lg font-black uppercase text-slate-900">
                      Which Word is the Pronouncer Asking For? 🎯
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setInputMode('podium-click')}
                      className={`px-3 py-1 rounded-lg text-xs font-black uppercase cursor-pointer ${
                        inputMode === 'podium-click'
                          ? 'bg-[#560e51] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Podium Cards
                    </button>
                    <button
                      onClick={() => setInputMode('spelling-box')}
                      className={`px-3 py-1 rounded-lg text-xs font-black uppercase cursor-pointer ${
                        inputMode === 'spelling-box'
                          ? 'bg-[#560e51] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Spelling Input Box
                    </button>
                  </div>
                </div>

                {/* PODIUM CHOICE CARDS */}
                {inputMode === 'podium-click' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentPair.words.map((w, idx) => {
                      const isTarget = w.word.toLowerCase() === currentPair.targetWord.toLowerCase();
                      const isChosen = userSelectedWord?.toLowerCase() === w.word.toLowerCase();

                      let cardStyle = 'bg-white border-3 border-[#560e51] hover:bg-fuchsia-50/60 shadow-[4px_4px_0px_0px_#560e51] cursor-pointer';
                      if (isAnswerRevealed) {
                        if (isTarget) {
                          cardStyle = 'bg-emerald-50 border-3 border-emerald-600 shadow-[4px_4px_0px_0px_#059669] cursor-default';
                        } else if (isChosen && !isTarget) {
                          cardStyle = 'bg-rose-50 border-3 border-rose-500 shadow-[4px_4px_0px_0px_#e11d48] cursor-default';
                        } else {
                          cardStyle = 'bg-slate-50 border-2 border-slate-300 opacity-60 cursor-default';
                        }
                      }

                      return (
                        <motion.button
                          key={w.word}
                          whileHover={!isAnswerRevealed ? { y: -2 } : {}}
                          whileTap={!isAnswerRevealed ? { y: 0 } : {}}
                          onClick={() => handleCheckAnswer(w.word)}
                          disabled={isAnswerRevealed}
                          className={`p-5 rounded-2xl text-left transition-all ${cardStyle}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                              Option {idx + 1}
                            </span>
                            <span className="text-xs font-mono bg-fuchsia-100 text-[#560e51] px-2 py-0.5 rounded font-black">
                              {w.partOfSpeech}
                            </span>
                          </div>

                          <h5 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-mono">
                            {w.word}
                          </h5>

                          <p className="text-xs font-bold text-slate-600 mt-2 line-clamp-2">
                            "{w.definition}"
                          </p>

                          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                            <span className="text-[11px] font-mono text-slate-500">
                              {w.origin}
                            </span>
                            <span className="text-xs font-black uppercase tracking-tight text-[#560e51] flex items-center gap-1">
                              Select Word <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>
                )}

                {/* LIVE SPELLING BOX INPUT */}
                {inputMode === 'spelling-box' && (
                  <div className="bg-[#fcf9f2] p-5 rounded-2xl border-3 border-[#560e51] space-y-3">
                    <label className="block text-xs font-mono font-black uppercase text-[#560e51]">
                      Type your spelling letter-by-letter as you would speak it into the stage mic:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={spellingInput}
                        onChange={(e) => setSpellingInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && spellingInput.trim() && !isAnswerRevealed) {
                            handleCheckAnswer(spellingInput);
                          }
                        }}
                        disabled={isAnswerRevealed}
                        placeholder={`Spell the homophone word here...`}
                        className="flex-1 px-4 py-3 bg-white border-2 border-[#560e51] rounded-xl font-mono text-lg font-black uppercase tracking-widest text-[#560e51] focus:outline-none focus:ring-2 focus:ring-[#78c222]"
                      />
                      <button
                        onClick={() => handleCheckAnswer(spellingInput)}
                        disabled={!spellingInput.trim() || isAnswerRevealed}
                        className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black uppercase text-sm rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer disabled:opacity-40"
                      >
                        Final Answer 🐝
                      </button>
                    </div>
                  </div>
                )}

                {/* RESULT FEEDBACK AND COMPREHENSIVE REVEAL */}
                <AnimatePresence>
                  {isAnswerRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl border-3 border-[#560e51] p-6 shadow-[6px_6px_0px_0px_#560e51] space-y-5"
                    >
                      {/* Banner */}
                      <div className={`p-4 rounded-xl border-2 flex items-center justify-between gap-3 ${
                        userSelectedWord?.toLowerCase() === currentPair.targetWord.toLowerCase()
                          ? 'bg-emerald-100 border-emerald-600 text-emerald-950'
                          : 'bg-rose-100 border-rose-600 text-rose-950'
                      }`}>
                        <div className="flex items-center gap-3">
                          {userSelectedWord?.toLowerCase() === currentPair.targetWord.toLowerCase() ? (
                            <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle className="w-7 h-7 text-rose-600 shrink-0" />
                          )}
                          <div>
                            <h5 className="text-base font-black uppercase">
                              {userSelectedWord?.toLowerCase() === currentPair.targetWord.toLowerCase()
                                ? `CORRECT! You avoided the homophone trap! (+10 PTS)`
                                : `ELIMINATION! You spelled the wrong homophone twin.`}
                            </h5>
                            <p className="text-xs font-bold mt-0.5">
                              The pronouncer wanted: <strong className="font-mono text-sm underline">{currentPair.targetWord}</strong>
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={handleNextPair}
                          className="px-4 py-2 bg-[#560e51] text-[#78c222] font-black text-xs uppercase rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#000] cursor-pointer shrink-0"
                        >
                          Next Pair ➔
                        </button>
                      </div>

                      {/* SIDE-BY-SIDE ETYMOLOGY COMPARISON REVEAL */}
                      <div className="space-y-2">
                        <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                          Twin Comparison & Memory Hooks:
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentPair.words.map(w => {
                            const isTarget = w.word.toLowerCase() === currentPair.targetWord.toLowerCase();
                            return (
                              <div
                                key={w.word}
                                className={`p-4 rounded-xl border-2 space-y-2 ${
                                  isTarget
                                    ? 'bg-emerald-50/60 border-emerald-500'
                                    : 'bg-slate-50 border-slate-300'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <h6 className="font-mono text-xl font-black text-slate-900 uppercase">
                                      {w.word}
                                    </h6>
                                    {isTarget && (
                                      <span className="text-[10px] font-mono bg-emerald-600 text-white px-2 py-0.5 rounded font-black">
                                        Pronouncer Word ✓
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-xs font-mono text-slate-600 font-bold">
                                    {w.partOfSpeech}
                                  </span>
                                </div>

                                <p className="text-xs font-bold text-slate-700">
                                  <strong>Definition:</strong> {w.definition}
                                </p>
                                <p className="text-xs text-slate-600 italic">
                                  <strong>Example:</strong> "{w.sentence}"
                                </p>
                                <p className="text-xs text-slate-600">
                                  <strong>Origin:</strong> {w.origin}
                                </p>

                                <div className="p-2.5 rounded-lg bg-amber-100/70 border border-amber-300 text-xs font-bold text-amber-950 flex items-start gap-2">
                                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                  <span>
                                    <strong>Memory Hook:</strong> {w.memoryHook}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: SIDE-BY-SIDE DUO EXPLORER (COMPARE BOTH WORDS CARDS)              */}
      {/* ========================================================================= */}
      {activeView === 'duo-explorer' && (
        <div className="space-y-6">
          
          {/* Search & Category Filter Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search homophone words, hooks..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-2 border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-[#560e51]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {(['all', 'Grade 3-6 Staples', 'Scripps Two-Bee Traps', 'Championship Finalists'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#560e51] text-white border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                      : 'bg-fuchsia-50 text-slate-700 hover:bg-fuchsia-100 border border-fuchsia-200'
                  }`}
                >
                  {cat === 'all' ? `All Pairs (${SCRIPPS_HOMOPHONE_PAIRS.length})` : cat}
                </button>
              ))}
            </div>
          </div>

          {/* PAIR CARDS GRID */}
          <div className="grid grid-cols-1 gap-6">
            {filteredPairs.map((pair, pIdx) => (
              <div
                key={pair.id}
                className="bg-white rounded-[28px] border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] overflow-hidden"
              >
                {/* Header for this pair */}
                <div className="bg-[#fcf9f2] p-4 sm:p-5 border-b-3 border-[#560e51] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#560e51] text-[#78c222] font-black font-mono text-sm flex items-center justify-center">
                      #{pIdx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                          Homophone Sound:
                        </span>
                        <span className="font-mono text-xs font-black bg-purple-100 text-purple-900 px-2 py-0.5 rounded border border-purple-200">
                          {pair.soundIpa}
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-slate-900 uppercase">
                        {pair.words.map(w => w.word).join('  vs  ')}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-fuchsia-100 text-[#560e51] px-2.5 py-1 rounded-lg">
                      {pair.category}
                    </span>
                    <button
                      onClick={() => {
                        const idxInFull = filteredPairs.findIndex(x => x.id === pair.id);
                        handleSelectPair(idxInFull >= 0 ? idxInFull : 0);
                        setActiveView('stage-sim');
                      }}
                      className="px-3.5 py-1.5 bg-[#78c222] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[1.5px_1.5px_0px_0px_#560e51] hover:bg-[#68ab1c] cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Stage Drill 🎙️</span>
                    </button>
                  </div>
                </div>

                {/* SIDE BY SIDE COLUMNS */}
                <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                  {pair.words.map((w, wIdx) => (
                    <div
                      key={w.word}
                      className="bg-[#fffdf5] rounded-2xl border-2 border-[#560e51] p-5 flex flex-col justify-between space-y-4 shadow-sm"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                            Word {wIdx + 1}
                          </span>
                          <span className="text-xs font-mono bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full font-bold">
                            {w.partOfSpeech}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <h5 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-[#560e51]">
                            {w.word}
                          </h5>
                          <button
                            onClick={() => humanVoice.speakWord(w.word)}
                            className="p-2 bg-fuchsia-100 hover:bg-fuchsia-200 text-[#560e51] rounded-xl border border-[#560e51] cursor-pointer"
                            title="Hear Pronunciation"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-1.5 pt-1">
                          <p className="text-xs font-bold text-slate-800 leading-relaxed">
                            <strong className="text-slate-900">Definition:</strong> {w.definition}
                          </p>
                          <p className="text-xs text-slate-600 italic leading-relaxed">
                            <strong className="text-slate-900 not-italic">In a Sentence:</strong> "{w.sentence}"
                          </p>
                          <p className="text-[11px] font-mono text-slate-500 pt-1">
                            <strong>Origin:</strong> {w.origin}
                          </p>
                        </div>
                      </div>

                      {/* MEMORY HOOK HIGHLIGHT */}
                      <div className="p-3 bg-amber-50 rounded-xl border-2 border-amber-300 text-xs font-bold text-amber-950 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-mono text-[10px] uppercase text-amber-800 block">Scripps Memory Hook:</span>
                          <span className="leading-snug">{w.memoryHook}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer rule tip */}
                <div className="px-6 py-3 bg-[#fdf2fe] border-t border-fuchsia-200 text-xs font-semibold text-[#560e51] flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-[#9b2c98] shrink-0" />
                  <span><strong>Stage Warning:</strong> {pair.ruleTip}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: SCRIPPS STAGE PROTOCOL & RULES GUIDE                              */}
      {/* ========================================================================= */}
      {activeView === 'stage-rules' && (
        <div className="space-y-6">
          
          {/* Official Rule 4 Explanation */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
            <div className="border-b-2 border-fuchsia-100 pb-4">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">Scripps National Spelling Bee Rulebook</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                Official Rule 4: Homophone & Speller Inquiries 🏛️
              </h3>
              <p className="text-sm font-bold text-slate-600 mt-1 leading-relaxed">
                How championship spellers handle homophones under the bright stage lights without getting eliminated!
              </p>
            </div>

            {/* Rule 4 Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-400 space-y-2">
                <span className="text-xs font-mono font-black uppercase text-amber-900">Official Scripps Rule 4.1</span>
                <h4 className="text-base font-black text-amber-950 uppercase">Pronouncer Obligation</h4>
                <p className="text-xs font-bold text-amber-900 leading-relaxed">
                  "If a word has one or more homophones or near-homophones, the pronouncer must indicate the definition or use the word in a sentence without being asked."
                </p>
                <p className="text-[11px] text-amber-800 font-medium pt-1">
                  <em>However: In school and regional bees, pronouncers can sometimes forget! Spellers must ALWAYS be vigilant and ask!</em>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 border-2 border-emerald-500 space-y-2">
                <span className="text-xs font-mono font-black uppercase text-emerald-900">Official Scripps Rule 4.2</span>
                <h4 className="text-base font-black text-emerald-950 uppercase">Speller’s Legal Questions</h4>
                <p className="text-xs font-bold text-emerald-900 leading-relaxed">
                  The speller is legally entitled to ask for:
                  <br />• Definition
                  <br />• Part of speech
                  <br />• Language of origin
                  <br />• Use in a sentence
                  <br />• Alternate pronunciations
                </p>
              </div>
            </div>

            {/* The 5-Step Stage Ritual */}
            <div className="space-y-3 pt-2">
              <h4 className="text-lg font-black uppercase text-slate-900">
                The 5-Step Stage Routine for Champion Spellers 🏆
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {[
                  { step: '1', title: 'Hear & Repeat', desc: 'Pronounce the word into the mic to verify you heard it correctly with the judges.' },
                  { step: '2', title: 'Ask Questions', desc: 'Ask for the definition, sentence, part of speech, and origin. Never rush!' },
                  { step: '3', title: 'Palm Trace', desc: 'Write the letters on your palm or in the air to visualize the silent letter traps.' },
                  { step: '4', title: 'Spell Loudly', desc: 'Speak each letter clearly without backtracking or restarting mid-word.' },
                  { step: '5', title: 'Say It Again', desc: 'Repeat the word at the end so the judges know your spelling is complete.' }
                ].map((s) => (
                  <div key={s.step} className="p-4 rounded-2xl bg-fuchsia-50 border-2 border-[#560e51] space-y-1 text-center">
                    <span className="w-8 h-8 rounded-full bg-[#560e51] text-[#78c222] font-mono font-black text-sm inline-flex items-center justify-center">
                      {s.step}
                    </span>
                    <h5 className="text-xs font-black uppercase text-[#560e51] pt-1">{s.title}</h5>
                    <p className="text-[11px] font-medium text-slate-600 leading-tight">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Homophone Stage Traps */}
            <div className="p-5 rounded-2xl bg-[#560e51] text-white border-3 border-[#78c222] space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#78c222]" />
                <h4 className="text-sm font-black uppercase tracking-wide">
                  Top 3 Stage Traps That Knock Spellers Out
                </h4>
              </div>
              <ul className="text-xs font-bold text-fuchsia-100 space-y-1.5 list-disc pl-5">
                <li><strong>Rushing before hearing the sentence:</strong> Spellers who hear "stationery" and immediately rattle off "s-t-a-t-i-o-n-a-r-y" are eliminated instantly.</li>
                <li><strong>Assuming the shorter word:</strong> When you hear "bare", never assume it’s the four-letter word without asking if it's the large mammal ("bear")!</li>
                <li><strong>Ignoring the Part of Speech:</strong> "Affect" (verb) vs "Effect" (noun). Hearing whether it is an action or an end result saves your competition life!</li>
              </ul>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
