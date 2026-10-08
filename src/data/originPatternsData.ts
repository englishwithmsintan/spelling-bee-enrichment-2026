// Authoritative Linguistic Rules & Origin Distinguishing Patterns
// for Scripps National Spelling Bee Enrichment (Grade 3-6 & Champions)

export interface LanguageOriginGuide {
  id: string;
  name: string;
  badge: string;
  flag: string;
  historicalContext: string;
  whyEnglishBorrowed: string;
  coreSpellingRules: {
    rule: string;
    explanation: string;
    exampleWords: string[];
    spellingTrap: string;
  }[];
  giveawayOrthography: string[];
  homophoneConnections: {
    targetSound: string;
    targetWord: string;
    confusedWith: string;
    originClue: string;
    distinguishingRule: string;
  }[];
  championshipWordBank: {
    word: string;
    pronunciation: string;
    definition: string;
    keyPattern: string;
    etymology: string;
    sentence: string;
  }[];
}

export const LANGUAGE_ORIGIN_GUIDES: LanguageOriginGuide[] = [
  // =========================================================================
  // 1. LATIN (The Foundation of Academic, Legal & Scientific English)
  // =========================================================================
  {
    id: 'latin',
    name: 'Latin',
    badge: '🏛️ Roman Empire & Academia',
    flag: '🏛️',
    historicalContext: 'Over 60% of all English vocabulary (and over 90% of multi-syllabic academic vocabulary) is derived directly from Latin or through Norman French.',
    whyEnglishBorrowed: 'Latin was the lingua franca of scholarship, science, law, the Roman Catholic Church, and medicine across medieval and Renaissance Europe.',
    giveawayOrthography: [
      'Prefixes: sub-, trans-, inter-, intra-, circum-, contra-, super-, post-, pre-, bene-, mal-, omni-',
      'Assimilated prefixes: ad- changes to ac- (accumulate), ap- (apparent), at- (attend), af- (affix)',
      'Roots: aud (hear), scrib/script (write), dict (say), port (carry), vid/vis (see), voc (voice), mit/miss (send)',
      'Endings: -tion / -sion, -able / -ible, -ant / -ent, -ance / -ence, -ous, -or (not -er for people)',
      'Noun endings: -um (colosseum, curriculum, memorandum) and -us (apparatus, status, consensus)'
    ],
    coreSpellingRules: [
      {
        rule: 'Assimilated Prefixes (Chameleon Prefixes)',
        explanation: 'When the Latin prefix ad- (to/toward) or con- (with) precedes certain consonants, the prefix consonant changes to match the root, creating a double consonant.',
        exampleWords: ['accumulate (ad + cumulus)', 'apparent (ad + parere)', 'collaborate (con + labor)', 'correlate (con + relatus)'],
        spellingTrap: 'Spellers often forget to double the consonant: spell "ac-cumulate" with double c, "ap-parent" with double p.'
      },
      {
        rule: 'Suffixes -ible vs -able',
        explanation: '-ible is used when the base cannot stand alone as an English word (audible, visible, incredible) or comes from Latin second/third conjugation. -able is used for words with an existing English root (readable, teachable).',
        exampleWords: ['audible', 'visible', 'credible', 'perceptible', 'compatible'],
        spellingTrap: 'Writing -able instead of -ible: audible is spelled a-u-d-i-b-l-e, never audable.'
      },
      {
        rule: 'Latin Noun Endings in -um and -us',
        explanation: 'Ancient Roman neuter nouns retain -um (colosseum, aquarium, podium, curriculum), and masculine nouns retain -us (gladiator, status, consensus).',
        exampleWords: ['colosseum', 'curriculum', 'aqueduct', 'millennium', 'memorandum'],
        spellingTrap: 'Do not end with -am or -om. Millennium has double l and double n (m-i-l-l-e-n-n-i-u-m).'
      },
      {
        rule: 'Agent Noun Suffix -or (Not -er)',
        explanation: 'In Latin, persons who perform an action end in -or: gladiator, spectator, auditor, conductor, dictator.',
        exampleWords: ['gladiator', 'spectator', 'auditor', 'benefactor', 'curator'],
        spellingTrap: 'Gladiator ends in -or, not -er! Remember: Latin agents love -or.'
      }
    ],
    homophoneConnections: [
      {
        targetSound: '/ˈprɪn.sə.pəl/',
        targetWord: 'principal',
        confusedWith: 'principle',
        originClue: 'Latin principalis (chief, first in rank)',
        distinguishingRule: 'The Latin root for chief/leader ends in -pal: "the principal is your PAL". Principle (Latin principium) is a moral rule.'
      },
      {
        targetSound: '/ˈkɑːm.plə.mənt/',
        targetWord: 'complement',
        confusedWith: 'compliment',
        originClue: 'Latin complementum (that which fills up, completes)',
        distinguishingRule: 'Latin root complere (to fill/complete) gives complEment with an "E". Compliment with "I" is French/Italian praise.'
      },
      {
        targetSound: '/ˈsteɪ.ʃən.er.i/',
        targetWord: 'stationary',
        confusedWith: 'stationery',
        originClue: 'Latin stationarius (standing still, at rest)',
        distinguishingRule: 'Latin adjective meaning motionless ends in -ary: stationAry with "A" is "At rest". StationEry with "E" is for Envelopes.'
      },
      {
        targetSound: '/ˈpɛd.əl/',
        targetWord: 'pedal',
        confusedWith: 'peddle / petal',
        originClue: 'Latin ped- / pes (foot)',
        distinguishingRule: 'Latin root for foot gives pedAL (-al lever operated by foot). Peddle is Middle English selling; petal is Greek flower leaf.'
      }
    ],
    championshipWordBank: [
      {
        word: 'curriculum',
        pronunciation: '/kəˈrɪk.jə.ləm/ (kuh-RIK-yuh-luhm)',
        definition: 'The subjects comprising a course of study in a school or college.',
        keyPattern: 'Double r ("rr") from Latin currere (to run), ending in neuter -um.',
        etymology: 'Latin curriculum (a running, racecourse), from currere (to run).',
        sentence: 'The spelling academy revamped its summer curriculum to include advanced Latin root studies.'
      },
      {
        word: 'aqueduct',
        pronunciation: '/ˈæk.wə.dʌkt/ (AK-wuh-dukt)',
        definition: 'An artificial channel or elevated bridge for conveying water, typically in the form of a stone bridge.',
        keyPattern: 'Starts with "aque-" (from aqua, water) + "duct" (from ducere, to lead). Single c, single k.',
        etymology: 'Latin aquae ductus (conveyance of water), from aqua (water) + ducere (to lead).',
        sentence: 'Ancient Roman engineers built the towering Segovia aqueduct to carry mountain spring water into the city.'
      },
      {
        word: 'millennium',
        pronunciation: '/mɪˈlɛn.i.əm/ (mi-LEN-ee-uhm)',
        definition: 'A period of one thousand years, or a celebration of a thousand-year anniversary.',
        keyPattern: 'Double l ("ll") AND double n ("nn")! Latin mille (thousand) + annus (year).',
        etymology: 'Latin millennium, from mille (thousand) + annus (year).',
        sentence: 'The dawn of the new millennium was celebrated across the globe at midnight.'
      },
      {
        word: 'memorandum',
        pronunciation: '/ˌmɛm.əˈræn.dəm/ (mem-uh-RAN-duhm)',
        definition: 'A written message, note, or record especially in diplomacy or corporate business.',
        keyPattern: 'Neuter gerundive ending in "-andum" from memorare (to remind).',
        etymology: 'Latin memorandum (something to be brought to mind), from memor (mindful).',
        sentence: 'The head of the spelling federation circulated an official memorandum regarding new podium guidelines.'
      },
      {
        word: 'benevolent',
        pronunciation: '/bəˈnɛv.ə.lənt/ (buh-NEV-uh-luhnt)',
        definition: 'Well-meaning, kindly, and charitable.',
        keyPattern: 'Prefix "bene-" (well/good) + "volens" (wishing). Single consonants throughout.',
        etymology: 'Latin benevolens, from bene (well) + velle (to wish).',
        sentence: 'The benevolent benefactor endowed college scholarships for every spelling bee champion.'
      },
      {
        word: 'omnipotent',
        pronunciation: '/ɑːmˈnɪp.ə.tənt/ (ahm-NIP-uh-tuhnt)',
        definition: 'Having unlimited power; able to do anything.',
        keyPattern: 'Prefix "omni-" (all) + "potens" (powerful). Single p, single t.',
        etymology: 'Latin omnipotens, from omnis (all) + potens (powerful).',
        sentence: 'In ancient mythology, Jupiter was revered as an omnipotent ruler of the skies and storms.'
      },
      {
        word: 'equilibrium',
        pronunciation: '/ˌiː.kwəˈlɪb.ri.əm/ (ee-kwuh-LIB-ree-uhm)',
        definition: 'A state in which opposing forces or influences are balanced.',
        keyPattern: 'Roots "aequi-" (equal) + "libra" (balance/scales) + "-um". Single l, single b.',
        etymology: 'Latin aequilibrium, from aequus (equal) + libra (balance scale).',
        sentence: 'The gymnast maintained flawless physical equilibrium while balancing on one toe.'
      },
      {
        word: 'terrestrial',
        pronunciation: '/təˈrɛs.tri.əl/ (tuh-RES-tree-uhl)',
        definition: 'Relating to the earth or to land as opposed to the sea or sky.',
        keyPattern: 'Double r ("rr") from Latin terra (earth) followed by single s ("-estrial").',
        etymology: 'Latin terrestris, from terra (earth).',
        sentence: 'Biologists studied both aquatic and terrestrial species thriving along the shoreline.'
      }
    ]
  },

  // =========================================================================
  // 2. GREEK (Science, Philosophy, Astronomy, Mathematics)
  // =========================================================================
  {
    id: 'greek',
    name: 'Greek',
    badge: '🏺 Science, Medicine & Philosophy',
    flag: '🏺',
    historicalContext: 'Greek words entered English directly during the Renaissance and Enlightenment as scientists, doctors, and philosophers required precise, descriptive technical terms.',
    whyEnglishBorrowed: 'Ancient Greece was the cradle of mathematics, astronomy, logic, biology, and medicine. English created thousands of scientific neologisms from Greek roots.',
    giveawayOrthography: [
      'Digraph "ph" for the /f/ sound: philosophy, amphibian, philanthropy, photography, sphere',
      'Digraph "ch" pronounced /k/: chorus, archaic, chaos, echo, character, stomach, architect',
      'Vowel "y" in medial positions representing /ɪ/ or /aɪ/: rhythm, crystal, system, synonym, hymn',
      'Initial silent consonants: ps- (psychology), pn- (pneumonia), pt- (pterodactyl)',
      'Digraphs "rh" or "rrh": rhythm, rhombus, hemorrhage, catarrh, rhubarb',
      'Combining forms: tele-, micro-, macro-, auto-, bio-, geo-, chron-, path-, phil-, -phobia, -ology, -meter, -scope'
    ],
    coreSpellingRules: [
      {
        rule: 'Greek "ph" for /f/',
        explanation: 'Whenever a scientific or philosophical word contains an /f/ sound, it is almost certainly spelled with "ph" (transliterating the Greek letter phi: Φ).',
        exampleWords: ['amphibian', 'philosophy', 'metamorphosis', 'kaleidoscope', 'philharmonic'],
        spellingTrap: 'Never use "f" for words of Greek scientific origin! Amphibian is a-m-p-h-i-b-i-a-n.'
      },
      {
        rule: 'Greek "ch" for /k/',
        explanation: 'The Greek letter chi (Χ) became "ch" in the Roman alphabet and is pronounced as a hard /k/ in English.',
        exampleWords: ['chaos', 'echo', 'chorus', 'archaic', 'character', 'chronology'],
        spellingTrap: 'Do not spell with "k" or "c" alone: chorus is c-h-o-r-u-s; chaos is c-h-a-o-s.'
      },
      {
        rule: 'Internal "y" as Vowel',
        explanation: 'The Greek letter upsilon (Υ) was transcribed as "y" in Latin, which in English creates the short /ɪ/ or long /aɪ/ vowel sound.',
        exampleWords: ['rhythm', 'crystal', 'system', 'mystery', 'syllable', 'hypothermia'],
        spellingTrap: 'Rhythm has NO traditional vowels except "y": r-h-y-t-h-m.'
      },
      {
        rule: 'Greek Roots Phil- ("Love") & -Phobia ("Fear")',
        explanation: 'phil- signifies devotion or love (philharmonic, philosophy); -phobia signifies irrational dread (brontophobia, arachnophobia). Both use "ph"!',
        exampleWords: ['philharmonic', 'philosophy', 'brontophobia', 'arachnophobia', 'claustrophobia'],
        spellingTrap: 'Both roots contain "ph", never "f".'
      }
    ],
    homophoneConnections: [
      {
        targetSound: '/ɡəˈrɪl.ə/',
        targetWord: 'gorilla',
        confusedWith: 'guerrilla',
        originClue: 'Greek Gorillai (tribe of hairy women described by Hanno the Navigator)',
        distinguishingRule: 'The great ape comes from Greek: single "r", double "l" (g-o-r-i-l-l-a). Irregular warfare is Spanish (guerrilla, double r).'
      },
      {
        targetSound: '/ˈpɛd.əl/',
        targetWord: 'petal',
        confusedWith: 'pedal / peddle',
        originClue: 'Greek petalon (leaf, thin plate, outspread)',
        distinguishingRule: 'Flower leaf is Greek: p-e-t-a-l (single t). Foot lever is Latin (pedal, with d). Peddling goods is Middle English (peddle).'
      }
    ],
    championshipWordBank: [
      {
        word: 'amphibian',
        pronunciation: '/æmˈfɪb.i.ən/ (am-FIB-ee-uhn)',
        definition: 'A cold-blooded vertebrate animal of a class comprising frogs and salamanders, distinguished by an aquatic gill-breathing larval stage.',
        keyPattern: 'Greek "amphi-" (both/double) uses "ph" for /f/ + "-bian" (from bios, life).',
        etymology: 'Greek amphibios (living a double life), from amphi- (both sides) + bios (life).',
        sentence: 'A bullfrog is an amphibian that breathes underwater through gills before developing lungs.'
      },
      {
        word: 'metamorphosis',
        pronunciation: '/ˌmɛt.əˈmɔːr.fə.sɪs/ (met-uh-MOR-fuh-sis)',
        definition: 'A change of the form or nature of a thing or person into a completely different one.',
        keyPattern: 'Greek "meta-" (change) + "morph" (form with "ph") + "-osis" (process).',
        etymology: 'Greek metamorphōsis, from meta- (change) + morphē (form).',
        sentence: 'The monarch caterpillar enclosed itself in a chrysalis to undergo biological metamorphosis.'
      },
      {
        word: 'kaleidoscope',
        pronunciation: '/kəˈlaɪ.də.skoʊp/ (kuh-LYE-duh-skohp)',
        definition: 'A tube containing mirrors and loose colored beads producing symmetric reflections when rotated.',
        keyPattern: 'Greek kalos (beautiful) + eidos (form with "ei") + "-scope" (viewer).',
        etymology: 'Coined from Greek kalos (beautiful) + eidos (form) + skopein (to look at).',
        sentence: 'The child was mesmerized by the brilliant colors shifting inside the brass kaleidoscope.'
      },
      {
        word: 'brontophobia',
        pronunciation: '/ˌbrɒn.təˈfoʊ.bi.ə/ (bron-tuh-FOH-bee-uh)',
        definition: 'An abnormal, irrational fear of thunder and lightning storms.',
        keyPattern: 'Greek "bronto-" (thunder) + "-phobia" (fear with "ph").',
        etymology: 'Greek brontē (thunder) + phobos (fear).',
        sentence: 'During summer thunderstorms, the trembling golden retriever displayed unmistakable brontophobia.'
      }
    ]
  },

  // =========================================================================
  // 3. FRENCH (Culinary, Military, Fashion, High Culture & Silent Endings)
  // =========================================================================
  {
    id: 'french',
    name: 'French',
    badge: '🥐 Cuisine, Fashion & Silent Endings',
    flag: '🥐',
    historicalContext: 'Following the 1066 Norman Conquest, French was the language of the English Royal Court, nobility, and law for 300 years.',
    whyEnglishBorrowed: 'Modern English continued borrowing terms of gastronomy, diplomacy, military strategy, haute couture, and fine arts directly from Paris.',
    giveawayOrthography: [
      'Silent final consonants: silent -t (duvet, bouquet, crochet, ballet, gourmet, depot)',
      'Silent final -s (debris, bourgeois, rendezvous, chassis), silent -x (faux, roux, châteaux)',
      'Trigraph "-eau" pronounced as long /oʊ/: plateau, bureau, chateau, nouveau',
      'Suffix "-ette" (diminutive feminine): silhouette, etiquette, vinaigrette, bachelorette',
      'Suffix "-eur" (agent/person): chauffeur, connoisseur, amateur, voyeur',
      'Suffix "-age" pronounced as soft /ɑːʒ/: camouflage, fuselage, sabotage, entourage, collage',
      'Digraph "ch" pronounced /ʃ/ (sh sound): chauffeur, chiffon, crochet, chivalry, machine',
      'Digraph "oi" pronounced /wɑː/: croissant, reservoir, bourgeois, memoir, repertoire',
      'Acute accents preserved: soirée, protégé, café, résumé, cliché'
    ],
    coreSpellingRules: [
      {
        rule: 'Silent Consonants at Word Ends',
        explanation: 'In French phonology, final consonants (s, t, x, d, p) were gradually lost in spoken French but preserved in orthography.',
        exampleWords: ['duvet', 'faux', 'debris', 'bouquet', 'rendezvous', 'croissant'],
        spellingTrap: 'Never drop the silent letter: duvet ends with silent "t"; debris ends with silent "s"; faux ends with silent "x".'
      },
      {
        rule: 'French Trigraph -eau = /oʊ/',
        explanation: 'The three letters e-a-u combine to produce the simple long "oh" sound in words borrowed from French.',
        exampleWords: ['plateau', 'bureau', 'chateau', 'tableau', 'flambeau'],
        spellingTrap: 'Do not write "ow" or "oh": plateau is p-l-a-t-e-a-u.'
      },
      {
        rule: 'French "ch" = /ʃ/ (Not /tʃ/)',
        explanation: 'Unlike native English "ch" in "chip", French "ch" produces the soft "sh" sound as in "shoe".',
        exampleWords: ['chauffeur', 'chiffon', 'crochet', 'chivalry', 'chalet'],
        spellingTrap: 'Hearing "shoh-FUR"? The word starts with "ch-", not "sh-": chauffeur.'
      },
      {
        rule: 'French Suffixes -ette and -eur',
        explanation: 'Diminutives end in double-t "-ette" (silhouette, vinaigrette); performers end in "-eur" (chauffeur, connoisseur).',
        exampleWords: ['silhouette', 'etiquette', 'chauffeur', 'connoisseur'],
        spellingTrap: 'Connoisseur has double n, "oi", double s, and ends in "-eur".'
      }
    ],
    homophoneConnections: [
      {
        targetSound: '/flɛər/',
        targetWord: 'flair',
        confusedWith: 'flare',
        originClue: 'Old French flair (sense of smell, keen instinctive discernment, elegance)',
        distinguishingRule: 'Natural talent or stylish elegance is French: f-l-a-i-r. A bursting flame or signal torch is Old Norse/English: f-l-a-r-e.'
      },
      {
        targetSound: '/bəˈzɑːr/',
        targetWord: 'bizarre',
        confusedWith: 'bazaar',
        originClue: 'French bizarre (strange, eccentric, fantastic)',
        distinguishingRule: 'Odd or grotesque is French: b-i-z-a-r-r-e (double r). Open-air marketplace is Persian: b-a-z-a-a-r (double a).'
      }
    ],
    championshipWordBank: [
      {
        word: 'silhouette',
        pronunciation: '/ˌsɪl.uˈɛt/ (sil-oo-ET)',
        definition: 'The dark shape and outline of someone or something visible against a lighter background.',
        keyPattern: 'Starts with "silh-" (silent h), ends with double-t "-ette".',
        etymology: 'Named after Étienne de Silhouette (1709–1767), French finance controller famous for extreme frugality.',
        sentence: 'The silhouette of the mountain pines was cast sharply against the twilight sky.'
      },
      {
        word: 'chauffeur',
        pronunciation: '/ʃoʊˈfɜːr/ (shoh-FUR)',
        definition: 'A person employed to drive a private luxury automobile.',
        keyPattern: '"ch" pronounced /ʃ/, double f ("ff"), ending in French agent suffix "-eur".',
        etymology: 'French chauffeur (literally "stoker" of steam engines), from chauffer (to warm).',
        sentence: 'The visiting head of state was escorted to the motorcade by a professional chauffeur.'
      },
      {
        word: 'connoisseur',
        pronunciation: '/ˌkɒn.əˈsɜːr/ (kon-uh-SUR)',
        definition: 'An expert judge in matters of taste, the fine arts, or cuisine.',
        keyPattern: 'Double n ("nn"), "oi" diphthong, double s ("ss"), ending in "-eur".',
        etymology: 'Old French connoisseur, from connoître (to know).',
        sentence: 'The classical art connoisseur identified the brushwork as an authentic Italian Renaissance fresco.'
      },
      {
        word: 'rendezvous',
        pronunciation: '/ˈrɒn.deɪ.vuː/ (RAHN-day-voo)',
        definition: 'A meeting at an agreed time and place, typically between two or more parties.',
        keyPattern: 'Silent "z" at end of rendezvous and silent "s" at end of vous! Both syllables end in silent letters.',
        etymology: 'French rendez-vous (imperative: "present yourselves!").',
        sentence: 'The astronauts docked their capsule at the orbital space station rendezvous coordinates.'
      }
    ]
  },

  // =========================================================================
  // 4. GERMAN (Consonant Clusters, Compounds, Dog Breeds, Geography & Food)
  // =========================================================================
  {
    id: 'german',
    name: 'German',
    badge: '🥨 Compounds & Heavy Consonants',
    flag: '🥨',
    historicalContext: 'German belongs to the West Germanic family, sharing common prehistoric ancestors with Old English.',
    whyEnglishBorrowed: 'English borrowed specialized terms of psychology, geology, philosophy, winter sports, culinary specialties, and dog breeds from German.',
    giveawayOrthography: [
      'Heavy consonant clusters: "sch" (schnauzer, schadenfreude, kitsch), "tz" (pretzel, blitz, glitz), "kn" (knapsack)',
      'Compound words formed by fusing two full nouns together: kindergarten, wanderlust, doppelganger, zeitgeist, poltergeist',
      'Vowel digraph "ei" pronounced /aɪ/ (long i): edelweiss, zeitgeist, poltergeist, stein',
      'Letter "w" pronounced as English /v/: edelweiss, wanderlust, bratwurst',
      'German geographic elements: -berg (mountain), -burg (fortified town), -stein (stone), -wald (forest)',
      'Specific cultural items: pretzel, strudel, sauerkraut, dachshund, rottweiler, gesundheit, angst'
    ],
    coreSpellingRules: [
      {
        rule: 'Compound Word Fusion',
        explanation: 'German creates words by sticking two roots directly together with no space or hyphen.',
        exampleWords: ['kindergarten (kinder + garten)', 'wanderlust (wander + lust)', 'doppelganger (doppel + ganger)'],
        spellingTrap: 'Kindergarten ends in "-garten" with a "t", NOT "-garden" with a "d"!'
      },
      {
        rule: 'German "sch" and "tz"',
        explanation: 'Where English writes "sh", German uses three letters: "sch". Where English writes "ts", German uses "tz".',
        exampleWords: ['schnauzer', 'schadenfreude', 'pretzel', 'blitz', 'kitsch'],
        spellingTrap: 'Pretzel contains "tz" (p-r-e-t-z-e-l); schnauzer begins with "s-c-h-n-".'
      },
      {
        rule: '"ei" vs "ie" in German',
        explanation: 'In German words, "ei" produces the /aɪ/ sound (like eye: edelweiss, zeitgeist), while "ie" produces /iː/ (like see: diesel). Rule: the second vowel is the one you say!',
        exampleWords: ['edelweiss', 'zeitgeist', 'poltergeist', 'diesel'],
        spellingTrap: 'Edelweiss has "ei" in the second syllable: e-d-e-l-w-e-i-s-s with double s.'
      }
    ],
    homophoneConnections: [],
    championshipWordBank: [
      {
        word: 'kindergarten',
        pronunciation: '/ˈkɪn.dərˌɡɑːr.tən/ (KIN-der-gar-tuhn)',
        definition: 'An establishment where children below the age of compulsory education play and learn.',
        keyPattern: 'Ends in "-garten" with a "t" (German for garden), NEVER with a "d".',
        etymology: 'German kindergarten, from kinder (children) + garten (garden). Coined by Friedrich Fröbel in 1840.',
        sentence: 'The young speller learned to read phonics books in kindergarten.'
      },
      {
        word: 'dachshund',
        pronunciation: '/ˈdɑːks.hʊnd/ (DAHKS-hoond)',
        definition: 'A dog of a short-legged, long-bodied breed, originally bred in Germany to hunt badgers.',
        keyPattern: 'Starts with "dach-" (badger) + "s" + "hund" (hound). Silent or softened "ch".',
        etymology: 'German Dachshund, from dachs (badger) + hund (dog/hound).',
        sentence: 'The playful dachshund scampered across the lawn chasing after a tennis ball.'
      },
      {
        word: 'edelweiss',
        pronunciation: '/ˈeɪ.dəl.vaɪs/ (AY-duhl-vys)',
        definition: 'A European mountain plant of the daisy family, with small white flowers surrounded by velvety woolly leaves.',
        keyPattern: 'German "w" sounds like /v/, "ei" sounds like /aɪ/, ends in double s ("ss").',
        etymology: 'German edelweiss, from edel (noble) + weiss (white).',
        sentence: 'Alpine climbers spotted a patch of rare edelweiss blooming on the rocky cliff ledge.'
      },
      {
        word: 'schadenfreude',
        pronunciation: '/ˈʃɑː.dənˌfrɔɪ.də/ (SHAH-duhn-froy-duh)',
        definition: 'Pleasure derived by someone from another person\'s misfortune.',
        keyPattern: 'Starts with "sch-", middle "freude" has "eu" diphthong pronounced /ɔɪ/ (oy).',
        etymology: 'German Schadenfreude, from schaden (harm/damage) + freude (joy).',
        sentence: 'The coach urged the team to display good sportsmanship rather than petty schadenfreude.'
      }
    ]
  },

  // =========================================================================
  // 5. ITALIAN (Music, Culinary, Art, Architecture & All Ending in Vowels)
  // =========================================================================
  {
    id: 'italian',
    name: 'Italian',
    badge: '🎻 Music, Art & Vowel Endings',
    flag: '🎻',
    historicalContext: 'Italian flourished during the Renaissance (14th–17th centuries) when Italy led European music, painting, sculpture, and banking.',
    whyEnglishBorrowed: 'Nearly all international classical music notations and hundreds of beloved culinary terms come directly from Italian.',
    giveawayOrthography: [
      'Almost every single native Italian word ends in a vowel: -o, -a, -i, -e (virtuoso, soprano, piazza, lasagna, zucchini)',
      'Double consonants for sharp emphasis: "zz" (piazza, mezzanine, mozzarella), "cc" (cappuccino, staccato, zucchini)',
      'Letter combination "cch" pronounced /k/: zucchini, macchiato',
      'Musical terms: allegro, adagio, crescendo, virtuoso, soprano, tempo, cello, solo, duet, falsetto, aria',
      'Art and architecture: fresco, graffiti, colonnade, cupola, mezzanine, villa',
      'Culinary: lasagna, spaghetti, zucchini, cappuccino, espresso, broccoli, ravioli'
    ],
    coreSpellingRules: [
      {
        rule: 'Italian Final Vowel Rule',
        explanation: 'Italian grammar requires words to end in a vowel: -o (singular masculine), -a (singular feminine), -i (plural masculine).',
        exampleWords: ['virtuoso', 'fiasco', 'soprano', 'mezzanine (via French with silent e)', 'piazza', 'graffiti'],
        spellingTrap: 'Words rarely end in consonants in Italian: virtuoso ends in -o; piazza ends in -a; graffiti ends in -i.'
      },
      {
        rule: 'Italian Double Consonants',
        explanation: 'Italian has phonemic double consonants (geminates) that are held longer in speech.',
        exampleWords: ['piazza', 'mezzanine', 'cappuccino', 'zucchini', 'staccato', 'spaghetti'],
        spellingTrap: 'Cappuccino has double p ("pp") AND double c ("cc"): c-a-p-p-u-c-c-i-n-o.'
      },
      {
        rule: 'Italian "cch" for /k/',
        explanation: 'In Italian, "c" before "e" or "i" becomes soft /tʃ/ (like church). To keep a hard /k/ sound before "i", Italian inserts "h", giving "cch".',
        exampleWords: ['zucchini', 'macchiato', 'pinocchio'],
        spellingTrap: 'Zucchini is spelled with "cch" for the /k/ sound: z-u-c-c-h-i-n-i.'
      }
    ],
    homophoneConnections: [],
    championshipWordBank: [
      {
        word: 'virtuoso',
        pronunciation: '/ˌvɜːr.tʃuˈoʊ.zoʊ/ (vur-choo-OH-zoh)',
        definition: 'A person highly skilled in music or another artistic pursuit.',
        keyPattern: 'Spelled "vir-tu-o-so" with single consonants, ending in Italian "-o".',
        etymology: 'Italian virtuoso (virtuous, learned, skillful), from Latin virtus (excellence, courage).',
        sentence: 'The twelve-year-old cello virtuoso received a standing ovation at Carnegie Hall.'
      },
      {
        word: 'mezzanine',
        pronunciation: '/ˈmɛz.ə.niːn/ (MEZ-uh-neen)',
        definition: 'A low story between two others in a building, typically between the ground and first floors.',
        keyPattern: 'Double z ("zz"), single n, ending in silent e.',
        etymology: 'Italian mezzanino, diminutive of mezzano (middle), from Latin medianus.',
        sentence: 'Our balcony seats in the opera house mezzanine afforded an unobstructed view of the orchestra.'
      },
      {
        word: 'zucchini',
        pronunciation: '/zuːˈkiː.ni/ (zoo-KEE-nee)',
        definition: 'A variety of summer squash of a long, dark green shape.',
        keyPattern: 'Starts with "z", features "cch" for the hard /k/ sound, and ends in "i".',
        etymology: 'Italian zucchini, plural diminutive of zucca (gourd).',
        sentence: 'The chef tossed fresh green zucchini and cherry tomatoes with olive oil and garlic.'
      },
      {
        word: 'cappuccino',
        pronunciation: '/ˌkæp.əˈtʃiː.noʊ/ (kap-uh-CHEE-noh)',
        definition: 'An Italian coffee drink made with espresso and hot steamed milk foam.',
        keyPattern: 'Double p ("pp") AND double c ("cc"): c-a-p-p-u-c-c-i-n-o.',
        etymology: 'Italian cappuccino, named for the hooded brown habit worn by Capuchin friars.',
        sentence: 'The barista dusted a pinch of ground cinnamon over the frothed cappuccino foam.'
      }
    ]
  },

  // =========================================================================
  // 6. SPANISH (New World Landscapes, Fauna, Suffixes -illo/-illa, Food)
  // =========================================================================
  {
    id: 'spanish',
    name: 'Spanish',
    badge: '🌮 New World & Diminutives',
    flag: '🌮',
    historicalContext: 'Spanish words entered English through centuries of interaction across the American Southwest, the Caribbean, and Central America.',
    whyEnglishBorrowed: 'Describing new landscapes, native wildlife, local customs, and agricultural terms.',
    giveawayOrthography: [
      'Diminutive suffixes: -illo / -illa (guerrilla, tortilla, armadillo, quesadilla, vanilla)',
      'Words ending in -o and -a: canyon, patio, fiesta, sombrero, rodeo, alligator, avocado, embargo',
      'Letter combination "gu" before "e" to preserve hard /g/: guerrilla',
      'Words from Latin America: aficionado, vigilante, embargo, canyon, tornado'
    ],
    coreSpellingRules: [
      {
        rule: 'Diminutives -illo and -illa',
        explanation: 'In Spanish, -illo/-illa makes a noun smaller or endearing (guerra = war -> guerrilla = little war).',
        exampleWords: ['guerrilla', 'tortilla', 'armadillo', 'quesadilla', 'vanilla'],
        spellingTrap: 'Guerrilla has "gue-", double r ("rr"), and double l ("ll")!'
      }
    ],
    homophoneConnections: [
      {
        targetSound: '/ɡəˈrɪl.ə/',
        targetWord: 'guerrilla',
        confusedWith: 'gorilla',
        originClue: 'Spanish diminutive of guerra (war)',
        distinguishingRule: 'Irregular warfare fighter is Spanish: g-u-e-r-r-i-l-l-a (starts with gue, double r, double l). The ape is Greek gorilla.'
      }
    ],
    championshipWordBank: [
      {
        word: 'guerrilla',
        pronunciation: '/ɡəˈrɪl.ə/ (guh-RIL-uh)',
        definition: 'A member of a small independent group taking part in irregular fighting, typically against larger regular forces.',
        keyPattern: 'Starts with "gue-", double r ("rr"), and double l ("ll"). Classic Scripps homophone!',
        etymology: 'Spanish guerrilla (little war), diminutive of guerra (war).',
        sentence: 'The guerrilla forces utilized their intimate knowledge of the mountainous terrain.'
      },
      {
        word: 'aficionado',
        pronunciation: '/əˌfɪʃ.i.əˈnɑː.doʊ/ (uh-fish-ee-uh-NAH-doh)',
        definition: 'A person who is very knowledgeable and enthusiastic about an activity, subject, or pastime.',
        keyPattern: 'Single f ("af-"), single c ("-ic-"), followed by single n ("-ion-ado"). Do not double consonants!',
        etymology: 'Spanish aficionado (amateur, devotee, fond of), past participle of aficionar.',
        sentence: 'As a lifelong jazz aficionado, he possessed rare vinyl recordings by John Coltrane.'
      }
    ]
  }
];

export interface OriginDiagnosticQuizItem {
  id: string;
  word: string;
  ipa: string;
  audioText: string;
  definition: string;
  sentence: string;
  clue: string;
  correctOrigin: 'Latin' | 'Greek' | 'French' | 'German' | 'Italian' | 'Spanish';
  options: ('Latin' | 'Greek' | 'French' | 'German' | 'Italian' | 'Spanish')[];
  distinguishingReason: string;
  homophonePair?: {
    confusedWith: string;
    whyOriginSolvesIt: string;
  };
}

export const ORIGIN_DIAGNOSTIC_QUIZ: OriginDiagnosticQuizItem[] = [
  {
    id: 'odq-1',
    word: 'aqueduct',
    ipa: '/ˈæk.wə.dʌkt/',
    audioText: 'aqueduct',
    definition: 'An artificial channel or stone bridge for conveying water over long distances.',
    sentence: 'The stone arches of the Roman aqueduct spanned the river valley.',
    clue: 'Starts with root "aque-" (water) and ends with root "duct" (to lead).',
    correctOrigin: 'Latin',
    options: ['Latin', 'Greek', 'French', 'German'],
    distinguishingReason: 'Latin roots: aqua (water) + ducere (to lead). Combined into Latin aquae ductus!'
  },
  {
    id: 'odq-2',
    word: 'amphibian',
    ipa: '/æmˈfɪb.i.ən/',
    audioText: 'amphibian',
    definition: 'A cold-blooded animal that lives both in water and on land.',
    sentence: 'Frogs and salamanders belong to the amphibian class.',
    clue: 'Features "ph" for the /f/ sound, derived from "amphi-" (both) and "bios" (life).',
    correctOrigin: 'Greek',
    options: ['Greek', 'Latin', 'French', 'Italian'],
    distinguishingReason: 'Greek scientific word with "ph" representing Greek letter phi (Φ) + Greek bios (life).'
  },
  {
    id: 'odq-3',
    word: 'silhouette',
    ipa: '/ˌsɪl.uˈɛt/',
    audioText: 'silhouette',
    definition: 'A dark outline of a person or object against a lighter background.',
    sentence: 'The silhouette of the old windmill was visible against the sunset.',
    clue: 'Features silent "h" and ends in the classic diminutive suffix "-ette".',
    correctOrigin: 'French',
    options: ['French', 'German', 'Italian', 'Latin'],
    distinguishingReason: 'French name (Étienne de Silhouette) using the classic French feminine diminutive "-ette".'
  },
  {
    id: 'odq-4',
    word: 'kindergarten',
    ipa: '/ˈkɪn.dərˌɡɑːr.tən/',
    audioText: 'kindergarten',
    definition: 'An early school class for young children before first grade.',
    sentence: 'The teacher read an exciting picture book to the kindergarten class.',
    clue: 'A compound formed by fusing "kinder" (children) + "garten" (garden).',
    correctOrigin: 'German',
    options: ['German', 'French', 'Latin', 'Spanish'],
    distinguishingReason: 'German compound noun (kinder + garten). Notice the ending "-garten" with a "t"!'
  },
  {
    id: 'odq-5',
    word: 'virtuoso',
    ipa: '/ˌvɜːr.tʃuˈoʊ.zoʊ/',
    audioText: 'virtuoso',
    definition: 'A person with exceptional master skill in playing a musical instrument.',
    sentence: 'The young piano virtuoso performed Chopin without looking at sheet music.',
    clue: 'Musical terminology that ends in the vowel "-o".',
    correctOrigin: 'Italian',
    options: ['Italian', 'French', 'German', 'Greek'],
    distinguishingReason: 'Italian musical term ending in a vowel (-o), preserving Latin virtus via Renaissance Italy.'
  },
  {
    id: 'odq-6',
    word: 'guerrilla',
    ipa: '/ɡəˈrɪl.ə/',
    audioText: 'guerrilla',
    definition: 'A member of an irregular military group carrying out surprise tactical strikes.',
    sentence: 'The guerrilla fighters operated in steep jungle terrain.',
    clue: 'Diminutive form of "guerra" (war) using "-illa", with double r and double l.',
    correctOrigin: 'Spanish',
    options: ['Spanish', 'Greek', 'French', 'Italian'],
    distinguishingReason: 'Spanish diminutive from guerra (war) -> guerrilla (little war). Homophone to Greek gorilla!',
    homophonePair: {
      confusedWith: 'gorilla (Greek / African ape)',
      whyOriginSolvesIt: 'If origin is Spanish, spell guerrilla (warfare). If origin is Greek, spell gorilla (the ape).'
    }
  },
  {
    id: 'odq-7',
    word: 'millennium',
    ipa: '/mɪˈlɛn.i.əm/',
    audioText: 'millennium',
    definition: 'A span of one thousand years.',
    sentence: 'The world celebrated the start of a new millennium.',
    clue: 'Features double l ("ll"), double n ("nn"), and ends in the neuter noun suffix "-um".',
    correctOrigin: 'Latin',
    options: ['Latin', 'Greek', 'German', 'French'],
    distinguishingReason: 'Latin mille (thousand) + annus (year) + neuter -um ending = millennium.'
  },
  {
    id: 'odq-8',
    word: 'brontophobia',
    ipa: '/ˌbrɒn.təˈfoʊ.bi.ə/',
    audioText: 'brontophobia',
    definition: 'An extreme or irrational fear of thunder.',
    sentence: 'Her puppy suffered from brontophobia whenever thunder rumbled outside.',
    clue: 'Combines "bronto-" (thunder) with the suffix "-phobia" (fear, with "ph").',
    correctOrigin: 'Greek',
    options: ['Greek', 'Latin', 'Italian', 'Spanish'],
    distinguishingReason: 'Greek roots brontē (thunder) + phobos (fear). All scientific phobias are of Greek origin!'
  },
  {
    id: 'odq-9',
    word: 'chauffeur',
    ipa: '/ʃoʊˈfɜːr/',
    audioText: 'chauffeur',
    definition: 'A person hired to drive a private passenger vehicle.',
    sentence: 'The chauffeur held open the limousine door for the guest of honor.',
    clue: 'Starts with "ch" pronounced /ʃ/ and ends in the agent suffix "-eur".',
    correctOrigin: 'French',
    options: ['French', 'German', 'Italian', 'Latin'],
    distinguishingReason: 'French: "ch" produces the /ʃ/ sound and "-eur" is the French agent suffix.'
  },
  {
    id: 'odq-10',
    word: 'zucchini',
    ipa: '/zuːˈkiː.ni/',
    audioText: 'zucchini',
    definition: 'A dark green summer squash variety.',
    sentence: 'We grilled sliced zucchini seasoned with herbs and sea salt.',
    clue: 'Culinary term featuring "cch" for the /k/ sound and ending in "i".',
    correctOrigin: 'Italian',
    options: ['Italian', 'French', 'Greek', 'Spanish'],
    distinguishingReason: 'Italian: diminutive of zucca (gourd), using "cch" to keep hard /k/ before "i".'
  },
  {
    id: 'odq-11',
    word: 'dachshund',
    ipa: '/ˈdɑːks.hʊnd/',
    audioText: 'dachshund',
    definition: 'A small hound with a long body and short legs, bred to hunt badgers.',
    sentence: 'The brown dachshund waddled cheerfully down the sidewalk.',
    clue: 'Compound noun combining dachs (badger) + hund (hound/dog).',
    correctOrigin: 'German',
    options: ['German', 'Latin', 'French', 'Spanish'],
    distinguishingReason: 'German compound: dachs (badger) + hund (hound/dog).'
  },
  {
    id: 'odq-12',
    word: 'curriculum',
    ipa: '/kəˈrɪk.jə.ləm/',
    audioText: 'curriculum',
    definition: 'The complete course of study taught in an educational program.',
    sentence: 'The teachers collaborated to design a rigorous orthography curriculum.',
    clue: 'Contains double r ("rr") from currere (to run) and ends in the neuter suffix "-um".',
    correctOrigin: 'Latin',
    options: ['Latin', 'Greek', 'French', 'Italian'],
    distinguishingReason: 'Latin curriculum (a running/course), from currere (to run) + noun suffix -um.'
  },
  {
    id: 'odq-13',
    word: 'kaleidoscope',
    ipa: '/kəˈlaɪ.də.skoʊp/',
    audioText: 'kaleidoscope',
    definition: 'An optical toy tube containing loose glass pieces reflecting symmetric patterns.',
    sentence: 'The sunlight through the stained glass created a dazzling kaleidoscope on the floor.',
    clue: 'Greek root combination: kalos (beautiful) + eidos (form) + skopein (to view).',
    correctOrigin: 'Greek',
    options: ['Greek', 'Latin', 'German', 'French'],
    distinguishingReason: 'Greek neologism: kalos (beautiful) + eidos (form) + -skopion (viewing device).'
  },
  {
    id: 'odq-14',
    word: 'rendezvous',
    ipa: '/ˈrɒn.deɪ.vuː/',
    audioText: 'rendezvous',
    definition: 'A planned meeting at an agreed time and place.',
    sentence: 'The team selected the library courtyard as their study rendezvous.',
    clue: 'Contains two words with silent ending consonants: silent "z" and silent "s".',
    correctOrigin: 'French',
    options: ['French', 'Spanish', 'Latin', 'German'],
    distinguishingReason: 'French military phrase rendez-vous ("present yourselves!"), retaining silent "z" and "s".'
  },
  {
    id: 'odq-15',
    word: 'benevolent',
    ipa: '/bəˈnɛv.ə.lənt/',
    audioText: 'benevolent',
    definition: 'Kind, generous, and caring about the welfare of others.',
    sentence: 'The benevolent doctor donated free medical supplies to the village.',
    clue: 'Features prefix "bene-" (well/good) + "volens" (wishing).',
    correctOrigin: 'Latin',
    options: ['Latin', 'Greek', 'French', 'Italian'],
    distinguishingReason: 'Latin: bene (well/good) + velle (to wish). Characteristic Latin prefix bene-.'
  }
];
