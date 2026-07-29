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
    overview: 'Introduce yourself, order in a restaurant, ask for directions, talk about daily life, understand basic phrases.',
    topics: [
      {
        id: 'greetings',
        icon: '👋',
        title: 'Greetings & Introductions',
        items: [
          'Hello / Goodbye (Hallo, Tschüss, Auf Wiedersehen, Servus)',
          'Time-based greetings (Guten Morgen, Guten Tag, Guten Abend, Gute Nacht)',
          'Introducing yourself (Ich heiße …, Mein Name ist …, Ich komme aus …)',
          'How are you? (Wie geht es dir? / Wie geht es Ihnen?)',
          'Responses (Mir geht es gut, Es geht, Schlecht)',
          'Asking for names (Wie heißt du? / Wie ist Ihr Name?)',
          'Where are you from? (Woher kommst du? / Woher kommen Sie?)',
          'Formal vs informal (du vs Sie)',
        ],
      },
      {
        id: 'numbers',
        icon: '🔢',
        title: 'Numbers & Counting',
        items: [
          'Numbers 0–20 (null, eins, zwei, drei … zwanzig)',
          'Numbers 21–100 (einundzwanzig, zweiunddreißig …)',
          'Numbers 100–1,000,000 (hundert, tausend, Million)',
          'Talking about age (Ich bin … Jahre alt)',
          'Phone numbers (reading digit by digit)',
          'Prices and money (Euro, Cent)',
          'Ordinal numbers (erste, zweite, dritte …)',
        ],
      },
      {
        id: 'articles',
        icon: '📝',
        title: 'Articles & Noun Gender',
        items: [
          'Definite articles: der (masculine), die (feminine), das (neuter), die (plural)',
          'Indefinite articles: ein (masculine/neuter), eine (feminine)',
          'Negative article: kein, keine',
          'Noun gender patterns (masculine: -er, -ig, -ling; feminine: -ung, -heit, -keit, -schaft; neuter: -chen, -lein, -ment)',
          'Plural formation (-e, -er, -en, -s, umlaut + e)',
          'Compound nouns (der Tisch + das Bein = das Tischbein)',
          'Nominative case (subject: der/ein Mann, die/eine Frau, das/ein Kind)',
        ],
      },
      {
        id: 'present-tense',
        icon: '⚡',
        title: 'Present Tense (Präsens)',
        items: [
          'Regular verb conjugation (spielen: ich spiele, du spielst, er/sie/es spielt, wir spielen, ihr spielt, sie/Sie spielen)',
          'Verb stem changes: e → i/ie (essen: du isst, er isst; sehen: du siehst, er sieht)',
          'Verb stem changes: a → ä (fahren: du fährst, er fährt; schlafen: du schläfst)',
          'Sein (ich bin, du bist, er ist, wir sind, ihr seid, sie sind)',
          'Haben (ich habe, du hast, er hat, wir haben, ihr habt, sie haben)',
          'Werden (ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden)',
          'Separable prefix verbs (einkaufen: ich kaufe ein, du kaufst ein)',
          'Verb position: main verb second position in main clauses',
        ],
      },
      {
        id: 'questions',
        icon: '❓',
        title: 'Questions & Negation',
        items: [
          'W-questions: wer (who), was (what), wo (where), wann (when)',
          'W-questions: warum (why), wie (how), woher (where from), wohin (where to)',
          'Yes/No questions (Kommst du? Ist das ein Buch? Hast du Hunger?)',
          'Negation with nicht (Ich komme nicht, Das ist nicht gut)',
          'Negation with kein/keine (Ich habe kein Auto, Er hat keine Zeit)',
          'Position of nicht (at the end, or before what is negated)',
        ],
      },
      {
        id: 'family',
        icon: '👨‍👩‍👧',
        title: 'Family & People',
        items: [
          'Family members (Mutter, Vater, Bruder, Schwester, Oma, Opa)',
          'Extended family (Onkel, Tante, Cousin, Cousine, Großeltern)',
          'Possessive articles (mein, dein, sein, ihr, unser, euer, Ihr)',
          'Possessive in nominative (mein Vater, deine Mutter, sein Bruder)',
          'Describing people (groß, klein, jung, alt, nett, freundlich, lustig)',
          'Professions (der Arzt, die Lehrerin, der Ingenieur, der Student)',
          'Marital status (ledig, verheiratet, geschieden)',
        ],
      },
      {
        id: 'food',
        icon: '🍽️',
        title: 'Food, Drink & Restaurant',
        items: [
          'Common foods (das Brot, die Milch, der Käse, das Obst, das Gemüse)',
          'Beverages (das Wasser, der Kaffee, der Tee, der Saft, das Bier)',
          'Meals (das Frühstück, das Mittagessen, das Abendessen)',
          'Ordering at a restaurant (Ich möchte …, Ich hätte gern …, Für mich bitte …)',
          'The bill (Die Rechnung, bitte! Zahlen, bitte!)',
          'Grocery shopping (Was kostet das? Das ist zu teuer. Haben Sie …?)',
          'Quantities (ein Kilo, ein Liter, ein Pfund, ein Stück)',
          'German food culture (Brotzeit, Frühstück, Kaffee und Kuchen)',
        ],
      },
      {
        id: 'daily',
        icon: '🕐',
        title: 'Daily Routine & Time',
        items: [
          'Days of the week (Montag, Dienstag, Mittwoch, Donnerstag, Freitag, Samstag/Sonnabend, Sonntag)',
          'Months (Januar, Februar, März … Dezember)',
          'Seasons (der Frühling, der Sommer, der Herbst, der Winter)',
          'Telling time: full hour (Es ist drei Uhr, Es ist zwölf Uhr)',
          'Telling time: half and quarter (Es ist halb zehn, Viertel nach, Viertel vor)',
          'Telling time: minutes (Es ist zehn nach drei, Es ist zwanzig vor vier)',
          'Daily activities (aufstehen, frühstücken, zur Arbeit gehen, essen, schlafen)',
          'Frequency adverbs (immer, oft, manchmal, selten, nie, jeden Tag)',
          'Dates (Der wievielte ist heute? Heute ist der 14. März)',
        ],
      },
      {
        id: 'accusative',
        icon: '🎯',
        title: 'Accusative Case',
        items: [
          'Accusative articles: den (masculine), die (feminine), das (neuter), die (plural)',
          'Indefinite accusative: einen (masculine), eine (feminine), ein (neuter)',
          'Negative accusative: keinen, keine',
          'Common accusative verbs (haben, essen, trinken, sehen, hören, kaufen, brauchen)',
          'Accusative prepositions: durch, für, gegen, ohne, um, bis, entlang',
          'Personal pronouns in accusative (mich, dich, ihn, sie, es, uns, euch, sie/Sie)',
        ],
      },
      {
        id: 'hobbies',
        icon: '🎮',
        title: 'Hobbies, Sports & Free Time',
        items: [
          'Common hobbies (lesen, Musik hören, Filme sehen, reisen, kochen)',
          'Sports (Fußball spielen, Schwimmen gehen, Fahrrad fahren, Tennis spielen)',
          'Like/dislike (Ich mag …, Ich spiele gern …, Ich tanze nicht gern)',
          'Preferences (lieber, am liebsten: Ich spiele lieber Fußball)',
          'Invitations (Hast du Lust …? Möchtest du …? Wollen wir …?)',
          'Accepting (Ja, gern! Das klingt gut! Klar!)',
          'Declining (Tut mir leid, ich habe keine Zeit. Vielleicht ein andermal.)',
        ],
      },
      {
        id: 'travel',
        icon: '🧭',
        title: 'Travel, Directions & Transport',
        items: [
          'Directions (links, rechts, geradeaus, an der Ampel, um die Ecke)',
          'Places in town (der Bahnhof, der Supermarkt, die Kirche, die Apotheke)',
          'Asking for and giving directions (Entschuldigung, wo ist …? Gehen Sie geradeaus …)',
          'Public transport (der Bus, die U-Bahn, der Zug, das Taxi, die Straßenbahn)',
          'Buying tickets (Eine Fahrkarte nach Berlin, bitte. Hin und zurück?)',
          'At the hotel (Ich habe ein Zimmer reserviert. Wie viel kostet die Nacht?)',
          'Asking for help (Können Sie mir helfen? Ich habe mich verlaufen.)',
        ],
      },
      {
        id: 'colors',
        icon: '🎨',
        title: 'Colors, Adjectives & Descriptions',
        items: [
          'Basic colors (rot, blau, grün, gelb, schwarz, weiß, braun, orange, lila, grau)',
          'Opposite adjectives (groß/klein, alt/neu, teuer/billig, lang/kurz)',
          'Simple descriptions (Das Haus ist groß. Der Hund ist klein.)',
          'Es ist + adjective (Es ist kalt, Es ist warm, Es ist schön)',
          'Adjective after sein (Das Buch ist interessant, Die Stadt ist schön)',
          'Good/bad (gut, schlecht, toll, schrecklich, langweilig)',
        ],
      },
      {
        id: 'dative-a1',
        icon: '🎭',
        title: 'Dative Case (Introduction)',
        items: [
          'Dative articles: dem (masculine/neuter), der (feminine), den + n (plural)',
          'Common dative verbs (helfen, danken, gefallen, gehören, antworten)',
          'Dative prepositions: aus, bei, mit, nach, seit, von, zu',
          'Contractions: zum (zu + dem), zur (zu + der), beim (bei + dem)',
          'Personal pronouns in dative (mir, dir, ihm, ihr, uns, euch, ihnen/Ihnen)',
        ],
      },
      {
        id: 'modal-a1',
        icon: '🔧',
        title: 'Modal Verbs (Introduction)',
        items: [
          'können (can): ich kann, du kannst, er kann, wir können, ihr könnt, sie können',
          'müssen (must): ich muss, du musst, er muss, wir müssen, ihr müsst, sie müssen',
          'mögen/möchten (like/would like): ich mag/möchte, du magst/möchtest …',
          'Sentence structure with modals: Ich kann Deutsch sprechen.',
          'Polite requests: Ich möchte bitte …, Könnten Sie mir helfen?',
        ],
      },
      {
        id: 'culture-a1',
        icon: '🇩🇪',
        title: 'German-Speaking Countries & Culture',
        items: [
          'Countries: Deutschland, Österreich, die Schweiz, Liechtenstein, Luxemburg',
          'Cities: Berlin, München, Hamburg, Wien, Zürich, Köln, Frankfurt',
          'Common customs: Handshake, Sie vs du, punctuality',
          'German holidays: Weihnachten, Ostern, Neujahr, Tag der Deutschen Einheit',
          'Typical food: Bratwurst, Sauerkraut, Brezel, Schwarzwälder Kirschtorte',
          'Getting around: Deutsche Bahn, Autobahn, Fahrradkultur',
        ],
      },
    ],
    dialog: 'A: Hallo! Ich heiße Anna. Wie heißt du?\nB: Hallo Anna! Ich bin Tom.\nA: Freut mich! Woher kommst du, Tom?\nB: Ich komme aus Frankreich. Und du?\nA: Ich komme aus Deutschland. Wohnst du auch hier?\nB: Ja, ich wohne in der Goethestraße. Und du?\nA: Ich wohne hier in der Nähe. Magst du Fußball?\nB: Ja, sehr gern! Spielst du auch?\nA: Ja, ich spiele jeden Samstag. Komm doch mal vorbei!\nB: Gern! Hast du morgen Zeit?\nA: Ja, morgen um drei Uhr? Ich warte am Eingang.\nB: Perfekt! Bis morgen!',
  },

  A2: {
    level: 'A2',
    overview: 'Talk about past events, make appointments, describe people and places, handle everyday situations independently.',
    topics: [
      {
        id: 'perfekt',
        icon: '⏮️',
        title: 'Past Tense (Perfekt)',
        items: [
          'Formation with haben + Partizip II (Ich habe gegessen)',
          'Formation with sein + Partizip II (movement/change: Ich bin gefahren)',
          'Regular participles: ge + stem + t (gemacht, gespielt, gekauft)',
          'Irregular participles: ge + stem (changed) + en (gegessen, getrunken, gefunden)',
          'Separable prefix verbs: eingekauft, aufgestanden, mitgenommen',
          'Inseparable prefix verbs: bezahlt, verstanden, erzählt (no ge-)',
          'Verbs ending in -ieren: studiert, fotografiert (no ge-)',
          'Haben vs sein selection (sein for movement and state change)',
          'Word order in Perfekt sentences',
        ],
      },
      {
        id: 'modal-verbs',
        icon: '🔧',
        title: 'Modal Verbs (Full)',
        items: [
          'können (ability): Ich kann gut kochen',
          'müssen (obligation): Ich muss heute arbeiten',
          'wollen (want): Ich will Deutsch lernen',
          'dürfen (permission): Hier darf man nicht rauchen',
          'sollen (should): Du sollst mehr trinken',
          'mögen (like): Ich mag Schokolade',
          'Word order: modal at position 2, infinitive at the end',
          'Past tense of modals (Präteritum): konnte, musste, wollte, durfte, sollte',
          'Objective vs subjective meaning (sollen: have been told)',
        ],
      },
      {
        id: 'preterit',
        icon: '📜',
        title: 'Präteritum (Simple Past)',
        items: [
          'Präteritum of sein (ich war, du warst, er war, wir waren, ihr wart, sie waren)',
          'Präteritum of haben (ich hatte, du hattest, er hatte, wir hatten, ihr hattet, sie hatten)',
          'Präteritum of werden (ich wurde, du wurdest, er wurde)',
          'Präteritum of modal verbs (konnte, musste, wollte, durfte, sollte, mochte)',
          'When to use Präteritum vs Perfekt (Präteritum: formal/written, sein/haben/modals in speech)',
        ],
      },
      {
        id: 'prepositions',
        icon: '📍',
        title: 'Prepositions (Dative, Accusative, Two-Way)',
        items: [
          'Dative prepositions: aus (from), bei (at/near), mit (with)',
          'Dative prepositions: nach (to/after), seit (since), von (from/of), zu (to)',
          'Two-way prepositions (Wechselpräpositionen): in, auf, unter, über, vor, zwischen',
          'Two-way: Accusative for movement (Wohin?), Dative for location (Wo?)',
          'Accusative prepositions: durch, für, gegen, ohne, um',
          'Contractions: im (in + dem), am (an + dem), ins (in + das), ans (an + das)',
          'Common prepositional phrases (mit dem Bus, in der Stadt, auf dem Tisch)',
        ],
      },
      {
        id: 'dative',
        icon: '🎭',
        title: 'Dative Case (Full)',
        items: [
          'Dative definite articles: dem Mann, der Frau, dem Kind, den Kindern',
          'Dative indefinite articles: einem Mann, einer Frau, einem Kind',
          'Dative verb list (helfen, danken, gefallen, gehören, schmecken, passen)',
          'Dative verb list (gratulieren, zuhören, vertrauen, verzeihen)',
          'Dative personal pronouns (mir, dir, ihm, ihr, uns, euch, ihnen)',
          'Dative after adjectives (mir ist kalt, mir ist langweilig)',
          'Dative for possession (mir tut der Kopf weh, das Buch gehört mir)',
        ],
      },
      {
        id: 'clothing',
        icon: '👔',
        title: 'Clothing, Shopping & Fashion',
        items: [
          'Clothing vocabulary (das Hemd, die Hose, das Kleid, der Anzug, die Jacke)',
          'Shoes and accessories (die Schuhe, der Gürtel, die Tasche, die Uhr)',
          'Shopping dialogues (Was kostet das? Haben Sie das in Größe 40?)',
          'Colors and patterns (gestreift, kariert, gepunktet, einfarbig)',
          'Sizes (Klein, Mittel, Groß, XS–XXL; Schuhgröße 38)',
          'Trying on (Kann ich das anprobieren? Wo ist die Umkleidekabine?)',
          'Paying (Bar oder mit Karte? Kann ich mit Karte zahlen?)',
          'Returns and exchanges (Ich möchte das zurückgeben. Es passt nicht.)',
        ],
      },
      {
        id: 'health',
        icon: '🏥',
        title: 'Health, Body & Doctor',
        items: [
          'Body parts (der Kopf, der Arm, der Bauch, das Bein, die Hand, der Fuß)',
          'Common symptoms (Ich habe Kopfschmerzen, Mir ist übel, Ich fühle mich schwach)',
          'Illnesses (die Grippe, die Erkältung, der Schnupfen, der Husten)',
          'At the doctor (Wo tut es weh? Seit wann haben Sie das? Haben Sie Fieber?)',
          'At the pharmacy (Ich brauche etwas gegen Halsschmerzen)',
          'Making a doctor appointment (Ich möchte einen Termin beim Arzt)',
          'Emergency phrases (Hilfe! Ich brauche einen Arzt! Rufen Sie den Krankenwagen!)',
        ],
      },
      {
        id: 'comparison',
        icon: '📊',
        title: 'Comparisons & Superlatives',
        items: [
          'Comparative formation: adjective + -er (schnell → schneller, klein → kleiner)',
          'Comparative with Umlaut (groß → größer, alt → älter, stark → stärker)',
          'Superlative: am + adjective + -(e)sten (am schnellsten, am größten)',
          'Superlative: der/die/das + adjective + -ste (der schnellste Zug)',
          'Irregular forms: gut → besser → am besten; gern → lieber → am liebsten',
          'Irregular forms: viel → mehr → am meisten; hoch → höher → am höchsten',
          'als vs wie (Er ist größer als ich. Er ist so groß wie ich.)',
          'je … desto (Je mehr ich lerne, desto besser verstehe ich.)',
        ],
      },
      {
        id: 'imperative',
        icon: '📢',
        title: 'Commands, Requests & Advice',
        items: [
          'Imperative du form (Komm! Geh! Iss! Fahr! Sei ruhig!)',
          'Imperative ihr form (Kommt! Geht! Esst! Seid ruhig!)',
          'Imperative Sie form (Kommen Sie! Gehen Sie! Seien Sie ruhig!)',
          'Negative commands (Komm nicht zu spät! Machen Sie sich keine Sorgen!)',
          'Polite requests with Konjunktiv II (Würden Sie …? Könnten Sie …?)',
          'Giving advice (Du solltest zum Arzt gehen. Sie sollten mehr schlafen.)',
          'Suggestions (Lass uns ins Kino gehen! Wie wäre es mit einem Spaziergang?)',
        ],
      },
      {
        id: 'appointments',
        icon: '📅',
        title: 'Appointments, Plans & Future',
        items: [
          'Making appointments (Hast du am Montag Zeit? Passt es dir um drei Uhr?)',
          'Accepting and declining (Ja, das passt. Leider habe ich schon was vor.)',
          'Talking about plans: Präsens with future meaning (Morgen fliege ich nach Berlin)',
          'Werden + Infinitive (future: Ich werde morgen kommen)',
          'Time expressions (heute, morgen, übermorgen, nächste Woche, nächstes Jahr)',
          'Invitations and responses',
        ],
      },
      {
        id: 'work',
        icon: '💼',
        title: 'Work, School & Daily Life',
        items: [
          'Job vocabulary (der Arzt, die Lehrerin, der Ingenieur, der Verkäufer)',
          'Workplace dialogues (Wo arbeiten Sie? Was machen Sie beruflich?)',
          'School subjects (Mathe, Deutsch, Geschichte, Biologie)',
          'Talking about your daily schedule (Um 8 Uhr beginnt die Arbeit)',
          'Applying for a job (die Bewerbung, der Lebenslauf, das Vorstellungsgespräch)',
          'Common office items (der Computer, das Telefon, der Schreibtisch)',
        ],
      },
      {
        id: 'connectors-a2',
        icon: '🔗',
        title: 'Simple Connectors & Sentence Linking',
        items: [
          'Coordinating conjunctions: und (and), oder (or), aber (but), denn (because)',
          'Position: 0 position (verb remains at position 2)',
          'Connectors with inversion: deshalb (therefore), dann (then), trotzdem (nevertheless)',
          'Time connectors: zuerst, dann, danach, später, endlich',
          'Sentence linking with und, oder, aber, denn',
        ],
      },
      {
        id: 'reflexive',
        icon: '🔄',
        title: 'Reflexive Verbs',
        items: [
          'Common reflexive verbs: sich waschen, sich anziehen, sich setzen',
          'Reflexive pronoun in accusative (mich, dich, sich, uns, euch, sich)',
          'Reflexive pronoun in dative (mir, dir, sich, uns, euch, sich)',
          'Difference: Ich wasche mich (acc) vs Ich wasche mir die Hände (dat)',
          'Daily routine with reflexives (sich duschen, sich rasieren, sich kämmen)',
        ],
      },
    ],
    dialog: 'A: Guten Tag! Kann ich Ihnen helfen?\nB: Ja, ich suche eine Hose.\nA: Welche Größe haben Sie?\nB: Größe 40. Haben Sie die in Blau?\nA: Ja, hier ist eine blaue. Möchten Sie sie anprobieren?\nB: Gern. Wo ist die Umkleidekabine?\nA: Da hinten links. Sagen Sie Bescheid, wenn Sie Hilfe brauchen!\nB: Danke! … Sie passt perfekt! Ich nehme sie.\nA: Das macht dann 39,90 Euro. Zahlen Sie bar oder mit Karte?\nB: Mit Karte, bitte.\nA: Bitte sehr, Ihre Karte. Einen schönen Tag noch!\nB: Danke, gleichfalls!',
  },

  B1: {
    level: 'B1',
    overview: 'Discuss news and media, express opinions, write formal letters, handle complex situations independently and fluently.',
    topics: [
      {
        id: 'perfekt-b1',
        icon: '⏮️',
        title: 'Präteritum, Perfekt & Plusquamperfekt',
        items: [
          'Präteritum of strong verbs (ich ging, er fuhr, sie kam, wir sahen)',
          'Präteritum of mixed verbs (ich dachte, er brachte, sie kannte)',
          'Plusquamperfekt: hatten/waren + Partizip II (Ich hatte gearbeitet, war gefahren)',
          'Past perfect: Nachdem ich gegessen hatte, ging ich spazieren',
          'Temporal sequence with nachdem, bevor, als',
        ],
      },
      {
        id: 'konjunktiv',
        icon: '💭',
        title: 'Konjunktiv II (Subjunctive)',
        items: [
          'Formation: würde + infinitive (Ich würde gern nach Berlin fahren)',
          'Formation of strong verbs (hätte, wäre, wüsste, ginge, käme, ließe)',
          'Formation of modal verbs (könnte, müsste, dürfte, sollte, wollte)',
          'Polite requests (Könnte ich bitte …? Würden Sie mir helfen?)',
          'Hypothetical situations (Wenn ich Zeit hätte, würde ich reisen)',
          'Unreal wishes (Ich wünschte, ich wäre reich / hätte mehr Zeit)',
          'Giving advice (An deiner Stelle würde ich …)',
          'Compared with als ob (Er tut so, als ob er krank wäre)',
        ],
      },
      {
        id: 'passive',
        icon: '🔄',
        title: 'Passive Voice',
        items: [
          'Vorgangspassiv (process): werden + Partizip II (Das Buch wird gelesen)',
          'Zustandspassiv (state): sein + Partizip II (Das Buch ist gelesen)',
          'Passive with modal verbs: Das muss gemacht werden',
          'Impersonal passive: Es wird getanzt, Es wird viel gelacht',
          'Agent with von (person) / durch (thing): von mir, durch den Regen',
          'Passive in different tenses (Präsens, Präteritum, Perfekt, Futur)',
          'Alternatives to passive: man, sich lassen, sein + zu + Infinitiv',
        ],
      },
      {
        id: 'nebensatz',
        icon: '🧩',
        title: 'Subordinate Clauses (Nebensätze)',
        items: [
          'dass clauses: Ich weiß, dass du Recht hast',
          'weil / da (reason): Ich bin müde, weil ich wenig geschlafen habe',
          'obwohl (concession): Obwohl es regnet, gehe ich spazieren',
          'wenn (conditional/time): Wenn ich Zeit habe, komme ich mit',
          'als / während / bis / seitdem (time clauses)',
          'damit / um … zu (purpose): Ich lerne Deutsch, um in Berlin zu arbeiten',
          'Word order: verb at the end of subordinate clause',
          'Subordinate + main clause: verb position after the comma',
        ],
      },
      {
        id: 'relativ',
        icon: '🔍',
        title: 'Relative Clauses (Relativsätze)',
        items: [
          'Relative pronouns in nominative (der, die, das, die)',
          'Relative pronouns in accusative (den, die, das, die)',
          'Relative pronouns in dative (dem, der, dem, denen)',
          'Relative pronouns with prepositions (mit dem, auf der, für die)',
          'wo / was as relative pronouns (Alles, was ich weiß …)',
          'Non-essential vs essential relative clauses (commas)',
        ],
      },
      {
        id: 'adjective-declension',
        icon: '📋',
        title: 'Adjective Declension (Adjektivdeklination)',
        items: [
          'Weak declension: after der/die/das (der gute Mann, die schöne Frau)',
          'Strong declension: no article before (guter Wein, schönes Wetter)',
          'Mixed declension: after ein/mein/kein (ein guter Mann, keine schöne Frau)',
          'Adjective declension in nominative, accusative, dative, genitive',
          'Adjectives after quantity words (viele, einige, mehrere, alle)',
          'Adjectives without article in plural (gute Freunde, alte Häuser)',
        ],
      },
      {
        id: 'nominalization',
        icon: '📄',
        title: 'Nominalization & Compound Words',
        items: [
          'Verb → noun: lesen → das Lesen, schreiben → das Schreiben',
          'Adjective → noun: gut → das Gute, krank → der/die Kranke',
          'Compound nouns: die Hausaufgabe, der Führerschein, das Krankenhaus',
          'Genitive case: der Name des Mannes, das Haus meiner Mutter',
          'Genitive prepositions: wegen, während, trotz, statt, aufgrund',
          'N-Declension: der Junge → den Jungen, der Herr → den Herrn',
          'Genitive with von as alternative (das Buch von meinem Vater)',
        ],
      },
      {
        id: 'media',
        icon: '📰',
        title: 'News, Media & Opinion',
        items: [
          'Discussing news articles (Hast du die Nachrichten gehört?)',
          'Expressing opinions (Meiner Meinung nach …, Ich finde …, Ich glaube …)',
          'Agreeing and disagreeing (Da stimme ich dir zu. Das sehe ich anders.)',
          'Reporting what others said (Er sagte, dass … Sie hat erzählt …)',
          'Discussing media (das Internet, die Zeitung, der Fernseher, soziale Medien)',
          'Argument structure: These – Argument – Beispiel',
        ],
      },
      {
        id: 'connectors-b1',
        icon: '🧩',
        title: 'Advanced Connectors & Discourse Markers',
        items: [
          'trotzdem (nevertheless), außerdem (furthermore), allerdings (however)',
          'jedenfalls (anyway), übrigens (by the way), nämlich (namely/you see)',
          'zwar … aber (admittedly … but), entweder … oder (either … or)',
          'weder … noch (neither … nor), nicht nur … sondern auch (not only … but also)',
          'je … desto (the … the: Je mehr ich übe, desto besser werde ich)',
          'Text coherence devices (zunächst, abschließend, zusammenfassend)',
        ],
      },
      {
        id: 'writing',
        icon: '✉️',
        title: 'Formal Writing & Communication',
        items: [
          'Formal letter structure (Betreff, Anrede, Einleitung, Hauptteil, Schluss)',
          'Job application (die Bewerbung: Anschreiben, Lebenslauf, Zeugnisse)',
          'Complaints (Ich möchte mich beschweren … Leider muss ich reklamieren …)',
          'Inquiries (Ich bitte um Informationen … Könnten Sie mir mitteilen …?)',
          'Email vs letter register differences',
          'Formal closing formulas (Mit freundlichen Grüßen, Hochachtungsvoll)',
        ],
      },
      {
        id: 'culture-b1',
        icon: '🏛️',
        title: 'Society & Cultural Topics',
        items: [
          'German political system (Bundestag, Bundesrat, Kanzler/in)',
          'Environmental topics (Umweltschutz, erneuerbare Energie, Klimawandel)',
          'Education system (Grundschule, Gymnasium, Universität, Ausbildung)',
          'German reunification (die Wiedervereinigung, Mauerfall 1989)',
          'Cultural events (Oktoberfest, Karneval, Berlinale, Buchmesse)',
        ],
      },
    ],
    dialog: 'A: Hast du die Nachrichten heute gehört?\nB: Ja, es war ja viel los. Die Regierung hat neue Klimaziele angekündigt.\nA: Meiner Meinung nach ist das längst überfällig, obwohl die Maßnahmen meines Erachtens nicht weit genug gehen.\nB: Da stimme ich dir zu. Wenn wir früher angefangen hätten, wären wir jetzt weiter.\nA: Genau. Übrigens, was würdest du tun, wenn du Umweltminister wärst?\nB: Also, ich würde erneuerbare Energien viel stärker fördern und gleichzeitig den öffentlichen Nahverkehr ausbauen. Was hältst du davon?\nA: Das finde ich auch. Außerdem sollte man mehr in die Forschung investieren, damit neue Technologien schneller entwickelt werden.\nB: Ja, je besser die Alternativen sind, desto eher werden die Leute umsteigen.\nA: Eben. Allerdings frage ich mich, ob die Bevölkerung wirklich bereit ist für so große Veränderungen.\nB: Das ist ein guter Punkt. Man müsste die Leute mehr informieren und mitnehmen.',
  },

  B2: {
    level: 'B2',
    overview: 'Express yourself fluently and precisely, argue professionally, understand nuances, read challenging texts, write sophisticated essays.',
    topics: [
      {
        id: 'complex-tenses',
        icon: '⏳',
        title: 'Complex Tenses & Structures',
        items: [
          'Futur II: Ich werde gearbeitet haben (future perfect)',
          'Konjunktiv I: Er habe gesagt, sie sei gekommen (indirect speech)',
          'Double infinitive: Ich habe ihn kommen sehen, Er hat singen können',
          'Double infinitive with modals: Das hätte ich machen müssen',
          'Passive with double infinitive: Das hätte gemacht werden müssen',
        ],
      },
      {
        id: 'subjunctive-i',
        icon: '🗣️',
        title: 'Indirect Speech & Konjunktiv I',
        items: [
          'Formation of Konjunktiv I (er gehe, sie habe, er sei, sie würden)',
          'Konjunktiv I for reported speech (Sie sagt, er komme morgen)',
          'Substitution with Konjunktiv II when forms are identical',
          'Reported questions (Er fragte, ob ich kommen würde)',
          'Reported commands (Sie sagte, ich solle warten)',
          'News reporting register (laut, angeblich, dem Vernehmen nach)',
        ],
      },
      {
        id: 'word-order',
        icon: '🔄',
        title: 'Word Order & Stylistic Variation',
        items: [
          'Emphatic fronting (Gestern bin ich … ; Nie wieder werde ich …)',
          'Inversion after adverbials at position 1',
          'TEKAMOLO rule: temporal, kausal, modal, lokal ordering',
          'Complex sentences with multiple subordinate clauses',
          'Ausklammerung (bracketing exceptions for emphasis)',
          'Left and right dislocation (Den Peter, den kenne ich schon lange)',
        ],
      },
      {
        id: 'particles',
        icon: '✨',
        title: 'Modal Particles (Modalpartikeln)',
        items: [
          'doch (emphasis: Das ist doch klar!)',
          'ja (known info: Das ist ja interessant)',
          'halt/eben (just the way it is: Das ist halt so)',
          'mal (casual request: Komm mal her!)',
          'eigentlich (actually: Was machst du eigentlich?)',
          'denn (interest in yes/no questions: Was ist denn los?)',
          'wohl (assumption: Er wird wohl krank sein)',
          'Particles in different contexts and registers',
        ],
      },
      {
        id: 'abstract',
        icon: '🧠',
        title: 'Abstract Topics & Argumentation',
        items: [
          'Stating claims and supporting with evidence',
          'Conjecture expressions: dürfte, scheint, angeblich, vermutlich, offenbar',
          'Expressing doubt and certainty (Ich bezweifle, dass … Es ist fraglich, ob …)',
          'Discussing hypothetical scenarios in depth',
          'Structured argumentation: These – Antithese – Synthese',
          'Counter-arguments and concession (Zwar … aber, Wenngleich …)',
          'Rhetorical questions and emphasis',
        ],
      },
      {
        id: 'professional',
        icon: '🏢',
        title: 'Professional Communication',
        items: [
          'Negotiations (Preisverhandlung, Kompromiss, Angebot)',
          'Meetings (Tagesordnung, TOP, Diskussionsleitung, Protokoll)',
          'Presentations (Einleitung, Hauptteil, Schluss, Fragen)',
          'Business correspondence (als Anlage, Bezug nehmend auf, Betreff)',
          'Customer service (Beschwerde, Lösung anbieten, Kulanz)',
          'Contracts and agreements (Vertrag, Klausel, Laufzeit, Kündigung)',
        ],
      },
      {
        id: 'nominal-style',
        icon: '📝',
        title: 'Nominal Style & Extended Attributives',
        items: [
          'Extended attributive participles (der von der Regierung vorgeschlagene Plan)',
          'Nominalized verbs and adjectives in formal register',
          'Funktionsverbgefüge (in Kraft treten, zur Verfügung stellen)',
          'Academic register: nominal style vs verbal style',
          'Relative clauses vs participial phrases',
          'Nominal chains (die Umsetzung der vom Bund beschlossenen Reform)',
        ],
      },
      {
        id: 'connectors-b2',
        icon: '🔀',
        title: 'Advanced Connectors & Text Cohesion',
        items: [
          'nämlich (you see/namely), allerdings (however), dennoch (nevertheless)',
          'andernfalls (otherwise), insofern (insofar as), zumal (especially since)',
          'geschweige denn (let alone), wohingegen (whereas)',
          'Text linking devices (was … betrifft, in Bezug auf, hinsichtlich)',
          'Reference and substitution (diesbezüglich, erstere, letztere)',
          'Summarizing (zusammenfassend, abschließend, im Großen und Ganzen)',
        ],
      },
      {
        id: 'idioms',
        icon: '🎭',
        title: 'Idioms, Proverbs & Colloquial Language',
        items: [
          'Common idioms (Ich drücke dir die Daumen, Das ist nicht mein Bier)',
          'Proverbs (Morgenstund hat Gold im Mund, Übung macht den Meister)',
          'Colloquial expressions (Na klar! Kein Problem! Macht nichts!)',
          'Fillers and hesitation (also, na ja, tja, irgendwie, quasi)',
          'Regional variations (Servus, Tschüss, Tschau, Auf Wiedersehn)',
          'Swiss and Austrian vocabulary differences',
        ],
      },
      {
        id: 'literature',
        icon: '📚',
        title: 'Literature & Media Analysis',
        items: [
          'Reading short stories and news articles',
          'Analyzing opinion pieces and commentaries',
          'Understanding satire and irony',
          'Literary past tense (Präteritum as narrative tense)',
          'Recognizing Konjunktiv I in news reporting',
          'Summarizing and paraphrasing complex texts',
        ],
      },
      {
        id: 'pronunciation',
        icon: '🎯',
        title: 'Pronunciation & Intonation',
        items: [
          'Word stress patterns (Fotografie vs Fotográf)',
          'Sentence melody in questions and statements',
          'Emphasis and contrastive stress',
          'Connecting speech (linking, elision)',
          'Common pronunciation errors and corrections',
        ],
      },
    ],
    dialog: 'A: Dürfte ich kurz Ihre Meinung zu dem Vorschlag hören?\nB: Selbstverständlich. Also, grundsätzlich befürworte ich den Ansatz, allerdings habe ich doch einige Bedenken.\nA: Nämlich?\nB: Nun ja, die Kosten-Nutzen-Rechnung scheint mir noch nicht ganz ausgereift. Zwar wurden die Anfangsinvestitionen berücksichtigt, aber die laufenden Kosten sind meines Erachtens unterschätzt worden.\nA: Das ist ein berechtigter Einwand. Allerdings würde ich argumentieren, dass die langfristigen Einsparungen die höheren laufenden Kosten rechtfertigen.\nB: Wie hoch wären denn die Einsparungen Ihrer Schätzung nach genau?\nA: Nach unseren Berechnungen würden wir schon im dritten Jahr die Gewinnschwelle erreichen. Gestatten Sie mir, Ihnen die Details kurz anhand einer Grafik zu erläutern?\nB: Gern. Allerdings hätte ich dann auch noch gern gewusst, wie sich die Personalkosten entwickeln.\nA: Darauf komme ich gleich zu sprechen. Wie Sie auf dieser Folie sehen können, haben wir drei verschiedene Szenarien durchgerechnet.\nB: Ausgezeichnet. Ich denke, nach Ihrer Präsentation können wir dann in die Detaildiskussion einsteigen.',
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
          'Bonjour, salut, au revoir, bonne journée, bonne soirée',
          'Introducing yourself (Je m\'appelle …, Je suis …, Je viens de …)',
          'Comment allez-vous ? / Comment ça va ? / Ça va ?',
          'Formal vs informal (tu vs vous)',
          'Numbers 0–69',
          'Numbers 70–100 (soixante-dix, quatre-vingts, quatre-vingt-dix)',
          'Telling time (Il est trois heures, il est midi, il est minuit)',
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
          'Present tense: être and avoir (je suis, tu es, il est / j\'ai, tu as, il a)',
          'Regular -er verbs (parler, habiter, aimer, manger)',
          'Common irregulars: faire, aller, pouvoir, vouloir, devoir',
        ],
      },
      {
        id: 'questions',
        icon: '❓',
        title: 'Negation & Questions',
        items: [
          'ne … pas (Je ne parle pas français)',
          'ne … jamais, ne … rien, ne … personne',
          'Est-ce que questions (Est-ce que tu parles anglais ?)',
          'Inversion questions (Parlez-vous français ?)',
          'Question words (qui, que, où, quand, pourquoi, comment, combien)',
        ],
      },
      {
        id: 'family',
        icon: '👨‍👩‍👧',
        title: 'Family & Descriptions',
        items: [
          'Family members (mère, père, frère, sœur, grand-mère, grand-père)',
          'Possessive adjectives (mon/ma/mes, ton/ta/tes, son/sa/ses, notre/nos, votre/vos, leur/leurs)',
          'Colors (rouge, bleu, vert, jaune, noir, blanc, gris, marron)',
          'Common adjectives (grand, petit, beau, nouveau, vieux)',
          'Adjective agreement and placement',
        ],
      },
      {
        id: 'food',
        icon: '🍽️',
        title: 'Food, Drink & Restaurant',
        items: [
          'Common foods (pain, beurre, fromage, eau, vin, viande, poisson)',
          'Ordering (Je voudrais …, S\'il vous plaît, L\'addition)',
          'French meal culture (petit-déjeuner, déjeuner, dîner)',
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
          'Formation with avoir + participe passé (j\'ai parlé, nous avons fini)',
          'Formation with être: DR MRS VANDERTRAMP verbs',
          'Agreement of past participle with être subjects',
          'Common irregular participles (pris, mis, fait, dit, écrit, ouvert)',
        ],
      },
      {
        id: 'imparfait',
        icon: '🕰️',
        title: 'Imparfait',
        items: [
          'Formation (je parlais, nous finissions, ils faisaient)',
          'Uses: ongoing past, descriptions, habits',
          'Passé composé vs imparfait distinction',
        ],
      },
      {
        id: 'future',
        icon: '🔮',
        title: 'Future & Plans',
        items: [
          'Futur proche: aller + infinitive (je vais manger)',
          'Futur simple (je parlerai, je finirai, je serai)',
          'Making plans and predictions',
          'Indirect object pronouns (lui, leur)',
          'Pronoun order: me, te, se, nous, vous / le, la, les / lui, leur / y / en',
        ],
      },
    ],
  },
  B1: {
    level: 'B1',
    overview: 'Express opinions, discuss news, handle complex social situations.',
    topics: [
      {
        id: 'subjonctif',
        icon: '💭',
        title: 'Subjonctif & Hypotheticals',
        items: [
          'Subjonctif présent formation (que je parle, que je finisse, que je fasse)',
          'Uses: obligation (il faut que), emotion (je suis content que)',
          'Uses: doubt (je doute que), concession (bien que)',
          'Conditionnel présent (je voudrais, il faudrait, on pourrait)',
          'Si clauses: Si + imparfait → conditionnel (Si j\'avais de l\'argent, je voyagerais)',
        ],
      },
      {
        id: 'passive',
        icon: '🔄',
        title: 'Passive & Reported Speech',
        items: [
          'Passive with être (La maison est construite)',
          'Passive with se (Cela se dit comme ça)',
          'Discours indirect (Il a dit qu\'il viendrait)',
          'Tense changes in reported speech',
        ],
      },
    ],
  },
  B2: {
    level: 'B2',
    overview: 'Fluency and nuance, professional communication, literary awareness.',
    topics: [
      {
        id: 'advanced-tenses',
        icon: '⏳',
        title: 'Complex Tenses & Moods',
        items: [
          'Plus-que-parfait (j\'avais parlé, j\'étais parti)',
          'Passé simple (recognition for reading literature)',
          'Conditionnel passé (j\'aurais parlé, je serais allé)',
          'Subjonctif passé (que j\'aie parlé, que je sois venu)',
        ],
      },
      {
        id: 'discourse',
        icon: '📝',
        title: 'Discourse & Style',
        items: [
          'Connectors (cependant, néanmoins, en revanche, par conséquent)',
          'Literary past tenses for reading',
          'Formal register (subjonctif imparfait, ne explétif)',
        ],
      },
    ],
  },
};

const es: Record<Level, LevelCurriculum> = {
  A1: {
    level: 'A1',
    overview: 'Introduce yourself, order food, talk about everyday topics.',
    topics: [
      {
        id: 'greetings', icon: '👋', title: 'Greetings & Introductions',
        items: ['Hola, buenos días, buenas tardes, buenas noches, adiós, hasta luego', 'Introductions (Me llamo …, Soy de …, Soy estudiante)', '¿Cómo estás? ¿Qué tal? ¿Cómo está usted?', 'Formal vs informal (tú vs usted)', 'Numbers 0–100', 'Telling time (Son las tres, Es la una, ¿Qué hora es?)'],
      },
      {
        id: 'present', icon: '⚡', title: 'Present Tense',
        items: ['Regular -ar verbs (hablar: hablo, hablas, habla, hablamos, habláis, hablan)', 'Regular -er verbs (comer: como, comes, come, comemos, coméis, comen)', 'Regular -ir verbs (vivir: vivo, vives, vive, vivimos, vivís, viven)', 'Ser (soy, eres, es, somos, sois, son) vs Estar (estoy, estás, está, estamos, estáis, están)', 'Tener, ir, hacer, decir (yo tengo, voy, hago, digo)'],
      },
      {
        id: 'articles', icon: '📝', title: 'Articles & Nouns',
        items: ['Definite: el, la, los, las', 'Indefinite: un, una, unos, unas', 'Noun genders and plurality', 'Gender exceptions (el día, la mano, el problema)'],
      },
      {
        id: 'family', icon: '👨‍👩‍👧', title: 'Family & Descriptions',
        items: ['Family members (madre, padre, hermano, hermana, abuelos)', 'Possessives (mi, tu, su, nuestro, vuestro)', 'Descriptions (alto, bajo, simpático, amable, guapo)'],
      },
      {
        id: 'food', icon: '🍽️', title: 'Food & Restaurant',
        items: ['Common foods (pan, queso, agua, vino, fruta, carne, pescado)', 'Ordering (Quisiera …, Me gustaría …, La cuenta, por favor)', 'Gustar and similar verbs (me gusta, me encanta, me interesa)'],
      },
    ],
  },
  A2: {
    level: 'A2',
    overview: 'Talk about past events, make plans, handle shopping and daily situations.',
    topics: [
      {
        id: 'preterit', icon: '⏮️', title: 'Preterite & Imperfect',
        items: ['Regular preterite endings (-é, -aste, -ó, -amos, -asteis, -aron)', 'Irregular preterites (fui, dije, hice, pude, puse, supe)', 'Imperfect vs preterite distinction', 'Time markers (ayer, el año pasado, de repente, siempre)'],
      },
      {
        id: 'future', icon: '🔮', title: 'Future & Conditional',
        items: ['Ir + a + infinitive (voy a estudiar)', 'Future simple (hablaré, comeré, viviré, seré)', 'Conditional (hablaría, podría, me gustaría)'],
      },
    ],
  },
  B1: {
    level: 'B1',
    overview: 'Express opinions, discuss abstract topics, handle complex situations.',
    topics: [
      {
        id: 'subjunctive', icon: '💭', title: 'Subjuntivo',
        items: ['Present subjunctive (hable, coma, viva, sea)', 'Uses (espero que, ojalá, es importante que, aunque)', 'Imperfect subjunctive (hablara, comiera, viviera)'],
      },
      {
        id: 'perfect', icon: '📜', title: 'Perfect Tenses',
        items: ['Present perfect (he hablado, he comido)', 'Pluscuamperfecto (había hablado)', 'Past participle agreement (las cartas escritas)'],
      },
    ],
  },
  B2: {
    level: 'B2',
    overview: 'Argue fluently, understand nuance, professional register.',
    topics: [
      {
        id: 'complex', icon: '⏳', title: 'Complex Structures',
        items: ['Si clauses (Si hubiera sabido, habría venido)', 'Subjunctive in all tenses', 'Relative clauses with prepositions (el chico con quien hablé)'],
      },
      {
        id: 'discourse', icon: '🗣️', title: 'Discourse & Register',
        items: ['Connectors (no obstante, por consiguiente, en efecto)', 'Indirect speech and tense shifts', 'Formal vs informal register'],
      },
    ],
  },
};

const en: Record<Level, LevelCurriculum> = {
  A1: {
    level: 'A1',
    overview: 'Introduce yourself, order food, talk about everyday topics, understand basic phrases.',
    topics: [
      {
        id: 'greetings', icon: '👋', title: 'Greetings & Introductions',
        items: ['Hello, hi, goodbye, good morning, good afternoon, good evening', 'Introductions (My name is …, I\'m from …, I\'m a student)', 'How are you? Fine, thanks. And you?', 'The verb "to be" (I am, you are, he/she/it is, we are, they are)', 'The verb "to have" (I have, you have, he/she has)'],
      },
      {
        id: 'present', icon: '⚡', title: 'Present Simple',
        items: ['I/you/we/they work, he/she/it works', 'Do/does questions (Do you like coffee? Does she speak English?)', 'Present continuous (I am doing, he is working)', 'Present simple vs continuous'],
      },
      {
        id: 'past', icon: '⏮️', title: 'Past Simple',
        items: ['Regular past (worked, played, studied, stopped)', 'Common irregular verbs (went, ate, bought, saw, did, said)', 'Questions and negatives in past (Did you go? I didn\'t see)'],
      },
    ],
  },
  A2: {
    level: 'A2',
    overview: 'Describe experiences, make plans, compare things, talk about routines.',
    topics: [
      {
        id: 'perfect', icon: '⏳', title: 'Present Perfect',
        items: ['Have/has + past participle (I have seen, She has gone)', 'Ever/never, yet/already, just, for/since', 'Present perfect vs past simple'],
      },
      {
        id: 'comparison', icon: '📊', title: 'Comparatives & Superlatives',
        items: ['Comparative adjectives (-er, more), superlatives (-est, most)', 'Irregulars (good/better/best, bad/worse/worst, far/further/furthest)', 'As … as, not as … as, enough, too'],
      },
    ],
  },
  B1: {
    level: 'B1',
    overview: 'Express opinions, discuss abstract topics, handle work situations.',
    topics: [
      {
        id: 'conditionals', icon: '💭', title: 'Conditionals',
        items: ['Zero conditional (general truths)', 'First conditional (real future: If it rains, I\'ll stay)', 'Second conditional (unreal present: If I were you, I would …)', 'Third conditional (unreal past: If I had known, I would have …)'],
      },
      {
        id: 'passive', icon: '🔄', title: 'Passive Voice',
        items: ['Passive across tenses (is done, was made, has been built)', 'By + agent, get something done', 'Have/get something done (I had my car repaired)'],
      },
    ],
  },
  B2: {
    level: 'B2',
    overview: 'Argue effectively, nuanced expression, professional fluency.',
    topics: [
      {
        id: 'inversion', icon: '💭', title: 'Inversion & Emphasis',
        items: ['Inversion (Never have I seen …, Not only did he …)', 'Cleft sentences (It was John who …)', 'Fronting for emphasis'],
      },
      {
        id: 'discourse', icon: '📝', title: 'Discourse & Cohesion',
        items: ['Connectors (nevertheless, furthermore, consequently)', 'Collocations and phrasal verbs in depth', 'Academic register and hedging'],
      },
    ],
  },
};

const ar: Record<Level, LevelCurriculum> = {
  A1: {
    level: 'A1',
    overview: 'Greet people, introduce yourself, understand basic phrases, read and write the alphabet.',
    topics: [
      {
        id: 'greetings', icon: '👋', title: 'Greetings & Introductions',
        items: ['السلام عليكم / وعليكم السلام / مع السلامة', 'صباح الخير / مساء الخير / تصبح على خير', 'Introductions (اسمي …، أنا من …، أنا طالب)', 'How are you? (كيف حالك؟) and responses (الحمد لله، بخير)', 'Formal vs informal address'],
      },
      {
        id: 'alphabet', icon: '🔤', title: 'Arabic Alphabet & Writing',
        items: ['The 28 letters of the Arabic alphabet', 'Letter forms: initial, medial, final, isolated', 'Writing right to left', 'Short vowels (حركات: الفتحة، الضمة، الكسرة)', 'Long vowels (الألف، الواو، الياء)', 'Sun and moon letters (الحروف الشمسية والقمرية)'],
      },
      {
        id: 'nouns', icon: '📝', title: 'Nouns & Articles',
        items: ['Definite article (الـ)', 'Noun gender: masculine (مذكر) and feminine (مؤنث)', 'Dual form (المثنى)', 'Sound masculine and feminine plurals', 'Broken plurals (جمع التكسير)'],
      },
      {
        id: 'present', icon: '⚡', title: 'Present Tense',
        items: ['Verb conjugation: أنا أكتب، أنت تكتب، هو يكتب', 'Root system: 3-letter roots (فعل)', 'Common verbs (أكل، شرب، ذهب، قرأ، كتب)'],
      },
    ],
  },
  A2: {
    level: 'A2',
    overview: 'Talk about daily life, past events, make plans.',
    topics: [
      {
        id: 'past', icon: '⏮️', title: 'Past Tense',
        items: ['Perfect tense (كتبت، درست، ذهبت)', 'Past negation (ما كتبت، لم يدرس)', 'كان + present for past continuous'],
      },
      {
        id: 'sentences', icon: '📝', title: 'Sentence Structure',
        items: ['Nominal sentences (الجملة الاسمية: المبتدأ والخبر)', 'Verbal sentences (الجملة الفعلية: الفعل والفاعل)', 'Subject-verb agreement in gender and number'],
      },
    ],
  },
  B1: {
    level: 'B1',
    overview: 'Express opinions, discuss news, handle complex topics.',
    topics: [
      {
        id: 'morphology', icon: '🧩', title: 'Verb Morphology',
        items: ['Verb forms (الأوزان: Form I–X)', 'Root patterns and derivation', 'Augmented verbs and meaning changes'],
      },
      {
        id: 'cases', icon: '📋', title: 'Noun Cases & I\'rab',
        items: ['Nominative (الرفع), accusative (النصب), genitive (الجر)', 'Case endings (الضمة، الفتحة، الكسرة)', 'Tanween (التنوين)'],
      },
    ],
  },
  B2: {
    level: 'B2',
    overview: 'Read literature, argue fluently, professional communication.',
    topics: [
      {
        id: 'rhetoric', icon: '🎭', title: 'Rhetoric & Style',
        items: ['Metaphor and imagery in Arabic', 'Common idioms', 'Colloquial vs MSA distinctions'],
      },
      {
        id: 'literature', icon: '📚', title: 'Literature & Media',
        items: ['News article reading', 'Classical Arabic vs Modern Standard Arabic', 'Arabic poetry basics'],
      },
    ],
  },
};

export const curriculum: Record<LearnLanguage, Record<Level, LevelCurriculum>> = { de, fr, es, en, ar };

export function getCurriculum(lang: LearnLanguage, level: Level): LevelCurriculum {
  return curriculum[lang]?.[level] || curriculum.de[level];
}
