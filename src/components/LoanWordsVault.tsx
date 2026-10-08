import React, { useState } from 'react';
import { 
  Globe, 
  Volume2, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Trophy, 
  Repeat, 
  Search, 
  BookOpen, 
  Lightbulb, 
  Languages, 
  Compass, 
  Flame, 
  Shuffle,
  ShieldCheck,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { LoanWord, LoanLanguage } from '../types';
import { COMPREHENSIVE_LOAN_WORDS } from '../data/loanWordsData';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';

interface LoanWordsVaultProps {
  onNavigateTab?: (tab: string) => void;
  genAlphaMode: boolean;
}

export default function LoanWordsVault({ onNavigateTab, genAlphaMode }: LoanWordsVaultProps) {
  // Navigation sub-modes: 'podium' | 'catalog' | 'rules'
  const [subMode, setSubMode] = useState<'podium' | 'catalog' | 'rules'>('podium');

  // Filter states
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Podium state
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [spellerInput, setSpellerInput] = useState<string>('');
  const [spellerStatus, setSpellerStatus] = useState<'ready' | 'correct' | 'incorrect'>('ready');
  const [activeQuestion, setActiveQuestion] = useState<'def' | 'part' | 'orig' | 'alt' | 'sent' | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [lastPronouncedText, setLastPronouncedText] = useState<string>('');
  const [unlockedQuestions, setUnlockedQuestions] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState<number>(0);
  const [attemptedWords, setAttemptedWords] = useState<string[]>([]);

  // Filtered list for catalog / podium pool
  const filteredWords = React.useMemo(() => {
    return COMPREHENSIVE_LOAN_WORDS.filter(w => {
      const matchLang = selectedLanguage === 'All' || w.language === selectedLanguage;
      const matchDiff = selectedDifficulty === 'All' || w.difficulty === selectedDifficulty;
      const matchSearch = searchQuery.trim() === '' || 
        w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.language.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLang && matchDiff && matchSearch;
    });
  }, [selectedLanguage, selectedDifficulty, searchQuery]);

  const currentWord: LoanWord = filteredWords[currentWordIndex % Math.max(1, filteredWords.length)] || COMPREHENSIVE_LOAN_WORDS[0];

  const handleSelectWord = (idx: number) => {
    setCurrentWordIndex(idx);
    setSpellerInput('');
    setSpellerStatus('ready');
    setActiveQuestion(null);
    setUnlockedQuestions({});
    setLastPronouncedText('');
    sound.playClick();
  };

  const handleNextWord = () => {
    if (filteredWords.length === 0) return;
    const nextIdx = (currentWordIndex + 1) % filteredWords.length;
    handleSelectWord(nextIdx);
  };

  const handlePrevWord = () => {
    if (filteredWords.length === 0) return;
    const prevIdx = (currentWordIndex - 1 + filteredWords.length) % filteredWords.length;
    handleSelectWord(prevIdx);
  };

  const handleShuffle = () => {
    if (filteredWords.length === 0) return;
    const randomIdx = Math.floor(Math.random() * filteredWords.length);
    handleSelectWord(randomIdx);
  };

  // Audio actions
  const speakCurrentWord = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    sound.playClick();
    setLastPronouncedText(`Dr. Bailly: "Your word is: ${currentWord.word}"`);
    try {
      await humanVoice.speakWordTwice(currentWord.word);
    } catch {
      // Audio fallback
    } finally {
      setIsSpeaking(false);
    }
  };

  // 5 Official English 1 Competition Clarifying Inquiries
  const handleAskQuestion = async (qType: 'def' | 'part' | 'orig' | 'alt' | 'sent') => {
    if (isSpeaking) return;
    sound.playClick();
    setActiveQuestion(qType);
    setUnlockedQuestions(prev => ({ ...prev, [qType]: true }));
    setIsSpeaking(true);

    let speechText = '';
    let displayText = '';

    if (qType === 'def') {
      speechText = `Definition: ${currentWord.definition}`;
      displayText = `📖 Definition: "${currentWord.definition}"`;
    } else if (qType === 'part') {
      speechText = `Part of speech: ${currentWord.partOfSpeech}`;
      displayText = `🏷️ Part of Speech: ${currentWord.partOfSpeech}`;
    } else if (qType === 'orig') {
      speechText = `This word comes from: ${currentWord.languageOriginDetails}`;
      displayText = `🏛️ Language of Origin & Etymology: ${currentWord.languageOriginDetails}`;
    } else if (qType === 'alt') {
      if (currentWord.alternatePronunciations && currentWord.alternatePronunciations.length > 0) {
        speechText = `Alternate pronunciations include: ${currentWord.alternatePronunciations.join(', ')}`;
        displayText = `🗣️ Alternate Pronunciations: ${currentWord.alternatePronunciations.join(' · ')}`;
      } else {
        speechText = `There are no alternate pronunciations for this word.`;
        displayText = `🗣️ Alternate Pronunciations: None recorded in the Merriam-Webster competition dictionary.`;
      }
    } else if (qType === 'sent') {
      speechText = currentWord.sentence;
      displayText = `💬 Sentence: "${currentWord.sentence}"`;
    }

    setLastPronouncedText(displayText);

    try {
      await humanVoice.speakSentence(speechText);
    } catch {
      // Audio fallback
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleSpellerSubmit = () => {
    if (spellerStatus !== 'ready' || !spellerInput.trim()) return;
    const isCorrect = spellerInput.trim().toLowerCase() === currentWord.word.toLowerCase();

    if (isCorrect) {
      setSpellerStatus('correct');
      sound.playCorrect();
      confetti({ particleCount: 45, spread: 70 });
      setScore(prev => prev + 15);
      if (!attemptedWords.includes(currentWord.id)) {
        setAttemptedWords(prev => [...prev, currentWord.id]);
      }
    } else {
      setSpellerStatus('incorrect');
      sound.playIncorrect();
      if (!attemptedWords.includes(currentWord.id)) {
        setAttemptedWords(prev => [...prev, currentWord.id]);
      }
    }
  };

  const languagesList: Array<{ name: string; count: number; flag: string }> = [
    { name: 'All', count: COMPREHENSIVE_LOAN_WORDS.length, flag: '🌍' },
    { name: 'Latin', count: COMPREHENSIVE_LOAN_WORDS.filter(w => w.language === 'Latin').length, flag: '🏛️' },
    { name: 'French', count: COMPREHENSIVE_LOAN_WORDS.filter(w => w.language === 'French').length, flag: '🥐' },
    { name: 'Greek', count: COMPREHENSIVE_LOAN_WORDS.filter(w => w.language === 'Greek').length, flag: '🏺' },
    { name: 'German', count: COMPREHENSIVE_LOAN_WORDS.filter(w => w.language === 'German').length, flag: '🥨' },
    { name: 'Italian', count: COMPREHENSIVE_LOAN_WORDS.filter(w => w.language === 'Italian').length, flag: '🎻' },
    { name: 'Spanish', count: COMPREHENSIVE_LOAN_WORDS.filter(w => w.language === 'Spanish').length, flag: '🌮' },
    { name: 'Japanese', count: COMPREHENSIVE_LOAN_WORDS.filter(w => w.language === 'Japanese').length, flag: '🇯🇵' },
    { name: 'Arabic', count: COMPREHENSIVE_LOAN_WORDS.filter(w => w.language === 'Arabic').length, flag: '🌙' },
    { name: 'Hindi & Sanskrit', count: COMPREHENSIVE_LOAN_WORDS.filter(w => w.language === 'Hindi & Sanskrit').length, flag: '🕉️' }
  ];

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* HERO BANNER: LOAN WORDS CHAMPIONSHIP VAULT                                */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#560e51] via-[#75166f] to-[#9b2c98] text-white rounded-[32px] p-6 sm:p-8 md:p-10 border-4 border-[#78c222] shadow-[8px_8px_0px_0px_#560e51] relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase font-mono bg-[#78c222] text-[#560e51] px-3.5 py-1 rounded-full border-2 border-white shadow-sm flex items-center gap-1.5">
              <Globe className="h-4 w-4" /> Global Loan Words Vault · Etymology Lab
            </span>
            <span className="text-xs font-black uppercase font-mono bg-white/20 text-white px-3 py-1 rounded-full border border-white/40">
              English 1 Competition Clarifying Inquiries 🎙️
            </span>
            <span className="text-xs font-black uppercase font-mono bg-amber-400 text-stone-950 px-3 py-1 rounded-full border border-amber-300">
              {COMPREHENSIVE_LOAN_WORDS.length} Competition Words
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            Championship Loan Words & Etymology Arsenal 🌍
          </h2>

          <p className="text-sm sm:text-base text-fuchsia-100 font-bold leading-relaxed max-w-3xl">
            English is the great borrower of the linguistic world! Over <strong>60% of modern English vocabulary</strong> is borrowed from French, German, Italian, Spanish, Japanese, Arabic, and Sanskrit. In the <strong>English 1 National Spelling Bee</strong>, loanwords are the ultimate deciders. Master the allowed speller clarifying inquiries to unlock their silent letters, acute accents, and hidden foreign roots!
          </p>

          {/* Quick Sub-Navigation */}
          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => { setSubMode('podium'); sound.playClick(); }}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide border-2 transition-all cursor-pointer flex items-center gap-2 ${
                subMode === 'podium'
                  ? 'bg-[#78c222] text-[#560e51] border-white shadow-[2px_2px_0px_0px_white]'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/40'
              }`}
            >
              <Trophy className="h-4 w-4" /> 1. Stage Pronouncer Podium 🎙️
            </button>

            <button
              onClick={() => { setSubMode('catalog'); sound.playClick(); }}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide border-2 transition-all cursor-pointer flex items-center gap-2 ${
                subMode === 'catalog'
                  ? 'bg-[#78c222] text-[#560e51] border-white shadow-[2px_2px_0px_0px_white]'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/40'
              }`}
            >
              <Languages className="h-4 w-4" /> 2. Language Cards Explorer 📖
            </button>

            <button
              onClick={() => { setSubMode('rules'); sound.playClick(); }}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wide border-2 transition-all cursor-pointer flex items-center gap-2 ${
                subMode === 'rules'
                  ? 'bg-[#78c222] text-[#560e51] border-white shadow-[2px_2px_0px_0px_white]'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/40'
              }`}
            >
              <ShieldCheck className="h-4 w-4" /> 3. Rule 4 Question Guide 📜
            </button>
          </div>
        </div>

        {/* Decorative Badge */}
        <div className="hidden lg:block absolute -right-6 -bottom-8 opacity-20 pointer-events-none text-[220px]">
          🌍
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: THE STAGE PRONOUNCER PODIUM (RULE 4 INTERACTIVE STAGE DRILL)       */}
      {/* ========================================================================= */}
      {subMode === 'podium' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Control Bar */}
          <div className="bg-white rounded-3xl p-5 border-4 border-[#560e51] shadow-[5px_5px_0px_0px_#560e51] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-[#560e51] text-[#78c222] font-black text-sm flex items-center justify-center font-mono">
                #{currentWordIndex + 1}
              </span>
              <div>
                <span className="text-[11px] font-mono font-black uppercase text-[#9b2c98]">
                  Contestant at the Microphone
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-fuchsia-100 text-[#560e51] border border-fuchsia-300">
                    Origin: {currentWord.language}
                  </span>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                    Level: {currentWord.difficulty}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-[#fdf2fe] px-3.5 py-1.5 rounded-xl border-2 border-[#560e51] font-mono font-black text-xs text-[#560e51]">
                Score: {score} pts ({attemptedWords.length} tested)
              </div>

              <button
                onClick={handlePrevWord}
                className="p-2 bg-white hover:bg-slate-100 text-slate-800 rounded-xl border-2 border-slate-300 cursor-pointer"
                title="Previous Word"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                onClick={handleShuffle}
                className="p-2 bg-white hover:bg-amber-50 text-amber-800 rounded-xl border-2 border-amber-300 cursor-pointer"
                title="Random Word"
              >
                <Shuffle className="h-4 w-4" />
              </button>

              <button
                onClick={handleNextWord}
                className="p-2 bg-white hover:bg-slate-100 text-slate-800 rounded-xl border-2 border-slate-300 cursor-pointer"
                title="Next Word"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Dr. Bailly Pronouncer Stage Podium */}
          <div className="bg-gradient-to-br from-[#fffdfa] to-[#fbf7ee] rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border-2 border-amber-300 text-amber-900 text-xs font-mono font-black uppercase tracking-wider">
                <span>🎙️ Pronouncer Podium · English 1 National Spelling Bee</span>
              </div>

              <p className="text-xs font-bold text-slate-600 max-w-xl mx-auto">
                Listen to the mystery word. Before spelling, exercise your <strong>English 1 Competition Inquiries</strong> by asking the Pronouncer for definition, part of speech, origin, alternate pronunciations, or a sentence!
              </p>

              {/* Big Audio Trigger */}
              <div className="pt-2">
                <button
                  onClick={speakCurrentWord}
                  disabled={isSpeaking}
                  className="px-8 py-4 bg-[#560e51] hover:bg-[#43093f] active:scale-95 text-white font-black text-base sm:text-lg uppercase rounded-2xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#78c222] inline-flex items-center gap-3 transition-all cursor-pointer"
                >
                  <Volume2 className="h-6 w-6 text-[#78c222] animate-pulse" />
                  <span>{isSpeaking ? 'Dr. Bailly is Pronouncing...' : 'Pronounce Secret Loanword'}</span>
                </button>
              </div>

              {lastPronouncedText && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 max-w-2xl mx-auto text-xs font-mono text-slate-800 animate-fadeIn">
                  {lastPronouncedText}
                </div>
              )}
            </div>

            {/* Official Speller Inquiry Console (All 5 Official Questions) */}
            <div className="bg-white rounded-2xl p-5 border-2 border-fuchsia-200 shadow-sm space-y-3">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98] block text-center">
                Speller's Allowed Rule 4 Questions (Click to Ask Dr. Bailly):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {/* 1. Definition */}
                <button
                  onClick={() => handleAskQuestion('def')}
                  disabled={isSpeaking}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activeQuestion === 'def'
                      ? 'bg-amber-400 text-slate-950 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">📖</span>
                    {unlockedQuestions['def'] && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase block">Question 1</span>
                    <strong className="text-xs leading-tight block">"Definition?"</strong>
                  </div>
                </button>

                {/* 2. Part of Speech */}
                <button
                  onClick={() => handleAskQuestion('part')}
                  disabled={isSpeaking}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activeQuestion === 'part'
                      ? 'bg-amber-400 text-slate-950 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">🏷️</span>
                    {unlockedQuestions['part'] && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase block">Question 2</span>
                    <strong className="text-xs leading-tight block">"Part of Speech?"</strong>
                  </div>
                </button>

                {/* 3. Language of Origin */}
                <button
                  onClick={() => handleAskQuestion('orig')}
                  disabled={isSpeaking}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activeQuestion === 'orig'
                      ? 'bg-amber-400 text-slate-950 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">🏛️</span>
                    {unlockedQuestions['orig'] && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase block">Question 3</span>
                    <strong className="text-xs leading-tight block">"Language Origin?"</strong>
                  </div>
                </button>

                {/* 4. Alternate Pronunciations */}
                <button
                  onClick={() => handleAskQuestion('alt')}
                  disabled={isSpeaking}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activeQuestion === 'alt'
                      ? 'bg-amber-400 text-slate-950 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">🗣️</span>
                    {unlockedQuestions['alt'] && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase block">Question 4</span>
                    <strong className="text-xs leading-tight block">"Alternates?"</strong>
                  </div>
                </button>

                {/* 5. Sentence */}
                <button
                  onClick={() => handleAskQuestion('sent')}
                  disabled={isSpeaking}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    activeQuestion === 'sent'
                      ? 'bg-amber-400 text-slate-950 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-800 border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">💬</span>
                    {unlockedQuestions['sent'] && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase block">Question 5</span>
                    <strong className="text-xs leading-tight block">"In a Sentence?"</strong>
                  </div>
                </button>
              </div>

              {/* Clue Details Banner */}
              {activeQuestion && (
                <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-[11px] font-mono font-black uppercase text-amber-900">
                    <span>
                      {activeQuestion === 'def' && '📖 Official Definition'}
                      {activeQuestion === 'part' && '🏷️ Part of Speech'}
                      {activeQuestion === 'orig' && '🏛️ Language of Origin & Historical Etymology'}
                      {activeQuestion === 'alt' && '🗣️ Official Alternate Pronunciations'}
                      {activeQuestion === 'sent' && '💬 Example Sentence'}
                    </span>
                    <button
                      onClick={() => setActiveQuestion(null)}
                      className="text-slate-500 hover:text-slate-800 underline cursor-pointer"
                    >
                      Hide Clue
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                    {activeQuestion === 'def' && currentWord.definition}
                    {activeQuestion === 'part' && <span className="capitalize">{currentWord.partOfSpeech}</span>}
                    {activeQuestion === 'orig' && currentWord.languageOriginDetails}
                    {activeQuestion === 'alt' && (
                      currentWord.alternatePronunciations && currentWord.alternatePronunciations.length > 0
                        ? currentWord.alternatePronunciations.join(' · ')
                        : 'No alternate pronunciations recorded in Merriam-Webster (single standard pronunciation).'
                    )}
                    {activeQuestion === 'sent' && `"${currentWord.sentence}"`}
                  </p>
                </div>
              )}
            </div>

            {/* Speller Submission Podium */}
            <div className="bg-[#fdf2fe] p-6 rounded-2xl border-3 border-[#560e51] space-y-4">
              <div>
                <label className="text-xs font-black uppercase font-mono text-slate-800 block mb-1">
                  Step Up & Spell (Type Your Letters Loud & Clear):
                </label>
                <input
                  type="text"
                  value={spellerInput}
                  onChange={e => setSpellerInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSpellerSubmit()}
                  placeholder="Type the word (e.g., bouquet, silhouette, blitzkrieg)..."
                  disabled={spellerStatus !== 'ready'}
                  autoFocus
                  className="w-full px-5 py-4 bg-white border-2 border-[#560e51] rounded-2xl text-xl sm:text-2xl font-black text-slate-950 tracking-wider focus:outline-none focus:ring-4 focus:ring-[#78c222]"
                />
              </div>

              {spellerStatus === 'ready' ? (
                <button
                  onClick={handleSpellerSubmit}
                  disabled={!spellerInput.trim()}
                  className="w-full py-4 bg-[#78c222] hover:bg-[#68ab1c] disabled:opacity-50 text-[#560e51] font-black text-sm uppercase rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer tracking-wider"
                >
                  Submit Spelling to Judges 🏆
                </button>
              ) : spellerStatus === 'correct' ? (
                <div className="space-y-3 animate-fadeIn">
                  <div className="p-4 bg-emerald-100 rounded-2xl border-2 border-emerald-500 text-emerald-950 font-black text-sm uppercase flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      Brilliant! Correct spelling! (+15 pts)
                    </span>
                    <span className="font-mono text-xs text-emerald-800">{currentWord.word}</span>
                  </div>

                  {/* Spelling Tip Reveal */}
                  <div className="p-4 bg-white rounded-2xl border-2 border-emerald-300 text-xs font-bold text-slate-800 space-y-1">
                    <span className="text-[10px] font-mono font-black uppercase text-emerald-700 block">
                      💡 Champion Phonetic Tip:
                    </span>
                    <p>{currentWord.spellingTip}</p>
                    {currentWord.etymologyStory && (
                      <p className="text-slate-600 italic pt-1">{currentWord.etymologyStory}</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleNextWord}
                      className="w-full py-3 bg-[#560e51] hover:bg-[#43093f] text-white font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Next Competition Word</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-fadeIn">
                  <div className="p-4 bg-rose-100 rounded-2xl border-2 border-rose-500 text-rose-950 font-black text-sm uppercase flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <XCircle className="h-6 w-6 text-rose-600" />
                      Judges Ring the Bell! Not quite right.
                    </span>
                    <span className="font-mono text-xs text-rose-900 underline">{currentWord.word}</span>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border-2 border-rose-300 text-xs font-bold text-slate-800 space-y-1">
                    <span className="text-[10px] font-mono font-black uppercase text-rose-700 block">
                      🔍 Correct Orthography & Tip:
                    </span>
                    <p>The correct spelling is <strong>{currentWord.word}</strong> ({currentWord.pronunciation}).</p>
                    <p className="text-slate-700">{currentWord.spellingTip}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSpellerStatus('ready');
                        setSpellerInput('');
                      }}
                      className="px-5 py-3 bg-white border-2 border-[#560e51] text-[#560e51] font-black text-xs uppercase rounded-xl cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5 inline mr-1" /> Try Again
                    </button>
                    <button
                      onClick={handleNextWord}
                      className="flex-1 py-3 bg-[#560e51] hover:bg-[#43093f] text-white font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222] cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Advance to Next Word</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: THE LANGUAGE CARDS EXPLORER                                        */}
      {/* ========================================================================= */}
      {subMode === 'catalog' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Filter Bar */}
          <div className="bg-white rounded-3xl p-6 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">Filter by Origin & Level</span>
                <h3 className="text-xl font-black text-slate-900 uppercase">
                  Global Words Catalog ({filteredWords.length} Words Found)
                </h3>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search word, definition, language..."
                  className="w-full pl-9 pr-4 py-2 bg-[#fdf2fe] border-2 border-[#560e51] rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Language Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {languagesList.map(item => (
                <button
                  key={item.name}
                  onClick={() => { setSelectedLanguage(item.name); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedLanguage === item.name
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-[#fdf2fe] hover:bg-fuchsia-100 text-slate-700 border border-fuchsia-300'
                  }`}
                >
                  <span>{item.flag}</span>
                  <span>{item.name}</span>
                  <span className="text-[10px] opacity-75 font-mono">({item.count})</span>
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-fuchsia-100">
              <span className="text-[10px] font-mono font-black uppercase text-slate-500">Difficulty:</span>
              {['All', 'One-Bee', 'Two-Bee', 'Three-Bee', 'Championship'].map(diff => (
                <button
                  key={diff}
                  onClick={() => { setSelectedDifficulty(diff); sound.playClick(); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-[#78c222] text-[#560e51] font-black'
                      : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredWords.map((wordItem, idx) => (
              <div
                key={wordItem.id}
                className="bg-white rounded-3xl p-5 border-3 border-[#560e51] shadow-[5px_5px_0px_0px_#560e51] hover:shadow-[7px_7px_0px_0px_#560e51] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black uppercase px-2.5 py-1 rounded-full bg-[#fdf2fe] text-[#560e51] border border-fuchsia-300">
                      {wordItem.language}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {wordItem.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <h4 className="text-2xl font-serif font-black text-slate-950 uppercase tracking-tight">
                      {wordItem.word}
                    </h4>
                    <button
                      onClick={() => humanVoice.speakWord(wordItem.word)}
                      className="p-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 cursor-pointer"
                      title="Pronounce word"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs font-mono text-slate-500 font-bold">
                    {wordItem.pronunciation} · <span className="italic">{wordItem.partOfSpeech}</span>
                  </p>

                  <p className="text-xs font-bold text-slate-700 leading-relaxed">
                    "{wordItem.definition}"
                  </p>

                  {/* Alternate Pronunciations Tag */}
                  {wordItem.alternatePronunciations && wordItem.alternatePronunciations.length > 0 && (
                    <div className="p-2 bg-purple-50 rounded-xl border border-purple-200 text-[11px] text-purple-900 font-mono">
                      <span className="font-black uppercase text-[9px] block">Alternate Pronunciation:</span>
                      {wordItem.alternatePronunciations.join(' · ')}
                    </div>
                  )}

                  {/* Spelling Tip */}
                  <div className="p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs font-medium text-amber-950 space-y-0.5">
                    <span className="font-mono font-black text-[10px] uppercase text-amber-800 block">
                      💡 Spelling Tip:
                    </span>
                    <p>{wordItem.spellingTip}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-fuchsia-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    {wordItem.languageOriginDetails.slice(0, 32)}...
                  </span>
                  <button
                    onClick={() => {
                      const foundIdx = filteredWords.findIndex(w => w.id === wordItem.id);
                      if (foundIdx !== -1) {
                        handleSelectWord(foundIdx);
                        setSubMode('podium');
                      }
                    }}
                    className="px-3 py-1.5 bg-[#560e51] hover:bg-[#43093f] text-[#78c222] font-black text-[11px] uppercase rounded-xl border border-[#560e51] cursor-pointer flex items-center gap-1"
                  >
                    <span>Test on Stage</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: OFFICIAL ENGLISH 1 COMPETITION CLARIFYING INQUIRIES GUIDE         */}
      {/* ========================================================================= */}
      {subMode === 'rules' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            <div className="border-b-2 border-fuchsia-100 pb-4">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">English 1 National Spelling Bee Guidelines</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase mt-1">
                English 1 Speller Inquiries & Stage Protocol 📜
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                Knowing <em>how to ask</em> is just as important as knowing <em>how to spell</em>. Spellers who rush to spell without asking clarifying questions lose over 70% more rounds on stage!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/70 space-y-2">
                <h4 className="text-base font-black text-emerald-950 uppercase flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" /> What You ARE Allowed to Ask:
                </h4>
                <ul className="text-xs font-bold text-emerald-900 space-y-2 list-disc list-inside">
                  <li><strong>Definition:</strong> "Can you please give me the definition?"</li>
                  <li><strong>Part of Speech:</strong> "What is the part of speech?"</li>
                  <li><strong>Language of Origin:</strong> "What is the language of origin?"</li>
                  <li><strong>Alternate Pronunciations:</strong> "Are there any alternate pronunciations?"</li>
                  <li><strong>Sentence:</strong> "Can you please use the word in a sentence?"</li>
                  <li><strong>Repetition:</strong> "Could you please pronounce the word again?"</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl border-2 border-rose-300 bg-rose-50/70 space-y-2">
                <h4 className="text-base font-black text-rose-950 uppercase flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-rose-600" /> What You CANNOT Change Once Started:
                </h4>
                <ul className="text-xs font-bold text-rose-900 space-y-2 list-disc list-inside">
                  <li><strong>No Letter Retractions:</strong> Once you say a letter, you can never change it. Even if you restart from the beginning, the sequence must match!</li>
                  <li><strong>Time Clock:</strong> You have 2 minutes total from when the pronouncer says the word. The 30-second warning sounds with a chime.</li>
                  <li><strong>Spelling Repetition:</strong> You can restart spelling for rhythm, but you cannot change any letter already spoken.</li>
                </ul>
              </div>
            </div>

            {/* The 5-Step Stage Routine */}
            <div className="bg-[#fefaf0] p-6 rounded-2xl border-2 border-[#560e51] space-y-3">
              <h4 className="text-sm font-black uppercase font-mono text-[#560e51] flex items-center gap-2">
                <Trophy className="h-5 w-5 text-[#78c222]" /> The 5-Step Champion Ritual at the Mic:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
                <div className="p-3 bg-white rounded-xl border border-amber-300">
                  <span className="w-6 h-6 rounded-full bg-[#560e51] text-white font-mono text-xs font-black inline-flex items-center justify-center mb-1">1</span>
                  <p className="text-xs font-black uppercase text-slate-900">Say the Word</p>
                  <p className="text-[10px] text-slate-500 font-medium">Verify you heard correctly</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-300">
                  <span className="w-6 h-6 rounded-full bg-[#560e51] text-white font-mono text-xs font-black inline-flex items-center justify-center mb-1">2</span>
                  <p className="text-xs font-black uppercase text-slate-900">Ask Questions</p>
                  <p className="text-[10px] text-slate-500 font-medium">Def, origin, part of speech</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-300">
                  <span className="w-6 h-6 rounded-full bg-[#560e51] text-white font-mono text-xs font-black inline-flex items-center justify-center mb-1">3</span>
                  <p className="text-xs font-black uppercase text-slate-900">Palm Trace</p>
                  <p className="text-[10px] text-slate-500 font-medium">Write invisible letters</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-300">
                  <span className="w-6 h-6 rounded-full bg-[#560e51] text-white font-mono text-xs font-black inline-flex items-center justify-center mb-1">4</span>
                  <p className="text-xs font-black uppercase text-slate-900">Spell Clearly</p>
                  <p className="text-[10px] text-slate-500 font-medium">Loud & steady rhythm</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-300">
                  <span className="w-6 h-6 rounded-full bg-[#560e51] text-white font-mono text-xs font-black inline-flex items-center justify-center mb-1">5</span>
                  <p className="text-xs font-black uppercase text-slate-900">Say Word Again</p>
                  <p className="text-[10px] text-slate-500 font-medium">Signals speller conclusion</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => { setSubMode('podium'); sound.playClick(); }}
                className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer flex items-center gap-2"
              >
                <span>Jump to Stage Pronouncer Podium</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
