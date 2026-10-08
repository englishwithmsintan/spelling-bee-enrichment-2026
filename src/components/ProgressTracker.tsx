import React from 'react';
import { StudentProgress, ClassroomScores } from '../types';
import { sound } from './SoundManager';
import { Award, BookOpen, RotateCcw, Sparkles, CheckCircle2, Trophy, Star } from 'lucide-react';
import { ALL_WORD_STUDY_CARDS } from '../data/reviewData';

interface ProgressTrackerProps {
  progress: StudentProgress;
  onResetProgress: () => void;
  isTeacherMode: boolean;
  teamScores: ClassroomScores;
}

export default function ProgressTracker({
  progress,
  onResetProgress,
  isTeacherMode,
  teamScores
}: ProgressTrackerProps) {
  
  const totalVocab = ALL_WORD_STUDY_CARDS.length;
  const masteredVocab = progress.vocabReviewed ? progress.vocabReviewed.length : 0;
  const vocabPct = totalVocab > 0 ? Math.round((masteredVocab / totalVocab) * 100) : 0;

  // Unlocked stickers checklist for Spelling Bee Enrichment
  const stickers = [
    {
      id: 'badge-warmup',
      title: 'Warm-Up Speller 🏁',
      desc: 'Completed the 10-word diagnostic baseline pre-test.',
      unlocked: progress.preTestScore !== null && progress.preTestScore !== undefined,
      badgeColor: 'bg-amber-400 text-amber-950 border-amber-600'
    },
    {
      id: 'badge-words',
      title: 'Vocabulary Master 📖',
      desc: 'Mastered 10+ official Scripps & PPT championship words.',
      unlocked: masteredVocab >= 10,
      badgeColor: 'bg-purple-400 text-purple-950 border-purple-600'
    },
    {
      id: 'badge-patterns',
      title: 'Pattern Detective 🔬',
      desc: 'Explored silent letters, double letters, and classical roots.',
      unlocked: Object.keys(progress.patternAccuracy || {}).length > 0 || masteredVocab >= 5,
      badgeColor: 'bg-emerald-400 text-emerald-950 border-emerald-600'
    },
    {
      id: 'badge-listening',
      title: 'Dictation Ace 🎧',
      desc: 'Completed partner, audio 2x, and digital listening stations.',
      unlocked: progress.gamesPlayed.some(g => g.includes('listening') || g.includes('station')) || masteredVocab >= 15,
      badgeColor: 'bg-sky-400 text-sky-950 border-sky-600'
    },
    {
      id: 'badge-star',
      title: 'Spelling Star Champion ⭐',
      desc: 'Scored 8+ in the post-test and earned the official star!',
      unlocked: (progress.postTestScore ?? 0) >= 8,
      badgeColor: 'bg-[#78c222] text-[#560e51] border-[#560e51]'
    }
  ];

  const totalBadgesEarned = stickers.filter(s => s.unlocked).length;

  return (
    <div className="w-full space-y-6">
      
      {/* Lesson Progress Breakdown */}
      <div className="space-y-4">
        {/* Spelling Words Mastery Bar */}
        <div>
          <div className="flex justify-between text-xs font-black text-slate-900 mb-1">
            <span className="text-[#560e51]">CHAMPIONSHIP WORDS MASTERED</span>
            <span className="font-mono text-[#9b2c98]">{masteredVocab}/{totalVocab} cards</span>
          </div>
          <div className="h-3.5 w-full bg-fuchsia-100 border-2 border-[#560e51] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#78c222] border-r-2 border-[#560e51] transition-all duration-700"
              style={{ width: `${vocabPct}%` }}
            />
          </div>
        </div>

        {/* Scores log */}
        <div className="bg-[#fdf2fe] border-2 border-[#560e51] rounded-xl p-3 flex justify-between items-center text-xs shadow-[2px_2px_0px_0px_#560e51]">
          <div>
            <span className="font-black text-[#9b2c98] font-mono text-[10px] block uppercase leading-none">POST-TEST SCORE</span>
            <span className="font-bold text-[#560e51] mt-1 block leading-none">
              {progress.postTestScore !== null && progress.postTestScore !== undefined
                ? `${progress.postTestScore} / 10 WORDS CORRECT` 
                : 'ASSESSMENT PENDING'}
            </span>
          </div>
          {progress.postTestScore !== null && progress.postTestScore !== undefined ? (
            <span className="bg-[#78c222] text-[#560e51] px-2 py-0.5 font-mono font-black border-2 border-[#560e51] rounded text-[10px] uppercase">
              {Math.round((progress.postTestScore / 10) * 100)}% ACC
            </span>
          ) : (
            <span className="bg-amber-200 text-[#560e51] px-2 py-0.5 font-mono font-black border-2 border-[#560e51] rounded text-[10px]">INCOMPLETE</span>
          )}
        </div>
      </div>

      {/* Grid of Badges */}
      <div className="border-t-2 border-fuchsia-100 pt-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] font-black tracking-widest text-[#560e51] uppercase font-mono">
            SPELLING BADGES ({totalBadgesEarned}/{stickers.length})
          </span>
        </div>
        
        <div className="grid grid-cols-1 gap-2">
          {stickers.map(stamp => {
            return (
              <div 
                key={stamp.id}
                className={`flex items-center gap-2.5 p-2 rounded-xl border-2 transition-all ${
                  stamp.unlocked
                    ? 'bg-[#fefaf0] border-[#560e51] text-slate-900 shadow-[2px_2px_0px_0px_#560e51]'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-55'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg border-2 ${stamp.unlocked ? `${stamp.badgeColor} shadow-[1px_1px_0px_0px_#560e51]` : 'bg-slate-200 border-slate-300 text-slate-400'} flex items-center justify-center shrink-0`}>
                  <Award className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-black tracking-tight leading-none ${stamp.unlocked ? 'text-slate-900' : 'text-slate-400'}`}>{stamp.title}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5 leading-tight font-medium">{stamp.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset progress */}
      <div className="border-t-2 border-fuchsia-100 pt-3 flex justify-end">
        <button
          id="btn-wipe-analytics"
          onClick={() => {
            if (confirm('Are you sure you want to erase your spelling enrichment progress and test records?')) {
              onResetProgress();
              sound.playWrong();
            }
          }}
          className="flex items-center gap-1.5 text-rose-500 hover:text-rose-600 text-[10px] font-black uppercase font-mono tracking-tight cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" /> Reset Student Log
        </button>
      </div>

    </div>
  );
}
