import React, { useState } from 'react';
import { 
  Globe, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ChevronRight, 
  Scale, 
  BookOpen, 
  Lightbulb, 
  HelpCircle,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Search,
  Shuffle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { sound } from './SoundManager';
import { humanVoice } from '../utils/humanVoice';

interface OriginPatternDetectiveProps {
  onAwardTeamScore?: (team: 'A' | 'B', pts: number) => void;
  onNavigateTab?: (destination: string) => void;
  genAlphaMode?: boolean;
}

interface OriginRuleItem {
  ruleNumber: number;
  title: string;
  pattern: string;
  soundDescription: string;
  examples: {
    word: string;
    ipa: string;
    meaning: string;
    clue: string;
  }[];
  spellingTrap: string;
}

export type OriginLanguageId = 
  | 'latin' 
  | 'french' 
  | 'german' 
  | 'greek' 
  | 'italian' 
  | 'spanish' 
  | 'arabic' 
  | 'homophones';

interface OriginLanguageGuide {
  id: OriginLanguageId;
  name: string;
  flag: string;
  subtitle: string;
  colorScheme: {
    bg: string;
    border: string;
    badge: string;
    accent: string;
  };
  rules: OriginRuleItem[];
}

export const COMPREHENSIVE_ORIGIN_GUIDES: OriginLanguageGuide[] = [
  // ==========================================
  // 1. LATIN PATTERNS (The #1 Champion Foundation)
  // ==========================================
  {
    id: 'latin',
    name: 'Latin Patterns',
    flag: '🏛️',
    subtitle: 'The Grand Master of Academic English: Assimilated Prefixes, Double Consonants & Suffix Logic',
    colorScheme: {
      bg: 'bg-amber-50/60',
      border: 'border-amber-400',
      badge: 'bg-amber-100 text-amber-950',
      accent: 'text-amber-900'
    },
    rules: [
      {
        ruleNumber: 1,
        title: 'Prefix Assimilation (The Secret to Double Consonants)',
        pattern: 'Latin prefixes (ad-, sub-, con-, in-, ob-, dis-) absorb into the root, creating double consonants',
        soundDescription: 'The first consonant changes to match the root’s starting letter!',
        examples: [
          { word: 'attract', ipa: '/əˈtrækt/', meaning: 'Draw toward oneself', clue: 'ad- + tract -> attract (ad- becomes at-)' },
          { word: 'support', ipa: '/səˈpɔːrt/', meaning: 'Bear the weight of or give assistance', clue: 'sub- + port -> support (sub- becomes sup-)' },
          { word: 'collaborate', ipa: '/kəˈlæb.ə.reɪt/', meaning: 'Work jointly with others on an activity', clue: 'con- + laborare -> collaborate (con- becomes col-)' },
          { word: 'immature', ipa: '/ˌɪm.əˈtjʊər/', meaning: 'Not fully developed or grown', clue: 'in- + mature -> immature (in- becomes im- before m)' },
          { word: 'oppose', ipa: '/əˈpoʊz/', meaning: 'Disapprove of or stand in resistance to', clue: 'ob- + pose -> oppose (ob- becomes op-)' },
          { word: 'accurate', ipa: '/ˈæk.jər.ət/', meaning: 'Correct in all details; exact', clue: 'ad- + cure -> accurate (ad- becomes ac-)' }
        ],
        spellingTrap: 'Whenever you wonder why a Latin academic word has double consonants, ask: "Is it an absorbed prefix?"!'
      },
      {
        ruleNumber: 2,
        title: 'Suffix Dilemma: "-able" vs "-ible"',
        pattern: '1st conjugation Latin verbs take "-able", while 2nd/3rd/4th conjugation verbs take "-ible"',
        soundDescription: 'Both sound like /ə.bəl/ — etymology dictates the vowel!',
        examples: [
          { word: 'adaptable', ipa: '/əˈdæp.tə.bəl/', meaning: 'Able to adjust to new conditions', clue: 'Base adapt can stand as an English word -> uses -able' },
          { word: 'durable', ipa: '/ˈdjʊər.ə.bəl/', meaning: 'Able to withstand wear, pressure, or damage', clue: 'From Latin durare (1st conj) -> -able' },
          { word: 'credible', ipa: '/ˈkrɛd.ə.bəl/', meaning: 'Able to be believed; convincing', clue: 'From Latin credere (3rd conj) -> -ible' },
          { word: 'audible', ipa: '/ˈɔː.də.bəl/', meaning: 'Able to be heard distinctly', clue: 'From Latin audire (4th conj) -> -ible' },
          { word: 'tangible', ipa: '/ˈtæn.dʒə.bəl/', meaning: 'Perceptible by touch; clear and definite', clue: 'From Latin tangere (3rd conj) -> -ible' }
        ],
        spellingTrap: 'Golden Rule: If the root can stand as a complete English base word (adapt -> adaptable), choose -able! If the root is incomplete (cred -> credible, aud -> audible), choose -ible!'
      },
      {
        ruleNumber: 3,
        title: 'Soft "c" (/s/) and Soft "g" (/dʒ/) Before e, i, y',
        pattern: 'Latin "c" sounds like /s/ and "g" sounds like /dʒ/ before soft vowels (e, i, y)',
        soundDescription: 'Hard before a, o, u; soft before e, i, y!',
        examples: [
          { word: 'circuit', ipa: '/ˈsɜːr.kɪt/', meaning: 'A roughly circular line, route, or movement', clue: 'First c is /s/ before i; second c is /k/ before u: c-i-r-c-u-i-t' },
          { word: 'fragile', ipa: '/ˈfrædʒ.aɪl/', meaning: 'Easily broken or damaged', clue: '"g" before "i" makes the soft /dʒ/ sound' },
          { word: 'deciduous', ipa: '/dɪˈsɪdʒ.u.əs/', meaning: 'Shedding leaves annually in autumn', clue: '"c" before "i" makes /s/: d-e-c-i-d-u-o-u-s' },
          { word: 'century', ipa: '/ˈsɛn.tʃər.i/', meaning: 'A period of one hundred years', clue: '"c" before "e" makes /s/' }
        ],
        spellingTrap: 'In words from Latin, the /s/ sound before e or i is often spelled "c", not "s"!'
      },
      {
        ruleNumber: 4,
        title: 'Championship Suffix "-ous" ("Full Of") & "-tion"',
        pattern: 'Latin adjective suffix -osus becomes "-ous" (meaning full of, possessing)',
        soundDescription: 'Unlocks advanced Two-Bee vocabulary!',
        examples: [
          { word: 'salubrious', ipa: '/səˈluː.bri.əs/', meaning: 'Health-giving, pleasant, wholesome', clue: 'From Latin salus (health) + -ous (full of)' },
          { word: 'unctuous', ipa: '/ˈʌŋk.tʃu.əs/', meaning: 'Excessively flattering, oily, or greasy', clue: 'From unctum (ointment) + -ous' },
          { word: 'nebulous', ipa: '/ˈnɛb.jə.ləs/', meaning: 'In the form of a cloud; hazy or vague', clue: 'From nebula (mist, cloud) + -ous' },
          { word: 'herbaceous', ipa: '/hɜːrˈbeɪ.ʃəs/', meaning: 'Denoting non-woody leafy green plants', clue: 'From herba + -aceous suffix' },
          { word: 'exoneration', ipa: '/ɪɡˌzɒn.əˈreɪ.ʃən/', meaning: 'The release of someone from blame or guilt', clue: 'Prefix ex- (out of) + onus (burden) + -tion' }
        ],
        spellingTrap: 'Always check the ending: adjectives use "-ous" (unctuous), whereas nouns use "-us" (circus, status)!'
      }
    ]
  },

  // ==========================================
  // 2. FRENCH PATTERNS (Silent Consonants & Luxury)
  // ==========================================
  {
    id: 'french',
    name: 'French Patterns',
    flag: '🇫🇷',
    subtitle: 'The Language of Silent Consonants, Elegant Vowels & Culinary / Fashion Terms',
    colorScheme: {
      bg: 'bg-blue-50',
      border: 'border-blue-300',
      badge: 'bg-blue-100 text-blue-900',
      accent: 'text-blue-700'
    },
    rules: [
      {
        ruleNumber: 1,
        title: 'Silent Final Consonants (-t, -s, -x)',
        pattern: 'Final -t, -s, or -x is completely silent in French borrowings',
        soundDescription: 'The final consonant is written but not spoken!',
        examples: [
          { word: 'bouquet', ipa: '/buːˈkeɪ/', meaning: 'Arranged cut flowers', clue: 'Ends in silent -t; starts with "ou"' },
          { word: 'ballet', ipa: '/bæˈleɪ/', meaning: 'Artistic theatrical dance', clue: 'Ends in -et with silent -t; double l' },
          { word: 'debris', ipa: '/dəˈbriː/', meaning: 'Scattered wreckage or remains', clue: 'Ends in silent -s: d-e-b-r-i-s' },
          { word: 'faux', ipa: '/foʊ/', meaning: 'Artificial, imitation, fake', clue: 'Ends in silent -x: f-a-u-x' },
          { word: 'rendezvous', ipa: '/ˈrɒn.deɪ.vuː/', meaning: 'Agreed meeting place/time', clue: 'Both z and s are silent: r-e-n-d-e-z-v-o-u-s' }
        ],
        spellingTrap: 'Never write a phonetic /ay/ as "ay" or "ey" if French is specified — use "-et"!'
      },
      {
        ruleNumber: 2,
        title: 'The /oʊ/ Sound Spelled "-eau"',
        pattern: 'The trigraph "eau" creates the long /oh/ sound',
        soundDescription: 'Three letters producing a single pure long O vowel!',
        examples: [
          { word: 'plateau', ipa: '/plæˈtoʊ/', meaning: 'High level ground / flat tableland', clue: 'Ends in -eau (Old French plat = flat)' },
          { word: 'bureau', ipa: '/ˈbjʊər.oʊ/', meaning: 'Writing desk or government agency', clue: 'Ends in -eau; bur-eau' },
          { word: 'chateau', ipa: '/ʃæˈtoʊ/', meaning: 'A large French country house or castle', clue: 'Starts with "ch" /ʃ/ and ends in "-eau"' }
        ],
        spellingTrap: 'Do not write "plato" or "buro" — French /oh/ endings are almost always "-eau"!'
      },
      {
        ruleNumber: 3,
        title: 'The /ʃ/ (sh) Sound Spelled "ch"',
        pattern: 'Initial or medial "ch" sounds like /sh/, not /ch/ as in chair',
        soundDescription: 'Soft French /sh/ sound instead of the English punchy /tʃ/!',
        examples: [
          { word: 'chef', ipa: '/ʃɛf/', meaning: 'A professional cook', clue: 'Spelled with "ch", pronounced /ʃɛf/' },
          { word: 'crochet', ipa: '/kroʊˈʃeɪ/', meaning: 'Hooked needle needlecraft', clue: '"ch" = /ʃ/, and ends in silent -t' },
          { word: 'chauffeur', ipa: '/ʃoʊˈfɜːr/', meaning: 'A professional hired driver', clue: 'Starts with "ch-", double f, ends in "-eur"' },
          { word: 'chiffon', ipa: '/ʃɪˈfɒn/', meaning: 'Sheer lightweight silk fabric', clue: '"ch-" + double f ("-ff-") + single n' }
        ],
        spellingTrap: 'If the pronouncer says /sh/ and origin is French, write "ch", never "sh"!'
      },
      {
        ruleNumber: 4,
        title: 'Diphthongs "ou" (/uː/) and "oi" (/wɑː/)',
        pattern: '"ou" makes the /oo/ sound, while "oi" makes the /wah/ sound',
        soundDescription: 'French vowel pairs with distinct continental values!',
        examples: [
          { word: 'silhouette', ipa: '/ˌsɪl.uˈɛt/', meaning: 'Dark shadow outline', clue: '"silh-" with silent h, then "ou", double t' },
          { word: 'souvenir', ipa: '/ˌsuː.vəˈnɪər/', meaning: 'Keepsake or memory token', clue: '"sou-" (not "soo-"), single v, single n' },
          { word: 'reservoir', ipa: '/ˈrɛz.ər.vwɑːr/', meaning: 'Large water storage lake', clue: '"oi" produces /wɑː/; res-er-voir' },
          { word: 'croissant', ipa: '/kwɑːˈsɒ̃/', meaning: 'Flaky crescent pastry', clue: '"oi" produces /wɑː/; double s ("ss")' }
        ],
        spellingTrap: 'Remember that "silhouette" has a silent "h" after "l": s-i-l-h-o-u-e-t-t-e.'
      }
    ]
  },

  // ==========================================
  // 3. GERMAN PATTERNS (Consonant Clusters)
  // ==========================================
  {
    id: 'german',
    name: 'German Patterns',
    flag: '🇩🇪',
    subtitle: 'The Language of "sch", Dipthong "ei", Soft "z" (/ts/), and Compound Words',
    colorScheme: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      badge: 'bg-amber-100 text-amber-900',
      accent: 'text-amber-800'
    },
    rules: [
      {
        ruleNumber: 1,
        title: 'The /ʃ/ (sh) Sound Spelled "sch"',
        pattern: 'German represents the /sh/ sound with the trigraph "sch"',
        soundDescription: 'Three consonants working together: s + c + h!',
        examples: [
          { word: 'schnauzer', ipa: '/ˈʃnaʊ.zər/', meaning: 'A German dog breed with whiskered muzzle', clue: 'Starts with "sch-", ends in "-er"' },
          { word: 'schadenfreude', ipa: '/ˈʃɑː.dənˌfrɔɪ.də/', meaning: 'Pleasure derived from another’s misfortune', clue: '"sch-" + "freude" with "eu" diphthong' },
          { word: 'mensch', ipa: '/mɛnʃ/', meaning: 'A person of integrity and honor', clue: 'Ends in "-sch"' }
        ],
        spellingTrap: 'If the pronouncer gives German origin and /sh/ sound, think "sch"!'
      },
      {
        ruleNumber: 2,
        title: 'The /aɪ/ (eye) Sound Spelled "ei"',
        pattern: 'In German, "ei" sounds like the English long "I" (rhymes with eye)',
        soundDescription: 'German rule: Pronounce the SECOND vowel! In "ei", say "I"!',
        examples: [
          { word: 'poltergeist', ipa: '/ˈpoʊl.tər.ɡaɪst/', meaning: 'Noisy mischievous spirit', clue: 'Ends in "-geist" with "ei" for the /aɪ/ sound' },
          { word: 'edelweiss', ipa: '/ˈeɪ.dəl.vaɪs/', meaning: 'White mountain flower of the Alps', clue: '"ei" produces /aɪ/, with double s ("ss")' },
          { word: 'zeitgeist', ipa: '/ˈtsaɪt.ɡaɪst/', meaning: 'Spirit of the times or era', clue: 'Double "ei": z-e-i-t-g-e-i-s-t' },
          { word: 'stein', ipa: '/staɪn/', meaning: 'Large earthenware beer mug', clue: 'Spelled s-t-e-i-n with "ei"' }
        ],
        spellingTrap: 'Do not confuse with "ie"! In German, "ie" sounds like /ee/ (diesel), while "ei" sounds like /eye/!'
      },
      {
        ruleNumber: 3,
        title: 'The /ts/ Sound Spelled with "z"',
        pattern: 'German letter "z" represents the sharp /ts/ consonant cluster',
        soundDescription: 'A single letter "z" creating the two-sound blend /ts/!',
        examples: [
          { word: 'pretzel', ipa: '/ˈprɛt.səl/', meaning: 'Crisp twisted salted bread pastry', clue: 'Notice "tz" representing the crisp /ts/ sound' },
          { word: 'panzer', ipa: '/ˈpæn.zər/', meaning: 'Armored combat vehicle or tank', clue: 'Single "z" pronounced /ts/' },
          { word: 'spritz', ipa: '/sprɪts/', meaning: 'To squirt or spray a liquid', clue: 'Ends in "-tz"' }
        ],
        spellingTrap: 'In German words, "z" or "tz" handles the /ts/ sound without needing an "s"!'
      },
      {
        ruleNumber: 4,
        title: 'Compound Nouns & Classic Suffixes',
        pattern: 'German fuses smaller words into compounds (-kraut, -geist, kn-)',
        soundDescription: 'Literal descriptive compounding of roots!',
        examples: [
          { word: 'sauerkraut', ipa: '/ˈsaʊ.ər.kraʊt/', meaning: 'Fermented shredded sour cabbage', clue: 'sauer (sour) + kraut (cabbage); two "au" diphthongs' },
          { word: 'knapsack', ipa: '/ˈnæp.sæk/', meaning: 'A bag carried strapped on the back', clue: 'Starts with silent k in "kn-" (from knappen, to bite/eat)' },
          { word: 'kindergarten', ipa: '/ˈkɪn.dərˌɡɑːr.tən/', meaning: 'School for young children', clue: 'Kinder (children) + Garten (garden). Ends in "-ten"!' }
        ],
        spellingTrap: 'Many students write "kindergarden" with a d — in German it is "-garten" with a t!'
      }
    ]
  },

  // ==========================================
  // 4. GREEK PATTERNS (Science, Philosophy)
  // ==========================================
  {
    id: 'greek',
    name: 'Greek Patterns',
    flag: '🇬🇷',
    subtitle: 'The Language of Science, Philosophy, "ph", "ch" (/k/), and Vowel "y"',
    colorScheme: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      badge: 'bg-emerald-100 text-emerald-900',
      accent: 'text-emerald-800'
    },
    rules: [
      {
        ruleNumber: 1,
        title: 'The /f/ Sound Spelled "ph"',
        pattern: 'Ancient Greek letter Phi (Φ) became "ph" in the Latin alphabet',
        soundDescription: 'Whenever a scientific or musical Greek root needs /f/, use "ph"!',
        examples: [
          { word: 'philharmonic', ipa: '/ˌfɪl.hɑːrˈmɒn.ɪk/', meaning: 'Devoted to music; symphony orchestra', clue: 'Root phil- (loving) uses "ph"; joined with "harmonic"' },
          { word: 'brontophobia', ipa: '/ˌbrɒn.təˈfoʊ.bi.ə/', meaning: 'Overwhelming fear of thunder', clue: 'bronto- (thunder) + -phobia (with "ph")' },
          { word: 'calligraphy', ipa: '/kəˈlɪɡ.rə.fi/', meaning: 'Decorative beautiful handwriting', clue: 'kalli- (beauty, with double l) + -graphy (with "ph")' },
          { word: 'chlorophyll', ipa: '/ˈklɔːr.ə.fɪl/', meaning: 'Green pigment in plant leaves', clue: '"ch" for /k/, and "ph" for /f/; ends in "-phyll"' }
        ],
        spellingTrap: 'Never use the letter "f" for words built from Greek roots like phil-, -phobia, or photo-!'
      },
      {
        ruleNumber: 2,
        title: 'The /k/ Sound Spelled "ch"',
        pattern: 'Ancient Greek letter Chi (Χ) is transcribed as "ch"',
        soundDescription: 'The letter combination "ch" sounds like hard /k/!',
        examples: [
          { word: 'chorus', ipa: '/ˈkɔːr.əs/', meaning: 'A large organized group of singers', clue: 'Starts with "ch" pronounced /k/' },
          { word: 'synchronize', ipa: '/ˈsɪŋ.krə.naɪz/', meaning: 'Occur at the exact same time', clue: 'syn- (together) + chron- (time, with "ch")' },
          { word: 'archaeology', ipa: '/ˌɑːr.kiˈɒl.ə.dʒi/', meaning: 'Study of human history via artifacts', clue: 'archae- (ancient, with "ch") + -ology' },
          { word: 'chrome', ipa: '/kroʊm/', meaning: 'Chromium metal coating / color', clue: 'Starts with "ch" pronounced /k/' }
        ],
        spellingTrap: 'If the pronouncer gives Greek origin and you hear /k/ before a vowel or r, write "ch"!'
      },
      {
        ruleNumber: 3,
        title: 'The /i/ or /aɪ/ Vowel Spelled "y"',
        pattern: 'Greek letter Upsilon (Υ) appears in English words as the vowel "y"',
        soundDescription: 'A distinctive Greek vowel marker in both short and long forms!',
        examples: [
          { word: 'crystal', ipa: '/ˈkrɪs.təl/', meaning: 'A clear transparent mineral', clue: 'Spelled c-r-y-s-t-a-l with "y"' },
          { word: 'rhythm', ipa: '/ˈrɪð.əm/', meaning: 'A strong, regular repeated pattern of sound', clue: 'Starts with "rh-", contains "y", no other vowels!' },
          { word: 'gymnasium', ipa: '/dʒɪmˈneɪ.zi.əm/', meaning: 'A room or building equipped for gymnastics', clue: 'Root gymn- (exercise) uses "y"' },
          { word: 'syllable', ipa: '/ˈsɪl.ə.bəl/', meaning: 'A unit of pronunciation in a word', clue: 's-y-l-l-a-b-l-e: "y" followed by double l' }
        ],
        spellingTrap: 'When spelling scientific or rhythm words from Greek, the short /i/ sound is almost always "y", not "i"!'
      },
      {
        ruleNumber: 4,
        title: 'Silent Initial Consonant Clusters (pn-, ps-, pt-)',
        pattern: 'Greek words beginning with pn-, ps-, or pt- have silent first letters in English',
        soundDescription: 'The first letter is silent when spoken in English!',
        examples: [
          { word: 'pneumonia', ipa: '/njuːˈmoʊ.ni.ə/', meaning: 'Inflammation of lung tissue', clue: 'Silent p before n: p-n-e-u-m-o-n-i-a' },
          { word: 'psychology', ipa: '/saɪˈkɒl.ə.dʒi/', meaning: 'The scientific study of the human mind', clue: 'Silent p before s: p-s-y-c-h-o-l-o-g-y' },
          { word: 'pterodactyl', ipa: '/ˌtɛr.əˈdæk.tɪl/', meaning: 'Prehistoric flying winged reptile', clue: 'Silent p before t: p-t-e-r-o-d-a-c-t-y-l' }
        ],
        spellingTrap: 'Never omit the initial "p" when spelling Greek medical or prehistoric words!'
      }
    ]
  },

  // ==========================================
  // 5. ITALIAN PATTERNS (Music & Culinary)
  // ==========================================
  {
    id: 'italian',
    name: 'Italian Patterns',
    flag: '🇮🇹',
    subtitle: 'The Language of Music, Cuisine, Open Vowels, and Symmetrical Double Consonants',
    colorScheme: {
      bg: 'bg-rose-50',
      border: 'border-rose-300',
      badge: 'bg-rose-100 text-rose-900',
      accent: 'text-rose-800'
    },
    rules: [
      {
        ruleNumber: 1,
        title: 'Words Almost Always End in Open Vowels (-o, -a, -i, -e)',
        pattern: 'Virtually all authentic Italian words end in a vowel',
        soundDescription: 'Musical, melodic vocal endings without harsh final consonants!',
        examples: [
          { word: 'allegro', ipa: '/əˈleɪ.ɡroʊ/', meaning: 'In a brisk and lively musical tempo', clue: 'Ends in -o; double l ("ll")' },
          { word: 'staccato', ipa: '/stəˈkɑː.toʊ/', meaning: 'Short, sharp, detached musical delivery', clue: 'Double c ("cc"), single t, ends in -o' },
          { word: 'ballerina', ipa: '/ˌbæl.əˈriː.nə/', meaning: 'Leading female ballet dancer', clue: 'Double l ("ll"), ends in -a' },
          { word: 'graffiti', ipa: '/ɡrəˈfiː.ti/', meaning: 'Inscriptions or drawings in public places', clue: 'Single f, double t ("tt"), ends in -i' }
        ],
        spellingTrap: 'Italian plurals end in "-i" (paparazzi, graffiti, confetti) rather than the English "-s"!'
      },
      {
        ruleNumber: 2,
        title: 'The /tʃ/ (ch) Sound Spelled "c" or "cc" Before e/i',
        pattern: 'Italian letter "c" or "cc" before "e" or "i" makes the /ch/ sound',
        soundDescription: 'No "h" is needed to create the /ch/ sound before soft vowels!',
        examples: [
          { word: 'cappuccino', ipa: '/ˌkæp.ʊˈtʃiː.noʊ/', meaning: 'Espresso topped with frothed milk foam', clue: 'Double p ("pp") + double c ("cc"): c-a-p-p-u-c-c-i-n-o' },
          { word: 'concerto', ipa: '/kənˈtʃɛər.toʊ/', meaning: 'Orchestral composition for soloist', clue: 'Second "c" before "e" makes /tʃ/' },
          { word: 'cello', ipa: '/ˈtʃɛl.oʊ/', meaning: 'Large bass stringed instrument', clue: 'Spelled with single "c" producing /tʃ/' }
        ],
        spellingTrap: 'Do not write "chappuccino"! In Italian, "c" before "u" is /k/, but "cc" before "i" is /tʃ/!'
      },
      {
        ruleNumber: 3,
        title: 'The /k/ Sound Before e/i Spelled "ch" or "cch"',
        pattern: 'To keep the hard /k/ sound before "e" or "i", Italian adds an "h"',
        soundDescription: 'The opposite of English: "ch" in Italian makes the hard /k/ sound!',
        examples: [
          { word: 'zucchini', ipa: '/zuːˈkiː.ni/', meaning: 'Small dark green summer squash', clue: 'Contains "cch" for the /k/ sound before "i"' },
          { word: 'bruschetta', ipa: '/bruːˈskɛt.ə/', meaning: 'Toasted bread rubbed with garlic and oil', clue: '"sch" makes /sk/, double t ("tt")' },
          { word: 'chianti', ipa: '/kiˈæn.ti/', meaning: 'Dry red wine from Tuscany', clue: '"ch" before "i" makes /k/' }
        ],
        spellingTrap: 'In Italian words, "ch" is NEVER /tʃ/ — it is always a hard /k/!'
      },
      {
        ruleNumber: 4,
        title: 'The /ts/ Sound Spelled "zz"',
        pattern: 'Double "z" produces the crisp /ts/ sound',
        soundDescription: 'Two Z\'s creating a sharp sizzling consonant!',
        examples: [
          { word: 'paparazzi', ipa: '/ˌpæp.əˈrɑːt.si/', meaning: 'Relentless celebrity photographers', clue: 'Single p, double r, double z ("zz"), plural -i' },
          { word: 'mezzanine', ipa: '/ˈmɛz.ə.niːn/', meaning: 'Intermediate low floor between main stories', clue: 'Double z ("zz"), single n, ends in -ine' },
          { word: 'pizza', ipa: '/ˈpiːt.sə/', meaning: 'Flat baked dough with tomato and cheese', clue: 'Classic double z ("zz") for /ts/' }
        ],
        spellingTrap: 'Remember the consonant count in "paparazzi": 1 p, 1 r, 2 z\'s (p-a-p-a-r-a-z-z-i).'
      }
    ]
  },

  // ==========================================
  // 6. SPANISH PATTERNS (The "ny" Sound & "ll")
  // ==========================================
  {
    id: 'spanish',
    name: 'Spanish Patterns',
    flag: '🇪🇸',
    subtitle: 'The Language of Diminutives, "ny" from "ñ", Double "ll", and Clean Phonetic Vowels',
    colorScheme: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      badge: 'bg-red-100 text-red-900',
      accent: 'text-red-800'
    },
    rules: [
      {
        ruleNumber: 1,
        title: 'Spanish "ñ" Represented as "ny"',
        pattern: 'English borrows the Spanish palatal nasal letter "ñ" as the cluster "ny"',
        soundDescription: 'Produces the liquid /nj/ glide (like canyon from cañón)!',
        examples: [
          { word: 'canyon', ipa: '/ˈkæn.jən/', meaning: 'Deep gorge with a river flowing through it', clue: 'From Spanish cañón (tube, pipe); ñ becomes ny' },
          { word: 'piñata', ipa: '/pɪnˈjɑː.tə/', meaning: 'Decorated paper-mâché container with candy', clue: 'Preserves the "ñ" or spelled pinata' }
        ],
        spellingTrap: 'In English, "canyon" is spelled with "ny", never "ni" or "gn"!'
      },
      {
        ruleNumber: 2,
        title: 'Double "ll" and Double "rr"',
        pattern: 'Spanish features distinctive double-r (trilled) and double-l letters',
        soundDescription: 'Double consonants with historical palatal or trilled values!',
        examples: [
          { word: 'guerrilla', ipa: '/ɡəˈrɪl.ə/', meaning: 'Irregular independent warfare or fighter', clue: 'Double r ("rr") AND double l ("ll"): g-u-e-r-r-i-l-l-a' },
          { word: 'tortilla', ipa: '/tɔːrˈtiː.ə/', meaning: 'Thin flat unleavened corn or flour cake', clue: 'Double l ("ll") makes /j/ glide in Spanish' },
          { word: 'armadillo', ipa: '/ˌɑːr.məˈdɪl.oʊ/', meaning: 'Nocturnal mammal with bony armor plates', clue: 'Double l ("ll"), ends in -o' }
        ],
        spellingTrap: 'Do not confuse guerrilla (warfare, with "gue-") and gorilla (the large primate ape)!'
      },
      {
        ruleNumber: 3,
        title: 'Diminutive Suffixes (-ito / -ita) & "gua-"',
        pattern: 'Diminutives indicate smallness; "gua-" makes the /gwah/ sound',
        soundDescription: 'Expressive affectionate endings!',
        examples: [
          { word: 'mosquito', ipa: '/məˈskiː.toʊ/', meaning: 'Small biting winged fly', clue: 'Literally "little fly" (mosca + -ito); -qui- makes /ki/' },
          { word: 'guacamole', ipa: '/ˌɡwɑː.kəˈmoʊ.li/', meaning: 'Avocado dip with cilantro and lime', clue: 'Starts with "gua-", ends in "-le"' },
          { word: 'bonanza', ipa: '/bəˈnæn.zə/', meaning: 'Situation bringing sudden wealth or profits', clue: 'From Spanish for calm seas / prosperity: b-o-n-a-n-z-a' }
        ],
        spellingTrap: '"mosquito" is spelled with "-qui-", not "-kee-" or "-kwi-"!'
      }
    ]
  },

  // ==========================================
  // 7. ARABIC & GLOBAL PATTERNS
  // ==========================================
  {
    id: 'arabic',
    name: 'Arabic & Global',
    flag: '🌙',
    subtitle: 'The Language of the "al-" Prefix, Celestial Navigation & Japanese Pure Vowel Mora',
    colorScheme: {
      bg: 'bg-teal-50',
      border: 'border-teal-300',
      badge: 'bg-teal-100 text-teal-900',
      accent: 'text-teal-800'
    },
    rules: [
      {
        ruleNumber: 1,
        title: 'The Arabic Definite Article Prefix "al-"',
        pattern: 'Words originating in medieval Arabic scholarship begin with "al-" (meaning "the")',
        soundDescription: 'The classic marker of algebra, astronomy, and chemistry!',
        examples: [
          { word: 'algebra', ipa: '/ˈæl.dʒɪ.brə/', meaning: 'Branch of mathematics using letter symbols', clue: 'al- (the) + jabr (reunion of parts) -> al-ge-bra' },
          { word: 'alkali', ipa: '/ˈæl.kə.laɪ/', meaning: 'Chemical base substance with pH > 7', clue: 'al- + qaliy (calcined ashes) -> al-ka-li' },
          { word: 'alcove', ipa: '/ˈæl.koʊv/', meaning: 'A recessed section of a room', clue: 'al- + qubbah (vault) -> al-cove' }
        ],
        spellingTrap: 'Words starting with "al-" followed by a consonant are overwhelmingly from Arabic scholarship!'
      },
      {
        ruleNumber: 2,
        title: 'Celestial Astronomy Terms (Zenith & Nadir)',
        pattern: 'Medieval Arabic astronomers named the poles of the sky',
        soundDescription: 'Direct geometric opposites!',
        examples: [
          { word: 'zenith', ipa: '/ˈzɛn.ɪθ/', meaning: 'Highest point in the celestial sphere overhead', clue: 'Starts with "z", single n: z-e-n-i-t-h' },
          { word: 'nadir', ipa: '/ˈneɪ.dɪər/', meaning: 'Lowest point directly beneath an observer', clue: 'Direct opposite of zenith: n-a-d-i-r' }
        ],
        spellingTrap: 'Zenith has an "e" in the first syllable, while nadir has an "a"!'
      },
      {
        ruleNumber: 3,
        title: 'Japanese Pure Vowel Mora',
        pattern: 'Japanese borrowings consist of simple consonant + vowel syllables (CV mora)',
        soundDescription: 'Clean, open vowels: a, i, u, e, o!',
        examples: [
          { word: 'origami', ipa: '/ˌɔːr.ɪˈɡɑː.mi/', meaning: 'Art of decorative paper folding', clue: 'ori (folding) + kami (paper) -> o-ri-ga-mi' },
          { word: 'tsunami', ipa: '/tsuːˈnɑː.mi/', meaning: 'Great seismic sea wave', clue: 'tsu (harbor) + nami (wave) -> t-s-u-n-a-m-i' },
          { word: 'karaoke', ipa: '/ˌkær.iˈoʊ.ki/', meaning: 'Singing with recorded music backing', clue: 'kara (empty) + oke (orchestra) -> k-a-r-a-o-k-e' },
          { word: 'bonsai', ipa: '/ˈbɒn.saɪ/', meaning: 'Artificially dwarfed potted tree', clue: 'bon (tray) + sai (planting) -> b-o-n-s-a-i' }
        ],
        spellingTrap: '"karaoke" ends in "-oke" (like orchestra), not "-oki"!'
      }
    ]
  },

  // ==========================================
  // 8. SCRIPPS HOMOPHONE TRAPS (Rule 4)
  // ==========================================
  {
    id: 'homophones',
    name: 'Scripps Homophone Traps',
    flag: '⚖️',
    subtitle: 'Rule 4 in Action: When Words Sound Identical, Etymology & Definitions Unlock the Code',
    colorScheme: {
      bg: 'bg-purple-50',
      border: 'border-purple-300',
      badge: 'bg-purple-100 text-purple-900',
      accent: 'text-purple-800'
    },
    rules: [
      {
        ruleNumber: 1,
        title: 'stationary vs stationery',
        pattern: '-ary (motionless) vs -ery (paper/envelopes)',
        soundDescription: 'Both pronounced identically: /ˈsteɪ.ʃən.er.i/!',
        examples: [
          { word: 'stationary', ipa: '/ˈsteɪ.ʃən.er.i/', meaning: 'Not moving; staying in one fixed place', clue: 'Memory hook: stationAry with "A" is "At rest" (anchored)!' },
          { word: 'stationery', ipa: '/ˈsteɪ.ʃən.er.i/', meaning: 'Writing paper, matching envelopes, office materials', clue: 'Memory hook: stationEry with "E" is for "Envelope" and "lEtter"!' }
        ],
        spellingTrap: 'Ask the pronouncer: "Does it mean writing paper or staying in one spot?"'
      },
      {
        ruleNumber: 2,
        title: 'principal vs principle',
        pattern: '-pal (school leader / primary) vs -ple (moral rule / law)',
        soundDescription: 'Both pronounced identically: /ˈprɪn.sə.pəl/!',
        examples: [
          { word: 'principal', ipa: '/ˈprɪn.sə.pəl/', meaning: 'Headmaster of a school; or primary/chief', clue: 'Memory hook: The principAL is your "PAL"!' },
          { word: 'principle', ipa: '/ˈprɪn.sə.pəl/', meaning: 'A fundamental truth, moral rule, or scientific law', clue: 'Memory hook: A principLE is a ruLE (both end in -le)!' }
        ],
        spellingTrap: 'Never write "principle" for the head of a school — your principal is your pal!'
      },
      {
        ruleNumber: 3,
        title: 'capital vs capitol',
        pattern: 'capital (-al: city/money/letters) vs capitol (-ol: dome building)',
        soundDescription: 'Both pronounced identically: /ˈkæp.ɪ.təl/!',
        examples: [
          { word: 'capital', ipa: '/ˈkæp.ɪ.təl/', meaning: 'Seat of government; wealth; uppercase letter', clue: 'From Latin caput (head); ends in -al' },
          { word: 'capitol', ipa: '/ˈkæp.ɪ.təl/', meaning: 'The physical building in which a legislature meets', clue: 'Memory hook: capitOl with an "O" has a dOme on top!' }
        ],
        spellingTrap: 'Only the actual domed government building gets the letter "o"!'
      },
      {
        ruleNumber: 4,
        title: 'complement vs compliment',
        pattern: 'complement (completes something) vs compliment (flattering praise)',
        soundDescription: 'Both pronounced identically: /ˈkɒm.plɪ.mənt/!',
        examples: [
          { word: 'complement', ipa: '/ˈkɒm.plɪ.mənt/', meaning: 'Something that completes or brings to perfection', clue: 'Memory hook: complEment with "E" complEtes the set!' },
          { word: 'compliment', ipa: '/ˈkɒm.plɪ.mənt/', meaning: 'Polite expression of praise or admiration', clue: 'Memory hook: complIment with "I" — "I" like your jacket!' }
        ],
        spellingTrap: 'Notice the single vowel difference in the center: -ple- vs -pli-!'
      }
    ]
  }
];

// Interactive Origin Challenge Questions
interface QuizQuestion {
  id: number;
  word: string;
  ipa: string;
  definition: string;
  clue: string;
  correctOrigin: 'Latin' | 'French' | 'German' | 'Greek' | 'Italian' | 'Spanish' | 'Arabic' | 'Japanese';
  options: ('Latin' | 'French' | 'German' | 'Greek' | 'Italian' | 'Spanish' | 'Arabic' | 'Japanese')[];
  explanation: string;
}

const COMPREHENSIVE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    word: 'accurate',
    ipa: '/ˈæk.jər.ət/',
    definition: 'Correct in all details; exact, free from error or defect.',
    clue: 'Demonstrates Latin prefix assimilation: ad- + cure absorbs into a double-c.',
    correctOrigin: 'Latin',
    options: ['Latin', 'Greek', 'French', 'German'],
    explanation: 'Latin prefix assimilation: ad- absorbs into the root cure (care/attention), doubling the consonant into "cc".'
  },
  {
    id: 2,
    word: 'crochet',
    ipa: '/kroʊˈʃeɪ/',
    definition: 'A handicraft in which yarn is made into a textured fabric with a hooked needle.',
    clue: 'Notice the soft /ʃ/ sound spelled "ch" and the ending "-et" with a silent "t".',
    correctOrigin: 'French',
    options: ['French', 'German', 'Italian', 'Greek'],
    explanation: 'French words frequently use "ch" for /ʃ/ and end in silent consonants like "-et" pronounced /eɪ/.'
  },
  {
    id: 3,
    word: 'schnauzer',
    ipa: '/ˈʃnaʊ.zər/',
    definition: 'A medium-sized dog breed characterized by a blunt whiskered muzzle and wiry coat.',
    clue: 'Begins with the trigraph "sch" producing the /sh/ sound, and uses "z" for /ts/.',
    correctOrigin: 'German',
    options: ['French', 'German', 'Greek', 'Italian'],
    explanation: 'German orthography uses "sch" for /ʃ/ and "z" for the /ts/ sound (from Schnauze = snout).'
  },
  {
    id: 4,
    word: 'audible',
    ipa: '/ˈɔː.də.bəl/',
    definition: 'Able to be heard distinctly and clearly.',
    clue: 'Derived from Latin audire (4th conjugation verb meaning to hear), taking the "-ible" suffix.',
    correctOrigin: 'Latin',
    options: ['Latin', 'Greek', 'French', 'Spanish'],
    explanation: 'Latin 4th-conjugation verbs ending in -ire form adjectives with "-ible", not "-able"!'
  },
  {
    id: 5,
    word: 'philharmonic',
    ipa: '/ˌfɪl.hɑːrˈmɒn.ɪk/',
    definition: 'Devoted to music; symphony orchestra or music-loving society.',
    clue: 'Uses "ph" for the /f/ sound from the ancient root meaning "loving" or "fond of".',
    correctOrigin: 'Greek',
    options: ['French', 'German', 'Greek', 'Italian'],
    explanation: 'Greek root "phil-" (loving) always uses "ph" for the /f/ sound, derived from the letter Phi (Φ).'
  },
  {
    id: 6,
    word: 'cappuccino',
    ipa: '/ˌkæp.ʊˈtʃiː.noʊ/',
    definition: 'An espresso coffee drink topped with steamed milk foam and cocoa.',
    clue: 'Contains symmetrical double consonants ("pp" and "cc") and ends in an open vowel "-o".',
    correctOrigin: 'Italian',
    options: ['French', 'Italian', 'Spanish', 'German'],
    explanation: 'Italian words feature open vowel endings (-o, -a, -i) and double consonants ("cc" before i makes /tʃ/).'
  },
  {
    id: 7,
    word: 'guerrilla',
    ipa: '/ɡəˈrɪl.ə/',
    definition: 'A member of a small independent group taking part in irregular warfare.',
    clue: 'Contains double "rr", double "ll", and Spanish diminutive suffix "-illa" (literally "little war").',
    correctOrigin: 'Spanish',
    options: ['Spanish', 'Italian', 'French', 'Latin'],
    explanation: 'Spanish diminutive of guerra (war) -> guerrilla. Features double "rr" and double "ll".'
  },
  {
    id: 8,
    word: 'salubrious',
    ipa: '/səˈluː.bri.əs/',
    definition: 'Health-giving, healthy, wholesome, or pleasant.',
    clue: 'Derived from Latin salus (health) and ends in the classic Latin adjective suffix "-ous" (full of).',
    correctOrigin: 'Latin',
    options: ['Latin', 'French', 'Greek', 'German'],
    explanation: 'Latin root salus (health) + -osus suffix -> salubrious. Classic Two-Bee Latin word!'
  },
  {
    id: 9,
    word: 'algebra',
    ipa: '/ˈæl.dʒɪ.brə/',
    definition: 'The mathematical branch where letters and symbols represent unknown values in equations.',
    clue: 'Begins with the ancient Arabic definite article prefix "al-" (meaning "the").',
    correctOrigin: 'Arabic',
    options: ['Arabic', 'Greek', 'Latin', 'German'],
    explanation: 'Originated from Arabic al-jabr (the reunion of broken parts) by mathematician al-Khwarizmi.'
  },
  {
    id: 10,
    word: 'tsunami',
    ipa: '/tsuːˈnɑː.mi/',
    definition: 'A great seismic sea wave triggered by an underwater earthquake.',
    clue: 'Compound of tsu (harbor) + nami (wave), with clean open Japanese vowel mora.',
    correctOrigin: 'Japanese',
    options: ['Japanese', 'Greek', 'Arabic', 'Spanish'],
    explanation: 'Japanese compound: tsu (harbor) + nami (wave). Clean phonetic consonant-vowel mora.'
  }
];

export default function OriginPatternDetective({
  onAwardTeamScore,
  onNavigateTab,
  genAlphaMode = false
}: OriginPatternDetectiveProps) {
  // Navigation mode: 'rules-codebook' | 'sound-matrix' | 'origin-quiz'
  const [activeTab, setActiveTab] = useState<'rules-codebook' | 'sound-matrix' | 'origin-quiz'>('rules-codebook');

  // Selected guide in codebook: default to Latin!
  const [selectedGuideId, setSelectedGuideId] = useState<OriginLanguageId>('latin');

  // Currently speaking word
  const [speakingWord, setSpeakingWord] = useState<string | null>(null);

  // Sound matrix selected sound
  const [selectedSound, setSelectedSound] = useState<'sh' | 'f' | 'k' | 's' | 'ch_sound' | 'oh' | 'eye'>('sh');

  // Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const currentGuide = COMPREHENSIVE_ORIGIN_GUIDES.find(g => g.id === selectedGuideId) || COMPREHENSIVE_ORIGIN_GUIDES[0];
  const currentQuizItem = COMPREHENSIVE_QUIZ_QUESTIONS[currentQuizIndex];

  const handleSpeak = (text: string) => {
    setSpeakingWord(text);
    humanVoice.speak(text);
    setTimeout(() => setSpeakingWord(null), 1200);
  };

  const handleQuizAnswer = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
    setIsAnswerSubmitted(true);

    const isCorrect = option === currentQuizItem.correctOrigin;
    if (isCorrect) {
      sound.playCorrect();
      setQuizScore(prev => prev + 1);
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 }
      });
      if (onAwardTeamScore) {
        onAwardTeamScore('A', 10);
      }
    } else {
      sound.playIncorrect();
    }
  };

  const nextQuizQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    if (currentQuizIndex < COMPREHENSIVE_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      sound.playClick();
    } else {
      sound.playFanfare();
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    sound.playClick();
  };

  return (
    <div className="space-y-6">
      
      {/* ======================================================== */}
      {/* TOP HERO & MODE NAVIGATOR                                 */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-fuchsia-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98] bg-fuchsia-100 px-3 py-1 rounded-full border border-fuchsia-200">
                Expanded Linguistic Detective Lab · 25-Minute Deep Focus
              </span>
              <span className="text-xs font-mono font-black bg-[#78c222] text-[#560e51] px-2 py-0.5 rounded-full border border-[#560e51]">
                Scripps Strategy
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
              Language of Origin & Homophone Detective 🔎
            </h2>
            <p className="text-xs sm:text-sm font-bold text-slate-600 max-w-3xl">
              Competitive spellers ask the pronouncer: <em>"What is the language of origin?"</em> and <em>"What is the definition?"</em>. Master how Latin, French, German, Greek, Italian, Spanish, and Arabic spell sounds, and decode homophone traps!
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => { setActiveTab('rules-codebook'); sound.playClick(); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                activeTab === 'rules-codebook'
                  ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                  : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
              }`}
            >
              📖 Origin Codebook
            </button>

            <button
              onClick={() => { setActiveTab('sound-matrix'); sound.playClick(); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                activeTab === 'sound-matrix'
                  ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                  : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
              }`}
            >
              🔬 Sound Matrix
            </button>

            <button
              onClick={() => { setActiveTab('origin-quiz'); sound.playClick(); }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all cursor-pointer ${
                activeTab === 'origin-quiz'
                  ? 'bg-[#560e51] text-[#78c222] border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                  : 'bg-fuchsia-50 text-[#560e51] hover:bg-fuchsia-100 border border-fuchsia-200'
              }`}
            >
              🎯 Detective Challenge
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SUB-NAV: LANGUAGE SELECTOR FOR CODEBOOK (8 ORIGINS)      */}
        {/* ======================================================== */}
        {activeTab === 'rules-codebook' && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            {COMPREHENSIVE_ORIGIN_GUIDES.map(guide => {
              const isSelected = selectedGuideId === guide.id;
              return (
                <button
                  key={guide.id}
                  onClick={() => {
                    setSelectedGuideId(guide.id);
                    sound.playClick();
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-tight transition-all shrink-0 cursor-pointer border-2 ${
                    isSelected
                      ? 'bg-[#560e51] text-white border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-white hover:bg-slate-50 text-slate-800 border-[#560e51]/30 shadow-xs'
                  }`}
                >
                  <span className="text-base">{guide.flag}</span>
                  <span>{guide.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* VIEW 1: ORIGIN CODEBOOK & RULE SHEETS                    */}
      {/* ======================================================== */}
      {activeTab === 'rules-codebook' && (
        <motion.div
          key={selectedGuideId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-5"
        >
          {/* Header Banner for Selected Language */}
          <div className={`p-5 rounded-3xl border-3 border-[#560e51] ${currentGuide.colorScheme.bg} shadow-[4px_4px_0px_0px_#560e51]`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentGuide.flag}</span>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                    {currentGuide.name} Codebook
                  </h3>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">
                    {currentGuide.subtitle}
                  </p>
                </div>
              </div>

              {selectedGuideId === 'homophones' && onNavigateTab && (
                <button
                  onClick={() => onNavigateTab('homophones')}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black uppercase bg-[#560e51] text-[#78c222] border-2 border-[#560e51] cursor-pointer"
                >
                  <span>Open Full Stage Showdown</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Rules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentGuide.rules.map(rule => (
              <div
                key={rule.ruleNumber}
                className="bg-white rounded-3xl p-5 border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Rule Header */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase text-[#9b2c98] bg-fuchsia-50 px-2 py-0.5 rounded border border-fuchsia-200">
                        Rule #{rule.ruleNumber}
                      </span>
                      <h4 className="text-base font-black text-slate-900 uppercase tracking-tight mt-1">
                        {rule.title}
                      </h4>
                    </div>
                    <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
                  </div>

                  {/* Pattern Summary */}
                  <p className="text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <strong>Pattern:</strong> {rule.pattern}
                  </p>

                  {/* Word Examples with Audio */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-black uppercase text-slate-500 block">
                      CHAMPIONSHIP WORD EXAMPLES:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {rule.examples.map((ex, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded-xl bg-[#fefaf0] border border-[#560e51]/20 flex items-center justify-between gap-3 hover:border-[#560e51] transition-all"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-black text-[#560e51] font-mono tracking-wide">
                                {ex.word}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
                                {ex.ipa}
                              </span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-600 line-clamp-1 mt-0.5">
                              {ex.meaning} · <span className="text-emerald-700 font-mono">{ex.clue}</span>
                            </p>
                          </div>

                          <button
                            onClick={() => handleSpeak(ex.word)}
                            className="p-2 rounded-xl bg-white hover:bg-fuchsia-100 text-[#560e51] border border-[#560e51] cursor-pointer shrink-0 shadow-2xs"
                            title={`Pronounce ${ex.word}`}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Speller Danger Warning */}
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-[11px] font-bold">
                  <strong>⚠️ Scripps Stage Warning:</strong> {rule.spellingTrap}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: CROSS-ORIGIN SOUND-TO-SPELLING MATRIX            */}
      {/* ======================================================== */}
      {activeTab === 'sound-matrix' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-5"
        >
          {/* Sound Selector Pills */}
          <div className="bg-white rounded-3xl p-5 border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
            <div>
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">Cross-Language Sound Comparison</span>
              <h3 className="text-xl font-black text-slate-900 uppercase">You Hear The Sound... How Do You Spell It?</h3>
              <p className="text-xs font-bold text-slate-600 mt-0.5">
                Select a target phoneme to see how Latin, French, German, Greek, Italian, and Spanish represent that exact sound!
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { id: 'sh', label: '/ʃ/ sound (as in ship)', clue: 'Latin vs French vs German vs Old English' },
                { id: 'f', label: '/f/ sound (as in fish)', clue: 'Greek vs Latin vs Italian' },
                { id: 'k', label: '/k/ sound (as in cat)', clue: 'Latin vs Greek vs Italian vs French vs German' },
                { id: 's', label: '/s/ sound (as in sun)', clue: 'Latin soft c vs Greek s vs French ç' },
                { id: 'ch_sound', label: '/tʃ/ sound (as in chair)', clue: 'Italian c/cc vs Spanish ch vs Latin -ture' },
                { id: 'oh', label: 'Long /oʊ/ at word end', clue: 'French -eau vs Italian -o vs Spanish -o' },
                { id: 'eye', label: '/aɪ/ sound (as in eye)', clue: 'German ei vs Greek y' }
              ].map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedSound(s.id as any); sound.playClick(); }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-tight cursor-pointer transition-all border-2 ${
                    selectedSound === s.id
                      ? 'bg-[#560e51] text-[#78c222] border-[#560e51] shadow-[2px_2px_0px_0px_#78c222]'
                      : 'bg-fuchsia-50 hover:bg-fuchsia-100 text-[#560e51] border-fuchsia-200'
                  }`}
                >
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Matrix Cards for the Selected Sound */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* SOUND: /ʃ/ (sh) */}
            {selectedSound === 'sh' && (
              <>
                <div className="bg-amber-50/70 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🏛️ Latin</span>
                    <span className="text-lg font-black font-mono bg-amber-200 text-amber-950 px-2 py-0.5 rounded">-tion / -cious</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-amber-950">Palatalized -ti- or -ci-</h4>
                  <p className="text-xs font-bold text-slate-700">
                    In Latin suffix clusters, "ti" or "ci" palatalizes into /ʃ/ before vowels!
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-amber-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>exoneration</span> <button onClick={() => handleSpeak('exoneration')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>delicious</span> <button onClick={() => handleSpeak('delicious')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>herbaceous</span> <button onClick={() => handleSpeak('herbaceous')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-blue-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇫🇷 French</span>
                    <span className="text-lg font-black font-mono bg-blue-200 text-blue-950 px-2 py-0.5 rounded">ch</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-blue-950">Soft "ch"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    French uses "ch" for /ʃ/ without any "s" in front of it!
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-blue-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>chef</span> <button onClick={() => handleSpeak('chef')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>crochet</span> <button onClick={() => handleSpeak('crochet')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>chiffon</span> <button onClick={() => handleSpeak('chiffon')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-amber-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇩🇪 German</span>
                    <span className="text-lg font-black font-mono bg-amber-200 text-amber-950 px-2 py-0.5 rounded">sch</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-amber-950">Trigraph "sch"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    German uses the full trigraph "sch" to produce the /ʃ/ sound!
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-amber-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>schnauzer</span> <button onClick={() => handleSpeak('schnauzer')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>schadenfreude</span> <button onClick={() => handleSpeak('schadenfreude')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>mensch</span> <button onClick={() => handleSpeak('mensch')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-purple-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇬🇧 Old English</span>
                    <span className="text-lg font-black font-mono bg-purple-200 text-purple-950 px-2 py-0.5 rounded">sh</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-purple-950">Standard "sh"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Native Anglo-Saxon words use the traditional digraph "sh".
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-purple-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>shadow</span> <button onClick={() => handleSpeak('shadow')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>shepherd</span> <button onClick={() => handleSpeak('shepherd')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>
              </>
            )}

            {/* SOUND: /f/ */}
            {selectedSound === 'f' && (
              <>
                <div className="bg-emerald-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇬🇷 Greek</span>
                    <span className="text-lg font-black font-mono bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded">ph</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-emerald-950">Always "ph"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    From ancient letter Phi (Φ). If Greek is given, /f/ is NEVER spelled with "f"!
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-emerald-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>philharmonic</span> <button onClick={() => handleSpeak('philharmonic')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>brontophobia</span> <button onClick={() => handleSpeak('brontophobia')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>calligraphy</span> <button onClick={() => handleSpeak('calligraphy')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-amber-50/70 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🏛️ Latin</span>
                    <span className="text-lg font-black font-mono bg-amber-200 text-amber-950 px-2 py-0.5 rounded">f / ff</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-amber-950">Direct Latin "f"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Latin uses "f" directly, or doubles it via assimilation (ad- + fix ➔ affix).
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-amber-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>affix</span> <button onClick={() => handleSpeak('affix')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>fragile</span> <button onClick={() => handleSpeak('fragile')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-rose-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇮🇹 Italian</span>
                    <span className="text-lg font-black font-mono bg-rose-200 text-rose-950 px-2 py-0.5 rounded">f / ff</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-rose-950">Single or Double "f"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Italian replaces Greek "ph" with single "f" or double "ff".
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-rose-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>graffiti</span> <button onClick={() => handleSpeak('graffiti')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>confetti</span> <button onClick={() => handleSpeak('confetti')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-amber-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇩🇪 German</span>
                    <span className="text-lg font-black font-mono bg-amber-200 text-amber-950 px-2 py-0.5 rounded">f / v</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-amber-950">Spelled "f" or "v"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    In German, the letter "v" sounds like /f/ (e.g. Vogel, von).
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-amber-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>edelweiss</span> <button onClick={() => handleSpeak('edelweiss')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>
              </>
            )}

            {/* SOUND: /k/ */}
            {selectedSound === 'k' && (
              <>
                <div className="bg-amber-50/70 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🏛️ Latin</span>
                    <span className="text-lg font-black font-mono bg-amber-200 text-amber-950 px-2 py-0.5 rounded">c / cc</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-amber-950">Hard "c" Before a, o, u</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Latin uses "c" or assimilated "cc" for /k/ before broad vowels.
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-amber-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>accurate</span> <button onClick={() => handleSpeak('accurate')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>candor</span> <button onClick={() => handleSpeak('candor')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇬🇷 Greek</span>
                    <span className="text-lg font-black font-mono bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded">ch</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-emerald-950">Spelled "ch"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    From ancient letter Chi (Χ). Appears before vowels and consonants!
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-emerald-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>chorus</span> <button onClick={() => handleSpeak('chorus')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>synchronize</span> <button onClick={() => handleSpeak('synchronize')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-rose-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇮🇹 Italian</span>
                    <span className="text-lg font-black font-mono bg-rose-200 text-rose-950 px-2 py-0.5 rounded">ch / cch</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-rose-950">Before e/i: "ch" / "cch"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Italian inserts "h" before "e" or "i" specifically to keep the /k/ sound!
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-rose-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>zucchini</span> <button onClick={() => handleSpeak('zucchini')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>bruschetta</span> <button onClick={() => handleSpeak('bruschetta')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-blue-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇫🇷 French</span>
                    <span className="text-lg font-black font-mono bg-blue-200 text-blue-950 px-2 py-0.5 rounded">qu / que</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-blue-950">Spelled "qu" or "-que"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    French /k/ endings are almost always written "-que" (boutique, etiquette).
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-blue-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>etiquette</span> <button onClick={() => handleSpeak('etiquette')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>boutique</span> <button onClick={() => handleSpeak('boutique')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>
              </>
            )}

            {/* SOUND: /s/ */}
            {selectedSound === 's' && (
              <>
                <div className="bg-amber-50/70 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🏛️ Latin</span>
                    <span className="text-lg font-black font-mono bg-amber-200 text-amber-950 px-2 py-0.5 rounded">Soft "c"</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-amber-950">"c" Before e, i, y</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Latin words overwhelmingly spell the /s/ sound with "c" before soft vowels!
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-amber-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>circuit</span> <button onClick={() => handleSpeak('circuit')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>deciduous</span> <button onClick={() => handleSpeak('deciduous')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>century</span> <button onClick={() => handleSpeak('century')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇬🇷 Greek</span>
                    <span className="text-lg font-black font-mono bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded">s / syn-</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-emerald-950">Letter Sigma (Σ)</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Greek prefixes syn- / sym- and root sigma represent /s/ with "s".
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-emerald-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>syllable</span> <button onClick={() => handleSpeak('syllable')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>synchronize</span> <button onClick={() => handleSpeak('synchronize')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-blue-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇫🇷 French</span>
                    <span className="text-lg font-black font-mono bg-blue-200 text-blue-950 px-2 py-0.5 rounded">ç / ss</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-blue-950">Cedilla "ç" or "ss"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Cedilla softens "c" before a/o/u; double "ss" prevents a voiced /z/.
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-blue-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>croissant</span> <button onClick={() => handleSpeak('croissant')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>facade</span> <button onClick={() => handleSpeak('facade')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-purple-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇬🇧 Old English</span>
                    <span className="text-lg font-black font-mono bg-purple-200 text-purple-950 px-2 py-0.5 rounded">s / ss</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-purple-950">Direct "s" or "ss"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Native Germanic words use traditional "s" or "-ss".
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-purple-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>sunflower</span> <button onClick={() => handleSpeak('sunflower')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>
              </>
            )}

            {/* SOUND: /tʃ/ (ch) */}
            {selectedSound === 'ch_sound' && (
              <>
                <div className="bg-rose-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇮🇹 Italian</span>
                    <span className="text-lg font-black font-mono bg-rose-200 text-rose-950 px-2 py-0.5 rounded">c / cc</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-rose-950">"c" or "cc" Before e/i</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Italian letter "c" or "cc" sounds like /tʃ/ before soft vowels!
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-rose-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>cappuccino</span> <button onClick={() => handleSpeak('cappuccino')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>concerto</span> <button onClick={() => handleSpeak('concerto')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>cello</span> <button onClick={() => handleSpeak('cello')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-amber-50/70 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🏛️ Latin</span>
                    <span className="text-lg font-black font-mono bg-amber-200 text-amber-950 px-2 py-0.5 rounded">-ture</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-amber-950">Latin Suffix "-ture"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    In English pronunciation, the Latin suffix "-tura" produces /tʃər/!
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-amber-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>creature</span> <button onClick={() => handleSpeak('creature')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>nature</span> <button onClick={() => handleSpeak('nature')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-red-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇪🇸 Spanish</span>
                    <span className="text-lg font-black font-mono bg-red-200 text-red-950 px-2 py-0.5 rounded">ch</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-red-950">Spelled "ch"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Spanish "ch" consistently makes the crisp /tʃ/ sound!
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-red-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>macho</span> <button onClick={() => handleSpeak('macho')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>nacho</span> <button onClick={() => handleSpeak('nacho')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-purple-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇬🇧 Old English</span>
                    <span className="text-lg font-black font-mono bg-purple-200 text-purple-950 px-2 py-0.5 rounded">ch / tch</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-purple-950">"ch" or "-tch"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Anglo-Saxon words spell /tʃ/ with "ch" or short vowel "-tch".
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-purple-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>church</span> <button onClick={() => handleSpeak('church')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>match</span> <button onClick={() => handleSpeak('match')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>
              </>
            )}

            {/* SOUND: /oʊ/ (oh) */}
            {selectedSound === 'oh' && (
              <>
                <div className="bg-blue-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇫🇷 French</span>
                    <span className="text-lg font-black font-mono bg-blue-200 text-blue-950 px-2 py-0.5 rounded">-eau / -ot</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-blue-950">Written "-eau"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Trigraph "-eau" is the hallmark of French final /oh/!
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-blue-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>plateau</span> <button onClick={() => handleSpeak('plateau')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>bureau</span> <button onClick={() => handleSpeak('bureau')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>depot</span> <button onClick={() => handleSpeak('depot')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-rose-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇮🇹 Italian</span>
                    <span className="text-lg font-black font-mono bg-rose-200 text-rose-950 px-2 py-0.5 rounded">-o</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-rose-950">Simple "-o"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Italian words end directly in a single open vowel "-o".
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-rose-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>allegro</span> <button onClick={() => handleSpeak('allegro')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>staccato</span> <button onClick={() => handleSpeak('staccato')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>concerto</span> <button onClick={() => handleSpeak('concerto')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-red-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇪🇸 Spanish</span>
                    <span className="text-lg font-black font-mono bg-red-200 text-red-950 px-2 py-0.5 rounded">-o</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-red-950">Simple "-o"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Spanish matches Italian with straightforward phonetic "-o".
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-red-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>embargo</span> <button onClick={() => handleSpeak('embargo')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>rodeo</span> <button onClick={() => handleSpeak('rodeo')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-purple-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇬🇧 English</span>
                    <span className="text-lg font-black font-mono bg-purple-200 text-purple-950 px-2 py-0.5 rounded">-ow / -oe</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-purple-950">"-ow", "-oe", "-o"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Anglo-Saxon words use "-ow" (elbow, meadow, shadow).
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-purple-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>meadow</span> <button onClick={() => handleSpeak('meadow')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>
              </>
            )}

            {/* SOUND: /aɪ/ (eye) */}
            {selectedSound === 'eye' && (
              <>
                <div className="bg-amber-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇩🇪 German</span>
                    <span className="text-lg font-black font-mono bg-amber-200 text-amber-950 px-2 py-0.5 rounded">ei</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-amber-950">Diphthong "ei"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Always "ei" for the /aɪ/ sound in German (poltergeist, edelweiss).
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-amber-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>poltergeist</span> <button onClick={() => handleSpeak('poltergeist')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>edelweiss</span> <button onClick={() => handleSpeak('edelweiss')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇬🇷 Greek</span>
                    <span className="text-lg font-black font-mono bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded">y</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-emerald-950">Vowel "y"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    From Upsilon. Sounds like /aɪ/ in open syllables (rhyme, typhoon).
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-emerald-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>rhyme</span> <button onClick={() => handleSpeak('rhyme')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>typhoon</span> <button onClick={() => handleSpeak('typhoon')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-purple-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇬🇧 Old English</span>
                    <span className="text-lg font-black font-mono bg-purple-200 text-purple-950 px-2 py-0.5 rounded">igh / i_e</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-purple-950">"-igh" with silent "gh"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    Old English uses the silent cluster "igh" (knight, night, sight).
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-purple-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>knight</span> <button onClick={() => handleSpeak('knight')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                    <div className="flex justify-between items-center"><span>sight</span> <button onClick={() => handleSpeak('sight')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>

                <div className="bg-blue-50 p-5 rounded-3xl border-3 border-[#560e51] shadow-[4px_4px_0px_0px_#560e51] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">🇫🇷 French</span>
                    <span className="text-lg font-black font-mono bg-blue-200 text-blue-950 px-2 py-0.5 rounded">-aille / -eille</span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-blue-950">Written "-aille"</h4>
                  <p className="text-xs font-bold text-slate-700">
                    In French, double "ll" creates the liquid /aɪ/ or /eɪ/ glide.
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-blue-200 text-xs font-mono font-bold">
                    <div className="flex justify-between items-center"><span>versailles</span> <button onClick={() => handleSpeak('versailles')}><Volume2 className="w-3.5 h-3.5" /></button></div>
                  </div>
                </div>
              </>
            )}

          </div>
        </motion.div>
      )}

      {/* ======================================================== */}
      {/* VIEW 3: INTERACTIVE "SPOT THE ORIGIN" CHALLENGE          */}
      {/* ======================================================== */}
      {activeTab === 'origin-quiz' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#560e51] shadow-[6px_6px_0px_0px_#560e51] space-y-6"
        >
          {/* Quiz Header & Scoreboard */}
          <div className="flex items-center justify-between border-b-2 border-fuchsia-100 pb-4">
            <div>
              <span className="text-xs font-mono font-black uppercase text-[#9b2c98]">
                Interactive Classroom Game
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase">
                Spot the Language of Origin 🏆
              </h3>
              <p className="text-xs font-bold text-slate-600">
                Question {currentQuizIndex + 1} of {COMPREHENSIVE_QUIZ_QUESTIONS.length} · Listen to the word and clues, then deduce the origin!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-black bg-[#fdf2fe] text-[#560e51] border border-[#560e51] px-3 py-1 rounded-xl">
                Score: {quizScore} / {COMPREHENSIVE_QUIZ_QUESTIONS.length}
              </span>
              <button
                onClick={resetQuiz}
                className="p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                title="Restart Quiz"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Prompt Card */}
          <div className="bg-[#fefaf0] p-6 rounded-2xl border-3 border-[#560e51] shadow-[3px_3px_0px_0px_#560e51] space-y-4 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-black uppercase text-slate-500">Target Word:</span>
                <div className="flex items-center gap-3 justify-center sm:justify-start mt-0.5">
                  <h4 className="text-3xl sm:text-4xl font-black font-mono text-[#560e51] tracking-wide">
                    {currentQuizItem.word}
                  </h4>
                  <span className="text-sm font-mono text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {currentQuizItem.ipa}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleSpeak(currentQuizItem.word)}
                className="px-5 py-2.5 rounded-xl bg-[#78c222] hover:bg-[#68ab1c] text-[#560e51] font-black text-xs uppercase tracking-tight border-2 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51] cursor-pointer flex items-center gap-2 shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear Word 2x</span>
              </button>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 leading-relaxed">
              <strong>Definition:</strong> {currentQuizItem.definition}
            </div>

            <div className="p-3 bg-fuchsia-50 rounded-xl border border-fuchsia-200 text-xs font-bold text-fuchsia-950 leading-relaxed">
              <strong>Orthographic Clue:</strong> {currentQuizItem.clue}
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-black uppercase text-slate-600 block">
              WHICH LANGUAGE OF ORIGIN EXPLAINS THIS SPELLING?
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentQuizItem.options.map((opt) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = opt === currentQuizItem.correctOrigin;

                let btnStyle = 'bg-white hover:bg-slate-50 text-slate-900 border-[#560e51] shadow-[2px_2px_0px_0px_#560e51]';
                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500 text-white border-[#560e51] shadow-[3px_3px_0px_0px_#560e51]';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-500 text-white border-[#560e51] shadow-[3px_3px_0px_0px_#560e51]';
                  } else {
                    btnStyle = 'bg-slate-100 text-slate-400 border-slate-300';
                  }
                }

                return (
                  <button
                    key={opt}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleQuizAnswer(opt)}
                    className={`p-4 rounded-2xl border-2 text-sm font-black uppercase tracking-tight transition-all cursor-pointer flex items-center justify-center gap-2 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswerSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                    {isAnswerSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Banner */}
          {isAnswerSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border-2 ${
                selectedAnswer === currentQuizItem.correctOrigin
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              } flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`}
            >
              <div>
                <p className="text-xs font-black uppercase font-mono">
                  {selectedAnswer === currentQuizItem.correctOrigin ? '✅ Correct Origin Deduction! (+10 pts)' : '❌ Incorrect Origin Deduction'}
                </p>
                <p className="text-xs font-bold mt-0.5">
                  {currentQuizItem.explanation}
                </p>
              </div>

              <button
                onClick={nextQuizQuestion}
                className="px-4 py-2 bg-[#560e51] hover:bg-[#43093f] text-[#78c222] font-black text-xs uppercase tracking-tight rounded-xl border border-[#78c222] cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <span>{currentQuizIndex < COMPREHENSIVE_QUIZ_QUESTIONS.length - 1 ? 'Next Word' : 'Finish Challenge'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}

        </motion.div>
      )}

    </div>
  );
}
