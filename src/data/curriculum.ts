import type { Level, LearnLanguage } from '../types';

export interface Topic {
  id: string;
  icon: string;
  title: string;
  items: string[];
}

export interface LevelCurriculum {
  level: Level;
  overview: string;
  topics: Topic[];
  dialog?: string;
}

const de: Record<Level, LevelCurriculum> = {
  A1: {
    level: 'A1',
    overview: 'Introduce yourself, order food, ask for directions, talk about everyday topics.',
    topics: [
      {
        id: 'greetings',
        icon: '👋',
        title: 'Greetings & Introductions',
        items: [
          'Hello / Goodbye (Hallo, Tschüss, Guten Morgen, Auf Wiedersehen)',
          'Introducing yourself (Ich heiße …, Ich komme aus …)',
          'How are you? (Wie geht es dir? Mir geht es gut.)',
          'Asking for names (Wie heißt du? Wie ist Ihr Name?)',
        ],
      },
      {
        id: 'numbers',
        icon: '🔢',
        title: 'Numbers & Counting',
        items: [
          'Numbers 0–100',
          'Age, phone numbers, prices',
          'Ordinal numbers (erste, zweite, dritte …)',
        ],
      },
      {
        id: 'articles',
        icon: '📝',
        title: 'Articles & Nouns',
        items: [
          'Definite articles: der, die, das',
          'Indefinite articles: ein, eine',
          'Noun genders and plural formation',
          'Nominative case',
        ],
      },
      {
        id: 'present-tense',
        icon: '⚡',
        title: 'Present Tense (Präsens)',
        items: [
          'Verb conjugation (spielen → ich spiele, du spielst …)',
          'Sein und haben (Ich bin, du hast …)',
          'Regular verbs',
          'Common irregular verbs (essen, lesen, fahren, sehen)',
          'Separable prefix verbs (einkaufen, aufstehen)',
        ],
      },
      {
        id: 'questions',
        icon: '❓',
        title: 'Questions & Negation',
        items: [
          'W‑questions (wer, was, wo, wann, warum)',
          'Yes/No questions (Kommst du? Ist das …?)',
          'Negation with nicht and kein',
        ],
      },
      {
        id: 'family',
        icon: '👨‍👩‍👧',
        title: 'Family & People',
        items: [
          'Family members (Mutter, Vater, Bruder, Schwester)',
          'Possessive articles (mein, dein, sein, ihr)',
          'Describing people (groß, klein, nett, freundlich)',
        ],
      },
      {
        id: 'food',
        icon: '🍽️',
        title: 'Food & Drink',
        items: [
          'Common foods and drinks (Brot, Milch, Wasser, Apfel)',
          'Ordering at a restaurant (Ich möchte …)',
          'Shopping for groceries',
          'Prices and paying',
        ],
      },
      {
        id: 'daily',
        icon: '🕐',
        title: 'Daily Routine',
        items: [
          'Days of the week, months, seasons',
          'Telling time (Es ist drei Uhr, halb zehn …)',
          'Daily activities (aufstehen, frühstücken, arbeiten)',
          'Frequency adverbs (immer, oft, manchmal, nie)',
        ],
      },
      {
        id: 'hobbies',
        icon: '🎮',
        title: 'Hobbies & Activities',
        items: [
          'Common hobbies (lesen, Sport treiben, Musik hören)',
          'Like/dislike (gern, nicht gern, lieber)',
          'Invitations (Hast du Lust …? Möchtest du …?)',
        ],
      },
      {
        id: 'travel',
        icon: '🧭',
        title: 'Travel & Directions',
        items: [
          'Directions (links, rechts, geradeaus)',
          'Places (Bahnhof, Supermarkt, Krankenhaus)',
          'Asking for and giving directions',
          'Transportation (Bus, Zug, U-Bahn)',
        ],
      },
      {
        id: 'colors',
        icon: '🎨',
        title: 'Colors & Descriptions',
        items: [
          'Colors (rot, blau, grün, gelb, schwarz, weiß)',
          'Adjective basics (groß/klein, alt/neu, teuer/billig)',
          'Simple descriptions (Das Haus ist groß.)',
        ],
      },
      {
        id: 'accusative',
        icon: '🎯',
        title: 'Accusative Case',
        items: [
          'The accusative case (den, einen, keine)',
          'Accusative prepositions (durch, für, gegen, ohne, um)',
          'Common accusative verbs (haben, sehen, essen)',
        ],
      },
    ],
    dialog: 'A: Hallo! Ich heiße Anna. Wie heißt du?\nB: Hallo Anna! Ich bin Tom.\nA: Freut mich! Woher kommst du, Tom?\nB: Ich komme aus Frankreich. Und du?\nA: Ich komme aus Deutschland. Wohnst du auch hier?\nB: Ja, ich wohne in der Goethestraße. Und du?\nA: Ich wohne hier in der Nähe. Magst du Fußball?\nB: Ja, sehr gern! Spielst du auch?\nA: Ja, ich spiele jeden Samstag. Komm doch mal vorbei!',
  },

  A2: {
    level: 'A2',
    overview: 'Talk about past events, make appointments, express opinions simply.',
    topics: [
      {
        id: 'perfekt',
        icon: '⏮️',
        title: 'Past Tense (Perfekt)',
        items: [
          'Formation with haben + Partizip II',
          'Formation with sein + Partizip II',
          'Common participles (gemacht, gegessen, gefahren)',
          'Separable prefix verbs (eingekauft, aufgestanden)',
        ],
      },
      {
        id: 'modal-verbs',
        icon: '🔧',
        title: 'Modal Verbs',
        items: [
          'können, müssen, wollen, dürfen, sollen, mögen',
          'Conjugation and sentence structure',
          'Expressing ability, necessity, permission, desire',
          'möchten (polite requests)',
        ],
      },
      {
        id: 'prepositions',
        icon: '📍',
        title: 'Prepositions',
        items: [
          'Dative prepositions (aus, bei, mit, nach, seit, von, zu)',
          'Two-way prepositions (in, auf, unter, über, vor, zwischen)',
          'Accusative vs Dative distinction',
        ],
      },
      {
        id: 'dative',
        icon: '🎭',
        title: 'Dative Case',
        items: [
          'Dative articles (dem, der, den + n)',
          'Dative verbs (helfen, danken, gefallen, gehören)',
          'Personal pronouns in dative (mir, dir, ihm …)',
        ],
      },
      {
        id: 'shopping',
        icon: '🛍️',
        title: 'Clothing & Shopping',
        items: [
          'Clothing vocabulary (Hemd, Hose, Kleid, Schuhe)',
          'Shopping dialogues (Was kostet das? Haben Sie …?)',
          'Sizes and colors',
          'Returns and exchanges',
        ],
      },
      {
        id: 'health',
        icon: '🏥',
        title: 'Health & Doctor',
        items: [
          'Body parts (Kopf, Arm, Bauch, Bein)',
          'Symptoms and illnesses (Ich habe Kopfschmerzen …)',
          'At the doctor (Wo tut es weh? Seit wann?)',
        ],
      },
      {
        id: 'comparison',
        icon: '📊',
        title: 'Comparisons & Superlatives',
        items: [
          'Comparative (größer, schöner, interessanter)',
          'Superlative (am größten, der/die/das schönste)',
          'Irregular forms (gut → besser → am besten)',
          'als vs wie',
        ],
      },
      {
        id: 'imperative',
        icon: '📢',
        title: 'Commands & Requests',
        items: [
          'Imperative forms (Komm! Gehen Sie! Hört zu!)',
          'Polite requests (Würden Sie …? Könnten Sie …?)',
          'Giving advice (Du solltest …)',
        ],
      },
      {
        id: 'appointments',
        icon: '📅',
        title: 'Appointments & Plans',
        items: [
          'Making appointments (Hast du am Montag Zeit?)',
          'Accepting and declining',
          'Talking about plans (Ich werde …)',
          'Future with werden (present sense)',
        ],
      },
      {
        id: 'work',
        icon: '💼',
        title: 'Work & School',
        items: [
          'Job vocabulary (Arzt, Lehrer, Ingenieur)',
          'Workplace dialogues',
          'School subjects and schedules',
          'Talking about your profession',
        ],
      },
    ],
    dialog: 'A: Hallo, Can I help you?\nB: Ja, ich suche eine Hose.\nA: Welche Größe haben Sie?\nB: Größe 40. Haben Sie die in Blau?\nA: Ja, hier ist eine blaue. Möchten Sie sie anprobieren?\nB: Gern. Wo ist die Umkleidekabine?\nA: Da hinten links. Sagen Sie Bescheid, wenn Sie Hilfe brauchen!\nB: Danke! … Sie passt perfekt! Ich nehme sie.\nA: Das macht dann 39,90 Euro.',
  },

  B1: {
    level: 'B1',
    overview: 'Discuss news, express opinions, handle complex situations independently.',
    topics: [
      {
        id: 'preterit',
        icon: '📜',
        title: 'Präteritum & Plusquamperfekt',
        items: [
          'Präteritum of sein, haben, modal verbs',
          'Präteritum of strong verbs (ging, fuhr, kam)',
          'Plusquamperfekt (Ich hatte gearbeitet, war gefahren)',
          'Past vs Pluperfect distinction',
        ],
      },
      {
        id: 'konjuktiv',
        icon: '💭',
        title: 'Konjunktiv II',
        items: [
          'Formation (würde + infinitive)',
          'Hypothetical situations (Wenn ich Zeit hätte …)',
          'Polite requests (Könnte ich …? Würden Sie …?)',
          'Unreal wishes (Ich wünschte, ich wäre …)',
        ],
      },
      {
        id: 'passive',
        icon: '🔄',
        title: 'Passive Voice',
        items: [
          'Process passive (werden + Partizip II)',
          'State passive (sein + Partizip II)',
          'Passive with modal verbs',
          'Impersonal passive (Es wird getanzt.)',
        ],
      },
      {
        id: 'subordinate',
        icon: '🔗',
        title: 'Subordinate Clauses',
        items: [
          'dass clauses',
          'weil / da (reason)',
          'obwohl (concession)',
          'wenn / als (time)',
          'damit / um … zu (purpose)',
        ],
      },
      {
        id: 'relativ',
        icon: '🔍',
        title: 'Relative Clauses',
        items: [
          'Relative pronouns in nominative, accusative, dative',
          'Relative clauses with prepositions',
          'wo / was as relative pronouns',
        ],
      },
      {
        id: 'adjektiv-dek',
        icon: '📋',
        title: 'Adjective Declensions',
        items: [
          'Weak declension (der gute Mann)',
          'Strong declension (guter Wein)',
          'Mixed declension (ein guter Freund)',
          'After determiners and quantifiers',
        ],
      },
      {
        id: 'nominal',
        icon: '📄',
        title: 'Nominalization',
        items: [
          'Verb → noun (lesen → das Lesen)',
          'Adjective → noun (gut → das Gute)',
          'Compound nouns (die Hausaufgabe, der Führerschein)',
        ],
      },
      {
        id: 'media',
        icon: '📰',
        title: 'News & Media',
        items: [
          'Discussing news articles',
          'Expressing opinions (Meiner Meinung nach …)',
          'Agreeing and disagreeing',
          'Reporting what others said',
        ],
      },
      {
        id: 'connectors',
        icon: '🧩',
        title: 'Advanced Connectors',
        items: [
          'trotzdem, außerdem, allerdings, jedenfalls',
          'zwar … aber, entweder … oder, weder … noch',
          'je … desto (comparative correlations)',
        ],
      },
      {
        id: 'writing',
        icon: '✉️',
        title: 'Formal Writing',
        items: [
          'Formal letters and emails',
          'Applications (Bewerbung)',
          'Complaints and inquiries',
          'Structuring texts (Einleitung, Hauptteil, Schluss)',
        ],
      },
    ],
    dialog: 'A: Hast du die Nachrichten heute gehört?\nB: Ja, es war ja viel los. Die Regierung hat neue Klimaziele angekündigt.\nA: Meiner Meinung nach ist das längst überfällig. Obwohl die Maßnahmen nicht weit genug gehen.\nB: Da stimme ich dir zu. Wenn wir früher angefangen hätten, wären wir jetzt weiter.\nA: Genau. Übrigens, was würdest du tun, wenn du Umweltminister wärst?\nB: Also, ich würde erneuerbare Energien viel stärker fördern. Was hältst du davon?\nA: Das finde ich auch. Außerdem sollte der öffentliche Nahverkehr ausgebaut werden.\nB: Ja, je besser die Alternative, desto eher steigen die Leute um.',
  },

  B2: {
    level: 'B2',
    overview: 'Express yourself fluently, argue professionally, understand nuances.',
    topics: [
      {
        id: 'complex-tenses',
        icon: '⏳',
        title: 'Complex Tenses',
        items: [
          'Futur II (Ich werde gearbeitet haben)',
          'Konjunktiv I (Er habe gesagt …)',
          'Double infinitives (Ich habe ihn kommen sehen)',
        ],
      },
      {
        id: 'indirect',
        icon: '🗣️',
        title: 'Indirect Speech',
        items: [
          'Konjunktiv I for indirect speech',
          'Substitution with Konjunktiv II',
          'Reported questions and requests',
        ],
      },
      {
        id: 'word-order',
        icon: '🔄',
        title: 'Word Order Variations',
        items: [
          'Emphatic fronting (Gestern bin ich …)',
          'Inversion after adverbials',
          'te‐ka‐mo‐lo (time, cause, manner, place)',
          'Complex sentence structure',
        ],
      },
      {
        id: 'abstract',
        icon: '🧠',
        title: 'Abstract Topics & Discussion',
        items: [
          'Stating claims and supporting arguments',
          'Conjecture (dürfte, soll, angeblich, vermutlich)',
          'Expressing doubt and certainty',
          'Discussing hypothetical scenarios',
        ],
      },
      {
        id: 'professional',
        icon: '🏢',
        title: 'Professional Communication',
        items: [
          'Negotiations and meetings',
          'Presentations and reports',
          'Customer service dialogues',
          'Contracts and agreements',
        ],
      },
      {
        id: 'particles',
        icon: '✨',
        title: 'Modal Particles',
        items: [
          'doch, ja, halt, eben, mal, eigentlich',
          'Nuance and tone (Das ist doch klar.)',
          'Particles in questions (Kommst du mit? → Kommst du mit mal?)',
        ],
      },
      {
        id: 'culture',
        icon: '🎭',
        title: 'Cultural References',
        items: [
          'Idioms and proverbs',
          'Historical and political references',
          'Dialect awareness',
        ],
      },
      {
        id: 'nominal-style',
        icon: '📝',
        title: 'Nominal Style & Nominalization',
        items: [
          'Nominalized verbs and adjectives',
          'Extended attributive participles',
          'Academic and formal register',
        ],
      },
      {
        id: 'connectors-b2',
        icon: '🔀',
        title: 'Advanced Connectors & Style',
        items: [
          'Nämlich, allerdings, dennoch, andernfalls',
          'Complex conjunctions (insofern, zumal, geschweige denn)',
          'Text coherence devices',
        ],
      },
      {
        id: 'argumentation',
        icon: '⚖️',
        title: 'Argumentation & Rhetoric',
        items: [
          'Structured arguments (These, Argument, Beispiel)',
          'Conceding and countering (Zwar … aber …)',
          'Emphasis and downplaying',
          'Persuasive language',
        ],
      },
    ],
    dialog: 'A: Dürfte ich kurz Ihre Meinung zu dem Vorschlag hören?\nB: Selbstverständlich. Also, grundsätzlich befürworte ich den Ansatz, allerdings habe ich doch einige Bedenken.\nA: Nämlich?\nB: Nun ja, die Kosten-Nutzen-Rechnung scheint mir noch nicht ganz ausgereift. Zwar wurden die Anfangsinvestitionen berücksichtigt, aber die laufenden Kosten sind meines Erachtens unterschätzt worden.\nA: Das ist ein berechtigter Einwand. Allerdings würde ich argumentieren, dass die langfristigen Einsparungen die höheren laufenden Kosten rechtfertigen.\nB: Wie hoch wären denn die Einsparungen Ihrer Schätzung nach genau?\nA: Nach unseren Berechnungen würden wir schon im dritten Jahr die Gewinnschwelle erreichen. Gestatten Sie mir, Ihnen die Details kurz anhand einer Grafik zu erläutern.',
  },
};

const fr: Record<Level, LevelCurriculum> = {
  A1: {
    level: 'A1',
    overview: 'Introduce yourself, order food, ask for directions, talk about everyday topics.',
    topics: [
      {
        id: 'greetings',
        icon: '👋',
        title: 'Greetings & Introductions',
        items: [
          'Bonjour / Au revoir, salut',
          'Introducing yourself (Je m\'appelle …, Je viens de …)',
          'Comment allez-vous ? Ça va ?',
          'Formal vs informal (tu vs vous)',
        ],
      },
      {
        id: 'numbers',
        icon: '🔢',
        title: 'Numbers & Counting',
        items: [
          'Numbers 0–100',
          'Age, phone numbers, prices',
          'French number quirks (70 = soixante-dix, 80 = quatre-vingts)',
        ],
      },
      {
        id: 'articles',
        icon: '📝',
        title: 'Articles & Nouns',
        items: [
          'Definite articles: le, la, l\', les',
          'Indefinite articles: un, une, des',
          'Noun genders and plural formation',
        ],
      },
      {
        id: 'present-tense',
        icon: '⚡',
        title: 'Present Tense (Présent)',
        items: [
          'Regular -er verb conjugation (parler → je parle)',
          'Être and avoir (Je suis, tu as)',
          'Regular -ir and -re verbs',
          'Common irregulars (faire, aller, pouvoir, vouloir)',
        ],
      },
      {
        id: 'negation',
        icon: '❌',
        title: 'Negation & Questions',
        items: [
          'ne … pas, ne … jamais, ne … rien',
          'Est-ce que questions',
          'Inversion questions (Parlez-vous français?)',
          'Question words (qui, que, où, quand, pourquoi)',
        ],
      },
      {
        id: 'family',
        icon: '👨‍👩‍👧',
        title: 'Family & People',
        items: [
          'Family members (mère, père, frère, sœur)',
          'Possessive adjectives (mon, ton, son, notre)',
          'Describing people (grand, petit, sympa, intelligent)',
        ],
      },
      {
        id: 'food',
        icon: '🍽️',
        title: 'Food & Drink',
        items: [
          'Common foods (pain, fromage, eau, vin)',
          'Ordering (Je voudrais …, L\'addition svp)',
          'French meal culture',
        ],
      },
      {
        id: 'daily',
        icon: '🕐',
        title: 'Daily Routine',
        items: [
          'Days, months, seasons',
          'Telling time (Il est trois heures, il est midi)',
          'Daily activities (se réveiller, manger, dormir)',
        ],
      },
    ],
  },
  A2: {
    level: 'A2',
    overview: 'Talk about past events, make plans, express preferences, handle shopping.',
    topics: [
      {
        id: 'passe-compose',
        icon: '⏮️',
        title: 'Passé Composé',
        items: [
          'Formation with avoir + participe passé',
          'Formation with être (DR MRS VANDERTRAMP verbs)',
          'Agreement of past participle',
          'Common irregular participles (pris, mis, fait, dit)',
        ],
      },
      {
        id: 'imparfait',
        icon: '🕰️',
        title: 'Imparfait',
        items: [
          'Formation and use (ongoing past, description)',
          'Passé composé vs imparfait distinction',
        ],
      },
      {
        id: 'futur',
        icon: '🔮',
        title: 'Futur (Proche & Simple)',
        items: [
          'Futur proche (aller + infinitive)',
          'Futur simple conjugations',
          'Making plans and predictions',
        ],
      },
      {
        id: 'pronouns',
        icon: '🔄',
        title: 'Object Pronouns',
        items: [
          'Direct object pronouns (me, te, le, la, nous, vous, les)',
          'Indirect object pronouns (me, te, lui, nous, vous, leur)',
          'Pronoun order in a sentence',
        ],
      },
      {
        id: 'shopping',
        icon: '🛍️',
        title: 'Shopping & Clothes',
        items: [
          'Clothing vocabulary',
          'Combien ça coûte ? Je peux essayer ?',
          'Au marché / en magasin',
        ],
      },
    ],
  },
  B1: {
    level: 'B1',
    overview: 'Discuss news, express opinions, handle complex situations.',
    topics: [
      {
        id: 'subjonctif',
        icon: '💭',
        title: 'Subjonctif',
        items: [
          'Subjonctif présent formation',
          'Uses (il faut que, bien que, pour que)',
          'Subjonctif vs indicatif',
        ],
      },
      {
        id: 'conditionnel',
        icon: '🔀',
        title: 'Conditionnel',
        items: [
          'Conditionnel présent (je voudrais, il faudrait)',
          'Si clauses (Si j\'avais, je ferais)',
          'Polite requests and wishes',
        ],
      },
      {
        id: 'passif',
        icon: '🔄',
        title: 'Passive Voice',
        items: [
          'Formation with être',
          'Agent introduction (par / de)',
        ],
      },
      {
        id: 'discours',
        icon: '🗣️',
        title: 'Reported Speech',
        items: [
          'Direct to indirect transformation',
          'Tense changes in reported speech',
        ],
      },
    ],
  },
  B2: {
    level: 'B2',
    overview: 'Express yourself fluently with nuance, handle professional situations.',
    topics: [
      {
        id: 'temps-complexes',
        icon: '⏳',
        title: 'Complex Tenses',
        items: [
          'Plus-que-parfait',
          'Passé simple (recognition)',
          'Conditionnel passé',
          'Subjonctif passé',
        ],
      },
      {
        id: 'literary',
        icon: '📚',
        title: 'Literary & Formal French',
        items: [
          'Passé simple in literature',
          'Subjonctif imparfait (recognition)',
          'Formal register and ne explétif',
        ],
      },
    ],
  },
};

export const curriculum: Record<LearnLanguage, Record<Level, LevelCurriculum>> = {
  de,
  fr,
  es: {
    A1: { level: 'A1', overview: 'Introduce yourself, order food, talk about everyday topics.', topics: [{ id: 'greetings', icon: '👋', title: 'Greetings & Introductions', items: ['Hola / Adiós, Buenos días', 'Introducing yourself (Me llamo …, Soy de …)', '¿Cómo estás? / ¿Qué tal?', 'Formal vs informal (tú vs usted)'] }, { id: 'present', icon: '⚡', title: 'Present Tense', items: ['Regular -ar, -er, -ir conjugations', 'Ser and estar', 'Tener, ir, hacer', 'Reflexive verbs (llamarse, levantarse)'] }, { id: 'articles', icon: '📝', title: 'Articles & Nouns', items: ['Definite: el, la, los, las', 'Indefinite: un, una, unos, unas', 'Noun genders and plurals'] }, { id: 'numbers', icon: '🔢', title: 'Numbers & Counting', items: ['Numbers 0–100', 'Age, time, prices'] }, { id: 'food', icon: '🍽️', title: 'Food & Drink', items: ['Common foods and tapas', 'Ordering (Quisiera …, La cuenta por favor)', 'Gustar and similar verbs'] }, { id: 'family', icon: '👨‍👩‍👧', title: 'Family & People', items: ['Family members', 'Possessives (mi, tu, su, nuestro)', 'Descriptions (alto, bajo, simpático)'] }] },
    A2: { level: 'A2', overview: 'Talk about past events, make plans, handle shopping.', topics: [{ id: 'preterit', icon: '⏮️', title: 'Preterite & Imperfect', items: ['Regular preterite conjugations', 'Irregular preterites (fui, dije, hice)', 'Imperfect vs preterite distinction', 'Common time markers (ayer, el año pasado)'] }, { id: 'future', icon: '🔮', title: 'Future & Conditional', items: ['Ir + a + infinitive (immediate future)', 'Future simple (hablaré, comeré)', 'Conditional (me gustaría, podría)'] }, { id: 'shopping', icon: '🛍️', title: 'Shopping & Clothes', items: ['Clothing vocabulary', '¿Cuánto cuesta?', 'Comparisons (más … que, tan … como)'] }, { id: 'health', icon: '🏥', title: 'Health & Body', items: ['Body parts', 'Symptoms (Me duele …)', 'At the pharmacy'] }] },
    B1: { level: 'B1', overview: 'Express opinions, discuss news, handle complex situations.', topics: [{ id: 'subjunctive', icon: '💭', title: 'Subjuntivo', items: ['Present subjunctive formation', 'Uses (espero que, ojalá, es importante que)', 'Subjunctive vs indicative'] }, { id: 'perfect', icon: '📜', title: 'Perfect Tenses', items: ['Present perfect (he hablado)', 'Pluscuamperfecto (había hablado)', 'Past participle agreement'] }, { id: 'passive', icon: '🔄', title: 'Passive & Impersonal', items: ['Ser + participle passive', 'Se impersonal (Se habla español)', 'Alternatives to passive'] }] },
    B2: { level: 'B2', overview: 'Argue fluently, understand nuances, professional communication.', topics: [{ id: 'complex', icon: '⏳', title: 'Complex Structures', items: ['Subjunctive imperfect & pluperfect', 'Si clauses (Si hubiera sabido …)', 'Relative clauses with prepositions'] }, { id: 'discourse', icon: '🗣️', title: 'Discourse & Style', items: ['Connectors (no obstante, por consiguiente)', 'Indirect speech', 'Professional register'] }] },
  },
  en: {
    A1: { level: 'A1', overview: 'Introduce yourself, order food, talk about everyday topics.', topics: [{ id: 'greetings', icon: '👋', title: 'Greetings & Introductions', items: ['Hello / Goodbye, Good morning', 'Introductions (My name is …, I\'m from …)', 'How are you?', 'Formal vs informal'] }, { id: 'present', icon: '⚡', title: 'Present Simple', items: ['Verb conjugation (I, you, he/she/it)', 'To be and to have', 'Present continuous (I am doing)'] }, { id: 'past', icon: '⏮️', title: 'Past Simple', items: ['Regular past (worked, played)', 'Common irregulars (went, ate, bought)', 'Yes/No and Wh questions in past'] }, { id: 'future', icon: '🔮', title: 'Future', items: ['Will vs going to', 'Present continuous for plans', 'Making predictions'] }, { id: 'food', icon: '🍽️', title: 'Food & Shopping', items: ['Food vocabulary', 'Ordering at a restaurant', 'Prices and shopping'] }] },
    A2: { level: 'A2', overview: 'Describe experiences, make plans, compare things.', topics: [{ id: 'perfect', icon: '⏳', title: 'Present Perfect', items: ['Present perfect form (have done)', 'Ever/never, yet/already, just', 'Present perfect vs past simple'] }, { id: 'comparison', icon: '📊', title: 'Comparatives & Superlatives', items: ['Comparative adjectives (-er, more)', 'Superlatives (-est, most)', 'Irregulars (good/better/best)', 'As … as, not as … as'] }, { id: 'modals', icon: '🔧', title: 'Modal Verbs', items: ['Can/could, must, should', 'Polite requests (Could you …?)', 'Expressing obligation and necessity'] }] },
    B1: { level: 'B1', overview: 'Express opinions, discuss abstract topics, handle work situations.', topics: [{ id: 'conditionals', icon: '💭', title: 'Conditionals', items: ['Zero, first, second conditionals', 'Third conditional (If I had known)', 'Mixed conditionals'] }, { id: 'passive', icon: '🔄', title: 'Passive Voice', items: ['Passive in all tenses (is done, was made)', 'By + agent', 'Have/get something done'] }, { id: 'reported', icon: '🗣️', title: 'Reported Speech', items: ['Tense shifts in reported speech', 'Reported questions', 'Reporting verbs (said, told, asked)'] }] },
    B2: { level: 'B2', overview: 'Argue effectively, understand nuance, professional fluency.', topics: [{ id: 'subjunctive', icon: '💭', title: 'Subjunctive & Inversion', items: ['Subjunctive (I suggest that he be)', 'Inversion for emphasis (Never have I …)', 'Fronting and cleft sentences'] }, { id: 'collocation', icon: '🧩', title: 'Collocations & Idioms', items: ['Common collocations (make a decision)', 'Idiomatic expressions', 'Phrasal verbs in depth'] }, { id: 'discourse', icon: '📝', title: 'Discourse & Cohesion', items: ['Connectors (nevertheless, furthermore)', 'Referencing and substitution', 'Academic register'] }] },
  },
  ar: {
    A1: { level: 'A1', overview: 'Introduce yourself, greet, understand basic phrases.', topics: [{ id: 'greetings', icon: '👋', title: 'Greetings & Introductions', items: ['السلام عليكم / مع السلامة', 'Introductions (اسمي …، أنا من …)', 'How are you? (كيف حالك؟)', 'Formal vs informal address'] }, { id: 'alphabet', icon: '🔤', title: 'Alphabet & Writing', items: ['Arabic alphabet (28 letters)', 'Letter forms (initial, medial, final, isolated)', 'Writing from right to left'] }, { id: 'articles', icon: '📝', title: 'Nouns & Articles', items: ['Definite article (الـ)', 'Sun and moon letters', 'Noun gender (masculine / feminine)', 'Dual form'] }, { id: 'present', icon: '⚡', title: 'Present Tense', items: ['Verb conjugation patterns', 'Root system (3-letter roots)', 'Common verbs (أكل، شرب، ذهب)'] }, { id: 'numbers', icon: '🔢', title: 'Numbers & Counting', items: ['Numbers 1–100', 'Gender agreement of numbers', 'Prices and quantities'] }] },
    A2: { level: 'A2', overview: 'Talk about daily life, past events, make plans.', topics: [{ id: 'past', icon: '⏮️', title: 'Past Tense', items: ['Perfect tense conjugation', 'Common past verbs', 'Past negation', 'Past continuous (كان + present)'] }, { id: 'sentences', icon: '📝', title: 'Sentence Structure', items: ['Nominal sentences (الجملة الاسمية)', 'Verbal sentences (الجملة الفعلية)', 'Subject-verb agreement'] }, { id: 'prepositions', icon: '📍', title: 'Prepositions & Connectors', items: ['Common prepositions (في، على، من، إلى)', 'Connectors (و، ثم، لكن، لأن)'] }] },
    B1: { level: 'B1', overview: 'Express opinions, discuss news, handle complex topics.', topics: [{ id: 'morphology', icon: '🧩', title: 'Verb Morphology', items: ['Verb forms (الأوزان)', 'Root patterns', 'Derived forms I–X', 'Augmented verbs'] }, { id: 'cases', icon: '📋', title: 'Noun Cases & I\'rab', items: ['Nominative, accusative, genitive', 'Case endings (الضمة، الفتحة، الكسرة)', 'Definite and indefinite case'] }] },
    B2: { level: 'B2', overview: 'Read literature, argue fluently, professional communication.', topics: [{ id: 'rhetoric', icon: '🎭', title: 'Rhetoric & Style', items: ['Metaphor and imagery', 'Arabic idioms', 'Formal vs colloquial'] }, { id: 'literature', icon: '📚', title: 'Literature & Media', items: ['Reading news articles', 'Classical vs Modern Standard Arabic', 'Arabic poetry basics'] }] },
  },
};

export function getCurriculum(lang: LearnLanguage, level: Level): LevelCurriculum {
  return curriculum[lang]?.[level] || curriculum.de[level];
}
