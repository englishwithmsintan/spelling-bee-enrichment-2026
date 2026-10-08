import React, { useState, useMemo } from 'react';
import { 
  ALL_WORD_STUDY_CARDS, 
  MEETING_2_WORDS_TO_KNOW, 
  MEETING_3_WORDS_TO_KNOW,
  MEETING_2_FULL_59_WORDS,
  MEETING_3_FULL_61_WORDS,
  MEETING_2_PATTERNS,
  MEETING_3_PATTERNS,
  ALL_WORDS_MAP
} from '../data/reviewData';
import { Flashcard, MeetingSession } from '../types';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';
import { 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  CheckCircle2, 
  Circle, 
  Eye, 
  EyeOff, 
  BookOpen, 
  Layers, 
  Volume2, 
  Sparkles,
  Search,
  Filter,
  Check,
  Printer,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FlashcardModuleProps {
  reviewedIds: string[];
  onMarkReviewed: (id: string, mastered: boolean) => void;
  genAlphaMode: boolean;
  activeMeeting?: MeetingSession;
}

export default function FlashcardModule({
  reviewedIds = [],
  onMarkReviewed,
  genAlphaMode,
  activeMeeting = 'meeting-3'
}: FlashcardModuleProps) {
  const [viewMode, setViewMode] = useState<'flashcards' | 'handout'>('flashcards');
  const [handoutMeeting, setHandoutMeeting] = useState<'meeting-2' | 'meeting-3'>(
    activeMeeting === 'meeting-2' ? 'meeting-2' : 'meeting-3'
  );

  const [selectedFilter, setSelectedFilter] = useState<string>(
    activeMeeting === 'meeting-2' ? 'm2-know' : 'm3-know'
  );
  const [selectedLoanOrigin, setSelectedLoanOrigin] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [practiceMode, setPracticeMode] = useState<boolean>(false);
  const [spellingInput, setSpellingInput] = useState<string>('');
  const [spellingResult, setSpellingResult] = useState<'correct' | 'incorrect' | null>(null);

  // Filter cards based on source list & search query
  const filteredCards = useMemo(() => {
    return ALL_WORD_STUDY_CARDS.filter(card => {
      // Category filter
      let matchCat = true;
      if (selectedFilter === 'm2-know') {
        matchCat = card.category === 'meeting-2-words-to-know';
      } else if (selectedFilter === 'm3-know') {
        matchCat = card.category === 'meeting-3-words-to-know';
      } else if (selectedFilter === 'm2-full') {
        matchCat = card.category === 'meeting-2-practice-59' || card.category === 'meeting-2-words-to-know';
      } else if (selectedFilter === 'm3-full') {
        matchCat = card.category === 'meeting-3-practice-61' || card.category === 'meeting-3-words-to-know';
      } else if (selectedFilter === 'loanwords') {
        matchCat = card.category.startsWith('loanwords');
        if (selectedLoanOrigin !== 'all') {
          if (selectedLoanOrigin === 'french') matchCat = card.category === 'loanwords-french';
          else if (selectedLoanOrigin === 'german') matchCat = card.category === 'loanwords-german';
          else if (selectedLoanOrigin === 'italian') matchCat = card.category === 'loanwords-italian';
          else if (selectedLoanOrigin === 'greek') matchCat = card.category === 'loanwords-greek';
          else if (selectedLoanOrigin === 'latin') matchCat = card.category === 'loanwords-latin';
          else if (selectedLoanOrigin === 'spanish-global') {
            matchCat = card.category === 'loanwords-spanish' || card.category === 'loanwords-japanese' || card.category === 'loanwords';
          }
        }
      } else if (selectedFilter === 'homophones') {
        matchCat = card.category === 'homophones';
      }

      // Search filter
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = q === '' || 
        card.word.toLowerCase().includes(q) ||
        card.definition.toLowerCase().includes(q) ||
        (card.languageOrigin && card.languageOrigin.toLowerCase().includes(q)) ||
        (card.homophoneTwin && card.homophoneTwin.toLowerCase().includes(q)) ||
        (card.trickyPattern && card.trickyPattern.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });
  }, [selectedFilter, selectedLoanOrigin, searchQuery]);

  const currentCard: Flashcard | undefined = filteredCards[currentIndex];

  const handleNext = () => {
    if (filteredCards.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    setIsFlipped(false);
    setSpellingInput('');
    setSpellingResult(null);
    sound.playClick();
  };

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setIsFlipped(false);
    setSpellingInput('');
    setSpellingResult(null);
    sound.playClick();
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    sound.playClick();
  };

  const handlePronounce = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!currentCard) return;
    humanVoice.speakWord(currentCard.word);
    sound.playClick();
  };

  const handleCheckSpelling = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCard || !spellingInput.trim()) return;
    const isCorrect = spellingInput.trim().toLowerCase() === currentCard.word.toLowerCase();
    if (isCorrect) {
      setSpellingResult('correct');
      sound.playCorrect();
      onMarkReviewed(currentCard.id, true);
    } else {
      setSpellingResult('incorrect');
      sound.playIncorrect();
    }
  };

  const isMastered = currentCard ? reviewedIds.includes(currentCard.id) : false;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase font-mono px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-400">
              Session Agenda: Part 3 (20 min)
            </span>
            <span className="text-xs font-black uppercase font-mono px-3 py-1 bg-purple-100 text-[#560e51] rounded-full border border-purple-300">
              English 1 National Spelling Bee Deck
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">
            Word Study & Take-Home Lists 📖
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 max-w-2xl">
            {genAlphaMode 
              ? "Study the official English 1 National Spelling Bee word list! Flip interactive flashcards or inspect the full printable take-home sheets!" 
              : "Study the complete curated championship lists: Foundational Roots & Patterns (59 words) and English 1 Championship Arsenal (125 words)."}
          </p>
        </div>

        {/* View Switcher: Interactive Flashcards vs Printable Handout */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-[#fdf2fe] p-1.5 rounded-2xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] flex items-center gap-1">
            <button
              onClick={() => { setViewMode('flashcards'); sound.playClick(); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'flashcards'
                  ? 'bg-[#78c222] text-[#560e51] shadow-[1px_1px_0px_0px_#560e51]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" /> Interactive Cards
            </button>
            <button
              onClick={() => { setViewMode('handout'); sound.playClick(); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'handout'
                  ? 'bg-[#9b2c98] text-white shadow-[1px_1px_0px_0px_#560e51]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="h-3.5 w-3.5" /> Study Handout (PDF)
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: PRINTABLE STUDY HANDOUT                                           */}
      {/* ========================================================================= */}
      {viewMode === 'handout' && (
        <div className="space-y-6">
          {/* Handout Header & Meeting Switcher */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-fuchsia-100 pb-4">
              <div>
                <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                  Official Take-Home Study Sheet (Printable Handout)
                </span>
                <h3 className="text-2xl font-black text-slate-900 uppercase">
                  {handoutMeeting === 'meeting-2' 
                    ? 'Foundations Study List — Word Roots & Patterns' 
                    : 'Championship Two-Bee Arsenal & Loan Words'}
                </h3>
                <p className="text-xs text-slate-600 font-bold mt-0.5">
                  Advanced Spelling Bee Enrichment · English 1 National Spelling Bee (Group B & C)
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-[#fdf2fe] p-1 rounded-xl border-2 border-[#560e51] flex items-center">
                  <button
                    onClick={() => { setHandoutMeeting('meeting-2'); sound.playClick(); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase cursor-pointer ${
                      handoutMeeting === 'meeting-2' ? 'bg-[#78c222] text-[#560e51]' : 'text-slate-600'
                    }`}
                  >
                    Foundations List
                  </button>
                  <button
                    onClick={() => { setHandoutMeeting('meeting-3'); sound.playClick(); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase cursor-pointer ${
                      handoutMeeting === 'meeting-3' ? 'bg-[#9b2c98] text-white' : 'text-slate-600'
                    }`}
                  >
                    Two-Bee Arsenal
                  </button>
                </div>

                <button
                  onClick={() => { window.print(); sound.playClick(); }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black uppercase rounded-xl border-2 border-slate-300 flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="h-4 w-4" /> Print Sheet
                </button>
              </div>
            </div>

            {/* SECTION 1: WORDS TO KNOW (8 WORDS FROM ROUNDS 1 & 2) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black uppercase tracking-tight text-[#560e51] flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-500" /> Words to Know ({handoutMeeting === 'meeting-2' ? '8 Key Study Words' : `${MEETING_3_WORDS_TO_KNOW.length} In-Depth Study Words`})
                </h4>
                <span className="text-xs font-mono font-bold text-slate-500">Official English 1 Definitions</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(handoutMeeting === 'meeting-2' ? MEETING_2_WORDS_TO_KNOW : MEETING_3_WORDS_TO_KNOW).map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border-2 border-[#560e51] bg-[#fefaf0] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black tracking-wider uppercase text-[#560e51]">
                          {item.word}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-slate-500 italic">
                          ({item.partOfSpeech})
                        </span>
                      </div>
                      <button
                        onClick={() => humanVoice.speakWord(item.word)}
                        className="p-1 rounded-lg hover:bg-amber-200 text-amber-900 cursor-pointer"
                        title="Pronounce"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-xs font-bold text-slate-800">
                      {item.definition}
                    </p>

                    {item.trickyPattern && (
                      <div className="pt-1 border-t border-amber-200/60 text-[11px] text-amber-950 font-bold">
                        <span className="text-[9px] uppercase font-mono bg-amber-200 px-1.5 py-0.5 rounded mr-1">
                          Tricky Pattern:
                        </span>
                        {item.trickyPattern}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: TRICKY PATTERN SPOTLIGHT */}
            <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-gradient-to-r from-purple-50 to-pink-50 space-y-3">
              <h4 className="text-base font-black uppercase text-[#560e51]">
                Tricky Pattern Spotlight 🔍
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(handoutMeeting === 'meeting-2' ? MEETING_2_PATTERNS : MEETING_3_PATTERNS).map((pat) => (
                  <div key={pat.id} className="p-3 bg-white rounded-xl border border-purple-200 space-y-1">
                    <span className="text-xs font-black uppercase text-[#9b2c98] font-mono block">
                      {pat.title}: <strong className="text-slate-900">{pat.keyWord}</strong>
                    </span>
                    <p className="text-xs font-bold text-slate-700">
                      {pat.keyWordExplanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: FULL PRACTICE WORD LIST IN 5-COLUMN GRID */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-black uppercase text-slate-900">
                  Full Practice Word List ({handoutMeeting === 'meeting-2' ? '59 Words' : `${MEETING_3_FULL_61_WORDS.length} Words`})
                </h4>
                <span className="text-xs font-mono font-bold text-slate-500">
                  English 1 National Spelling Bee
                </span>
              </div>

              <div className="bg-[#fdf2fe] p-4 rounded-2xl border-2 border-[#560e51]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs font-mono font-bold text-slate-800">
                  {(handoutMeeting === 'meeting-2' ? MEETING_2_FULL_59_WORDS : MEETING_3_FULL_61_WORDS).map((w, idx) => (
                    <div
                      key={w}
                      className="p-2 bg-white rounded-xl border border-purple-200 flex items-center justify-between hover:border-[#560e51] transition-all"
                    >
                      <span className="truncate">{idx + 1}. {w}</span>
                      <button
                        onClick={() => humanVoice.speakWord(w)}
                        className="text-slate-400 hover:text-[#560e51] cursor-pointer"
                        title="Listen"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: INTERACTIVE FLASHCARD & SPELLING DRILL                             */}
      {/* ========================================================================= */}
      {viewMode === 'flashcards' && (
        <div className="space-y-6">
          {/* Filter Chips & Search Bar */}
          <div className="bg-[#fffdf5] rounded-[24px] p-4 sm:p-5 border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="h-4 w-4 text-[#9b2c98] absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentIndex(0);
                  }}
                  placeholder="Search words by spelling or definition..."
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border-2 border-[#560e51] text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#9b2c98]"
                />
              </div>

              {/* Quick Stats */}
              <div className="flex items-center gap-2 text-xs font-mono font-black text-slate-700 bg-white px-3.5 py-2 rounded-xl border-2 border-[#560e51] shrink-0">
                <span>{filteredCards.length} words found</span>
              </div>
            </div>

            {/* Deck Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-black uppercase font-mono text-slate-600 mr-1 flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" /> Decks:
              </span>

              {[
                { id: 'm3-know', label: `⭐ Two-Bee Words (${MEETING_3_WORDS_TO_KNOW.length})` },
                { id: 'loanwords', label: '🏛️ Loanwords Vault (141)' },
                { id: 'homophones', label: '🎙️ Homophone Showdown (45+)' },
                { id: 'm3-full', label: `🏆 Two-Bee 61 Grand List (${MEETING_3_FULL_61_WORDS.length})` },
                { id: 'm2-know', label: 'Foundations (8)' },
                { id: 'm2-full', label: 'Foundations 59 List' },
                { id: 'all', label: `🃏 All Cards (${ALL_WORD_STUDY_CARDS.length})` }
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => {
                    setSelectedFilter(btn.id);
                    setCurrentIndex(0);
                    sound.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                    selectedFilter === btn.id
                      ? 'bg-[#560e51] text-white shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-white text-slate-700 border-2 border-slate-300 hover:border-[#560e51]'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Sub-Filter for Loanword Origins */}
            {selectedFilter === 'loanwords' && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-fuchsia-200/60 w-full animate-fadeIn">
                <span className="text-[11px] font-black uppercase font-mono text-[#560e51] mr-1">
                  Origins:
                </span>
                {[
                  { id: 'all', label: 'All Loanwords' },
                  { id: 'french', label: '🥐 French' },
                  { id: 'german', label: '🥨 German' },
                  { id: 'italian', label: '🎻 Italian' },
                  { id: 'greek', label: '🏛️ Greek' },
                  { id: 'latin', label: '📜 Latin' },
                  { id: 'spanish-global', label: '🌮 Spanish & Global' },
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => {
                      setSelectedLoanOrigin(pill.id);
                      setCurrentIndex(0);
                      sound.playClick();
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedLoanOrigin === pill.id
                        ? 'bg-[#78c222] text-[#560e51] font-black shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Flashcard / Spelling Card Container */}
          {currentCard ? (
            <div className="max-w-2xl mx-auto space-y-4">
              <motion.div
                key={currentCard.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] flex flex-col justify-between min-h-[380px] space-y-6 relative"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between border-b-2 border-fuchsia-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black uppercase px-2.5 py-1 bg-fuchsia-100 text-[#560e51] rounded-lg border border-purple-200">
                      Card {currentIndex + 1} of {filteredCards.length}
                    </span>
                    <span className="text-xs font-bold font-mono text-slate-500">
                      {currentCard.lesson || 'English 1 Champion Deck'}
                    </span>
                  </div>

                  <button
                    onClick={() => onMarkReviewed(currentCard.id, !isMastered)}
                    className={`px-3 py-1 rounded-xl text-xs font-black uppercase flex items-center gap-1.5 border-2 transition-all cursor-pointer ${
                      isMastered
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-500'
                        : 'bg-slate-100 text-slate-600 border-slate-300 hover:border-[#560e51]'
                    }`}
                  >
                    {isMastered ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Circle className="h-4 w-4" />}
                    {isMastered ? 'Mastered ✓' : 'Mark Mastered'}
                  </button>
                </div>

                {/* Card Main Body */}
                {!practiceMode ? (
                  <div 
                    onClick={handleFlip}
                    className="flex-1 flex flex-col justify-center items-center text-center p-4 cursor-pointer select-none space-y-4"
                  >
                    {!isFlipped ? (
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-center gap-2">
                          {currentCard.flag && (
                            <span className="text-xs font-black uppercase font-mono px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
                              {currentCard.flag} {currentCard.lesson || 'Loanword'}
                            </span>
                          )}
                          {currentCard.group && (
                            <span className="text-[10px] font-black uppercase font-mono px-2 py-0.5 bg-purple-100 text-[#560e51] rounded-md border border-purple-200">
                              {currentCard.group}
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-mono font-black uppercase tracking-widest text-[#9b2c98] block">
                          Target Study Word
                        </span>
                        <h3 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-wide uppercase">
                          {currentCard.word}
                        </h3>
                        {currentCard.phoneticHint && (
                          <p className="text-sm font-mono font-bold text-fuchsia-900">
                            {currentCard.phoneticHint}
                          </p>
                        )}
                        {currentCard.syllables && currentCard.syllables.toLowerCase() !== currentCard.word.toLowerCase() && (
                          <p className="text-xs font-mono font-bold text-slate-500">
                            · {currentCard.syllables} ·
                          </p>
                        )}

                        {currentCard.homophoneTwin && (
                          <div className="p-2 rounded-xl bg-amber-50 border-2 border-amber-400 text-amber-950 text-xs font-bold max-w-md mx-auto">
                            ⚠️ <strong>Homophone Trap:</strong> Sounds identical to <em>"{currentCard.homophoneTwin}"</em>!
                          </div>
                        )}

                        <div className="pt-2">
                          <button
                            onClick={handlePronounce}
                            className="px-4 py-2 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] inline-flex items-center gap-2 cursor-pointer"
                          >
                            <Volume2 className="h-4 w-4" /> Listen to Audio
                          </button>
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 block pt-2">
                          (Click card to flip for definition, origins & spelling clues)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-3.5 text-left w-full">
                        <div className="bg-[#fefaf0] p-4 rounded-2xl border-2 border-[#560e51] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase font-mono text-amber-900 block">
                              Definition:
                            </span>
                            {currentCard.partOfSpeech && (
                              <span className="text-[11px] font-mono font-bold text-slate-500 italic">
                                ({currentCard.partOfSpeech})
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-black text-slate-900 leading-snug">
                            {currentCard.definition}
                          </p>
                        </div>

                        {currentCard.homophoneTwin && (
                          <div className="bg-amber-100/90 p-3.5 rounded-2xl border-2 border-amber-500 space-y-1">
                            <span className="text-[10px] font-black uppercase font-mono text-amber-950 flex items-center gap-1.5">
                              🎙️ English 1 Homophone Trap & Memory Hook:
                            </span>
                            <p className="text-xs font-black text-amber-950">
                              Twin Sound-Alike: <span className="underline font-mono">{currentCard.homophoneTwin}</span>
                            </p>
                            {currentCard.memoryHook && (
                              <p className="text-xs font-bold text-slate-900">
                                💡 {currentCard.memoryHook}
                              </p>
                            )}
                            {currentCard.spellingClue && (
                              <p className="text-[11px] font-mono font-bold text-amber-900">
                                🔑 Clue: {currentCard.spellingClue}
                              </p>
                            )}
                          </div>
                        )}

                        {currentCard.languageOrigin && (
                          <div className="bg-indigo-50/70 p-3 rounded-2xl border border-indigo-300">
                            <span className="text-[10px] font-black uppercase font-mono text-indigo-900 block mb-0.5">
                              🏛️ Language of Origin & Etymology:
                            </span>
                            <p className="text-xs font-bold text-indigo-950">
                              {currentCard.languageOrigin}
                            </p>
                          </div>
                        )}

                        {currentCard.trickyPattern && (
                          <div className="bg-amber-50 p-3.5 rounded-2xl border-2 border-amber-400">
                            <span className="text-[10px] font-black uppercase font-mono text-amber-900 block mb-0.5">
                              Tricky Pattern Spotlight:
                            </span>
                            <p className="text-xs font-bold text-amber-950">
                              {currentCard.trickyPattern}
                            </p>
                          </div>
                        )}

                        <div className="bg-fuchsia-50/50 p-3.5 rounded-2xl border border-fuchsia-200">
                          <span className="text-[10px] font-black uppercase font-mono text-slate-500 block mb-0.5">
                            Usage in a Sentence:
                          </span>
                          <p className="text-xs font-bold text-slate-700 italic">
                            "{currentCard.example}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Practice Spelling Drill */
                  <div className="space-y-4">
                    <div className="text-center space-y-2">
                      <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">Spelling Practice Drill</span>
                      <div className="flex justify-center">
                        <button
                          onClick={handlePronounce}
                          className="px-6 py-3 bg-[#560e51] hover:bg-[#43093f] text-white font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222] flex items-center gap-2 cursor-pointer"
                        >
                          <Volume2 className="h-5 w-5 text-[#78c222]" /> Listen to Word Clue
                        </button>
                      </div>
                      <p className="text-xs font-bold text-slate-600 italic">
                        "{currentCard.definition}"
                      </p>
                      {currentCard.homophoneTwin && (
                        <p className="text-xs font-bold text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-300">
                          🎙️ English 1 Homophone Sentence Context: "{currentCard.example}"
                        </p>
                      )}
                    </div>

                    <form onSubmit={handleCheckSpelling} className="space-y-3">
                      <input
                        type="text"
                        value={spellingInput}
                        onChange={(e) => setSpellingInput(e.target.value)}
                        placeholder="Type the exact word..."
                        className="w-full px-4 py-3 bg-[#fdf2fe] border-2 border-[#560e51] rounded-xl text-lg font-black text-slate-900 tracking-wider focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
                      >
                        Check My Spelling
                      </button>
                    </form>

                    {spellingResult === 'correct' && (
                      <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-400 text-emerald-950 text-xs font-black uppercase flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Perfect! That's correct!
                      </div>
                    )}
                    {spellingResult === 'incorrect' && (
                      <div className="p-3 bg-rose-100 rounded-xl border border-rose-400 text-rose-950 text-xs font-bold">
                        Target spelling: <strong className="font-mono text-sm">{currentCard.word}</strong>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between border-t-2 border-fuchsia-100 pt-3">
                  <button
                    onClick={handlePrev}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs uppercase rounded-xl border-2 border-slate-300 flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>

                  <button
                    onClick={handleFlip}
                    className="px-4 py-2 bg-[#fdf2fe] hover:bg-fuchsia-100 text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Flip Card
                  </button>

                  <button
                    onClick={handleNext}
                    className="px-4 py-2 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] flex items-center gap-1 cursor-pointer"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border-3 border-[#560e51] text-center space-y-3">
              <BookOpen className="h-10 w-10 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-600">No words match your current filter and search query.</p>
              <button
                onClick={() => {
                  setSelectedFilter('m2-know');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#78c222] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
