import React, { useState } from 'react';
import { 
  OPEN_THE_BOX_30, 
  MEETING_2_WORDS_TO_KNOW, 
  MEETING_3_WORDS_TO_KNOW,
  MEETING_2_MOCK_BEE_WORDS,
  MEETING_3_MOCK_BEE_WORDS
} from '../data/reviewData';
import { ClassroomScores, BoxChallenge, MeetingSession } from '../types';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';
import {
  Gamepad2,
  Trophy,
  Users,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Volume2,
  CheckCircle2,
  XCircle,
  Zap,
  HelpCircle,
  Timer
} from 'lucide-react';

interface ClassroomGamesProps {
  teamScores: ClassroomScores;
  onUpdateScores?: (scores: ClassroomScores) => void;
  setTeamScores?: (scores: ClassroomScores) => void;
  onGamePlayed: (gameId: string) => void;
  genAlphaMode?: boolean;
  isTeacherMode?: boolean;
  activeMeeting?: MeetingSession;
}

interface JeopardyClue {
  category: string;
  points: number;
  clue: string;
  word: string;
  ruleHint: string;
}

export default function ClassroomGames({
  teamScores,
  onUpdateScores,
  setTeamScores,
  onGamePlayed,
  genAlphaMode,
  isTeacherMode,
  activeMeeting = 'meeting-3'
}: ClassroomGamesProps) {
  const [selectedGame, setSelectedGame] = useState<'open-box' | 'wheel' | 'jeopardy'>('open-box');
  const [meetingFilter, setMeetingFilter] = useState<'meeting-2' | 'meeting-3'>(
    activeMeeting === 'meeting-2' ? 'meeting-2' : 'meeting-3'
  );

  const updateScores = (newScores: ClassroomScores) => {
    if (onUpdateScores) onUpdateScores(newScores);
    if (setTeamScores) setTeamScores(newScores);
  };

  // Open the box state
  const [openedBoxes, setOpenedBoxes] = useState<Record<number, boolean>>({});
  const [activeBox, setActiveBox] = useState<BoxChallenge | null>(null);
  const [activeTeamTurn, setActiveTeamTurn] = useState<'teamA' | 'teamB'>('teamA');

  // Filter boxes according to active meeting (Meeting 2: boxes 1-15, Meeting 3: boxes 16-30)
  const filteredBoxes = OPEN_THE_BOX_30.filter(item => {
    if (meetingFilter === 'meeting-2') return item.boxNumber <= 15;
    return item.boxNumber > 15;
  });

  // Wheel State
  const [wheelDegree, setWheelDegree] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [wheelWord, setWheelWord] = useState<string | null>(null);

  // Pool of words for the wheel specifically filtered to the meeting's 3rd-6th grade words
  const wheelWordPool = meetingFilter === 'meeting-2' 
    ? [...MEETING_2_MOCK_BEE_WORDS, ...MEETING_2_WORDS_TO_KNOW.map(w => w.word)]
    : [...MEETING_3_MOCK_BEE_WORDS, ...MEETING_3_WORDS_TO_KNOW.map(w => w.word)];

  // Jeopardy State
  const [activeJeopardyModal, setActiveJeopardyModal] = useState<JeopardyClue | null>(null);
  const [jeopardyAnswerInput, setJeopardyAnswerInput] = useState('');
  const [jeopardyFeedback, setJeopardyFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [usedJeopardyCells, setUsedJeopardyCells] = useState<Record<string, boolean>>({});

  // 16 child-friendly Jeopardy clues mapped to Meeting 2 & Meeting 3 learning goals
  const JEOPARDY_CLUES: Record<string, JeopardyClue> = {
    // Meeting 2 Column 1: Prefix DIS- & Roots
    '0-100': { category: "Prefix 'dis-'", points: 100, clue: "To leave a boat, cruise ship, or airplane at the dock.", word: "disembark", ruleHint: "Prefix 'dis-' means away/un-" },
    '0-200': { category: "Prefix 'dis-'", points: 200, clue: "To unplug or break the electrical link between devices.", word: "disconnect", ruleHint: "Prefix 'dis-' + connect" },
    '0-300': { category: "Prefix 'dis-'", points: 300, clue: "To thoroughly clean a surface to get rid of germs.", word: "disinfect", ruleHint: "Prefix 'dis-' + infect" },
    '0-400': { category: "Prefix 'dis-'", points: 400, clue: "Able to communicate thoughts and feelings across a distance.", word: "telepathic", ruleHint: "Greek root 'tele-' means far" },

    // Column 2: Adjective Suffix -OUS
    '1-100': { category: "Suffix -OUS", points: 100, clue: "Known and recognized by almost everybody.", word: "famous", ruleHint: "Suffix '-ous' turns nouns into adjectives" },
    '1-200': { category: "Suffix -OUS", points: 200, clue: "Sounds that blend together into sweet, peaceful music.", word: "harmonious", ruleHint: "harmony + -ous = harmonious" },
    '1-300': { category: "Suffix -OUS", points: 300, clue: "Something wonderful that seems just like a miracle.", word: "miraculous", ruleHint: "miracle + -ulous = miraculous" },
    '1-400': { category: "Suffix -OUS", points: 400, clue: "Bravery when facing a tough challenge with head held high.", word: "courageous", ruleHint: "courage + -ous = courageous" },

    // Column 3: Silent Letters & Tricky Vowels
    '2-100': { category: "Silent Letters", points: 100, clue: "A trusted grown-up who protects and cares for you (silent 'u').", word: "guardian", ruleHint: "Silent 'u' after 'g': g-u-a-r-d-i-a-n" },
    '2-200': { category: "Silent Letters", points: 200, clue: "To secretly listen in on a chat (begins with 'e-a-v-e-s').", word: "eavesdrop", ruleHint: "e-a-v-e-s + drop" },
    '2-300': { category: "Silent Letters", points: 300, clue: "A cozy fluffy bed comforter from French (silent 't').", word: "duvet", ruleHint: "French loanword: d-u-v-e-t" },
    '2-400': { category: "Silent Letters", points: 400, clue: "A fancy musical evening party keeping its accent mark.", word: "soirée", ruleHint: "French loanword: s-o-i-r-é-e" },

    // Column 4: Double Consonants & Science Words
    '3-100': { category: "Double Letters", points: 100, clue: "A soft cotton fabric used for cozy plaid pajamas.", word: "flannel", ruleHint: "Double 'n': f-l-a-n-n-e-l" },
    '3-200': { category: "Double Letters", points: 200, clue: "A clever trick or catch used to get people's attention.", word: "gimmick", ruleHint: "Double 'm': g-i-m-m-i-c-k" },
    '3-300': { category: "Double Letters", points: 300, clue: "The group of dedicated staff members who work at a school.", word: "personnel", ruleHint: "Double 'n', single 'l': p-e-r-s-o-n-n-e-l" },
    '3-400': { category: "Double Letters", points: 400, clue: "An intense fear of thunder and flashing lightning.", word: "brontophobia", ruleHint: "Greek roots: bronto + phobia" }
  };

  // Open box handler
  const handleOpenBox = (item: BoxChallenge) => {
    sound.playLetterKey();
    setOpenedBoxes(prev => ({ ...prev, [item.boxNumber]: true }));
    setActiveBox(item);
    onGamePlayed('open-the-box');
  };

  const handleGradeBox = (isCorrect: boolean) => {
    if (!activeBox) return;

    if (isCorrect) {
      sound.playCorrect();
      updateScores({
        ...teamScores,
        [activeTeamTurn]: teamScores[activeTeamTurn] + (activeBox.points || 10)
      });
    } else {
      sound.playWrong();
    }
    setActiveBox(null);
    setActiveTeamTurn(prev => (prev === 'teamA' ? 'teamB' : 'teamA'));
  };

  // Wheel spin
  const handleSpinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    sound.playLetterKey();

    const randomRotation = 1440 + Math.floor(Math.random() * 360);
    const newDegree = wheelDegree + randomRotation;
    setWheelDegree(newDegree);

    setTimeout(() => {
      setIsSpinning(false);
      const chosen = wheelWordPool[Math.floor(Math.random() * wheelWordPool.length)];
      setWheelWord(chosen);
      sound.playFanfare();
      humanVoice.speakWord(chosen);
      onGamePlayed('wheel-of-spelling');
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6">
      {/* Title & Banner */}
      <div className="bg-[#241a12] border-2 border-amber-500/30 rounded-2xl p-5 sm:p-6 mb-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎮</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-amber-400">
                CLASSROOM GAMIFICATION ARENA
              </h2>
            </div>
            <p className="text-xs text-amber-200/80 mt-1">
              Interactive team games for Grades 3–6 aligned to weekly spelling goals & patterns.
            </p>
          </div>

          {/* Meeting Session Selector */}
          <div className="flex items-center gap-1.5 bg-[#18110b] p-1.5 rounded-xl border border-amber-500/30">
            <button
              onClick={() => {
                sound.playClick();
                setMeetingFilter('meeting-2');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                meetingFilter === 'meeting-2'
                  ? 'bg-amber-400 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Foundations (Roots & Affixes)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setMeetingFilter('meeting-3');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                meetingFilter === 'meeting-3'
                  ? 'bg-amber-400 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Two-Bee (Loan Words & Stems)
            </button>
          </div>

          {/* Team Scores Bar */}
          <div className="flex items-center gap-3 bg-[#18110b] border border-amber-500/30 px-4 py-2 rounded-xl">
            <div className="text-center">
              <span className="text-[10px] text-stone-400 block font-mono">
                {teamScores.teamAName || 'Team Honeybees'}
              </span>
              <span className="font-serif font-black text-xl text-amber-400">
                {teamScores.teamA} pts
              </span>
            </div>
            <span className="text-stone-600 font-bold">VS</span>
            <div className="text-center">
              <span className="text-[10px] text-stone-400 block font-mono">
                {teamScores.teamBName || 'Team Hornets'}
              </span>
              <span className="font-serif font-black text-xl text-amber-300">
                {teamScores.teamB} pts
              </span>
            </div>
          </div>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-amber-500/20">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedGame('open-box');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedGame === 'open-box'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'bg-[#1a120b] border border-amber-500/20 text-stone-300 hover:border-amber-400'
            }`}
          >
            <span>📦</span>
            <span>Open The Box (15 Target Words)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setSelectedGame('wheel');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedGame === 'wheel'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'bg-[#1a120b] border border-amber-500/20 text-stone-300 hover:border-amber-400'
            }`}
          >
            <span>🎡</span>
            <span>Wheel of Spelling Words</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setSelectedGame('jeopardy');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedGame === 'jeopardy'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'bg-[#1a120b] border border-amber-500/20 text-stone-300 hover:border-amber-400'
            }`}
          >
            <span>🏆</span>
            <span>Pattern Jeopardy Board</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GAME 1: OPEN THE BOX 30 GRID */}
      {/* ========================================================================= */}
      {selectedGame === 'open-box' && (
        <div className="space-y-4">
          <div className="bg-[#1b120c] border border-amber-500/30 rounded-xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-stone-200">
              <span className="text-amber-400 font-bold">Turn to Spell: </span>
              <strong className="text-amber-300 font-serif uppercase tracking-wider">
                {activeTeamTurn === 'teamA' ? teamScores.teamAName : teamScores.teamBName}
              </strong>
            </div>
            <span className="text-amber-200/70 font-mono text-[11px]">
              Showing {meetingFilter === 'meeting-2' ? 'Foundations (Boxes 1-15)' : 'Two-Bee Mastery (Boxes 16-30)'}
            </span>
          </div>

          <div className="bg-[#241a12] border-2 border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {filteredBoxes.map(item => {
                const isOpened = openedBoxes[item.boxNumber];
                const isSelected = activeBox?.boxNumber === item.boxNumber;

                return (
                  <button
                    key={item.boxNumber}
                    onClick={() => handleOpenBox(item)}
                    className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-stone-950 font-black border-white shadow-xl scale-105 ring-4 ring-amber-400/40'
                        : isOpened
                        ? 'bg-[#382618] border-amber-500/60 text-amber-300'
                        : 'bg-[#1b120c] border-amber-500/30 hover:border-amber-400 text-stone-300 hover:scale-105 shadow-md'
                    }`}
                  >
                    <span className="font-mono font-black text-xl">Box #{item.boxNumber}</span>
                    {isOpened ? (
                      <span className="text-[11px] font-bold uppercase truncate max-w-full text-amber-200 mt-1">
                        {item.word}
                      </span>
                    ) : (
                      <span className="text-2xl mt-1 opacity-70">🎁</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {activeBox && (
            <div className="bg-[#241a12] border-2 border-amber-500/60 rounded-2xl p-6 shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-amber-500/20 mb-4">
                <span className="text-xs font-mono font-bold text-amber-400">
                  BOX #{activeBox.boxNumber} • Level: {activeBox.level} • {activeBox.points} pts
                </span>
                <button
                  onClick={() => humanVoice.speakWord(activeBox.word)}
                  className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Pronounce Word</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="bg-[#1b120c] p-4 rounded-xl border border-amber-500/20">
                  <span className="text-[10px] text-amber-400/70 font-mono block uppercase">Definition Clue:</span>
                  <p className="text-sm font-semibold text-stone-200 mt-0.5">{activeBox.definition}</p>
                </div>

                <div className="bg-[#1b120c] p-4 rounded-xl border border-amber-500/20">
                  <span className="text-[10px] text-amber-400/70 font-mono block uppercase">Sentence Example:</span>
                  <p className="text-sm italic text-stone-300 mt-0.5">"{activeBox.sentence}"</p>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl">
                  <span className="text-[10px] text-amber-400 font-mono block uppercase font-bold">Orthographic Pattern Clue:</span>
                  <p className="text-xs text-amber-200 font-medium">{activeBox.hint}</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-400">Award points to:</span>
                  <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-400/40">
                    {activeTeamTurn === 'teamA' ? teamScores.teamAName : teamScores.teamBName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleGradeBox(false)}
                    className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-600/50 text-rose-300 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Missed (0 pts)</span>
                  </button>
                  <button
                    onClick={() => handleGradeBox(true)}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-black rounded-xl text-xs flex items-center gap-1 cursor-pointer shadow-lg"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Spelled Correctly (+{activeBox.points} pts)</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAME 2: WHEEL OF SPELLING WORDS */}
      {/* ========================================================================= */}
      {selectedGame === 'wheel' && (
        <div className="bg-[#241a12] border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center shadow-xl">
          <h3 className="font-serif text-2xl font-black text-amber-400">
            WHEEL OF GRADE 3–6 SPELLING WORDS
          </h3>
          <p className="text-xs text-stone-300 mb-6 mt-1">
            Spin the championship wheel to pick a random target word from {meetingFilter === 'meeting-2' ? 'Foundational Patterns' : 'Two-Bee Words'}!
          </p>

          <div className="relative w-64 h-64 mx-auto my-6">
            <div
              className="w-full h-full rounded-full border-8 border-amber-500 shadow-2xl flex items-center justify-center transition-all duration-[3000ms] ease-out bg-gradient-to-tr from-amber-900 via-amber-600 to-amber-400"
              style={{ transform: `rotate(${wheelDegree}deg)` }}
            >
              <div className="w-20 h-20 rounded-full bg-[#1b120c] border-4 border-white flex items-center justify-center font-black text-2xl">
                🐝
              </div>
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-amber-300 z-10"></div>
          </div>

          <button
            onClick={handleSpinWheel}
            disabled={isSpinning}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black rounded-2xl text-sm uppercase tracking-wider shadow-xl disabled:opacity-50 cursor-pointer"
          >
            {isSpinning ? 'Spinning The Wheel...' : 'Spin The Wheel! 🎡'}
          </button>

          {wheelWord && (
            <div className="mt-6 p-5 rounded-2xl bg-[#1b120c] border-2 border-amber-500/40 inline-block animate-fadeIn shadow-xl">
              <span className="text-xs text-stone-400 uppercase font-mono block mb-1">Target Word Selected:</span>
              <span className="font-serif font-black text-3xl sm:text-4xl text-amber-400 uppercase tracking-widest block">
                {wheelWord}
              </span>
              <button
                onClick={() => humanVoice.speakWord(wheelWord)}
                className="mt-3 px-4 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" /> Listen Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAME 3: JEOPARDY GRID */}
      {/* ========================================================================= */}
      {selectedGame === 'jeopardy' && (
        <div className="bg-[#241a12] border-2 border-amber-500/30 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-serif text-2xl font-black text-amber-400">
                JEOPARDY SPELLING BEE BOARD
              </h3>
              <p className="text-xs text-stone-300 mt-0.5">
                Pick a category & point value. Listen to the clue and spell the pattern word!
              </p>
            </div>
            <button
              onClick={() => {
                setUsedJeopardyCells({});
                sound.playClick();
              }}
              className="px-3 py-1.5 bg-[#18110b] hover:bg-stone-800 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Board
            </button>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center">
            {["Prefix 'dis-'", 'Suffix -OUS', 'Silent Letters', 'Double Consonants'].map(cat => (
              <div
                key={cat}
                className="bg-[#1b120c] border border-amber-500/40 p-3 rounded-xl font-bold text-xs text-amber-300 uppercase font-mono tracking-tight"
              >
                {cat}
              </div>
            ))}

            {[100, 200, 300, 400].map(pts => (
              <React.Fragment key={pts}>
                {Array.from({ length: 4 }).map((_, colIdx) => {
                  const cellKey = `${colIdx}-${pts}`;
                  const isUsed = usedJeopardyCells[cellKey];
                  const clueData = JEOPARDY_CLUES[cellKey];

                  return (
                    <button
                      key={colIdx}
                      disabled={isUsed}
                      onClick={() => {
                        if (!clueData) return;
                        sound.playLetterKey();
                        setActiveJeopardyModal(clueData);
                        setJeopardyAnswerInput('');
                        setJeopardyFeedback(null);
                        setUsedJeopardyCells(prev => ({ ...prev, [cellKey]: true }));
                      }}
                      className={`p-4 rounded-xl font-mono font-black text-lg transition-all cursor-pointer ${
                        isUsed
                          ? 'bg-[#150e09] text-stone-600 border border-stone-800 opacity-40 cursor-not-allowed'
                          : 'bg-[#1e150f] hover:bg-amber-500 hover:text-stone-950 border border-amber-500/30 hover:border-amber-400 text-amber-400 shadow-md'
                      }`}
                    >
                      ${pts}
                    </button>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          {/* Interactive Jeopardy Clue Modal */}
          {activeJeopardyModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-[#241a12] border-4 border-amber-500 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                  <span className="text-xs font-mono font-black uppercase text-amber-400">
                    Category: {activeJeopardyModal.category} • ${activeJeopardyModal.points}
                  </span>
                  <button
                    onClick={() => setActiveJeopardyModal(null)}
                    className="text-stone-400 hover:text-white font-bold text-xs cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-amber-300 block mb-1">Jeopardy Clue:</span>
                  <h4 className="text-xl font-bold text-white leading-snug">
                    "{activeJeopardyModal.clue}"
                  </h4>
                  <p className="text-xs text-amber-300/80 mt-2 italic font-mono">
                    Pattern clue: {activeJeopardyModal.ruleHint}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <input
                    type="text"
                    placeholder="Type the spelling word..."
                    value={jeopardyAnswerInput}
                    onChange={e => setJeopardyAnswerInput(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        const isCorrect = jeopardyAnswerInput.trim().toLowerCase() === activeJeopardyModal.word.toLowerCase();
                        if (isCorrect) {
                          sound.playCorrect();
                          setJeopardyFeedback('correct');
                          updateScores({ ...teamScores, teamA: teamScores.teamA + activeJeopardyModal.points });
                        } else {
                          sound.playWrong();
                          setJeopardyFeedback('wrong');
                        }
                      }
                    }}
                    className="w-full px-4 py-3 bg-[#18110b] border-2 border-amber-500/40 rounded-xl text-amber-300 font-mono font-bold text-center tracking-wider uppercase text-lg focus:outline-none focus:border-amber-400"
                  />

                  {jeopardyFeedback === 'correct' && (
                    <div className="p-3 bg-emerald-950/60 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-bold text-center animate-fadeIn">
                      🎉 Correct! The word is "{activeJeopardyModal.word}" (+${activeJeopardyModal.points})
                    </div>
                  )}

                  {jeopardyFeedback === 'wrong' && (
                    <div className="p-3 bg-rose-950/60 border border-rose-500 rounded-xl text-rose-300 text-xs font-bold text-center animate-fadeIn">
                      ❌ Incorrect! The word was "{activeJeopardyModal.word}"
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-amber-500/20">
                  <button
                    onClick={() => humanVoice.speakWord(activeJeopardyModal.word)}
                    className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Pronounce Word
                  </button>
                  <button
                    onClick={() => setActiveJeopardyModal(null)}
                    className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl text-xs font-black uppercase cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
