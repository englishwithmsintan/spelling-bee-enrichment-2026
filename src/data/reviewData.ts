import { Flashcard, TrickyPattern, DictationWord, BoxChallenge, SpellingWord, Finalist, AuditionCandidate, MatchPair } from '../types';
import { COMPREHENSIVE_LOAN_WORDS } from './loanWordsData';
import { SCRIPPS_HOMOPHONE_PAIRS } from './homophonesData';

// =============================================================================
// MEETING 2: "WORD ROOTS & PATTERNS" (Grade 3–6 • 90 Minutes)
// =============================================================================

// Slide 4: Warm-Up Word List (10 words)
export const MEETING_2_WARM_UP: DictationWord[] = [
  {
    id: 'm2-wu-1',
    word: 'triumphant',
    definition: 'feeling or expressing great joy after winning a victory',
    sentence: 'The team raised the championship trophy with triumphant cheers.',
    difficulty: 'Warm-Up',
    trickyPart: "Ends with '-ant' (t-r-i-u-m-p-h-a-n-t) with 'ph' as /f/"
  },
  {
    id: 'm2-wu-2',
    word: 'guardian',
    definition: 'a person who protects or takes care of someone or something',
    sentence: 'Her legal guardian signed the safety permission slip.',
    difficulty: 'Warm-Up',
    trickyPart: "Silent 'u' after 'g': g-u-a-r-d-i-a-n"
  },
  {
    id: 'm2-wu-3',
    word: 'cascade',
    definition: 'a small waterfall, or things happening one after another in quick succession',
    sentence: 'A cool cascade of mountain water tumbled over the river stones.',
    difficulty: 'Warm-Up',
    trickyPart: "Two 'c's with different sounds: /k/ then soft /s/ with silent 'e'"
  },
  {
    id: 'm2-wu-4',
    word: 'amphibian',
    definition: 'an animal that can live both in water and on land',
    sentence: 'A spotted salamander is an amphibian that breathes with gills as a larva.',
    difficulty: 'Warm-Up',
    trickyPart: "Greek root 'amphi' + 'bio': 'ph' makes the /f/ sound"
  },
  {
    id: 'm2-wu-5',
    word: 'eavesdrop',
    definition: 'to secretly listen to a private conversation',
    sentence: 'It is bad manners to eavesdrop through the open window.',
    difficulty: 'Warm-Up',
    trickyPart: "Begins with 'e-a-v-e-s', not 'eves'"
  },
  {
    id: 'm2-wu-6',
    word: 'astonish',
    definition: 'to surprise or amaze someone greatly',
    sentence: 'Her phenomenal memory for words will astonish the audience.',
    difficulty: 'Warm-Up',
    trickyPart: "Ends in '-ish' (not '-ist' or '-ishn')"
  },
  {
    id: 'm2-wu-7',
    word: 'genius',
    definition: 'exceptional intellectual or creative power or natural ability',
    sentence: 'Thomas Edison showed inventive genius throughout his lifetime.',
    difficulty: 'Warm-Up',
    trickyPart: "Ends in '-us' (noun), unlike adjectives ending in '-ous'"
  },
  {
    id: 'm2-wu-8',
    word: 'fortification',
    definition: 'a structure or defensive wall built to protect against attack',
    sentence: 'The ancient fortress was protected by a thick stone fortification.',
    difficulty: 'Warm-Up',
    trickyPart: "From Latin 'fortis' (strong): f-o-r-t-i-f-i-c-a-t-i-o-n"
  },
  {
    id: 'm2-wu-9',
    word: 'remedial',
    definition: 'intended as a remedy to improve or cure a weakness or deficiency',
    sentence: 'He enrolled in a remedial phonics clinic to boost his reading accuracy.',
    difficulty: 'Warm-Up',
    trickyPart: "r-e-m-e-d-i-a-l (contains 'remedy' root)"
  },
  {
    id: 'm2-wu-10',
    word: 'trivia',
    definition: 'pieces of information of little value or importance; quiz facts',
    sentence: 'We played an engaging general knowledge trivia game at the bee party.',
    difficulty: 'Warm-Up',
    trickyPart: "t-r-i-v-i-a (plural of Latin 'trivium')"
  }
];

// Slide 5: Tricky Spelling Patterns (Meeting 2)
export const MEETING_2_PATTERNS: TrickyPattern[] = [
  {
    id: 'm2-pat-dis',
    title: 'Prefix DIS-',
    category: 'roots-affixes',
    rule: "The Latin prefix dis- means 'not', 'opposite of', or 'away / to leave'.",
    keyWord: 'disembark',
    keyWordExplanation: "dis- means 'not / away' — to leave a ship, airplane, or vehicle.",
    additionalExamples: [
      'disembark (leave a ship or plane)',
      'disconnect (break a connection)',
      'disarray (state of confusion / not orderly)',
      'disinfect (clean away infection)'
    ],
    spotlightHint: "Prefix 'dis-' attaches directly to the root without doubling the 's' unless the base starts with 's'!"
  },
  {
    id: 'm2-pat-tele',
    title: 'Root TELE-',
    category: 'roots-affixes',
    rule: "The Greek root 'tele-' means 'far' or 'distant'.",
    keyWord: 'telepathic',
    keyWordExplanation: "tele- means 'far' + pathos (feeling) — reading minds from far away!",
    additionalExamples: [
      'telepathic (reading thoughts from far away)',
      'telescope (instrument for viewing distant stars)',
      'telephone (device transmitting sound across distance)',
      'teleport (travel across distance instantaneously)'
    ],
    spotlightHint: "Whenever you see 'tele-', think 'far away' or 'long distance'!"
  },
  {
    id: 'm2-pat-ous',
    title: 'Suffix -OUS',
    category: 'roots-affixes',
    rule: "The suffix '-ous' converts a noun into an adjective meaning 'full of' or 'characterized by'.",
    keyWord: 'harmonious',
    keyWordExplanation: "-ous means 'full of' — full of harmony, melody, and agreement!",
    additionalExamples: [
      'harmonious (full of harmony and melody)',
      'courageous (full of courage)',
      'perilous (full of peril / danger)',
      'miraculous (full of wonder and miracles)'
    ],
    spotlightHint: "Remember: '-ous' creates adjectives (harmonious, famous), while '-us' is usually a noun (genius, cactus)!"
  }
];

// Slide 6 & 7: Word Study Rounds 1 & 2 (Meeting 2 "Words to Know")
export const MEETING_2_WORDS_TO_KNOW: Flashcard[] = [
  // Round 1 (Slide 6)
  {
    id: 'm2-r1-1',
    word: 'eavesdrop',
    definition: 'to secretly listen to a private conversation',
    partOfSpeech: 'verb',
    category: 'meeting-2-words-to-know',
    example: 'It is impolite to eavesdrop on people having a private meeting.',
    syllables: 'eaves-drop',
    phoneticHint: '/ˈiːvz.drɑːp/',
    languageOrigin: 'Old English (efesdrype)',
    trickyPattern: "Compound: 'eaves' + 'drop'. Don't forget the 'e' before the 'a'!",
    lesson: 'Meeting 2 · Round 1',
    funFact: "Originated from standing under house eaves where rainwater dripped down to spy on indoor talk!"
  },
  {
    id: 'm2-r1-2',
    word: 'guardian',
    definition: 'a person who protects or takes care of someone',
    partOfSpeech: 'noun',
    category: 'meeting-2-words-to-know',
    example: 'Her legal guardian accompanied her to the spelling bee championship.',
    syllables: 'guard-i-an',
    phoneticHint: '/ˈɡɑːr.di.ən/',
    languageOrigin: 'Old French (guardein)',
    trickyPattern: "Starts with 'G-U-A-R-D' with silent 'u'.",
    lesson: 'Meeting 2 · Round 1',
    funFact: "Related to 'warden' — both come from ancient Germanic words meaning to watch over!"
  },
  {
    id: 'm2-r1-3',
    word: 'cascade',
    definition: 'a small waterfall, or things happening one after another in quick succession',
    partOfSpeech: 'noun / verb',
    category: 'meeting-2-words-to-know',
    example: 'A shimmering cascade of water flowed down the mountain rocks.',
    syllables: 'cas-cade',
    phoneticHint: '/kæsˈkeɪd/',
    languageOrigin: 'French / Italian (cascata)',
    trickyPattern: "First 'c' is hard /k/, second 'c' is soft /s/ before 'a-d-e'.",
    lesson: 'Meeting 2 · Round 1',
    funFact: "Can describe physical waterfalls and a cascade of dominoes or notifications!"
  },
  {
    id: 'm2-r1-4',
    word: 'amphibian',
    definition: 'an animal that can live both in water and on land',
    partOfSpeech: 'noun',
    category: 'meeting-2-words-to-know',
    example: 'A green bullfrog is an amphibian that undergoes metamorphosis from a tadpole.',
    syllables: 'am-phib-i-an',
    phoneticHint: '/æmˈfɪb.i.ən/',
    languageOrigin: 'Greek (amphi = both + bios = life)',
    trickyPattern: "'ph' makes the /f/ sound, followed by 'i-b-i-a-n'.",
    lesson: 'Meeting 2 · Round 1',
    funFact: "Greek 'amphi' literally means dual — living both in aquatic and terrestrial worlds!"
  },

  // Round 2 (Slide 7)
  {
    id: 'm2-r2-1',
    word: 'astonish',
    definition: 'to surprise or amaze someone greatly',
    partOfSpeech: 'verb',
    category: 'meeting-2-words-to-know',
    example: 'His ability to spell any word backwards will astonish the audience.',
    syllables: 'as-ton-ish',
    phoneticHint: '/əˈstɑː.nɪʃ/',
    languageOrigin: 'Old French (estoner - to thunderstrike)',
    trickyPattern: "Standard phonetics, ends in '-ish'.",
    lesson: 'Meeting 2 · Round 2',
    funFact: "Shares an ancient Latin root with 'stun' and 'thunderstruck'!"
  },
  {
    id: 'm2-r2-2',
    word: 'fortification',
    definition: 'a structure built to defend against attack',
    partOfSpeech: 'noun',
    category: 'meeting-2-words-to-know',
    example: 'The ancient stone castle featured a thick rampart fortification.',
    syllables: 'for-ti-fi-ca-tion',
    phoneticHint: '/ˌfɔːr.tə.fəˈkeɪ.ʃən/',
    languageOrigin: 'Latin (fortis = strong + facere = to make)',
    trickyPattern: "Five syllables built from root 'fort' (strong) + '-ification'.",
    lesson: 'Meeting 2 · Round 2',
    funFact: "Words like fort, fortress, fortitude, and reinforce all come from Latin 'fortis'!"
  },
  {
    id: 'm2-r2-3',
    word: 'hydra',
    definition: 'a mythical serpent with many heads that regrows two heads when one is cut off',
    partOfSpeech: 'noun',
    category: 'meeting-2-words-to-know',
    example: 'In ancient Greek mythology, Hercules fought the venomous Lernaean Hydra.',
    syllables: 'hy-dra',
    phoneticHint: '/ˈhaɪ.drə/',
    languageOrigin: 'Greek (hydor = water)',
    trickyPattern: "Uses 'y' for long /aɪ/ vowel sound: h-y-d-r-a.",
    lesson: 'Meeting 2 · Round 2',
    funFact: "In modern biology, a hydra is a real tiny freshwater organism that regenerates lost body parts!"
  },
  {
    id: 'm2-r2-4',
    word: 'volumetric',
    definition: 'relating to the measurement of volume or capacity',
    partOfSpeech: 'adjective',
    category: 'meeting-2-words-to-know',
    example: 'The chemistry student measured the liquid using a volumetric flask.',
    syllables: 'vol-u-met-ric',
    phoneticHint: '/ˌvɑːl.jəˈmet.rɪk/',
    languageOrigin: 'Latin (volumen - roll/volume)',
    trickyPattern: "Root 'volume' drops 'e' and inserts 'u' before '-metric'.",
    lesson: 'Meeting 2 · Round 2',
    funFact: "Volumetric titration is one of the most precise quantitative chemical techniques."
  }
];

// Slide 8: Listening Stations (Meeting 2)
export const MEETING_2_STATION_1_PARTNER: string[] = [
  'triumphant', 'guardian', 'cascade', 'amphibian', 'eavesdrop',
  'astonish', 'genius', 'fortification', 'remedial', 'trivia'
];

export const MEETING_2_STATION_2_AUDIO: string[] = [
  'gargantuan', 'chaotic', 'shrimp', 'satellite', 'parasite',
  'favorite', 'famous', 'pristine', 'golden', 'modesty'
];

export const MEETING_2_STATION_3_QUIZ: string[] = [
  'jealousy', 'vouch', 'trivia', 'shoulder', 'zebra',
  'butterscotch', 'apron', 'beagle', 'kidney', 'raven'
];

// Slide 10: Mock Spelling Bee Stage List (Meeting 2 - 15 words)
// Specifically aligned to grade 3-6 lesson patterns (dis-, tele-, -ous, silent letters, double consonants)
export const MEETING_2_MOCK_BEE_WORDS: string[] = [
  'disembark', 'flannel', 'telepathic', 'guardian', 'harmonious',
  'gimmick', 'cucumber', 'eavesdrop', 'nephew', 'astonish',
  'janitor', 'amphibian', 'miraculous', 'volcano', 'disconnect'
];

// Slide 12: Progress Check Word List (Meeting 2 - 10 words)
export const MEETING_2_PROGRESS_CHECK: DictationWord[] = [
  {
    id: 'm2-pc-1',
    word: 'miraculous',
    definition: 'resembling a miracle; extraordinary and wonderful',
    sentence: 'The trapped puppy made a miraculous escape from the storm drain.',
    difficulty: 'Progress-Check',
    trickyPart: "Ends with '-ulous' (m-i-r-a-c-u-l-o-u-s)"
  },
  {
    id: 'm2-pc-2',
    word: 'trendy',
    definition: 'very fashionable or up to date in style',
    sentence: 'She wore a trendy yellow jacket to the spelling bee banquet.',
    difficulty: 'Progress-Check',
    trickyPart: "t-r-e-n-d-y (ends in 'y')"
  },
  {
    id: 'm2-pc-3',
    word: 'permafrost',
    definition: 'a thick subsurface layer of soil that remains frozen throughout the year',
    sentence: 'The Arctic tundra is anchored by thousands of feet of permafrost.',
    difficulty: 'Progress-Check',
    trickyPart: "Compound: 'perma' (permanent) + 'frost'"
  },
  {
    id: 'm2-pc-4',
    word: 'iceberg',
    definition: 'a large floating mass of ice detached from a glacier into the sea',
    sentence: 'The ship navigated carefully around the towering blue iceberg.',
    difficulty: 'Progress-Check',
    trickyPart: "i-c-e-b-e-r-g"
  },
  {
    id: 'm2-pc-5',
    word: 'cactus',
    definition: 'a succulent plant with a thick fleshy stem and spines',
    sentence: 'The saguaro cactus blooms with white blossoms in the desert heat.',
    difficulty: 'Progress-Check',
    trickyPart: "Ends in '-us' (noun form, not '-ous')"
  },
  {
    id: 'm2-pc-6',
    word: 'nationalism',
    definition: 'identification with one’s own nation and support for its interests',
    sentence: 'Flags wave proudly as a symbol of shared civic nationalism.',
    difficulty: 'Progress-Check',
    trickyPart: "Root 'nation' + '-al' + '-ism'"
  },
  {
    id: 'm2-pc-7',
    word: 'leeway',
    definition: 'the amount of freedom to move or act that is available',
    sentence: 'The judge gave the nervous speller some leeway to collect her thoughts.',
    difficulty: 'Progress-Check',
    trickyPart: "Double 'e': l-e-e-w-a-y"
  },
  {
    id: 'm2-pc-8',
    word: 'pilferer',
    definition: 'a thief who steals items of small value',
    sentence: 'The mischievous raccoon was a nocturnal pilferer of campsite snacks.',
    difficulty: 'Progress-Check',
    trickyPart: "Ends with '-er-er': p-i-l-f-e-r-e-r"
  },
  {
    id: 'm2-pc-9',
    word: 'rollicking',
    definition: 'exuberantly lively and amusing; high-spirited',
    sentence: 'The classroom shared a rollicking celebration after the final round.',
    difficulty: 'Progress-Check',
    trickyPart: "Contains 'ck' + 'ing': r-o-l-l-i-c-k-i-n-g"
  },
  {
    id: 'm2-pc-10',
    word: 'quart',
    definition: 'a unit of liquid capacity equal to a quarter of a gallon',
    sentence: 'We bought a cold quart of fresh milk at the country market.',
    difficulty: 'Progress-Check',
    trickyPart: "q-u-a-r-t (begins with 'qu')"
  }
];

// Meeting 2 Full 59 Words (From Study List Handout)
export const MEETING_2_FULL_59_WORDS: string[] = [
  'triumphant', 'guardian', 'cascade', 'amphibian', 'eavesdrop',
  'astonish', 'genius', 'fortification', 'remedial', 'trivia',
  'disembark', 'telepathic', 'harmonious', 'hydra', 'volumetric',
  'gargantuan', 'chaotic', 'shrimp', 'satellite', 'parasite',
  'favorite', 'famous', 'pristine', 'golden', 'modesty',
  'jealousy', 'vouch', 'shoulder', 'zebra', 'butterscotch',
  'apron', 'beagle', 'kidney', 'raven', 'gimmick',
  'flannel', 'cucumber', 'janitor', 'lionize', 'spreadsheet',
  'badger', 'nephew', 'imbibe', 'savvy', 'reckon',
  'boorish', 'nurture', 'volcano', 'forensics', 'miraculous',
  'trendy', 'permafrost', 'iceberg', 'cactus', 'nationalism',
  'leeway', 'pilferer', 'rollicking', 'quart'
];

// =============================================================================
// MEETING 3: "LEVELING UP: TWO-BEE WORDS" (Grade 3–6 • 90 Minutes)
// =============================================================================

// Slide 4: Warm-Up Word List (Meeting 3 - 10 words)
export const MEETING_3_WARM_UP: DictationWord[] = [
  {
    id: 'm3-wu-1',
    word: 'hexagonal',
    definition: 'having six straight sides and six angles',
    sentence: 'Bees build honeycombs with a beautiful hexagonal pattern.',
    difficulty: 'Warm-Up',
    trickyPart: "From Greek 'hexa' (six): h-e-x-a-g-o-n-a-l"
  },
  {
    id: 'm3-wu-2',
    word: 'seethe',
    definition: 'to bubble up as if boiling, or be filled with intense unexpressed anger',
    sentence: 'He tried not to seethe with frustration after missing the letter.',
    difficulty: 'Warm-Up',
    trickyPart: "Ends with 't-h-e' with double 'e': s-e-e-t-h-e"
  },
  {
    id: 'm3-wu-3',
    word: 'antiquarian',
    definition: 'a person who collects or studies rare, ancient objects and books',
    sentence: 'The antiquarian examined the centuries-old illuminated manuscript.',
    difficulty: 'Warm-Up',
    trickyPart: "Contains 'quar' (q-u-a-r) + '-ian'"
  },
  {
    id: 'm3-wu-4',
    word: 'bachelorette',
    definition: 'an unmarried woman, or a celebration for a bride-to-be',
    sentence: 'The bridesmaids organized a festive bachelorette brunch.',
    difficulty: 'Warm-Up',
    trickyPart: "Ends with French diminutive '-ette': b-a-c-h-e-l-o-r-e-t-t-e"
  },
  {
    id: 'm3-wu-5',
    word: 'unctuous',
    definition: 'excessively flattering or oily in speech; greasy in texture',
    sentence: 'The dishonest salesman spoke with an unctuous and insincere tone.',
    difficulty: 'Warm-Up',
    trickyPart: "u-n-c-t-u-o-u-s (contains 'ct' + 'u' + 'ous')"
  },
  {
    id: 'm3-wu-6',
    word: 'fluoride',
    definition: 'a compound of fluorine added to drinking water to strengthen teeth',
    sentence: 'Brushing with fluoride toothpaste helps protect against dental cavities.',
    difficulty: 'Warm-Up',
    trickyPart: "'u' comes before 'o': f-l-u-o-r-i-d-e (not flouride!)"
  },
  {
    id: 'm3-wu-7',
    word: 'epilepsy',
    definition: 'a neurological disorder marked by sudden recurrent seizures',
    sentence: 'Modern medicine provides effective treatments to manage epilepsy.',
    difficulty: 'Warm-Up',
    trickyPart: "Ends in '-lepsy': e-p-i-l-e-p-s-y"
  },
  {
    id: 'm3-wu-8',
    word: 'citronella',
    definition: 'a fragrant natural oil from grass, used as an insect repellent',
    sentence: 'We lit citronella candles to keep mosquitoes away from the porch.',
    difficulty: 'Warm-Up',
    trickyPart: "c-i-t-r-o-n-e-l-l-a (double 'l')"
  },
  {
    id: 'm3-wu-9',
    word: 'palliative',
    definition: 'relieving pain or alleviating symptoms without curing the cause',
    sentence: 'The doctor provided gentle palliative care to soothe the patient.',
    difficulty: 'Warm-Up',
    trickyPart: "Double 'l': p-a-l-l-i-a-t-i-v-e"
  },
  {
    id: 'm3-wu-10',
    word: 'personnel',
    definition: 'people employed in an organization or military service',
    sentence: 'Only authorized security personnel are permitted in the control room.',
    difficulty: 'Warm-Up',
    trickyPart: "Double 'n', single 'l': p-e-r-s-o-n-n-e-l (different from personal!)"
  }
];

// Slide 5: Tricky Spelling Patterns (Meeting 3)
export const MEETING_3_PATTERNS: TrickyPattern[] = [
  {
    id: 'm3-pat-french',
    title: 'French Loanwords',
    category: 'french-loanwords',
    rule: "Borrowed words often keep their original accent marks and silent letters from French.",
    keyWord: 'soirée',
    keyWordExplanation: "borrowed words often keep their accent marks — an evening party!",
    additionalExamples: [
      'soirée (an evening party, keeps accent mark é)',
      'faux (artificial or fake — silent x!)',
      'duvet (soft warm bed quilt — silent t!)',
      'rotisserie (spinning grill for roasting meat)'
    ],
    spotlightHint: "French loanwords frequently have accent marks (é) and silent final consonants (t, x)!"
  },
  {
    id: 'm3-pat-phil',
    title: 'Root PHIL-',
    category: 'roots-affixes',
    rule: "The Greek root 'phil-' means 'love', 'devotion to', or 'friendship'.",
    keyWord: 'philharmonic',
    keyWordExplanation: "phil- means 'love' — devoted to (in love with) music!",
    additionalExamples: [
      'philharmonic (devoted to music / symphony orchestra)',
      'philosophy (love of wisdom)',
      'philanthropy (love of humankind / charity)',
      'bibliophile (someone who loves books)'
    ],
    spotlightHint: "Greek 'ph' makes the /f/ sound, combined with 'i-l'!"
  },
  {
    id: 'm3-pat-phobia',
    title: 'Root -PHOBIA',
    category: 'roots-affixes',
    rule: "The Greek root '-phobia' means 'fear' or 'intense aversion'.",
    keyWord: 'brontophobia',
    keyWordExplanation: "-phobia means 'fear' — fear of thunder!",
    additionalExamples: [
      'brontophobia (fear of thunder and lightning)',
      'claustrophobia (fear of tight enclosed spaces)',
      'arachnophobia (fear of spiders)',
      'hydrophobia (fear of water)'
    ],
    spotlightHint: "Always ends in p-h-o-b-i-a. Greek roots feature the 'ph' spelling!"
  }
];

// Slide 6 & 7 & Extended Mastery: Word Study Rounds 1 through 9 (Meeting 3 "Words to Know")
export const MEETING_3_WORDS_TO_KNOW: Flashcard[] = [
  // Round 1: French Elegance & Silent Letters
  {
    id: 'm3-r1-1',
    word: 'soirée',
    definition: 'an elegant evening party or social gathering, often with music or performances',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The school orchestra hosted a festive evening soirée for parents and teachers.',
    syllables: 'soi-rée',
    phoneticHint: '/swɑːˈreɪ/',
    languageOrigin: 'French (soir = evening)',
    trickyPattern: "Retains the acute accent 'é' over the first 'e': s-o-i-r-é-e.",
    lesson: 'Meeting 3 · Round 1',
    funFact: "In French, 'soir' means evening; a soirée is literally an entire evening spent in celebration!"
  },
  {
    id: 'm3-r1-2',
    word: 'duvet',
    definition: 'a soft quilt filled with down, feathers, or synthetic fiber',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'She bundled up warmly under the thick down duvet on chilly winter nights.',
    syllables: 'du-vet',
    phoneticHint: '/duːˈveɪ/',
    languageOrigin: 'French (down / fine soft feathers)',
    trickyPattern: "Silent final 't' pronounced like /eɪ/: d-u-v-e-t.",
    lesson: 'Meeting 3 · Round 1',
    funFact: "The word comes from Old French for 'down feathers' plucked from geese and ducks!"
  },
  {
    id: 'm3-r1-3',
    word: 'faux',
    definition: 'made in imitation; artificial, not genuine, or imitation',
    partOfSpeech: 'adjective',
    category: 'meeting-3-words-to-know',
    example: 'He wore a stylish winter parka trimmed with cozy faux fur.',
    syllables: 'faux',
    phoneticHint: '/foʊ/',
    languageOrigin: 'French (false)',
    trickyPattern: "Silent 'x' at the end: f-a-u-x (sounds like 'foe').",
    lesson: 'Meeting 3 · Round 1',
    funFact: "Borrowed straight from French; you will often hear 'faux pas' meaning a social blunder!"
  },
  {
    id: 'm3-r1-4',
    word: 'fondant',
    definition: 'a sweet, thick sugar paste rolled out to decorate fancy cakes',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The pastry chef sculpted delicate blue roses from rolled sugar fondant.',
    syllables: 'fon-dant',
    phoneticHint: '/ˈfɑːn.dənt/',
    languageOrigin: 'French (fondre = to melt)',
    trickyPattern: "French origin: ends in '-ant' (f-o-n-d-a-n-t).",
    lesson: 'Meeting 3 · Round 1',
    funFact: "It literally means 'melting' in French because the sugary paste melts deliciously in your mouth!"
  },

  // Round 2: The Two-Bee Greek Roots Lab
  {
    id: 'm3-r2-1',
    word: 'philharmonic',
    definition: 'devoted to music; commonly used in the name of symphony orchestras',
    partOfSpeech: 'adjective / noun',
    category: 'meeting-3-words-to-know',
    example: 'The city philharmonic performed Beethoven’s Fifth Symphony to a cheering crowd.',
    syllables: 'phil-har-mon-ic',
    phoneticHint: '/ˌfɪl.hɑːrˈmɑː.nɪk/',
    languageOrigin: 'Greek (phil- = love + harmonia = music/agreement)',
    trickyPattern: "Greek root 'phil-' (p-h-i-l) + 'harmonic'.",
    lesson: 'Meeting 3 · Round 2',
    funFact: "Literally translates from Greek as 'music-loving'!"
  },
  {
    id: 'm3-r2-2',
    word: 'brontophobia',
    definition: 'an abnormal fear of thunder and lightning storms',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'Her frightened golden retriever suffered from brontophobia during summer thunderstorms.',
    syllables: 'bron-to-pho-bia',
    phoneticHint: '/ˌbrɑːn.təˈfoʊ.bi.ə/',
    languageOrigin: 'Greek (bronte = thunder + phobos = fear)',
    trickyPattern: "Combines 'bronto' + Greek '-phobia' (p-h-o-b-i-a).",
    lesson: 'Meeting 3 · Round 2',
    funFact: "The dinosaur 'Brontosaurus' shares this exact same root, meaning 'thunder lizard'!"
  },
  {
    id: 'm3-r2-3',
    word: 'choreographer',
    definition: 'a person who composes and designs sequences of dance steps and movements',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The choreographer staged a breathtaking routine for the youth ballet showcase.',
    syllables: 'cho-re-og-ra-pher',
    phoneticHint: '/ˌkɔːr.iˈɑː.ɡrə.fər/',
    languageOrigin: 'Greek (choreia = dance + grapho = write)',
    trickyPattern: "'ch' pronounced like /k/, followed by 'o-r-e-o-g-r-a-p-h-e-r'.",
    lesson: 'Meeting 3 · Round 2',
    funFact: "Ancient Greek directors literally wrote dance notation like musical sheet music!"
  },
  {
    id: 'm3-r2-4',
    word: 'sophomoric',
    definition: 'conceited and overconfident of knowledge but poorly informed and immature',
    partOfSpeech: 'adjective',
    category: 'meeting-3-words-to-know',
    example: 'The coach cautioned the players that teasing competitors was sophomoric behavior.',
    syllables: 'soph-o-mor-ic',
    phoneticHint: '/ˌsɑː.fəˈmɔːr.ɪk/',
    languageOrigin: 'Greek (sophos = wise + moros = foolish)',
    trickyPattern: "Combines 'wise' and 'foolish' in Greek: s-o-p-h-o-m-o-r-i-c.",
    lesson: 'Meeting 3 · Round 2',
    funFact: "A famous oxymoron: combines 'sophos' (wise) with 'moros' (moron/foolish) = 'wise fool'!"
  },

  // Round 3: Latin Double Letters & Suffix Mastery
  {
    id: 'm3-r3-1',
    word: 'perseverance',
    definition: 'continued effort to do or achieve something despite difficulties, failure, or opposition',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'Through daily perseverance and word list review, she advanced to the spelling finals.',
    syllables: 'per-se-ver-ance',
    phoneticHint: '/ˌpɜːr.səˈvɪr.əns/',
    languageOrigin: 'Latin (perseverare = to abide strictly)',
    trickyPattern: "Ends in '-ance' (not '-ence')!",
    lesson: 'Meeting 3 · Round 3',
    funFact: "NASA named its sixth-generation Mars exploration rover 'Perseverance'!"
  },
  {
    id: 'm3-r3-2',
    word: 'personnel',
    definition: 'people employed in an organization or engaged in an organized undertaking',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'Only authorized laboratory personnel were permitted inside the cleanroom.',
    syllables: 'per-son-nel',
    phoneticHint: '/ˌpɜːr.səˈnɛl/',
    languageOrigin: 'French / Latin (personnel)',
    trickyPattern: "Double 'n', single 'l': p-e-r-s-o-n-n-e-l (do not confuse with 'personal')!",
    lesson: 'Meeting 3 · Round 3',
    funFact: "Classic competition trap word: 'personal' has 1 'n' and 1 'l', while 'personnel' has 2 'n's!"
  },
  {
    id: 'm3-r3-3',
    word: 'abhorrence',
    definition: 'a feeling of strong hatred, repugnance, or loathing',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The honorable referee had an abhorrence for dishonesty and unfair play.',
    syllables: 'ab-hor-rence',
    phoneticHint: '/æbˈhɔːr.əns/',
    languageOrigin: 'Latin (abhorrere = to shrink back with shuddering)',
    trickyPattern: "Double 'r' and ends with '-ence' (not '-ance'): a-b-h-o-r-r-e-n-c-e.",
    lesson: 'Meeting 3 · Round 3',
    funFact: "Root 'horrere' gives English the words horror, horrid, and horrific!"
  },
  {
    id: 'm3-r3-4',
    word: 'buoyancy',
    definition: 'the ability or tendency of an object to float in water or air',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The high buoyancy of the hollow wooden hull kept the kayak floating smoothly.',
    syllables: 'buoy-an-cy',
    phoneticHint: '/ˈbɔɪ.ən.si/',
    languageOrigin: 'Spanish (boyar = to float)',
    trickyPattern: "Starts with 'b-u-o-y' (silent 'u' after 'b') followed by '-ancy'.",
    lesson: 'Meeting 3 · Round 3',
    funFact: "Comes from ocean buoys, the floating markers guiding cargo ships into harbors!"
  },

  // Round 4: Botanical & Zoological Science
  {
    id: 'm3-r4-1',
    word: 'hydrangea',
    definition: 'a shrub with large, rounded clusters of white, pink, or blue flowers',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The front walkway was bordered by vibrant blue hydrangea bushes in full bloom.',
    syllables: 'hy-dran-ge-a',
    phoneticHint: '/haɪˈdreɪn.dʒə/',
    languageOrigin: 'Greek (hydor = water + angeion = vessel / cup-shaped seed pod)',
    trickyPattern: "Ends in '-gea' (soft 'g' sound followed by 'e-a').",
    lesson: 'Meeting 3 · Round 4',
    funFact: "Hydrangea petals change color based on soil pH: blue in acidic dirt, pink in alkaline dirt!"
  },
  {
    id: 'm3-r4-2',
    word: 'leguminous',
    definition: 'relating to or belonging to the pea or bean family of plants',
    partOfSpeech: 'adjective',
    category: 'meeting-3-words-to-know',
    example: 'Clover, lentils, and chickpeas are nutritious leguminous crops that restore soil nitrogen.',
    syllables: 'le-gu-mi-nous',
    phoneticHint: '/lɪˈɡjuː.mɪ.nəs/',
    languageOrigin: 'Latin (legumen = pulse / gathering)',
    trickyPattern: "l-e-g-u-m-i-n-o-u-s (ends in '-ous').",
    lesson: 'Meeting 3 · Round 4',
    funFact: "Leguminous plants are superpowers of agriculture because their roots fertilize the earth!"
  },
  {
    id: 'm3-r4-3',
    word: 'citronella',
    definition: 'a fragrant natural oil obtained from grass, used as an insect repellent and in perfume',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'We burned citronella candles on the patio to keep mosquitoes away during dusk.',
    syllables: 'cit-ro-nel-la',
    phoneticHint: '/ˌsɪt.rəˈnɛl.ə/',
    languageOrigin: 'French / Latin (citrus)',
    trickyPattern: "Soft 'c' at start, double 'l' near end: c-i-t-r-o-n-e-l-l-a.",
    lesson: 'Meeting 3 · Round 4',
    funFact: "Distilled from tropical lemongrass varieties native to Sri Lanka and Java!"
  },
  {
    id: 'm3-r4-4',
    word: 'herbaceous',
    definition: 'denoting plants that have soft, green stems rather than hard woody tissue',
    partOfSpeech: 'adjective',
    category: 'meeting-3-words-to-know',
    example: 'Basil, mint, and cilantro are classic examples of tender herbaceous garden herbs.',
    syllables: 'her-ba-ceous',
    phoneticHint: '/hɜːrˈbeɪ.ʃəs/',
    languageOrigin: 'Latin (herba = herb / grass)',
    trickyPattern: "Ends in '-aceous' (a-c-e-o-u-s).",
    lesson: 'Meeting 3 · Round 4',
    funFact: "Unlike trees and shrubs, herbaceous plants die back to the ground every winter!"
  },

  // Round 5: Auditory & Vocal Sophistication
  {
    id: 'm3-r5-1',
    word: 'dulcet',
    definition: 'sweet and soothing, especially pleasing to the ear',
    partOfSpeech: 'adjective',
    category: 'meeting-3-words-to-know',
    example: 'The pronouncer articulated each syllable in calm and dulcet tones.',
    syllables: 'dul-cet',
    phoneticHint: '/ˈdʌl.sɪt/',
    languageOrigin: 'Latin (dulcis = sweet)',
    trickyPattern: "Ends with 'c-e-t' (soft 'c'): d-u-l-c-e-t.",
    lesson: 'Meeting 3 · Round 5',
    funFact: "The musical instrument 'dulcimer' shares this exact root, meaning 'sweet sound'!"
  },
  {
    id: 'm3-r5-2',
    word: 'salubrious',
    definition: 'health-giving, favorable to well-being, or healthy and invigorating',
    partOfSpeech: 'adjective',
    category: 'meeting-3-words-to-know',
    example: 'The brisk, pine-scented mountain air was clean and remarkably salubrious.',
    syllables: 'sa-lu-bri-ous',
    phoneticHint: '/səˈluː.bri.əs/',
    languageOrigin: 'Latin (salus = health / safety)',
    trickyPattern: "Ends in '-ous': s-a-l-u-b-r-i-o-u-s.",
    lesson: 'Meeting 3 · Round 5',
    funFact: "Romans toasted with 'Salus!', wishing each other vibrant health and longevity!"
  },
  {
    id: 'm3-r5-3',
    word: 'calisthenics',
    definition: 'gymnastic exercises designed to develop muscular tone and bodily fitness',
    partOfSpeech: 'noun (plural)',
    category: 'meeting-3-words-to-know',
    example: 'The gymnastics coach started practice with ten minutes of rhythmic calisthenics.',
    syllables: 'cal-is-then-ics',
    phoneticHint: '/ˌkæl.ɪsˈθɛn.ɪks/',
    languageOrigin: 'Greek (kalos = beauty + sthenos = strength)',
    trickyPattern: "c-a-l-i-s-t-h-e-n-i-c-s (contains 'th' from sthenos).",
    lesson: 'Meeting 3 · Round 5',
    funFact: "Literally means 'beautiful strength' in ancient Greek!"
  },
  {
    id: 'm3-r5-4',
    word: 'phonics',
    definition: 'a method of teaching reading and spelling by correlating sounds with letters or groups of letters',
    partOfSpeech: 'noun (plural)',
    category: 'meeting-3-words-to-know',
    example: 'Mastering phonics rules allows spellers to map unexpected phonetic sounds onto standard graphemes.',
    syllables: 'phon-ics',
    phoneticHint: '/ˈfɑː.nɪks/',
    languageOrigin: 'Greek (phone = voice / sound)',
    trickyPattern: "Greek 'ph' makes the /f/ sound: p-h-o-n-i-c-s.",
    lesson: 'Meeting 3 · Round 5',
    funFact: "The root 'phone' gives us telephone, microphone, saxophone, and symphony!"
  },

  // Round 6: Natural Phenomena & Geometry
  {
    id: 'm3-r6-1',
    word: 'seismologist',
    definition: 'a scientist who studies earthquakes and the mechanical properties of the earth',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The seismologist calibrated the digital sensors to detect subterranean tectonic shifts.',
    syllables: 'seis-mol-o-gist',
    phoneticHint: '/saɪzˈmɑː.lə.dʒɪst/',
    languageOrigin: 'Greek (seismos = earthquake + logos = study of)',
    trickyPattern: "Begins with 's-e-i-s' (ei diphthong): s-e-i-s-m-o-l-o-g-i-s-t.",
    lesson: 'Meeting 3 · Round 6',
    funFact: "The first seismoscope was invented in 132 AD in China using bronze dragons dropping balls into toads!"
  },
  {
    id: 'm3-r6-2',
    word: 'torrent',
    definition: 'a strong and fast-moving stream of water, or an overwhelming outpouring of something',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The sudden mountain thunderstorm unleashed a raging torrent of water through the canyon.',
    syllables: 'tor-rent',
    phoneticHint: '/ˈtɔːr.ənt/',
    languageOrigin: 'Latin (torrens = boiling, rushing, burning)',
    trickyPattern: "Double 'r': t-o-r-r-e-n-t (ends in '-ent').",
    lesson: 'Meeting 3 · Round 6',
    funFact: "In ancient Latin, torrens originally described a rushing stream that boiled or foamed over boulders!"
  },
  {
    id: 'm3-r6-3',
    word: 'hexagonal',
    definition: 'having six straight sides and six angles',
    partOfSpeech: 'adjective',
    category: 'meeting-3-words-to-know',
    example: 'Honeybees construct structurally flawless hexagonal wax cells inside the hive.',
    syllables: 'hex-ag-o-nal',
    phoneticHint: '/hɛkˈsæɡ.ə.nəl/',
    languageOrigin: 'Greek (hexa = six + gonia = angle / corner)',
    trickyPattern: "Greek 'hexa' (h-e-x-a) + 'g-o-n-a-l'.",
    lesson: 'Meeting 3 · Round 6',
    funFact: "Mathematicians proved that hexagons are the most efficient geometric shape to fill space with minimum perimeter!"
  },
  {
    id: 'm3-r6-4',
    word: 'murmuration',
    definition: 'a vast flock of starlings that flies together in swooping, coordinated cloud formations',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'A breathtaking murmuration of thousands of starlings undulated across the twilight sky.',
    syllables: 'mur-mu-ra-tion',
    phoneticHint: '/ˌmɜːr.mjəˈreɪ.ʃən/',
    languageOrigin: 'Latin (murmurare = to murmur / low humming sound)',
    trickyPattern: "Repeats 'm-u-r' twice: m-u-r-m-u-r-a-t-i-o-n.",
    lesson: 'Meeting 3 · Round 6',
    funFact: "Named murmuration because the flapping of millions of tiny starling wings sounds like a soft whisper!"
  },

  // Round 7: Global Culinary & Architectural Gems
  {
    id: 'm3-r7-1',
    word: 'rotisserie',
    definition: 'a cooking appliance with a rotating spit for roasting meat evenly',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The seasoned chicken turned slowly on the commercial kitchen rotisserie.',
    syllables: 'ro-tis-se-rie',
    phoneticHint: '/roʊˈtɪs.ər.i/',
    languageOrigin: 'French (rôtir = to roast)',
    trickyPattern: "Single 't', double 's', ends in '-erie': r-o-t-i-s-s-e-r-i-e.",
    lesson: 'Meeting 3 · Round 7',
    funFact: "In Paris, dedicated butcher shops that specialize only in roasted meats are called rôtisseries!"
  },
  {
    id: 'm3-r7-2',
    word: 'pachinko',
    definition: 'a popular Japanese mechanical arcade game resembling a vertical pinball machine',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The bustling Tokyo entertainment avenue echoed with the chime of pachinko steel balls.',
    syllables: 'pa-chin-ko',
    phoneticHint: '/pəˈtʃɪŋ.koʊ/',
    languageOrigin: 'Japanese (onomatopoeic from pachi-pachi clicking sound)',
    trickyPattern: "Japanese loanword: p-a-c-h-i-n-k-o.",
    lesson: 'Meeting 3 · Round 7',
    funFact: "Named from the Japanese sound effect 'pachi-pachi', describing little metal balls snapping against pins!"
  },
  {
    id: 'm3-r7-3',
    word: 'machete',
    definition: 'a broad, heavy knife used as an agricultural tool or for clearing dense vegetation',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The expedition guide carefully hacked through thick jungle vines with a balanced machete.',
    syllables: 'ma-che-te',
    phoneticHint: '/məˈʃɛt.i/',
    languageOrigin: 'Spanish (macho = hammer / sledge)',
    trickyPattern: "Spanish origin: m-a-c-h-e-t-e (ends with 'e').",
    lesson: 'Meeting 3 · Round 7',
    funFact: "Farmers across Central America and the Caribbean use machetes for harvesting sugarcane and coconuts!"
  },
  {
    id: 'm3-r7-4',
    word: 'cupola',
    definition: 'a small dome-like structure on top of a building roof or turret',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'A glistening copper weather vane twirled atop the historic courthouse cupola.',
    syllables: 'cu-po-la',
    phoneticHint: '/ˈkjuː.pə.lə/',
    languageOrigin: 'Italian / Latin (cupula = little cask / small tub)',
    trickyPattern: "c-u-p-o-l-a (single 'p', ends in '-la').",
    lesson: 'Meeting 3 · Round 7',
    funFact: "Cupolas originally served as architectural ventilation lanterns before modern air conditioning was invented!"
  },

  // Round 8: Historical & Scholarly Vocabulary
  {
    id: 'm3-r8-1',
    word: 'alacrity',
    definition: 'brisk and cheerful readiness, prompt eagerness',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The eager spelling enthusiast stepped to the competition microphone with alacrity.',
    syllables: 'a-lac-ri-ty',
    phoneticHint: '/əˈlæk.rə.ti/',
    languageOrigin: 'Latin (alacritas = lively, brisk)',
    trickyPattern: "a-l-a-c-r-i-t-y (single 'l', single 'c').",
    lesson: 'Meeting 3 · Round 8',
    funFact: "Classical Victorian authors frequently used alacrity to highlight courteous obedience!"
  },
  {
    id: 'm3-r8-2',
    word: 'antiquarian',
    definition: 'a person who collects, studies, or deals in antique, historic, or rare objects',
    partOfSpeech: 'noun / adjective',
    category: 'meeting-3-words-to-know',
    example: 'The antiquarian gently turned the illuminated vellum pages of the 15th-century manuscript.',
    syllables: 'an-ti-quar-i-an',
    phoneticHint: '/ˌæn.təˈkwer.i.ən/',
    languageOrigin: 'Latin (antiquarius = belonging to antiquity)',
    trickyPattern: "Contains 'quar' (q-u-a-r) + '-ian'.",
    lesson: 'Meeting 3 · Round 8',
    funFact: "Renaissance antiquarians preserved thousands of Greek and Roman classical texts from destruction!"
  },
  {
    id: 'm3-r8-3',
    word: 'bursary',
    definition: 'a scholarship, grant, or financial endowment awarded to an enrolled student',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'She received a prestigious university bursary in recognition of her academic excellence.',
    syllables: 'bur-sa-ry',
    phoneticHint: '/ˈbɜːr.sər.i/',
    languageOrigin: 'Medieval Latin (bursa = purse / bag)',
    trickyPattern: "b-u-r-s-a-r-y (ends in '-ary').",
    lesson: 'Meeting 3 · Round 8',
    funFact: "Root 'bursa' gives us 'bursar' (treasurer) and the Wall Street term 'reimburse'!"
  },
  {
    id: 'm3-r8-4',
    word: 'decrepitude',
    definition: 'the state of being worn out, weakened, or dilapidated by old age or heavy use',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The venerable lighthouse slowly yielded to weathered decrepitude after centuries of sea storms.',
    syllables: 'de-crep-i-tude',
    phoneticHint: '/dɪˈkrɛp.ɪ.tuːd/',
    languageOrigin: 'Latin (decrepitus = very old / broken down)',
    trickyPattern: "d-e-c-r-e-p-i-t-u-d-e (single 'p', single 't').",
    lesson: 'Meeting 3 · Round 8',
    funFact: "In Latin, 'crepitus' meant a crackle or rattle; decrepit meant rattling down toward silence!"
  },

  // Round 9: High-Stakes Championship Two-Bee
  {
    id: 'm3-r9-1',
    word: 'innovator',
    definition: 'a person who introduces new methods, groundbreaking ideas, or novel inventions',
    partOfSpeech: 'noun',
    category: 'meeting-3-words-to-know',
    example: 'The young robotic innovator engineered a solar-powered water filtration device.',
    syllables: 'in-no-va-tor',
    phoneticHint: '/ˈɪn.ə.veɪ.tər/',
    languageOrigin: 'Latin (innovare = to renew / make new)',
    trickyPattern: "Double 'n', ends in '-or' (not '-er'): i-n-n-o-v-a-t-o-r.",
    lesson: 'Meeting 3 · Round 9',
    funFact: "Root 'novus' means new in Latin, the origin of novel, novelty, novice, and supernova!"
  },
  {
    id: 'm3-r9-2',
    word: 'spectacles',
    definition: 'another term for eyeglasses, specifically framed lenses for correcting vision',
    partOfSpeech: 'noun (plural)',
    category: 'meeting-3-words-to-know',
    example: 'Benjamin Franklin adjusted his tortoiseshell spectacles before reading the Declaration.',
    syllables: 'spec-ta-cles',
    phoneticHint: '/ˈspɛk.tə.kəlz/',
    languageOrigin: 'Latin (spectare = to look at / behold)',
    trickyPattern: "s-p-e-c-t-a-c-l-e-s (contains root 'spect').",
    lesson: 'Meeting 3 · Round 9',
    funFact: "Root 'spect' means look — just like spectator, inspector, retrospect, and spectacle!"
  },
  {
    id: 'm3-r9-3',
    word: 'hallowed',
    definition: 'honored as holy, greatly revered, or respected and venerated',
    partOfSpeech: 'adjective',
    category: 'meeting-3-words-to-know',
    example: 'Silence fell over the audience as the speller walked onto the hallowed national stage.',
    syllables: 'hal-lowed',
    phoneticHint: '/ˈhæl.oʊd/',
    languageOrigin: 'Old English (hālgian = to make holy)',
    trickyPattern: "Double 'l': h-a-l-l-o-w-e-d.",
    lesson: 'Meeting 3 · Round 9',
    funFact: "Halloween comes from 'All Hallows' Eve' — the evening before the celebration of holy souls!"
  },
  {
    id: 'm3-r9-4',
    word: 'unctuous',
    definition: 'characterized by excessive, ingratiating, or insincerely earnest flattery; oily',
    partOfSpeech: 'adjective',
    category: 'meeting-3-words-to-know',
    example: 'His unctuous compliments failed to deceive the discerning judges.',
    syllables: 'unc-tu-ous',
    phoneticHint: '/ˈʌŋk.tʃu.əs/',
    languageOrigin: 'Latin (ungere = to anoint with oil)',
    trickyPattern: "Contains 'u-n-c-t' followed by 'u-o-u-s': u-n-c-t-u-o-u-s.",
    lesson: 'Meeting 3 · Round 9',
    funFact: "Derived from ancient medicinal salves and ointments used to soothe skin wounds!"
  }
];

// Slide 8: Listening Stations (Meeting 3 - Expanded to 18 words each)
export const MEETING_3_STATION_1_PARTNER: string[] = [
  'hexagonal', 'seethe', 'antiquarian', 'bachelorette', 'unctuous',
  'fluoride', 'epilepsy', 'citronella', 'palliative', 'personnel',
  'croissant', 'boutique', 'ballet', 'bouquet', 'renaissance',
  'resilience', 'diligence', 'origami'
];

export const MEETING_3_STATION_2_AUDIO: string[] = [
  'vexatious', 'faux', 'sophisticated', 'nebulous', 'genus',
  'legionnaire', 'subcutaneous', 'alacrity', 'choreographer', 'leguminous',
  'philosophy', 'bibliophile', 'claustrophobia', 'kaleidoscope', 'symphony',
  'courageous', 'karaoke', 'safari'
];

export const MEETING_3_STATION_3_QUIZ: string[] = [
  'ceramics', 'mimetic', 'unabated', 'petrifying', 'specimen',
  'interlocutor', 'machete', 'dulcet', 'salubrious', 'rotisserie',
  'silhouette', 'millionaire', 'accommodate', 'chameleon', 'connoisseur',
  'reservoir', 'avocado', 'tornado'
];

// Slide 10: Mock Spelling Bee Stage List (Meeting 3 - Expanded to 30 championship words)
// Specifically aligned to grade 3-6 lesson patterns (French loanwords, roots phil- & -phobia, Two-Bee patterns)
export const MEETING_3_MOCK_BEE_WORDS: string[] = [
  'soirée', 'philharmonic', 'brontophobia', 'duvet', 'spectacles',
  'innovator', 'personnel', 'rotisserie', 'perseverance', 'buoyancy',
  'fluoride', 'hallowed', 'seismologist', 'fondant', 'commerce',
  'croissant', 'boutique', 'philosophy', 'bibliophile', 'claustrophobia',
  'kaleidoscope', 'symphony', 'resilience', 'courageous', 'origami',
  'silhouette', 'millionaire', 'accommodate', 'connoisseur', 'avocado'
];

// Slide 12: Progress Check Word List (Meeting 3 - 10 words)
export const MEETING_3_PROGRESS_CHECK: DictationWord[] = [
  {
    id: 'm3-pc-1',
    word: 'fondant',
    definition: 'a thick paste made of sugar and water, used for decorating cakes',
    sentence: 'The baker smoothed pristine white fondant across the celebration cake.',
    difficulty: 'Progress-Check',
    trickyPart: "French origin: f-o-n-d-a-n-t"
  },
  {
    id: 'm3-pc-2',
    word: 'cupola',
    definition: 'a small dome-like structure on a roof',
    sentence: 'A bronze weather vane spun freely above the barn cupola.',
    difficulty: 'Progress-Check',
    trickyPart: "c-u-p-o-l-a"
  },
  {
    id: 'm3-pc-3',
    word: 'herbaceous',
    definition: 'denoting plants that have non-woody stems',
    sentence: 'Parsley and cilantro are tender herbaceous garden plants.',
    difficulty: 'Progress-Check',
    trickyPart: "Ends in '-aceous': h-e-r-b-a-c-e-o-u-s"
  },
  {
    id: 'm3-pc-4',
    word: 'pachinko',
    definition: 'a Japanese arcade game resembling a vertical pinball machine',
    sentence: 'The bright Tokyo entertainment district was filled with noisy pachinko parlors.',
    difficulty: 'Progress-Check',
    trickyPart: "Japanese loanword: p-a-c-h-i-n-k-o"
  },
  {
    id: 'm3-pc-5',
    word: 'decrepitude',
    definition: 'the state of being worn out or weakened by age or long use',
    sentence: 'The old timber bridge had fallen into quiet decrepitude.',
    difficulty: 'Progress-Check',
    trickyPart: "d-e-c-r-e-p-i-t-u-d-e"
  },
  {
    id: 'm3-pc-6',
    word: 'dramaturgy',
    definition: 'the theory and practice of dramatic composition and theatrical representation',
    sentence: 'The university student studied classical Greek dramaturgy.',
    difficulty: 'Progress-Check',
    trickyPart: "Ends in '-urgy': d-r-a-m-a-t-u-r-g-y"
  },
  {
    id: 'm3-pc-7',
    word: 'murmuration',
    definition: 'a flock of starlings that flies together in sweeping shapes',
    sentence: 'A mesmerizing murmuration of starlings wheeled across the sunset sky.',
    difficulty: 'Progress-Check',
    trickyPart: "m-u-r-m-u-r-a-t-i-o-n (contains double 'mur')"
  },
  {
    id: 'm3-pc-8',
    word: 'phonics',
    definition: 'a method of teaching reading by correlating sounds with letters',
    sentence: 'Practicing phonics helps spellers break words into phonemes.',
    difficulty: 'Progress-Check',
    trickyPart: "Greek 'ph' makes the /f/ sound: p-h-o-n-i-c-s"
  },
  {
    id: 'm3-pc-9',
    word: 'calisthenics',
    definition: 'gymnastic exercises to achieve bodily fitness and graceful movement',
    sentence: 'Morning calisthenics kept the athletes limber and energized.',
    difficulty: 'Progress-Check',
    trickyPart: "c-a-l-i-s-t-h-e-n-i-c-s (contains 'th')"
  },
  {
    id: 'm3-pc-10',
    word: 'torrent',
    definition: 'a strong and fast-moving stream of water or other liquid',
    sentence: 'Heavy rain transformed the dry gully into a rushing torrent.',
    difficulty: 'Progress-Check',
    trickyPart: "Double 'r': t-o-r-r-e-n-t"
  }
];

// Meeting 3 Grand Study Arsenal (Expanded to 125 Two-Bee Scripps Champion Words)
export const MEETING_3_FULL_61_WORDS: string[] = [
  // Original Base Two-Bee Set (61 Words)
  'hexagonal', 'seethe', 'antiquarian', 'bachelorette', 'unctuous',
  'fluoride', 'epilepsy', 'citronella', 'palliative', 'personnel',
  'soirée', 'philharmonic', 'brontophobia', 'hydrangea', 'perseverance',
  'buoyancy', 'vexatious', 'faux', 'sophisticated', 'nebulous',
  'genus', 'legionnaire', 'subcutaneous', 'alacrity', 'choreographer',
  'leguminous', 'ceramics', 'mimetic', 'unabated', 'petrifying',
  'specimen', 'interlocutor', 'machete', 'dulcet', 'salubrious',
  'rotisserie', 'banal', 'seismologist', 'spectacles', 'innovator',
  'bursary', 'hallowed', 'apogee', 'hiatus', 'freesia',
  'exoneration', 'duvet', 'turpitude', 'platitude', 'nobiliary',
  'commerce', 'fondant', 'cupola', 'herbaceous', 'pachinko',
  'decrepitude', 'dramaturgy', 'murmuration', 'phonics', 'calisthenics',
  'torrent',

  // Expanded Two-Bee French Loanwords & Silent Letters (10 Words)
  'croissant', 'boutique', 'ballet', 'chalet', 'bouquet',
  'bureau', 'souvenir', 'parfait', 'château', 'renaissance',

  // Expanded Two-Bee Greek Morphology & Science (12 Words)
  'philosophy', 'philanthropy', 'bibliophile', 'claustrophobia', 'arachnophobia',
  'hydrophobia', 'acrophobia', 'kaleidoscope', 'microscope', 'telescope',
  'symphony', 'amphitheater',

  // Expanded Two-Bee Consonant & Affix Patterns (12 Words)
  'resilience', 'brilliance', 'radiance', 'diligence', 'coincidence',
  'courageous', 'mountainous', 'ferocious', 'curiosity', 'trajectory',
  'magnificent', 'beneficial',

  // Expanded Global Loanwords & Cultural Terms (12 Words)
  'origami', 'karaoke', 'tsunami', 'safari', 'silhouette',
  'millionaire', 'illustrate', 'millennium', 'accommodate', 'possession',
  'avocado', 'guacamole',

  // Expanded Botany, Zoology & Nature Two-Bee (18 Words)
  'dandelion', 'chameleon', 'pterodactyl', 'rhododendron', 'photosynthesis',
  'chlorophyll', 'metamorphosis', 'echinoderm', 'connoisseur', 'guarantee',
  'reservoir', 'champagne', 'croquet', 'chocolate', 'barbeque',
  'canyon', 'tornado', 'armadillo'
];

export const MEETING_3_EXPANDED_WORDS = MEETING_3_FULL_61_WORDS;

// =============================================================================
// COMPLETE WORD DEFINITIONS MAP FOR BOTH STUDY LISTS (120 words total)
// =============================================================================
export const ALL_WORDS_MAP: Record<string, { def: string; ex: string; orig?: string; pattern?: string; syll?: string }> = {
  // Meeting 2 Full 59
  triumphant: { def: 'feeling or expressing great joy after winning a victory', ex: 'The speller gave a triumphant cheer when the bell stayed silent.', syll: 'tri-um-phant', orig: 'Latin', pattern: "Ends in '-ant'" },
  guardian: { def: 'a person who protects or takes care of someone', ex: 'Her guardian stood proudly in the auditorium.', syll: 'guard-i-an', orig: 'Old French', pattern: "Silent 'u' after 'g'" },
  cascade: { def: 'a small waterfall, or things happening in quick succession', ex: 'A cascade of autumn leaves fluttered to the ground.', syll: 'cas-cade', orig: 'Italian / French', pattern: "Hard /k/ then soft /s/" },
  amphibian: { def: 'an animal that can live both in water and on land', ex: 'Frogs and newts are examples of an amphibian.', syll: 'am-phib-i-an', orig: 'Greek', pattern: "'ph' as /f/" },
  eavesdrop: { def: 'to secretly listen to a private conversation', ex: 'Do not eavesdrop at the conference door.', syll: 'eaves-drop', orig: 'Old English', pattern: "'e' before 'a'" },
  astonish: { def: 'to surprise or amaze someone greatly', ex: 'Her encyclopedic knowledge will astonish the judges.', syll: 'as-ton-ish', orig: 'Old French', pattern: "Ends in '-ish'" },
  genius: { def: 'exceptional intellectual or creative power', ex: 'He showed a genius for solving orthographic puzzles.', syll: 'ge-nius', orig: 'Latin', pattern: "Ends in '-us'" },
  fortification: { def: 'a structure built to defend against attack', ex: 'The fortress fortification stood against the gale.', syll: 'for-ti-fi-ca-tion', orig: 'Latin', pattern: "Root 'fortis' = strong" },
  remedial: { def: 'intended as a remedy to improve a deficiency', ex: 'He attended remedial spelling practice sessions.', syll: 're-me-di-al', orig: 'Latin', pattern: "r-e-m-e-d-i-a-l" },
  trivia: { def: 'pieces of information of little value or importance; quiz facts', ex: 'The trivia competition tested word origins.', syll: 'triv-i-a', orig: 'Latin', pattern: "Plural form of trivium" },
  disembark: { def: 'to leave a ship, aircraft, or vehicle', ex: 'Passengers will disembark through the forward cabin door.', syll: 'dis-em-bark', orig: 'Prefix dis- (away)', pattern: "Prefix 'dis-' + embark" },
  telepathic: { def: 'reading minds or thoughts from far away', ex: 'The identical twins appeared telepathic on stage.', syll: 'tel-e-path-ic', orig: 'Greek tele- (far)', pattern: "Root 'tele-' = far" },
  harmonious: { def: 'full of harmony, melody, and agreement', ex: 'The chamber choir sang in harmonious blend.', syll: 'har-mo-ni-ous', orig: 'Suffix -ous (full of)', pattern: "Suffix '-ous' = full of" },
  hydra: { def: 'a mythical serpent with many heads', ex: 'Hercules conquered the many-headed Hydra.', syll: 'hy-dra', orig: 'Greek', pattern: "Uses 'y' for /aɪ/" },
  volumetric: { def: 'relating to the measurement of volume', ex: 'A volumetric cylinder measures exact cubic milliliters.', syll: 'vol-u-met-ric', orig: 'Latin', pattern: "volu- + metric" },
  gargantuan: { def: 'enormously huge or gigantic', ex: 'A gargantuan wave crashed against the sea barrier.', syll: 'gar-gan-tu-an', orig: 'Literary', pattern: "From Gargantua" },
  chaotic: { def: 'in a state of complete confusion and disorder', ex: 'The hall was chaotic before the rounds began.', syll: 'cha-ot-ic', orig: 'Greek', pattern: "'ch' pronounced /k/" },
  shrimp: { def: 'a small edible free-swimming crustacean', ex: 'Fresh Gulf shrimp sizzled in the skillet.', syll: 'shrimp', orig: 'Middle English', pattern: "'sh' and 'mp'" },
  satellite: { def: 'an artificial body placed in orbit round the earth', ex: 'The communications satellite beamed live signals.', syll: 'sat-el-lite', orig: 'Latin', pattern: "Double 'l': s-a-t-e-l-l-i-t-e" },
  parasite: { def: 'an organism that lives in or on a host organism', ex: 'A tick is a parasitic creature.', syll: 'par-a-site', orig: 'Greek', pattern: "p-a-r-a-s-i-t-e" },
  favorite: { def: 'preferred before all others of the same kind', ex: 'Spelling Bee is my favorite academic contest.', syll: 'fa-vor-ite', orig: 'Latin', pattern: "American 'favorite'" },
  famous: { def: 'known about by many people', ex: 'Dr. Jacques Bailly is famous across the spelling world.', syll: 'fa-mous', orig: 'Latin', pattern: "Ends in '-ous'" },
  pristine: { def: 'in its original condition; unspoiled and spotless', ex: 'The new dictionary arrived in pristine condition.', syll: 'pris-tine', orig: 'Latin', pattern: "Ends in silent 'e'" },
  golden: { def: 'made of, resembling, or shining like gold', ex: 'The winner lifted the golden English 1 trophy.', syll: 'gold-en', orig: 'Old English', pattern: "Root 'gold' + '-en'" },
  modesty: { def: 'the quality of being humble and unpretentious', ex: 'She received the prize with genuine modesty.', syll: 'mod-es-ty', orig: 'Latin', pattern: "m-o-d-e-s-t-y" },
  jealousy: { def: 'resentment against someone because of their success', ex: 'Do not let jealousy cloud good sportsmanship.', syll: 'jeal-ous-y', orig: 'Old French', pattern: "Starts with 'j-e-a-l'" },
  vouch: { def: 'confirm or assert as a result of experience', ex: 'Her coach will vouch for her intense daily practice.', syll: 'vouch', orig: 'Old French', pattern: "v-o-u-c-h" },
  shoulder: { def: 'part of the body between neck and upper arm', ex: 'He patted his teammate on the shoulder.', syll: 'shoul-der', orig: 'Old English', pattern: "Contains 'ou'" },
  zebra: { def: 'an African wild horse with black-and-white stripes', ex: 'A zebra stood vigilant on the savanna.', syll: 'ze-bra', orig: 'Italian / Portuguese', pattern: "z-e-b-r-a" },
  butterscotch: { def: 'confectionery flavor of brown sugar and butter', ex: 'He unwrapped a smooth butterscotch drop.', syll: 'but-ter-scotch', orig: 'English', pattern: "Compound: butter + scotch" },
  apron: { def: 'a protective garment worn over front clothes', ex: 'The baker tied her apron tight.', syll: 'a-pron', orig: 'Old French (naperon)', pattern: "a-p-r-o-n" },
  beagle: { def: 'a small breed of hound with droopy ears', ex: 'The lively beagle sniffed around the yard.', syll: 'bea-gle', orig: 'Old French', pattern: "Ends in '-le'" },
  kidney: { def: 'one of a pair of organs that filter blood', ex: 'Drinking water keeps kidney health optimal.', syll: 'kid-ney', orig: 'Middle English', pattern: "Ends in '-ey'" },
  raven: { def: 'a large black bird with a croaking call', ex: 'A raven roosted high in the oak tree.', syll: 'ra-ven', orig: 'Old English', pattern: "r-a-v-e-n" },
  gimmick: { def: 'a trick or device intended to attract attention', ex: 'No gimmick can replace honest hard work.', syll: 'gim-mick', orig: 'American Slang', pattern: "Double 'm': g-i-m-m-i-c-k" },
  flannel: { def: 'a soft-woven woollen or cotton cloth', ex: 'He wore a warm checkered flannel shirt.', syll: 'flan-nel', orig: 'Welsh', pattern: "Double 'n': f-l-a-n-n-e-l" },
  cucumber: { def: 'a long green-skinned vegetable eaten in salads', ex: 'Crisp cucumber slices refreshed the salad.', syll: 'cu-cum-ber', orig: 'Latin', pattern: "c-u-c-u-m-b-e-r" },
  janitor: { def: 'a person employed to take care of a building', ex: 'The school janitor polished the stage floor.', syll: 'jan-i-tor', orig: 'Latin (janua = door)', pattern: "Ends in '-or'" },
  lionize: { def: 'give a lot of public attention and praise to someone', ex: 'The town gathered to lionize the national speller.', syll: 'li-on-ize', orig: 'English', pattern: "American '-ize'" },
  spreadsheet: { def: 'an electronic document arranged in rows and columns', ex: 'She tallied scores on an interactive spreadsheet.', syll: 'spread-sheet', orig: 'Modern English', pattern: "Compound: spread + sheet" },
  badger: { def: 'a heavily built burrowing mammal with striped face', ex: 'A badger dug its nocturnal den.', syll: 'bad-ger', orig: 'Middle English', pattern: "b-a-d-g-e-r" },
  nephew: { def: 'a son of one’s brother or sister', ex: 'Her nephew took first place in the fifth grade bee.', syll: 'neph-ew', orig: 'Old French', pattern: "'ph' as /f/" },
  imbibe: { def: 'to drink liquids or absorb ideas', ex: 'Young minds imbibe knowledge eagerly.', syll: 'im-bibe', orig: 'Latin (imbibere)', pattern: "i-m-b-i-b-e" },
  savvy: { def: 'shrewd and knowledgeable in practical matters', ex: 'A savvy speller asks for word origins.', syll: 'sav-vy', orig: 'Spanish (sabe)', pattern: "Double 'v': s-a-v-v-y" },
  reckon: { def: 'establish by calculation, or consider / believe', ex: 'I reckon that practice builds true mastery.', syll: 'reck-on', orig: 'Old English', pattern: "Ends in '-on'" },
  boorish: { def: 'rough and bad-mannered; coarse', ex: 'Gloating over an opponent is boorish behavior.', syll: 'boor-ish', orig: 'Dutch (boer)', pattern: "Double 'o': b-o-o-r-i-s-h" },
  nurture: { def: 'care for and encourage the growth of someone', ex: 'Dedicated teachers nurture young spelling talent.', syll: 'nur-ture', orig: 'Old French', pattern: "n-u-r-t-u-r-e" },
  volcano: { def: 'a mountain with a crater erupting lava', ex: 'The volcanic cone smoked in the distance.', syll: 'vol-ca-no', orig: 'Italian (Vulcan)', pattern: "v-o-l-c-a-n-o" },
  forensics: { def: 'scientific methods used to investigate crimes', ex: 'Forensics solved the historic case.', syll: 'fo-ren-sics', orig: 'Latin (forum)', pattern: "f-o-r-e-n-s-i-c-s" },
  miraculous: { def: 'resembling a miracle; extraordinary', ex: 'The team completed a miraculous comeback.', syll: 'mi-rac-u-lous', orig: 'Latin', pattern: "m-i-r-a-c-u-l-o-u-s" },
  trendy: { def: 'very fashionable and modern', ex: 'She wore a trendy bee emblem pin.', syll: 'tren-dy', orig: 'English', pattern: "t-r-e-n-d-y" },
  permafrost: { def: 'subsurface ground that remains frozen', ex: 'Buildings in the Arctic sit on permafrost.', syll: 'per-ma-frost', orig: 'Compound', pattern: "perma + frost" },
  iceberg: { def: 'a large floating mass of glacier ice', ex: 'The iceberg floated majestically in the fjord.', syll: 'ice-berg', orig: 'Dutch / Scandinavian', pattern: "ice + berg" },
  cactus: { def: 'succulent plant with fleshy stem and spines', ex: 'The desert cactus stores rainwater efficiently.', syll: 'cac-tus', orig: 'Greek / Latin', pattern: "Ends in '-us'" },
  nationalism: { def: 'devotion and loyalty to one’s own nation', ex: 'Olympic games stir feelings of civic nationalism.', syll: 'na-tion-al-ism', orig: 'Latin', pattern: "nation + al + ism" },
  leeway: { def: 'amount of freedom or margin available', ex: 'The judge gave the nervous speller leeway.', syll: 'lee-way', orig: 'Nautical English', pattern: "Double 'e': l-e-e-w-a-y" },
  pilferer: { def: 'a petty thief who steals items of small value', ex: 'The crow acted like a pilferer of shiny buttons.', syll: 'pil-fer-er', orig: 'Old French', pattern: "p-i-l-f-e-r-e-r" },
  rollicking: { def: 'exuberantly lively and amusing', ex: 'The audience had a rollicking good time.', syll: 'rol-lick-ing', orig: 'English', pattern: "r-o-l-l-i-c-k-i-n-g" },
  quart: { def: 'a unit of liquid capacity equal to 1/4 gallon', ex: 'She bought a quart of lemonade.', syll: 'quart', orig: 'Latin (quartus = fourth)', pattern: "q-u-a-r-t" },

  // Meeting 3 Full 61 + 2 (Round 1)
  abhorrence: { def: 'a strong feeling of hatred or disgust', ex: 'She felt an abhorrence for any form of cruelty.', syll: 'ab-hor-rence', orig: 'Latin', pattern: "Double 'r', ends in '-ence'" },
  alacrity: { def: 'brisk, eager readiness or willingness', ex: 'He accepted the spelling challenge with alacrity.', syll: 'a-lac-ri-ty', orig: 'Latin', pattern: "a-l-a-c-r-i-t-y" },
  choreographer: { def: 'a person who designs dance movements', ex: 'The choreographer staged a lively musical routine.', syll: 'cho-re-og-ra-pher', orig: 'Greek', pattern: "'ch' as /k/ + grapher" },
  sophomoric: { def: 'overly confident but immature', ex: 'He regretted his sophomoric remarks.', syll: 'soph-o-mor-ic', orig: 'Greek', pattern: "sophos (wise) + moros (fool)" },
  hexagonal: { def: 'having six straight sides and six angles', ex: 'The bee honeycomb is naturally hexagonal.', syll: 'hex-ag-o-nal', orig: 'Greek', pattern: "From Greek 'hexa' (six)" },
  seethe: { def: 'to bubble up, or be filled with unexpressed anger', ex: 'He tried not to seethe after making an error.', syll: 'seethe', orig: 'Old English', pattern: "s-e-e-t-h-e" },
  antiquarian: { def: 'a person who collects or studies rare old objects', ex: 'The antiquarian restored the antique globe.', syll: 'an-ti-quar-i-an', orig: 'Latin', pattern: "Contains 'quar' + '-ian'" },
  bachelorette: { def: 'an unmarried woman, or a pre-wedding celebration', ex: 'They threw a cheerful bachelorette party.', syll: 'bach-e-lor-ette', orig: 'French suffix -ette', pattern: "Ends with '-ette'" },
  unctuous: { def: 'excessively flattering or oily in speech', ex: 'His unctuous compliments felt insincere.', syll: 'unc-tu-ous', orig: 'Latin (ungere = anoint)', pattern: "u-n-c-t-u-o-u-s" },
  fluoride: { def: 'a fluorine compound added to water for teeth', ex: 'Fluoride protects teeth enamel.', syll: 'flu-o-ride', orig: 'Latin', pattern: "'u' before 'o': f-l-u-o-r-i-d-e" },
  epilepsy: { def: 'neurological disorder marked by recurrent seizures', ex: 'Medication helps control symptoms of epilepsy.', syll: 'ep-i-lep-sy', orig: 'Greek', pattern: "e-p-i-l-e-p-s-y" },
  citronella: { def: 'natural fragrant grass oil used as insect repellent', ex: 'Citronella candles illuminated the evening deck.', syll: 'cit-ro-nel-la', orig: 'Latin / French', pattern: "Double 'l': c-i-t-r-o-n-e-l-l-a" },
  palliative: { def: 'relieving pain without curing underlying cause', ex: 'Herbs provided palliative relief for the headache.', syll: 'pal-li-a-tive', orig: 'Latin (pallium = cloak)', pattern: "Double 'l': p-a-l-l-i-a-t-i-v-e" },
  personnel: { def: 'people employed in an organization', ex: 'All medical personnel reported to their stations.', syll: 'per-son-nel', orig: 'French', pattern: "Double 'n', single 'l'" },
  soirée: { def: 'an evening party or refined gathering', ex: 'They attended an elegant musical soirée.', syll: 'soi-rée', orig: 'French', pattern: "Keeps accent mark: s-o-i-r-é-e" },
  philharmonic: { def: 'devoted to music; a symphony orchestra', ex: 'The New York Philharmonic gave a sold-out concert.', syll: 'phil-har-mon-ic', orig: 'Greek phil- (love)', pattern: "phil- = love of music" },
  brontophobia: { def: 'abnormal fear of thunder and lightning', ex: 'The dog trembled from brontophobia during storms.', syll: 'bron-to-pho-bia', orig: 'Greek', pattern: "bronto (thunder) + phobia (fear)" },
  hydrangea: { def: 'a shrub with big round clusters of flowers', ex: 'Vibrant pink hydrangea bloomed along the fence.', syll: 'hy-dran-ge-a', orig: 'Greek / Latin', pattern: "Ends in '-gea'" },
  perseverance: { def: 'continued effort despite difficulty', ex: 'Her perseverance carried her to the national stage.', syll: 'per-se-ver-ance', orig: 'Latin', pattern: "Ends in '-ance'" },
  buoyancy: { def: 'the ability of something to float', ex: 'The buoyancy of the raft kept all gear dry.', syll: 'buoy-an-cy', orig: 'Spanish', pattern: "Starts with 'b-u-o-y'" },
  vexatious: { def: 'causing annoyance, frustration, or worry', ex: 'Spelling silent letters can be a vexatious challenge.', syll: 'vex-a-tious', orig: 'Latin', pattern: "Ends in '-tious'" },
  faux: { def: 'made in imitation; artificial or fake', ex: 'She wore a cozy jacket lined with faux fur.', syll: 'faux', orig: 'French', pattern: "Silent 'x': f-a-u-x" },
  sophisticated: { def: 'having great knowledge or refined taste', ex: 'The computer used sophisticated algorithms.', syll: 'so-phis-ti-cat-ed', orig: 'Greek (sophos)', pattern: "'ph' as /f/" },
  nebulous: { def: 'cloudy, hazy, or ill-defined in concept', ex: 'His memory of the early rounds was nebulous.', syll: 'neb-u-lous', orig: 'Latin (nebula = mist)', pattern: "n-e-b-u-l-o-u-s" },
  genus: { def: 'a principal taxonomic category of organisms', ex: 'Panthera is the genus for large roaring cats.', syll: 'ge-nus', orig: 'Latin', pattern: "Ends in '-us'" },
  legionnaire: { def: 'a member of a legion or veteran association', ex: 'The French legionnaire stood at attention.', syll: 'le-gion-naire', orig: 'French', pattern: "Ends in '-naire'" },
  subcutaneous: { def: 'situated or applied under the skin', ex: 'The nurse gave a subcutaneous injection.', syll: 'sub-cu-ta-ne-ous', orig: 'Latin (sub + cutis)', pattern: "Ends in '-aneous'" },
  leguminous: { def: 'relating to the pea or bean family', ex: 'Soybeans and lentils are leguminous crops.', syll: 'le-gu-mi-nous', orig: 'Latin (legumen)', pattern: "Ends in '-ous'" },
  ceramics: { def: 'pots and items made from fired clay', ex: 'She crafted handmade ceramics in art class.', syll: 'ce-ram-ics', orig: 'Greek (keramos)', pattern: "Begins with soft 'c'" },
  mimetic: { def: 'relating to or characterized by imitation', ex: 'Chameleons use mimetic coloration to hide.', syll: 'mi-met-ic', orig: 'Greek (mimesis)', pattern: "m-i-m-e-t-i-c" },
  unabated: { def: 'without any reduction in intensity or strength', ex: 'The thunderstorm raged unabated through the night.', syll: 'un-a-bat-ed', orig: 'English', pattern: "Prefix 'un-' + abated" },
  petrifying: { def: 'making someone so frightened they cannot move', ex: 'Standing at the bee microphone was petrifying at first.', syll: 'pet-ri-fy-ing', orig: 'Greek (petra = stone)', pattern: "petra (stone) + fying" },
  specimen: { def: 'an individual animal, plant, or object for study', ex: 'The biologist preserved a rare butterfly specimen.', syll: 'spec-i-men', orig: 'Latin (specere = look)', pattern: "s-p-e-c-i-m-e-n" },
  interlocutor: { def: 'a person who takes part in a conversation', ex: 'The interviewer was a polite interlocutor.', syll: 'in-ter-loc-u-tor', orig: 'Latin', pattern: "Ends in '-or'" },
  machete: { def: 'a broad, heavy knife used as an implement or weapon', ex: 'The explorer cleared dense jungle vines with a machete.', syll: 'ma-che-te', orig: 'Spanish', pattern: "m-a-c-h-e-t-e" },
  dulcet: { def: 'sweet and soothing to hear or taste', ex: 'The pronouncer spoke in calm and dulcet tones.', syll: 'dul-cet', orig: 'Latin (dulcis = sweet)', pattern: "d-u-l-c-e-t" },
  salubrious: { def: 'health-giving, healthy, or pleasant', ex: 'The mountain air was brisk and salubrious.', syll: 'sa-lu-bri-ous', orig: 'Latin (salus = health)', pattern: "Ends in '-ous'" },
  rotisserie: { def: 'a cooking appliance with a rotating spit', ex: 'The chicken roasted golden on the rotisserie.', syll: 'ro-tis-se-rie', orig: 'French', pattern: "Double 's': r-o-t-i-s-s-e-r-i-e" },
  banal: { def: 'so lacking in originality as to be boring', ex: 'The speech was full of banal clichés.', syll: 'ba-nal', orig: 'French', pattern: "b-a-n-a-l" },
  seismologist: { def: 'a geophysicist who studies earthquakes', ex: 'The seismologist tracked seismic shockwaves.', syll: 'seis-mol-o-gist', orig: 'Greek (seismos = quake)', pattern: "Begins with 's-e-i-s'" },
  spectacles: { def: 'another term for eyeglasses', ex: 'He pushed his tortoise-shell spectacles up his nose.', syll: 'spec-ta-cles', orig: 'Latin (spectare = to look)', pattern: "s-p-e-c-t-a-c-l-e-s" },
  innovator: { def: 'a person who introduces new methods or ideas', ex: 'Steve Jobs was a pioneering tech innovator.', syll: 'in-no-va-tor', orig: 'Latin', pattern: "Double 'n', ends in '-or'" },
  bursary: { def: 'a scholarship or financial grant to attend school', ex: 'She earned a collegiate bursary for academic excellence.', syll: 'bur-sa-ry', orig: 'Medieval Latin (bursa = purse)', pattern: "Ends in '-ary'" },
  hallowed: { def: 'honored as holy, sacred, or greatly respected', ex: 'We walked through the hallowed halls of the library.', syll: 'hal-lowed', orig: 'Old English', pattern: "Double 'l': h-a-l-l-o-w-e-d" },
  apogee: { def: 'the highest point in the development of something; orbital peak', ex: 'Winning the national bee was the apogee of her school career.', syll: 'ap-o-gee', orig: 'Greek (apo = away + ge = earth)', pattern: "Ends in 'g-e-e'" },
  hiatus: { def: 'a pause or gap in a sequence, series, or process', ex: 'The spelling club took a two-week winter hiatus.', syll: 'hi-a-tus', orig: 'Latin (hiare = to gape)', pattern: "h-i-a-t-u-s" },
  freesia: { def: 'a small southern African flowering plant with sweet scent', ex: 'A vase of yellow freesia perfumed the dining room.', syll: 'free-sia', orig: 'German Botanist Freese', pattern: "Double 'e': f-r-e-e-s-i-a" },
  exoneration: { def: 'the action of officially clearing someone from blame', ex: 'New evidence led to the complete exoneration of the accused.', syll: 'ex-on-er-a-tion', orig: 'Latin (exonerare)', pattern: "e-x-o-n-e-r-a-t-i-o-n" },
  duvet: { def: 'a soft quilt filled with down, feathers, or fiber', ex: 'She curled up under the warm feather duvet.', syll: 'du-vet', orig: 'French', pattern: "Silent 't': d-u-v-e-t" },
  turpitude: { def: 'depravity or wicked behavior; moral baseness', ex: 'The corrupt official was condemned for moral turpitude.', syll: 'tur-pi-tude', orig: 'Latin (turpis = vile)', pattern: "t-u-r-p-i-t-u-d-e" },
  platitude: { def: 'a remark or statement that is flat, dull, or trite', ex: 'Telling someone to cheer up can feel like an empty platitude.', syll: 'plat-i-tude', orig: 'French (plat = flat)', pattern: "p-l-a-t-i-t-u-d-e" },
  nobiliary: { def: 'relating to the nobility or aristocracy', ex: 'The ancient castle displayed the family nobiliary crest.', syll: 'no-bil-i-ar-y', orig: 'Latin (nobilis)', pattern: "Ends in '-ary'" },
  commerce: { def: 'the activity of buying and selling, especially on a large scale', ex: 'International commerce connects cities worldwide.', syll: 'com-merce', orig: 'Latin (commercium)', pattern: "Double 'm': c-o-m-m-e-r-c-e" },
  fondant: { def: 'a sweet thick paste used for decorating cakes', ex: 'The pastry chef rolled pastel pink fondant.', syll: 'fon-dant', orig: 'French (fondre = to melt)', pattern: "f-o-n-d-a-n-t" },
  cupola: { def: 'a small dome-like structure on a roof', ex: 'Pigeons perched upon the historic town hall cupola.', syll: 'cu-po-la', orig: 'Italian / Latin', pattern: "c-u-p-o-l-a" },
  herbaceous: { def: 'denoting plants that have soft, non-woody stems', ex: 'Rosemary and sage are aromatic herbaceous perennials.', syll: 'her-ba-ceous', orig: 'Latin (herba)', pattern: "Ends in '-aceous'" },
  pachinko: { def: 'a Japanese arcade game with metallic balls', ex: 'Flashing lights signaled a win on the pachinko machine.', syll: 'pa-chin-ko', orig: 'Japanese', pattern: "p-a-c-h-i-n-k-o" },
  decrepitude: { def: 'the state of being worn out by age', ex: 'The derelict wooden barn slowly surrendered to decrepitude.', syll: 'de-crep-i-tude', orig: 'Latin', pattern: "d-e-c-r-e-p-i-t-u-d-e" },
  dramaturgy: { def: 'the theory and practice of dramatic stagecraft', ex: 'The theater director studied classical dramaturgy.', syll: 'dram-a-tur-gy', orig: 'Greek', pattern: "d-r-a-m-a-t-u-r-g-y" },
  murmuration: { def: 'a flock of starlings that flies together in sweeping shapes', ex: 'A murmuration of starlings formed dark ripples in the sky.', syll: 'mur-mu-ra-tion', orig: 'Latin (murmur)', pattern: "m-u-r-m-u-r-a-t-i-o-n" },
  phonics: { def: 'a method of teaching reading by correlating sounds and letters', ex: 'Daily phonics drills improve phonetic spelling accuracy.', syll: 'phon-ics', orig: 'Greek (phone = sound)', pattern: "'ph' as /f/" },
  calisthenics: { def: 'gymnastic exercises to achieve bodily fitness', ex: 'The gymnast warmed up with calisthenics.', syll: 'cal-is-then-ics', orig: 'Greek (kalos = beauty + sthenos = strength)', pattern: "Contains 'th'" },
  torrent: { def: 'a strong and fast-moving stream of water', ex: 'The flash flood sent a torrent down the ravine.', syll: 'tor-rent', orig: 'Latin (torrens)', pattern: "Double 'r': t-o-r-r-e-n-t" },

  // Expanded Two-Bee French Loanwords & Silent Letters
  croissant: { def: 'a crescent-shaped roll made of flaky laminated pastry', ex: 'She ordered a warm, flaky croissant at the French bakery.', syll: 'crois-sant', orig: 'French (croître = to grow)', pattern: "c-r-o-i-s-s-a-n-t (double 's')" },
  boutique: { def: 'a small shop that sells fashionable clothes or specialty items', ex: 'They browsed the historic neighborhood boutique for gifts.', syll: 'bou-tique', orig: 'French / Greek (apotheke)', pattern: "b-o-u-t-i-q-u-e (ends in '-ique')" },
  ballet: { def: 'an artistic dance form using formalized steps and gestures', ex: 'The dancers practiced classical ballet routines at the barre.', syll: 'bal-let', orig: 'French / Italian (balletto)', pattern: "Silent 't': b-a-l-l-e-t" },
  chalet: { def: 'a wooden cottage or cabin with an overhanging roof, typical of alpine regions', ex: 'The ski team stayed in a cozy Swiss chalet.', syll: 'cha-let', orig: 'French (Swiss dialect)', pattern: "Silent 't': c-h-a-l-e-t" },
  bouquet: { def: 'an attractively arranged bunch of flowers', ex: 'The winner was presented with a colorful bouquet of roses.', syll: 'bou-quet', orig: 'French (bosquet = little grove)', pattern: "Silent 't': b-o-u-q-u-e-t" },
  bureau: { def: 'a chest of drawers, or a specialized office department', ex: 'She kept stationary inside the top drawer of the oak bureau.', syll: 'bu-reau', orig: 'French (burel = coarse wool)', pattern: "Ends in '-eau': b-u-r-e-a-u" },
  souvenir: { def: 'a keepsake or memento bought or kept to remember a place or event', ex: 'He bought a miniature trophy as a souvenir from the national bee.', syll: 'sou-ve-nir', orig: 'French (souvenir = to remember)', pattern: "s-o-u-v-e-n-i-r" },
  parfait: { def: 'a dessert of layered ice cream or yogurt with fruit and granola', ex: 'The breakfast menu featured a strawberry and yogurt parfait.', syll: 'par-fait', orig: 'French (parfait = perfect)', pattern: "Silent 't': p-a-r-f-a-i-t" },
  château: { def: 'a large French country house, manor, or castle', ex: 'Tourists photographed the historic Loire Valley château.', syll: 'châ-teau', orig: 'French (castellum = castle)', pattern: "Circumflex 'â' and '-eau': c-h-â-t-e-a-u" },
  renaissance: { def: 'a revival or rebirth of cultural art, learning, and literature', ex: 'The town experienced an architectural renaissance with newly restored libraries.', syll: 'ren-ais-sance', orig: 'French (re- = again + naître = be born)', pattern: "r-e-n-a-i-s-s-a-n-c-e (double 's', ends in '-ance')" },

  // Expanded Two-Bee Greek Morphology & Science
  philosophy: { def: 'the study of the fundamental nature of knowledge, reality, and existence', ex: 'Greek thinkers founded moral philosophy in ancient Athens.', syll: 'phi-los-o-phy', orig: 'Greek (phil- = love + sophia = wisdom)', pattern: "Two 'ph's: p-h-i-l-o-s-o-p-h-y" },
  philanthropy: { def: 'the desire to promote the welfare of others, expressed through charitable donations', ex: 'Her generous philanthropy helped build community learning centers.', syll: 'phi-lan-thro-py', orig: 'Greek (phil- = love + anthropos = mankind)', pattern: "p-h-i-l-a-n-t-h-r-o-p-y" },
  bibliophile: { def: 'a person who collects or has a great love of books', ex: 'As a passionate bibliophile, she owned over a thousand classic volumes.', syll: 'bib-li-o-phile', orig: 'Greek (biblion = book + phil- = love)', pattern: "b-i-b-l-i-o-p-h-i-l-e" },
  claustrophobia: { def: 'extreme or irrational fear of confined or crowded spaces', ex: 'Taking the crowded elevator triggered his claustrophobia.', syll: 'claus-tro-pho-bia', orig: 'Latin (claustrum = lock) + Greek (phobos = fear)', pattern: "c-l-a-u-s-t-r-o-p-h-o-b-i-a" },
  arachnophobia: { def: 'an extreme fear of spiders and other arachnids', ex: 'His arachnophobia made him avoid garden sheds.', syll: 'a-rach-no-pho-bia', orig: 'Greek (arachne = spider + phobos = fear)', pattern: "a-r-a-c-h-n-o-p-h-o-b-i-a" },
  hydrophobia: { def: 'extreme or irrational fear of water', ex: 'The rescue puppy overcame its hydrophobia with gentle swimming lessons.', syll: 'hy-dro-pho-bia', orig: 'Greek (hydor = water + phobos = fear)', pattern: "h-y-d-r-o-p-h-o-b-i-a" },
  acrophobia: { def: 'extreme or irrational fear of heights', ex: 'Looking down from the observation tower sparked her acrophobia.', syll: 'ac-ro-pho-bia', orig: 'Greek (akron = peak + phobos = fear)', pattern: "a-c-r-o-p-h-o-b-i-a" },
  kaleidoscope: { def: 'a tube containing mirrors and colored glass reflecting endless geometric patterns', ex: 'She rotated the brass kaleidoscope to view dazzling mandalas.', syll: 'ka-lei-do-scope', orig: 'Greek (kalos = beautiful + eidos = form + scope = look)', pattern: "k-a-l-e-i-d-o-s-c-o-p-e (ei diphthong)" },
  microscope: { def: 'an optical instrument used for viewing very small objects like cells', ex: 'We observed onion cells dividing under the laboratory microscope.', syll: 'mi-cro-scope', orig: 'Greek (mikros = small + skopein = look)', pattern: "m-i-c-r-o-s-c-o-p-e" },
  telescope: { def: 'an optical instrument designed to make distant objects appear nearer', ex: 'Galileo aimed his historic telescope toward the moons of Jupiter.', syll: 'tel-e-scope', orig: 'Greek (tele = far + skopein = look)', pattern: "t-e-l-e-s-c-o-p-e" },
  symphony: { def: 'an elaborate musical composition for a full orchestra', ex: 'The maestro conducted a stirring four-movement symphony.', syll: 'sym-pho-ny', orig: 'Greek (syn = together + phone = sound)', pattern: "'ph' as /f/, ends in '-y': s-y-m-p-h-o-n-y" },
  amphitheater: { def: 'a circular or oval open-air venue with tiered seating', ex: 'The gladiators marched into the ancient Roman amphitheater.', syll: 'am-phi-the-a-ter', orig: 'Greek (amphi = both sides / around + theatron = theater)', pattern: "a-m-p-h-i-t-h-e-a-t-e-r" },

  // Expanded Two-Bee Consonant & Affix Patterns
  resilience: { def: 'the capacity to recover quickly from difficulties; toughness', ex: 'Her academic resilience helped her bounce back after a tough round.', syll: 're-sil-ience', orig: 'Latin (resilire = to leap back)', pattern: "Ends in '-ience': r-e-s-i-l-i-e-n-c-e" },
  brilliance: { def: 'exceptional talent, intelligence, or intense brightness', ex: 'The diamond reflected light with dazzling brilliance.', syll: 'bril-liance', orig: 'French (brillant)', pattern: "Double 'l', ends in '-iance': b-r-i-l-l-i-a-n-c-e" },
  radiance: { def: 'light or heat as emitted or reflected by something; glowing beauty', ex: 'The golden hour bathed the auditorium in warm radiance.', syll: 'ra-di-ance', orig: 'Latin (radiare = to shine)', pattern: "Ends in '-ance': r-a-d-i-a-n-c-e" },
  diligence: { def: 'careful and persistent work or effort', ex: 'His academic diligence was rewarded with first honors.', syll: 'dil-i-gence', orig: 'Latin (diligere = to value / love)', pattern: "Ends in '-ence': d-i-l-i-g-e-n-c-e" },
  coincidence: { def: 'a remarkable concurrence of events without apparent causal connection', ex: 'By pure coincidence, both spellers wore identical yellow ties.', syll: 'co-in-ci-dence', orig: 'Latin (co- + incidere = fall upon)', pattern: "c-o-i-n-c-i-d-e-n-c-e" },
  courageous: { def: 'not deterred by danger or pain; brave', ex: 'The courageous youngster stood proudly before the judges.', syll: 'cou-ra-geous', orig: 'Old French (corage = heart)', pattern: "Retains 'e' before '-ous': c-o-u-r-a-g-e-o-u-s" },
  mountainous: { def: 'having many mountains; huge or towering', ex: 'The expedition trekked across steep mountainous terrain.', syll: 'moun-tain-ous', orig: 'Old French / Latin (montana)', pattern: "m-o-u-n-t-a-i-n-o-u-s (ends in '-ous')" },
  ferocious: { def: 'savagely fierce, cruel, or violent', ex: 'The Arctic blizzard unleashed ferocious gale winds.', syll: 'fe-ro-cious', orig: 'Latin (ferox = wild / fierce)', pattern: "Ends in '-cious': f-e-r-o-c-i-o-u-s" },
  curiosity: { def: 'a strong desire to know or learn something', ex: 'Her scientific curiosity inspired her to study marine biology.', syll: 'cu-ri-os-i-ty', orig: 'Latin (curiosus = careful / inquisitive)', pattern: "c-u-r-i-o-s-i-t-y" },
  trajectory: { def: 'the curved path followed by a projectile flying through space', ex: 'Astronomers plotted the precise orbital trajectory of the comet.', syll: 'tra-jec-to-ry', orig: 'Latin (trajicere = to throw across)', pattern: "t-r-a-j-e-c-t-o-r-y" },
  magnificent: { def: 'impressively beautiful, elaborate, or striking', ex: 'The king entered the magnificent vaulted cathedral.', syll: 'mag-nif-i-cent', orig: 'Latin (magnificus = great)', pattern: "m-a-g-n-i-f-i-c-e-n-t" },
  beneficial: { def: 'favorable or advantageous; resulting in good', ex: 'Daily reading habits are beneficial for expanding spelling vocabulary.', syll: 'ben-e-fi-cial', orig: 'Latin (beneficium = kindness)', pattern: "Ends in '-cial': b-e-n-e-f-i-c-i-a-l" },

  // Expanded Global Loanwords & Cultural Terms
  origami: { def: 'the Japanese art of folding paper into decorative shapes and figures', ex: 'He folded an intricate origami crane from a single square sheet.', syll: 'o-ri-ga-mi', orig: 'Japanese (ori = fold + kami = paper)', pattern: "o-r-i-g-a-m-i" },
  karaoke: { def: 'entertainment in which amateur singers sing along with recorded music', ex: 'The family sang pop songs together at the neighborhood karaoke lounge.', syll: 'ka-ra-o-ke', orig: 'Japanese (kara = empty + oke = orchestra)', pattern: "k-a-r-a-o-k-e" },
  tsunami: { def: 'a long high sea wave caused by an underwater earthquake or volcanic eruption', ex: 'The coastal warning system alerted residents of an approaching tsunami.', syll: 'tsu-na-mi', orig: 'Japanese (tsu = harbor + nami = wave)', pattern: "Starts with 'ts': t-s-u-n-a-m-i" },
  safari: { def: 'an expedition to observe or hunt animals in their natural habitat, especially in East Africa', ex: 'They photographed elephants and giraffes during their Serengeti safari.', syll: 'sa-fa-ri', orig: 'Swahili / Arabic (safara = to travel)', pattern: "s-a-f-a-r-i" },
  silhouette: { def: 'the dark shape and outline of someone or something visible against a lighter background', ex: 'The oak tree cast a majestic silhouette against the setting sun.', syll: 'sil-hou-ette', orig: 'French (after Étienne de Silhouette)', pattern: "s-i-l-h-o-u-e-t-t-e" },
  millionaire: { def: 'a person whose assets or net worth are valued at one million dollars or more', ex: 'The philanthropic millionaire funded free coding camps for youth.', syll: 'mil-lion-aire', orig: 'French (millionnaire)', pattern: "Double 'l', ends in '-aire': m-i-l-l-i-o-n-a-i-r-e" },
  illustrate: { def: 'to provide a book or article with pictures, or explain clearly with examples', ex: 'The artist agreed to illustrate the new children’s fairy tale.', syll: 'il-lus-trate', orig: 'Latin (illustrare = to light up)', pattern: "Double 'l': i-l-l-u-s-t-r-a-t-e" },
  millennium: { def: 'a period of a thousand years', ex: 'The ancient sequoia tree had lived for more than a millennium.', syll: 'mil-len-ni-um', orig: 'Latin (mille = thousand + annus = year)', pattern: "Double 'l', double 'n': m-i-l-l-e-n-n-i-u-m" },
  accommodate: { def: 'to provide lodging or sufficient space for; fit in with the wishes of', ex: 'The grand hall could comfortably accommodate five hundred guests.', syll: 'ac-com-mo-date', orig: 'Latin (accommodare = to fit / adapt)', pattern: "Double 'c', double 'm': a-c-c-o-m-m-o-d-a-t-e" },
  possession: { def: 'the state of having, owning, or controlling something', ex: 'The antique compass was his most prized family possession.', syll: 'pos-ses-sion', orig: 'Latin (possidere = to possess)', pattern: "Double 's' twice: p-o-s-s-e-s-s-i-o-n" },
  avocado: { def: 'a pear-shaped tropical fruit with rough green skin and rich creamy edible flesh', ex: 'She mashed fresh lime and ripe avocado for lunch.', syll: 'av-o-ca-do', orig: 'Nahuatl (āhuacatl) / Spanish', pattern: "a-v-o-c-a-d-o" },
  guacamole: { def: 'a Mexican dip or sauce made of mashed avocado, lime, and seasoning', ex: 'We dipped crispy corn tortilla chips into fresh guacamole.', syll: 'gua-ca-mo-le', orig: 'Nahuatl (āhuacamolli) / Spanish', pattern: "g-u-a-c-a-m-o-l-e" },

  // Expanded Botany, Zoology & Nature Two-Bee
  dandelion: { def: 'a widely distributed weed with yellow flowers and a fluffy seed head', ex: 'She blew the fluffy seeds off the ripe dandelion head.', syll: 'dan-de-li-on', orig: 'French (dent-de-lion = lion’s tooth)', pattern: "d-a-n-d-e-l-i-o-n" },
  chameleon: { def: 'a small slow-moving lizard that can change the color of its skin to blend in', ex: 'The green chameleon blended invisibly against the tropical leaf.', syll: 'cha-me-le-on', orig: 'Greek (chamai = ground + leon = lion)', pattern: "'ch' as /k/: c-h-a-m-e-l-e-o-n" },
  pterodactyl: { def: 'a prehistoric flying reptile with membranous wings and a long beak', ex: 'Fossils show the pterodactyl soared over ancient Mesozoic coastlines.', syll: 'pte-ro-dac-tyl', orig: 'Greek (pteron = wing + daktylos = finger)', pattern: "Silent 'p' at start: p-t-e-r-o-d-a-c-t-y-l" },
  rhododendron: { def: 'a shrub or small tree with large clusters of bell-shaped flowers', ex: 'Purple rhododendron blossomed in dense clusters on the hillside.', syll: 'rho-do-den-dron', orig: 'Greek (rhodon = rose + dendron = tree)', pattern: "r-h-o-d-o-d-e-n-d-r-o-n" },
  photosynthesis: { def: 'the biological process by which green plants use sunlight to synthesize food', ex: 'Leaves absorb carbon dioxide to power photosynthesis.', syll: 'pho-to-syn-the-sis', orig: 'Greek (photo- = light + synthesis = putting together)', pattern: "p-h-o-t-o-s-y-n-t-h-e-s-i-s" },
  chlorophyll: { def: 'a green pigment responsible for the absorption of light in plants', ex: 'Chlorophyll gives tree leaves their rich green emerald color.', syll: 'chlo-ro-phyll', orig: 'Greek (chloros = pale green + phyllon = leaf)', pattern: "c-h-l-o-r-o-p-h-y-l-l (double 'l')" },
  metamorphosis: { def: 'a striking change in form or structure in an organism after hatching', ex: 'A caterpillar undergoes complete metamorphosis inside its chrysalis.', syll: 'met-a-mor-pho-sis', orig: 'Greek (meta- = change + morphe = form)', pattern: "m-e-t-a-m-o-r-p-h-o-s-i-s" },
  echinoderm: { def: 'a marine invertebrate of the phylum Echinodermata, such as a starfish or sea urchin', ex: 'The sea urchin is a spiny ocean echinoderm.', syll: 'e-chi-no-derm', orig: 'Greek (echinos = hedgehog / sea urchin + derma = skin)', pattern: "e-c-h-i-n-o-d-e-r-m" },
  connoisseur: { def: 'an expert judge in matters of taste and fine art', ex: 'The culinary connoisseur could identify distinct cacao origins in chocolate.', syll: 'con-nois-seur', orig: 'French (connaître = to know)', pattern: "c-o-n-n-o-i-s-s-e-u-r (double 'n', double 's')" },
  guarantee: { def: 'a formal promise or assurance that certain conditions will be fulfilled', ex: 'The manufacturer offered a five-year guarantee on the microscope lens.', syll: 'guar-an-tee', orig: 'French (garantie / Germanic)', pattern: "Starts with 'g-u-a-r': g-u-a-r-a-n-t-e-e" },
  reservoir: { def: 'a large natural or artificial lake used as a source of water supply', ex: 'The city drew drinking water from the pristine mountain reservoir.', syll: 'res-er-voir', orig: 'French (réserver = to reserve)', pattern: "Ends in '-oir': r-e-s-e-r-v-o-i-r" },
  champagne: { def: 'a sparkling white wine, or a pale yellowish-gold color', ex: 'The champion was showered with ribbons in shades of champagne.', syll: 'cham-pagne', orig: 'French (Champagne province)', pattern: "Silent 'g': c-h-a-m-p-a-g-n-e" },
  croquet: { def: 'a lawn game played by hitting wooden balls through hoops with mallets', ex: 'They played a relaxing afternoon game of croquet on the manicured lawn.', syll: 'cro-quet', orig: 'French (croquet = hockey stick / hook)', pattern: "Silent 't': c-r-o-q-u-e-t" },
  chocolate: { def: 'a sweet food made from roasted and ground cacao seeds', ex: 'A mug of warm dark chocolate cheered the spellers after the meet.', syll: 'choc-o-late', orig: 'Nahuatl (xocolātl = bitter water) / Spanish', pattern: "c-h-o-c-o-l-a-t-e" },
  barbeque: { def: 'a meal or gathering at which meat or fish is cooked outdoors over an open fire', ex: 'The spelling bee team celebrated their victory with a sunset barbeque.', syll: 'bar-be-que', orig: 'Taíno (barbacoa) / Spanish', pattern: "b-a-r-b-e-q-u-e" },
  canyon: { def: 'a deep gorge, typically one with a river flowing through it', ex: 'The Colorado River carved the dramatic red stone canyon.', syll: 'can-yon', orig: 'Spanish (cañón = tube / pipe)', pattern: "c-a-n-y-o-n" },
  tornado: { def: 'a violently rotating column of air touching both the earth and a cloud', ex: 'The weather siren sounded as a tornado touched down across the plains.', syll: 'tor-na-do', orig: 'Spanish (tornar = to turn / tronada = thunderstorm)', pattern: "t-o-r-n-a-d-o" },
  armadillo: { def: 'a nocturnal mammal with a body covered in armor-like bony plates', ex: 'An armadillo burrowed peacefully under the desert mesquite bush.', syll: 'ar-ma-dil-lo', orig: 'Spanish (armado = armed one)', pattern: "Double 'l': a-r-m-a-d-i-l-l-o" }
};

// =============================================================================
// ASSEMBLE ALL FLASHCARDS FOR STUDY DECKS (LOANWORDS, HOMOPHONES & MEETING WORDS)
// =============================================================================
export const LOANWORD_CARDS: Flashcard[] = COMPREHENSIVE_LOAN_WORDS.map((lw) => {
  const flag = 
    lw.language === 'French' ? '🥐' :
    lw.language === 'German' ? '🥨' :
    lw.language === 'Italian' ? '🎻' :
    lw.language === 'Spanish' ? '🌮' :
    lw.language === 'Japanese' ? '🌸' :
    lw.language === 'Greek' ? '🏛️' :
    lw.language === 'Latin' ? '📜' : '🌍';

  let specificCat: any = 'loanwords';
  if (lw.language === 'French') specificCat = 'loanwords-french';
  else if (lw.language === 'German') specificCat = 'loanwords-german';
  else if (lw.language === 'Italian') specificCat = 'loanwords-italian';
  else if (lw.language === 'Spanish') specificCat = 'loanwords-spanish';
  else if (lw.language === 'Greek') specificCat = 'loanwords-greek';
  else if (lw.language === 'Latin') specificCat = 'loanwords-latin';
  else if (lw.language === 'Japanese') specificCat = 'loanwords-japanese';

  return {
    id: `card-lw-${lw.id}`,
    word: lw.word,
    definition: lw.definition,
    partOfSpeech: lw.partOfSpeech,
    category: specificCat,
    example: lw.sentence,
    syllables: lw.word,
    phoneticHint: lw.pronunciation,
    languageOrigin: `${lw.language} · ${lw.languageOriginDetails}`,
    trickyPattern: `${lw.spellingTip}${lw.etymologyStory ? ` — Etymology: ${lw.etymologyStory}` : ''}`,
    lesson: `Loanwords Vault (${lw.language})`,
    flag,
    spellingClue: lw.spellingTip,
    group: lw.difficulty === 'One-Bee' ? 'Group B (Grades 3–4)' : 'Group C (Grades 5–6)'
  };
});

export const HOMOPHONE_CARDS: Flashcard[] = SCRIPPS_HOMOPHONE_PAIRS.flatMap((pair, pIdx) => {
  return pair.words.map((item, wIdx) => {
    const otherTwins = pair.words
      .filter((w) => w.word.toLowerCase() !== item.word.toLowerCase())
      .map((w) => w.word)
      .join(' / ');

    return {
      id: `card-hp-${pIdx}-${wIdx}-${item.word}`,
      word: item.word,
      definition: item.definition,
      partOfSpeech: item.partOfSpeech,
      category: 'homophones' as const,
      example: item.sentence,
      syllables: item.syllables || item.word,
      phoneticHint: item.ipa || pair.soundIpa,
      languageOrigin: item.origin,
      trickyPattern: `⚠️ Homophone Trap: Sounds identical to "${otherTwins}" (${pair.soundIpa}). English 1 Rule: ${pair.ruleTip}`,
      lesson: `Homophone Showdown (${pair.category})`,
      flag: '🎙️',
      homophoneTwin: otherTwins,
      homophoneTrap: pair.ruleTip,
      memoryHook: item.memoryHook,
      spellingClue: item.spellingClue,
      group: pair.category === 'Grade 3-6 Staples' ? 'Group B (Grades 3–4)' : 'Group C (Grades 5–6)'
    };
  });
});

const RAW_WORD_STUDY_CARDS: Flashcard[] = [
  ...MEETING_2_WORDS_TO_KNOW,
  ...MEETING_3_WORDS_TO_KNOW,
  ...LOANWORD_CARDS,
  ...HOMOPHONE_CARDS,
  ...MEETING_2_FULL_59_WORDS.map((w, idx) => {
    const existing = [...MEETING_2_WORDS_TO_KNOW, ...MEETING_3_WORDS_TO_KNOW].find(x => x.word.toLowerCase() === w.toLowerCase());
    if (existing) return existing;
    const detail = ALL_WORDS_MAP[w.toLowerCase()] || {
      def: 'Official English 1 National Spelling Bee study word',
      ex: `We practiced spelling '${w}' in our bee preparation session.`,
      syll: w,
      pattern: 'Standard pattern'
    };
    return {
      id: `m2-card-${idx}-${w}`,
      word: w,
      definition: detail.def,
      category: 'meeting-2-practice-59' as const,
      example: detail.ex,
      syllables: detail.syll || w,
      phoneticHint: `/${w}/`,
      languageOrigin: detail.orig || 'English',
      trickyPattern: detail.pattern || 'Standard pattern',
      lesson: 'Meeting 2 (Full 59 List)'
    };
  }),
  ...MEETING_3_FULL_61_WORDS.map((w, idx) => {
    const existing = [...MEETING_2_WORDS_TO_KNOW, ...MEETING_3_WORDS_TO_KNOW].find(x => x.word.toLowerCase() === w.toLowerCase());
    if (existing) return existing;
    const detail = ALL_WORDS_MAP[w.toLowerCase()] || {
      def: 'Advanced English 1 National Spelling Bee study word',
      ex: `The contestant correctly enunciated '${w}' on stage.`,
      syll: w,
      pattern: 'Advanced English 1 pattern'
    };
    return {
      id: `m3-card-${idx}-${w}`,
      word: w,
      definition: detail.def,
      category: 'meeting-3-practice-61' as const,
      example: detail.ex,
      syllables: detail.syll || w,
      phoneticHint: `/${w}/`,
      languageOrigin: detail.orig || 'English / Loanword',
      trickyPattern: detail.pattern || 'Two-Bee pattern',
      lesson: 'Meeting 3 (Full 125 Grand List)'
    };
  })
];

// Deduplicate so every card is unique
export const ALL_WORD_STUDY_CARDS: Flashcard[] = RAW_WORD_STUDY_CARDS.filter(
  (card, index, self) => index === self.findIndex((c) => c.word.toLowerCase() === card.word.toLowerCase())
);

// Backwards compatibility alias
export const FLASHCARDS = ALL_WORD_STUDY_CARDS;
export const PPT_ROUND_WORDS = [...MEETING_2_WORDS_TO_KNOW, ...MEETING_3_WORDS_TO_KNOW];

// All Tricky Patterns Combined
export const TRICKY_PATTERNS: TrickyPattern[] = [
  ...MEETING_2_PATTERNS,
  ...MEETING_3_PATTERNS
];

// Default Pre-test & Post-test (Meeting 2 defaults, can be switched to Meeting 3)
export const PRE_TEST_WORDS: DictationWord[] = MEETING_2_WARM_UP;
export const POST_TEST_WORDS: DictationWord[] = MEETING_2_PROGRESS_CHECK;

// =============================================================================
// WORDWALL "OPEN THE BOX" 30 CHALLENGES (15 from Meeting 2 + 15 from Meeting 3)
// Specially curated and kid-friendly for Grades 3-6, strictly mapped to lesson patterns
// =============================================================================
export const OPEN_THE_BOX_30: BoxChallenge[] = [
  // Boxes 1 - 15: Meeting 2 Words (Roots: dis-, tele-, -ous, double consonants & silent letters)
  { boxNumber: 1, word: 'disembark', definition: 'to leave a ship, airplane, or vehicle at the end of a trip', sentence: 'The excited passengers prepared to disembark from the airplane.', hint: "Prefix 'dis-' (away): d-i-s-e-m-b-a-r-k", level: 'Medium', points: 15 },
  { boxNumber: 2, word: 'flannel', definition: 'a soft-woven cotton or wool fabric used for warm pajamas and shirts', sentence: 'He wore a soft checkered flannel shirt on a cool morning.', hint: "Double 'n': f-l-a-n-n-e-l", level: 'Medium', points: 15 },
  { boxNumber: 3, word: 'telepathic', definition: 'able to communicate thoughts from far away without speaking aloud', sentence: 'The best friends seemed telepathic because they thought alike.', hint: "Greek root 'tele-' (far): t-e-l-e-p-a-t-h-i-c", level: 'Medium', points: 20 },
  { boxNumber: 4, word: 'guardian', definition: 'a trusted adult who protects and takes care of a child', sentence: 'Her guardian cheered loudly when she spelled her word correctly.', hint: "Silent 'u' after 'g': g-u-a-r-d-i-a-n", level: 'Medium', points: 15 },
  { boxNumber: 5, word: 'harmonious', definition: 'having parts that blend together pleasantly; full of harmony', sentence: 'The children sang in a sweet and harmonious melody.', hint: "Suffix '-ous' (full of): h-a-r-m-o-n-i-o-u-s", level: 'Medium', points: 20 },
  { boxNumber: 6, word: 'gimmick', definition: 'a clever trick or catchy idea used to grab people’s attention', sentence: 'Giving out free stickers was a fun advertising gimmick.', hint: "Double 'm': g-i-m-m-i-c-k", level: 'Medium', points: 15 },
  { boxNumber: 7, word: 'cucumber', definition: 'a crisp green vegetable often sliced in salads or dipped in hummus', sentence: 'She packed fresh cucumber sticks in her school lunchbox.', hint: "c-u-c-u-m-b-e-r", level: 'Medium', points: 10 },
  { boxNumber: 8, word: 'eavesdrop', definition: 'to secretly listen in on someone else’s conversation', sentence: 'It is bad manners to eavesdrop on private talks.', hint: "Starts with 'e-a-v-e-s': e-a-v-e-s-d-r-o-p", level: 'Medium', points: 15 },
  { boxNumber: 9, word: 'nephew', definition: 'the son of your brother or sister', sentence: 'Uncle David took his nephew to the science museum.', hint: "'ph' makes the /f/ sound: n-e-p-h-e-w", level: 'Medium', points: 10 },
  { boxNumber: 10, word: 'astonish', definition: 'to surprise or amaze someone greatly with something remarkable', sentence: 'The magician’s disappearing rabbit will astonish the audience.', hint: "Ends in '-ish': a-s-t-o-n-i-s-h", level: 'Medium', points: 15 },
  { boxNumber: 11, word: 'janitor', definition: 'a person who cleans, repairs, and takes good care of a school building', sentence: 'Our friendly school janitor always waves hello in the hall.', hint: "Ends in '-or' (not '-er'): j-a-n-i-t-o-r", level: 'Medium', points: 15 },
  { boxNumber: 12, word: 'amphibian', definition: 'a cold-blooded creature that can live both in fresh water and on land', sentence: 'A spotted frog is a cute amphibian that starts life as a tadpole.', hint: "Greek 'amphi' + 'bio' with 'ph' as /f/: a-m-p-h-i-b-i-a-n", level: 'Two-Bee', points: 20 },
  { boxNumber: 13, word: 'miraculous', definition: 'so amazing and wonderful that it seems like a miracle', sentence: 'The tiny kitten made a miraculous recovery after being rescued.', hint: "Suffix '-ulous' (full of): m-i-r-a-c-u-l-o-u-s", level: 'Medium', points: 20 },
  { boxNumber: 14, word: 'volcano', definition: 'a mountain with an opening that can erupt lava, ash, and steam', sentence: 'The science class built a baking soda volcano model that bubbled over.', hint: "v-o-l-c-a-n-o", level: 'Medium', points: 10 },
  { boxNumber: 15, word: 'disconnect', definition: 'to break or unplug a link, plug, or electrical connection', sentence: 'Please disconnect the tablet charger once the battery is full.', hint: "Prefix 'dis-' (away/un-): d-i-s-c-o-n-n-e-c-t", level: 'Medium', points: 15 },

  // Boxes 16 - 30: Meeting 3 Words (French loanwords, roots phil- & -phobia, Two-Bee patterns)
  { boxNumber: 16, word: 'soirée', definition: 'a fun and fancy evening party with snacks, games, or music', sentence: 'The school orchestra hosted a joyful musical soirée for parents.', hint: "French loanword: keeps the accent 'é' (s-o-i-r-é-e)", level: 'Two-Bee', points: 25 },
  { boxNumber: 17, word: 'philharmonic', definition: 'devoted to loving music; a large symphony orchestra', sentence: 'We listened to classical instruments at the youth philharmonic concert.', hint: "Greek root 'phil-' (love of): p-h-i-l-h-a-r-m-o-n-i-c", level: 'Two-Bee', points: 25 },
  { boxNumber: 18, word: 'brontophobia', definition: 'an intense fear of loud thunder and flashing lightning during a storm', sentence: 'During thunderstorms, our scared puppy hides because of brontophobia.', hint: "Greek roots 'bronto' (thunder) + '-phobia' (fear)", level: 'Two-Bee', points: 25 },
  { boxNumber: 19, word: 'duvet', definition: 'a soft, fluffy bed blanket stuffed with feathers or warm cotton', sentence: 'She pulled the warm fluffy duvet up to her chin on a snowy evening.', hint: "French loanword: silent final 't': d-u-v-e-t", level: 'Two-Bee', points: 20 },
  { boxNumber: 20, word: 'spectacles', definition: 'another classic word for eyeglasses that help people see clearly', sentence: 'Grandma slipped on her spectacles to read us a bedtime story.', hint: "Latin root 'spec' (look): s-p-e-c-t-a-c-l-e-s", level: 'Medium', points: 15 },
  { boxNumber: 21, word: 'innovator', definition: 'a creative person who invents clever new tools, games, or ideas', sentence: 'The young innovator designed a backpack with built-in solar chargers.', hint: "Double 'n', ends in '-or': i-n-n-o-v-a-t-o-r", level: 'Two-Bee', points: 20 },
  { boxNumber: 22, word: 'personnel', definition: 'the group of people or staff who work together at an organization', sentence: 'The library personnel organized a fun summer reading challenge.', hint: "Double 'n', single 'l': p-e-r-s-o-n-n-e-l (not personal!)", level: 'Two-Bee', points: 20 },
  { boxNumber: 23, word: 'rotisserie', definition: 'a rotating oven spit that slowly turns food as it cooks evenly', sentence: 'The aroma of chicken turning on the golden rotisserie was delicious.', hint: "French loanword: double 's': r-o-t-i-s-s-e-r-i-e", level: 'Two-Bee', points: 25 },
  { boxNumber: 24, word: 'perseverance', definition: 'never giving up and continuing to try hard even when things are difficult', sentence: 'With daily practice and perseverance, she spelled every word right.', hint: "Ends in '-ance': p-e-r-s-e-v-e-r-a-n-c-e", level: 'Two-Bee', points: 25 },
  { boxNumber: 25, word: 'buoyancy', definition: 'the natural power of water to keep toys, boats, and swimmers floating', sentence: 'The rubber duck floated with ease thanks to natural buoyancy.', hint: "Starts with 'b-u-o-y': b-u-o-y-a-n-c-y", level: 'Two-Bee', points: 20 },
  { boxNumber: 26, word: 'fluoride', definition: 'a healthy mineral added to toothpaste to keep children’s teeth strong', sentence: 'Brushing twice a day with fluoride toothpaste keeps cavities away.', hint: "'u' before 'o': f-l-u-o-r-i-d-e (think fluorine, not flour!)", level: 'Medium', points: 20 },
  { boxNumber: 27, word: 'hallowed', definition: 'greatly respected, honored, or celebrated through history', sentence: 'Framed pictures of spelling champions hung in the hallowed hall.', hint: "Double 'l': h-a-l-l-o-w-e-d", level: 'Medium', points: 15 },
  { boxNumber: 28, word: 'seismologist', definition: 'an earth scientist who studies ground movements and earthquakes', sentence: 'The seismologist showed students how underground tremors are measured.', hint: "Begins with 's-e-i-s': s-e-i-s-m-o-l-o-g-i-s-t", level: 'Champion', points: 30 },
  { boxNumber: 29, word: 'fondant', definition: 'a smooth sweet sugar icing rolled flat to decorate birthday cakes', sentence: 'The baker smoothed bright blue fondant over the celebration cake.', hint: "French origin: f-o-n-d-a-n-t", level: 'Medium', points: 15 },
  { boxNumber: 30, word: 'commerce', definition: 'the buying, selling, and trading of goods between stores and towns', sentence: 'The bustling downtown farmers market was full of cheerful commerce.', hint: "Double 'm': c-o-m-m-e-r-c-e", level: 'Medium', points: 15 }
];

// =============================================================================
// ENGLISH 1 NATIONAL SPELLING BEE FUN FACTS & COMPETITION LORE
// =============================================================================
export const ENGLISH_1_LORE = [
  {
    title: 'English 1 National Spelling Bee Championship!',
    body: "English 1 hosts Indonesia's premier national spelling bee competition, empowering young learners from Grade 1 through Grade 9 across regions nationwide, culminating in the prestigious Grand Final in Jakarta!",
    tag: 'National Final 🇮🇩'
  },
  {
    title: 'The Golden "Say – Spell – Say" Protocol',
    body: "In the English 1 Spelling Bee, every speller must pronounce the word clearly before spelling, spell each letter distinctly out loud, and pronounce the word once more to complete their turn. Once a letter is uttered, it cannot be changed!",
    tag: 'Stage Rule 🎙️'
  },
  {
    title: 'Puspresnas Recognized Excellence',
    body: "Champions of the English 1 National Spelling Bee achieve prestigious educational certificates recognized by Puspresnas (Pusat Prestasi Nasional), opening bright pathways for scholarships and academic honors!",
    tag: 'Prestigious Honor 🏆'
  },
  {
    title: 'Group Divisions: Fair & Rigorous!',
    body: "The competition divides spellers into tailored grade brackets: Group A (Grades 1–2), Group B (Grades 3–4), Group C (Grades 5–6), and Group D (Grades 7–9), ensuring grade-level orthographic mastery.",
    tag: 'Grade Brackets 📚'
  },
  {
    title: 'The Pronouncer 3-Step Protocol',
    body: "The English 1 pronouncer adheres to the standard 3-step sequence: Word ➔ Context Sentence ➔ Word. Spellers may also request definitions, language of origin, and part of speech!",
    tag: 'Pronouncer Podium 🏛️'
  },
  {
    title: 'It’s All Greek, Latin & French Loanwords!',
    body: "Championship final rounds test loanwords borrowed from French (silent consonants and accents), German, Italian musical terms, and Greek scientific roots. Knowing word origins unlocks 100% spelling accuracy!",
    tag: 'Etymology Key 🔍'
  },
  {
    title: 'Two-Speller Sudden Death Showdown',
    body: "When only two spellers remain in the National Final, if one misspells, the other speller must correctly spell that missed word plus one new championship word to claim the National Trophy!",
    tag: 'Championship Duel 🐝'
  }
];

// Backwards-compatible alias for any legacy imports
export const SCRIPPS_LORE = ENGLISH_1_LORE;

// Backward-compatible SPELLING_BEE_WORDS list
export const SPELLING_BEE_WORDS: SpellingWord[] = ALL_WORD_STUDY_CARDS.map((card, idx) => ({
  id: card.id || `sb-${idx}`,
  word: card.word,
  topic: card.category,
  sentence: card.example,
  translation: card.translation,
  definition: card.definition,
  syllables: card.syllables || card.word,
  difficulty: card.category.includes('meeting-3') ? 'Championship' : 'Medium',
  phoneticHint: card.phoneticHint,
  isFromOfficialList: true,
  languageOrigin: card.languageOrigin
}));

// Backward-compatible MOCK_SAT_QUESTIONS (adapted into 50-mark Spelling & Etymology Assessment)
export const MOCK_SAT_QUESTIONS = [
  {
    id: 1,
    number: 1,
    category: 'listening',
    part: 1,
    points: 2,
    question: "Listen to the word pronounced: 'eavesdrop'. Which spelling is correct?",
    options: ['evesdrop', 'eavesdrop', 'eavedrop', 'eavsdropp'],
    correctAnswer: 'eavesdrop',
    explanation: "Eavesdrop begins with 'e-a-v-e-s', from roof eaves where water drips.",
    hint: "'e' before 'a'!"
  },
  {
    id: 2,
    number: 2,
    category: 'vocabulary',
    part: 1,
    points: 2,
    question: "What does the Greek root 'tele-' mean in words like telepathic, telescope, and telephone?",
    options: ['near', 'far / distant', 'sound', 'life'],
    correctAnswer: 'far / distant',
    explanation: "'tele-' means 'far' in Greek.",
    hint: "Reading thoughts or viewing stars from afar."
  },
  {
    id: 3,
    number: 3,
    category: 'grammar',
    part: 2,
    points: 2,
    question: "What does the Latin prefix 'dis-' mean in 'disembark'?",
    options: ['together', 'not / away / to leave', 'before', 'again'],
    correctAnswer: 'not / away / to leave',
    explanation: "Prefix 'dis-' means 'not', 'opposite of', or 'away'.",
    hint: "To leave a ship or aircraft."
  },
  {
    id: 4,
    number: 4,
    category: 'vocabulary',
    part: 2,
    points: 2,
    question: "Which of the following French loanwords keeps its accent mark and refers to an evening party?",
    options: ['soirée', 'duvet', 'faux', 'rotisserie'],
    correctAnswer: 'soirée',
    explanation: "Soirée keeps its accent mark over the 'é' and means an evening party.",
    hint: "Look for the accent mark!"
  },
  {
    id: 5,
    number: 5,
    category: 'writing',
    part: 3,
    points: 2,
    question: "What does the Greek root '-phobia' mean in 'brontophobia'?",
    options: ['love', 'fear', 'water', 'music'],
    correctAnswer: 'fear',
    explanation: "'-phobia' means 'fear' — brontophobia is fear of thunder.",
    hint: "Fear of thunder!"
  }
];

export const STORIES = [];

// =============================================================================
// BACKWARD-COMPATIBILITY & AUDITIONS / STAGE CONTEST EXPORTS
// =============================================================================

export const SPELLING_WORDS: SpellingWord[] = [
  {
    id: 'sw-1',
    word: 'gimmick',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'The magician used a clever gimmick to distract the crowd.',
    definition: 'a trick or device intended to attract attention or publicity',
    syllables: 'gim-mick',
    difficulty: 'Medium',
    phoneticHint: '/ˈɡɪmɪk/',
    languageOrigin: 'American Slang',
    isFromOfficialList: true
  },
  {
    id: 'sw-2',
    word: 'flannel',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'He wore a soft flannel shirt during chilly autumn evenings.',
    definition: 'a soft woven cloth of wool or a blend used for warm clothing',
    syllables: 'flan-nel',
    difficulty: 'Medium',
    phoneticHint: '/ˈflænəl/',
    languageOrigin: 'Welsh',
    isFromOfficialList: true
  },
  {
    id: 'sw-3',
    word: 'cucumber',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'Fresh cucumber slices were added to the crisp garden salad.',
    definition: 'a long, green-skinned fruit with watery flesh, eaten raw in salads',
    syllables: 'cu-cum-ber',
    difficulty: 'Medium',
    phoneticHint: '/ˈkjuːkʌmbər/',
    languageOrigin: 'Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-4',
    word: 'janitor',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'The school janitor kept the hallways polished and clean.',
    definition: 'a person employed to take care of a large building or school',
    syllables: 'jan-i-tor',
    difficulty: 'Medium',
    phoneticHint: '/ˈdʒænɪtər/',
    languageOrigin: 'Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-5',
    word: 'lionize',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'The town decided to lionize the local firefighter who rescued the puppy.',
    definition: 'to treat someone as a celebrity or with great public acclaim',
    syllables: 'li-on-ize',
    difficulty: 'Hard',
    phoneticHint: '/ˈlaɪənaɪz/',
    languageOrigin: 'English',
    isFromOfficialList: true
  },
  {
    id: 'sw-6',
    word: 'spreadsheet',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'The teacher organized all test scores into an electronic spreadsheet.',
    definition: 'a computer program or document showing data arranged in rows and columns',
    syllables: 'spread-sheet',
    difficulty: 'Medium',
    phoneticHint: '/ˈsprɛdʃiːt/',
    languageOrigin: 'English Compound',
    isFromOfficialList: true
  },
  {
    id: 'sw-7',
    word: 'badger',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'The nocturnal badger burrowed deep into the forest hillside.',
    definition: 'a burrowing mammal with strong claws and distinctive black-and-white head stripes',
    syllables: 'bad-ger',
    difficulty: 'Medium',
    phoneticHint: '/ˈbædʒər/',
    languageOrigin: 'Middle English',
    isFromOfficialList: true
  },
  {
    id: 'sw-8',
    word: 'nephew',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'My nephew invited our entire family to his spelling bee championship.',
    definition: 'a son of one’s brother or sister, or brother-in-law or sister-in-law',
    syllables: 'neph-ew',
    difficulty: 'Medium',
    phoneticHint: '/ˈnɛfjuː/',
    languageOrigin: 'Old French via Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-9',
    word: 'imbibe',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'Young scientists imbibe new facts like eager sponges.',
    definition: 'to drink liquids, or absorb and take in ideas or knowledge',
    syllables: 'im-bibe',
    difficulty: 'Hard',
    phoneticHint: '/ɪmˈbaɪb/',
    languageOrigin: 'Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-10',
    word: 'savvy',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'Her tech savvy helped her configure the classroom projector instantly.',
    definition: 'shrewdness, practical knowledge, or common sense',
    syllables: 'sav-vy',
    difficulty: 'Medium',
    phoneticHint: '/ˈsævi/',
    languageOrigin: 'Spanish / French',
    isFromOfficialList: true
  },
  {
    id: 'sw-11',
    word: 'reckon',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'I reckon we will arrive at the auditorium before noon.',
    definition: 'to calculate, estimate, consider, or believe',
    syllables: 'reck-on',
    difficulty: 'Medium',
    phoneticHint: '/ˈrɛkən/',
    languageOrigin: 'Old English',
    isFromOfficialList: true
  },
  {
    id: 'sw-12',
    word: 'boorish',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'Interrupting other speakers is considered boorish behavior.',
    definition: 'rough, ill-mannered, and clumsy in behavior',
    syllables: 'boor-ish',
    difficulty: 'Hard',
    phoneticHint: '/ˈbʊərɪʃ/',
    languageOrigin: 'Dutch / English',
    isFromOfficialList: true
  },
  {
    id: 'sw-13',
    word: 'nurture',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'Teachers nurture curious minds so students can reach their full potential.',
    definition: 'to care for, encourage growth, and support the development of',
    syllables: 'nur-ture',
    difficulty: 'Medium',
    phoneticHint: '/ˈnɜːrtʃər/',
    languageOrigin: 'Old French',
    isFromOfficialList: true
  },
  {
    id: 'sw-14',
    word: 'volcano',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'The dormant volcano had hot steam rising from its rocky crater.',
    definition: 'a mountain or hill with a crater through which lava and rock fragments erupt',
    syllables: 'vol-ca-no',
    difficulty: 'Medium',
    phoneticHint: '/vɒlˈkeɪnoʊ/',
    languageOrigin: 'Italian via Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-15',
    word: 'forensics',
    topic: 'Meeting 2 Mock Bee',
    sentence: 'The forensics unit analyzed the footprint evidence at the scene.',
    definition: 'scientific methods and techniques used in the investigation of crime',
    syllables: 'fo-ren-sics',
    difficulty: 'Hard',
    phoneticHint: '/fəˈrɛnsɪks/',
    languageOrigin: 'Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-16',
    word: 'banal',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'The movie plot was so banal that everyone guessed the ending right away.',
    definition: 'lacking originality, freshness, or novelty; trite or commonplace',
    syllables: 'ba-nal',
    difficulty: 'Hard',
    phoneticHint: '/bəˈnɑːl/',
    languageOrigin: 'French',
    isFromOfficialList: true
  },
  {
    id: 'sw-17',
    word: 'seismologist',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'The seismologist monitored ground tremors along the active earthquake fault.',
    definition: 'a geophysicist who specializes in studying earthquakes and seismic waves',
    syllables: 'seis-mol-o-gist',
    difficulty: 'Hard',
    phoneticHint: '/saɪzˈmɒlədʒɪst/',
    languageOrigin: 'Greek',
    isFromOfficialList: true
  },
  {
    id: 'sw-18',
    word: 'spectacles',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'The librarian adjusted his round silver spectacles before reading.',
    definition: 'a pair of eyeglasses with lenses to correct vision',
    syllables: 'spec-ta-cles',
    difficulty: 'Medium',
    phoneticHint: '/ˈspɛktəkəlz/',
    languageOrigin: 'Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-19',
    word: 'innovator',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'The young innovator designed a solar-powered water filtration device.',
    definition: 'a person who introduces new methods, ideas, or products',
    syllables: 'in-no-va-tor',
    difficulty: 'Medium',
    phoneticHint: '/ˈɪnəveɪtər/',
    languageOrigin: 'Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-20',
    word: 'bursary',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'She received an academic bursary to attend the prestigious STEM summer camp.',
    definition: 'a scholarship or financial grant awarded to a student to attend school',
    syllables: 'bur-sa-ry',
    difficulty: 'Hard',
    phoneticHint: '/ˈbɜːrsəri/',
    languageOrigin: 'Medieval Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-21',
    word: 'hallowed',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'Generations of scholars have walked the hallowed halls of Oxford University.',
    definition: 'greatly respected, honored, or regarded as sacred',
    syllables: 'hal-lowed',
    difficulty: 'Medium',
    phoneticHint: '/ˈhæloʊd/',
    languageOrigin: 'Old English',
    isFromOfficialList: true
  },
  {
    id: 'sw-22',
    word: 'apogee',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'The satellite reached its apogee thousands of miles above Earth.',
    definition: 'the highest or most distant point in an orbit, or a climax of success',
    syllables: 'ap-o-gee',
    difficulty: 'Hard',
    phoneticHint: '/ˈæpədʒiː/',
    languageOrigin: 'Greek via French',
    isFromOfficialList: true
  },
  {
    id: 'sw-23',
    word: 'hiatus',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'The band took a brief hiatus before recording their next studio album.',
    definition: 'a pause, break, or interruption in continuity or activity',
    syllables: 'hi-a-tus',
    difficulty: 'Hard',
    phoneticHint: '/haɪˈeɪtəs/',
    languageOrigin: 'Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-24',
    word: 'freesia',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'The sweet fragrance of yellow freesia blossoms filled the florist shop.',
    definition: 'a South African plant of the iris family with fragrant tubular flowers',
    syllables: 'free-si-a',
    difficulty: 'Hard',
    phoneticHint: '/ˈfriːziə/',
    languageOrigin: 'German / Botanical Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-25',
    word: 'exoneration',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'The newly discovered evidence led to his complete and official exoneration.',
    definition: 'the act of freeing someone from blame, accusation, or criminal liability',
    syllables: 'ex-on-er-a-tion',
    difficulty: 'Hard',
    phoneticHint: '/ɪɡˌzɒnəˈreɪʃən/',
    languageOrigin: 'Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-26',
    word: 'duvet',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'She curled up under the soft goose-down duvet on a winter night.',
    definition: 'a soft quilt filled with down, feathers, or fiber, used instead of a top sheet',
    syllables: 'du-vet',
    difficulty: 'Medium',
    phoneticHint: '/duːˈveɪ/',
    languageOrigin: 'French',
    isFromOfficialList: true
  },
  {
    id: 'sw-27',
    word: 'turpitude',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'The judge denounced acts of moral turpitude that harmed the community.',
    definition: 'wickedness, depravity, or a disgraceful character trait',
    syllables: 'tur-pi-tude',
    difficulty: 'Hard',
    phoneticHint: '/ˈtɜːrpɪtjuːd/',
    languageOrigin: 'Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-28',
    word: 'platitude',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'He offered an empty platitude instead of a real, thoughtful apology.',
    definition: 'a remark or statement, especially one with moral content, that has been used too often to be interesting or thoughtful',
    syllables: 'plat-i-tude',
    difficulty: 'Hard',
    phoneticHint: '/ˈplætɪtjuːd/',
    languageOrigin: 'French',
    isFromOfficialList: true
  },
  {
    id: 'sw-29',
    word: 'nobiliary',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'The museum displayed nobiliary coats of arms from ancient royal families.',
    definition: 'relating to the nobility or aristocracy',
    syllables: 'no-bil-i-ar-y',
    difficulty: 'Hard',
    phoneticHint: '/noʊˈbɪliˌɛri/',
    languageOrigin: 'French / Latin',
    isFromOfficialList: true
  },
  {
    id: 'sw-30',
    word: 'commerce',
    topic: 'Meeting 3 Mock Bee',
    sentence: 'International maritime commerce flourished in the bustling coastal seaport.',
    definition: 'the activity of buying and selling, especially on a large scale',
    syllables: 'com-merce',
    difficulty: 'Medium',
    phoneticHint: '/ˈkɒmɜːrs/',
    languageOrigin: 'Latin via French',
    isFromOfficialList: true
  }
];

export const INITIAL_FINALISTS: Finalist[] = [
  {
    id: 'f-1',
    name: 'Aiden Chen',
    classroom: 'Room 402 · Grade 5',
    score: 35,
    strikes: 0,
    isEliminated: false,
    stageRank: 1,
    wordsHistory: [
      { word: 'gimmick', isCorrect: true },
      { word: 'flannel', isCorrect: true },
      { word: 'lionize', isCorrect: true }
    ]
  },
  {
    id: 'f-2',
    name: 'Maya Patel',
    classroom: 'Room 305 · Grade 4',
    score: 30,
    strikes: 1,
    isEliminated: false,
    stageRank: 2,
    wordsHistory: [
      { word: 'cucumber', isCorrect: true },
      { word: 'badger', isCorrect: false },
      { word: 'spreadsheet', isCorrect: true }
    ]
  },
  {
    id: 'f-3',
    name: 'Lucas Thorne',
    classroom: 'Room 408 · Grade 5',
    score: 25,
    strikes: 1,
    isEliminated: false,
    stageRank: 3,
    wordsHistory: [
      { word: 'nephew', isCorrect: true },
      { word: 'imbibe', isCorrect: true },
      { word: 'savvy', isCorrect: false }
    ]
  },
  {
    id: 'f-4',
    name: 'Zara Al-Mansoor',
    classroom: 'Room 501 · Grade 6',
    score: 20,
    strikes: 2,
    isEliminated: false,
    stageRank: 4,
    wordsHistory: [
      { word: 'forensics', isCorrect: true },
      { word: 'banal', isCorrect: false },
      { word: 'seismologist', isCorrect: false }
    ]
  },
  {
    id: 'f-5',
    name: 'Ethan Brooks',
    classroom: 'Room 312 · Grade 4',
    score: 15,
    strikes: 2,
    isEliminated: false,
    stageRank: 5,
    wordsHistory: [
      { word: 'spectacles', isCorrect: true },
      { word: 'innovator', isCorrect: false },
      { word: 'bursary', isCorrect: false }
    ]
  },
  {
    id: 'f-6',
    name: 'Chloe Kim',
    classroom: 'Room 504 · Grade 6',
    score: 40,
    strikes: 0,
    isEliminated: false,
    stageRank: 1,
    wordsHistory: [
      { word: 'exoneration', isCorrect: true },
      { word: 'duvet', isCorrect: true },
      { word: 'turpitude', isCorrect: true }
    ]
  }
];

export const INITIAL_AUDITION_CANDIDATES: AuditionCandidate[] = [
  {
    id: 'ac-1',
    name: 'Oliver Vance',
    classroom: 'Room 401 · Grade 4',
    score: 9,
    totalTested: 10,
    status: 'qualified',
    notes: 'Outstanding on Latin roots and prefix affixes.',
    wordsHistory: [{ word: 'triumphant', isCorrect: true, timestamp: Date.now() }]
  },
  {
    id: 'ac-2',
    name: 'Sophia Rodriguez',
    classroom: 'Room 403 · Grade 5',
    score: 10,
    totalTested: 10,
    status: 'qualified',
    notes: 'Flawless performance in partner dictation round.',
    wordsHistory: [{ word: 'seismologist', isCorrect: true, timestamp: Date.now() }]
  },
  {
    id: 'ac-3',
    name: 'Liam Jackson',
    classroom: 'Room 302 · Grade 3',
    score: 8,
    totalTested: 10,
    status: 'qualified',
    notes: 'Strong spelling cadence and asks good questions.',
    wordsHistory: [{ word: 'spectacles', isCorrect: true, timestamp: Date.now() }]
  },
  {
    id: 'ac-4',
    name: 'Emma Watson',
    classroom: 'Room 502 · Grade 6',
    score: 7,
    totalTested: 10,
    status: 'pending',
    notes: 'Needs practice with French loanword silent letters.',
    wordsHistory: [{ word: 'duvet', isCorrect: false, timestamp: Date.now() }]
  },
  {
    id: 'ac-5',
    name: 'Noah Patel',
    classroom: 'Room 405 · Grade 5',
    score: 8,
    totalTested: 10,
    status: 'qualified',
    notes: 'Confident stage presence and clear microphone voice.',
    wordsHistory: [{ word: 'innovator', isCorrect: true, timestamp: Date.now() }]
  },
  {
    id: 'ac-6',
    name: 'Ava Nguyen',
    classroom: 'Room 309 · Grade 4',
    score: 6,
    totalTested: 10,
    status: 'pending',
    notes: 'Good phonetic grasp, review double consonant rules.',
    wordsHistory: [{ word: 'flannel', isCorrect: false, timestamp: Date.now() }]
  }
];

export const PURPOSE_MATCH_PAIRS: MatchPair[] = [
  {
    id: 'mp-1',
    pattern: "Prefix 'dis-' (Not / Away)",
    word: 'disembark',
    sentence: "The passengers prepared to ___ from the cruise ship at port.",
    explanation: "Prefix 'dis-' denotes opposite or removal; disembark = leave ship."
  },
  {
    id: 'mp-2',
    pattern: "Greek Root 'tele-' (Far / Distant)",
    word: 'telepathic',
    sentence: "They seemed to share a ___ connection without saying a word.",
    explanation: "'tele-' means distance; telepathic = feeling thoughts from far away."
  },
  {
    id: 'mp-3',
    pattern: "Suffix '-ous' (Full of / Characterized by)",
    word: 'harmonious',
    sentence: "The choir sang in rich, ___ blend throughout the cathedral.",
    explanation: "Suffix '-ous' creates adjectives meaning 'full of harmony'."
  },
  {
    id: 'mp-4',
    pattern: "Greek Root 'phil-' (Love / Devotion)",
    word: 'philharmonic',
    sentence: "The world-renowned ___ orchestra performed Beethoven's Ninth.",
    explanation: "'phil-' means love; philharmonic = lover of harmony/music."
  },
  {
    id: 'mp-5',
    pattern: "Greek Root '-phobia' (Fear)",
    word: 'brontophobia',
    sentence: "She covered her ears during lightning due to her ___.",
    explanation: "'-phobia' signifies extreme fear; brontophobia = fear of thunder."
  }
];

