import React from 'react';
import { Award, Sparkles, Trophy, CheckCircle2 } from 'lucide-react';
import TreeLogo from './TreeLogo';

interface AnimatedMasteryBarProps {
  percentage: number;
  unlockedBadgesCount: number;
  totalWordsCount: number;
  reviewedCount: number;
  examScore: number | null;
}

export default function AnimatedMasteryBar({
  percentage,
  unlockedBadgesCount,
  totalWordsCount,
  reviewedCount,
  examScore
}: AnimatedMasteryBarProps) {
  const getMasteryRank = (pct: number) => {
    if (pct >= 90) return { title: 'Grand Tree Scholar 🏆', color: 'from-lime-400 via-green-500 to-purple-500' };
    if (pct >= 75) return { title: 'Master Bee Speller 🌳', color: 'from-purple-500 to-lime-500' };
    if (pct >= 50) return { title: 'Advanced Wordsmith ⭐', color: 'from-emerald-500 to-lime-400' };
    if (pct >= 25) return { title: 'Spelling Scout 🔍', color: 'from-purple-400 to-pink-500' };
    return { title: 'Sprouting Speller 🌱', color: 'from-lime-600 to-green-500' };
  };

  const rank = getMasteryRank(percentage);

  return (
    <div className="bg-[#2b0c3e] border-2 border-purple-500/40 rounded-3xl p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white p-1 border-2 border-lime-400/80 shadow-md flex items-center justify-center shrink-0">
            <TreeLogo className="w-full h-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-lime-400">
                Session Growth & Mastery
              </span>
              <span className="text-[11px] font-black bg-lime-400/20 text-lime-300 border border-lime-400/40 px-2.5 py-0.5 rounded-full">
                {rank.title}
              </span>
            </div>
            <p className="text-xs text-purple-200/90 font-medium">
              Tree of Knowledge • 90-Minute Scripps National Spelling Bee Journey
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="text-right bg-[#200830] px-3 py-1.5 rounded-xl border border-purple-500/30">
            <span className="text-purple-300/80 block text-[10px] uppercase font-bold">Words Studied</span>
            <span className="font-black text-lime-300 text-sm">{reviewedCount} / {totalWordsCount}</span>
          </div>
          {examScore !== null && (
            <div className="text-right bg-[#200830] px-3 py-1.5 rounded-xl border border-purple-500/30">
              <span className="text-purple-300/80 block text-[10px] uppercase font-bold">Exam Score</span>
              <span className="font-black text-lime-400 text-sm">{examScore}%</span>
            </div>
          )}
          <div className="text-right bg-[#200830] px-3 py-1.5 rounded-xl border border-purple-500/30">
            <span className="text-purple-300/80 block text-[10px] uppercase font-bold">Badges</span>
            <span className="font-black text-lime-400 text-sm">🏅 {unlockedBadgesCount}</span>
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-4 bg-[#1a0526] rounded-full overflow-hidden border border-purple-500/40 p-0.5 shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${rank.color} transition-all duration-700 ease-out rounded-full shadow-lg relative`}
          style={{ width: `${Math.max(5, Math.min(100, percentage))}%` }}
        >
          <div className="absolute inset-0 bg-white/25 animate-pulse pointer-events-none rounded-full"></div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2 text-[11px] text-purple-200/80 font-bold">
        <span>🌱 0% Baseline</span>
        <span className="font-black text-lime-400 text-xs bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-lime-400/30">
          {percentage}% Mastered
        </span>
        <span>🌳 100% Grand Champion</span>
      </div>
    </div>
  );
}
