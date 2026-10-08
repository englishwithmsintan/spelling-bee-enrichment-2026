import { HomophonePair } from '../types';

export interface StageQuestion {
  id: 'definition' | 'sentence' | 'partOfSpeech' | 'origin' | 'alternatePronunciation';
  label: string;
  questionPhrase: string;
  icon: string;
  description: string;
}

export const SCRIPPS_STAGE_QUESTIONS: StageQuestion[] = [
  {
    id: 'definition',
    label: 'Definition',
    questionPhrase: 'Could you please give me the definition?',
    icon: '📖',
    description: 'Crucial for homophones! Tells you exactly which meaning and spelling the pronouncer intends.'
  },
  {
    id: 'partOfSpeech',
    label: 'Part of Speech',
    questionPhrase: 'What is the part of speech?',
    icon: '🏷️',
    description: 'Distinguishes verbs (e.g. affect, break, waiver) from nouns/adjectives (effect, brake, waver).'
  },
  {
    id: 'origin',
    label: 'Language of Origin',
    questionPhrase: 'What is the language of origin?',
    icon: '🏛️',
    description: 'Greek roots (sym-, cy-) vs Latin (ped-, stat-) vs Old English (knight, bare) unlock spelling patterns.'
  },
  {
    id: 'alternatePronunciation',
    label: 'Alternate Pronunciations',
    questionPhrase: 'Are there any alternate pronunciations?',
    icon: '🗣️',
    description: 'The pronouncer will check Merriam-Webster for regional or secondary allowable pronunciations.'
  },
  {
    id: 'sentence',
    label: 'Sentence',
    questionPhrase: 'Could you please use the word in a sentence?',
    icon: '💬',
    description: 'Provides syntactic context so you hear how the word functions grammatically.'
  }
];

export const SCRIPPS_HOMOPHONE_PAIRS: HomophonePair[] = [
  {
    id: 'hp-stationary-stationery',
    soundIpa: '/ˈsteɪ.ʃən.er.i/',
    category: 'Scripps Two-Bee Traps',
    targetWord: 'stationery',
    ruleTip: 'Scripps Rule 4: When words sound identical, spellers must confirm whether writing supplies or motionlessness is meant!',
    words: [
      {
        word: 'stationary',
        partOfSpeech: 'adjective',
        definition: 'not moving, or staying in one particular place or position',
        sentence: 'The exercise bicycle remained completely stationary while Marcus pedaled as fast as he could.',
        origin: 'Latin (stationarius, "standing still")',
        memoryHook: 'stationAry with an "A" is "At rest" (standing still)!',
        spellingClue: 'Ends in -ary. Think of "anchored" or "at rest".',
        syllables: 'sta-tion-ar-y',
        ipa: '/ˈsteɪ.ʃən.er.i/'
      },
      {
        word: 'stationery',
        partOfSpeech: 'noun',
        definition: 'writing paper, matching envelopes, and related office materials',
        sentence: 'Grandma always penned her holiday greetings on elegant cream-colored stationery with matching gold seals.',
        origin: 'Middle English / Medieval Latin (stationarius, "bookseller with a permanent shop")',
        memoryHook: 'stationEry with an "E" is for "Envelope" and "lEtter"!',
        spellingClue: 'Ends in -ery. Think of "E" for envelope and letter.',
        syllables: 'sta-tion-er-y',
        ipa: '/ˈsteɪ.ʃən.er.i/'
      }
    ]
  },
  {
    id: 'hp-principal-principle',
    soundIpa: '/ˈprɪn.sə.pəl/',
    category: 'Grade 3-6 Staples',
    targetWord: 'principal',
    ruleTip: 'A classic school bee favorite! Confusing the school leader with a moral rule leads to instant elimination.',
    words: [
      {
        word: 'principal',
        partOfSpeech: 'noun / adjective',
        definition: 'the headmaster or director of a school; also the primary or most important item',
        sentence: 'Mrs. Davis, our school principal, presented the gold spelling bee medal on stage.',
        origin: 'Latin (principalis, "chief, first in rank")',
        memoryHook: 'The principAL is your "PAL" (or chief leader)!',
        spellingClue: 'Ends in -pal. Remember: your principal is your pal.',
        syllables: 'prin-ci-pal',
        ipa: '/ˈprɪn.sə.pəl/'
      },
      {
        word: 'principle',
        partOfSpeech: 'noun',
        definition: 'a fundamental truth, law of nature, or moral standard of conduct',
        sentence: 'He refused to copy answers on the quiz because honesty was his core principle.',
        origin: 'Latin (principium, "beginning, foundational source")',
        memoryHook: 'A principLE is a "ruLE" (both end in -le)!',
        spellingClue: 'Ends in -ple. Think of principle = rule.',
        syllables: 'prin-ci-ple',
        ipa: '/ˈprɪn.sə.pəl/'
      }
    ]
  },
  {
    id: 'hp-affect-effect',
    soundIpa: '/əˈfɛkt/ & /ɪˈfɛkt/',
    category: 'Scripps Two-Bee Traps',
    targetWord: 'affect',
    ruleTip: 'Nearly homophonic in fast speech! Always ask for part of speech: Affect is almost always an Action (verb).',
    words: [
      {
        word: 'affect',
        partOfSpeech: 'verb',
        definition: 'to act upon, produce an effect on, or influence someone or something',
        sentence: 'Lack of sleep can severely affect a speller’s ability to recall etymological roots.',
        origin: 'Latin (afficere, "to do something to, act upon")',
        memoryHook: 'A is for Action (Affect is the Action/verb)!',
        spellingClue: 'Starts with "A". "A"ffect = "A"ction.',
        syllables: 'af-fect',
        ipa: '/əˈfɛkt/'
      },
      {
        word: 'effect',
        partOfSpeech: 'noun',
        definition: 'something that is produced by an agency or cause; a result or consequence',
        sentence: 'The special lighting effect made the stage look like an enchanted forest.',
        origin: 'Latin (efficere, "to accomplish, bring about")',
        memoryHook: 'E is for End result (Effect is the End result/noun)!',
        spellingClue: 'Starts with "E". "E"ffect = "E"nd result.',
        syllables: 'ef-fect',
        ipa: '/ɪˈfɛkt/'
      }
    ]
  },
  {
    id: 'hp-compliment-complement',
    soundIpa: '/ˈkɑːm.plə.mənt/',
    category: 'Scripps Two-Bee Traps',
    targetWord: 'complement',
    ruleTip: 'Pronounced identically! The single middle vowel "i" vs "e" completely flips the definition.',
    words: [
      {
        word: 'compliment',
        partOfSpeech: 'noun / verb',
        definition: 'an expression of praise, admiration, or polite congratulations',
        sentence: 'The pronouncer paid the speller a high compliment for her composure under the stage lights.',
        origin: 'French / Italian (complimento, "expression of civility")',
        memoryHook: '"I" like your jacket! ComplIment has an "I" for giving praise!',
        spellingClue: 'Middle vowel is "i". Think: "I" love receiving praise.',
        syllables: 'com-pli-ment',
        ipa: '/ˈkɑːm.plə.mənt/'
      },
      {
        word: 'complement',
        partOfSpeech: 'noun / verb',
        definition: 'something that completes or brings to perfection; goes well together',
        sentence: 'A slice of tart lemon was the ideal complement to the rich seafood chowder.',
        origin: 'Latin (complementum, "that which fills up, completes")',
        memoryHook: 'complEment complEtes! Both share the root letter "E"!',
        spellingClue: 'Middle vowel is "e". Think: complEment complEtes.',
        syllables: 'com-ple-ment',
        ipa: '/ˈkɑːm.plə.mənt/'
      }
    ]
  },
  {
    id: 'hp-bare-bear',
    soundIpa: '/bɛər/',
    category: 'Grade 3-6 Staples',
    targetWord: 'bare',
    ruleTip: 'Simple sounds can hide deadly traps! Ask for the definition to ensure you do not spell the furry predator.',
    words: [
      {
        word: 'bare',
        partOfSpeech: 'adjective',
        definition: 'without covering, clothing, or contents; plain or naked',
        sentence: 'In winter, the apple tree branches stood completely bare against the gray sky.',
        origin: 'Old English (bær, "naked, uncovered")',
        memoryHook: 'B-A-R-E is bare and stripped down to four letters!',
        spellingClue: 'Spelled b-a-r-e. No "e-a" combo.',
        syllables: 'bare',
        ipa: '/bɛər/'
      },
      {
        word: 'bear',
        partOfSpeech: 'noun / verb',
        definition: 'a large heavy mammal with thick fur; or to endure and carry a heavy burden',
        sentence: 'A black bear ambled quietly along the ridge in search of wild blackberries.',
        origin: 'Old English (bera, "the brown one")',
        memoryHook: 'A bEar can Eat berries and honey (contains "ear" / "eat")!',
        spellingClue: 'Spelled b-e-a-r. Has "ea" like b-e-a-s-t.',
        syllables: 'bear',
        ipa: '/bɛər/'
      }
    ]
  },
  {
    id: 'hp-bazaar-bizarre',
    soundIpa: '/bəˈzɑːr/',
    category: 'Championship Finalists',
    targetWord: 'bazaar',
    ruleTip: 'Frequent Scripps onstage tiebreaker! Persian marketplace vs French/Basque oddity.',
    words: [
      {
        word: 'bazaar',
        partOfSpeech: 'noun',
        definition: 'a marketplace or shopping quarter, especially in the Middle East; or a charity sale',
        sentence: 'Spices of cardamom and saffron filled the narrow alleys of the Istanbul bazaar.',
        origin: 'Persian (bāzār, "market")',
        memoryHook: 'bazAAr has two "a"s like two bAzAAr stalls side-by-side!',
        spellingClue: 'b-a-z-a-a-r: single "z", double "aa".',
        syllables: 'ba-zaar',
        ipa: '/bəˈzɑːr/'
      },
      {
        word: 'bizarre',
        partOfSpeech: 'adjective',
        definition: 'markedly unusual in appearance, style, or character; odd, eccentric, or grotesque',
        sentence: 'The deep-sea anglerfish had a bizarre glowing lure dangling over its jaws.',
        origin: 'French (bizarre, "odd, strange") via Spanish (bizarro)',
        memoryHook: 'bizArre has a "z" and double "rr" for a truly strange word!',
        spellingClue: 'b-i-z-a-r-r-e: starts with "bi-", double "rr".',
        syllables: 'bi-zarre',
        ipa: '/bəˈzɑːr/'
      }
    ]
  },
  {
    id: 'hp-capital-capitol',
    soundIpa: '/ˈkæp.ə.t̬əl/',
    category: 'Grade 3-6 Staples',
    targetWord: 'capitol',
    ruleTip: 'Asking for the sentence is vital: is it the city/money/letter, or the physical government building with a dome?',
    words: [
      {
        word: 'capital',
        partOfSpeech: 'noun / adjective',
        definition: 'the city that is the seat of government; money or wealth; or an uppercase letter',
        sentence: 'Tokyo is the bustling capital of Japan, famous for its transit and technology.',
        origin: 'Latin (capitalis, "of the head, chief")',
        memoryHook: 'capitAl with an "A" is for All cities, Assets, and Alphabet letters!',
        spellingClue: 'Ends in -al. All-purpose word.',
        syllables: 'cap-i-tal',
        ipa: '/ˈkæp.ə.t̬əl/'
      },
      {
        word: 'capitol',
        partOfSpeech: 'noun',
        definition: 'the specific building in which a legislative body meets to make laws',
        sentence: 'Protesters gathered peacefully on the white marble steps of the state capitol.',
        origin: 'Latin (Capitolium, temple of Jupiter on the Capitoline hill in Rome)',
        memoryHook: 'capitOl has an "O" shaped just like the round dOme of the building!',
        spellingClue: 'Ends in -ol. "O" stands for the round rotunda dome.',
        syllables: 'cap-i-tol',
        ipa: '/ˈkæp.ə.t̬əl/'
      }
    ]
  },
  {
    id: 'hp-cereal-serial',
    soundIpa: '/ˈsɪr.i.əl/',
    category: 'Grade 3-6 Staples',
    targetWord: 'cereal',
    ruleTip: 'Origin check! Latin goddess Ceres (grain) vs Latin series (ordered sequence).',
    words: [
      {
        word: 'cereal',
        partOfSpeech: 'noun',
        definition: 'a breakfast food prepared from grain; or the grain itself (such as oats or wheat)',
        sentence: 'Maya topped her bowl of whole-grain cereal with sliced strawberries and honey.',
        origin: 'Latin (Cerealis, "pertaining to Ceres, goddess of agriculture")',
        memoryHook: 'Ceres, the goddess of wheat, gave us morning Cereal!',
        spellingClue: 'Starts with "c-e-r-e-".',
        syllables: 'ce-re-al',
        ipa: '/ˈsɪr.i.əl/'
      },
      {
        word: 'serial',
        partOfSpeech: 'adjective / noun',
        definition: 'published or broadcast in recurring installments; ordered in a continuous series',
        sentence: 'The mystery novel was originally published as a serial in the weekly newspaper.',
        origin: 'Latin (series, "sequence, chain, row")',
        memoryHook: 'Serial starts with "S" for Series and Sequence!',
        spellingClue: 'Starts with "s-e-r-i-".',
        syllables: 'se-ri-al',
        ipa: '/ˈsɪr.i.əl/'
      }
    ]
  },
  {
    id: 'hp-aisle-isle',
    soundIpa: '/aɪl/',
    category: 'Scripps Two-Bee Traps',
    targetWord: 'aisle',
    ruleTip: 'Watch out for silent letters! One has a silent "A" and "S", the other only a silent "S".',
    words: [
      {
        word: 'aisle',
        partOfSpeech: 'noun',
        definition: 'a walkway between rows of seats in a church, theater, or plane, or between supermarket shelves',
        sentence: 'The bride walked gracefully down the central aisle toward the altar.',
        origin: 'Latin (ala, "wing") through Old French, influenced by "isle"',
        memoryHook: 'Aisle starts with "A" like Airplane walkway!',
        spellingClue: 'a-i-s-l-e: silent "a" and silent "s".',
        syllables: 'aisle',
        ipa: '/aɪl/'
      },
      {
        word: 'isle',
        partOfSpeech: 'noun',
        definition: 'a small island or peninsula',
        sentence: 'Puffins build their nesting burrows on the rocky cliffs of the Scottish isle.',
        origin: 'Latin (insula, "island") via Old French (isle)',
        memoryHook: 'An Isle is an Island—both start with "Is-"!',
        spellingClue: 'i-s-l-e: starts with "i", silent "s".',
        syllables: 'isle',
        ipa: '/aɪl/'
      }
    ]
  },
  {
    id: 'hp-course-coarse',
    soundIpa: '/kɔːrs/',
    category: 'Grade 3-6 Staples',
    targetWord: 'coarse',
    ruleTip: 'Check the vowel spelling! "ou" for a journey or class, "oa" for rough texture.',
    words: [
      {
        word: 'course',
        partOfSpeech: 'noun',
        definition: 'a path or route taken; an instructional class; or a part of a meal',
        sentence: 'The sailing ship charted a steady course through the stormy Caribbean waters.',
        origin: 'Latin (cursus, "a running, passage")',
        memoryHook: 'A cOUrse takes yOU on an educational journey!',
        spellingClue: 'c-o-u-r-s-e: spelled with "ou".',
        syllables: 'course',
        ipa: '/kɔːrs/'
      },
      {
        word: 'coarse',
        partOfSpeech: 'adjective',
        definition: 'rough or harsh in texture; made of large particles; not refined',
        sentence: 'The carpenter smoothed the splintered oak board with coarse sandpaper.',
        origin: 'Middle English (cors, "common, ordinary")',
        memoryHook: 'cOArse has "oa", as rough as an unpaved rOAd!',
        spellingClue: 'c-o-a-r-s-e: spelled with "oa".',
        syllables: 'coarse',
        ipa: '/kɔːrs/'
      }
    ]
  },
  {
    id: 'hp-discreet-discrete',
    soundIpa: '/dɪˈskriːt/',
    category: 'Championship Finalists',
    targetWord: 'discreet',
    ruleTip: 'A notorious National Finals trap! Latin "discretus" split into two distinct English words.',
    words: [
      {
        word: 'discreet',
        partOfSpeech: 'adjective',
        definition: 'judicious in conduct or speech, especially maintaining confidentiality or avoiding embarrassment',
        sentence: 'The bodyguard kept a discreet distance behind the ambassador.',
        origin: 'Latin (discretus, "discerning, prudent")',
        memoryHook: 'The two "ee"s stay hidden secret together in the middle of discrEEt!',
        spellingClue: 'd-i-s-c-r-e-e-t: ends in -e-e-t.',
        syllables: 'dis-creet',
        ipa: '/dɪˈskriːt/'
      },
      {
        word: 'discrete',
        partOfSpeech: 'adjective',
        definition: 'apart or detached from others; distinct; consisting of separate individual entities',
        sentence: 'The digital sensor divides incoming audio frequencies into discrete bands.',
        origin: 'Latin (discretus, "separated, distinct")',
        memoryHook: 'In discr-E-T-E, the "t" separates the two "e"s—they are separate/discrete!',
        spellingClue: 'd-i-s-c-r-e-t-e: "t" separates the "e"s.',
        syllables: 'dis-crete',
        ipa: '/dɪˈskriːt/'
      }
    ]
  },
  {
    id: 'hp-elicit-illicit',
    soundIpa: '/ɪˈlɪs.ɪt/',
    category: 'Championship Finalists',
    targetWord: 'illicit',
    ruleTip: 'Listen carefully for prefix and meaning: E- (out) for verb vs IL- (not) for forbidden!',
    words: [
      {
        word: 'elicit',
        partOfSpeech: 'verb',
        definition: 'to draw out or bring forth (a response, answer, or emotion)',
        sentence: 'The detective asked pointed questions to elicit the truth from the suspect.',
        origin: 'Latin (elicere, "to lure out")',
        memoryHook: 'E is for Evoke or Extract (verb to draw out)!',
        spellingClue: 'e-l-i-c-i-t: single "l", soft "c".',
        syllables: 'e-lic-it',
        ipa: '/ɪˈlɪs.ɪt/'
      },
      {
        word: 'illicit',
        partOfSpeech: 'adjective',
        definition: 'not permitted by law or rules; unlawful; improper',
        sentence: 'The customs officer seized illicit shipments of endangered parrot feathers.',
        origin: 'Latin (illicitus, "not allowed; il- [not] + licitus [permitted]")',
        memoryHook: 'IL- is for ILLEGAL (illicit means forbidden)!',
        spellingClue: 'i-l-l-i-c-i-t: double "ll", soft "c".',
        syllables: 'il-lic-it',
        ipa: '/ɪˈlɪs.ɪt/'
      }
    ]
  },
  {
    id: 'hp-flair-flare',
    soundIpa: '/flɛər/',
    category: 'Scripps Two-Bee Traps',
    targetWord: 'flair',
    ruleTip: 'Talent vs Burst of Light. Asking for the definition prevents an instant wrong vowel pick!',
    words: [
      {
        word: 'flair',
        partOfSpeech: 'noun',
        definition: 'a natural talent, aptitude, or distinctive stylish knack',
        sentence: 'Diego danced the salsa with undeniable flair and natural rhythm.',
        origin: 'Old French (flairier, "to scent or smell out")',
        memoryHook: 'FLAIR has "AIR" like a stylish breeze!',
        spellingClue: 'f-l-a-i-r: spelled with "ai".',
        syllables: 'flair',
        ipa: '/flɛər/'
      },
      {
        word: 'flare',
        partOfSpeech: 'noun / verb',
        definition: 'a sudden blaze or burst of flame or light; or an emergency distress signal',
        sentence: 'The stranded mountaineer fired a crimson flare into the dusk sky.',
        origin: 'Scandinavian origin (to spread out or flicker)',
        memoryHook: 'FLARE has "ARE" like a Fire blazing bright!',
        spellingClue: 'f-l-a-r-e: ends in silent "e".',
        syllables: 'flare',
        ipa: '/flɛər/'
      }
    ]
  },
  {
    id: 'hp-gorilla-guerrilla',
    soundIpa: '/ɡəˈrɪl.ə/',
    category: 'Championship Finalists',
    targetWord: 'guerrilla',
    ruleTip: 'Spanish military term vs African ape! Origin question immediately gives the answer away!',
    words: [
      {
        word: 'gorilla',
        partOfSpeech: 'noun',
        definition: 'a large, powerful anthropoid ape native to African rainforests',
        sentence: 'The silverback gorilla stood watch over his troop in the misty jungle.',
        origin: 'Greek (gorillai, "tribe of hairy people")',
        memoryHook: 'g-o-r-i-l-l-a: one "r", two "l"s for the great ape!',
        spellingClue: 'Single "r", double "l".',
        syllables: 'go-ril-la',
        ipa: '/ɡəˈrɪl.ə/'
      },
      {
        word: 'guerrilla',
        partOfSpeech: 'noun / adjective',
        definition: 'a member of an irregular military unit fighting by surprise raids and ambushes',
        sentence: 'The rebel resistance waged guerrilla warfare from hidden mountain caves.',
        origin: 'Spanish (guerrilla, diminutive of "guerra" meaning war)',
        memoryHook: 'Comes from Spanish GUERRA (war)—double "rr" and double "ll"!',
        spellingClue: 'g-u-e-r-r-i-l-l-a: starts with "gue-", double "rr", double "ll".',
        syllables: 'guer-ril-la',
        ipa: '/ɡəˈrɪl.ə/'
      }
    ]
  },
  {
    id: 'hp-council-counsel',
    soundIpa: '/ˈkaʊn.səl/',
    category: 'Scripps Two-Bee Traps',
    targetWord: 'counsel',
    ruleTip: 'Group vs Advice! A speller who asks for the definition knows whether they need "-cil" or "-sel".',
    words: [
      {
        word: 'council',
        partOfSpeech: 'noun',
        definition: 'an administrative, legislative, or advisory body of people convened to deliberate',
        sentence: 'The city council debated the new bike lane ordinance for two hours.',
        origin: 'Latin (concilium, "assembly, meeting")',
        memoryHook: 'councIL with "-cil" is for a cIty or civIc group of people!',
        spellingClue: 'c-o-u-n-c-i-l: ends in -c-i-l.',
        syllables: 'coun-cil',
        ipa: '/ˈkaʊn.səl/'
      },
      {
        word: 'counsel',
        partOfSpeech: 'noun / verb',
        definition: 'advice or guidance given to someone; or a lawyer giving legal advice',
        sentence: 'The spelling coach gave her student encouraging counsel before the finals.',
        origin: 'Latin (consilium, "deliberation, consultation, advice")',
        memoryHook: 'counsEL with "-el" provides Expert Legal guidance!',
        spellingClue: 'c-o-u-n-s-e-l: ends in -s-e-l.',
        syllables: 'coun-sel',
        ipa: '/ˈkaʊn.səl/'
      }
    ]
  },
  {
    id: 'hp-pedal-peddle',
    soundIpa: '/ˈpɛd.əl/',
    category: 'Grade 3-6 Staples',
    targetWord: 'peddle',
    ruleTip: 'Latin ped- (foot) vs Middle English pedlere (traveling merchant).',
    words: [
      {
        word: 'pedal',
        partOfSpeech: 'noun / verb',
        definition: 'a foot-operated lever used to control a bicycle, piano, or machine',
        sentence: 'She stood up on the bicycle pedal to surge up the steep hill.',
        origin: 'Latin (pedalis, from "pes" meaning foot)',
        memoryHook: 'PED- means foot (like pedestrian or pedicure)!',
        spellingClue: 'p-e-d-a-l: ends in -al.',
        syllables: 'ped-al',
        ipa: '/ˈpɛd.əl/'
      },
      {
        word: 'peddle',
        partOfSpeech: 'verb',
        definition: 'to travel around offering small goods for sale from place to place',
        sentence: 'The street merchant would peddle handmade wooden flutes at the county fair.',
        origin: 'Middle English (pedlere, "packman, hawker")',
        memoryHook: 'PEDDLE has double "d" like a Dealer traveling with wares!',
        spellingClue: 'p-e-d-d-l-e: double "dd", ends in -le.',
        syllables: 'ped-dle',
        ipa: '/ˈpɛd.əl/'
      }
    ]
  },
  {
    id: 'hp-waiver-waver',
    soundIpa: '/ˈweɪ.vər/',
    category: 'Scripps Two-Bee Traps',
    targetWord: 'waiver',
    ruleTip: 'Legal surrender of a right vs unsteady hesitation! The extra "i" changes everything.',
    words: [
      {
        word: 'waiver',
        partOfSpeech: 'noun',
        definition: 'an intentional surrender or relinquishment of a known legal right or privilege',
        sentence: 'All trampoline park visitors must sign a liability waiver before entering.',
        origin: 'Anglo-French (weyver, "to abandon")',
        memoryHook: 'WAI- like WAIVING a legal document with your pen!',
        spellingClue: 'w-a-i-v-e-r: includes "i".',
        syllables: 'waiv-er',
        ipa: '/ˈweɪ.vər/'
      },
      {
        word: 'waver',
        partOfSpeech: 'verb',
        definition: 'to shake with a trembling motion; to fluctuate or hesitate in decision',
        sentence: 'Her clear voice did not waver for a second when spelling the championship word.',
        origin: 'Middle English (waveren, "to wander, flutter")',
        memoryHook: 'W-A-V-E-R rocks back and forth just like an ocean WAVE!',
        spellingClue: 'w-a-v-e-r: no "i", simple root of wave.',
        syllables: 'wa-ver',
        ipa: '/ˈweɪ.vər/'
      }
    ]
  },
  {
    id: 'hp-weather-whether',
    soundIpa: '/ˈwɛð.ər/',
    category: 'Grade 3-6 Staples',
    targetWord: 'whether',
    ruleTip: 'Conjunction of choice vs atmospheric storms! Notice the WH- interrogative question sound.',
    words: [
      {
        word: 'weather',
        partOfSpeech: 'noun / verb',
        definition: 'the state of the atmosphere with respect to heat or cold, wetness, calm, or storm',
        sentence: 'Heavy rain and stormy weather forced the soccer tournament inside.',
        origin: 'Old English (weder, "air, sky, storm")',
        memoryHook: 'WE-A-T-H-E-R contains "eat"—enjoying an ice cream in sunny weather!',
        spellingClue: 'w-e-a-t-h-e-r: starts with "we-".',
        syllables: 'weath-er',
        ipa: '/ˈwɛð.ər/'
      },
      {
        word: 'whether',
        partOfSpeech: 'conjunction',
        definition: 'used to introduce an indirect question involving alternatives or choice',
        sentence: 'The contestant wondered whether she should ask the pronouncer for origin.',
        origin: 'Old English (hwæther, "which of two")',
        memoryHook: 'WH- is for Which alternative! (Like Who, What, Which, Whether).',
        spellingClue: 'w-h-e-t-h-e-r: starts with "wh-".',
        syllables: 'wheth-er',
        ipa: '/ˈwɛð.ər/'
      }
    ]
  },
  {
    id: 'hp-cymbal-symbol',
    soundIpa: '/ˈsɪm.bəl/',
    category: 'Scripps Two-Bee Traps',
    targetWord: 'cymbal',
    ruleTip: 'Both from Greek! But "cy-" is the percussion disk, while "sy-" is an emblem or sign.',
    words: [
      {
        word: 'cymbal',
        partOfSpeech: 'noun',
        definition: 'a concave brass musical instrument of percussion producing a ringing sound',
        sentence: 'The marching band drummer struck the gleaming brass cymbal with thunderous force.',
        origin: 'Greek (kymbalon, "bowl, cup")',
        memoryHook: 'CYMBAL starts with "C" for Clashing brass plate!',
        spellingClue: 'c-y-m-b-a-l: starts with "cy-", ends in -al.',
        syllables: 'cym-bal',
        ipa: '/ˈsɪm.bəl/'
      },
      {
        word: 'symbol',
        partOfSpeech: 'noun',
        definition: 'a character, mark, or emblem accepted as representing an idea or object',
        sentence: 'The olive branch has long been recognized as a symbol of peace.',
        origin: 'Greek (symbolon, "token, sign")',
        memoryHook: 'SYM- root means together (like symmetry), bringing ideas together!',
        spellingClue: 's-y-m-b-o-l: starts with "sy-", ends in -ol.',
        syllables: 'sym-bol',
        ipa: '/ˈsɪm.bəl/'
      }
    ]
  },
  {
    id: 'hp-yoke-yolk',
    soundIpa: '/joʊk/',
    category: 'Grade 3-6 Staples',
    targetWord: 'yolk',
    ruleTip: 'Silent L alert! The yellow center of an egg contains a silent "L" from Old English geoloca (yellow).',
    words: [
      {
        word: 'yoke',
        partOfSpeech: 'noun / verb',
        definition: 'a wooden harness fitted across the necks of two draft animals for pulling a plow',
        sentence: 'The farmer strapped the heavy wooden yoke across the oxen’s strong shoulders.',
        origin: 'Old English (geoc, "crossbar, team")',
        memoryHook: 'Y-O-K-E fits Over the Oxen to pull the plow!',
        spellingClue: 'y-o-k-e: no "l", ends in -ke.',
        syllables: 'yoke',
        ipa: '/joʊk/'
      },
      {
        word: 'yolk',
        partOfSpeech: 'noun',
        definition: 'the nutrient-bearing yellow central part of an egg',
        sentence: 'He whipped the golden egg yolk with melted butter for the hollandaise sauce.',
        origin: 'Old English (geoloca, from "geolo" meaning yellow)',
        memoryHook: 'Y-O-L-K has a silent "L" just like yeLLow egg!',
        spellingClue: 'y-o-l-k: contains silent "l".',
        syllables: 'yolk',
        ipa: '/joʊk/'
      }
    ]
  },
  {
    id: 'hp-knight-night',
    soundIpa: '/naɪt/',
    category: 'Grade 3-6 Staples',
    targetWord: 'knight',
    ruleTip: 'Silent K trap! The medieval hero wears armor with a silent "K" and silent "GH".',
    words: [
      {
        word: 'knight',
        partOfSpeech: 'noun',
        definition: 'a medieval noble warrior sworn to chivalry and clad in armor',
        sentence: 'The valiant knight lowered his iron visor before the grand tournament duel.',
        origin: 'Old English (cniht, "boy, youth, military servant")',
        memoryHook: 'Silent "K" protects the King’s Knight!',
        spellingClue: 'k-n-i-g-h-t: begins with silent "k-n-".',
        syllables: 'knight',
        ipa: '/naɪt/'
      },
      {
        word: 'night',
        partOfSpeech: 'noun',
        definition: 'the period of darkness between sunset and sunrise',
        sentence: 'The full moon illuminated the tranquil meadow throughout the chilly night.',
        origin: 'Old English (niht, "darkness, night")',
        memoryHook: 'N-I-G-H-T with "N" for No sun!',
        spellingClue: 'n-i-g-h-t: begins with simple "n-".',
        syllables: 'night',
        ipa: '/naɪt/'
      }
    ]
  },
  {
    id: 'hp-passed-past',
    soundIpa: '/pæst/',
    category: 'Grade 3-6 Staples',
    targetWord: 'passed',
    ruleTip: 'Grammar is key! Ask for part of speech: is it the past tense verb of "pass" (-ed) or a noun/preposition?',
    words: [
      {
        word: 'passed',
        partOfSpeech: 'verb',
        definition: 'moved on, progressed beyond, or succeeded (past tense of to pass)',
        sentence: 'The runner passed three competitors on the final turn to take first place.',
        origin: 'French (passer, "to go by")',
        memoryHook: 'Ends in -ED because it is a past-tense VERB!',
        spellingClue: 'p-a-s-s-e-d: double "ss", regular past-tense ending -ed.',
        syllables: 'passed',
        ipa: '/pæst/'
      },
      {
        word: 'past',
        partOfSpeech: 'noun / adjective / preposition',
        definition: 'time gone by; earlier history; or beyond in position',
        sentence: 'In the distant past, ancient scribes recorded records on papyrus scrolls.',
        origin: 'Middle English (past)',
        memoryHook: 'P-A-S-T refers to Time gone by, not a verb with -ed!',
        spellingClue: 'p-a-s-t: ends in -st.',
        syllables: 'past',
        ipa: '/pæst/'
      }
    ]
  }
];
