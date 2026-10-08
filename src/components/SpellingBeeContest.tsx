import React, { useState } from 'react';
import { SPELLING_WORDS, INITIAL_FINALISTS, INITIAL_AUDITION_CANDIDATES } from '../data/reviewData';
import { SpellingWord, Finalist, AuditionCandidate } from '../types';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';
import {
  Trophy,
  Volume2,
  Bell,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Users,
  Award,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle
} from 'lucide-react';

interface SpellingBeeContestProps {
  genAlphaMode?: boolean;
  isTeacherMode?: boolean;
}

export default function SpellingBeeContest({ genAlphaMode, isTeacherMode }: SpellingBeeContestProps) {
  const [activeStage, setActiveStage] = useState<'finals' | 'auditions'>('finals');
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [finalists, setFinalists] = useState<Finalist[]>(INITIAL_FINALISTS);
  const [activeFinalistIndex, setActiveFinalistIndex] = useState<number>(0);
  const [typedLetters, setTypedLetters] = useState<string>('');
  const [judgeNote, setJudgeNote] = useState<string | null>(null);

  const currentWord: SpellingWord = SPELLING_WORDS[currentWordIndex] || SPELLING_WORDS[0];
  const activeFinalist: Finalist = finalists[activeFinalistIndex] || finalists[0];

  const handleJudgeDecision = (isCorrect: boolean) => {
    if (isCorrect) {
      sound.playBell();
      setJudgeNote(`✨ Ding! Correct spelling by ${activeFinalist.name}!`);
      setFinalists(prev =>
        prev.map((f, idx) =>
          idx === activeFinalistIndex
            ? {
                ...f,
                score: f.score + (currentWord.difficulty === 'Hard' ? 15 : 10),
                wordsHistory: [...f.wordsHistory, { word: currentWord.word, isCorrect: true }]
              }
            : f
        )
      );
    } else {
      sound.playBuzzer();
      const newStrikes = activeFinalist.strikes + 1;
      setJudgeNote(
        `✕ Buzzer! Missed word. Correct: ${currentWord.word.toUpperCase()} (${newStrikes}/3 strikes)`
      );
      setFinalists(prev =>
        prev.map((f, idx) =>
          idx === activeFinalistIndex
            ? {
                ...f,
                strikes: newStrikes,
                isEliminated: newStrikes >= 3,
                wordsHistory: [...f.wordsHistory, { word: currentWord.word, isCorrect: false }]
              }
            : f
        )
      );
    }

    setTypedLetters('');
    setCurrentWordIndex(prev => (prev + 1) % SPELLING_WORDS.length);
    setActiveFinalistIndex(prev => (prev + 1) % finalists.length);
  };

  const handlePronounce = () => {
    sound.playLetterKey();
    humanVoice.speak(currentWord.word);
  };

  const handleFullPrompt = () => {
    sound.playLetterKey();
    humanVoice.speak(
      `Word: ${currentWord.word}. Definition: ${currentWord.definition}. Sentence: ${currentWord.sentence}. ${currentWord.word}.`
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
      {/* Title & Banner */}
      <div className="bg-[#241a12] border-2 border-amber-500/30 rounded-2xl p-5 sm:p-6 mb-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-400">
                SCRIPPS STAGE CHAMPIONSHIP
              </h2>
            </div>
            <p className="text-xs text-amber-200/80 mt-1">
              Slide 10 Stage Rules: Stand up, ask questions, spell letter by letter, judge bell & buzzer.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#1b120c] p-1 rounded-xl border border-amber-500/30">
            <button
              onClick={() => {
                sound.playClick();
                setActiveStage('finals');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeStage === 'finals'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              🎤 Grand Stage Finals
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setActiveStage('auditions');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeStage === 'auditions'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              📋 Auditions Roster
            </button>
          </div>
        </div>
      </div>

      {activeStage === 'finals' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Contest Podium (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#241a12] border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
              {/* Speller Banner */}
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 block uppercase">
                    Currently At The Microphone:
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-black text-white">
                    {activeFinalist.name} ({activeFinalist.classroom})
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-stone-900 border border-stone-700 px-3 py-1 rounded text-amber-300 font-bold">
                    Score: {activeFinalist.score} pts
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${
                          i < activeFinalist.strikes ? 'text-rose-500 font-black' : 'text-stone-700'
                        }`}
                      >
                        ✕
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pronouncer Secret Prompt */}
              <div className="bg-[#1b120c] border border-amber-500/30 rounded-2xl p-6 text-center mb-6">
                <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-1">
                  Word for Contestant
                </span>
                <h4 className="font-serif text-3xl sm:text-5xl font-black text-amber-400 uppercase tracking-widest my-2">
                  {currentWord.word}
                </h4>
                <p className="text-xs font-mono text-stone-400 mb-4">
                  Syllables: {currentWord.syllables} • Level: {currentWord.difficulty}
                </p>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={handlePronounce}
                    className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-semibold rounded-xl text-xs flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Pronounce Word</span>
                  </button>
                  <button
                    onClick={handleFullPrompt}
                    className="px-4 py-2 bg-[#251b12] hover:bg-[#382619] border border-amber-500/30 text-amber-200 font-semibold rounded-xl text-xs"
                  >
                    Read Full Prompt (Def + Sentence)
                  </button>
                </div>
              </div>

              {/* Contestant Questions to Pronouncer */}
              <div className="bg-[#1b120c] border border-amber-500/20 rounded-xl p-4 mb-6">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                  Contestant Requests (Slide 10 Official Questions):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => humanVoice.speak(`Could you repeat the word: ${currentWord.word}`)}
                    className="p-2 bg-[#241a12] hover:bg-amber-500/20 border border-amber-500/20 text-xs text-stone-200 rounded-lg"
                  >
                    "Repeat word?"
                  </button>
                  <button
                    onClick={() => humanVoice.speak(`Definition: ${currentWord.definition}`)}
                    className="p-2 bg-[#241a12] hover:bg-amber-500/20 border border-amber-500/20 text-xs text-stone-200 rounded-lg"
                  >
                    "Definition?"
                  </button>
                  <button
                    onClick={() => humanVoice.speak(`In a sentence: ${currentWord.sentence}`)}
                    className="p-2 bg-[#241a12] hover:bg-amber-500/20 border border-amber-500/20 text-xs text-stone-200 rounded-lg"
                  >
                    "Sentence?"
                  </button>
                  <button
                    onClick={() => humanVoice.speak(`Part of speech: noun. Language of origin: English.`)}
                    className="p-2 bg-[#241a12] hover:bg-amber-500/20 border border-amber-500/20 text-xs text-stone-200 rounded-lg"
                  >
                    "Origin?"
                  </button>
                </div>
              </div>

              {/* Spelling Verification & Letter Input */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  Speller's Letter by Letter Input:
                </label>
                <input
                  type="text"
                  value={typedLetters}
                  onChange={e => setTypedLetters(e.target.value)}
                  placeholder="Say or type letters out loud..."
                  className="w-full bg-[#140d08] border-2 border-amber-500/40 focus:border-amber-400 rounded-xl px-4 py-3 text-amber-100 font-mono text-xl uppercase tracking-widest focus:outline-none"
                />
              </div>

              {/* Judge Decision Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleJudgeDecision(true)}
                  className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <Bell className="w-4 h-4" />
                  <span>Ding! Correct (Award Points)</span>
                </button>
                <button
                  onClick={() => handleJudgeDecision(false)}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Buzzer! Strike (Next Speller)</span>
                </button>
              </div>

              {judgeNote && (
                <div className="mt-4 p-3 rounded-xl bg-[#1b120c] border border-amber-500/40 text-xs text-amber-300 font-bold animate-fadeIn">
                  {judgeNote}
                </div>
              )}
            </div>
          </div>

          {/* Right Finalists Leaderboard (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#241a12] border-2 border-amber-500/30 rounded-2xl p-5 shadow-xl">
              <h4 className="font-serif font-bold text-amber-400 text-sm uppercase mb-3 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Championship Stage Standings</span>
              </h4>
              <div className="space-y-2.5">
                {finalists.map((f, idx) => (
                  <div
                    key={f.id}
                    onClick={() => setActiveFinalistIndex(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      idx === activeFinalistIndex
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                        : 'bg-[#1b120c] border-amber-500/20 text-stone-300 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">
                        #{idx + 1} {f.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-400">
                        {f.score} pts
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span>{f.classroom}</span>
                      <span className={f.strikes >= 3 ? 'text-rose-400 font-bold' : ''}>
                        {f.strikes >= 3 ? 'Eliminated' : `${f.strikes} strikes`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Auditions Roster */
        <div className="bg-[#241a12] border-2 border-amber-500/30 rounded-2xl p-6 shadow-xl">
          <h3 className="font-serif text-xl font-black text-amber-400 mb-4">
            Audition Preliminaries Roster
          </h3>
          <div className="space-y-3">
            {INITIAL_AUDITION_CANDIDATES.map(c => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-[#1b120c] border border-amber-500/20 flex flex-wrap items-center justify-between gap-3 text-xs"
              >
                <div>
                  <h4 className="font-serif font-bold text-base text-white">{c.name}</h4>
                  <p className="text-stone-400">{c.classroom} • {c.notes}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-amber-300">
                    Diagnostic: {c.score} / {c.totalTested}
                  </span>
                  <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold uppercase">
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
