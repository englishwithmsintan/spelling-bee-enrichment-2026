import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  OPEN_THE_BOX_30, 
  MEETING_2_WORDS_TO_KNOW, 
  MEETING_3_WORDS_TO_KNOW,
  MEETING_2_MOCK_BEE_WORDS,
  MEETING_3_MOCK_BEE_WORDS
} from '../data/reviewData';
import { COMPREHENSIVE_LOAN_WORDS } from '../data/loanWordsData';
import { ClassroomScores, BoxChallenge, MeetingSession } from '../types';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';
import {
  Gamepad2,
  Trophy,
  Users,
  RotateCcw,
  Sparkles,
  Volume2,
  CheckCircle2,
  XCircle,
  Zap,
  HelpCircle,
  Timer,
  ChevronRight,
  ChevronLeft,
  Shuffle,
  Eye,
  EyeOff,
  Flame,
  Globe,
  Scale,
  Award,
  Layers,
  Check,
  Printer,
  Search,
  BookOpen,
  ArrowRight,
  Mic,
  Star,
  Play,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface ClassroomGamesProps {
  teamScores: ClassroomScores;
  onUpdateScores?: (scores: ClassroomScores) => void;
  setTeamScores?: (scores: ClassroomScores) => void;
  onGamePlayed: (gameId: string) => void;
  genAlphaMode?: boolean;
  isTeacherMode?: boolean;
  activeMeeting?: MeetingSession;
}

export interface MeetingWordCard {
  id: string;
  word: string;
  origin: string;
  originCategory: 'latin' | 'french' | 'greek' | 'german' | 'italian' | 'spanish' | 'homophone' | 'general';
  flag: string;
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  sentence: string;
  spellingClue: string;
  syllables?: string;
  points: number;
  group: 'Group B (Gr. 3–4)' | 'Group C (Gr. 5–6)';
}

// Master list of 42 Word Cards specifically learned in this meeting
export const MEETING_LEARNED_CARDS: MeetingWordCard[] = [
  // ==========================================
  // LATIN WORDS LEARNED IN THIS MEETING
  // ==========================================
  {
    id: 'mc-aqueduct',
    word: 'aqueduct',
    origin: 'Latin (aquae ductus, "water conveyance")',
    originCategory: 'latin',
    flag: '🏛️',
    pronunciation: '/ˈæk.wə.dʌkt/ (AK-wuh-dukt)',
    partOfSpeech: 'noun',
    definition: 'An artificial channel or elevated bridge for conveying water over long distances.',
    sentence: 'The ancient Roman aqueduct spanned the river valley with towering stone arches.',
    spellingClue: 'Starts with "aque-" (with "e") from aqua + "duct" (ducere, to lead). Single c, single k.',
    syllables: 'aq-ue-duct',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-curriculum',
    word: 'curriculum',
    origin: 'Latin (curriculum, "a running, racecourse")',
    originCategory: 'latin',
    flag: '🏛️',
    pronunciation: '/kəˈrɪk.jə.ləm/ (kuh-RIK-yuh-luhm)',
    partOfSpeech: 'noun',
    definition: 'The subjects comprising a complete course of study in a school or college.',
    sentence: 'The teachers collaborated to design an advanced orthography curriculum.',
    spellingClue: 'Double r ("rr") from currere (to run) and ends in neuter suffix "-um".',
    syllables: 'cur-ric-u-lum',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-millennium',
    word: 'millennium',
    origin: 'Latin (mille, "thousand" + annus, "year")',
    originCategory: 'latin',
    flag: '🏛️',
    pronunciation: '/mɪˈlɛn.i.əm/ (mi-LEN-ee-uhm)',
    partOfSpeech: 'noun',
    definition: 'A period of one thousand years.',
    sentence: 'The dawn of the new millennium was celebrated with fireworks worldwide.',
    spellingClue: 'DOUBLE "l" ("ll") AND DOUBLE "n" ("nn")! Ends in "-um".',
    syllables: 'mil-len-ni-um',
    points: 25,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-memorandum',
    word: 'memorandum',
    origin: 'Latin (memorandum, "thing to be remembered")',
    originCategory: 'latin',
    flag: '🏛️',
    pronunciation: '/ˌmɛm.əˈræn.dəm/ (mem-uh-RAN-duhm)',
    partOfSpeech: 'noun',
    definition: 'A written note, record, or message in corporate or legal business.',
    sentence: 'The judge released an official memorandum clarifying the contest rules.',
    spellingClue: 'Ends in "-dum" (not -dam); spelled m-e-m-o-r-a-n-d-u-m.',
    syllables: 'mem-o-ran-dum',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-benevolent',
    word: 'benevolent',
    origin: 'Latin (bene, "well" + velle, "to wish")',
    originCategory: 'latin',
    flag: '🏛️',
    pronunciation: '/bəˈnɛv.ə.lənt/ (buh-NEV-uh-luhnt)',
    partOfSpeech: 'adjective',
    definition: 'Well-meaning and kindly; serving a charitable purpose.',
    sentence: 'The benevolent sponsor funded full college scholarships for the spellers.',
    spellingClue: 'Prefix "bene-" (good) + "-volent". Ends in "-ent", not "-ant".',
    syllables: 'be-nev-o-lent',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-omnipotent',
    word: 'omnipotent',
    origin: 'Latin (omnis, "all" + potens, "powerful")',
    originCategory: 'latin',
    flag: '🏛️',
    pronunciation: '/ɑːmˈnɪp.ə.tənt/ (ahm-NIP-uh-tuhnt)',
    partOfSpeech: 'adjective',
    definition: 'Having unlimited power; able to do anything; all-powerful.',
    sentence: 'In classical myths, Jupiter was revered as an omnipotent ruler of storms.',
    spellingClue: 'Prefix "omni-" (all) + "potent" (powerful). Single p, single t.',
    syllables: 'om-nip-o-tent',
    points: 20,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-gladiator',
    word: 'gladiator',
    origin: 'Latin (gladius, "sword")',
    originCategory: 'latin',
    flag: '🏛️',
    pronunciation: '/ˈɡlæd.i.eɪ.tər/ (GLAD-ee-ay-ter)',
    partOfSpeech: 'noun',
    definition: 'In ancient Rome, an armored fighter trained to combat in public arenas.',
    sentence: 'The gladiator stepped into the amphitheater sands as the crowd cheered.',
    spellingClue: 'Latin agent suffix "-or" (not -er). Root gladius (sword).',
    syllables: 'glad-i-a-tor',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-colosseum',
    word: 'colosseum',
    origin: 'Latin (colosseus, "colossal", after Nero colossus)',
    originCategory: 'latin',
    flag: '🏛️',
    pronunciation: '/ˌkɒl.əˈsiː.əm/ (kol-uh-SEE-uhm)',
    partOfSpeech: 'noun',
    definition: 'A vast amphitheater or stadium used for public games and contests.',
    sentence: 'Visitors marveled at the towering stone arches of the ancient Roman Colosseum.',
    spellingClue: 'Single c, single l, DOUBLE s ("ss"), ends in "-eum".',
    syllables: 'col-os-se-um',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-herbivore',
    word: 'herbivore',
    origin: 'Latin (herba, "plant" + vorare, "to devour")',
    originCategory: 'latin',
    flag: '🏛️',
    pronunciation: '/ˈhɜːr.bɪ.vɔːr/ (HER-bih-vor)',
    partOfSpeech: 'noun',
    definition: 'An animal that feeds mainly or exclusively on plants and vegetation.',
    sentence: 'The gentle deer is a classic herbivore that grazes quietly in the forest.',
    spellingClue: 'Latin herba (plant) + root "-vore" (devourer). Ends in silent e.',
    syllables: 'her-bi-vore',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-terrestrial',
    word: 'terrestrial',
    origin: 'Latin (terra, "earth")',
    originCategory: 'latin',
    flag: '🏛️',
    pronunciation: '/təˈrɛs.tri.əl/ (tuh-RES-tree-uhl)',
    partOfSpeech: 'adjective',
    definition: 'Relating to the earth or to land as opposed to water or air.',
    sentence: 'Elephants and giraffes are among the largest terrestrial mammals.',
    spellingClue: 'Double r ("rr") from terra + suffix "-strial". Single l.',
    syllables: 'ter-res-tri-al',
    points: 20,
    group: 'Group C (Gr. 5–6)'
  },

  // ==========================================
  // FRENCH WORDS LEARNED IN THIS MEETING
  // ==========================================
  {
    id: 'mc-soiree',
    word: 'soirée',
    origin: 'French (soirée, "evening party", from soir, "evening")',
    originCategory: 'french',
    flag: '🥐',
    pronunciation: '/swɑːˈreɪ/ (swah-RAY)',
    partOfSpeech: 'noun',
    definition: 'An elegant evening party or social gathering, typically with music.',
    sentence: 'The championship reception was an unforgettable musical soirée.',
    spellingClue: 'Features "oi" (/wɑː/), single r, and ends with acute accent "-ée".',
    syllables: 'soi-rée',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-duvet',
    word: 'duvet',
    origin: 'French (duvet, "down, comforter")',
    originCategory: 'french',
    flag: '🥐',
    pronunciation: '/duːˈveɪ/ (doo-VAY)',
    partOfSpeech: 'noun',
    definition: 'A soft quilt filled with down or synthetic fiber, used as a comforter.',
    sentence: 'She curled up warmly beneath the fluffy goose-down duvet.',
    spellingClue: 'Ends in silent French consonant "t": d-u-v-e-t.',
    syllables: 'du-vet',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-faux',
    word: 'faux',
    origin: 'French (faux, "false, fake")',
    originCategory: 'french',
    flag: '🥐',
    pronunciation: '/foʊ/ (FOH)',
    partOfSpeech: 'adjective',
    definition: 'Made in imitation; artificial; not genuine.',
    sentence: 'The jacket was trimmed with luxurious brown faux fur.',
    spellingClue: 'Silent final "x"! Spelled f-a-u-x.',
    syllables: 'faux',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-rotisserie',
    word: 'rotisserie',
    origin: 'French (rôtisserie, from rôtir, "to roast")',
    originCategory: 'french',
    flag: '🥐',
    pronunciation: '/roʊˈtɪs.ər.i/ (roh-TIS-er-ee)',
    partOfSpeech: 'noun',
    definition: 'A cooking appliance with a rotating spit for roasting meat evenly.',
    sentence: 'Seasoned chickens turned slowly on the butcher\'s outdoor rotisserie.',
    spellingClue: 'Single t, DOUBLE s ("ss"), and French noun suffix "-erie".',
    syllables: 'ro-tis-se-rie',
    points: 20,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-chauffeur',
    word: 'chauffeur',
    origin: 'French (chauffeur, literally "stoker" of steam engines)',
    originCategory: 'french',
    flag: '🥐',
    pronunciation: '/ʃoʊˈfɜːr/ (shoh-FUR)',
    partOfSpeech: 'noun',
    definition: 'A person employed to drive a private luxury passenger automobile.',
    sentence: 'The dignitary was greeted at the terminal by a uniformed chauffeur.',
    spellingClue: '"ch" sounds like /ʃ/, double f ("ff"), ending in French agent "-eur".',
    syllables: 'chauf-feur',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-silhouette',
    word: 'silhouette',
    origin: 'French (named after Étienne de Silhouette, frugal finance minister)',
    originCategory: 'french',
    flag: '🥐',
    pronunciation: '/ˌsɪl.uˈɛt/ (sil-oo-ET)',
    partOfSpeech: 'noun',
    definition: 'The dark outline or shape of someone or something against a lighter background.',
    sentence: 'The setting sun cast a sharp silhouette of the palm trees against the red sky.',
    spellingClue: 'Single l, "h" after "l", ends in French feminine "-ette".',
    syllables: 'sil-hou-ette',
    points: 25,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-croissant',
    word: 'croissant',
    origin: 'French (croissant, "crescent", from croître, "to grow")',
    originCategory: 'french',
    flag: '🥐',
    pronunciation: '/kwɑːˈsɑːŋ/ or /krəˈsɑːnt/ (kruh-SAHNT)',
    partOfSpeech: 'noun',
    definition: 'A flaky, buttery, crescent-shaped roll of puff pastry.',
    sentence: 'Warm chocolate croissants were served fresh at breakfast.',
    spellingClue: '"oi" vowel team, double s ("ss"), ends in "-ant" with silent final t.',
    syllables: 'crois-sant',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-camouflage',
    word: 'camouflage',
    origin: 'French (camoufler, "to disguise")',
    originCategory: 'french',
    flag: '🥐',
    pronunciation: '/ˈkæm.ə.flɑːʒ/ (KAM-uh-flahzh)',
    partOfSpeech: 'noun / verb',
    definition: 'The disguising of military personnel or animals to blend with their surroundings.',
    sentence: 'The chameleon used remarkable natural camouflage to hide on the branch.',
    spellingClue: 'French "-age" pronounced /ɑːʒ/. Contains "ou" in second syllable.',
    syllables: 'cam-ou-flage',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },

  // ==========================================
  // GREEK WORDS LEARNED IN THIS MEETING
  // ==========================================
  {
    id: 'mc-philharmonic',
    word: 'philharmonic',
    origin: 'Greek (philos, "loving" + harmonia, "harmony")',
    originCategory: 'greek',
    flag: '🏺',
    pronunciation: '/ˌfɪl.hɑːrˈmɒn.ɪk/ (fil-har-MON-ik)',
    partOfSpeech: 'adjective / noun',
    definition: 'Devoted to music; a symphony orchestra organization.',
    sentence: 'The city philharmonic performed Beethoven\'s Ninth Symphony to a standing ovation.',
    spellingClue: 'Greek "ph" (/f/) + "harmonia" (music). Ends in Greek "-ic", not -ick.',
    syllables: 'phil-har-mon-ic',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-brontophobia',
    word: 'brontophobia',
    origin: 'Greek (bronte, "thunder" + phobos, "fear")',
    originCategory: 'greek',
    flag: '🏺',
    pronunciation: '/ˌbrɒn.təˈfoʊ.bi.ə/ (bron-tuh-FOH-bee-uh)',
    partOfSpeech: 'noun',
    definition: 'An abnormal, extreme fear of thunder and thunderstorms.',
    sentence: 'During summer lightning storms, our dog suffered from acute brontophobia.',
    spellingClue: 'Greek root bronte (thunder) + phobia (with "ph" and "o").',
    syllables: 'bron-to-pho-bi-a',
    points: 25,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-amphibian',
    word: 'amphibian',
    origin: 'Greek (amphi, "both, double" + bios, "life")',
    originCategory: 'greek',
    flag: '🏺',
    pronunciation: '/æmˈfɪb.i.ən/ (am-FIB-ee-uhn)',
    partOfSpeech: 'noun / adjective',
    definition: 'A cold-blooded vertebrate animal capable of living on both land and water.',
    sentence: 'A frog is an amphibian that begins life breathing underwater through gills.',
    spellingClue: 'Greek "ph" for /f/ in amphi- + root bios (life) + "-ian".',
    syllables: 'am-phib-i-an',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-kaleidoscope',
    word: 'kaleidoscope',
    origin: 'Greek (kalos, "beautiful" + eidos, "form" + skopein, "to look")',
    originCategory: 'greek',
    flag: '🏺',
    pronunciation: '/kəˈlaɪ.də.skoʊp/ (kuh-LY-duh-skohp)',
    partOfSpeech: 'noun',
    definition: 'An optical toy cylinder with mirrors displaying changing symmetrical colored patterns.',
    sentence: 'Turning the tube revealed a mesmerizing kaleidoscope of gem-colored crystals.',
    spellingClue: 'Begins with "k", "ei" for the /aɪ/ sound, and ends in "-scope".',
    syllables: 'ka-lei-do-scope',
    points: 25,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-rhythm',
    word: 'rhythm',
    origin: 'Greek (rhythmos, "measured flow or motion")',
    originCategory: 'greek',
    flag: '🏺',
    pronunciation: '/ˈrɪð.əm/ (RITH-uhm)',
    partOfSpeech: 'noun',
    definition: 'A strong, regular, repeated pattern of movement or sound.',
    sentence: 'The drummer laid down an infectious, syncopated rhythm.',
    spellingClue: 'Greek "rh-", vowel is "y", contains "th", ends in "m": r-h-y-t-h-m. NO normal vowels!',
    syllables: 'rhythm',
    points: 25,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-chronological',
    word: 'chronological',
    origin: 'Greek (chronos, "time" + logos, "study")',
    originCategory: 'greek',
    flag: '🏺',
    pronunciation: '/ˌkrɒn.əˈlɑː.dʒɪ.kəl/ (kron-uh-LOJ-ih-kuhl)',
    partOfSpeech: 'adjective',
    definition: 'Starting with the earliest and following the order in which events occurred.',
    sentence: 'The historian arranged the documents in strict chronological order.',
    spellingClue: 'Greek "ch" for /k/, root chronos (time), ends in "-ical".',
    syllables: 'chron-o-log-i-cal',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },

  // ==========================================
  // GERMAN WORDS LEARNED IN THIS MEETING
  // ==========================================
  {
    id: 'mc-kindergarten',
    word: 'kindergarten',
    origin: 'German (Kinder, "children" + Garten, "garden")',
    originCategory: 'german',
    flag: '🥨',
    pronunciation: '/ˈkɪn.dərˌɡɑːr.tən/ (KIN-der-gar-tuhn)',
    partOfSpeech: 'noun',
    definition: 'A class or school for young children, usually ages 4–6, before first grade.',
    sentence: 'Her earliest school memories began in a cheerful kindergarten classroom.',
    spellingClue: 'German "garten" with "t" (NOT "garden" with "d")! Kinder + garten.',
    syllables: 'kin-der-gar-ten',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-dachshund',
    word: 'dachshund',
    origin: 'German (Dachs, "badger" + Hund, "dog")',
    originCategory: 'german',
    flag: '🥨',
    pronunciation: '/ˈdɑːks.hʊnd/ or /ˈdæks.ənd/ (DAHKS-huund)',
    partOfSpeech: 'noun',
    definition: 'A short-legged, long-bodied hound breed bred for badger hunting.',
    sentence: 'The playful dachshund scampered across the lawn on its short little legs.',
    spellingClue: 'German compound: "dachs" (with "chs") + "hund" (dog). Spelled d-a-c-h-s-h-u-n-d.',
    syllables: 'dachs-hund',
    points: 25,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-edelweiss',
    word: 'edelweiss',
    origin: 'German (edel, "noble" + weiß, "white")',
    originCategory: 'german',
    flag: '🥨',
    pronunciation: '/ˈeɪ.dəl.vaɪs/ (AY-duhl-vys)',
    partOfSpeech: 'noun',
    definition: 'A small European alpine plant with velvety white flowers and woolly bracts.',
    sentence: 'Hikers in the Swiss Alps were delighted to discover rare blooming edelweiss.',
    spellingClue: '"edel" (noble) + "weiss" (white with "w" sounding like /v/ and double s).',
    syllables: 'e-del-weiss',
    points: 25,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-wanderlust',
    word: 'wanderlust',
    origin: 'German (wandern, "to hike" + Lust, "desire")',
    originCategory: 'german',
    flag: '🥨',
    pronunciation: '/ˈwɑːn.dər.lʌst/ (WAHN-der-lust)',
    partOfSpeech: 'noun',
    definition: 'A strong, innate desire or impulse to wander or travel the world.',
    sentence: 'Filled with wanderlust, she packed her backpack for a trek across Europe.',
    spellingClue: 'Compound of wander + lust. Spelled with "e" in wander.',
    syllables: 'wan-der-lust',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },

  // ==========================================
  // ITALIAN WORDS LEARNED IN THIS MEETING
  // ==========================================
  {
    id: 'mc-virtuoso',
    word: 'virtuoso',
    origin: 'Italian (virtuoso, "skilled, endowed with virtue")',
    originCategory: 'italian',
    flag: '🎻',
    pronunciation: '/ˌvɜːr.tʃuˈoʊ.soʊ/ (vur-choo-OH-soh)',
    partOfSpeech: 'noun',
    definition: 'An individual highly skilled in music or another artistic pursuit.',
    sentence: 'The young piano virtuoso performed the concerto flawlessly without sheet music.',
    spellingClue: 'Latin virtus (excellence). Single t, ends in Italian vowel "-o".',
    syllables: 'vir-tu-o-so',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-mezzanine',
    word: 'mezzanine',
    origin: 'Italian (mezzanino, from mezzano, "middle")',
    originCategory: 'italian',
    flag: '🎻',
    pronunciation: '/ˈmɛz.ə.niːn/ (MEZ-uh-neen)',
    partOfSpeech: 'noun',
    definition: 'A low intermediate story between two main floors of a building.',
    sentence: 'From our balcony in the mezzanine, we had a clear view of the stage.',
    spellingClue: 'Double z ("zz"), single n, ends in silent e: m-e-z-z-a-n-i-n-e.',
    syllables: 'mez-za-nine',
    points: 20,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-zucchini',
    word: 'zucchini',
    origin: 'Italian (diminutive of zucca, "gourd")',
    originCategory: 'italian',
    flag: '🎻',
    pronunciation: '/zuːˈkiː.ni/ (zoo-KEE-nee)',
    partOfSpeech: 'noun',
    definition: 'A dark green summer squash variety.',
    sentence: 'The chef grilled sliced green zucchini with garlic and olive oil.',
    spellingClue: 'Starts with "z", uses "cch" for the /k/ sound, ends in "i".',
    syllables: 'zuc-chi-ni',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-allegro',
    word: 'allegro',
    origin: 'Italian (allegro, "cheerful, lively")',
    originCategory: 'italian',
    flag: '🎻',
    pronunciation: '/əˈleɪ.ɡroʊ/ (uh-LAY-groh)',
    partOfSpeech: 'adverb / adjective',
    definition: 'Performed in a quick, lively, brisk musical tempo.',
    sentence: 'The conductor instructed the violinists to play the second movement allegro.',
    spellingClue: 'Double l ("ll"), single g, ends in Italian musical vowel "-o".',
    syllables: 'al-le-gro',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },

  // ==========================================
  // SPANISH WORDS LEARNED IN THIS MEETING
  // ==========================================
  {
    id: 'mc-guerrilla',
    word: 'guerrilla',
    origin: 'Spanish (diminutive of guerra, "war")',
    originCategory: 'spanish',
    flag: '🌮',
    pronunciation: '/ɡəˈrɪl.ə/ (guh-RIL-uh)',
    partOfSpeech: 'noun',
    definition: 'A member of an irregular military group using surprise tactical warfare.',
    sentence: 'The guerrilla forces used knowledge of jungle terrain to outmaneuver rivals.',
    spellingClue: 'Homophone trap! Spanish warfare has "gue-", double r ("rr"), double l ("ll"). Ape is gorilla.',
    syllables: 'guer-ril-la',
    points: 25,
    group: 'Group C (Gr. 5–6)'
  },

  // ==========================================
  // HOMOPHONE PAIRS LEARNED IN THIS MEETING
  // ==========================================
  {
    id: 'mc-complement',
    word: 'complement',
    origin: 'Latin (complementum, "that which completes")',
    originCategory: 'homophone',
    flag: '⚖️',
    pronunciation: '/ˈkɑːm.plə.mənt/ (KAHM-pluh-muhnt)',
    partOfSpeech: 'noun / verb',
    definition: 'Something that completes or brings to perfection; pairs well together.',
    sentence: 'Fresh cranberry sauce was the ideal complement to the holiday roast.',
    spellingClue: 'complEment complEtes (shares "E")! Compliment with "I" is praise.',
    syllables: 'com-ple-ment',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-stationary',
    word: 'stationary',
    origin: 'Latin (stationarius, "standing still")',
    originCategory: 'homophone',
    flag: '⚖️',
    pronunciation: '/ˈsteɪ.ʃən.er.i/ (STAY-shuhn-air-ee)',
    partOfSpeech: 'adjective',
    definition: 'Not moving; staying in one fixed place or position.',
    sentence: 'The exercise bike remained completely stationary while Marcus pedaled.',
    spellingClue: 'stationAry with "A" is "At rest"! stationEry with "E" is for Envelopes.',
    syllables: 'sta-tion-ar-y',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-principal',
    word: 'principal',
    origin: 'Latin (principalis, "chief, first in rank")',
    originCategory: 'homophone',
    flag: '⚖️',
    pronunciation: '/ˈprɪn.sə.pəl/ (PRIN-suh-puhl)',
    partOfSpeech: 'noun / adjective',
    definition: 'The head or director of a school; also the primary or most important item.',
    sentence: 'Our school principal presented the gold medal to the spelling bee winner.',
    spellingClue: 'Ends in -pal: "The principal is your PAL"! Principle (-ple) is a moral ruLE.',
    syllables: 'prin-ci-pal',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-personnel',
    word: 'personnel',
    origin: 'French (personnel, "staff/employees")',
    originCategory: 'general',
    flag: '🐝',
    pronunciation: '/ˌpɜːr.səˈnɛl/ (pur-suh-NEL)',
    partOfSpeech: 'noun',
    definition: 'People employed in an organization or engaged in an organized service.',
    sentence: 'Only authorized security personnel were admitted into the backstage hall.',
    spellingClue: 'Double "n" ("nn"), single "l"! p-e-r-s-o-n-n-e-l (contrasted with personal).',
    syllables: 'per-son-nel',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-bazaar',
    word: 'bazaar',
    origin: 'Persian (bāzār, "market")',
    originCategory: 'homophone',
    flag: '⚖️',
    pronunciation: '/bəˈzɑːr/ (buh-ZAHR)',
    partOfSpeech: 'noun',
    definition: 'A marketplace or street of shops, especially in the Middle East.',
    sentence: 'Spices and woven rugs were sold at the bustling outdoor bazaar.',
    spellingClue: 'Marketplace has double "a" ("aa"): b-a-z-a-a-r. Weird is bizarre (b-i-z-a-r-r-e).',
    syllables: 'ba-zaar',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-coarse',
    word: 'coarse',
    origin: 'Middle English (originally "ordinary, common")',
    originCategory: 'homophone',
    flag: '⚖️',
    pronunciation: '/kɔːrs/ (KORS)',
    partOfSpeech: 'adjective',
    definition: 'Rough or harsh in texture; not fine.',
    sentence: 'The carpenter smoothed the coarse sandpaper against the oak plank.',
    spellingClue: 'Rough texture has "oa": c-o-a-r-s-e. Path/class is c-o-u-r-s-e.',
    syllables: 'coarse',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-stationery',
    word: 'stationery',
    origin: 'Middle English / Medieval Latin (stationarius, "bookseller with permanent shop")',
    originCategory: 'homophone',
    flag: '⚖️',
    pronunciation: '/ˈsteɪ.ʃən.er.i/ (STAY-shuhn-air-ee)',
    partOfSpeech: 'noun',
    definition: 'Writing paper, matching envelopes, and related office materials.',
    sentence: 'She penned a thank-you note on elegant monogrammed stationery.',
    spellingClue: 'stationEry with "E" is for Envelope and lEtter! Ends in -ery.',
    syllables: 'sta-tion-er-y',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-principle',
    word: 'principle',
    origin: 'Latin (principium, "beginning, foundational source")',
    originCategory: 'homophone',
    flag: '⚖️',
    pronunciation: '/ˈprɪn.sə.pəl/ (PRIN-suh-puhl)',
    partOfSpeech: 'noun',
    definition: 'A fundamental truth, moral rule, or guiding belief.',
    sentence: 'Honesty is a cardinal principle upheld by all contestants.',
    spellingClue: 'Ends in -ple: A princiPLE is a ruLE (both end in -le)!',
    syllables: 'prin-ci-ple',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-compliment',
    word: 'compliment',
    origin: 'Italian (complimento) / Latin (complere)',
    originCategory: 'homophone',
    flag: '⚖️',
    pronunciation: '/ˈkɑːm.plə.mənt/ (KAHM-pluh-muhnt)',
    partOfSpeech: 'noun / verb',
    definition: 'A polite expression of praise, admiration, or congratulation.',
    sentence: 'The judge gave the young speller a warm compliment for perfect poise.',
    spellingClue: 'complIment with "I" is praise: "I" like to give complIments! Ends in -ment.',
    syllables: 'com-pli-ment',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-capital',
    word: 'capital',
    origin: 'Latin (capitalis, "of the head", from caput, "head")',
    originCategory: 'homophone',
    flag: '⚖️',
    pronunciation: '/ˈkæp.ɪ.təl/ (KAP-i-tuhl)',
    partOfSpeech: 'noun / adjective',
    definition: 'The chief city of a country or state; also uppercase letters or financial wealth.',
    sentence: 'Jakarta is the vibrant capital city hosting the National Spelling Bee.',
    spellingClue: 'Ends in -al: capitAL city or capitAL letter (caput = head).',
    syllables: 'cap-i-tal',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-capitol',
    word: 'capitol',
    origin: 'Latin (Capitolium, the temple of Jupiter on Capitoline Hill in Rome)',
    originCategory: 'homophone',
    flag: '⚖️',
    pronunciation: '/ˈkæp.ɪ.təl/ (KAP-i-tuhl)',
    partOfSpeech: 'noun',
    definition: 'A building in which a state or national legislative body meets.',
    sentence: 'Tourists admired the white dome of the Capitol building in the sunshine.',
    spellingClue: 'Ends in -ol: The capitOl building has a dOme (shares letter "O")!',
    syllables: 'cap-i-tol',
    points: 20,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-dessert',
    word: 'dessert',
    origin: 'French (desservir, "to clear the table")',
    originCategory: 'homophone',
    flag: '⚖️',
    pronunciation: '/dɪˈzɜːrt/ (di-ZURT)',
    partOfSpeech: 'noun',
    definition: 'The sweet course eaten at the end of a meal.',
    sentence: 'We enjoyed warm apple pie and vanilla ice cream for dessert.',
    spellingClue: 'DOUBLE "s" ("ss"): You want two Strawberry Sweets for dessert! Sandy desert has 1 s.',
    syllables: 'des-sert',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-bouquet',
    word: 'bouquet',
    origin: 'French (diminutive of bosc, "little clump of trees")',
    originCategory: 'french',
    flag: '🥐',
    pronunciation: '/buːˈkeɪ/ (boo-KAY)',
    partOfSpeech: 'noun',
    definition: 'An attractively arranged bunch of cut flowers.',
    sentence: 'The champion received a golden trophy and a fragrant floral bouquet.',
    spellingClue: 'Starts with "b-o-u", "qu" for /k/, ends in silent French "t" (-et = /eɪ/).',
    syllables: 'bou-quet',
    points: 20,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-etiquette',
    word: 'etiquette',
    origin: 'French (estiquette, "prescribed ceremonial ticket")',
    originCategory: 'french',
    flag: '🥐',
    pronunciation: '/ˈɛt.ɪ.kɛt/ (ET-i-ket)',
    partOfSpeech: 'noun',
    definition: 'The customary code of polite behavior in society or competitions.',
    sentence: 'Spelling bee etiquette requires listening in respectful silence.',
    spellingClue: 'Single t, "i", "qu" for /k/, ends in French "-ette".',
    syllables: 'et-i-quette',
    points: 25,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-reservoir',
    word: 'reservoir',
    origin: 'French (réservoir, from réserver, "to store")',
    originCategory: 'french',
    flag: '🥐',
    pronunciation: '/ˈrɛz.ər.vwɑːr/ (REZ-er-vwar)',
    partOfSpeech: 'noun',
    definition: 'A large natural or artificial lake used as a source of municipal water supply.',
    sentence: 'Mountain snowmelt filled the city reservoir to the brim.',
    spellingClue: 'Single s, French diphthong "-oir" pronounced /wɑːr/.',
    syllables: 'res-er-voir',
    points: 20,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-pretzel',
    word: 'pretzel',
    origin: 'German (Brezel, from Latin bracellus, "little arms")',
    originCategory: 'german',
    flag: '🥨',
    pronunciation: '/ˈprɛt.səl/ (PRET-suhl)',
    partOfSpeech: 'noun',
    definition: 'A crisp, salted biscuit baked in the shape of a knot.',
    sentence: 'We dipped crunchy salted pretzels into warm mustard dip.',
    spellingClue: 'Starts with p-r-e-t, uses "z" for the German sound, ends in "-el".',
    syllables: 'pret-zel',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-dachshund',
    word: 'dachshund',
    origin: 'German (Dachs, "badger" + Hund, "dog")',
    originCategory: 'german',
    flag: '🥨',
    pronunciation: '/ˈdɑːks.hʊnd/ (DAHKS-huund)',
    partOfSpeech: 'noun',
    definition: 'A small hound breed with very short legs and a long body.',
    sentence: 'The cheerful brown dachshund trotted briskly across the lawn.',
    spellingClue: '"d-a-c-h-s" (badger) + "h-u-n-d" (hound). Silent /k/ in "chs".',
    syllables: 'dachs-hund',
    points: 25,
    group: 'Group C (Gr. 5–6)'
  },
  {
    id: 'mc-barista',
    word: 'barista',
    origin: 'Italian (barista, "bartender", from bar)',
    originCategory: 'italian',
    flag: '🎻',
    pronunciation: '/bəˈriː.stə/ (buh-REE-stuh)',
    partOfSpeech: 'noun',
    definition: 'A person who prepares and serves espresso and specialty coffees.',
    sentence: 'The skilled barista created a lovely leaf pattern in the latte foam.',
    spellingClue: 'Single r, single s, ends in Italian noun suffix "-ista".',
    syllables: 'ba-ris-ta',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-tornado',
    word: 'tornado',
    origin: 'Spanish (tornar, "to turn" + tronada, "thunderstorm")',
    originCategory: 'spanish',
    flag: '🌮',
    pronunciation: '/tɔːrˈneɪ.doʊ/ (tor-NAY-doh)',
    partOfSpeech: 'noun',
    definition: 'A mobile, destructive vortex of violently rotating winds shaped like a funnel.',
    sentence: 'The weather station issued a storm warning when the tornado was spotted.',
    spellingClue: 'Single r, single n, ends in Spanish vowel "-o". t-o-r-n-a-d-o.',
    syllables: 'tor-na-do',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  },
  {
    id: 'mc-origami',
    word: 'origami',
    origin: 'Japanese (ori, "fold" + kami, "paper")',
    originCategory: 'general',
    flag: '🌸',
    pronunciation: '/ˌɒr.ɪˈɡɑː.mi/ (or-i-GAH-mee)',
    partOfSpeech: 'noun',
    definition: 'The traditional Japanese art of decorative paper folding.',
    sentence: 'She folded a delicate origami crane from a square sheet of gold paper.',
    spellingClue: 'Japanese loanword: o-r-i-g-a-m-i. Every vowel is sounded clearly.',
    syllables: 'o-ri-ga-mi',
    points: 15,
    group: 'Group B (Gr. 3–4)'
  }
];

export default function ClassroomGames({
  teamScores,
  onUpdateScores,
  setTeamScores,
  onGamePlayed,
  genAlphaMode,
  isTeacherMode,
  activeMeeting = 'meeting-3'
}: ClassroomGamesProps) {
  // Navigation tabs:
  // 'say-spell-say': English 1 Say-Spell-Say Card Showdown (Team Duel)
  // 'tournament-arena': English 1 3-Round Tournament Simulator (Prelims -> Semifinals -> Grand Final)
  // 'memory-match': Etymology Origin Card Match (16 Card Flip)
  // 'open-box': 30 Mystery Boxes
  // 'card-deck': Printable & Projectable Classroom Card Deck
  const [activeGameTab, setActiveGameTab] = useState<'say-spell-say' | 'tournament-arena' | 'memory-match' | 'open-box' | 'card-deck'>('say-spell-say');

  const updateScores = (newScores: ClassroomScores) => {
    if (onUpdateScores) onUpdateScores(newScores);
    if (setTeamScores) setTeamScores(newScores);
  };

  const handleAwardTeam = (team: 'A' | 'B', pts: number) => {
    sound.playCorrect();
    confetti({ particleCount: 30, spread: 60 });
    updateScores({
      ...teamScores,
      [team === 'A' ? 'teamA' : 'teamB']: (team === 'A' ? teamScores.teamA : teamScores.teamB) + pts
    });
  };

  // =========================================================================
  // GAME 1: ENGLISH 1 "SAY – SPELL – SAY" CARD SHOWDOWN (FLASHCARD TEAM DUEL)
  // =========================================================================
  const [cardCategoryFilter, setCardCategoryFilter] = useState<string>('all');
  const [cardGroupFilter, setCardGroupFilter] = useState<'all' | 'Group B' | 'Group C'>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [hideSpellingMode, setHideSpellingMode] = useState<boolean>(true);
  const [spellerInput, setSpellerInput] = useState<string>('');
  const [cardFeedback, setCardFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [activeClueMessage, setActiveClueMessage] = useState<string | null>(null);
  
  // English 1 3-Step Protocol State for the active turn:
  const [spellerHasSaidFirst, setSpellerHasSaidFirst] = useState<boolean>(false);
  const [spellerHasSpelled, setSpellerHasSpelled] = useState<boolean>(false);
  const [spellerHasSaidLast, setSpellerHasSaidLast] = useState<boolean>(false);

  // Filtered Cards Deck
  const filteredCards = useMemo(() => {
    return MEETING_LEARNED_CARDS.filter(c => {
      const matchCat = cardCategoryFilter === 'all' || c.originCategory === cardCategoryFilter;
      const matchGroup = cardGroupFilter === 'all' || 
        (cardGroupFilter === 'Group B' && c.group === 'Group B (Gr. 3–4)') ||
        (cardGroupFilter === 'Group C' && c.group === 'Group C (Gr. 5–6)');
      return matchCat && matchGroup;
    });
  }, [cardCategoryFilter, cardGroupFilter]);

  const currentCard = filteredCards[currentCardIndex % Math.max(1, filteredCards.length)] || MEETING_LEARNED_CARDS[0];

  // 30-Second Classroom Buzzer Timer
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(s => s - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      sound.playWrong();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleStartTimer = () => {
    setTimerSeconds(30);
    setIsTimerRunning(true);
    sound.playLetterKey();
  };

  const handleResetCardTurn = () => {
    setIsCardFlipped(false);
    setSpellerInput('');
    setCardFeedback(null);
    setTimerSeconds(30);
    setIsTimerRunning(false);
    setActiveClueMessage(null);
    setSpellerHasSaidFirst(false);
    setSpellerHasSpelled(false);
    setSpellerHasSaidLast(false);
  };

  const handleNextCard = () => {
    setCurrentCardIndex(prev => (prev + 1) % filteredCards.length);
    handleResetCardTurn();
    sound.playClick();
  };

  const handlePrevCard = () => {
    setCurrentCardIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
    handleResetCardTurn();
    sound.playClick();
  };

  const handleShuffleCards = () => {
    const randomIdx = Math.floor(Math.random() * filteredCards.length);
    setCurrentCardIndex(randomIdx);
    handleResetCardTurn();
    sound.playFanfare();
  };

  // English 1 Pronouncer 3-Step audio: Word -> Sentence -> Word
  const handlePlayPronouncer3Step = () => {
    sound.playClick();
    humanVoice.speakWord(currentCard.word);
    setTimeout(() => {
      humanVoice.speakSentence(currentCard.sentence);
      setTimeout(() => {
        humanVoice.speakWord(currentCard.word);
      }, 3500);
    }, 1200);
  };

  // English 1 Clarifying Inquiries
  const handleAskInquiry = (inquiryType: 'repeat' | 'definition' | 'sentence' | 'part' | 'origin') => {
    sound.playLetterKey();
    if (inquiryType === 'repeat') {
      setActiveClueMessage(`Pronouncer repeats: "${currentCard.word}"`);
      humanVoice.speakWord(currentCard.word);
    } else if (inquiryType === 'definition') {
      setActiveClueMessage(`Definition: "${currentCard.definition}"`);
      humanVoice.speakSentence(`Definition: ${currentCard.definition}`);
    } else if (inquiryType === 'sentence') {
      setActiveClueMessage(`Sentence: "${currentCard.sentence}"`);
      humanVoice.speakSentence(currentCard.sentence);
    } else if (inquiryType === 'part') {
      setActiveClueMessage(`Part of speech: "${currentCard.partOfSpeech}"`);
      humanVoice.speakSentence(`Part of speech: ${currentCard.partOfSpeech}`);
    } else if (inquiryType === 'origin') {
      setActiveClueMessage(`Language of origin: "${currentCard.origin}"`);
      humanVoice.speakSentence(`Language of origin: ${currentCard.origin}`);
    }
  };

  // Check speller input
  const handleCheckSpellerInput = () => {
    if (!spellerInput.trim()) return;
    const isCorrect = spellerInput.trim().toLowerCase() === currentCard.word.toLowerCase();
    setCardFeedback(isCorrect ? 'correct' : 'wrong');
    setIsCardFlipped(true);
    setSpellerHasSpelled(true);
    setSpellerHasSaidLast(true);

    if (isCorrect) {
      sound.playCorrect();
      confetti({ particleCount: 50, spread: 70 });
      onGamePlayed('say-spell-say');
    } else {
      sound.playWrong();
    }
  };

  // =========================================================================
  // GAME 2: ENGLISH 1 TOURNAMENT 3-ROUND SIMULATOR STATE
  // =========================================================================
  const [tournamentRound, setTournamentRound] = useState<'round1-prelim' | 'round2-semifinal' | 'round3-final'>('round1-prelim');
  const [prelimQuestionIdx, setPrelimQuestionIdx] = useState<number>(0);
  const [prelimUserInput, setPrelimUserInput] = useState<string>('');
  const [prelimScores, setPrelimScores] = useState<{ [key: number]: boolean }>({});
  
  // 5 selected test cards for Round 1
  const prelimCards = useMemo(() => {
    return [
      MEETING_LEARNED_CARDS.find(c => c.word === 'aqueduct')!,
      MEETING_LEARNED_CARDS.find(c => c.word === 'soirée')!,
      MEETING_LEARNED_CARDS.find(c => c.word === 'philharmonic')!,
      MEETING_LEARNED_CARDS.find(c => c.word === 'kindergarten')!,
      MEETING_LEARNED_CARDS.find(c => c.word === 'complement')!
    ].filter(Boolean);
  }, []);

  // 5 selected test cards for Round 2 Semifinal (Speed dictation)
  const semiCards = useMemo(() => {
    return [
      MEETING_LEARNED_CARDS.find(c => c.word === 'curriculum')!,
      MEETING_LEARNED_CARDS.find(c => c.word === 'chauffeur')!,
      MEETING_LEARNED_CARDS.find(c => c.word === 'amphibian')!,
      MEETING_LEARNED_CARDS.find(c => c.word === 'virtuoso')!,
      MEETING_LEARNED_CARDS.find(c => c.word === 'stationary')!
    ].filter(Boolean);
  }, []);

  // Round 3 Final: 2 Spellers Showdown (Honeybees vs Spellbinders)
  const [finalDuelTurn, setFinalDuelTurn] = useState<'A' | 'B'>('A');
  const [finalDuelCardIdx, setFinalDuelCardIdx] = useState<number>(0);
  const [finalDuelStatus, setFinalDuelStatus] = useState<string>('Live Stage Showdown · Speller 1 at Mic');

  const handlePrelimSubmitWord = () => {
    if (!prelimUserInput.trim()) return;
    const currentTestCard = prelimCards[prelimQuestionIdx];
    const isCorrect = prelimUserInput.trim().toLowerCase() === currentTestCard.word.toLowerCase();
    
    setPrelimScores(prev => ({ ...prev, [prelimQuestionIdx]: isCorrect }));
    if (isCorrect) sound.playCorrect();
    else sound.playWrong();

    if (prelimQuestionIdx < prelimCards.length - 1) {
      setPrelimQuestionIdx(i => i + 1);
      setPrelimUserInput('');
    } else {
      sound.playFanfare();
      confetti({ particleCount: 40 });
    }
  };

  // =========================================================================
  // GAME 3: ETYMOLOGY ORIGIN MEMORY MATCH STATE
  // =========================================================================
  interface MemoryCardTile {
    uniqueId: string;
    pairId: string;
    type: 'word' | 'clue';
    content: string;
    flag: string;
    origin: string;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [memoryTiles, setMemoryTiles] = useState<MemoryCardTile[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMatchesCount, setMemoryMatchesCount] = useState<number>(0);

  const initMemoryGame = () => {
    const selectedSource = [
      { word: 'aqueduct', clue: '🏛️ Latin: Water bridge channel', origin: 'Latin', flag: '🏛️' },
      { word: 'curriculum', clue: '🏛️ Latin: Complete study course', origin: 'Latin', flag: '🏛️' },
      { word: 'chauffeur', clue: '🥐 French: Employed luxury driver', origin: 'French', flag: '🥐' },
      { word: 'amphibian', clue: '🏺 Greek: Double-life creature', origin: 'Greek', flag: '🏺' },
      { word: 'kindergarten', clue: '🥨 German: Children\'s garden class', origin: 'German', flag: '🥨' },
      { word: 'virtuoso', clue: '🎻 Italian: Master musical prodigy', origin: 'Italian', flag: '🎻' },
      { word: 'guerrilla', clue: '🌮 Spanish: Irregular warfare fighter', origin: 'Spanish', flag: '🌮' },
      { word: 'principal', clue: '⚖️ Latin: Head of school (your PAL)', origin: 'Latin', flag: '⚖️' }
    ];

    const tiles: MemoryCardTile[] = [];
    selectedSource.forEach((item, idx) => {
      tiles.push({
        uniqueId: `word-${idx}`,
        pairId: `pair-${idx}`,
        type: 'word',
        content: item.word,
        flag: item.flag,
        origin: item.origin,
        isFlipped: false,
        isMatched: false
      });
      tiles.push({
        uniqueId: `clue-${idx}`,
        pairId: `pair-${idx}`,
        type: 'clue',
        content: item.clue,
        flag: item.flag,
        origin: item.origin,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle tiles
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }

    setMemoryTiles(tiles);
    setFlippedIndices([]);
    setMemoryMatchesCount(0);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  const handleTileClick = (index: number) => {
    if (flippedIndices.length === 2 || memoryTiles[index].isFlipped || memoryTiles[index].isMatched) {
      return;
    }

    sound.playLetterKey();
    const newTiles = [...memoryTiles];
    newTiles[index].isFlipped = true;
    setMemoryTiles(newTiles);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIdx, secondIdx] = newFlipped;
      const tile1 = newTiles[firstIdx];
      const tile2 = newTiles[secondIdx];

      if (tile1.pairId === tile2.pairId) {
        // Matched!
        setTimeout(() => {
          sound.playCorrect();
          confetti({ particleCount: 25, spread: 50 });
          setMemoryTiles(prev =>
            prev.map((t, i) => (i === firstIdx || i === secondIdx ? { ...t, isMatched: true } : t))
          );
          setFlippedIndices([]);
          setMemoryMatchesCount(m => m + 1);
        }, 500);
      } else {
        // Not matched
        setTimeout(() => {
          sound.playClick();
          setMemoryTiles(prev =>
            prev.map((t, i) => (i === firstIdx || i === secondIdx ? { ...t, isFlipped: false } : t))
          );
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  // =========================================================================
  // GAME 4: 30 MYSTERY BOXES STATE
  // =========================================================================
  const [openedBoxes, setOpenedBoxes] = useState<number[]>([]);
  const [selectedBox, setSelectedBox] = useState<BoxChallenge | null>(null);

  const handleOpenBox = (box: BoxChallenge) => {
    const boxId = box.boxNumber ?? box.id ?? 1;
    if (openedBoxes.includes(boxId)) {
      setSelectedBox(box);
      return;
    }
    sound.playFanfare();
    confetti({ particleCount: 35, spread: 60 });
    setOpenedBoxes(prev => [...prev, boxId]);
    setSelectedBox(box);
  };

  // =========================================================================
  // GAME 5: PRINTABLE / PROJECTABLE CARD DECK STATE
  // =========================================================================
  const [deckSearch, setDeckSearch] = useState<string>('');
  const [allFlipped, setAllFlipped] = useState<boolean>(false);

  const deckFilteredCards = useMemo(() => {
    return MEETING_LEARNED_CARDS.filter(c => {
      const matchSearch = !deckSearch || 
        c.word.toLowerCase().includes(deckSearch.toLowerCase()) ||
        c.definition.toLowerCase().includes(deckSearch.toLowerCase()) ||
        c.origin.toLowerCase().includes(deckSearch.toLowerCase());
      return matchSearch;
    });
  }, [deckSearch]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* ========================================================================= */}
      {/* HERO BANNER: ENGLISH 1 NATIONAL SPELLING BEE CLASSROOM GAMES ARENA       */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#560e51] via-[#75166f] to-[#9b2c98] text-white rounded-[32px] p-6 sm:p-8 border-4 border-[#78c222] shadow-[6px_6px_0px_0px_#560e51] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black uppercase font-mono bg-[#78c222] text-[#560e51] px-3.5 py-1 rounded-full border-2 border-white shadow-sm flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4" /> English 1 Games Arena
              </span>
              <span className="text-xs font-black uppercase font-mono bg-white/20 text-white px-3 py-1 rounded-full border border-white/40">
                Puspresnas Recognized · Jakarta Final
              </span>
              <span className="text-xs font-black uppercase font-mono bg-amber-400 text-slate-950 px-3 py-1 rounded-full border border-amber-300">
                {MEETING_LEARNED_CARDS.length} Meeting 3 Cards 🃏
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              Classroom Games & Word Cards Arena 🐝✨
            </h2>

            <p className="text-xs sm:text-sm text-fuchsia-100 font-bold leading-relaxed">
              Play authentic classroom games with interactive cards of the <strong>Latin, French, Greek, German, Italian, Spanish, and Homophone words</strong> learned in this meeting. Aligned with the <strong>English 1 National Spelling Bee Competition</strong> format & "Say – Spell – Say" stage protocol!
            </p>
          </div>

          {/* Live Classroom Scoreboard */}
          <div className="bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-4 flex items-center gap-5 shrink-0 shadow-lg">
            <div className="text-center">
              <span className="text-[11px] font-mono font-black text-amber-300 block uppercase">
                🐝 Honeybees (Team A)
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {teamScores.teamA} pts
              </span>
              <div className="flex gap-1 justify-center mt-1">
                <button
                  onClick={() => handleAwardTeam('A', 10)}
                  className="px-2 py-0.5 bg-[#78c222] text-[#560e51] text-[10px] font-black rounded border border-white cursor-pointer hover:bg-lime-400"
                >
                  +10
                </button>
              </div>
            </div>

            <div className="h-10 w-px bg-white/30" />

            <div className="text-center">
              <span className="text-[11px] font-mono font-black text-fuchsia-200 block uppercase">
                ✨ Spellbinders (Team B)
              </span>
              <span className="text-2xl sm:text-3xl font-black text-white">
                {teamScores.teamB} pts
              </span>
              <div className="flex gap-1 justify-center mt-1">
                <button
                  onClick={() => handleAwardTeam('B', 10)}
                  className="px-2 py-0.5 bg-[#78c222] text-[#560e51] text-[10px] font-black rounded border border-white cursor-pointer hover:bg-lime-400"
                >
                  +10
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Game Mode Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-6 pt-4 border-t border-white/20">
          <button
            onClick={() => { setActiveGameTab('say-spell-say'); sound.playClick(); }}
            className={`p-3 rounded-2xl font-black text-xs uppercase tracking-tight border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              activeGameTab === 'say-spell-say'
                ? 'bg-[#78c222] text-[#560e51] border-white shadow-[3px_3px_0px_0px_white]'
                : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>1. Say-Spell-Say</span>
            <span className="text-[10px] font-mono opacity-80">Stage Duel</span>
          </button>

          <button
            onClick={() => { setActiveGameTab('tournament-arena'); sound.playClick(); }}
            className={`p-3 rounded-2xl font-black text-xs uppercase tracking-tight border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              activeGameTab === 'tournament-arena'
                ? 'bg-[#78c222] text-[#560e51] border-white shadow-[3px_3px_0px_0px_white]'
                : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>2. 3-Round Tournament</span>
            <span className="text-[10px] font-mono opacity-80">Prelim · Semi · Final</span>
          </button>

          <button
            onClick={() => { setActiveGameTab('memory-match'); sound.playClick(); }}
            className={`p-3 rounded-2xl font-black text-xs uppercase tracking-tight border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              activeGameTab === 'memory-match'
                ? 'bg-[#78c222] text-[#560e51] border-white shadow-[3px_3px_0px_0px_white]'
                : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>3. Origin Memory</span>
            <span className="text-[10px] font-mono opacity-80">16 Card Grid</span>
          </button>

          <button
            onClick={() => { setActiveGameTab('open-box'); sound.playClick(); }}
            className={`p-3 rounded-2xl font-black text-xs uppercase tracking-tight border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              activeGameTab === 'open-box'
                ? 'bg-[#78c222] text-[#560e51] border-white shadow-[3px_3px_0px_0px_white]'
                : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>4. 30 Mystery Boxes</span>
            <span className="text-[10px] font-mono opacity-80">Wordwall</span>
          </button>

          <button
            onClick={() => { setActiveGameTab('card-deck'); sound.playClick(); }}
            className={`p-3 rounded-2xl font-black text-xs uppercase tracking-tight border-2 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
              activeGameTab === 'card-deck'
                ? 'bg-[#78c222] text-[#560e51] border-white shadow-[3px_3px_0px_0px_white]'
                : 'bg-white/10 text-white hover:bg-white/20 border-white/30'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>5. Printable Deck</span>
            <span className="text-[10px] font-mono opacity-80">42 Cards Gallery</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* GAME 1: ENGLISH 1 "SAY – SPELL – SAY" CARD SHOWDOWN                       */}
      {/* ========================================================================= */}
      {activeGameTab === 'say-spell-say' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Category & Group Filter Bar */}
          <div className="bg-white rounded-3xl p-5 border-4 border-[#560e51] shadow-[5px_5px_0px_0px_#560e51] space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">English 1 Stage Filter</span>
                <h3 className="text-lg font-black text-slate-900 uppercase">
                  Select Card Deck of Words Learned in This Meeting
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Grade Group Toggle */}
                <div className="flex bg-stone-100 p-1 rounded-xl border border-stone-300">
                  <button
                    onClick={() => { setCardGroupFilter('all'); sound.playClick(); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${cardGroupFilter === 'all' ? 'bg-[#560e51] text-white font-black' : 'text-stone-600'}`}
                  >
                    All Groups
                  </button>
                  <button
                    onClick={() => { setCardGroupFilter('Group B'); sound.playClick(); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${cardGroupFilter === 'Group B' ? 'bg-[#78c222] text-[#560e51] font-black' : 'text-stone-600'}`}
                  >
                    Group B (Gr. 3–4)
                  </button>
                  <button
                    onClick={() => { setCardGroupFilter('Group C'); sound.playClick(); }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${cardGroupFilter === 'Group C' ? 'bg-[#9b2c98] text-white font-black' : 'text-stone-600'}`}
                  >
                    Group C (Gr. 5–6)
                  </button>
                </div>

                <button
                  onClick={handleShuffleCards}
                  className="px-3.5 py-1.5 bg-[#fdf2fe] hover:bg-fuchsia-100 text-[#560e51] font-black text-xs uppercase rounded-xl border border-fuchsia-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Shuffle</span>
                </button>
                <button
                  onClick={() => setHideSpellingMode(!hideSpellingMode)}
                  className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-black text-xs uppercase rounded-xl border border-amber-300 flex items-center gap-1.5 cursor-pointer"
                >
                  {hideSpellingMode ? <EyeOff className="w-3.5 h-3.5 text-amber-600" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
                  <span>{hideSpellingMode ? 'Contest Mode' : 'Study Mode'}</span>
                </button>
              </div>
            </div>

            {/* Language Origin Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { id: 'all', label: 'All Meeting Cards', count: MEETING_LEARNED_CARDS.length, flag: '🃏' },
                { id: 'latin', label: 'Latin', count: MEETING_LEARNED_CARDS.filter(c => c.originCategory === 'latin').length, flag: '🏛️' },
                { id: 'french', label: 'French', count: MEETING_LEARNED_CARDS.filter(c => c.originCategory === 'french').length, flag: '🥐' },
                { id: 'greek', label: 'Greek', count: MEETING_LEARNED_CARDS.filter(c => c.originCategory === 'greek').length, flag: '🏺' },
                { id: 'german', label: 'German', count: MEETING_LEARNED_CARDS.filter(c => c.originCategory === 'german').length, flag: '🥨' },
                { id: 'italian', label: 'Italian', count: MEETING_LEARNED_CARDS.filter(c => c.originCategory === 'italian').length, flag: '🎻' },
                { id: 'spanish', label: 'Spanish', count: MEETING_LEARNED_CARDS.filter(c => c.originCategory === 'spanish').length, flag: '🌮' },
                { id: 'homophone', label: 'Homophones', count: MEETING_LEARNED_CARDS.filter(c => c.originCategory === 'homophone').length, flag: '⚖️' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCardCategoryFilter(cat.id);
                    setCurrentCardIndex(0);
                    sound.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer flex items-center gap-1.5 ${
                    cardCategoryFilter === cat.id
                      ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300'
                  }`}
                >
                  <span>{cat.flag}</span>
                  <span>{cat.label}</span>
                  <span className="text-[10px] font-mono opacity-80">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Word Card Stage */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 border-4 border-[#560e51] shadow-[8px_8px_0px_0px_#560e51] space-y-6">
            
            {/* Top Bar of the Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-stone-200 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentCard.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                      Card #{currentCardIndex + 1} of {filteredCards.length}
                    </span>
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#78c222] text-[#560e51] rounded-full border border-[#560e51]">
                      {currentCard.group}
                    </span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-slate-800">
                    {currentCard.origin}
                  </h4>
                </div>
              </div>

              {/* 30-Second Classroom Buzzer Timer */}
              <div className="flex items-center gap-2">
                <div className={`px-4 py-2 rounded-xl border-2 font-mono font-black text-sm flex items-center gap-2 ${
                  timerSeconds <= 5 && isTimerRunning
                    ? 'bg-rose-100 border-rose-500 text-rose-700 animate-pulse'
                    : 'bg-amber-50 border-amber-300 text-amber-950'
                }`}>
                  <Timer className="w-4 h-4 text-amber-600" />
                  <span>{timerSeconds}s (English 1 Clock)</span>
                </div>
                {!isTimerRunning ? (
                  <button
                    onClick={handleStartTimer}
                    className="px-3.5 py-2 bg-[#560e51] text-[#78c222] hover:bg-[#43093f] font-black text-xs uppercase rounded-xl border border-[#560e51] cursor-pointer"
                  >
                    Start 30s
                  </button>
                ) : (
                  <button
                    onClick={() => setIsTimerRunning(false)}
                    className="px-3.5 py-2 bg-stone-200 text-stone-800 hover:bg-stone-300 font-black text-xs uppercase rounded-xl border border-stone-300 cursor-pointer"
                  >
                    Pause
                  </button>
                )}
              </div>
            </div>

            {/* Central Animated Flash Card */}
            <div className="p-6 sm:p-8 rounded-[28px] bg-[#fefaf0] border-3 border-[#560e51] shadow-[5px_5px_0px_0px_#560e51] text-center space-y-4 relative">
              
              {/* Pronouncer Delivery Bar */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => humanVoice.speakWord(currentCard.word)}
                  className="px-4 py-2.5 bg-[#560e51] text-[#78c222] hover:bg-[#43093f] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] cursor-pointer flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Pronounce Word</span>
                </button>
                
                <button
                  onClick={handlePlayPronouncer3Step}
                  className="px-4 py-2.5 bg-[#78c222] text-[#560e51] hover:bg-lime-400 font-black text-xs uppercase rounded-xl border-2 border-[#560e51] cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>English 1 Full 3-Step (Word ➔ Sentence ➔ Word)</span>
                </button>
              </div>

              {/* Word Display (Hidden in Contest Mode unless revealed) */}
              <div>
                {(!hideSpellingMode || isCardFlipped) ? (
                  <motion.h3 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-serif font-black uppercase text-slate-950 tracking-wide mt-2"
                  >
                    {currentCard.word}
                  </motion.h3>
                ) : (
                  <div className="py-4">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-stone-400 tracking-widest bg-stone-100 px-6 py-3 rounded-2xl border-2 border-dashed border-stone-300">
                      • • • • • • •
                    </span>
                    <p className="text-xs font-bold text-stone-500 mt-2">
                      Contest Mode active: Word hidden for stage speller. Say word, spell, and say word again!
                    </p>
                  </div>
                )}

                <p className="text-sm font-mono font-bold text-slate-500 mt-1">
                  {currentCard.pronunciation} · <span className="italic">{currentCard.partOfSpeech}</span>
                </p>
              </div>

              {/* Clarifying Questions Bar (Official English 1 Inquiries) */}
              <div className="pt-1">
                <span className="text-[10px] font-mono font-black uppercase text-amber-900 block mb-1">
                  Permitted Speller Clarifying Inquiries (Click to Ask Pronouncer):
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <button
                    onClick={() => handleAskInquiry('repeat')}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-stone-800 text-[11px] font-bold rounded-lg border border-amber-300 cursor-pointer"
                  >
                    "Repeat word?"
                  </button>
                  <button
                    onClick={() => handleAskInquiry('definition')}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-stone-800 text-[11px] font-bold rounded-lg border border-amber-300 cursor-pointer"
                  >
                    "Definition?"
                  </button>
                  <button
                    onClick={() => handleAskInquiry('sentence')}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-stone-800 text-[11px] font-bold rounded-lg border border-amber-300 cursor-pointer"
                  >
                    "Sentence?"
                  </button>
                  <button
                    onClick={() => handleAskInquiry('part')}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-stone-800 text-[11px] font-bold rounded-lg border border-amber-300 cursor-pointer"
                  >
                    "Part of speech?"
                  </button>
                  <button
                    onClick={() => handleAskInquiry('origin')}
                    className="px-2.5 py-1 bg-white hover:bg-amber-100 text-stone-800 text-[11px] font-bold rounded-lg border border-amber-300 cursor-pointer"
                  >
                    "Language of origin?"
                  </button>
                </div>

                {activeClueMessage && (
                  <div className="mt-2 p-2 bg-amber-100 rounded-xl text-xs font-bold text-amber-950 border border-amber-300 animate-fadeIn">
                    📢 {activeClueMessage}
                  </div>
                )}
              </div>

              {/* Clues Box */}
              <div className="max-w-2xl mx-auto bg-white p-4 rounded-2xl border border-amber-200 text-left space-y-2">
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  <strong>📖 Definition:</strong> "{currentCard.definition}"
                </p>
                <p className="text-xs font-medium text-slate-600 italic">
                  <strong>💬 Sentence:</strong> "{currentCard.sentence}"
                </p>
                <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-300 text-xs font-mono font-bold text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-black text-amber-900 block">💡 Orthographic Clue:</span>
                    {currentCard.spellingClue}
                  </div>
                  {currentCard.syllables && (
                    <span className="text-[11px] font-mono bg-white px-2 py-1 rounded border border-amber-300 text-purple-900 shrink-0">
                      Syllables: {currentCard.syllables}
                    </span>
                  )}
                </div>
              </div>

              {/* English 1 "Say – Spell – Say" Interactive Speller Track */}
              <div className="max-w-xl mx-auto pt-2 bg-purple-50/80 p-4 rounded-2xl border-2 border-purple-200 space-y-3">
                <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                  <span className="text-xs font-mono font-black uppercase text-[#560e51] flex items-center gap-1.5">
                    <Mic className="w-4 h-4 text-[#78c222]" /> English 1 Say-Spell-Say Protocol
                  </span>
                  <div className="flex gap-2 text-[10px] font-mono font-black">
                    <span className={`px-2 py-0.5 rounded ${spellerHasSaidFirst ? 'bg-emerald-500 text-white' : 'bg-stone-200 text-stone-600'}`}>
                      1. Say
                    </span>
                    <span className={`px-2 py-0.5 rounded ${spellerHasSpelled ? 'bg-emerald-500 text-white' : 'bg-stone-200 text-stone-600'}`}>
                      2. Spell
                    </span>
                    <span className={`px-2 py-0.5 rounded ${spellerHasSaidLast ? 'bg-emerald-500 text-white' : 'bg-stone-200 text-stone-600'}`}>
                      3. Say Again
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      setSpellerHasSaidFirst(true);
                      sound.playLetterKey();
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-black uppercase border transition-all cursor-pointer ${
                      spellerHasSaidFirst ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    ✓ 1. Speller Pronounced Word
                  </button>

                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={spellerInput}
                      onChange={e => setSpellerInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handleCheckSpellerInput(); }}
                      placeholder="Type letters out loud..."
                      className="flex-1 px-4 py-2 rounded-xl border-2 border-[#560e51] font-mono font-bold text-sm text-slate-900 uppercase focus:outline-none"
                    />
                    <button
                      onClick={handleCheckSpellerInput}
                      className="px-4 py-2 bg-[#78c222] hover:bg-lime-400 text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] cursor-pointer"
                    >
                      3. Lock In & Say
                    </button>
                  </div>
                </div>

                {cardFeedback && (
                  <div className={`p-3 rounded-xl text-xs font-black uppercase font-mono ${
                    cardFeedback === 'correct'
                      ? 'bg-emerald-100 text-emerald-900 border-2 border-emerald-500'
                      : 'bg-rose-100 text-rose-900 border-2 border-rose-500'
                  }`}>
                    {cardFeedback === 'correct' ? (
                      <div className="flex items-center justify-between">
                        <span>✓ Correct! Speller advances to the next stage round!</span>
                        <span className="text-[11px] bg-emerald-200 px-2 py-0.5 rounded text-emerald-900">+{currentCard.points} Pts</span>
                      </div>
                    ) : (
                      <div>
                        <span>✗ Incorrect! Judge announcement: The correct spelling is <strong>{currentCard.word.toUpperCase()}</strong>.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls & Team Award Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevCard}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-xs uppercase rounded-xl border border-stone-300 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev Card</span>
                </button>
                <button
                  onClick={handleNextCard}
                  className="px-5 py-2.5 bg-[#560e51] hover:bg-[#43093f] text-[#78c222] font-black text-xs uppercase rounded-xl border border-[#560e51] cursor-pointer flex items-center gap-1"
                >
                  <span>Next Card</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Award Points Directly to Active Team */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black uppercase text-stone-500">Award:</span>
                <button
                  onClick={() => handleAwardTeam('A', currentCard.points)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase rounded-xl border border-amber-600 shadow-sm cursor-pointer"
                >
                  🐝 Team A (+{currentCard.points})
                </button>
                <button
                  onClick={() => handleAwardTeam('B', currentCard.points)}
                  className="px-4 py-2 bg-[#9b2c98] hover:bg-[#852282] text-white font-black text-xs uppercase rounded-xl border border-[#560e51] shadow-sm cursor-pointer"
                >
                  ✨ Team B (+{currentCard.points})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAME 2: ENGLISH 1 TOURNAMENT 3-ROUND SIMULATOR                            */}
      {/* ========================================================================= */}
      {activeGameTab === 'tournament-arena' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            
            {/* Header */}
            <div className="border-b-2 border-fuchsia-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                  Official English 1 National Competition Arena
                </span>
                <h3 className="text-2xl font-black text-slate-900 uppercase">
                  3-Round Tournament Simulator 🏛️
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                  Experience the three authentic rounds of the English 1 National Spelling Bee: Preliminary Written Test ➔ Semifinal Speed Dictation ➔ Jakarta Grand Final Spoken Stage!
                </p>
              </div>

              {/* Round Switcher */}
              <div className="flex bg-[#fdf2fe] p-1.5 rounded-2xl border-2 border-[#560e51] gap-1 shrink-0">
                <button
                  onClick={() => { setTournamentRound('round1-prelim'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase cursor-pointer ${
                    tournamentRound === 'round1-prelim' ? 'bg-[#78c222] text-[#560e51]' : 'text-stone-600'
                  }`}
                >
                  1. Prelims (Written)
                </button>
                <button
                  onClick={() => { setTournamentRound('round2-semifinal'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase cursor-pointer ${
                    tournamentRound === 'round2-semifinal' ? 'bg-[#560e51] text-white' : 'text-stone-600'
                  }`}
                >
                  2. Semifinal (Speed)
                </button>
                <button
                  onClick={() => { setTournamentRound('round3-final'); sound.playClick(); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase cursor-pointer ${
                    tournamentRound === 'round3-final' ? 'bg-[#9b2c98] text-white' : 'text-stone-600'
                  }`}
                >
                  3. Jakarta Final (Spoken)
                </button>
              </div>
            </div>

            {/* ROUND 1: PRELIMINARY ROUND */}
            {tournamentRound === 'round1-prelim' && (
              <div className="p-6 rounded-2xl bg-amber-50/70 border-3 border-amber-300 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-amber-400 text-slate-950 text-xs font-black uppercase rounded-lg">
                      Round 1: Preliminary Written Test
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-900">
                      Word {prelimQuestionIdx + 1} of {prelimCards.length}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-600">
                    Score: {Object.values(prelimScores).filter(Boolean).length} / {prelimCards.length}
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-amber-300 text-center space-y-3">
                  <button
                    onClick={() => humanVoice.speakWord(prelimCards[prelimQuestionIdx].word)}
                    className="px-6 py-3 bg-[#560e51] text-[#78c222] font-black text-xs uppercase rounded-xl border border-[#560e51] cursor-pointer inline-flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" /> Listen to Dictation Word
                  </button>
                  <p className="text-xs font-bold text-slate-600">
                    Definition: "{prelimCards[prelimQuestionIdx].definition}"
                  </p>

                  <div className="max-w-md mx-auto flex gap-2">
                    <input
                      type="text"
                      value={prelimUserInput}
                      onChange={e => setPrelimUserInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') handlePrelimSubmitWord(); }}
                      placeholder="Write the dictated spelling..."
                      className="flex-1 px-4 py-2 rounded-xl border-2 border-amber-400 font-mono font-bold text-sm uppercase focus:outline-none"
                    />
                    <button
                      onClick={handlePrelimSubmitWord}
                      className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase rounded-xl border border-amber-600 cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ROUND 2: SEMIFINAL ROUND */}
            {tournamentRound === 'round2-semifinal' && (
              <div className="p-6 rounded-2xl bg-purple-50 border-3 border-purple-300 space-y-4 text-center">
                <span className="px-3 py-1 bg-[#560e51] text-white text-xs font-black uppercase rounded-full">
                  Round 2: Semifinal Written Dictation & Speed Relay
                </span>
                <p className="text-xs sm:text-sm font-bold text-purple-950 max-w-xl mx-auto">
                  Semifinalists must listen to 5 advanced words from this meeting under a strict 15-second time limit per word. Click each word below to drill speed dictation with your classroom teams!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
                  {semiCards.map((c, idx) => (
                    <div key={c.id} className="p-4 bg-white rounded-2xl border-2 border-purple-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-purple-800">#{idx + 1} · {c.originCategory.toUpperCase()}</span>
                        <span className="text-lg">{c.flag}</span>
                      </div>
                      <button
                        onClick={() => humanVoice.speakWord(c.word)}
                        className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-[#560e51] font-black text-xs uppercase rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Listen to Audio
                      </button>
                      <p className="text-[11px] font-bold text-slate-600 truncate">{c.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ROUND 3: JAKARTA GRAND FINAL ROUND */}
            {tournamentRound === 'round3-final' && (
              <div className="p-6 rounded-2xl bg-[#2a1735] text-white border-3 border-[#78c222] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-800 pb-3">
                  <div>
                    <span className="text-xs font-mono font-black uppercase text-amber-400">
                      National Grand Final · Jakarta Stage
                    </span>
                    <h4 className="text-xl font-black uppercase text-white">
                      Oral Stage Mic Duel & 2-Speller End Game
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-purple-300">Turn:</span>
                    <button
                      onClick={() => setFinalDuelTurn(finalDuelTurn === 'A' ? 'B' : 'A')}
                      className={`px-3 py-1 rounded-xl text-xs font-black uppercase cursor-pointer ${
                        finalDuelTurn === 'A' ? 'bg-amber-400 text-slate-950' : 'bg-[#78c222] text-[#560e51]'
                      }`}
                    >
                      {finalDuelTurn === 'A' ? '🐝 Team A at Mic' : '✨ Team B at Mic'}
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-purple-900/60 rounded-2xl border border-purple-700 text-center space-y-3">
                  <span className="text-3xl">🎙️</span>
                  <p className="text-sm font-bold text-purple-200">
                    Speller steps up to the microphone in front of the English 1 Board of Judges.
                  </p>
                  <p className="text-xs text-amber-300 font-mono">
                    "2-Speller Rule: If Speller 1 misspells, Speller 2 must spell that word correctly PLUS one additional Championship Word to win!"
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={() => handleAwardTeam(finalDuelTurn, 25)}
                      className="px-5 py-2.5 bg-[#78c222] hover:bg-lime-400 text-[#560e51] font-black text-xs uppercase rounded-xl cursor-pointer"
                    >
                      ✓ Correct (Spelled & Advances)
                    </button>
                    <button
                      onClick={() => {
                        sound.playWrong();
                        setFinalDuelStatus('Judge announced Incorrect! Challenge word passes to rival finalist!');
                      }}
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase rounded-xl cursor-pointer"
                    >
                      ✗ Incorrect (Sudden Death)
                    </button>
                  </div>
                  <p className="text-xs font-mono text-stone-300 pt-1">{finalDuelStatus}</p>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAME 3: ETYMOLOGY & ORIGIN MEMORY MATCH (16 CARD FLIP)                     */}
      {/* ========================================================================= */}
      {activeGameTab === 'memory-match' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-stone-200 pb-4">
              <div>
                <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                  Tactile Classroom Card Game
                </span>
                <h3 className="text-2xl font-black text-slate-900 uppercase">
                  Etymology Origin Memory Match 🃏✨
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                  Flip cards to match each competition word learned today with its origin language and meaning!
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-black text-[#560e51] bg-fuchsia-100 px-3 py-1.5 rounded-xl border border-fuchsia-300">
                  Matches: {memoryMatchesCount} / 8 Pairs
                </span>
                <button
                  onClick={initMemoryGame}
                  className="px-3.5 py-1.5 bg-[#78c222] text-[#560e51] font-black text-xs uppercase rounded-xl border border-[#560e51] flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset Cards
                </button>
              </div>
            </div>

            {/* 16-Tile Memory Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {memoryTiles.map((tile, idx) => (
                <button
                  key={tile.uniqueId}
                  onClick={() => handleTileClick(idx)}
                  className={`h-28 sm:h-32 p-3 rounded-2xl border-3 font-bold text-xs transition-all cursor-pointer flex flex-col items-center justify-center text-center relative ${
                    tile.isMatched
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 opacity-90 scale-95'
                      : tile.isFlipped
                      ? 'bg-[#fefaf0] border-[#560e51] text-slate-950 shadow-[3px_3px_0px_0px_#560e51]'
                      : 'bg-gradient-to-br from-[#560e51] to-[#75166f] border-[#78c222] text-white hover:opacity-95 shadow-[3px_3px_0px_0px_#560e51]'
                  }`}
                >
                  {tile.isFlipped || tile.isMatched ? (
                    <div className="space-y-1">
                      <span className="text-xl">{tile.flag}</span>
                      <p className={`font-black uppercase tracking-tight ${tile.type === 'word' ? 'text-sm text-purple-950' : 'text-xs text-slate-800'}`}>
                        {tile.content}
                      </p>
                      {tile.isMatched && (
                        <span className="text-[10px] font-mono text-emerald-700 font-bold block">✓ MATCH!</span>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <span className="text-2xl">🐝</span>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-fuchsia-200 block">
                        Tap Card #{idx + 1}
                      </span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Match Complete Fanfare */}
            {memoryMatchesCount === 8 && (
              <div className="p-6 bg-[#f3f9eb] rounded-2xl border-3 border-[#78c222] text-center space-y-2 animate-fadeIn">
                <span className="text-3xl">🎉</span>
                <h4 className="text-xl font-black text-[#560e51] uppercase">
                  Classroom Etymology Grid Completed!
                </h4>
                <p className="text-xs font-bold text-slate-700">
                  Outstanding work decoding Latin, French, Greek, German, Italian, and Spanish patterns!
                </p>
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={() => handleAwardTeam('A', 20)}
                    className="px-4 py-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase rounded-xl border border-amber-600 cursor-pointer"
                  >
                    Award Team A (+20)
                  </button>
                  <button
                    onClick={() => handleAwardTeam('B', 20)}
                    className="px-4 py-1.5 bg-[#9b2c98] text-white font-black text-xs uppercase rounded-xl border border-[#560e51] cursor-pointer"
                  >
                    Award Team B (+20)
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAME 4: 30 MYSTERY BOXES (WORDWALL STYLE)                                  */}
      {/* ========================================================================= */}
      {activeGameTab === 'open-box' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#2a1735] text-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-800 pb-4">
              <div>
                <span className="text-xs font-mono font-black uppercase text-amber-400">
                  Interactive Wordwall Activity
                </span>
                <h3 className="text-2xl font-black text-white uppercase">
                  30 Mystery Boxes Word Challenge 📦✨
                </h3>
                <p className="text-xs sm:text-sm font-bold text-purple-200 mt-1">
                  Boxes 1–15: Group B Foundations · Boxes 16–30: Group C & Championship Arsenal!
                </p>
              </div>

              <span className="text-xs font-mono font-black text-amber-300 bg-purple-900/80 px-3 py-1.5 rounded-xl border border-purple-700">
                Opened: {openedBoxes.length} / 30 Boxes
              </span>
            </div>

            {/* 30 Box Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 sm:gap-2.5">
              {OPEN_THE_BOX_30.map((box, idx) => {
                const boxId = box.boxNumber ?? box.id ?? (idx + 1);
                const isOpened = openedBoxes.includes(boxId);
                return (
                  <button
                    key={boxId}
                    onClick={() => handleOpenBox(box)}
                    className={`h-16 sm:h-20 rounded-2xl border-2 font-mono font-black text-sm sm:text-base transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isOpened
                        ? 'bg-[#78c222] border-white text-[#560e51] shadow-inner scale-95'
                        : 'bg-purple-900/80 hover:bg-purple-800 border-purple-500 text-white shadow-md'
                    }`}
                  >
                    <span>{isOpened ? '✓' : boxId}</span>
                    <span className="text-[9px] uppercase font-sans font-bold opacity-80">
                      {isOpened ? 'Open' : `${box.points}p`}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Box Details Modal / Drawer */}
            {selectedBox && (
              <div className="p-6 bg-white text-slate-900 rounded-2xl border-3 border-[#78c222] shadow-xl space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between border-b pb-2 border-stone-200">
                  <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                    Box #{selectedBox.boxNumber ?? selectedBox.id ?? 1} · {selectedBox.level} · {selectedBox.points} Points
                  </span>
                  <button
                    onClick={() => humanVoice.speakWord(selectedBox.word)}
                    className="px-3 py-1 bg-[#560e51] text-[#78c222] rounded-lg text-xs font-black uppercase flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Listen
                  </button>
                </div>

                <div className="text-center py-2">
                  <h4 className="text-3xl sm:text-4xl font-serif font-black uppercase text-purple-950">
                    {selectedBox.word}
                  </h4>
                  <p className="text-xs font-mono text-slate-500 mt-1">{selectedBox.hint}</p>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-xs font-bold text-amber-950 space-y-1">
                  <p><strong>📖 Definition:</strong> "{selectedBox.definition}"</p>
                  <p className="italic"><strong>💬 Sentence:</strong> "{selectedBox.sentence}"</p>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleAwardTeam('A', selectedBox.points)}
                    className="px-4 py-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase rounded-xl border border-amber-600 cursor-pointer"
                  >
                    Award Team A (+{selectedBox.points})
                  </button>
                  <button
                    onClick={() => handleAwardTeam('B', selectedBox.points)}
                    className="px-4 py-1.5 bg-[#9b2c98] text-white font-black text-xs uppercase rounded-xl border border-[#560e51] cursor-pointer"
                  >
                    Award Team B (+{selectedBox.points})
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GAME 5: PRINTABLE & PROJECTABLE CLASSROOM CARD DECK                        */}
      {/* ========================================================================= */}
      {activeGameTab === 'card-deck' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-stone-200 pb-4">
              <div>
                <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                  Teacher Classroom Projection & Take-Home Cards
                </span>
                <h3 className="text-2xl font-black text-slate-900 uppercase">
                  Classroom Word Cards Gallery (Meeting 3) 📖
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 mt-1">
                  Full deck of all 42 words studied today. Project on the classroom screen, flip cards, or print take-home study sheets!
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setAllFlipped(!allFlipped)}
                  className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-black text-xs uppercase rounded-xl border border-stone-300 cursor-pointer"
                >
                  {allFlipped ? 'Hide All Words' : 'Reveal All Words'}
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#78c222] hover:bg-lime-400 text-[#560e51] font-black text-xs uppercase rounded-xl border-2 border-[#560e51] flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Printer className="w-4 h-4" /> Print Deck
                </button>
              </div>
            </div>

            {/* Search filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-purple-700 absolute left-3.5 top-3" />
              <input
                type="text"
                value={deckSearch}
                onChange={e => setDeckSearch(e.target.value)}
                placeholder="Search card by word, origin, or definition..."
                className="w-full pl-10 pr-4 py-2 bg-stone-50 border-2 border-stone-300 rounded-xl text-xs font-bold font-mono focus:outline-none focus:border-[#560e51]"
              />
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {deckFilteredCards.map((card, idx) => (
                <div
                  key={card.id}
                  className="p-5 rounded-2xl border-3 border-[#560e51] bg-[#fefaf0] space-y-3 shadow-[3px_3px_0px_0px_#560e51] flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{card.flag}</span>
                      <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#78c222] text-[#560e51] rounded-full border border-[#560e51]">
                        {card.group}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-serif font-black uppercase text-purple-950">
                          {allFlipped ? card.word : `${idx + 1}. ${card.word}`}
                        </h4>
                        <button
                          onClick={() => humanVoice.speakWord(card.word)}
                          className="p-1.5 text-purple-900 hover:text-purple-600 rounded cursor-pointer"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] font-mono text-slate-500 font-bold">{card.pronunciation}</p>
                    </div>

                    <p className="text-xs font-bold text-slate-700 leading-relaxed">
                      {card.definition}
                    </p>

                    <p className="text-[11px] font-medium text-slate-600 italic">
                      "{card.sentence}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-amber-200">
                    <span className="text-[10px] font-mono font-bold text-amber-900 block truncate">
                      💡 {card.spellingClue}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
