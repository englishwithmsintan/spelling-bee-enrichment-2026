// Type definitions for Spelling Bee Enrichment Session & English 1 National Spelling Bee Competition

export type MeetingSession = 'meeting-2' | 'meeting-3' | 'all';

export type WordListSource = 
  | 'ppt-study-rounds'
  | 'meeting-2-words-to-know'
  | 'meeting-2-practice-59'
  | 'meeting-3-words-to-know'
  | 'meeting-3-practice-61'
  | 'one-bee'
  | 'two-bee'
  | 'three-bee';

export type SpellingDifficulty = 'One-Bee' | 'Two-Bee' | 'Three-Bee' | 'Championship';
export type SpellingTopic = string;
export type FlashcardCategory = WordListSource;

export interface DreamHomeProjectData {
  homeName: string;
  homeType: string;
  style: string;
  location: string;
  materials: string[];
  adjectives: string[];
  specialFeatures: string[];
  rooms: {
    bedrooms: number;
    bathrooms: number;
    functionalRooms: string[];
  };
  landWidth: number;
  landLength: number;
  visitorImpression: string;
  whyLove: string;
}

export interface SATQuestion {
  id: string;
  part: number;
  type: string;
  prompt: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  points: number;
  contextAudio?: string;
  audioPrompt?: string;
  [key: string]: any;
}

export interface Flashcard {
  id: string;
  word: string;
  definition: string;
  partOfSpeech?: string;
  translation?: string;
  category: WordListSource;
  example: string;
  syllables?: string;
  phoneticHint?: string;
  languageOrigin?: string;
  trickyPattern?: string;
  lesson?: string;
  funFact?: string;
}

export type PatternCategory = 
  | 'silent-letters'
  | 'double-letters'
  | 'roots-affixes'
  | 'french-loanwords'
  | 'greek-latin';

export interface TrickyPattern {
  id: string;
  title: string;
  category: PatternCategory;
  rule: string;
  keyWord: string;
  keyWordExplanation: string;
  additionalExamples: string[];
  spotlightHint: string;
}

export interface DictationWord {
  id: string;
  word: string;
  definition: string;
  sentence: string;
  phoneticHint?: string;
  difficulty: 'Warm-Up' | 'Practice' | 'Progress-Check';
  trickyPart: string;
}

export interface BoxChallenge {
  boxNumber: number;
  id?: number;
  word: string;
  definition: string;
  sentence: string;
  hint: string;
  level: 'Medium' | 'Two-Bee' | 'Champion';
  points: number;
}

export interface StudentProgress {
  vocabReviewed: string[]; // List of word IDs reviewed
  patternAccuracy: { [key: string]: number }; // Pattern category -> %
  preTestScore: number | null; // Pre-test (Warm-up) out of 10
  postTestScore: number | null; // Post-test (Progress check) out of 10
  mockBeeScore: number | null;
  gamesPlayed: string[];
  unlockedBadges: string[];
  grammarAccuracy?: { [key: string]: number }; // Backward compat
  mockExamScore?: number | null; // Backward compat
  mockExamCompleted?: boolean;
  projectSaved?: boolean;
}

export interface ClassroomScores {
  teamA: number; // e.g. Honeybees / Spellbinders
  teamB: number; // e.g. Bumblebees / Wordmasters
  teamAName?: string;
  teamBName?: string;
}

export interface SpellingWord {
  id: string;
  word: string;
  topic: string;
  sentence: string;
  translation?: string;
  definition: string;
  syllables: string;
  difficulty: string;
  phoneticHint?: string;
  isFromOfficialList?: boolean;
  languageOrigin?: string;
}

export interface AuditionCandidate {
  id: string;
  name: string;
  classroom: string;
  score: number;
  totalTested: number;
  status: 'pending' | 'qualified' | 'eliminated';
  notes?: string;
  wordsHistory?: {
    word: string;
    isCorrect: boolean;
    timestamp: number;
  }[];
}

export interface Finalist {
  id: string;
  name: string;
  classroom: string;
  score: number;
  strikes: number;
  isEliminated: boolean;
  stageRank?: number;
  wordsHistory: {
    word: string;
    isCorrect: boolean;
  }[];
}

export interface MatchPair {
  id: string;
  pattern: string;
  word: string;
  sentence: string;
  explanation: string;
}

export interface HomophoneWord {
  word: string;
  partOfSpeech: string;
  definition: string;
  sentence: string;
  origin: string;
  memoryHook: string;
  spellingClue: string;
  syllables?: string;
  ipa?: string;
  alternatePronunciations?: string[];
}

export interface HomophonePair {
  id: string;
  soundIpa: string;
  category: 'Grade 3-6 Staples' | 'English 1 Stage Traps' | 'Scripps Two-Bee Traps' | 'Championship Finalists';
  targetWord: string; // The word the pronouncer has selected in the drill
  ruleTip: string; // English 1 Competition Homophone guidance
  words: HomophoneWord[];
}

export type LoanLanguage = 
  | 'French' 
  | 'German' 
  | 'Italian' 
  | 'Spanish' 
  | 'Japanese' 
  | 'Greek' 
  | 'Latin' 
  | 'Arabic' 
  | 'Hindi & Sanskrit' 
  | 'Other';

export interface LoanWord {
  id: string;
  word: string;
  language: LoanLanguage;
  languageOriginDetails: string;
  partOfSpeech: string;
  pronunciation: string;
  alternatePronunciations?: string[];
  definition: string;
  sentence: string;
  spellingTip: string;
  etymologyStory?: string;
  keyPattern?: string;
  difficulty: 'One-Bee' | 'Two-Bee' | 'Three-Bee' | 'Championship';
}

