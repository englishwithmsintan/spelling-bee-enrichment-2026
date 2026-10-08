import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Volume2, 
  HelpCircle, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Play, 
  Clock, 
  ChevronRight, 
  Box, 
  Award,
  Layers,
  Repeat,
  Info,
  BookOpen,
  Filter,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { BoxChallenge } from '../types';
import { 
  OPEN_THE_BOX_30, 
  MEETING_3_MOCK_BEE_WORDS,
  ALL_WORDS_MAP
} from '../data/reviewData';
import { COMPREHENSIVE_LOAN_WORDS } from '../data/loanWordsData';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';

interface MockBeeProps {
  onAwardTeamScore?: (team: 'A' | 'B', pts: number) => void;
  genAlphaMode: boolean;
  activeMeeting?: string;
}

export default function MockSpellingBeeStage({ onAwardTeamScore, genAlphaMode }: MockBeeProps) {
  // Tabs: 'rules' | 'open-box' | 'stage-sim'
  const [activeTab, setActiveTab] = useState<'rules' | 'open-box' | 'stage-sim'>('open-box');

  // Box set filter: 'all' | 'level-medium' | 'level-twobee' | 'level-champion'
  const [boxFilter, setBoxFilter] = useState<'all' | 'level-medium' | 'level-twobee' | 'level-champion'>('all');

  // Stage word list filter: 'all' | 'loanwords' | 'twobee'
  const [stageCategory, setStageCategory] = useState<'all' | 'loanwords' | 'twobee'>('all');

  // ==========================================
  // OPEN THE BOX GAME STATE (Slide 11 Wordwall)
  // ==========================================
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const [activeBoxModal, setActiveBoxModal] = useState<BoxChallenge | null>(null);
  const [boxUserInput, setBoxUserInput] = useState('');
  const [boxResult, setBoxResult] = useState<'correct' | 'incorrect' | null>(null);
  const [awardedTeam, setAwardedTeam] = useState<'A' | 'B'>('A');

  const displayedBoxes = OPEN_THE_BOX_30.filter(box => {
    if (boxFilter === 'level-medium') return box.level === 'Medium';
    if (boxFilter === 'level-twobee') return box.level === 'Two-Bee';
    if (boxFilter === 'level-champion') return box.level === 'Champion';
    return true;
  });

  const [stageIndex, setStageIndex] = useState(0);
  const [stageStrikes, setStageStrikes] = useState(0);
  const [stageInput, setStageInput] = useState('');
  const [stageStatus, setStageStatus] = useState<'spelling' | 'correct' | 'incorrect'>('spelling');
  const [activeClue, setActiveClue] = useState<'def' | 'sent' | 'part' | 'orig' | 'alt' | null>(null);

  // Unified Championship Stage Words Pool:
  // Combines OPEN_THE_BOX_30 with high-impact loan words from French, German, Italian, etc.
  const stageWordsList = React.useMemo(() => {
    const loanBoxes: BoxChallenge[] = COMPREHENSIVE_LOAN_WORDS.map((lw, idx) => ({
      boxNumber: 100 + idx,
      word: lw.word,
      definition: lw.definition,
      sentence: lw.sentence,
      hint: lw.spellingTip,
      level: 'Champion',
      points: 25
    }));

    if (stageCategory === 'loanwords') {
      return loanBoxes;
    }
    if (stageCategory === 'twobee') {
      return OPEN_THE_BOX_30;
    }
    return [...OPEN_THE_BOX_30, ...loanBoxes.slice(0, 20)];
  }, [stageCategory]);

  const currentStageWord = stageWordsList[stageIndex % stageWordsList.length];

  const getStageWordClues = () => {
    const w = currentStageWord;
    const loanMatch = COMPREHENSIVE_LOAN_WORDS.find(lw => lw.word.toLowerCase() === w.word.toLowerCase());
    const dictMatch = ALL_WORDS_MAP[w.word.toLowerCase()];

    return {
      definition: w.definition || loanMatch?.definition || dictMatch?.def || 'A championship spelling bee competition word.',
      sentence: w.sentence || loanMatch?.sentence || dictMatch?.ex || `The contestant spelled ${w.word} with poise.`,
      partOfSpeech: loanMatch?.partOfSpeech || (dictMatch ? 'noun' : 'noun / adjective'),
      origin: loanMatch?.languageOriginDetails || (loanMatch ? `${loanMatch.language} origin` : dictMatch?.orig || 'Greek / Latin / French root etymology'),
      alternatePronunciations: loanMatch?.alternatePronunciations || []
    };
  };

  const handleOpenBox = (box: BoxChallenge) => {
    setActiveBoxModal(box);
    setBoxUserInput('');
    setBoxResult(null);
    sound.playClick();
    humanVoice.speakWord(box.word);
  };

  const handleBoxSubmit = () => {
    if (!activeBoxModal || !boxUserInput.trim()) return;
    const isCorrect = boxUserInput.trim().toLowerCase() === activeBoxModal.word.toLowerCase();
    if (isCorrect) {
      setBoxResult('correct');
      sound.playCorrect();
      confetti({ particleCount: 35, spread: 60 });
      setOpenedBoxes(prev => Array.from(new Set([...prev, activeBoxModal.boxNumber])));
      if (onAwardTeamScore) {
        onAwardTeamScore(awardedTeam, activeBoxModal.points);
      }
    } else {
      setBoxResult('incorrect');
      sound.playIncorrect();
    }
  };

  const handleStageSubmit = () => {
    if (!stageInput.trim() || stageStatus !== 'spelling') return;
    const isCorrect = stageInput.trim().toLowerCase() === currentStageWord.word.toLowerCase();
    if (isCorrect) {
      setStageStatus('correct');
      sound.playCorrect();
      confetti({ particleCount: 40, spread: 70 });
      if (onAwardTeamScore) onAwardTeamScore('A', 10);
    } else {
      setStageStatus('incorrect');
      setStageStrikes(s => Math.min(3, s + 1));
      sound.playIncorrect();
    }
  };

  const handleNextStageWord = () => {
    setStageIndex(prev => prev + 1);
    setStageInput('');
    setStageStatus('spelling');
    setActiveClue(null);
    sound.playClick();
    const nextWord = stageWordsList[(stageIndex + 1) % stageWordsList.length];
    humanVoice.speakWord(nextWord.word);
  };

  const handleResetStage = () => {
    setStageStrikes(0);
    setStageIndex(0);
    setStageInput('');
    setStageStatus('spelling');
    setActiveClue(null);
    sound.playClick();
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase font-mono px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-400">
              Session Agenda: Part 5 (15 min)
            </span>
            <span className="text-xs font-black uppercase font-mono px-3 py-1 bg-purple-100 text-[#560e51] rounded-full border border-purple-300">
              Slide 10 & 11: Mock Bee Stage
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <span>English 1 Spelling Bee Stage</span>
            <Trophy className="h-7 w-7 text-amber-500" />
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 max-w-2xl">
            {genAlphaMode 
              ? "Step up to the English 1 championship mic! Open the 30 mystery boxes, follow the Say-Spell-Say protocol, and claim the Jakarta Grand Final trophy!" 
              : "Experience the official English 1 National Spelling Bee stage simulation and interactive 30-Box challenge aligned with Puspresnas Group B (Grades 3–4) & Group C standards."}
          </p>
        </div>

        {/* Action Tabs Switcher */}
        <div className="flex bg-[#fdf2fe] p-1.5 rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] gap-1 shrink-0">
          <button
            onClick={() => {
              setActiveTab('open-box');
              sound.playClick();
            }}
            className={`px-3 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'open-box'
                ? 'bg-[#78c222] text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Box className="h-4 w-4" /> Open the Box (30)
          </button>

          <button
            onClick={() => {
              setActiveTab('stage-sim');
              sound.playClick();
            }}
            className={`px-3 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'stage-sim'
                ? 'bg-[#560e51] text-white shadow-[2px_2px_0px_0px_#78c222]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Play className="h-4 w-4" /> Stage Sim
          </button>

          <button
            onClick={() => {
              setActiveTab('rules');
              sound.playClick();
            }}
            className={`px-3 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-[#9b2c98] text-white shadow-[2px_2px_0px_0px_#560e51]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Info className="h-4 w-4" /> Slide 9 Rules
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SLIDE 9 STAGE RULES                                                */}
      {/* ========================================================================= */}
      {activeTab === 'rules' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
          <div className="border-b-2 border-fuchsia-100 pb-4">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                Slide 9 · Official English 1 National Spelling Bee Protocol
              </span>
              <span className="text-[10px] font-mono font-black uppercase bg-[#78c222] text-[#560e51] px-2 py-0.5 rounded-full border border-[#560e51]">
                Puspresnas Recognized · Jakarta Final
              </span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase">
              English 1 Competition Rules & "Say – Spell – Say" Protocol
            </h3>
            <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
              Official guidelines for Group B (Grades 3–4) and Group C (Grades 5–6) participants competing in the English 1 National Spelling Bee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#fdf2fe] space-y-2 shadow-[3px_3px_0px_0px_#560e51]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#560e51] text-white font-black flex items-center justify-center font-mono">1</span>
                <h4 className="font-black text-slate-900 text-base uppercase">Pronouncer 3-Step Protocol</h4>
              </div>
              <p className="text-xs font-bold text-slate-700 pl-11">
                The pronouncer delivers each word in 3 steps: <strong>1. Says the word clearly</strong> ➔ <strong>2. Reads the sentence</strong> ➔ <strong>3. Repeats the word</strong>.
              </p>
            </div>

            <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#fefaf0] space-y-2 shadow-[3px_3px_0px_0px_#560e51]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black flex items-center justify-center font-mono">2</span>
                <h4 className="font-black text-slate-900 text-base uppercase">Mandatory "Say – Spell – Say"</h4>
              </div>
              <p className="text-xs font-bold text-slate-700 pl-11">
                Spellers must <strong>SAY</strong> the word first, <strong>SPELL</strong> each letter loudly and clearly, then <strong>SAY</strong> the word again to conclude.
              </p>
            </div>

            <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#f3f9eb] space-y-2 shadow-[3px_3px_0px_0px_#560e51]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#78c222] text-[#560e51] font-black flex items-center justify-center font-mono">3</span>
                <h4 className="font-black text-slate-900 text-base uppercase">Permitted Inquiries</h4>
              </div>
              <p className="text-xs font-bold text-slate-700 pl-11">
                Before spelling, contestants may ask: <em>"Can you repeat the word?"</em>, <em>"May I have the definition?"</em>, <em>"Part of speech?"</em>, or <em>"Language of origin?"</em>.
              </p>
            </div>

            <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#f5f3ff] space-y-2 shadow-[3px_3px_0px_0px_#560e51]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#9b2c98] text-white font-black flex items-center justify-center font-mono">4</span>
                <h4 className="font-black text-slate-900 text-base uppercase">No Retracing Letters</h4>
              </div>
              <p className="text-xs font-bold text-slate-700 pl-11">
                Once a letter is spoken into the microphone, it cannot be changed or retraced. Think carefully before uttering the first letter!
              </p>
            </div>

            <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#fff5f5] space-y-2 shadow-[3px_3px_0px_0px_#560e51]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-rose-600 text-white font-black flex items-center justify-center font-mono">5</span>
                <h4 className="font-black text-slate-900 text-base uppercase">Elimination & Judges</h4>
              </div>
              <p className="text-xs font-bold text-slate-700 pl-11">
                A single error leads to elimination in the finals. The judge announces "Incorrect" and gives the correct spelling. The next speller receives a new word.
              </p>
            </div>

            <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#eef2ff] space-y-2 shadow-[3px_3px_0px_0px_#560e51]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-black flex items-center justify-center font-mono">6</span>
                <h4 className="font-black text-slate-900 text-base uppercase">2-Speller Final Finish</h4>
              </div>
              <p className="text-xs font-bold text-slate-700 pl-11">
                When only two spellers remain, if one misspells, the other must spell that word correctly PLUS one additional championship word to win!
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => {
                setActiveTab('open-box');
                sound.playClick();
              }}
              className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] flex items-center gap-2 cursor-pointer"
            >
              Start Open the Box Challenge <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: OPEN THE BOX 30 (WORDWALL STYLE - SLIDE 11)                         */}
      {/* ========================================================================= */}
      {activeTab === 'open-box' && (
        <div className="space-y-6">
          <div className="bg-[#2a1735] text-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-purple-800">
              <div>
                <span className="text-xs font-mono font-black uppercase text-amber-400">
                  Slide 11 · Interactive Wordwall Activity
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
                  <span>Open the Box Challenge</span>
                  <Sparkles className="h-5 w-5 text-amber-400" />
                </h3>
                <p className="text-xs text-purple-200 mt-1">
                  Tap each box to open it and spell the secret bee challenge word! (Boxes 1–15: Foundations · Boxes 16–30: Two-Bee Mastery)
                </p>
              </div>

              {/* Filter & Team Award Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Meeting filter */}
                <div className="flex items-center gap-1 bg-purple-900/80 p-1.5 rounded-xl border border-purple-700">
                  <button
                    onClick={() => { setBoxFilter('all'); sound.playClick(); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase cursor-pointer ${boxFilter === 'all' ? 'bg-[#78c222] text-[#560e51] font-black' : 'text-purple-300'}`}
                  >
                    All (30)
                  </button>
                  <button
                    onClick={() => { setBoxFilter('level-medium'); sound.playClick(); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase cursor-pointer ${boxFilter === 'level-medium' ? 'bg-[#78c222] text-[#560e51] font-black' : 'text-purple-300'}`}
                  >
                    Foundations
                  </button>
                  <button
                    onClick={() => { setBoxFilter('level-twobee'); sound.playClick(); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase cursor-pointer ${boxFilter === 'level-twobee' ? 'bg-[#78c222] text-[#560e51] font-black' : 'text-purple-300'}`}
                  >
                    Two-Bee
                  </button>
                </div>

                {/* Award Team Switcher */}
                <div className="flex items-center gap-2 bg-purple-900/60 p-1.5 rounded-xl border border-purple-700">
                  <span className="text-[10px] font-black uppercase font-mono text-purple-300">Award:</span>
                  <button
                    onClick={() => setAwardedTeam('A')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black cursor-pointer ${awardedTeam === 'A' ? 'bg-emerald-500 text-white' : 'text-purple-300'}`}
                  >
                    Team A
                  </button>
                  <button
                    onClick={() => setAwardedTeam('B')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black cursor-pointer ${awardedTeam === 'B' ? 'bg-indigo-500 text-white' : 'text-purple-300'}`}
                  >
                    Team B
                  </button>
                </div>
              </div>
            </div>

            {/* 30 Numbered Boxes Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2.5 sm:gap-3">
              {displayedBoxes.map((box) => {
                const isOpened = openedBoxes.includes(box.boxNumber);
                const isM3 = box.boxNumber > 15;
                return (
                  <motion.button
                    key={box.boxNumber}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOpenBox(box)}
                    className={`h-16 sm:h-20 rounded-2xl border-3 flex flex-col items-center justify-center font-mono font-black transition-all cursor-pointer relative shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] ${
                      isOpened
                        ? 'bg-emerald-600 border-emerald-400 text-white'
                        : isM3
                          ? 'bg-gradient-to-b from-[#4d1f4f] to-[#250826] hover:from-[#6d2770] hover:to-[#3b0b3d] border-fuchsia-400 text-white'
                          : 'bg-gradient-to-b from-[#253d27] to-[#122413] hover:from-[#355738] hover:to-[#1b331c] border-lime-400 text-white'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl">{box.boxNumber}</span>
                    <span className="text-[9px] uppercase font-sans tracking-tight opacity-80">
                      {isOpened ? '✓ Solved' : isM3 ? 'M3' : 'M2'}
                    </span>
                    {isOpened && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-slate-900 text-[10px] font-black border border-slate-900">
                        ★
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-purple-300 border-t border-purple-800/80 pt-3 font-mono">
              <span>Boxes Solved: {openedBoxes.length} / 30</span>
              <button
                onClick={() => setOpenedBoxes([])}
                className="text-purple-300 hover:text-white underline cursor-pointer text-xs"
              >
                Reset All Boxes
              </button>
            </div>
          </div>

          {/* Box Modal */}
          <AnimatePresence>
            {activeBoxModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  className="bg-white rounded-[32px] p-6 sm:p-8 max-w-lg w-full border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6"
                >
                  <div className="flex items-center justify-between border-b-2 border-fuchsia-100 pb-3">
                    <span className="text-xs font-mono font-black uppercase px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
                      Box #{activeBoxModal.boxNumber} · {activeBoxModal.level} Level (+{activeBoxModal.points} Pts)
                    </span>
                    <button
                      onClick={() => setActiveBoxModal(null)}
                      className="p-1 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer font-black text-sm"
                    >
                      ✕ Close
                    </button>
                  </div>

                  {/* Audio Pronunciation */}
                  <div className="bg-[#fefaf0] p-5 rounded-2xl border-2 border-[#560e51] text-center space-y-3">
                    <span className="text-xs font-mono font-black uppercase text-amber-800">
                      Listen to Word Clue:
                    </span>
                    <div className="flex justify-center">
                      <button
                        onClick={() => humanVoice.speakWord(activeBoxModal.word)}
                        className="px-5 py-2.5 bg-[#9b2c98] hover:bg-[#852282] text-white font-black text-xs uppercase tracking-wide rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] flex items-center gap-2 cursor-pointer"
                      >
                        <Volume2 className="h-5 w-5 text-[#78c222]" /> Listen to Secret Word
                      </button>
                    </div>
                    <p className="text-xs font-bold text-slate-700 italic">
                      "{activeBoxModal.definition}"
                    </p>
                  </div>

                  {/* Input Form */}
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase font-mono text-slate-700 block">
                      Speller Submission:
                    </label>
                    <input
                      type="text"
                      value={boxUserInput}
                      onChange={(e) => setBoxUserInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleBoxSubmit()}
                      placeholder="Type the exact letters..."
                      autoFocus
                      className="w-full px-4 py-3 bg-[#fdf2fe] border-2 border-[#560e51] rounded-xl text-lg font-black text-slate-900 tracking-wider focus:outline-none focus:ring-2 focus:ring-[#78c222]"
                    />

                    {boxResult === 'correct' ? (
                      <div className="p-3.5 bg-emerald-100 rounded-xl border border-emerald-400 text-emerald-950 text-xs font-black uppercase flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        Brilliant! Awarded +{activeBoxModal.points} pts to Team {awardedTeam}!
                      </div>
                    ) : boxResult === 'incorrect' ? (
                      <div className="p-3.5 bg-rose-100 rounded-xl border border-rose-400 text-rose-950 text-xs font-bold space-y-1">
                        <p className="font-black uppercase flex items-center gap-1.5">
                          <XCircle className="h-4 w-4 text-rose-600" /> Not quite right!
                        </p>
                        <p className="text-[11px]">Hint: {activeBoxModal.hint}</p>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <button
                      onClick={() => humanVoice.speakSentence(activeBoxModal.sentence)}
                      className="text-xs font-bold text-[#560e51] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="h-3.5 w-3.5" /> Sample Sentence
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleBoxSubmit}
                        className="px-5 py-2.5 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
                      >
                        Submit Spelling
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: STAGE SIMULATOR (SLIDE 10 SCRIPPS STAGE SIM)                       */}
      {/* ========================================================================= */}
      {activeTab === 'stage-sim' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-fuchsia-100 pb-4">
            <div>
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">Slide 10 · Mock Spelling Bee Stage</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                Contestant at the Mic · Round {stageIndex + 1}
              </h3>
            </div>

            {/* Stage Pool Selector */}
            <div className="flex items-center gap-2 bg-[#fdf2fe] p-1 rounded-xl border border-[#560e51]">
              <span className="text-[10px] font-mono font-black uppercase text-slate-500 pl-1">Words:</span>
              <button
                onClick={() => { setStageCategory('all'); setStageIndex(0); sound.playClick(); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase cursor-pointer ${stageCategory === 'all' ? 'bg-[#560e51] text-white' : 'text-slate-600'}`}
              >
                All Pool ({stageWordsList.length})
              </button>
              <button
                onClick={() => { setStageCategory('twobee'); setStageIndex(0); sound.playClick(); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase cursor-pointer ${stageCategory === 'twobee' ? 'bg-[#78c222] text-[#560e51]' : 'text-slate-600'}`}
              >
                Two-Bee (30)
              </button>
              <button
                onClick={() => { setStageCategory('loanwords'); setStageIndex(0); sound.playClick(); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase cursor-pointer ${stageCategory === 'loanwords' ? 'bg-[#9b2c98] text-white' : 'text-slate-600'}`}
              >
                Loan Words 🌍
              </button>
            </div>
          </div>

          {/* Stage Strikes Tracker */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border-2 border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase font-mono text-slate-600">Stage Strikes:</span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((st) => (
                  <div
                    key={st}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-mono text-xs font-black ${
                      stageStrikes >= st
                        ? 'bg-rose-500 text-white border-rose-700'
                        : 'bg-white text-slate-300 border-slate-300'
                    }`}
                  >
                    ✕
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleResetStage}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-black uppercase rounded-xl border border-slate-300 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset Stage
            </button>
          </div>

          {/* Pronouncer Console */}
          <div className="bg-[#fefaf0] p-6 rounded-2xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] text-center space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-mono font-black uppercase text-amber-900">
                English 1 Official Pronouncer Podium · 3-Step Protocol & Clarifying Questions
              </span>
              <span className="text-[10px] font-mono font-black uppercase bg-[#78c222] text-[#560e51] px-2 py-0.5 rounded-full border border-[#560e51]">
                Group B & C Competition
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  humanVoice.speakWord(currentStageWord.word);
                }}
                className="px-6 py-3.5 bg-[#560e51] hover:bg-[#43093f] text-white font-black text-sm uppercase rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#78c222] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Volume2 className="h-5 w-5 text-[#78c222]" /> 1. Say Word
              </button>

              <button
                onClick={() => {
                  sound.playLetterKey();
                  const clues = getStageWordClues();
                  // English 1 3-step: Word -> Sentence -> Word
                  humanVoice.speakWord(currentStageWord.word);
                  setTimeout(() => {
                    humanVoice.speakSentence(clues.sentence);
                    setTimeout(() => {
                      humanVoice.speakWord(currentStageWord.word);
                    }, 3500);
                  }, 1200);
                }}
                className="px-6 py-3.5 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-sm uppercase rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="h-5 w-5 text-[#560e51]" /> English 1 Full 3-Step (Word ➔ Sentence ➔ Word)
              </button>
            </div>

            {/* Allowed Clarifying Questions (Official English 1 Competition Inquiries) */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={() => {
                  const clues = getStageWordClues();
                  setActiveClue(activeClue === 'def' ? null : 'def');
                  humanVoice.speakSentence(`Definition: ${clues.definition}`);
                  sound.playClick();
                }}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-xl border flex items-center gap-1 cursor-pointer transition-all ${
                  activeClue === 'def' ? 'bg-amber-400 text-slate-950 border-amber-600 font-black' : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-300'
                }`}
              >
                <HelpCircle className="h-3.5 w-3.5 text-amber-600" /> "Can I have the definition?"
              </button>

              <button
                onClick={() => {
                  const clues = getStageWordClues();
                  setActiveClue(activeClue === 'part' ? null : 'part');
                  humanVoice.speakSentence(`Part of speech: ${clues.partOfSpeech}`);
                  sound.playClick();
                }}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-xl border flex items-center gap-1 cursor-pointer transition-all ${
                  activeClue === 'part' ? 'bg-amber-400 text-slate-950 border-amber-600 font-black' : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-300'
                }`}
              >
                <HelpCircle className="h-3.5 w-3.5 text-amber-600" /> "What is the part of speech?"
              </button>

              <button
                onClick={() => {
                  const clues = getStageWordClues();
                  setActiveClue(activeClue === 'orig' ? null : 'orig');
                  humanVoice.speakSentence(`Language of origin: ${clues.origin}`);
                  sound.playClick();
                }}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-xl border flex items-center gap-1 cursor-pointer transition-all ${
                  activeClue === 'orig' ? 'bg-amber-400 text-slate-950 border-amber-600 font-black' : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-300'
                }`}
              >
                <HelpCircle className="h-3.5 w-3.5 text-amber-600" /> "What is the language of origin?"
              </button>

              <button
                onClick={() => {
                  const clues = getStageWordClues();
                  setActiveClue(activeClue === 'alt' ? null : 'alt');
                  if (clues.alternatePronunciations.length > 0) {
                    humanVoice.speakSentence(`Alternate pronunciations include: ${clues.alternatePronunciations.join(', ')}`);
                  } else {
                    humanVoice.speakSentence(`There are no alternate pronunciations for this word.`);
                  }
                  sound.playClick();
                }}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-xl border flex items-center gap-1 cursor-pointer transition-all ${
                  activeClue === 'alt' ? 'bg-amber-400 text-slate-950 border-amber-600 font-black' : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-300'
                }`}
              >
                <HelpCircle className="h-3.5 w-3.5 text-amber-600" /> "Are there alternate pronunciations?"
              </button>

              <button
                onClick={() => {
                  const clues = getStageWordClues();
                  setActiveClue(activeClue === 'sent' ? null : 'sent');
                  humanVoice.speakSentence(clues.sentence);
                  sound.playClick();
                }}
                className={`px-3 py-1.5 text-xs font-bold uppercase rounded-xl border flex items-center gap-1 cursor-pointer transition-all ${
                  activeClue === 'sent' ? 'bg-amber-400 text-slate-950 border-amber-600 font-black' : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-300'
                }`}
              >
                <HelpCircle className="h-3.5 w-3.5 text-amber-600" /> "Can you use it in a sentence?"
              </button>

              <button
                onClick={() => {
                  humanVoice.speakWord(currentStageWord.word);
                  sound.playClick();
                }}
                className="px-3 py-1.5 bg-white hover:bg-amber-50 text-slate-800 text-xs font-bold uppercase rounded-xl border border-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <Repeat className="h-3.5 w-3.5 text-amber-600" /> "Can you repeat the word?"
              </button>
            </div>

            {/* Clue Panel */}
            {activeClue === 'def' && (
              <div className="p-3 bg-white rounded-xl border border-amber-300 text-xs font-bold text-slate-800 animate-fadeIn text-left">
                <span className="font-mono text-amber-800 uppercase block font-black text-[10px]">📖 Official Definition:</span>
                <p className="mt-0.5">{getStageWordClues().definition}</p>
              </div>
            )}
            {activeClue === 'part' && (
              <div className="p-3 bg-white rounded-xl border border-amber-300 text-xs font-bold text-slate-800 animate-fadeIn text-left">
                <span className="font-mono text-amber-800 uppercase block font-black text-[10px]">🏷️ Part of Speech:</span>
                <p className="mt-0.5 capitalize">{getStageWordClues().partOfSpeech}</p>
              </div>
            )}
            {activeClue === 'orig' && (
              <div className="p-3 bg-white rounded-xl border border-amber-300 text-xs font-bold text-slate-800 animate-fadeIn text-left">
                <span className="font-mono text-amber-800 uppercase block font-black text-[10px]">🏛️ Language of Origin & Etymology:</span>
                <p className="mt-0.5">{getStageWordClues().origin}</p>
              </div>
            )}
            {activeClue === 'alt' && (
              <div className="p-3 bg-white rounded-xl border border-amber-300 text-xs font-bold text-slate-800 animate-fadeIn text-left">
                <span className="font-mono text-amber-800 uppercase block font-black text-[10px]">🗣️ Alternate Pronunciations:</span>
                <p className="mt-0.5">
                  {getStageWordClues().alternatePronunciations.length > 0
                    ? getStageWordClues().alternatePronunciations.join(' · ')
                    : 'None recorded in the official competition dictionary (single standardized pronunciation).'}
                </p>
              </div>
            )}
            {activeClue === 'sent' && (
              <div className="p-3 bg-white rounded-xl border border-amber-300 text-xs font-bold text-slate-800 italic animate-fadeIn text-left">
                <span className="font-mono text-amber-800 uppercase not-italic block font-black text-[10px]">💬 Sentence Usage:</span>
                <p className="mt-0.5">"{getStageWordClues().sentence}"</p>
              </div>
            )}
          </div>

          {/* Speller Response Input */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-black uppercase font-mono text-slate-700 block mb-1">
                Say your letters (Type your spelling):
              </label>
              <input
                type="text"
                value={stageInput}
                onChange={(e) => setStageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStageSubmit()}
                placeholder="Type your letters loud and clear..."
                disabled={stageStatus !== 'spelling'}
                className="w-full px-4 py-3 bg-[#fdf2fe] border-2 border-[#560e51] rounded-xl text-xl font-black text-slate-900 tracking-widest focus:outline-none"
              />
            </div>

            {stageStatus === 'spelling' ? (
              <button
                onClick={handleStageSubmit}
                className="w-full py-3.5 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer"
              >
                Submit Spelling to Judges
              </button>
            ) : stageStatus === 'correct' ? (
              <div className="space-y-3">
                <div className="p-4 bg-emerald-100 rounded-2xl border-2 border-emerald-500 text-emerald-950 font-black text-sm uppercase flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    Correct! The judges nod approvingly!
                  </span>
                  <span className="text-xs font-mono font-black">+10 PTS</span>
                </div>
                <button
                  onClick={handleNextStageWord}
                  className="w-full py-3 bg-[#560e51] hover:bg-[#43093f] text-white font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#78c222] cursor-pointer"
                >
                  Call Next Contestant (Next Word) →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-rose-100 rounded-2xl border-2 border-rose-500 text-rose-950 font-black text-sm uppercase flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-rose-600" />
                    (Bell Rings!) Incorrect. Correct spelling: {currentStageWord.word}
                  </span>
                  <span className="text-xs font-mono font-black">Strike Added</span>
                </div>
                <button
                  onClick={handleNextStageWord}
                  className="w-full py-3 bg-[#560e51] hover:bg-[#43093f] text-white font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#78c222] cursor-pointer"
                >
                  Next Speller →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
