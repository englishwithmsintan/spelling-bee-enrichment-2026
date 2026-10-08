import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Volume2, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  PenTool, 
  Trash2, 
  Star, 
  TrendingUp,
  Download,
  Check,
  ShieldCheck,
  Zap,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { DictationWord, MeetingSession } from '../types';
import { 
  MEETING_2_WARM_UP, 
  MEETING_2_PROGRESS_CHECK, 
  MEETING_3_WARM_UP, 
  MEETING_3_PROGRESS_CHECK 
} from '../data/reviewData';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';

interface ProgressCheckProps {
  preTestScore: number | null;
  postTestScore: number | null;
  onSaveScores: (pre: number, post: number) => void;
  onAwardTeamScore?: (team: 'A' | 'B', pts: number) => void;
  genAlphaMode: boolean;
  activeMeeting?: MeetingSession;
  initialTab?: 'pre-test' | 'post-test' | 'star-celebration';
}

export default function ProgressCheckModule({
  preTestScore,
  postTestScore,
  onSaveScores,
  onAwardTeamScore,
  genAlphaMode,
  activeMeeting = 'meeting-3',
  initialTab = 'pre-test'
}: ProgressCheckProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<'meeting-2' | 'meeting-3'>(
    activeMeeting === 'meeting-2' ? 'meeting-2' : 'meeting-3'
  );

  useEffect(() => {
    if (activeMeeting === 'meeting-2' || activeMeeting === 'meeting-3') {
      setSelectedMeeting(activeMeeting);
    }
  }, [activeMeeting]);

  // Tabs: 'pre-test' | 'post-test' | 'star-celebration'
  const [activeTab, setActiveTab] = useState<'pre-test' | 'post-test' | 'star-celebration'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const preList = selectedMeeting === 'meeting-2' ? MEETING_2_WARM_UP : MEETING_3_WARM_UP;
  const postList = selectedMeeting === 'meeting-2' ? MEETING_2_PROGRESS_CHECK : MEETING_3_PROGRESS_CHECK;

  // Pre-test state
  const [preIndex, setPreIndex] = useState(0);
  const [preAnswers, setPreAnswers] = useState<string[]>(Array(10).fill(''));
  const [preSubmitted, setPreSubmitted] = useState(false);
  const [preCalculatedScore, setPreCalculatedScore] = useState<number | null>(preTestScore);

  // Post-test state
  const [postIndex, setPostIndex] = useState(0);
  const [postAnswers, setPostAnswers] = useState<string[]>(Array(10).fill(''));
  const [postSubmitted, setPostSubmitted] = useState(false);
  const [postCalculatedScore, setPostCalculatedScore] = useState<number | null>(postTestScore);

  // Whiteboard drawing canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPlayingTwice, setIsPlayingTwice] = useState(false);

  const isPre = activeTab === 'pre-test';
  const currentList = isPre ? preList : postList;
  const currentIndex = isPre ? preIndex : postIndex;
  const currentAnswers = isPre ? preAnswers : postAnswers;
  const currentWord = currentList[currentIndex] || currentList[0];

  const playWordTwice = async (word: string) => {
    if (isPlayingTwice) return;
    setIsPlayingTwice(true);
    sound.playClick();
    try {
      await humanVoice.speakWordTwice(word);
    } finally {
      setIsPlayingTwice(false);
    }
  };

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sound.playClick();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#560e51';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleAnswerChange = (val: string) => {
    if (isPre) {
      const copy = [...preAnswers];
      copy[preIndex] = val;
      setPreAnswers(copy);
    } else {
      const copy = [...postAnswers];
      copy[postIndex] = val;
      setPostAnswers(copy);
    }
  };

  const handleSubmitAssessment = (type: 'pre' | 'post') => {
    const answers = type === 'pre' ? preAnswers : postAnswers;
    const list = type === 'pre' ? preList : postList;

    let score = 0;
    answers.forEach((ans, idx) => {
      const target = list[idx]?.word || '';
      if (ans.trim().toLowerCase() === target.toLowerCase()) {
        score++;
      }
    });

    if (type === 'pre') {
      setPreSubmitted(true);
      setPreCalculatedScore(score);
      onSaveScores(score, postCalculatedScore !== null ? postCalculatedScore : (postTestScore || 0));
    } else {
      setPostSubmitted(true);
      setPostCalculatedScore(score);
      onSaveScores(preCalculatedScore !== null ? preCalculatedScore : (preTestScore || 0), score);
    }

    sound.playFanfare();
    confetti({ particleCount: 50, spread: 70 });
  };

  const calculateImprovement = () => {
    const pre = preCalculatedScore !== null ? preCalculatedScore : (preTestScore || 0);
    const post = postCalculatedScore !== null ? postCalculatedScore : (postTestScore || 0);
    return post - pre;
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase font-mono px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-400">
              Session Agenda: Part 1 & Part 6
            </span>
            <span className="text-xs font-black uppercase font-mono px-3 py-1 bg-purple-100 text-[#560e51] rounded-full border border-purple-300">
              Slides 4, 12 & 13
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <span>Assessment & Growth Tracker</span>
            <Award className="h-7 w-7 text-[#78c222]" />
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 max-w-2xl">
            {selectedMeeting === 'meeting-2'
              ? "Foundational Roots & Patterns · 10 Warm-Up Challenge Words & 10 Progress Check Words with Growth Analytics!"
              : "Two-Bee Championship Words · Advanced 10 Warm-Up Words & 10 Progress Check Words with Star Celebration!"}
          </p>
        </div>

        {/* Meeting Toggle */}
        <div className="flex items-center gap-2 bg-[#fdf2fe] p-1.5 rounded-2xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] shrink-0">
          <button
            onClick={() => {
              setSelectedMeeting('meeting-2');
              setPreIndex(0);
              setPostIndex(0);
              sound.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
              selectedMeeting === 'meeting-2'
                ? 'bg-[#78c222] text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Foundations List
          </button>
          <button
            onClick={() => {
              setSelectedMeeting('meeting-3');
              setPreIndex(0);
              setPostIndex(0);
              sound.playClick();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
              selectedMeeting === 'meeting-3'
                ? 'bg-[#9b2c98] text-white shadow-[2px_2px_0px_0px_#560e51]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Two-Bee List
          </button>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => {
            setActiveTab('pre-test');
            sound.playClick();
          }}
          className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
            activeTab === 'pre-test'
              ? 'bg-[#560e51] text-white border-[#560e51] shadow-[4px_4px_0px_0px_#78c222]'
              : 'bg-white text-slate-700 border-[#560e51] hover:bg-fuchsia-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950">
              Slide 4 (10 min)
            </span>
            <Zap className="h-5 w-5" />
          </div>
          <h3 className="text-base font-black uppercase tracking-tight">Warm-Up Challenge</h3>
          <p className="text-xs opacity-85 mt-1 font-bold">
            Baseline spelling test (10 Words)
          </p>
        </button>

        <button
          onClick={() => {
            setActiveTab('post-test');
            sound.playClick();
          }}
          className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
            activeTab === 'post-test'
              ? 'bg-[#560e51] text-white border-[#560e51] shadow-[4px_4px_0px_0px_#78c222]'
              : 'bg-white text-slate-700 border-[#560e51] hover:bg-fuchsia-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded bg-[#78c222] text-[#560e51]">
              Slide 12 (10 min)
            </span>
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-base font-black uppercase tracking-tight">Progress Check</h3>
          <p className="text-xs opacity-85 mt-1 font-bold">
            End-of-session test (10 Words)
          </p>
        </button>

        <button
          onClick={() => {
            setActiveTab('star-celebration');
            sound.playClick();
          }}
          className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
            activeTab === 'star-celebration'
              ? 'bg-[#560e51] text-white border-[#560e51] shadow-[4px_4px_0px_0px_#78c222]'
              : 'bg-white text-slate-700 border-[#560e51] hover:bg-fuchsia-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded bg-yellow-400 text-slate-950">
              Slide 13 (Celebration)
            </span>
            <Star className="h-5 w-5 text-amber-300" />
          </div>
          <h3 className="text-base font-black uppercase tracking-tight">Spelling Star!</h3>
          <p className="text-xs opacity-85 mt-1 font-bold">
            Growth analytics & certificate
          </p>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PRE-TEST & POST-TEST INTERFACE                                            */}
      {/* ========================================================================= */}
      {(activeTab === 'pre-test' || activeTab === 'post-test') && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-fuchsia-100 pb-4">
            <div>
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                {isPre ? 'Slide 4 · Baseline Warm-Up Challenge' : 'Slide 12 · End-of-Session Progress Check'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                Word {currentIndex + 1} of {currentList.length}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase font-mono px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
                Answered: {currentAnswers.filter(a => a.trim() !== '').length} / {currentList.length}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Pronouncer & Input Form */}
            <div className="space-y-4">
              <div className="bg-[#fefaf0] p-6 rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] text-center space-y-3">
                <span className="text-xs font-mono font-black uppercase text-amber-900 block">
                  Listen to Word Pronounced:
                </span>

                <button
                  onClick={() => playWordTwice(currentWord.word)}
                  disabled={isPlayingTwice}
                  className="px-6 py-3.5 bg-[#560e51] hover:bg-[#43093f] text-white font-black text-sm uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222] flex items-center justify-center gap-2 mx-auto cursor-pointer transition-all disabled:opacity-50"
                >
                  <Volume2 className={`h-5 w-5 text-[#78c222] ${isPlayingTwice ? 'animate-bounce' : ''}`} />
                  {isPlayingTwice ? 'Reading Word Twice...' : '🔊 Play Word (Read 2x)'}
                </button>

                <p className="text-xs font-bold text-slate-600">
                  Definition clue: <span className="italic">"{currentWord.definition}"</span>
                </p>
                <p className="text-xs font-bold text-slate-500 italic">
                  Example sentence: "{currentWord.sentence}"
                </p>
              </div>

              {/* Form Input */}
              <div className="space-y-3">
                <label className="text-xs font-black uppercase font-mono text-slate-700 block">
                  Your Spelling for Word #{currentIndex + 1}:
                </label>
                <input
                  type="text"
                  value={currentAnswers[currentIndex] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Type your letters..."
                  className="w-full px-4 py-3 bg-[#fdf2fe] border-2 border-[#560e51] rounded-xl text-xl font-black text-slate-900 tracking-wider focus:outline-none focus:ring-2 focus:ring-[#78c222]"
                />

                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => {
                      if (isPre) setPreIndex(i => Math.max(0, i - 1));
                      else setPostIndex(i => Math.max(0, i - 1));
                      handleClearCanvas();
                      sound.playClick();
                    }}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase rounded-xl border border-slate-300 disabled:opacity-40 cursor-pointer"
                  >
                    ← Previous Word
                  </button>

                  {currentIndex < currentList.length - 1 ? (
                    <button
                      onClick={() => {
                        if (isPre) setPreIndex(i => Math.min(currentList.length - 1, i + 1));
                        else setPostIndex(i => Math.min(currentList.length - 1, i + 1));
                        handleClearCanvas();
                        sound.playClick();
                      }}
                      className="px-5 py-2 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] text-xs font-black uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
                    >
                      Next Word →
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSubmitAssessment(isPre ? 'pre' : 'post')}
                      className="px-6 py-2.5 bg-[#560e51] hover:bg-[#43093f] text-white text-xs font-black uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222] cursor-pointer"
                    >
                      Submit All 10 Words
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Digital Whiteboard Canvas */}
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-[#560e51] flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase font-mono text-[#560e51] flex items-center gap-1.5">
                  <PenTool className="h-4 w-4" /> Scratchpad Whiteboard
                </span>
                <button
                  type="button"
                  onClick={handleClearCanvas}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 text-rose-600 text-xs font-black uppercase rounded-lg border border-slate-300 flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Clear Slate
                </button>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl bg-white overflow-hidden touch-none flex-1 min-h-[220px]">
                <canvas
                  ref={canvasRef}
                  width={420}
                  height={220}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-full cursor-crosshair"
                />
              </div>

              <p className="text-[10px] text-slate-500 font-bold text-center">
                Practice handwriting each syllable on the whiteboard before typing!
              </p>
            </div>
          </div>

          {/* Quick Navigator Pill Grid */}
          <div className="bg-[#fdf2fe] p-4 rounded-2xl border-2 border-[#560e51]">
            <span className="text-xs font-black uppercase font-mono text-[#9b2c98] block mb-2">
              Question Navigator (Click to jump):
            </span>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {currentList.map((item, idx) => {
                const ans = currentAnswers[idx] || '';
                const isCurrent = idx === currentIndex;
                const isDone = ans.trim() !== '';

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (isPre) setPreIndex(idx);
                      else setPostIndex(idx);
                      handleClearCanvas();
                      sound.playClick();
                    }}
                    className={`h-11 rounded-xl font-mono text-xs font-black border-2 transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isCurrent
                        ? 'bg-[#560e51] text-white border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                        : isDone
                          ? 'bg-[#78c222] text-[#560e51] border-[#560e51]'
                          : 'bg-white text-slate-600 border-slate-300 hover:border-[#560e51]'
                    }`}
                  >
                    <span>#{idx + 1}</span>
                    <span className="text-[9px] uppercase font-sans">
                      {isDone ? '✓' : '—'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: STAR CELEBRATION (SLIDE 13)                                        */}
      {/* ========================================================================= */}
      {activeTab === 'star-celebration' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-100 text-yellow-900 border-2 border-yellow-400 rounded-full font-mono text-xs font-black uppercase">
              <Star className="h-4 w-4 fill-amber-400 text-amber-500" /> Slide 13 · Final Session Celebration
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">
              YOU ARE A SPELLING STAR! 🌟
            </h3>

            <p className="text-sm font-bold text-slate-700 italic leading-relaxed">
              "Every letter you tried today made you stronger. Keep practicing, keep listening, and keep believing in yourself!"
            </p>
          </div>

          {/* Score & Growth Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#fdf2fe] text-center space-y-1 shadow-[3px_3px_0px_0px_#560e51]">
              <span className="text-xs font-mono font-black uppercase text-slate-500">Slide 4 Warm-Up</span>
              <p className="text-3xl font-black text-[#560e51]">
                {preCalculatedScore !== null ? `${preCalculatedScore} / 10` : (preTestScore !== null ? `${preTestScore} / 10` : 'Not Taken')}
              </p>
              <p className="text-[11px] font-bold text-slate-600">Initial Baseline Score</p>
            </div>

            <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#f3f9eb] text-center space-y-1 shadow-[3px_3px_0px_0px_#560e51]">
              <span className="text-xs font-mono font-black uppercase text-emerald-800">Slide 12 Progress Check</span>
              <p className="text-3xl font-black text-emerald-700">
                {postCalculatedScore !== null ? `${postCalculatedScore} / 10` : (postTestScore !== null ? `${postTestScore} / 10` : 'Not Taken')}
              </p>
              <p className="text-[11px] font-bold text-emerald-900">Post-Session Score</p>
            </div>

            <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#fefaf0] text-center space-y-1 shadow-[3px_3px_0px_0px_#560e51]">
              <span className="text-xs font-mono font-black uppercase text-amber-800">Growth Index</span>
              <p className="text-3xl font-black text-amber-700 flex items-center justify-center gap-1">
                <TrendingUp className="h-6 w-6 text-amber-600" />
                {calculateImprovement() >= 0 ? `+${calculateImprovement()}` : calculateImprovement()}
              </p>
              <p className="text-[11px] font-bold text-amber-900">Points Gained Today</p>
            </div>
          </div>

          {/* Certificate of Achievement Preview */}
          <div className="p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 rounded-2xl border-3 border-[#560e51] text-center space-y-3">
            <Trophy className="h-10 w-10 text-amber-500 mx-auto" />
            <h4 className="text-xl font-black text-slate-900 uppercase">
              Official Spelling Bee Enrichment Certificate
            </h4>
            <p className="text-xs font-bold text-slate-600 max-w-lg mx-auto">
              Awarded for exceptional determination, orthographic curiosity, and mastering words from the English 1 National Spelling Bee curriculum (Puspresnas Licensed).
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  window.print();
                  sound.playClick();
                }}
                className="px-6 py-2.5 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] flex items-center gap-2 mx-auto cursor-pointer"
              >
                <Download className="h-4 w-4" /> Print / Save Certificate
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
