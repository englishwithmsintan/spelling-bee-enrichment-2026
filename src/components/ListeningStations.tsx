import React, { useState, useRef, useEffect } from 'react';
import { 
  Headphones, 
  Volume2, 
  Users, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Play, 
  Clock, 
  Sparkles, 
  Award, 
  PenTool, 
  Trash2, 
  ArrowRight,
  Shuffle,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';
import { 
  MEETING_2_STATION_1_PARTNER,
  MEETING_2_STATION_2_AUDIO,
  MEETING_2_STATION_3_QUIZ,
  MEETING_3_STATION_1_PARTNER,
  MEETING_3_STATION_2_AUDIO,
  MEETING_3_STATION_3_QUIZ,
  ALL_WORDS_MAP
} from '../data/reviewData';
import { MeetingSession } from '../types';

interface ListeningStationsProps {
  onAwardTeamScore?: (team: 'A' | 'B', pts: number) => void;
  genAlphaMode: boolean;
  activeMeeting?: MeetingSession;
}

export default function ListeningStations({ onAwardTeamScore, genAlphaMode, activeMeeting = 'meeting-3' }: ListeningStationsProps) {
  const [stationMeeting, setStationMeeting] = useState<'meeting-2' | 'meeting-3'>(
    activeMeeting === 'meeting-2' ? 'meeting-2' : 'meeting-3'
  );

  // Sync if prop changes
  useEffect(() => {
    if (activeMeeting === 'meeting-2' || activeMeeting === 'meeting-3') {
      setStationMeeting(activeMeeting);
    }
  }, [activeMeeting]);

  // Station Tabs: 'partner' | 'audio-dictation' | 'digital-quiz'
  const [activeStation, setActiveStation] = useState<'partner' | 'audio-dictation' | 'digital-quiz'>('partner');

  // ==========================================
  // STATION 1: PARTNER DICTATION STATE
  // ==========================================
  const partnerWordList = stationMeeting === 'meeting-2' 
    ? MEETING_2_STATION_1_PARTNER 
    : MEETING_3_STATION_1_PARTNER;

  const [partnerIndex, setPartnerIndex] = useState(0);
  const [readerRole, setReaderRole] = useState<'Partner A' | 'Partner B'>('Partner A');
  const [partnerInput, setPartnerInput] = useState('');
  const [showPartnerCheck, setShowPartnerCheck] = useState(false);
  const [partnerTimer, setPartnerTimer] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && partnerTimer > 0) {
      interval = setInterval(() => {
        setPartnerTimer(t => t - 1);
      }, 1000);
    } else if (partnerTimer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      sound.playBuzzer();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, partnerTimer]);

  const currentPartnerWordString = partnerWordList[partnerIndex % partnerWordList.length];
  const partnerDetail = ALL_WORDS_MAP[currentPartnerWordString.toLowerCase()] || {
    def: 'Official Scripps Words of the Champions study word',
    ex: `The student spelled '${currentPartnerWordString}' with precision.`,
    pattern: 'Practice carefully'
  };

  const handleSwapPartners = () => {
    setReaderRole(prev => prev === 'Partner A' ? 'Partner B' : 'Partner A');
    setPartnerIndex(prev => prev + 1);
    setPartnerInput('');
    setShowPartnerCheck(false);
    setPartnerTimer(45);
    setIsTimerRunning(false);
    sound.playClick();
    confetti({ particleCount: 20, spread: 45 });
  };

  // ==========================================
  // STATION 2: AUDIO DICTATION STATE
  // ==========================================
  const audioWordList = stationMeeting === 'meeting-2'
    ? MEETING_2_STATION_2_AUDIO
    : MEETING_3_STATION_2_AUDIO;

  const [dictationIndex, setDictationIndex] = useState(0);
  const [dictationInput, setDictationInput] = useState('');
  const [dictationSubmitted, setDictationSubmitted] = useState(false);
  const [isPlayingTwice, setIsPlayingTwice] = useState(false);
  const [dictationScore, setDictationScore] = useState(0);

  // Digital Whiteboard Canvas for Audio Dictation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const currentAudioWordString = audioWordList[dictationIndex % audioWordList.length];
  const audioDetail = ALL_WORDS_MAP[currentAudioWordString.toLowerCase()] || {
    def: 'Official Scripps Words of the Champions audio study word',
    ex: `Listen to the enunciation of '${currentAudioWordString}'.`,
    pattern: 'Audio dictation word'
  };

  const playWordTwice = async () => {
    if (isPlayingTwice) return;
    setIsPlayingTwice(true);
    sound.playClick();
    try {
      await humanVoice.speakWordTwice(currentAudioWordString);
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

  const handleCheckDictation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dictationInput.trim()) return;
    setDictationSubmitted(true);
    const isCorrect = dictationInput.trim().toLowerCase() === currentAudioWordString.toLowerCase();
    if (isCorrect) {
      sound.playCorrect();
      setDictationScore(s => s + 1);
      confetti({ particleCount: 30, spread: 60 });
      if (onAwardTeamScore) {
        onAwardTeamScore('A', 5);
      }
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextDictation = () => {
    setDictationIndex(prev => (prev + 1) % audioWordList.length);
    setDictationInput('');
    setDictationSubmitted(false);
    handleClearCanvas();
    sound.playClick();
  };

  // ==========================================
  // STATION 3: DIGITAL QUIZ STATE
  // ==========================================
  const quizWordList = stationMeeting === 'meeting-2'
    ? MEETING_2_STATION_3_QUIZ
    : MEETING_3_STATION_3_QUIZ;

  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const currentQuizTarget = quizWordList[quizIndex % quizWordList.length];
  const currentQuizDetail = ALL_WORDS_MAP[currentQuizTarget.toLowerCase()] || {
    def: 'Scripps Words of the Champions test word',
    ex: `Listen and choose the correct orthographic form for '${currentQuizTarget}'.`
  };

  // Generate 4 deceptive options for the target word
  const generateQuizOptions = (word: string): string[] => {
    const w = word.toLowerCase();
    const distractors: string[] = [];

    // Common orthographic traps
    if (w === 'jealousy') distractors.push('jellousy', 'jealosy', 'jeallousy');
    else if (w === 'vouch') distractors.push('voutsh', 'vowch', 'vouche');
    else if (w === 'trivia') distractors.push('trivea', 'trivya', 'trivvia');
    else if (w === 'shoulder') distractors.push('sholder', 'shouldre', 'shollder');
    else if (w === 'zebra') distractors.push('zeebra', 'zebbra', 'zebrah');
    else if (w === 'butterscotch') distractors.push('buterscotch', 'butterscoth', 'butterscocht');
    else if (w === 'apron') distractors.push('apren', 'appron', 'aypron');
    else if (w === 'beagle') distractors.push('beegle', 'beagell', 'beagal');
    else if (w === 'kidney') distractors.push('kidny', 'kidnee', 'kydney');
    else if (w === 'raven') distractors.push('ravven', 'ravin', 'rayven');
    else if (w === 'ceramics') distractors.push('seramics', 'cerramics', 'ceramix');
    else if (w === 'mimetic') distractors.push('mimmetic', 'memetic', 'mimetick');
    else if (w === 'unabated') distractors.push('unabaited', 'unabbated', 'unebated');
    else if (w === 'petrifying') distractors.push('petrefying', 'pettrifying', 'petrifiing');
    else if (w === 'specimen') distractors.push('spesimen', 'specimin', 'speccimen');
    else if (w === 'interlocutor') distractors.push('interlocuter', 'interllocutor', 'interlocator');
    else if (w === 'machete') distractors.push('matchete', 'machette', 'machette');
    else if (w === 'dulcet') distractors.push('dullcet', 'dulcit', 'dolcet');
    else if (w === 'salubrious') distractors.push('salubrous', 'sallubrious', 'salubreous');
    else if (w === 'rotisserie') distractors.push('rotissere', 'rotissary', 'rottisserie');
    else {
      distractors.push(
        w.replace(/e$/, 'a'),
        w.replace(/c/, 'k'),
        w.replace(/l/, 'll')
      );
    }

    const set = Array.from(new Set([word, ...distractors])).slice(0, 4);
    // Deterministic shuffle based on word length
    return set.sort((a, b) => a.localeCompare(b));
  };

  const quizOptions = generateQuizOptions(currentQuizTarget);

  const handleSelectQuizOption = (opt: string) => {
    if (quizAnswered) return;
    setQuizSelected(opt);
    setQuizAnswered(true);
    if (opt.toLowerCase() === currentQuizTarget.toLowerCase()) {
      sound.playCorrect();
      setQuizScore(s => s + 1);
      confetti({ particleCount: 25, spread: 50 });
      if (onAwardTeamScore) {
        onAwardTeamScore('B', 5);
      }
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextQuiz = () => {
    setQuizIndex(prev => (prev + 1) % quizWordList.length);
    setQuizSelected(null);
    setQuizAnswered(false);
    sound.playClick();
  };

  return (
    <div className="space-y-6">

      {/* Top Header Card */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-black uppercase font-mono px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-400">
              Session Agenda: Part 4 (20 min)
            </span>
            <span className="text-xs font-black uppercase font-mono px-3 py-1 bg-fuchsia-100 text-[#560e51] rounded-full border border-fuchsia-300">
              Slide 8: 3-Station Rotation
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <span>Listening Stations</span>
            <Headphones className="h-7 w-7 text-[#9b2c98]" />
          </h2>
          <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 max-w-2xl">
            {stationMeeting === 'meeting-2'
              ? "Foundational Study List · 3 Interactive Stations with Partner Dictation, 2x Audio, and Digital Quiz!"
              : "Championship Two-Bee Arsenal · Advanced 3-Station Rotation covering all Slide 8 official words!"}
          </p>
        </div>

        {/* Meeting Switcher Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
          <span className="text-xs font-mono font-black uppercase text-slate-500">Active Deck:</span>
          <div className="bg-[#fdf2fe] p-1 rounded-2xl border-2 border-[#560e51] flex items-center shadow-[2px_2px_0px_0px_#560e51]">
            <button
              onClick={() => {
                setStationMeeting('meeting-2');
                setPartnerIndex(0);
                setDictationIndex(0);
                setQuizIndex(0);
                sound.playClick();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                stationMeeting === 'meeting-2'
                  ? 'bg-[#78c222] text-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Foundations List
            </button>
            <button
              onClick={() => {
                setStationMeeting('meeting-3');
                setPartnerIndex(0);
                setDictationIndex(0);
                setQuizIndex(0);
                sound.playClick();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                stationMeeting === 'meeting-3'
                  ? 'bg-[#9b2c98] text-white shadow-[2px_2px_0px_0px_#560e51]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Two-Bee Arsenal
            </button>
          </div>
        </div>
      </div>

      {/* 3 Station Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => {
            setActiveStation('partner');
            sound.playClick();
          }}
          className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
            activeStation === 'partner'
              ? 'bg-[#560e51] text-white border-[#560e51] shadow-[4px_4px_0px_0px_#78c222]'
              : 'bg-white text-slate-700 border-[#560e51] hover:bg-fuchsia-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-950">
              Station 1
            </span>
            <Users className="h-5 w-5" />
          </div>
          <h3 className="text-base font-black uppercase tracking-tight">Partner Dictation</h3>
          <p className="text-xs opacity-85 mt-1 font-bold">
            Read words to your partner, then swap! (10 Words)
          </p>
        </button>

        <button
          onClick={() => {
            setActiveStation('audio-dictation');
            sound.playClick();
          }}
          className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
            activeStation === 'audio-dictation'
              ? 'bg-[#560e51] text-white border-[#560e51] shadow-[4px_4px_0px_0px_#78c222]'
              : 'bg-white text-slate-700 border-[#560e51] hover:bg-fuchsia-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded bg-[#78c222] text-[#560e51]">
              Station 2
            </span>
            <Volume2 className="h-5 w-5" />
          </div>
          <h3 className="text-base font-black uppercase tracking-tight">Audio Dictation (2x)</h3>
          <p className="text-xs opacity-85 mt-1 font-bold">
            Listen to the recording read twice & spell (10 Words)
          </p>
        </button>

        <button
          onClick={() => {
            setActiveStation('digital-quiz');
            sound.playClick();
          }}
          className={`p-4 rounded-2xl border-3 text-left transition-all cursor-pointer ${
            activeStation === 'digital-quiz'
              ? 'bg-[#560e51] text-white border-[#560e51] shadow-[4px_4px_0px_0px_#78c222]'
              : 'bg-white text-slate-700 border-[#560e51] hover:bg-fuchsia-50'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono font-black uppercase px-2 py-0.5 rounded bg-sky-400 text-slate-950">
              Station 3
            </span>
            <Headphones className="h-5 w-5" />
          </div>
          <h3 className="text-base font-black uppercase tracking-tight">Digital Quiz Game</h3>
          <p className="text-xs opacity-85 mt-1 font-bold">
            Listen, then choose or type! (10 Words)
          </p>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* STATION 1: PARTNER DICTATION                                              */}
      {/* ========================================================================= */}
      {activeStation === 'partner' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-fuchsia-100 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono">
                Slide 8 · Partner Dictation Protocol
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                Word {partnerIndex + 1} of {partnerWordList.length}: {currentPartnerWordString}
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Partner Role indicator */}
              <div className="px-3 py-1.5 bg-purple-100 border-2 border-[#560e51] rounded-xl flex items-center gap-2">
                <Users className="h-4 w-4 text-[#560e51]" />
                <span className="text-xs font-black text-[#560e51] uppercase">
                  Reader: {readerRole}
                </span>
              </div>

              {/* Countdown timer */}
              <div className="px-3 py-1.5 bg-amber-50 border-2 border-amber-400 rounded-xl flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-800" />
                <span className="text-xs font-mono font-black text-amber-950">
                  {partnerTimer}s
                </span>
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className="text-[10px] uppercase font-bold text-amber-800 underline ml-1 cursor-pointer"
                >
                  {isTimerRunning ? 'Pause' : 'Start'}
                </button>
              </div>
            </div>
          </div>

          {/* Partner Role Instructions Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Reader Card (Partner A / B) */}
            <div className="bg-[#fefaf0] p-5 rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-amber-950 font-mono">
                  {readerRole} SCRIPT (Say Aloud)
                </span>
                <button
                  onClick={() => humanVoice.speakWord(currentPartnerWordString)}
                  className="p-1.5 bg-amber-200 hover:bg-amber-300 rounded-lg text-amber-950 border border-amber-500 cursor-pointer"
                  title="Pronounce"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-300">
                <span className="text-[10px] font-black uppercase text-slate-400 block font-mono">Target Word:</span>
                <p className="text-2xl font-black text-[#560e51] tracking-wide mt-0.5">
                  {currentPartnerWordString}
                </p>
                <p className="text-xs text-slate-600 mt-1 font-bold">
                  "{partnerDetail.ex}"
                </p>
              </div>

              <p className="text-xs font-bold text-slate-700 leading-relaxed">
                📢 <strong>Rule:</strong> Read the word clearly TWICE to your partner. Provide the sentence if they request it!
              </p>
            </div>

            {/* Right: Writer Slate (Partner B / A) */}
            <div className="bg-white p-5 rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] flex flex-col justify-between space-y-4">
              <div>
                <span className="text-xs font-black uppercase text-[#9b2c98] font-mono block mb-2">
                  WRITER SLATE (Write on whiteboard or type here)
                </span>

                <input
                  type="text"
                  value={partnerInput}
                  onChange={(e) => setPartnerInput(e.target.value)}
                  placeholder="Type or write your spelling..."
                  className="w-full px-4 py-3 bg-[#fdf2fe] border-2 border-[#560e51] rounded-xl text-lg font-black text-slate-900 tracking-wider focus:outline-none focus:ring-2 focus:ring-[#78c222]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setShowPartnerCheck(!showPartnerCheck)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black uppercase rounded-xl border border-slate-300 flex items-center gap-1.5 cursor-pointer"
                >
                  {showPartnerCheck ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showPartnerCheck ? 'Hide Reveal' : 'Reveal Target'}
                </button>

                <button
                  onClick={handleSwapPartners}
                  className="px-4 py-2 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] text-xs font-black uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] flex items-center gap-1.5 cursor-pointer"
                >
                  <Shuffle className="h-4 w-4" /> Swap Partners & Next Word
                </button>
              </div>

              {showPartnerCheck && (
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs font-bold text-[#560e51]">
                  Official Spelling: <strong className="text-base font-black tracking-wide ml-1">{currentPartnerWordString}</strong>
                  {partnerInput.trim().toLowerCase() === currentPartnerWordString.toLowerCase() ? (
                    <span className="text-emerald-600 block mt-1">✅ Perfect match! High five your partner!</span>
                  ) : partnerInput.trim() ? (
                    <span className="text-rose-600 block mt-1">🔍 Check the tricky letters and try again together.</span>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Full Station Word Grid */}
          <div className="bg-[#fdf2fe] p-4 rounded-2xl border-2 border-[#560e51]">
            <span className="text-xs font-black uppercase font-mono text-[#9b2c98] block mb-2">
              Station 1 Word List ({partnerWordList.length} Words):
            </span>
            <div className="flex flex-wrap gap-2">
              {partnerWordList.map((w, idx) => (
                <button
                  key={w}
                  onClick={() => {
                    setPartnerIndex(idx);
                    setPartnerInput('');
                    setShowPartnerCheck(false);
                    sound.playClick();
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black uppercase font-mono border-2 transition-all cursor-pointer ${
                    idx === partnerIndex % partnerWordList.length
                      ? 'bg-[#560e51] text-white border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-white text-slate-800 border-slate-300 hover:border-[#560e51]'
                  }`}
                >
                  {idx + 1}. {w}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATION 2: AUDIO DICTATION (2X RECORDING + WHITEBOARD)                     */}
      {/* ========================================================================= */}
      {activeStation === 'audio-dictation' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-fuchsia-100 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono">
                Slide 8 · Audio Dictation Station (Audio Read 2x)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                Challenge {dictationIndex + 1} of {audioWordList.length}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-[#78c222] text-[#560e51] border-2 border-[#560e51] rounded-xl text-xs font-black uppercase font-mono shadow-[2px_2px_0px_0px_#560e51]">
                Score: {dictationScore} Correct
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Audio Player & Input */}
            <div className="space-y-4">
              <div className="bg-[#fefaf0] p-6 rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] text-center space-y-4">
                <span className="text-xs font-black uppercase font-mono text-amber-950 block">
                  Listen to the Recording (Read Twice)
                </span>

                <button
                  onClick={playWordTwice}
                  disabled={isPlayingTwice}
                  className="w-full py-4 bg-[#9b2c98] hover:bg-[#852382] text-white font-black text-sm uppercase rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  <Volume2 className={`h-6 w-6 text-[#78c222] ${isPlayingTwice ? 'animate-bounce' : ''}`} />
                  {isPlayingTwice ? 'Reading Word Twice...' : '🔊 Play Word (Read 2x)'}
                </button>

                <p className="text-xs font-bold text-slate-600">
                  Definition clue: <span className="italic">{audioDetail.def}</span>
                </p>
              </div>

              {/* Form Input */}
              <form onSubmit={handleCheckDictation} className="space-y-3">
                <div>
                  <label className="text-xs font-black uppercase text-slate-700 font-mono block mb-1">
                    Your Spelling Submission:
                  </label>
                  <input
                    type="text"
                    value={dictationInput}
                    onChange={(e) => setDictationInput(e.target.value)}
                    placeholder="Enter what you heard..."
                    disabled={dictationSubmitted}
                    className="w-full px-4 py-3 bg-[#fdf2fe] border-2 border-[#560e51] rounded-xl text-lg font-black text-slate-900 tracking-wider focus:outline-none"
                  />
                </div>

                {!dictationSubmitted ? (
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer"
                  >
                    Check My Spelling
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className={`p-4 rounded-2xl border-2 ${
                      dictationInput.trim().toLowerCase() === currentAudioWordString.toLowerCase()
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                        : 'bg-rose-50 border-rose-500 text-rose-950'
                    }`}>
                      <p className="text-sm font-black uppercase flex items-center gap-1.5">
                        {dictationInput.trim().toLowerCase() === currentAudioWordString.toLowerCase() ? (
                          <>
                            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            Correct! Excellent listening!
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-rose-600" />
                            Incorrect. The correct spelling is: {currentAudioWordString}
                          </>
                        )}
                      </p>
                      <p className="text-xs mt-1 font-bold">
                        Pattern tip: {audioDetail.pattern || 'Keep your ears tuned to every syllable!'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleNextDictation}
                      className="w-full py-3 bg-[#560e51] hover:bg-[#43093f] text-white font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#78c222] cursor-pointer"
                    >
                      Next Audio Word →
                    </button>
                  </div>
                )}
              </form>
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
                Practice finger handwriting or mouse sketching before typing your answer!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATION 3: DIGITAL QUIZ GAME                                              */}
      {/* ========================================================================= */}
      {activeStation === 'digital-quiz' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-fuchsia-100 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#9b2c98] font-mono">
                Slide 8 · Digital Quiz Station (Listen, then Choose or Type!)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                Quiz Word {quizIndex + 1} of {quizWordList.length}
              </h3>
            </div>

            <div className="px-3 py-1.5 bg-sky-100 text-sky-950 border-2 border-sky-400 rounded-xl text-xs font-black uppercase font-mono shadow-[2px_2px_0px_0px_#560e51]">
              Quiz Score: {quizScore} Points
            </div>
          </div>

          <div className="bg-[#fefaf0] p-6 rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] text-center space-y-3">
            <span className="text-xs font-mono font-black uppercase text-amber-900">
              Listen to the Pronunciation:
            </span>

            <div className="flex justify-center">
              <button
                onClick={() => humanVoice.speakWord(currentQuizTarget)}
                className="px-6 py-3 bg-[#560e51] hover:bg-[#43093f] text-white font-black text-sm uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222] flex items-center gap-2 cursor-pointer"
              >
                <Volume2 className="h-5 w-5 text-[#78c222]" /> Listen to Word
              </button>
            </div>

            <p className="text-xs font-bold text-slate-600 max-w-lg mx-auto">
              Meaning: <span className="italic">"{currentQuizDetail.def}"</span>
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase font-mono text-slate-700 block">
              Select the Correct Spelling:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quizOptions.map((opt) => {
                const isSelected = quizSelected === opt;
                const isTarget = opt.toLowerCase() === currentQuizTarget.toLowerCase();

                let style = 'bg-white hover:bg-fuchsia-50 text-slate-900 border-[#560e51]';
                if (quizAnswered) {
                  if (isTarget) {
                    style = 'bg-emerald-100 text-emerald-950 border-emerald-600 shadow-[3px_3px_0px_0px_#059669]';
                  } else if (isSelected) {
                    style = 'bg-rose-100 text-rose-950 border-rose-600';
                  } else {
                    style = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelectQuizOption(opt)}
                    disabled={quizAnswered}
                    className={`p-4 rounded-2xl border-3 text-lg font-black tracking-wider text-center transition-all cursor-pointer ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {quizAnswered && (
            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={handleNextQuiz}
                className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] flex items-center gap-2 cursor-pointer"
              >
                Next Quiz Word <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Word List Footnote */}
          <div className="bg-[#fdf2fe] p-4 rounded-2xl border-2 border-[#560e51]">
            <span className="text-xs font-black uppercase font-mono text-[#9b2c98] block mb-2">
              Station 3 Word Pool ({quizWordList.length} Words):
            </span>
            <div className="flex flex-wrap gap-2">
              {quizWordList.map((w, idx) => (
                <span
                  key={w}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-black font-mono uppercase border ${
                    idx === quizIndex % quizWordList.length
                      ? 'bg-[#560e51] text-white border-[#560e51]'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
