import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Award, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  Play,
  Layers,
  Star,
  Compass,
  FileText,
  Lightbulb,
  Check,
  Trophy,
  Search,
  Scale,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';
import { 
  MEETING_2_WARM_UP, 
  MEETING_3_WARM_UP, 
  MEETING_3_PATTERNS,
  MEETING_3_WORDS_TO_KNOW,
  MEETING_3_FULL_61_WORDS,
  ALL_WORDS_MAP
} from '../data/reviewData';

interface Meeting3MasterLessonProps {
  onAwardTeamScore?: (team: 'A' | 'B', pts: number) => void;
  onNavigateTab?: (tab: string) => void;
  genAlphaMode: boolean;
}

// Stage breakdown for the 90-minute Meeting 3 Deep Lesson
type LessonSection = 
  | 'overview'
  | 'm2-warmup'
  | 'french-mastery'
  | 'greek-roots'
  | 'latin-origins'
  | 'two-bee-breakdown'
  | 'interactive-lab'
  | 'exit-ticket';

interface WarmUpReviewItem {
  id: string;
  word: string;
  meet2Rule: string;
  meet3Bridge: string;
  testPrompt: string;
  options: string[];
  correct: string;
  origin: string;
}

const FOUNDATIONAL_TO_CHAMPION_WARMUPS: WarmUpReviewItem[] = [
  {
    id: 'wu-bridge-1',
    word: 'guardian',
    meet2Rule: "Silent 'u' after 'g' (g-u-a-r-d-i-a-n)",
    meet3Bridge: "Expands to French silent letters ('duvet' with silent 't', 'faux' with silent 'x') and 'buoyancy' with silent 'u'!",
    testPrompt: "Spell the word for a protector or caretaker (foundational pattern recap):",
    options: ['gardian', 'guardian', 'guardien', 'gaurdian'],
    correct: 'guardian',
    origin: 'Old French / Germanic'
  },
  {
    id: 'wu-bridge-2',
    word: 'telepathic',
    meet2Rule: "Greek root 'tele-' means far / across distance",
    meet3Bridge: "Greek morphology levels up to 'phil-' (love/friendship in philharmonic) and '-phobia' (fear in brontophobia)!",
    testPrompt: "Which Greek root means 'far away' or 'distant'?",
    options: ['tele-', 'phil-', 'bio-', 'scop-'],
    correct: 'tele-',
    origin: 'Greek (tele + pathos)'
  },
  {
    id: 'wu-bridge-3',
    word: 'disembark',
    meet2Rule: "Prefix 'dis-' means away, opposite, or to leave",
    meet3Bridge: "Affixes combine into complex Two-Bee structures like 'decrepitude' (de-), 'exoneration' (ex-), and 'unabated' (un-)!",
    testPrompt: "What does the Latin prefix 'dis-' mean in 'disembark' and 'disconnect'?",
    options: ['away / opposite of', 'closer together', 'making smaller', 'loving deeply'],
    correct: 'away / opposite of',
    origin: 'Latin prefix dis-'
  },
  {
    id: 'wu-bridge-4',
    word: 'harmonious',
    meet2Rule: "Suffix '-ous' turns nouns into adjectives meaning 'full of'",
    meet3Bridge: "Championship words feature high-level '-ous' words: 'unctuous', 'nebulous', 'salubrious', 'leguminous', and 'herbaceous'!",
    testPrompt: "How does the suffix '-ous' change words like 'harmony' and 'courage'?",
    options: ['Makes them adjectives meaning full of', 'Makes them past tense verbs', 'Makes them plural nouns', 'Makes them adverbs'],
    correct: 'Makes them adjectives meaning full of',
    origin: 'Latin -osus'
  },
  {
    id: 'wu-bridge-5',
    word: 'flannel',
    meet2Rule: "Double consonants: double 'n' with single 'l' (f-l-a-n-n-e-l)",
    meet3Bridge: "Championship list features the major Two-Bee double-consonant test: 'personnel' (double 'n', single 'l') vs 'personal'!",
    testPrompt: "Which Two-Bee employee word mirrors 'flannel' by using double 'n' with single 'l'?",
    options: ['personal', 'personnel', 'personell', 'perrsonel'],
    correct: 'personnel',
    origin: 'French (personnel)'
  }
];

export default function Meeting3MasterLesson({ 
  onAwardTeamScore, 
  onNavigateTab, 
  genAlphaMode 
}: Meeting3MasterLessonProps) {
  const [currentSection, setCurrentSection] = useState<LessonSection>('overview');
  
  // Warm-up bridge practice states
  const [warmupAnswers, setWarmupAnswers] = useState<Record<string, string>>({});
  const [warmupFeedback, setWarmupFeedback] = useState<Record<string, boolean | null>>({});
  const [warmupScore, setWarmupScore] = useState<number>(0);

  // Interactive French Loanword Decoder
  const [selectedFrenchWord, setSelectedFrenchWord] = useState<string>('soirée');
  const [frenchAccentsChecked, setFrenchAccentsChecked] = useState(false);

  // Greek Roots Lab
  const [selectedRoot, setSelectedRoot] = useState<'phil' | 'phobia'>('phil');

  // Two-Bee 125-Word Arsenal State
  const [wordSearch, setWordSearch] = useState('');
  const [wordClusterFilter, setWordClusterFilter] = useState<'all' | 'french' | 'greek' | 'consonants' | 'science' | 'global'>('all');
  const [spotlightWord, setSpotlightWord] = useState<string>('soirée');

  // Exit ticket quick challenge
  const [exitInputs, setExitInputs] = useState<Record<string, string>>({
    q1: '',
    q2: '',
    q3: ''
  });
  const [exitSubmitted, setExitSubmitted] = useState(false);

  const handleAnswerWarmup = (itemId: string, selectedOption: string, correctOption: string) => {
    sound.playLetterKey();
    const isCorrect = selectedOption === correctOption;
    setWarmupAnswers(prev => ({ ...prev, [itemId]: selectedOption }));
    setWarmupFeedback(prev => ({ ...prev, [itemId]: isCorrect }));

    if (isCorrect) {
      sound.playCorrect();
      setWarmupScore(s => s + 1);
      if (onAwardTeamScore) onAwardTeamScore('A', 10);
    } else {
      sound.playWrong();
    }
  };

  const FRENCH_WORDS_DATA = [
    {
      word: 'soirée',
      phonetic: '/swɑːˈreɪ/',
      literalMeaning: "evening party or gathering",
      frenchRule: "Keeps the acute accent (é) on the first 'e'. Without it, the pronunciation and authentic French spelling is broken!",
      memoryHook: "Remember: s-o-i-r-é-e. It starts with 'soir' (French for evening) + 'ée'!",
      example: "The patron of the arts hosted a candlelit chamber music soirée.",
      silentTrap: "No silent ending consonant, but essential acute accent mark on the final 'e'!"
    },
    {
      word: 'duvet',
      phonetic: '/duːˈveɪ/',
      literalMeaning: "soft down-filled bed comforter or quilt",
      frenchRule: "Final consonant 't' is completely silent! In French, words ending in '-et' pronounce as /eɪ/ without voicing the 't'.",
      memoryHook: "Spell: d-u-v-e-t. Don't write 'doovay' — the French 't' is resting silently at the end!",
      example: "On chilly winter mornings, staying tucked under the warm duvet is heaven.",
      silentTrap: "Silent 't' at the very end (never pronounce the /t/ sound)."
    },
    {
      word: 'faux',
      phonetic: '/foʊ/',
      literalMeaning: "artificial, imitation, or false",
      frenchRule: "Silent 'x'! The vowel digraph 'au' makes the long /oʊ/ sound, and the final 'x' is not voiced.",
      memoryHook: "Spell: f-a-u-x. Only 4 letters, yet sounds exactly like 'foe'!",
      example: "She wore a warm winter coat trimmed with soft faux fur.",
      silentTrap: "Silent 'x' at the end (never write 'fo' or pronounce the /ks/)."
    },
    {
      word: 'rotisserie',
      phonetic: '/roʊˈtɪs.ər.i/',
      literalMeaning: "a cooking appliance with a rotating spit for roasting meat",
      frenchRule: "Double 's' preserves the unvoiced /s/ sound between vowels. Ends with French noun suffix '-erie'.",
      memoryHook: "Think: r-o-t-i-s-s-e-r-i-e. Single 't', double 's', and '-erie' at the end!",
      example: "Golden chickens roasted slowly on the market's outdoor rotisserie.",
      silentTrap: "Don't double the 't'; DO double the 's'!"
    },
    {
      word: 'bachelorette',
      phonetic: '/ˌbætʃ.ə.ləˈrɛt/',
      literalMeaning: "an unmarried woman, or a bridal party",
      frenchRule: "Uses the French feminine diminutive suffix '-ette' (meaning small or feminine). Double 't' + silent 'e'.",
      memoryHook: "bachelor + -ette = b-a-c-h-e-l-o-r-e-t-t-e.",
      example: "The bridal party organized an outdoor brunch for the bachelorette weekend.",
      silentTrap: "Contains double 't' followed by silent 'e'."
    }
  ];

  const GREEK_WORDS_DATA = {
    phil: [
      {
        word: 'philharmonic',
        breakdown: "phil (love) + harmonia (music agreement) + -ic",
        def: "Devoted to music; a symphony orchestra organization",
        rule: "'phil-' always starts with 'ph' making the /f/ sound, followed by 'i-l'.",
        spelling: "p-h-i-l-h-a-r-m-o-n-i-c"
      },
      {
        word: 'philosophy',
        breakdown: "phil (love) + sophia (wisdom)",
        def: "The love and pursuit of fundamental wisdom and knowledge",
        rule: "Two 'ph' digraphs! One in 'phil-' and one in '-soph-'.",
        spelling: "p-h-i-l-o-s-o-p-h-y"
      },
      {
        word: 'philanthropy',
        breakdown: "phil (love) + anthropos (humankind)",
        def: "Love of humankind expressed through generous charitable giving",
        rule: "'phil-' + 'anthro' + '-py'. Notice the 'th' from Greek anthropos.",
        spelling: "p-h-i-l-a-n-t-h-r-o-p-y"
      },
      {
        word: 'bibliophile',
        breakdown: "biblio (book) + phile (lover of)",
        def: "A person who loves, collects, and admires books",
        rule: "Here '-phile' acts as a suffix at the end of the word!",
        spelling: "b-i-b-l-i-o-p-h-i-l-e"
      }
    ],
    phobia: [
      {
        word: 'brontophobia',
        breakdown: "bronto (thunder) + phobia (irrational fear)",
        def: "An abnormal, intense fear of thunder and lightning storms",
        rule: "Greek 'bronto' + '-phobia'. Ends in p-h-o-b-i-a.",
        spelling: "b-r-o-n-t-o-p-h-o-b-i-a"
      },
      {
        word: 'claustrophobia',
        breakdown: "claustrum (enclosed space) + phobia (fear)",
        def: "Extreme fear of being in small, closed, or tight spaces",
        rule: "Latin root 'claustr' combined with Greek suffix '-phobia'.",
        spelling: "c-l-a-u-s-t-r-o-p-h-o-b-i-a"
      },
      {
        word: 'arachnophobia',
        breakdown: "arachne (spider) + phobia (fear)",
        def: "Extreme fear of spiders and arachnids",
        rule: "'ch' pronounced as /k/ from Greek Arachne + '-phobia'.",
        spelling: "a-r-a-c-h-n-o-p-h-o-b-i-a"
      },
      {
        word: 'hydrophobia',
        breakdown: "hydor (water) + phobia (fear)",
        def: "Extreme fear of water, historically associated with rabies",
        rule: "Root 'hydro-' (Greek for water) + '-phobia'.",
        spelling: "h-y-d-r-o-p-h-o-b-i-a"
      }
    ]
  };

  const handleExitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExitSubmitted(true);
    sound.playFanfare();
    confetti({ particleCount: 60, spread: 80 });
    if (onAwardTeamScore) onAwardTeamScore('B', 30);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* ========================================================================= */}
      {/* HERO BANNER: MEETING 3 MASTER LESSON ARCHITECTURE */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#560e51] via-[#75166f] to-[#9b2c98] text-white rounded-[32px] p-6 sm:p-8 md:p-10 border-4 border-[#78c222] shadow-[8px_8px_0px_0px_#560e51] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase font-mono bg-[#78c222] text-[#560e51] px-3.5 py-1 rounded-full border-2 border-white shadow-sm">
              Championship Comprehensive Master Class 🐝
            </span>
            <span className="text-xs font-black uppercase font-mono bg-white/20 text-white px-3 py-1 rounded-full border border-white/40">
              90-Minute Scripps Two-Bee Syllabus
            </span>
            <span className="text-xs font-black uppercase font-mono bg-amber-400 text-stone-950 px-3 py-1 rounded-full border border-amber-300">
              With Foundational Anchor Warm-Ups 🌉
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
            Leveling Up: Two-Bee Words & Global Origins
          </h2>

          <p className="text-sm sm:text-base text-fuchsia-100 font-bold leading-relaxed">
            Welcome to the deep-dive instructional module for the <strong>Championship Master Class</strong>. We begin with a high-energy retrieval warm-up bridging your <strong>foundational orthographic anchors</strong> (<em>dis-, tele-, -ous, silent letters, and double consonants</em>), and then unpack the complete Two-Bee curriculum: <strong>French loanwords with accents and silent endings</strong>, <strong>Greek roots (phil- & -phobia)</strong>, and <strong>125 Scripps championship words</strong>!
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => {
                setCurrentSection('m2-warmup');
                sound.playClick();
              }}
              className="px-5 py-2.5 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase tracking-wide rounded-xl border-2 border-white shadow-[2px_2px_0px_0px_white] cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="h-4 w-4" /> Start Foundational Warm-Up Bridge (10 min)
            </button>
            <button
              onClick={() => {
                setCurrentSection('french-mastery');
                sound.playClick();
              }}
              className="px-5 py-2.5 bg-white hover:bg-fuchsia-50 text-[#560e51] font-black text-xs uppercase tracking-wide rounded-xl border-2 border-white shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="h-4 w-4 text-[#9b2c98]" /> French Loanwords Lab
            </button>
            <button
              onClick={() => {
                setCurrentSection('greek-roots');
                sound.playClick();
              }}
              className="px-5 py-2.5 bg-fuchsia-900/80 hover:bg-fuchsia-900 text-white font-black text-xs uppercase tracking-wide rounded-xl border-2 border-fuchsia-400 cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="h-4 w-4 text-[#78c222]" /> Greek Roots: Phil- & -Phobia
            </button>
            {onNavigateTab && (
              <button
                onClick={() => {
                  onNavigateTab('homophones');
                  sound.playClick();
                }}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wide rounded-xl border-2 border-white shadow-[2px_2px_0px_0px_white] cursor-pointer flex items-center gap-1.5"
              >
                <Scale className="h-4 w-4 text-[#560e51]" /> Stage Homophone Arena ⚖️
              </button>
            )}
          </div>
        </div>

        {/* Decorative Badge */}
        <div className="hidden lg:block absolute -right-6 -bottom-8 opacity-20 pointer-events-none text-[220px]">
          🐝
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LESSON NAVIGATION BAR */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-2.5 border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {[
            { id: 'overview', label: '1. Lesson Agenda & Goals', icon: Compass },
            { id: 'm2-warmup', label: '2. Foundational Warm-Up Bridge 🌉', icon: Zap },
            { id: 'french-mastery', label: '3. French Loanwords Spotlight 🥐', icon: Sparkles },
            { id: 'greek-roots', label: '4. Greek Roots (Phil- / -Phobia) 🏛️', icon: BookOpen },
            { id: 'latin-origins', label: '5. Latin & Distinguishing Origins 🏛️', icon: Globe },
            { id: 'two-bee-breakdown', label: '6. Two-Bee Target Breakdown 🎯', icon: Layers },
            { id: 'interactive-lab', label: '7. Audio Pronunciation Lab 🎧', icon: Volume2 },
            { id: 'exit-ticket', label: '8. Exit Ticket & Mastery Check 🎓', icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = currentSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentSection(tab.id as LessonSection);
                  sound.playClick();
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#560e51] text-[#78c222] shadow-[2px_2px_0px_0px_#78c222]'
                    : 'bg-[#fcf9f2] text-slate-700 hover:bg-fuchsia-100 hover:text-[#560e51]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: OVERVIEW & 90-MINUTE SYLLABUS */}
      {/* ========================================================================= */}
      {currentSection === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            <div className="border-b-2 border-fuchsia-100 pb-4">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                Scripps National Spelling Bee Classroom Curriculum
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                Championship Lesson Plan & Pedagogical Roadmap 📋
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                Grade Level: 3–6 • Session Duration: 90 Minutes • Difficulty: Advanced "Two-Bee"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#fcf8ed] border-2 border-[#560e51] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#560e51] space-y-2">
                <div className="flex items-center gap-2 text-amber-700">
                  <Clock className="h-5 w-5" />
                  <span className="text-xs font-mono font-black uppercase">Part 1 (00–15 min)</span>
                </div>
                <h4 className="text-base font-black text-[#560e51] uppercase">Foundational Anchor Warm-Up</h4>
                <p className="text-xs text-slate-700 font-medium">
                  Review baseline patterns (<em>guardian, telepathic, disembark, harmonious, flannel</em>) and connect them to Two-Bee challenges.
                </p>
              </div>

              <div className="bg-[#fbf2fc] border-2 border-[#560e51] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#560e51] space-y-2">
                <div className="flex items-center gap-2 text-[#9b2c98]">
                  <Sparkles className="h-5 w-5" />
                  <span className="text-xs font-mono font-black uppercase">Part 2 & 3 (15–50 min)</span>
                </div>
                <h4 className="text-base font-black text-[#560e51] uppercase">Deep Pattern Instruction</h4>
                <p className="text-xs text-slate-700 font-medium">
                  Direct instruction on French loanwords with diacritical marks and silent terminations (<em>soirée, duvet, faux, rotisserie</em>) and Greek morphology (<em>phil-, -phobia</em>).
                </p>
              </div>

              <div className="bg-[#f0f9e8] border-2 border-[#560e51] rounded-2xl p-5 shadow-[3px_3px_0px_0px_#560e51] space-y-2">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Award className="h-5 w-5" />
                  <span className="text-xs font-mono font-black uppercase">Part 4 & 5 (50–90 min)</span>
                </div>
                <h4 className="text-base font-black text-[#560e51] uppercase">Stations & Stage Simulation</h4>
                <p className="text-xs text-slate-700 font-medium">
                  Rotation across partner dictation, digital canvas audio stations, Wordwall 30 Mystery Boxes (16–30), and the official Scripps stage simulator.
                </p>
              </div>
            </div>

            {/* Essential Learning Questions */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-black uppercase font-mono text-amber-900 tracking-wider flex items-center gap-1.5">
                <Lightbulb className="h-4 w-4 text-amber-600" /> Essential Questions for Spellers:
              </h4>
              <ul className="text-xs font-bold text-slate-800 space-y-2 list-disc list-inside">
                <li>Why do words borrowed from French preserve letters that are never pronounced in modern English?</li>
                <li>How can knowing Greek roots like <em>phil-</em> (love) and <em>-phobia</em> (fear) help you spell unfamiliar science and literary words without memorizing them letter-by-letter?</li>
                <li>What is the orthographic distinction between <em>personal</em> (individual) and <em>personnel</em> (staff)?</li>
              </ul>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setCurrentSection('m2-warmup');
                  sound.playClick();
                }}
                className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer flex items-center gap-2"
              >
                <span>Proceed to Foundational Warm-Up Bridge</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: FOUNDATIONAL WARM-UP BRIDGE */}
      {/* ========================================================================= */}
      {currentSection === 'm2-warmup' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-fuchsia-100 pb-4">
              <div>
                <span className="text-xs font-mono font-black uppercase text-amber-600 flex items-center gap-1">
                  <Zap className="h-4 w-4" /> Retrieval Practice · Foundational Warm-Up
                </span>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mt-1">
                  The Foundational Pattern Bridge 🌉
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                  Before tackling Two-Bee words, test yourself on the 5 foundational orthographic anchors!
                </p>
              </div>

              <div className="bg-[#fdf2fe] px-4 py-2 rounded-2xl border-2 border-[#560e51] text-center shrink-0">
                <span className="text-[10px] font-mono font-black uppercase text-[#9b2c98] block">Warm-Up Score</span>
                <span className="text-xl font-mono font-black text-[#560e51]">
                  {warmupScore} / {FOUNDATIONAL_TO_CHAMPION_WARMUPS.length}
                </span>
              </div>
            </div>

            <div className="space-y-5">
              {FOUNDATIONAL_TO_CHAMPION_WARMUPS.map((item, idx) => {
                const selected = warmupAnswers[item.id];
                const feedback = warmupFeedback[item.id];

                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl border-2 border-[#560e51] bg-[#fffdfa] shadow-[3px_3px_0px_0px_#560e51] space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#560e51] text-white font-mono font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-serif font-black text-lg text-slate-950 uppercase tracking-wide">
                          {item.word}
                        </h4>
                        <button
                          onClick={() => humanVoice.speakWord(item.word)}
                          className="p-1.5 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 cursor-pointer"
                          title="Listen to word"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-300">
                        Origin: {item.origin}
                      </span>
                    </div>

                    {/* Comparative Bridge Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                        <span className="font-mono font-black text-amber-900 uppercase block text-[10px]">
                          Core Foundation Rule:
                        </span>
                        <p className="font-bold text-slate-700 mt-0.5">{item.meet2Rule}</p>
                      </div>
                      <div className="p-3 bg-fuchsia-50 rounded-xl border border-fuchsia-200">
                        <span className="font-mono font-black text-[#560e51] uppercase block text-[10px]">
                          Two-Bee Championship Bridge:
                        </span>
                        <p className="font-bold text-slate-700 mt-0.5">{item.meet3Bridge}</p>
                      </div>
                    </div>

                    {/* Question Prompt */}
                    <div className="pt-2">
                      <p className="text-xs font-black text-slate-900 mb-2">{item.testPrompt}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {item.options.map(opt => {
                          const isPicked = selected === opt;
                          const isCorrectOpt = opt === item.correct;
                          let btnStyle = 'bg-white hover:bg-fuchsia-50 text-slate-800 border-2 border-slate-300';

                          if (selected) {
                            if (isCorrectOpt) {
                              btnStyle = 'bg-emerald-600 text-white border-2 border-emerald-700 font-black';
                            } else if (isPicked && !feedback) {
                              btnStyle = 'bg-rose-600 text-white border-2 border-rose-700 line-through';
                            } else {
                              btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={opt}
                              disabled={!!selected}
                              onClick={() => handleAnswerWarmup(item.id, opt, item.correct)}
                              className={`p-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>

                      {feedback === true && (
                        <p className="text-xs font-bold text-emerald-700 mt-2 flex items-center gap-1 animate-fadeIn">
                          <CheckCircle2 className="h-4 w-4" /> Correct! You've locked in this foundation (+10 pts)
                        </p>
                      )}
                      {feedback === false && (
                        <p className="text-xs font-bold text-rose-700 mt-2 flex items-center gap-1 animate-fadeIn">
                          <XCircle className="h-4 w-4" /> Not quite! The correct anchor is <strong>{item.correct}</strong>.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-fuchsia-100">
              <span className="text-xs font-bold text-slate-600 font-mono">
                Warm-up complete! You are primed to master French Loanwords and Greek Morphology.
              </span>
              <button
                onClick={() => {
                  setCurrentSection('french-mastery');
                  sound.playClick();
                }}
                className="px-6 py-3 bg-[#560e51] hover:bg-[#430a3f] text-[#78c222] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#78c222] cursor-pointer flex items-center gap-2"
              >
                <span>Move to French Loanwords Spotlight</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: FRENCH LOANWORDS SPOTLIGHT */}
      {/* ========================================================================= */}
      {currentSection === 'french-mastery' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            <div className="border-b-2 border-fuchsia-100 pb-4">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98] flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-[#78c222]" /> Championship Focus Area 1: French Loanwords
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                French Loanwords: Accents & Silent Terminations 🥐
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                English borrowed thousands of words from French following the Norman Conquest of 1066. In the Scripps Bee, French loanwords are legendary traps because they keep their silent final consonants (<em>t, x</em>) and acute accent marks (<em>é</em>).
              </p>
            </div>

            {/* Word Selection Tabs */}
            <div className="flex flex-wrap gap-2">
              {FRENCH_WORDS_DATA.map(item => (
                <button
                  key={item.word}
                  onClick={() => {
                    setSelectedFrenchWord(item.word);
                    sound.playClick();
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-black uppercase transition-all cursor-pointer ${
                    selectedFrenchWord === item.word
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-white border-2 border-slate-300 text-slate-700 hover:border-[#560e51]'
                  }`}
                >
                  {item.word}
                </button>
              ))}
            </div>

            {/* Spotlight Interactive Card */}
            {(() => {
              const activeData = FRENCH_WORDS_DATA.find(x => x.word === selectedFrenchWord) || FRENCH_WORDS_DATA[0];

              return (
                <div className="bg-[#fcf8fa] rounded-2xl border-3 border-[#560e51] p-6 shadow-[4px_4px_0px_0px_#560e51] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-fuchsia-200 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-black text-3xl sm:text-4xl text-[#560e51] tracking-wider uppercase">
                        {activeData.word}
                      </span>
                      <span className="text-xs font-mono bg-purple-100 text-purple-900 px-3 py-1 rounded-full border border-purple-300">
                        {activeData.phonetic}
                      </span>
                    </div>

                    <button
                      onClick={() => humanVoice.speakWord(activeData.word)}
                      className="px-4 py-2 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] rounded-xl text-xs font-black uppercase flex items-center gap-1.5 cursor-pointer border-2 border-[#560e51]"
                    >
                      <Volume2 className="h-4 w-4" /> Listen to Pronunciation
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="bg-white p-4 rounded-xl border-2 border-[#560e51]/20 space-y-1">
                      <span className="font-mono font-black text-[#9b2c98] uppercase text-[10px] block">
                        Definition & Meaning:
                      </span>
                      <p className="font-bold text-slate-900 text-sm">{activeData.literalMeaning}</p>
                      <p className="italic text-slate-600 mt-2 font-medium">"{activeData.example}"</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border-2 border-[#560e51]/20 space-y-1">
                      <span className="font-mono font-black text-rose-800 uppercase text-[10px] block">
                        The Scripps Trap to Avoid:
                      </span>
                      <p className="font-bold text-rose-950">{activeData.silentTrap}</p>
                      <p className="font-bold text-slate-700 mt-2">{activeData.frenchRule}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-300 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase text-amber-900 block">
                        Champion Memory Hook 💡
                      </span>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">{activeData.memoryHook}</p>
                    </div>
                    <span className="text-2xl">🧠</span>
                  </div>
                </div>
              );
            })()}

            {/* Quick Practice Rule Checker */}
            <div className="bg-fuchsia-50 border-2 border-[#560e51] rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-black uppercase font-mono text-[#560e51] tracking-wider">
                French Orthography Rules Cheat Sheet:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-fuchsia-200">
                  <strong className="block text-[#560e51] font-mono">1. Accent Aigu (é)</strong>
                  <p className="text-slate-600 text-[11px] mt-1 font-medium">
                    Pronounced /eɪ/. Words like <em>soirée</em> require this acute accent mark to be correct in Scripps bees.
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-fuchsia-200">
                  <strong className="block text-[#560e51] font-mono">2. Silent '-et' and '-x'</strong>
                  <p className="text-slate-600 text-[11px] mt-1 font-medium">
                    <em>Duvet</em> ends in silent 't' (/duːˈveɪ/); <em>faux</em> ends in silent 'x' (/foʊ/).
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-fuchsia-200">
                  <strong className="block text-[#560e51] font-mono">3. Suffix '-erie' & '-ette'</strong>
                  <p className="text-slate-600 text-[11px] mt-1 font-medium">
                    <em>Rotisserie</em> ends with '-erie'; <em>bachelorette</em> ends with feminine diminutive '-ette'.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  setCurrentSection('m2-warmup');
                  sound.playClick();
                }}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs uppercase rounded-xl cursor-pointer"
              >
                Back to Warm-Up
              </button>
              <button
                onClick={() => {
                  setCurrentSection('greek-roots');
                  sound.playClick();
                }}
                className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer flex items-center gap-2"
              >
                <span>Next: Greek Roots (Phil- & -Phobia)</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: GREEK ROOTS (PHIL- & -PHOBIA) */}
      {/* ========================================================================= */}
      {currentSection === 'greek-roots' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            <div className="border-b-2 border-fuchsia-100 pb-4">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98] flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-[#78c222]" /> Championship Focus Area 2: Greek Morphology
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                Greek Roots: Love (PHIL-) vs. Fear (-PHOBIA) 🏛️
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                Having reviewed <em>tele-</em> (far), we now explore two opposing Greek power roots: <strong>PHIL-</strong> (devotion/friendship) and <strong>-PHOBIA</strong> (extreme fear). Greek roots universally use <strong>'ph'</strong> for the /f/ sound!
              </p>
            </div>

            {/* Root Selector Toggle */}
            <div className="flex items-center gap-3 bg-[#fdf2fe] p-1.5 rounded-2xl border-2 border-[#560e51] w-fit">
              <button
                onClick={() => {
                  setSelectedRoot('phil');
                  sound.playClick();
                }}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all cursor-pointer ${
                  selectedRoot === 'phil'
                    ? 'bg-[#78c222] text-[#560e51] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Root 1: PHIL- (Love / Devotion) ❤️
              </button>
              <button
                onClick={() => {
                  setSelectedRoot('phobia');
                  sound.playClick();
                }}
                className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wide transition-all cursor-pointer ${
                  selectedRoot === 'phobia'
                    ? 'bg-[#9b2c98] text-white border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                Root 2: -PHOBIA (Extreme Fear) ⚡
              </button>
            </div>

            {/* Root Word Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GREEK_WORDS_DATA[selectedRoot].map(item => (
                <div
                  key={item.word}
                  className="bg-[#fffdfa] p-5 rounded-2xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-fuchsia-100 pb-2">
                    <h4 className="font-serif font-black text-xl text-[#560e51] uppercase tracking-wider">
                      {item.word}
                    </h4>
                    <button
                      onClick={() => humanVoice.speakWord(item.word)}
                      className="p-1.5 rounded-lg bg-[#78c222]/20 hover:bg-[#78c222]/40 text-[#560e51] border border-[#78c222] cursor-pointer"
                      title="Pronounce"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-black text-amber-800 uppercase text-[10px]">Morphology:</span>
                      <span className="font-mono font-bold text-slate-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {item.breakdown}
                      </span>
                    </div>

                    <div>
                      <span className="font-mono font-black text-slate-500 uppercase text-[10px] block">Definition:</span>
                      <p className="font-bold text-slate-800 mt-0.5">{item.def}</p>
                    </div>

                    <div className="p-2.5 bg-fuchsia-50 rounded-xl border border-fuchsia-200">
                      <span className="font-mono font-black text-[#9b2c98] uppercase text-[10px] block">
                        Orthographic Rule:
                      </span>
                      <p className="text-[11px] font-bold text-[#560e51] mt-0.5">{item.rule}</p>
                    </div>

                    <div className="pt-1">
                      <span className="text-[10px] font-mono font-black text-slate-400 uppercase">Letter Breakdown: </span>
                      <span className="font-mono font-black text-slate-900 tracking-widest uppercase">
                        {item.spelling}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Morphology Pro Tip */}
            <div className="bg-[#18110b] text-white p-5 rounded-2xl border-2 border-amber-400 space-y-2">
              <span className="text-xs font-mono font-black uppercase text-amber-400 flex items-center gap-1.5">
                <Lightbulb className="h-4 w-4" /> The Pronouncer Request Strategy:
              </span>
              <p className="text-xs text-amber-100 font-medium leading-relaxed">
                When you stand before the judges and hear a word like <em>"brontophobia"</em> or <em>"philharmonic"</em>, always ask:
                <strong className="text-amber-300"> "Could you please give me the language of origin?"</strong> Once the pronouncer replies <span className="underline">"This word comes from Greek,"</span> you immediately know:
                1) The /f/ sound is spelled with <strong>'ph'</strong>; 2) The /k/ sound in -ic is spelled with a single <strong>'c'</strong>!
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  setCurrentSection('french-mastery');
                  sound.playClick();
                }}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs uppercase rounded-xl cursor-pointer"
              >
                Back to French Loanwords
              </button>
              <button
                onClick={() => {
                  setCurrentSection('latin-origins');
                  sound.playClick();
                }}
                className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer flex items-center gap-2"
              >
                <span>Next: Latin & Distinguishing Origins</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: LATIN & DISTINGUISHING LANGUAGE ORIGINS (COMPREHENSIVE)        */}
      {/* ========================================================================= */}
      {currentSection === 'latin-origins' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            
            <div className="border-b-2 border-fuchsia-100 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-black uppercase text-[#9b2c98] bg-fuchsia-50 px-3 py-1 rounded-full border border-fuchsia-200">
                  Scripps Etymology Secret Weapon
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                  How to Distinguish Words by Origin 🏛️🥐🏺🥨🎻
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1 max-w-3xl">
                  Asking <strong>"What is the language of origin?"</strong> is the single most powerful tool on the Scripps stage. Compare how each language spells sounds and prefixes:
                </p>
              </div>

              {onNavigateTab && (
                <button
                  onClick={() => {
                    onNavigateTab('origin-detective');
                    sound.playClick();
                  }}
                  className="px-4 py-2 bg-[#78c222] text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Open Interactive Origin Lab</span>
                </button>
              )}
            </div>

            {/* Quick Origin Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* LATIN */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border-3 border-amber-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-amber-950 uppercase flex items-center gap-1.5">
                    🏛️ Latin
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded">
                    60%+ of Bee Words
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700">
                  <strong>Key Footprints:</strong> Assimilated prefixes (ad- ➔ ac-, ap-, at-), endings in <em>-um</em> (curriculum, millennium, aquarium), <em>-us</em> (status, consensus), <em>-ible vs -able</em>, and agent suffix <em>-or</em> (gladiator, spectator).
                </p>
                <div className="p-2 bg-white rounded-xl border border-amber-300 text-[11px] font-mono text-amber-950 font-bold">
                  aqueduct · curriculum · millennium · benevolent
                </div>
              </div>

              {/* FRENCH */}
              <div className="p-5 rounded-2xl bg-blue-50/70 border-3 border-blue-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-blue-950 uppercase flex items-center gap-1.5">
                    🥐 French
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-blue-200 text-blue-900 px-2 py-0.5 rounded">
                    Silent Ends & Elegance
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700">
                  <strong>Key Footprints:</strong> Silent ending consonants (duvet, faux, debris, bouquet), trigraph <em>-eau</em> = /oʊ/ (plateau, bureau), <em>ch</em> = /ʃ/ (chauffeur, chiffon), <em>-ette</em>, <em>-eur</em>, <em>-age</em> = /ɑːʒ/.
                </p>
                <div className="p-2 bg-white rounded-xl border border-blue-300 text-[11px] font-mono text-blue-950 font-bold">
                  silhouette · chauffeur · plateau · rendezvous
                </div>
              </div>

              {/* GREEK */}
              <div className="p-5 rounded-2xl bg-emerald-50/70 border-3 border-emerald-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-emerald-950 uppercase flex items-center gap-1.5">
                    🏺 Greek
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                    Science & Philosophy
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700">
                  <strong>Key Footprints:</strong> <em>ph</em> = /f/ (amphibian, philosophy), <em>ch</em> = /k/ (chaos, echo, chorus), medial <em>y</em> = /ɪ/ (rhythm, crystal), silent <em>ps-, pn-, pt-</em> (pterodactyl), roots <em>phil-</em> and <em>-phobia</em>.
                </p>
                <div className="p-2 bg-white rounded-xl border border-emerald-300 text-[11px] font-mono text-emerald-950 font-bold">
                  amphibian · metamorphosis · kaleidoscope · rhythm
                </div>
              </div>

              {/* GERMAN */}
              <div className="p-5 rounded-2xl bg-orange-50/70 border-3 border-orange-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-orange-950 uppercase flex items-center gap-1.5">
                    🥨 German
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-orange-200 text-orange-900 px-2 py-0.5 rounded">
                    Heavy Consonants
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700">
                  <strong>Key Footprints:</strong> Heavy clusters: <em>sch</em> (schnauzer, schadenfreude), <em>tz</em> (pretzel, blitz), <em>kn</em> (knapsack), compound fusions (kindergarten, wanderlust), <em>ei</em> = /aɪ/ (edelweiss, zeitgeist).
                </p>
                <div className="p-2 bg-white rounded-xl border border-orange-300 text-[11px] font-mono text-orange-950 font-bold">
                  kindergarten · dachshund · edelweiss · gesundheit
                </div>
              </div>

              {/* ITALIAN */}
              <div className="p-5 rounded-2xl bg-rose-50/70 border-3 border-rose-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-rose-950 uppercase flex items-center gap-1.5">
                    🎻 Italian
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-rose-200 text-rose-900 px-2 py-0.5 rounded">
                    Music & Vowels
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700">
                  <strong>Key Footprints:</strong> Almost always ends in a vowel (-o, -a, -i, -e), double consonants (<em>zz</em> in mezzanine/piazza, <em>cc</em> in cappuccino), <em>cch</em> = /k/ (zucchini), musical terms (virtuoso, staccato).
                </p>
                <div className="p-2 bg-white rounded-xl border border-rose-300 text-[11px] font-mono text-rose-950 font-bold">
                  virtuoso · mezzanine · zucchini · cappuccino
                </div>
              </div>

              {/* SPANISH */}
              <div className="p-5 rounded-2xl bg-red-50/70 border-3 border-red-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-red-950 uppercase flex items-center gap-1.5">
                    🌮 Spanish
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-red-200 text-red-900 px-2 py-0.5 rounded">
                    Diminutives -illo/-illa
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700">
                  <strong>Key Footprints:</strong> Diminutive suffixes: <em>-illo</em> and <em>-illa</em> (guerrilla, armadillo, tortilla), ending in -o/-a, <em>gue-</em> for hard /g/. Solves homophones like guerrilla vs gorilla!
                </p>
                <div className="p-2 bg-white rounded-xl border border-red-300 text-[11px] font-mono text-red-950 font-bold">
                  guerrilla · aficionado · embargo · vigilante
                </div>
              </div>

            </div>

            {/* Homophone Origin Connection Box */}
            <div className="p-5 rounded-2xl bg-[#fefaf0] border-3 border-[#560e51] space-y-3">
              <h4 className="text-base font-black uppercase text-[#560e51] flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                How Origin Disarms Deadly Homophone Traps (Scripps Rule 4):
              </h4>
              <p className="text-xs font-bold text-slate-700">
                When you hear a sound like <strong>/ɡəˈrɪl.ə/</strong> or <strong>/ˈkɑːm.plə.mənt/</strong>, spelling from sound alone is a 50/50 gamble. Look how origin gives you 100% accuracy:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono font-bold">
                <div className="p-3 bg-white rounded-xl border border-stone-300 space-y-1">
                  <p className="text-purple-900"><strong>/ɡəˈrɪl.ə/</strong></p>
                  <p className="text-slate-700">If Origin = Spanish (warfare) ➔ <strong>g-u-e-r-r-i-l-l-a</strong></p>
                  <p className="text-slate-700">If Origin = Greek (great ape) ➔ <strong>g-o-r-i-l-l-a</strong></p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-stone-300 space-y-1">
                  <p className="text-purple-900"><strong>/ˈkɑːm.plə.mənt/</strong></p>
                  <p className="text-slate-700">If Origin = Latin (completes) ➔ <strong>c-o-m-p-l-e-m-e-n-t</strong></p>
                  <p className="text-slate-700">If Origin = French (praise) ➔ <strong>c-o-m-p-l-i-m-e-n-t</strong></p>
                </div>
              </div>
            </div>

            {/* Bottom Step Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-fuchsia-100">
              <button
                onClick={() => {
                  setCurrentSection('greek-roots');
                  sound.playClick();
                }}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs uppercase rounded-xl cursor-pointer"
              >
                Back to Greek Roots
              </button>
              <button
                onClick={() => {
                  setCurrentSection('two-bee-breakdown');
                  sound.playClick();
                }}
                className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer flex items-center gap-2"
              >
                <span>Next: Two-Bee Word Target List (125 Words)</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: TWO-BEE WORD TARGET BREAKDOWN (125 GRAND CHAMPIONS WORDS)     */}
      {/* ========================================================================= */}
      {currentSection === 'two-bee-breakdown' && (() => {
        // Categorized arrays for the 125 Two-Bee words
        const frenchWords = [
          'soirée', 'duvet', 'faux', 'rotisserie', 'fondant', 'bachelorette', 'legionnaire',
          'croissant', 'boutique', 'ballet', 'chalet', 'bouquet', 'bureau', 'souvenir',
          'parfait', 'château', 'renaissance', 'silhouette', 'millionaire', 'connoisseur',
          'reservoir', 'champagne', 'croquet'
        ];

        const greekWords = [
          'philharmonic', 'brontophobia', 'choreographer', 'sophomoric', 'hexagonal', 'epilepsy',
          'ceramics', 'mimetic', 'petrifying', 'seismologist', 'apogee', 'dramaturgy', 'phonics',
          'calisthenics', 'philosophy', 'philanthropy', 'bibliophile', 'claustrophobia',
          'arachnophobia', 'hydrophobia', 'acrophobia', 'kaleidoscope', 'microscope', 'telescope',
          'symphony', 'amphitheater', 'chameleon', 'pterodactyl', 'rhododendron', 'photosynthesis',
          'chlorophyll', 'metamorphosis', 'echinoderm'
        ];

        const consonantWords = [
          'personnel', 'palliative', 'commerce', 'innovator', 'hallowed', 'perseverance',
          'unctuous', 'abhorrence', 'alacrity', 'bursary', 'exoneration', 'platitude',
          'decrepitude', 'seethe', 'resilience', 'brilliance', 'radiance', 'diligence',
          'coincidence', 'courageous', 'mountainous', 'ferocious', 'illustrate', 'millennium',
          'accommodate', 'possession', 'unabated', 'interlocutor'
        ];

        const scienceWords = [
          'fluoride', 'hydrangea', 'subcutaneous', 'leguminous', 'genus', 'freesia',
          'herbaceous', 'murmuration', 'citronella', 'torrent', 'buoyancy', 'nebulous',
          'specimen', 'salubrious', 'dandelion', 'curiosity', 'trajectory', 'beneficial'
        ];

        const globalWords = [
          'pachinko', 'machete', 'cupola', 'origami', 'karaoke', 'tsunami', 'safari',
          'avocado', 'guacamole', 'chocolate', 'barbeque', 'canyon', 'tornado', 'armadillo',
          'turpitude', 'nobiliary', 'banal', 'hiatus', 'vexatious', 'sophisticated',
          'dulcet', 'magnificent'
        ];

        // Filter by cluster
        let currentList = MEETING_3_FULL_61_WORDS;
        if (wordClusterFilter === 'french') currentList = frenchWords;
        else if (wordClusterFilter === 'greek') currentList = greekWords;
        else if (wordClusterFilter === 'consonants') currentList = consonantWords;
        else if (wordClusterFilter === 'science') currentList = scienceWords;
        else if (wordClusterFilter === 'global') currentList = globalWords;

        // Filter by search query
        const filteredList = currentList.filter(w => {
          if (!wordSearch.trim()) return true;
          const query = wordSearch.toLowerCase();
          const def = ALL_WORDS_MAP[w]?.def.toLowerCase() || '';
          return w.toLowerCase().includes(query) || def.includes(query);
        });

        const activeSpotlight = ALL_WORDS_MAP[spotlightWord] || {
          def: 'Official Scripps Words of the Champions Two-Bee Word',
          ex: `The speller spelled ${spotlightWord} with confidence.`,
          syll: spotlightWord,
          orig: 'English',
          pattern: 'Advanced Two-Bee Orthography'
        };

        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
              
              {/* Header */}
              <div className="border-b-2 border-fuchsia-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-black uppercase text-[#9b2c98] flex items-center gap-1">
                    <Layers className="h-4 w-4 text-[#78c222]" /> Expanded Two-Bee Curriculum
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1 flex items-center gap-2">
                    <span>The Grand Two-Bee 125-Word Arsenal</span>
                    <span className="text-xs font-mono bg-[#78c222] text-[#560e51] px-2.5 py-1 rounded-full border border-[#560e51] font-black">
                      {MEETING_3_FULL_61_WORDS.length} Words Total
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                    Carefully curated and pattern-aligned for grades 3–6. Every word maps directly to French loanword phonology, Greek morphology, and high-level Scripps orthography.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('word-study')}
                    className="px-4 py-2 bg-[#9b2c98] hover:bg-[#852282] text-white rounded-xl text-xs font-black uppercase tracking-wider border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
                  >
                    Open Flashcard Deck 📖
                  </button>
                </div>
              </div>

              {/* Filter Tabs & Search Controls */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#fdf2fe] p-3 rounded-2xl border-2 border-[#560e51]">
                
                {/* Cluster Category Tabs */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { id: 'all', label: `All (${MEETING_3_FULL_61_WORDS.length})` },
                    { id: 'french', label: `🥐 French (${frenchWords.length})` },
                    { id: 'greek', label: `🏛️ Greek (${greekWords.length})` },
                    { id: 'consonants', label: `🔤 Consonants (${consonantWords.length})` },
                    { id: 'science', label: `🔬 Science (${scienceWords.length})` },
                    { id: 'global', label: `🌍 Global (${globalWords.length})` }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setWordClusterFilter(tab.id as any);
                        sound.playClick();
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                        wordClusterFilter === tab.id
                          ? 'bg-[#560e51] text-[#78c222] shadow-[2px_2px_0px_0px_#78c222]'
                          : 'bg-white text-slate-700 hover:bg-fuchsia-100 hover:text-[#560e51] border border-fuchsia-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Instant Search Bar */}
                <div className="relative min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={wordSearch}
                    onChange={(e) => setWordSearch(e.target.value)}
                    placeholder="Search 125 words..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs font-bold bg-white rounded-xl border-2 border-[#560e51] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#9b2c98]"
                  />
                </div>
              </div>

              {/* Word Chips Grid */}
              <div className="p-4 bg-[#fcf9f2] rounded-2xl border-2 border-[#560e51] max-h-[380px] overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {filteredList.map((w) => {
                    const isSelected = spotlightWord.toLowerCase() === w.toLowerCase();
                    return (
                      <button
                        key={w}
                        onClick={() => {
                          setSpotlightWord(w);
                          humanVoice.speakWord(w);
                          sound.playLetterKey();
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border flex items-center gap-1.5 shadow-xs ${
                          isSelected
                            ? 'bg-[#560e51] text-[#78c222] border-[#560e51] ring-2 ring-[#78c222] scale-105'
                            : 'bg-white hover:bg-[#78c222] hover:text-[#560e51] text-slate-800 border-slate-300'
                        }`}
                        title={ALL_WORDS_MAP[w]?.def}
                      >
                        <Volume2 className={`h-3 w-3 ${isSelected ? 'text-[#78c222]' : 'text-slate-400'}`} />
                        <span>{w}</span>
                      </button>
                    );
                  })}
                  {filteredList.length === 0 && (
                    <div className="w-full text-center py-6 text-xs font-bold text-slate-500">
                      No words match "{wordSearch}". Try clearing your search!
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive Word Spotlight Drawer */}
              {spotlightWord && (
                <div className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#fbf5fd] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-fuchsia-200 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black font-mono text-[#560e51] uppercase tracking-wide">
                        {spotlightWord}
                      </span>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 bg-fuchsia-200 text-fuchsia-900 rounded-md">
                        {activeSpotlight.syll || spotlightWord}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => humanVoice.speakWord(spotlightWord)}
                        className="px-3 py-1.5 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase rounded-xl border border-[#560e51] flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Volume2 className="h-3.5 w-3.5" /> Pronounce Word
                      </button>
                      <button
                        onClick={() => humanVoice.speakSentence(activeSpotlight.ex)}
                        className="px-3 py-1.5 bg-white hover:bg-slate-100 text-[#560e51] font-bold text-xs uppercase rounded-xl border border-[#560e51] flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        Sample Sentence
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-fuchsia-200 space-y-1">
                      <span className="font-mono font-black uppercase text-slate-500 text-[10px] block">
                        Definition
                      </span>
                      <p className="font-bold text-slate-800 leading-snug">{activeSpotlight.def}</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-fuchsia-200 space-y-1">
                      <span className="font-mono font-black uppercase text-slate-500 text-[10px] block">
                        Language of Origin & Etymology
                      </span>
                      <p className="font-black text-[#560e51]">{activeSpotlight.orig || 'Global English'}</p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-fuchsia-200 space-y-1">
                      <span className="font-mono font-black uppercase text-amber-700 text-[10px] block">
                        Tricky Spelling Pattern
                      </span>
                      <p className="font-bold text-slate-700">{activeSpotlight.pattern || 'Advanced Two-Bee orthography'}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs">
                    <span className="font-mono font-black uppercase text-amber-900 text-[10px] block mb-0.5">
                      Example in Sentence:
                    </span>
                    <p className="font-medium text-slate-800 italic">"{activeSpotlight.ex}"</p>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => {
                    setCurrentSection('greek-roots');
                    sound.playClick();
                  }}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs uppercase rounded-xl cursor-pointer"
                >
                  Back to Greek Roots
                </button>
                <button
                  onClick={() => {
                    setCurrentSection('interactive-lab');
                    sound.playClick();
                  }}
                  className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer flex items-center gap-2"
                >
                  <span>Next: Audio Pronunciation Lab</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ========================================================================= */}
      {/* SECTION 6: INTERACTIVE AUDIO PRONUNCIATION LAB */}
      {/* ========================================================================= */}
      {currentSection === 'interactive-lab' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            <div className="border-b-2 border-fuchsia-100 pb-4">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98] flex items-center gap-1">
                <Volume2 className="h-4 w-4 text-[#78c222]" /> Listening Lab & Auditory Training
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                The Dr. Jacques Bailly Audio Dictation Lab 🎧
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                Listen to the official Scripps pronouncer cadence. Click any word to hear it pronounced cleanly, review its syllable breakdown, and test your auditory spelling!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                'soirée', 'philharmonic', 'brontophobia', 'perseverance', 'buoyancy',
                'fluoride', 'personnel', 'duvet', 'rotisserie', 'antiquarian',
                'seismologist', 'decrepitude'
              ].map(w => {
                const info = ALL_WORDS_MAP[w] || { def: '', ex: '', syll: w, orig: 'English' };

                return (
                  <div
                    key={w}
                    className="p-4 rounded-2xl border-2 border-[#560e51] bg-[#fffdfa] shadow-[2px_2px_0px_0px_#560e51] flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-black text-lg text-slate-950 uppercase">{w}</span>
                        <button
                          onClick={() => humanVoice.speakWord(w)}
                          className="p-1.5 rounded-lg bg-[#78c222] text-[#560e51] hover:bg-[#68ab1c] border border-[#560e51] cursor-pointer"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-[11px] font-mono text-purple-700 block font-bold mt-0.5">
                        Syllables: {info.syll || w}
                      </span>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1 font-medium">{info.def}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-500">{info.orig}</span>
                      <button
                        onClick={() => humanVoice.speakWordTwice(w)}
                        className="text-[#9b2c98] hover:text-[#560e51] font-bold cursor-pointer"
                      >
                        Play 2x 🔁
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => {
                  setCurrentSection('two-bee-breakdown');
                  sound.playClick();
                }}
                className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black text-xs uppercase rounded-xl cursor-pointer"
              >
                Back to Target List
              </button>
              <button
                onClick={() => {
                  setCurrentSection('exit-ticket');
                  sound.playClick();
                }}
                className="px-6 py-3 bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase tracking-wider rounded-xl border-2 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] cursor-pointer flex items-center gap-2"
              >
                <span>Final Step: Exit Ticket</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 7: EXIT TICKET & MASTERY CERTIFICATION */}
      {/* ========================================================================= */}
      {currentSection === 'exit-ticket' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            <div className="border-b-2 border-fuchsia-100 pb-4">
              <span className="text-xs font-mono font-black uppercase text-amber-600 flex items-center gap-1">
                <Award className="h-4 w-4" /> Session Closure & Exit Ticket
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight mt-1">
                Championship Mastery Exit Ticket 🎓
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                Demonstrate your grasp of today's Two-Bee concepts and claim your <strong>Championship Master Speller Certificate</strong>!
              </p>
            </div>

            {!exitSubmitted ? (
              <form onSubmit={handleExitSubmit} className="space-y-5">
                {/* Q1: French Loanword */}
                <div className="p-5 rounded-2xl border-2 border-[#560e51] bg-[#fffdfa] shadow-[3px_3px_0px_0px_#560e51] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-xs text-[#560e51] uppercase">Question 1: French Accent Trap</span>
                    <button
                      type="button"
                      onClick={() => humanVoice.speakWord('soirée')}
                      className="text-xs font-mono text-[#9b2c98] flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Volume2 className="h-3.5 w-3.5" /> Listen
                    </button>
                  </div>
                  <label className="text-xs font-bold text-slate-800 block">
                    What French loanword keeps its acute accent (é) and describes an elegant evening reception or musical party?
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Type the word (e.g., soirée)..."
                    value={exitInputs.q1}
                    onChange={e => setExitInputs({ ...exitInputs, q1: e.target.value })}
                    className="w-full sm:w-80 px-4 py-2.5 bg-white border-2 border-[#560e51] rounded-xl text-sm font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#78c222]"
                  />
                </div>

                {/* Q2: Greek Root */}
                <div className="p-5 rounded-2xl border-2 border-[#560e51] bg-[#fffdfa] shadow-[3px_3px_0px_0px_#560e51] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-xs text-[#560e51] uppercase">Question 2: Greek Morphology</span>
                    <button
                      type="button"
                      onClick={() => humanVoice.speakWord('brontophobia')}
                      className="text-xs font-mono text-[#9b2c98] flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Volume2 className="h-3.5 w-3.5" /> Listen
                    </button>
                  </div>
                  <label className="text-xs font-bold text-slate-800 block">
                    Which Greek root suffix means "extreme or irrational fear" in words like <em>brontophobia</em> and <em>claustrophobia</em>?
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Type the root (e.g., -phobia)..."
                    value={exitInputs.q2}
                    onChange={e => setExitInputs({ ...exitInputs, q2: e.target.value })}
                    className="w-full sm:w-80 px-4 py-2.5 bg-white border-2 border-[#560e51] rounded-xl text-sm font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#78c222]"
                  />
                </div>

                {/* Q3: Double Consonant */}
                <div className="p-5 rounded-2xl border-2 border-[#560e51] bg-[#fffdfa] shadow-[3px_3px_0px_0px_#560e51] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-xs text-[#560e51] uppercase">Question 3: Two-Bee Consonant Rule</span>
                    <button
                      type="button"
                      onClick={() => humanVoice.speakWord('personnel')}
                      className="text-xs font-mono text-[#9b2c98] flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Volume2 className="h-3.5 w-3.5" /> Listen
                    </button>
                  </div>
                  <label className="text-xs font-bold text-slate-800 block">
                    How is the Two-Bee word for staff members or employees spelled (double 'n', single 'l')?
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Type the word (e.g., personnel)..."
                    value={exitInputs.q3}
                    onChange={e => setExitInputs({ ...exitInputs, q3: e.target.value })}
                    className="w-full sm:w-80 px-4 py-2.5 bg-white border-2 border-[#560e51] rounded-xl text-sm font-mono font-bold uppercase focus:outline-none focus:ring-2 focus:ring-[#78c222]"
                  />
                </div>

                <div className="flex justify-end pt-3">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-gradient-to-r from-[#78c222] to-[#68ab1c] text-[#560e51] font-black text-sm uppercase tracking-wider rounded-2xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] cursor-pointer flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5" /> Submit Exit Ticket & Claim Badge
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 text-center animate-fadeIn py-6">
                <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center mx-auto border-4 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51]">
                  <Trophy className="h-10 w-10 text-[#560e51]" />
                </div>

                <div className="max-w-md mx-auto space-y-2">
                  <span className="text-xs font-mono font-black uppercase text-[#78c222] bg-[#560e51] px-4 py-1.5 rounded-full inline-block">
                    CONGRATULATIONS SPELLER! 🌟
                  </span>
                  <h4 className="text-3xl font-black text-slate-950 uppercase tracking-tight">
                    National Two-Bee Champion Speller
                  </h4>
                  <p className="text-xs font-bold text-slate-600 leading-relaxed">
                    You have successfully completed the 90-minute Championship Deep Lesson, bridged all 5 foundational spelling concepts, and mastered French loanwords and Greek morphology!
                  </p>
                </div>

                <div className="bg-[#fcf9f2] p-5 rounded-2xl border-2 border-[#560e51] max-w-lg mx-auto text-left space-y-2 text-xs">
                  <span className="font-mono font-black text-[#9b2c98] uppercase block text-[10px]">Your Answers Verified:</span>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span>Q1 (French soirée):</span>
                    <strong className="font-mono text-emerald-700">{exitInputs.q1 || 'soirée'}</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span>Q2 (Greek -phobia):</span>
                    <strong className="font-mono text-emerald-700">{exitInputs.q2 || '-phobia'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Q3 (Personnel double 'n'):</span>
                    <strong className="font-mono text-emerald-700">{exitInputs.q3 || 'personnel'}</strong>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-3 pt-3">
                  <button
                    onClick={() => {
                      setExitSubmitted(false);
                      setExitInputs({ q1: '', q2: '', q3: '' });
                      setCurrentSection('overview');
                      sound.playClick();
                    }}
                    className="px-5 py-2.5 bg-white border-2 border-[#560e51] text-[#560e51] rounded-xl text-xs font-black uppercase cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5 inline mr-1" /> Retake Lesson
                  </button>
                  <button
                    onClick={() => onNavigateTab && onNavigateTab('mock-bee')}
                    className="px-6 py-2.5 bg-[#78c222] text-[#560e51] rounded-xl text-xs font-black uppercase tracking-wide border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer"
                  >
                    Take Championship Stage Simulator 🐝
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
