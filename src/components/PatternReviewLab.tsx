import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Volume2, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Search,
  Filter,
  Layers,
  ArrowRight,
  Flame,
  Info,
  Target,
  Globe,
  Compass,
  Scale,
  ShieldCheck,
  Check,
  Lightbulb,
  Trophy,
  Shuffle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  LANGUAGE_ORIGIN_GUIDES, 
  ORIGIN_DIAGNOSTIC_QUIZ, 
  LanguageOriginGuide,
  OriginDiagnosticQuizItem
} from '../data/originPatternsData';
import { TRICKY_PATTERNS } from '../data/reviewData';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';
import { MeetingSession } from '../types';

interface PatternLabProps {
  onUpdateAccuracy?: (category: string, acc: number) => void;
  onAwardTeamScore?: (team: 'A' | 'B', pts: number) => void;
  genAlphaMode: boolean;
  activeMeeting?: MeetingSession;
  initialSubTab?: 'decoders' | 'detective' | 'homophones' | 'latin-roots';
}

export default function PatternReviewLab({ 
  onAwardTeamScore, 
  genAlphaMode, 
  activeMeeting = 'meeting-3',
  initialSubTab = 'decoders'
}: PatternLabProps) {
  // Main sub-tabs: 'decoders' (Language Guides) | 'detective' (Game Quiz) | 'homophones' (Origin Homophone Solver) | 'latin-roots' (Latin Arsenal)
  const [activeSubTab, setActiveSubTab] = useState<'decoders' | 'detective' | 'homophones' | 'latin-roots'>(initialSubTab);

  // Selected language in Decoders mode
  const [selectedLanguageId, setSelectedLanguageId] = useState<string>('latin');

  // Detective Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [showQuizSummary, setShowQuizSummary] = useState<boolean>(false);
  const [isPronouncing, setIsPronouncing] = useState<boolean>(false);

  // Homophone Origin Drill State
  const [homophoneIndex, setHomophoneIndex] = useState<number>(0);
  const [homophoneOriginRevealed, setHomophoneOriginRevealed] = useState<boolean>(false);
  const [homophoneSelectedWord, setHomophoneSelectedWord] = useState<string | null>(null);
  const [homophoneScore, setHomophoneScore] = useState<number>(0);
  const [homophoneFeedback, setHomophoneFeedback] = useState<boolean | null>(null);

  // Latin Roots Filter State
  const [latinCategory, setLatinCategory] = useState<'all' | 'prefixes' | 'roots' | 'suffixes' | 'endings'>('all');

  const currentLangGuide: LanguageOriginGuide = LANGUAGE_ORIGIN_GUIDES.find(g => g.id === selectedLanguageId) || LANGUAGE_ORIGIN_GUIDES[0];
  const currentQuizItem: OriginDiagnosticQuizItem = ORIGIN_DIAGNOSTIC_QUIZ[quizIndex % ORIGIN_DIAGNOSTIC_QUIZ.length];

  // List of Homophone pairs from origin guides
  const homophoneDrills = React.useMemo(() => {
    const list: {
      soundIpa: string;
      targetWord: string;
      confusedWith: string;
      targetOrigin: string;
      confusedOrigin: string;
      meaningTarget: string;
      meaningConfused: string;
      originClue: string;
      distinguishingRule: string;
    }[] = [
      {
        soundIpa: '/ɡəˈrɪl.ə/',
        targetWord: 'guerrilla',
        confusedWith: 'gorilla',
        targetOrigin: 'Spanish (diminutive of guerra, "war")',
        confusedOrigin: 'Greek (Gorillai, tribe of hairy individuals)',
        meaningTarget: 'Irregular warfare fighter using surprise ambush tactics',
        meaningConfused: 'A large, powerful great ape native to African forests',
        originClue: 'Pronouncer states: "Language of origin is Spanish."',
        distinguishingRule: 'Spanish diminutive starts with "gue-", has double r ("rr"), and double l ("ll"): g-u-e-r-r-i-l-l-a.'
      },
      {
        soundIpa: '/ˈkɑːm.plə.mənt/',
        targetWord: 'complement',
        confusedWith: 'compliment',
        targetOrigin: 'Latin (complementum, from complere, "to fill up, complete")',
        confusedOrigin: 'French / Italian (complimento, "polite praise")',
        meaningTarget: 'Something that completes or brings to perfection; pairs well together',
        meaningConfused: 'An expression of praise, admiration, or congratulation',
        originClue: 'Pronouncer states: "Language of origin is Latin."',
        distinguishingRule: 'Latin complEment complEtes (both share root letter "E"). Compliment with "I" is French praise.'
      },
      {
        soundIpa: '/ˈsteɪ.ʃən.er.i/',
        targetWord: 'stationary',
        confusedWith: 'stationery',
        targetOrigin: 'Latin (stationarius, from stare, "to stand still")',
        confusedOrigin: 'Middle English / Medieval Latin (stationarius, "bookseller with fixed stall")',
        meaningTarget: 'Motionless; staying in one fixed position',
        meaningConfused: 'Writing paper, matching envelopes, and letter accessories',
        originClue: 'Pronouncer states: "Language of origin is Latin, meaning standing still."',
        distinguishingRule: 'stationAry with an "A" is "At rest". stationEry with an "E" is for "Envelopes and lEtters".'
      },
      {
        soundIpa: '/ˈprɪn.sə.pəl/',
        targetWord: 'principal',
        confusedWith: 'principle',
        targetOrigin: 'Latin (principalis, "chief, first in rank")',
        confusedOrigin: 'Latin (principium, "foundational source, law of conduct")',
        meaningTarget: 'The head or director of a school; also the primary or most important item',
        meaningConfused: 'A fundamental truth, moral rule, or standard of behavior',
        originClue: 'Pronouncer states: "Latin principalis, meaning chief in rank."',
        distinguishingRule: 'Ends in -pal: "The principal is your PAL". Principle (-ple) is a moral ruLE.'
      },
      {
        soundIpa: '/flɛər/',
        targetWord: 'flair',
        confusedWith: 'flare',
        targetOrigin: 'Old French (flair, "sense of smell, keen discernment, natural talent")',
        confusedOrigin: 'Old Norse / Old English (flāra, "burst of bright flame")',
        meaningTarget: 'Special instinctive aptitude, talent, or stylish elegance',
        meaningConfused: 'A sudden burst of bright light or flame used as a distress signal',
        originClue: 'Pronouncer states: "Language of origin is Old French."',
        distinguishingRule: 'Natural stylish talent is French: f-l-a-i-r. Flaming signal is Old Norse: f-l-a-r-e.'
      },
      {
        soundIpa: '/bəˈzɑːr/',
        targetWord: 'bizarre',
        confusedWith: 'bazaar',
        targetOrigin: 'French (bizarre, "eccentric, fantastic, strange")',
        confusedOrigin: 'Persian (bāzār, "marketplace quarter")',
        meaningTarget: 'Markedly unusual in appearance, style, or character; grotesque',
        meaningConfused: 'An open-air marketplace or shopping arcade, especially in the Middle East',
        originClue: 'Pronouncer states: "Language of origin is French."',
        distinguishingRule: 'French strange oddity has double r: b-i-z-a-r-r-e. Persian market has two "a"s: b-a-z-a-a-r.'
      },
      {
        soundIpa: '/ˈpɛd.əl/',
        targetWord: 'pedal',
        confusedWith: 'peddle / petal',
        targetOrigin: 'Latin (ped- / pes, "foot")',
        confusedOrigin: 'Middle English pedlere (to sell goods) / Greek petalon (leaf)',
        meaningTarget: 'A foot-operated lever used for control or propulsion (e.g. on a bicycle or piano)',
        meaningConfused: 'Peddle = to sell door-to-door; Petal = colorful flower leaf',
        originClue: 'Pronouncer states: "Language of origin is Latin, from root for foot."',
        distinguishingRule: 'Latin root for foot gives pedAL (-al lever). Middle English selling is peddle; Greek flower leaf is petal.'
      }
    ];
    return list;
  }, []);

  const currentHomophoneDrill = homophoneDrills[homophoneIndex % homophoneDrills.length];

  // Pronounce word with humanVoice
  const handleSpeakWord = async (text: string) => {
    if (isPronouncing) return;
    setIsPronouncing(true);
    sound.playLetterKey();
    try {
      await humanVoice.speakWordTwice(text);
    } catch {
      // Audio fallback
    } finally {
      setIsPronouncing(false);
    }
  };

  // Detective Quiz handler
  const handleSelectQuizOption = (opt: string) => {
    if (isQuizAnswered) return;
    setSelectedQuizOption(opt);
    setIsQuizAnswered(true);

    const isCorrect = opt === currentQuizItem.correctOrigin;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      sound.playCorrect();
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      if (onAwardTeamScore) {
        onAwardTeamScore('B', 10);
      }
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextQuizQuestion = () => {
    if (quizIndex < ORIGIN_DIAGNOSTIC_QUIZ.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedQuizOption(null);
      setIsQuizAnswered(false);
      sound.playClick();
    } else {
      setShowQuizSummary(true);
      sound.playFanfare();
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setSelectedQuizOption(null);
    setIsQuizAnswered(false);
    setQuizScore(0);
    setShowQuizSummary(false);
    sound.playClick();
  };

  // Homophone answer handler
  const handleAnswerHomophone = (selectedWord: string) => {
    if (homophoneFeedback !== null) return;
    setHomophoneSelectedWord(selectedWord);
    const isCorrect = selectedWord.toLowerCase() === currentHomophoneDrill.targetWord.toLowerCase();
    setHomophoneFeedback(isCorrect);

    if (isCorrect) {
      setHomophoneScore(prev => prev + 1);
      sound.playCorrect();
      confetti({ particleCount: 25, spread: 50 });
      if (onAwardTeamScore) onAwardTeamScore('A', 10);
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextHomophone = () => {
    setHomophoneIndex(prev => (prev + 1) % homophoneDrills.length);
    setHomophoneOriginRevealed(false);
    setHomophoneSelectedWord(null);
    setHomophoneFeedback(null);
    sound.playClick();
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* HERO BANNER: HOW TO DISTINGUISH WORDS BY LANGUAGE OF ORIGIN                */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#560e51] via-[#6d1366] to-[#9b2c98] text-white rounded-[32px] p-6 sm:p-8 border-4 border-[#78c222] shadow-[6px_6px_0px_0px_#560e51] relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase font-mono bg-[#78c222] text-[#560e51] px-3 py-1 rounded-full border-2 border-white shadow-sm flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              Origin Detective Lab · 25 Minutes
            </span>
            <span className="text-xs font-black uppercase font-mono bg-white/20 text-white px-3 py-1 rounded-full border border-white/40">
              Latin · Greek · French · German · Italian · Spanish
            </span>
            <span className="text-xs font-black uppercase font-mono bg-amber-400 text-slate-950 px-3 py-1 rounded-full border border-amber-300">
              English 1 Homophone Protocol ⚖️
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
            How to Distinguish Words by Language of Origin 🏛️🥐🏺🥨
          </h2>

          <p className="text-xs sm:text-sm text-fuchsia-100 font-bold leading-relaxed">
            In competitive spelling bees, asking <em>"What is the language of origin?"</em> is the ultimate secret weapon. Each language leaves distinct <strong>orthographic footprints</strong>: Latin prefix patterns, Greek <em>ph</em> and <em>ch=/k/</em>, French silent ends and <em>-eau</em>, German consonant clusters (<em>sch, tz</em>), and Italian vowel endings. Master the giveaways and solve tricky homophones instantly!
          </p>

          {/* Interactive Lab Navigation Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <button
              onClick={() => { setActiveSubTab('decoders'); sound.playClick(); }}
              className={`p-3 rounded-2xl font-black text-xs uppercase tracking-tight border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                activeSubTab === 'decoders'
                  ? 'bg-[#78c222] text-[#560e51] border-white shadow-[3px_3px_0px_0px_white]'
                  : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>1. Origin Decoders</span>
              <span className="text-[10px] font-mono opacity-80">6 Languages & Clues</span>
            </button>

            <button
              onClick={() => { setActiveSubTab('detective'); sound.playClick(); }}
              className={`p-3 rounded-2xl font-black text-xs uppercase tracking-tight border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                activeSubTab === 'detective'
                  ? 'bg-[#78c222] text-[#560e51] border-white shadow-[3px_3px_0px_0px_white]'
                  : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>2. Detective Challenge</span>
              <span className="text-[10px] font-mono opacity-80">15-Question Quiz</span>
            </button>

            <button
              onClick={() => { setActiveSubTab('homophones'); sound.playClick(); }}
              className={`p-3 rounded-2xl font-black text-xs uppercase tracking-tight border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                activeSubTab === 'homophones'
                  ? 'bg-[#78c222] text-[#560e51] border-white shadow-[3px_3px_0px_0px_white]'
                  : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
              }`}
            >
              <Scale className="w-4 h-4" />
              <span>3. Origin Homophones</span>
              <span className="text-[10px] font-mono opacity-80">English 1 Protocol Solver</span>
            </button>

            <button
              onClick={() => { setActiveSubTab('latin-roots'); sound.playClick(); }}
              className={`p-3 rounded-2xl font-black text-xs uppercase tracking-tight border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                activeSubTab === 'latin-roots'
                  ? 'bg-[#78c222] text-[#560e51] border-white shadow-[3px_3px_0px_0px_white]'
                  : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>4. Latin Arsenal</span>
              <span className="text-[10px] font-mono opacity-80">Chameleon Prefixes</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: INTERACTIVE MASTER ORIGIN DECODERS                              */}
      {/* ========================================================================= */}
      {activeSubTab === 'decoders' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Language Selector Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51]">
            <span className="text-xs font-mono font-black uppercase text-[#560e51] mr-1 flex items-center gap-1">
              <Compass className="w-4 h-4 text-[#78c222]" /> Choose Origin:
            </span>
            {LANGUAGE_ORIGIN_GUIDES.map(guide => (
              <button
                key={guide.id}
                onClick={() => {
                  setSelectedLanguageId(guide.id);
                  sound.playClick();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedLanguageId === guide.id
                    ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                }`}
              >
                <span>{guide.flag}</span>
                <span>{guide.name}</span>
              </button>
            ))}
          </div>

          {/* Active Language Field Guide Card */}
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            
            <div className="border-b-2 border-stone-200 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentLangGuide.flag}</span>
                  <span className="text-xs font-mono font-black uppercase text-[#9b2c98] bg-fuchsia-50 px-3 py-1 rounded-full border border-fuchsia-200">
                    {currentLangGuide.badge}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase mt-1">
                  How to Identify {currentLangGuide.name} Words
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 max-w-3xl">
                  {currentLangGuide.whyEnglishBorrowed}
                </p>
              </div>

              <div className="p-3 bg-amber-50 rounded-2xl border-2 border-amber-300 text-xs font-bold text-amber-950 shrink-0 max-w-xs">
                <span className="font-mono font-black uppercase text-amber-800 block text-[11px] mb-1">
                  💡 Onstage Speller Strategy:
                </span>
                When the pronouncer confirms <strong>{currentLangGuide.name}</strong>, immediately apply these spelling footprints!
              </div>
            </div>

            {/* Giveaway Orthographic Clues */}
            <div className="p-5 rounded-2xl bg-[#fdfaf3] border-3 border-[#560e51] space-y-3">
              <h4 className="text-sm font-black uppercase font-mono text-[#560e51] flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-[#78c222]" /> Dead Giveaway Footprints for {currentLangGuide.name}:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentLangGuide.giveawayOrthography.map((clue, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-stone-300 shadow-xs">
                    <span className="w-5 h-5 rounded-full bg-[#560e51] text-white font-mono text-[10px] font-black inline-flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs font-bold text-slate-800 leading-relaxed">
                      {clue}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Spelling Rules Breakdown */}
            <div className="space-y-4">
              <h4 className="text-base font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" /> Essential {currentLangGuide.name} Orthographic Rules:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentLangGuide.coreSpellingRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border-2 border-stone-200 bg-stone-50/70 hover:bg-stone-50 transition-all space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase font-mono text-[#560e51]">
                          Rule #{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-md">
                          English 1 Certified
                        </span>
                      </div>
                      <h5 className="text-sm font-black text-slate-900 uppercase">
                        {rule.rule}
                      </h5>
                      <p className="text-xs font-medium text-slate-700 leading-relaxed">
                        {rule.explanation}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-stone-200">
                      <div className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                        <span className="font-black block uppercase text-[10px] text-emerald-900">Examples:</span>
                        {rule.exampleWords.join(' · ')}
                      </div>
                      <div className="text-[11px] font-mono font-bold text-rose-800 bg-rose-50 p-2 rounded-xl border border-rose-200">
                        <span className="font-black block uppercase text-[10px] text-rose-900">⚠️ Bee Trap:</span>
                        {rule.spellingTrap}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Championship Word Bank Showcase */}
            <div className="space-y-3 pt-2">
              <h4 className="text-base font-black uppercase tracking-tight text-slate-900 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-[#78c222]" /> Practice Words ({currentLangGuide.name} Arsenal):
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">Tap audio to hear Dr. Bailly</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentLangGuide.championshipWordBank.map((wb, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h5 className="text-xl font-serif font-black uppercase tracking-tight text-slate-900">
                          {wb.word}
                        </h5>
                        <button
                          onClick={() => handleSpeakWord(wb.word)}
                          className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 cursor-pointer flex items-center gap-1 text-xs font-bold"
                          title="Hear word pronounced"
                        >
                          <Volume2 className="h-4 w-4" />
                          <span>Pronounce</span>
                        </button>
                      </div>
                      <p className="text-xs font-mono font-bold text-slate-500 mt-0.5">
                        {wb.pronunciation}
                      </p>
                      <p className="text-xs font-bold text-slate-700 mt-1">
                        "{wb.definition}"
                      </p>
                      <p className="text-[11px] text-slate-600 italic mt-1 bg-stone-50 p-2 rounded-lg border border-stone-200">
                        "{wb.sentence}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-stone-100 text-[11px] font-mono text-purple-950 bg-fuchsia-50/70 p-2 rounded-xl border border-fuchsia-200">
                      <span className="font-black uppercase text-[10px] text-[#560e51] block">
                        🔑 Origin Footprint:
                      </span>
                      {wb.keyPattern}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => { setActiveSubTab('detective'); sound.playClick(); }}
                className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer flex items-center gap-2"
              >
                <span>Test Yourself on the Detective Quiz</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: INTERACTIVE ORIGIN DETECTIVE CHALLENGE (QUIZ)                   */}
      {/* ========================================================================= */}
      {activeSubTab === 'detective' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            
            {/* Quiz Progress & Score Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-stone-200 pb-4">
              <div>
                <span className="text-xs font-mono font-black uppercase text-[#9b2c98] bg-fuchsia-50 px-3 py-1 rounded-full border border-fuchsia-200">
                  Round {quizIndex + 1} of {ORIGIN_DIAGNOSTIC_QUIZ.length}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase mt-1">
                  Origin Detective: Deduce the Language! 🕵️
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-amber-50 rounded-xl border-2 border-amber-300 font-mono font-black text-xs text-amber-950 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-600" />
                  <span>Score: {quizScore} / {ORIGIN_DIAGNOSTIC_QUIZ.length}</span>
                </div>
                <button
                  onClick={handleRestartQuiz}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 cursor-pointer"
                  title="Restart Quiz"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!showQuizSummary ? (
              <div className="space-y-6">
                
                {/* Word Mystery Card */}
                <div className="p-6 rounded-2xl bg-[#fefaf0] border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-mono font-black uppercase text-amber-800">
                        Mystery Competition Word
                      </span>
                      <h4 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-950 uppercase mt-0.5">
                        {currentQuizItem.word}
                      </h4>
                      <p className="text-xs font-mono font-bold text-slate-500 mt-1">
                        {currentQuizItem.ipa}
                      </p>
                    </div>

                    <button
                      onClick={() => handleSpeakWord(currentQuizItem.audioText)}
                      className="px-5 py-3 rounded-2xl bg-[#560e51] text-[#78c222] hover:bg-[#43093f] font-black text-xs uppercase tracking-tight border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222] cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <Volume2 className="h-5 w-5" />
                      <span>Hear Pronouncer</span>
                    </button>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-amber-200 space-y-1">
                    <p className="text-xs font-bold text-slate-800">
                      <strong>📖 Definition:</strong> "{currentQuizItem.definition}"
                    </p>
                    <p className="text-xs font-medium text-slate-600 italic">
                      <strong>💬 Sentence:</strong> "{currentQuizItem.sentence}"
                    </p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs font-mono text-purple-950 font-bold">
                    <span className="font-black uppercase text-[10px] text-purple-900 block">
                      🔎 Orthographic Clue:
                    </span>
                    {currentQuizItem.clue}
                  </div>
                </div>

                {/* Question Prompt */}
                <div>
                  <h5 className="text-base font-black text-slate-900 uppercase">
                    What is the language of origin for this word?
                  </h5>
                  <p className="text-xs font-bold text-slate-500">
                    Select your answer below based on the sound and spelling clues:
                  </p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentQuizItem.options.map((opt, idx) => {
                    let btnStyle = 'bg-white hover:bg-stone-50 border-stone-300 text-slate-800 shadow-xs';
                    if (isQuizAnswered) {
                      if (opt === currentQuizItem.correctOrigin) {
                        btnStyle = 'bg-emerald-500 text-white border-emerald-700 shadow-[3px_3px_0px_0px_#065f46]';
                      } else if (opt === selectedQuizOption) {
                        btnStyle = 'bg-rose-500 text-white border-rose-700 shadow-[3px_3px_0px_0px_#881337]';
                      } else {
                        btnStyle = 'bg-stone-100 text-stone-400 border-stone-200 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectQuizOption(opt)}
                        disabled={isQuizAnswered}
                        className={`p-4 rounded-2xl border-3 font-black text-sm uppercase tracking-tight transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${btnStyle}`}
                      >
                        <span className="text-xl">
                          {opt === 'Latin' && '🏛️'}
                          {opt === 'Greek' && '🏺'}
                          {opt === 'French' && '🥐'}
                          {opt === 'German' && '🥨'}
                          {opt === 'Italian' && '🎻'}
                          {opt === 'Spanish' && '🌮'}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Banner */}
                {isQuizAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl border-3 space-y-2 ${
                      selectedQuizOption === currentQuizItem.correctOrigin
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                        : 'bg-rose-50 border-rose-500 text-rose-950'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {selectedQuizOption === currentQuizItem.correctOrigin ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          <span className="font-black uppercase text-xs font-mono text-emerald-800">
                            Correct Deduction! (+10 Team Points)
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-rose-600" />
                          <span className="font-black uppercase text-xs font-mono text-rose-800">
                            Origin Missed! The correct origin is {currentQuizItem.correctOrigin}.
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-xs font-bold leading-relaxed">
                      <strong>💡 Giveaway Explanation:</strong> {currentQuizItem.distinguishingReason}
                    </p>

                    {currentQuizItem.homophonePair && (
                      <div className="p-3 bg-white/80 rounded-xl border border-stone-300 text-xs text-slate-800 space-y-1">
                        <span className="font-mono font-black uppercase text-[10px] text-amber-800 block">
                          ⚖️ Homophone Connection:
                        </span>
                        <p>{currentQuizItem.homophonePair.whyOriginSolvesIt}</p>
                      </div>
                    )}

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleNextQuizQuestion}
                        className="px-6 py-2.5 bg-[#560e51] hover:bg-[#43093f] text-[#78c222] font-black text-xs uppercase tracking-wider rounded-xl border border-[#560e51] cursor-pointer flex items-center gap-2"
                      >
                        <span>{quizIndex < ORIGIN_DIAGNOSTIC_QUIZ.length - 1 ? 'Next Mystery Word' : 'See Final Report'}</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Quiz Summary Card */
              <div className="text-center p-8 bg-[#fdf2fe] rounded-3xl border-3 border-[#560e51] space-y-4">
                <span className="text-5xl">🏆</span>
                <h4 className="text-2xl sm:text-3xl font-black uppercase text-slate-900">
                  Detective Challenge Complete!
                </h4>
                <p className="text-sm font-bold text-slate-700 max-w-md mx-auto">
                  You scored <strong>{quizScore} out of {ORIGIN_DIAGNOSTIC_QUIZ.length}</strong>! You have mastered distinguishing words across Latin, Greek, French, German, Italian, and Spanish.
                </p>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={handleRestartQuiz}
                    className="px-6 py-3 bg-[#560e51] text-[#78c222] font-black text-xs uppercase rounded-xl border border-[#560e51] cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Try Detective Quiz Again</span>
                  </button>
                  <button
                    onClick={() => { setActiveSubTab('homophones'); sound.playClick(); }}
                    className="px-6 py-3 bg-[#78c222] text-[#560e51] font-black text-xs uppercase rounded-xl border border-[#560e51] cursor-pointer flex items-center gap-2"
                  >
                    <span>Proceed to Homophone Arena</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: ORIGIN-BASED HOMOPHONE ARENA (SCRIPPS RULE 4)                  */}
      {/* ========================================================================= */}
      {activeSubTab === 'homophones' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            
            <div className="border-b-2 border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-black uppercase text-[#9b2c98] bg-fuchsia-50 px-3 py-1 rounded-full border border-fuchsia-200">
                  English 1 Protocol Drill · Case #{homophoneIndex + 1} of {homophoneDrills.length}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase mt-1">
                  Solving Homophones with Language of Origin ⚖️
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                  Words that sound identical can only be cracked by asking for the <strong>Definition</strong> and <strong>Language of Origin</strong>!
                </p>
              </div>

              <div className="px-4 py-2 bg-emerald-50 rounded-xl border-2 border-emerald-300 font-mono font-black text-xs text-emerald-950 flex items-center gap-2 self-start sm:self-auto">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Score: {homophoneScore} / {homophoneDrills.length}</span>
              </div>
            </div>

            {/* Pronouncer Stage Mic Box */}
            <div className="p-6 rounded-2xl bg-[#fefaf0] border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200 pb-3">
                <div>
                  <span className="text-xs font-mono font-black uppercase text-amber-900">
                    Dr. Bailly (Pronouncer): "Your word sounds like:"
                  </span>
                  <h4 className="text-3xl font-serif font-black tracking-tight text-slate-900 uppercase">
                    {currentHomophoneDrill.soundIpa}
                  </h4>
                </div>

                <button
                  onClick={() => handleSpeakWord(currentHomophoneDrill.targetWord)}
                  className="px-5 py-3 rounded-2xl bg-[#560e51] text-[#78c222] hover:bg-[#43093f] font-black text-xs uppercase tracking-tight border-2 border-[#560e51] cursor-pointer flex items-center gap-2 shrink-0"
                >
                  <Volume2 className="h-5 w-5" />
                  <span>Listen to Sound</span>
                </button>
              </div>

              {/* Speller's Question Button */}
              <div className="p-4 bg-white rounded-xl border-2 border-stone-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-mono font-black uppercase text-[#560e51]">
                      Speller Inquiry (English 1 Protocol):
                    </span>
                    <p className="text-xs font-bold text-slate-800">
                      "Could you please tell me the language of origin and meaning?"
                    </p>
                  </div>

                  {!homophoneOriginRevealed ? (
                    <button
                      onClick={() => { setHomophoneOriginRevealed(true); sound.playFanfare(); }}
                      className="px-4 py-2 bg-[#78c222] text-[#560e51] hover:bg-[#68ab1c] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] cursor-pointer flex items-center gap-1.5 shrink-0"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Ask Pronouncer for Origin</span>
                    </button>
                  ) : (
                    <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                      ✓ Origin Unlocked!
                    </span>
                  )}
                </div>

                {homophoneOriginRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="pt-2 border-t border-stone-200 space-y-2 text-xs"
                  >
                    <p className="font-bold text-slate-900">
                      <strong>🏛️ Pronouncer Origin Response:</strong> "{currentHomophoneDrill.originClue}"
                    </p>
                    <p className="font-medium text-slate-700">
                      <strong>📖 Intended Meaning:</strong> "{currentHomophoneDrill.meaningTarget}"
                    </p>
                  </motion.div>
                )}
              </div>

              {/* The Dilemma: Which spelling is correct? */}
              <div className="space-y-3 pt-2">
                <h5 className="text-sm font-black uppercase tracking-tight text-slate-900">
                  Based on the origin and definition, which spelling is correct?
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[currentHomophoneDrill.targetWord, currentHomophoneDrill.confusedWith].map((wordOption, idx) => {
                    const isTarget = wordOption.toLowerCase() === currentHomophoneDrill.targetWord.toLowerCase();
                    let cardStyle = 'bg-white hover:bg-stone-50 border-[#560e51]';
                    if (homophoneFeedback !== null) {
                      if (isTarget) {
                        cardStyle = 'bg-emerald-50 border-emerald-600 text-emerald-950';
                      } else if (wordOption === homophoneSelectedWord) {
                        cardStyle = 'bg-rose-50 border-rose-600 text-rose-950';
                      } else {
                        cardStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerHomophone(wordOption)}
                        disabled={homophoneFeedback !== null}
                        className={`p-5 rounded-2xl border-3 text-left transition-all cursor-pointer space-y-2 shadow-xs ${cardStyle}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-serif font-black uppercase tracking-tight">
                            {wordOption}
                          </span>
                          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                            Option {idx + 1}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-600">
                          {isTarget ? currentHomophoneDrill.meaningTarget : currentHomophoneDrill.meaningConfused}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback and Linguistic Rule */}
              {homophoneFeedback !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-5 rounded-2xl border-3 space-y-2 ${
                    homophoneFeedback
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                      : 'bg-rose-50 border-rose-500 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {homophoneFeedback ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        <span className="font-black uppercase text-xs font-mono text-emerald-800">
                          Flawless Origin Application! (+10 Team Points)
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-rose-600" />
                        <span className="font-black uppercase text-xs font-mono text-rose-800">
                          Watch the Origin Trap!
                        </span>
                      </>
                    )}
                  </div>

                  <p className="text-xs font-bold leading-relaxed">
                    <strong>🔑 Rule that Solves It:</strong> {currentHomophoneDrill.distinguishingRule}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNextHomophone}
                      className="px-6 py-2 bg-[#560e51] hover:bg-[#43093f] text-[#78c222] font-black text-xs uppercase tracking-wider rounded-xl border border-[#560e51] cursor-pointer flex items-center gap-2"
                    >
                      <span>Next Homophone Challenge</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: LATIN ARSENAL & CHAMELEON PREFIXES                              */}
      {/* ========================================================================= */}
      {activeSubTab === 'latin-roots' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            
            <div className="border-b-2 border-stone-200 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏛️</span>
                <span className="text-xs font-mono font-black uppercase text-[#9b2c98] bg-fuchsia-50 px-3 py-1 rounded-full border border-fuchsia-200">
                  Latin Morphology Mastery
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase mt-1">
                The Latin Prefix & Root Arsenal 🏛️
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 max-w-3xl">
                More than 60% of all English competition words are built like Lego blocks from Latin prefixes, roots, and suffixes. Learn these 4 master categories to spell hundreds of words without memorizing letter-by-letter!
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Latin Components' },
                { id: 'prefixes', label: '1. Chameleon Prefixes (ad-, con-, in-)' },
                { id: 'roots', label: '2. High-Frequency Roots (aud, scrib, dict)' },
                { id: 'suffixes', label: '3. Suffixes (-ible vs -able, -or)' },
                { id: 'endings', label: '4. Classical Endings (-um, -us)' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => { setLatinCategory(cat.id as any); sound.playClick(); }}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                    latinCategory === cat.id
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Latin Concept Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1: Chameleon Prefixes */}
              {(latinCategory === 'all' || latinCategory === 'prefixes') && (
                <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#fdfaf3] space-y-3">
                  <span className="text-xs font-mono font-black uppercase text-fuchsia-800 bg-fuchsia-100 px-2.5 py-0.5 rounded-md">
                    Part 1: Chameleon Prefixes
                  </span>
                  <h4 className="text-lg font-black text-slate-900 uppercase">
                    Assimilated Prefixes: Why Consonants Double
                  </h4>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    When the Latin prefix <strong>ad-</strong> (to/toward) meets a root starting with c, f, p, or t, the 'd' transforms into that letter to make pronunciation smoother:
                  </p>
                  <div className="space-y-1.5 font-mono text-xs bg-white p-3 rounded-xl border border-stone-300">
                    <p className="text-purple-900 font-bold">ad- + cumulus ➔ <strong>accumulate</strong> (double c)</p>
                    <p className="text-purple-900 font-bold">ad- + parere ➔ <strong>apparent</strong> (double p)</p>
                    <p className="text-purple-900 font-bold">ad- + tendere ➔ <strong>attend</strong> (double t)</p>
                    <p className="text-purple-900 font-bold">ad- + fides ➔ <strong>affidavit</strong> (double f)</p>
                  </div>
                  <p className="text-[11px] font-bold text-amber-900 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    💡 Bee Trick: Whenever you hear /əˈk/ or /əˈp/ in a Latin word, check if it's an assimilated prefix requiring double letters!
                  </p>
                </div>
              )}

              {/* Card 2: Latin Roots */}
              {(latinCategory === 'all' || latinCategory === 'roots') && (
                <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#fdfaf3] space-y-3">
                  <span className="text-xs font-mono font-black uppercase text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-md">
                    Part 2: Core Roots
                  </span>
                  <h4 className="text-lg font-black text-slate-900 uppercase">
                    5 Roots that Unlock 100+ Words
                  </h4>
                  <div className="space-y-2 text-xs font-bold text-slate-800">
                    <div className="p-2.5 bg-white rounded-xl border border-stone-300">
                      <strong>aud / audit</strong> (to hear) ➔ auditorium, audible, audience, audition
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-stone-300">
                      <strong>scrib / script</strong> (to write) ➔ manuscript, describe, scripture, scribble
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-stone-300">
                      <strong>dict</strong> (to speak) ➔ dictation, predict, contradict, dictionary
                    </div>
                    <div className="p-2.5 bg-white rounded-xl border border-stone-300">
                      <strong>port</strong> (to carry) ➔ transport, export, portable, deport
                    </div>
                  </div>
                </div>
              )}

              {/* Card 3: Suffixes */}
              {(latinCategory === 'all' || latinCategory === 'suffixes') && (
                <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#fdfaf3] space-y-3">
                  <span className="text-xs font-mono font-black uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                    Part 3: -ible vs -able & -or
                  </span>
                  <h4 className="text-lg font-black text-slate-900 uppercase">
                    Suffix Rules that Prevent Elimination
                  </h4>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    <strong>-ible</strong> is used when the base cannot stand alone as an English word: <em>audible</em>, <em>visible</em>, <em>incredible</em>, <em>compatible</em>.
                  </p>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    <strong>-or (Agent Suffix):</strong> Persons who do actions in Latin end in -or: <em>gladiator</em>, <em>spectator</em>, <em>benefactor</em>, <em>curator</em> (never -er).
                  </p>
                </div>
              )}

              {/* Card 4: Endings in -um and -us */}
              {(latinCategory === 'all' || latinCategory === 'endings') && (
                <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#fdfaf3] space-y-3">
                  <span className="text-xs font-mono font-black uppercase text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-md">
                    Part 4: Classical Noun Endings
                  </span>
                  <h4 className="text-lg font-black text-slate-900 uppercase">
                    Latin Endings in -um and -us
                  </h4>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    Roman neuter nouns end in <strong>-um</strong>: <em>curriculum</em>, <em>millennium</em>, <em>aqueduct</em>, <em>memorandum</em>, <em>colosseum</em>, <em>pendulum</em>, <em>equilibrium</em>.
                  </p>
                  <p className="text-xs font-medium text-slate-700 leading-relaxed">
                    Masculine Roman nouns end in <strong>-us</strong>: <em>status</em>, <em>consensus</em>, <em>apparatus</em>, <em>radius</em>.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Practice Jump */}
            <div className="flex justify-end pt-2">
              <button
                onClick={() => { setActiveSubTab('decoders'); setSelectedLanguageId('latin'); sound.playClick(); }}
                className="px-6 py-3 bg-[#560e51] hover:bg-[#43093f] text-[#78c222] font-black text-xs uppercase tracking-wider rounded-xl border border-[#560e51] cursor-pointer flex items-center gap-2"
              >
                <span>View All 27 Latin Competition Words in Decoders</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
